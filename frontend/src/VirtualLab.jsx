import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import "./VirtualLab.css";


function Label({ children, position }) {
  return (
    <Html position={position} center distanceFactor={4}>
      <div className="lab-object-label">{children}</div>
    </Html>
  );
}



function ReagentBottle({ position, color, name }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.45, 0]} castShadow>
        <cylinderGeometry args={[0.19, 0.22, 0.75, 24]} />
        <meshStandardMaterial color={color} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.86, 0]}>
        <cylinderGeometry args={[0.09, 0.09, 0.12, 20]} />
        <meshStandardMaterial color="#e8e8df" />
      </mesh>
      <mesh position={[0, 0.45, 0.205]}>
        <boxGeometry args={[0.26, 0.22, 0.015]} />
        <meshStandardMaterial color="#fffdf1" />
      </mesh>
      <Label position={[0, 1.12, 0]}>{name}</Label>
    </group>
  );
}



function ConicalFlask({ position }) {
  return (
    <group position={position}>
      {/* Narrow neck */}
      <mesh position={[0, 0.12, 0]}>
        <cylinderGeometry args={[0.07, 0.07, 0.25, 24]} />
        <meshPhysicalMaterial
          color="#e4faff"
          transparent
          opacity={0.3}
          roughness={0.08}
          metalness={0}
          transmission={0.85}
          thickness={0.35}
          ior={1.45}
          depthWrite={false}
        />
      </mesh>

      {/* Original flask body — restored dimensions */}
      <mesh position={[0, -0.12, 0]}>
        <cylinderGeometry args={[0.24, 0.1, 0.42, 32]} />
        <meshPhysicalMaterial
          color="#f3fbff"
          transparent
          opacity={0.22}
          roughness={0.04}
          metalness={0}
          transmission={0.95}
          thickness={0.8}
          ior={1.45}
          clearcoat={1}
          clearcoatRoughness={0.05}
          depthWrite={false}
        />
      </mesh>

      {/* Original base */}
      <mesh position={[0, -0.29, 0]}>
        <cylinderGeometry args={[0.19, 0.19, 0.025, 32]} />
        <meshPhysicalMaterial
          color="#d7eef0"
          transparent
          opacity={0.45}
          roughness={0.08}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}



function Burette() {
  return (
    <group position={[-1.25, 0, 0]}>
      <mesh position={[0, 1.15, 0]}>
        <boxGeometry args={[0.06, 2.15, 0.06]} />
        <meshStandardMaterial color="#64756b" metalness={0.5} />
      </mesh>
      <mesh position={[0.12, 1.55, 0]}>
        <cylinderGeometry args={[0.055, 0.055, 1.45, 24]} />
        <meshStandardMaterial
          color="#b9e4e8"
          transparent
          opacity={0.5}
        />
      </mesh>
      <mesh position={[0.12, 1.55, 0]}>
        <cylinderGeometry args={[0.037, 0.037, 0.95, 20]} />
        <meshStandardMaterial color="#c4d9e8" transparent opacity={0.7} />
      </mesh>
      {Array.from({ length: 11 }, (_, i) => (
        <mesh key={i} position={[0.19, 0.95 + i * 0.12, 0]}>
          <boxGeometry args={[0.07, 0.012, 0.025]} />
          <meshStandardMaterial color="#334c45" />
        </mesh>
      ))}
      <mesh position={[0.12, 0.78, 0]}>
        <boxGeometry args={[0.25, 0.045, 0.07]} />
        <meshStandardMaterial color="#e5e8e3" />
      </mesh>
      <mesh position={[0.12, 0.65, 0]}>
        <cylinderGeometry args={[0.025, 0.012, 0.22, 16]} />
        <meshStandardMaterial color="#b9e4e8" transparent opacity={0.65} />
      </mesh>
      <Label position={[0.05, 2.45, 0]}>Burette</Label>
    </group>
  );
}

function Pipette({ position }) {
  return (
    <group position={position} rotation={[0, 0, -0.35]}>
      <mesh>
        <cylinderGeometry args={[0.035, 0.035, 0.85, 20]} />
        <meshStandardMaterial color="#c2e4e7" transparent opacity={0.7} />
      </mesh>
      <mesh position={[0, 0.48, 0]}>
        <cylinderGeometry args={[0.018, 0.035, 0.18, 16]} />
        <meshStandardMaterial color="#c2e4e7" transparent opacity={0.7} />
      </mesh>
      <Label position={[0, 0.72, 0]}>Pipette</Label>
    </group>
  );
}

function LabRoom() {
  return (
    <>
      <color attach="background" args={["#eaf0ed"]} />
      <ambientLight intensity={0.8} />
      <directionalLight
        position={[4, 7, 5]}
        intensity={2.5}
        castShadow
      />

      {/* Laboratory floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.13, 0]} receiveShadow>
        <planeGeometry args={[14, 11]} />
        <meshStandardMaterial color="#dfe8e2" />
      </mesh>

      {/* Back wall */}
      <mesh position={[0, 2.3, -2.8]}>
        <boxGeometry args={[14, 4.8, 0.15]} />
        <meshStandardMaterial color="#f4f7f3" />
      </mesh>

      {/* Laboratory bench */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[5.6, 0.18, 2.1]} />
        <meshStandardMaterial color="#789587" roughness={0.45} />
      </mesh>
      <mesh position={[0, -0.65, 0]}>
        <boxGeometry args={[5.25, 1.15, 1.8]} />
        <meshStandardMaterial color="#d2ded6" />
      </mesh>

      {/* Bench front trim */}
      <mesh position={[0, -0.05, 1.06]}>
        <boxGeometry args={[5.6, 0.13, 0.06]} />
        <meshStandardMaterial color="#466b5a" />
      </mesh>

      {/* Apparatus */}
      <Burette />
      <ConicalFlask position={[-0.85, 0.35, 0.25]} />
      <Pipette position={[0.25, 0.58, 0.35]} />
      <ReagentBottle position={[1.15, 0.1, 0.35]} color="#e2c978" name="Acid" />
      <ReagentBottle position={[1.8, 0.1, 0.35]} color="#8bc8c1" name="Base" />

      <Label position={[-0.8, 1.5, 0.8]}>Titration Workbench</Label>
    </>
  );
}

export default function VirtualLab() {
  return (
    <div className="virtual-lab">
      <header className="lab-header">
        <div>
          <p className="lab-eyebrow">VIRTUAL SCIENCE LABORATORY</p>
          <h1>Acid–Base Titration</h1>
          <p>Explore the apparatus before starting your practical.</p>
        </div>
        <span className="lab-status">3D Preview</span>
      </header>

      <div className="lab-canvas">
        <Canvas
          shadows
          camera={{ position: [3.8, 3.2, 5.5], fov: 35 }}
        >
          <LabRoom />
          <OrbitControls
            makeDefault
            target={[0, 0.7, 0]}
            minDistance={4}
            maxDistance={12}
            maxPolarAngle={Math.PI / 2.05}
          />
        </Canvas>
        <div className="lab-hint">
          Drag to rotate · Scroll to zoom · Right-drag to pan
        </div>
      </div>

      <div className="lab-info-grid">
        <article>
          <span>01</span>
          <h3>Burette</h3>
          <p>Used to deliver a measured volume of titrant.</p>
        </article>
        <article>
          <span>02</span>
          <h3>Conical flask</h3>
          <p>Holds the solution being analysed and indicator.</p>
        </article>
        <article>
          <span>03</span>
          <h3>Volumetric pipette</h3>
          <p>Transfers a measured volume of solution.</p>
        </article>
        <article>
          <span>04</span>
          <h3>Reagent bottles</h3>
          <p>Represent the solutions used in the simulation.</p>
        </article>
      </div>

      <p className="lab-disclaimer">
        Educational simulation only. This preview does not yet model real
        chemical reactions or measured titration results.
      </p>
    </div>
  );
}
