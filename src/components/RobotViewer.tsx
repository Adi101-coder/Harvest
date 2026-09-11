import { Component, Suspense, useCallback, useEffect, useMemo, useRef } from 'react'
import type { ReactNode } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Center, ContactShadows, Environment, useGLTF } from '@react-three/drei'
import type { Object3D, Scene, WebGLRenderer } from 'three'
import {
  BufferAttribute,
  BufferGeometry,
  Float32BufferAttribute,
  Mesh,
  Vector3,
} from 'three'

export const ROBOT_MODEL_SRC = '/final.glb'
const HERO_CAMERA = {
  position: [0, 0.28, 2.05] as [number, number, number],
  fov: 34,
}

const SPECS_CAMERA = {
  position: [0, 0.15, 3.1] as [number, number, number],
  fov: 28,
}

const GL_CONFIG = { antialias: true, alpha: true }
const HEAD_YAW = 0.95
const HEAD_PITCH = 0.42

function enableShadows(object: Object3D) {
  object.traverse((child) => {
    if (child instanceof Mesh) {
      child.castShadow = true
      child.receiveShadow = true
    }
  })
}

function findNeckY(geometry: BufferGeometry) {
  geometry.computeBoundingBox()
  const box = geometry.boundingBox
  if (!box) return 0
  const height = box.max.y - box.min.y
  if (height <= 0) return box.max.y
  const bins = 48
  const extents = Array.from({ length: bins }, () => ({ min: Infinity, max: -Infinity }))
  const pos = geometry.getAttribute('position')
  for (let i = 0; i < pos.count; i += 1) {
    const t = (pos.getY(i) - box.min.y) / height
    const bin = Math.min(bins - 1, Math.max(0, Math.floor(t * bins)))
    const x = pos.getX(i)
    extents[bin].min = Math.min(extents[bin].min, x)
    extents[bin].max = Math.max(extents[bin].max, x)
  }
  let bestBin = Math.floor(bins * 0.68)
  let bestWidth = Infinity
  const from = Math.floor(bins * 0.52)
  const to = Math.floor(bins * 0.84)
  for (let bin = from; bin <= to; bin += 1) {
    if (!Number.isFinite(extents[bin].min)) continue
    const width = extents[bin].max - extents[bin].min
    if (width < bestWidth) {
      bestWidth = width
      bestBin = bin
    }
  }
  return box.min.y + ((bestBin + 0.5) / bins) * height
}

function extractTriangles(source: BufferGeometry, starts: number[]) {
  const geometry = new BufferGeometry()
  const names = Object.keys(source.attributes)
  for (const name of names) {
    const attr = source.getAttribute(name)
    const itemSize = attr.itemSize
    const out = new Float32Array(starts.length * 3 * itemSize)
    let offset = 0
    for (const start of starts) {
      for (let vert = 0; vert < 3; vert += 1) {
        const index = start + vert
        for (let component = 0; component < itemSize; component += 1) {
          out[offset] = attr.array[index * itemSize + component]
          offset += 1
        }
      }
    }
    geometry.setAttribute(
      name,
      attr instanceof Float32BufferAttribute
        ? new Float32BufferAttribute(out, itemSize)
        : new BufferAttribute(out, itemSize),
    )
  }
  return geometry
}

function splitHeadFromMesh(mesh: Mesh) {
  const source = mesh.geometry.index ? mesh.geometry.toNonIndexed() : mesh.geometry.clone()
  const neckY = findNeckY(source)
  const pos = source.getAttribute('position')
  const headStarts: number[] = []
  const bodyStarts: number[] = []
  let headX = 0
  let headZ = 0
  let headCount = 0

  for (let i = 0; i < pos.count; i += 3) {
    const y0 = pos.getY(i)
    const y1 = pos.getY(i + 1)
    const y2 = pos.getY(i + 2)
    const centroidY = (y0 + y1 + y2) / 3
    if (centroidY >= neckY) {
      headStarts.push(i)
      headX += pos.getX(i) + pos.getX(i + 1) + pos.getX(i + 2)
      headZ += pos.getZ(i) + pos.getZ(i + 1) + pos.getZ(i + 2)
      headCount += 3
    } else {
      bodyStarts.push(i)
    }
  }

  if (headStarts.length === 0 || bodyStarts.length === 0) {
    return null
  }

  const headGeom = extractTriangles(source, headStarts)
  const bodyGeom = extractTriangles(source, bodyStarts)
  const pivot = new Vector3(
    headCount ? headX / headCount : 0,
    neckY,
    headCount ? headZ / headCount : 0,
  )
  headGeom.translate(-pivot.x, -pivot.y, -pivot.z)
  headGeom.computeVertexNormals()
  bodyGeom.computeVertexNormals()

  const material = mesh.material
  const body = new Mesh(bodyGeom, material)
  const head = new Mesh(headGeom, material)
  body.name = 'robot-body'
  head.name = 'robot-head'
  body.castShadow = true
  body.receiveShadow = true
  head.castShadow = true
  head.receiveShadow = true
  head.position.copy(pivot)
  return { body, head }
}

function prepareRig(scene: Object3D) {
  const clone = scene.clone(true)
  const heads: Mesh[] = []
  const meshes: Mesh[] = []
  clone.traverse((child) => {
    if (child instanceof Mesh) meshes.push(child)
  })
  for (const mesh of meshes) {
    const parts = splitHeadFromMesh(mesh)
    const parent = mesh.parent
    if (!parts || !parent) continue
    parts.body.position.copy(mesh.position)
    parts.body.quaternion.copy(mesh.quaternion)
    parts.body.scale.copy(mesh.scale)
    const headRoot = parts.head
    headRoot.position.add(mesh.position)
    parent.add(parts.body)
    parent.add(headRoot)
    mesh.removeFromParent()
    heads.push(headRoot)
  }
  enableShadows(clone)
  return { clone, heads }
}

type RobotViewerProps = {
  className?: string
  lookX?: number
  lookY?: number
  variant?: 'hero' | 'specs'
  modelSrc?: string
  modelScale?: number
}

type ModelProps = {
  lookRef: { current: { x: number; y: number } }
  modelSrc: string
  modelScale: number
}

class ModelErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  render() {
    if (this.state.failed) {
      return (
        <div className="robot-viewer__fallback">
          Drop the robot .glb into /public
        </div>
      )
    }
    return this.props.children
  }
}

function RobotModel({ lookRef, modelSrc, modelScale }: ModelProps) {
  const { scene } = useGLTF(modelSrc)
  const rig = useMemo(() => prepareRig(scene), [scene])
  const headsRef = useRef<Mesh[]>(rig.heads)
  headsRef.current = rig.heads

  useFrame(() => {
    const { x, y } = lookRef.current
    const yaw = x * HEAD_YAW
    const pitch = y * HEAD_PITCH
    for (const head of headsRef.current) {
      head.rotation.y = yaw
      head.rotation.x = pitch
    }
  })

  return (
    <Center>
      <group scale={modelScale}>
        <primitive object={rig.clone} />
      </group>
    </Center>
  )
}

function RobotScene({ lookRef, modelSrc, modelScale }: ModelProps) {
  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight
        position={[4, 7, 3.5]}
        intensity={1.45}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-near={0.5}
        shadow-camera-far={16}
        shadow-camera-left={-2.2}
        shadow-camera-right={2.2}
        shadow-camera-top={2.2}
        shadow-camera-bottom={-2.2}
        shadow-bias={-0.00015}
      />
      <directionalLight position={[-3, 2.5, -2]} intensity={0.35} />
      <Environment preset="studio" />
      <RobotModel lookRef={lookRef} modelSrc={modelSrc} modelScale={modelScale} />
      <ContactShadows
        position={[0, -0.57, 0]}
        opacity={0.38}
        blur={2.6}
        far={4}
        scale={10}
        color="#1a1612"
        resolution={512}
      />
    </>
  )
}

export default function RobotViewer({
  className,
  variant = 'hero',
  modelSrc = ROBOT_MODEL_SRC,
  modelScale = 0.5,
}: RobotViewerProps) {
  const camera = variant === 'specs' ? SPECS_CAMERA : HERO_CAMERA
  const lookRef = useRef({ x: 0, y: 0 })
  const onCreated = useCallback(({ gl, scene }: { gl: WebGLRenderer; scene: Scene }) => {
    gl.setClearColor(0x000000, 0)
    scene.background = null
  }, [])

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      lookRef.current.x = (event.clientX / window.innerWidth) * 2 - 1
      lookRef.current.y = (event.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  return (
    <div className={className ? `robot-viewer ${className}` : 'robot-viewer'} aria-hidden="true">
      <ModelErrorBoundary>
        <Canvas shadows camera={camera} dpr={[1, 1.75]} gl={GL_CONFIG} onCreated={onCreated}>
          <Suspense fallback={null}>
            <RobotScene lookRef={lookRef} modelSrc={modelSrc} modelScale={modelScale} />
          </Suspense>
        </Canvas>
      </ModelErrorBoundary>
    </div>
  )
}

useGLTF.preload(ROBOT_MODEL_SRC)
