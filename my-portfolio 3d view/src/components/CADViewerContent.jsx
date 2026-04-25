import { Suspense, useMemo } from 'react'
import { Canvas, useLoader } from '@react-three/fiber'
import { OrbitControls, Stage, Html, useProgress } from '@react-three/drei'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
import * as THREE from 'three'

function ProgressOverlay() {
  const { progress } = useProgress()
  return (
    <Html center>
      <span style={{
        fontFamily: 'monospace', fontSize: 11,
        color: '#64748b', letterSpacing: '0.15em',
        textTransform: 'uppercase', whiteSpace: 'nowrap',
      }}>
        {Math.round(progress)}%
      </span>
    </Html>
  )
}

function STLModel({ url, accentHex }) {
  const geo = useLoader(STLLoader, url)
  useMemo(() => {
    if (!geo.hasAttribute('normal')) geo.computeVertexNormals()
  }, [geo])
  return (
    <mesh geometry={geo} castShadow receiveShadow>
      <meshStandardMaterial color={accentHex} metalness={0.65} roughness={0.3} />
    </mesh>
  )
}

function OBJModel({ url, accentHex }) {
  const obj = useLoader(OBJLoader, url)
  useMemo(() => {
    const mat = new THREE.MeshStandardMaterial({ color: accentHex, metalness: 0.65, roughness: 0.3 })
    obj.traverse(child => {
      if (child.isMesh) {
        child.material = mat
        child.castShadow = true
        if (child.geometry && !child.geometry.hasAttribute('normal'))
          child.geometry.computeVertexNormals()
      }
    })
  }, [obj, accentHex])
  return <primitive object={obj} />
}

function Model({ url, accentHex }) {
  const ext = url.split('.').pop().toLowerCase()
  if (ext === 'obj') return <OBJModel url={url} accentHex={accentHex} />
  return <STLModel url={url} accentHex={accentHex} />
}

export default function CADViewerContent({ url, accentHex = '#3B82F6' }) {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 10], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true }}
      style={{ width: '100%', height: '100%' }}
    >
      <color attach="background" args={['#020617']} />
      <Suspense fallback={<ProgressOverlay />}>
        <Stage
          preset="rembrandt"
          environment="warehouse"
          intensity={0.5}
          shadows={false}
          adjustCamera
        >
          <Model url={url} accentHex={accentHex} />
        </Stage>
      </Suspense>
      <OrbitControls makeDefault enablePan enableZoom enableRotate />
    </Canvas>
  )
}
