import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html, Text } from "@react-three/drei";
import "./VirtualLab.css";


function Label({ children, position }) {
  return (
    <Html position={position} center distanceFactor={4}>
      <div className="lab-object-label">{children}</div>
    </Html>
  );
}


function ReagentBottle({ position, color, name }) {
  const bottlePoints = [
    [0, 0.03],
    [0.12, 0.03],
    [0.16, 0.05],
    [0.18, 0.09],
    [0.18, 0.52],
    [0.175, 0.59],
    [0.155, 0.65],
    [0.12, 0.69],
    [0.085, 0.72],
    [0.065, 0.74],
    [0.065, 0.85],
    [0.075, 0.87],
    [0.075, 0.90],
    [0, 0.90]
  ].map(([x, y]) => new THREE.Vector2(x, y));

  const corkPoints = [
    [0, 0],
    [0.045, 0],
    [0.052, 0.015],
    [0.052, 0.12],
    [0.065, 0.135],
    [0.065, 0.15],
    [0.055, 0.16],
    [0, 0.16]
  ].map(([x, y]) => new THREE.Vector2(x, y));

  return (
    <group position={position} scale={0.78}>

      {/* Transparent glass bottle */}
      <mesh position={[0, 0, 0]} castShadow>
        <latheGeometry args={[bottlePoints, 64]} />
        <meshPhysicalMaterial
          color="#eaf5f3"
          transparent
          opacity={0.52}
          roughness={0.09}
          metalness={0}
          transmission={0.55}
          thickness={0.3}
          ior={1.46}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* Colored liquid inside */}
      <mesh position={[0, 0.24, 0]}>
        <cylinderGeometry args={[0.145, 0.145, 0.32, 64]} />
        <meshStandardMaterial
          color={color}
          roughness={0.28}
          metalness={0}
          emissive={color}
          emissiveIntensity={0.18}
          />
      </mesh>

      
      {/* Reagent bottle stopper - tapered cork stem */}
      <mesh position={[0, 0.815, 0]}>
        <cylinderGeometry args={[0.055, 0.048, 0.13, 64]} />
        <meshStandardMaterial
          color="#c9b18e"
          roughness={0.92}
          metalness={0}
      />
      </mesh>

      
      {/* Smooth domed cork stopper head */}
      <mesh position={[0, 0.865, 0]}>
        <latheGeometry
          args={[
            [
              new THREE.Vector2(0, 0),
              new THREE.Vector2(0.045, 0),
              new THREE.Vector2(0.054, 0.008),
              new THREE.Vector2(0.058, 0.02),
              new THREE.Vector2(0.057, 0.04),
              new THREE.Vector2(0.05, 0.055),
              new THREE.Vector2(0.035, 0.066),
              new THREE.Vector2(0.018, 0.072),
              new THREE.Vector2(0, 0.074)
            ],
            64
          ]}
      />
        <meshStandardMaterial
          color="#c9b18e"
          roughness={0.88}
          metalness={0}
        />
      </mesh>



      {/* Bottle neck rim */}
      <mesh position={[0, 0.745, 0]}>
        <torusGeometry args={[0.067, 0.007, 12, 64]} />
        <meshPhysicalMaterial
          color="#d9e9e5"
          metalness={0.1}
          roughness={0.08}
          transmission={0.7}
        />
      </mesh>

      
      
      
      {/* Professional reagent bottle label */}
      <mesh position={[0, 0.36, 0.181]}>
        <boxGeometry args={[0.27, 0.18, 0.006]} />
        <meshStandardMaterial
          color="#fffdf7"
          roughness={0.85}
        />
      </mesh>

      {/* Single coloured identification strip */}
      <mesh position={[0, 0.435, 0.185]}>
        <boxGeometry args={[0.27, 0.025, 0.003]} />
        <meshStandardMaterial color={color} />
      </mesh>

      {/* Single bottom border */}
      <mesh position={[0, 0.282, 0.185]}>
        <boxGeometry args={[0.23, 0.003, 0.003]} />
        <meshStandardMaterial color="#aeb9b2" />
      </mesh>

      {/* Single chemical name */}
      <Text
        position={[0, 0.355, 0.195]}
        fontSize={0.05}
        color="#172c22"
        anchorX="center"
        anchorY="middle"
        fontWeight="bold"
        textAlign="center"
      >
      {name.toUpperCase()}
      </Text>

    </group>
  );
}




function ConicalFlask({ position }) {
  // One continuous profile: flat base -> sloping body -> smooth shoulder -> long neck.
  const outerProfile = [
    new THREE.Vector2(0.000, -0.333),
    new THREE.Vector2(0.120, -0.333),
    new THREE.Vector2(0.165, -0.325),
    new THREE.Vector2(0.190, -0.300),
    new THREE.Vector2(0.220, -0.245),
    new THREE.Vector2(0.230, -0.205),
    new THREE.Vector2(0.218, -0.165),
    new THREE.Vector2(0.195, -0.115),
    new THREE.Vector2(0.160, -0.065),
    new THREE.Vector2(0.120, -0.015),
    new THREE.Vector2(0.085, 0.035),
    new THREE.Vector2(0.068, 0.065),
    new THREE.Vector2(0.065, 0.090),
    new THREE.Vector2(0.065, 0.240),
  ];

  const glassMaterial = {
    color: "#eaf8ff",
    transparent: true,
    opacity: 0.45,
    roughness: 0.07,
    metalness: 0,
    transmission: 0.50,
    thickness: 0.35,
    ior: 1.45,
    side: THREE.DoubleSide,
    depthWrite: false,
  };

  return (
    <group position={position}>
      {/* Continuous glass body and neck */}
      <mesh>
        <latheGeometry args={[outerProfile, 96]} />
        <meshPhysicalMaterial {...glassMaterial} />
      </mesh>

      {/* Small flat base, retained for a stable flask bottom */}
      <mesh position={[0, -0.333, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 0.012, 64]} />
        <meshPhysicalMaterial {...glassMaterial} />
      </mesh>

      {/* Thickened glass rim around flask opening */}
      <mesh
        position={[0, 0.24, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      >
      <torusGeometry args={[0.065, 0.004, 12, 64]} />
      <meshPhysicalMaterial
        color="#dce9e5"
        transparent
        opacity={0.55}
        roughness={0.12}
        transmission={0.45}
        thickness={0.15}
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
        <cylinderGeometry args={[0.027, 0.027, 1.45, 64]} />
        <meshPhysicalMaterial
          color="#eaf8ff"
          transparent
          opacity={0.38}
          roughness={0.08}
          metalness={0}
          transmission={0.35}
          thickness={0.12}
          ior={1.45}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
      <mesh position={[0.12, 0.78, 0]}>
        <boxGeometry args={[0.25, 0.045, 0.07]} />
        <meshStandardMaterial color="#e5e8e3" />
      </mesh>
      
      {/* Burette graduation markings */}
      {Array.from({ length: 30 }, (_, i) => {
        const isMajor = i % 3 === 0;

        return (
          <group key={i}>
          <mesh
            position={[
            0.155 + (isMajor ? 0 : 0),
            2.22 - i * 0.026,
            0.035
        ]}
        >
        <boxGeometry
          args={[isMajor ? 0.065 : 0.035, 0.006, 0.003]}
        />
        <meshBasicMaterial color="#24332f" />
        </mesh>

      {isMajor && (
        <Text
          position={[0.205, 2.22 - i * 0.026, 0.038]}
          fontSize={0.035}
          color="#24332f"
          anchorX="left"
          anchorY="middle"
        >
          {i}
        </Text>
        )}
    </group>
  );
})}


      
      {/* Stopcock body - rounded glass valve */}
      <mesh position={[0.12, 0.58, 0]}>
        <cylinderGeometry args={[0.045, 0.045, 0.105, 32]} />
        <meshStandardMaterial
          color="#a9c5c3"
          transparent
          opacity={0.82}
          roughness={0.16}
          metalness={0.05}
        />
      </mesh>

      {/* Valve connector - overlaps the burette tube slightly */}
        <mesh position={[0.12, 0.675, 0]}>
        <cylinderGeometry args={[0.027, 0.028, 0.12, 24]} />
        <meshStandardMaterial
          color="#c4d9d8"
          transparent
          opacity={0.72}
          roughness={0.12}
        />
      </mesh>

      {/* Horizontal stopcock spindle */}
      <mesh
        position={[0.12, 0.58, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <cylinderGeometry args={[0.014, 0.014, 0.105, 24]} />
        <meshStandardMaterial
          color="#879995"
          metalness={0.45}
          roughness={0.24}
        />
      </mesh>

      {/* Stopcock handle - short horizontal lever */}
      <group
        position={[0.12, 0.58, 0]}
        rotation={[0, 0, -0.12]}
      >
        <mesh position={[0.075, 0, 0]}>
          <boxGeometry args={[0.15, 0.018, 0.025]} />
          <meshStandardMaterial
            color="#596b66"
            metalness={0.5}
            roughness={0.25}
          />
        </mesh>

        {/* Rounded handle tip */}
        <mesh position={[0.15, 0, 0]}>
          <sphereGeometry args={[0.018, 20, 20]} />
          <meshStandardMaterial
            color="#89938f"
            metalness={0.4}
            roughness={0.22}
          />
        </mesh>
      </group>

      {/* Lower glass outlet connector */}
      <mesh position={[0.12, 0.505, 0]}>
        <cylinderGeometry args={[0.022, 0.012, 0.065, 24]} />
        <meshStandardMaterial
          color="#c4d9d8"
          transparent
          opacity={0.7}
          roughness={0.12}
        />
      </mesh>

      {/* Narrow downward-facing glass nozzle */}
      <mesh position={[0.12, 0.435, 0]}>
        <cylinderGeometry args={[0.012, 0.004, 0.09, 24]} />
        <meshStandardMaterial
          color="#c4d9d8"
          transparent
          opacity={0.72}
          roughness={0.12}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Fine nozzle opening */}
      <mesh position={[0.12, 0.388, 0]}>
        <cylinderGeometry args={[0.0045, 0.0045, 0.003, 16]} />
        <meshStandardMaterial
          color="#91b8b5"
          roughness={0.2}
        />
      </mesh>
      <Label position={[0.05, 2.45, 0]}>Burette</Label>
    </group>
  );
}


function Pipette({ position }) {
  return (
    <group position={position} rotation={[0, 0, -0.35]}>
      {/* Upper narrow glass stem */}
      <mesh position={[0, 0.27, 0]}>
        <cylinderGeometry args={[0.018, 0.022, 0.32, 32]} />
        <meshPhysicalMaterial
          color="#d8f0f2"
          transparent
          opacity={0.48}
          roughness={0.08}
          metalness={0}
          transmission={0.35}
          thickness={0.08}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Central volumetric bulb */}
      <mesh position={[0, -0.02, 0]}>
        <sphereGeometry args={[0.055, 32, 24]} />
        <meshPhysicalMaterial
          color="#d8f0f2"
          transparent
          opacity={0.38}
          roughness={0.08}
          transmission={0.4}
          thickness={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Lower narrow stem */}
      <mesh position={[0, -0.23, 0]}>
        <cylinderGeometry args={[0.022, 0.012, 0.30, 32]} />
        <meshPhysicalMaterial
          color="#d8f0f2"
          transparent
          opacity={0.48}
          roughness={0.08}
          transmission={0.35}
          thickness={0.08}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Fine calibration line */}
      <mesh position={[0, 0.12, 0.022]}>
        <boxGeometry args={[0.045, 0.006, 0.003]} />
        <meshBasicMaterial color="#a34c4c" />
      </mesh>

      {/* Additional fine pipette markings */}
      {[-0.04, 0, 0.04].map((offset, i) => (
      <mesh
        key={i}
        position={[0, 0.12 + offset, 0.022]}
      >
      <boxGeometry args={[0.025, 0.004, 0.003]} />
      <meshBasicMaterial color="#657b78" />
      </mesh>
      ))}

      {/* Pipette label */}
      <Label position={[0, 0.48, 0]}>
        Pipette
      </Label>
    </group>
  );
}


function LabRoom() {
  return (
    <>
      {/* Laboratory background */}
      <color attach="background" args={["#e8eeeb"]} />

      {/* Soft natural laboratory lighting */}
      <hemisphereLight
        args={["#f4f7ff", "#87958b", 0.55]}
      />

      <ambientLight intensity={0.35} />

      {/* Main overhead light */}
      <directionalLight
        position={[-3, 7, 4]}
        intensity={1.8}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.1}
        shadow-camera-far={20}
        shadow-camera-left={-7}
        shadow-camera-right={7}
        shadow-camera-top={7}
        shadow-camera-bottom={-7}
        shadow-bias={-0.0002}
      />

      {/* Warm secondary light */}
      <pointLight
        position={[3, 3, 2]}
        intensity={0.3}
        color="#fff1dc"
        distance={10}
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
            minDistance={2.5}
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
