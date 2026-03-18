"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, PerspectiveCamera, useGLTF } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";


// ─────────────────────────────
// INTRO TIMING
// ─────────────────────────────
const TEXT_DURATION = 100
const TEXT_GAP = 50

const CAMERA_SPEED = 0.40
const FINAL_WARP_SPEED = 4



// ─────────────────────────────
// Galaxy Model
// ─────────────────────────────
function Galaxy() {

    const { scene } = useGLTF("/need_some_space.glb")

    useEffect(() => {

        const box = new THREE.Box3().setFromObject(scene)
        const center = new THREE.Vector3()
        box.getCenter(center)

        scene.position.sub(center)

        scene.traverse((child: any) => {

            if (child.isPoints) {

                const geo = child.geometry

                if (geo.attributes.COLOR_0 && !geo.attributes.color) {
                    geo.setAttribute("color", geo.attributes.COLOR_0)
                }

                if (child.material) {

                    child.material.vertexColors = true
                    child.material.transparent = true

                    child.material.depthWrite = false
                    child.material.blending = THREE.AdditiveBlending

                    child.material.size = 0.05

                    child.material.needsUpdate = true
                }
            }

        })

    }, [scene])

    return <primitive object={scene} />
}

useGLTF.preload("/need_some_space.glb")



// ─────────────────────────────
// Camera Animation
// ─────────────────────────────
function CameraAnimation({ done }: { done: () => void }) {

    const cam = useRef<THREE.PerspectiveCamera>(null!)
    const progress = useRef(0)
    const warp = useRef(false)

    const forward = new THREE.Vector3()

    const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 0, 40),
        new THREE.Vector3(0, 0, 35),
        new THREE.Vector3(0.5, 0.5, 20),
        new THREE.Vector3(1.5, 1, 10),
        new THREE.Vector3(2, 1.5, 5),
        new THREE.Vector3(2, 1.5, 3),
    ])

    useFrame((_, delta) => {

        if (!cam.current) return

        if (!warp.current) {

            progress.current += delta * CAMERA_SPEED

            if (progress.current > 1) progress.current = 1

            const pos = curve.getPointAt(progress.current)

            cam.current.position.copy(pos)

            cam.current.lookAt(0, 0, 0)

            if (progress.current >= 1) {

                cam.current.getWorldDirection(forward)

                warp.current = true
            }

        }
        else {

            cam.current.position.addScaledVector(forward, delta * FINAL_WARP_SPEED)

            cam.current.fov += delta * 10
            cam.current.updateProjectionMatrix()

            if (cam.current.position.length() < 1) {
                done()
            }

        }

    })

    return (
        <PerspectiveCamera
            ref={cam}
            makeDefault
            position={[0, 0, 40]}
            fov={45}
        />
    )
}



// ─────────────────────────────
// Intro Component
// ─────────────────────────────
export default function Intro({ onComplete }: { onComplete: () => void }) {

    const [textPhase, setTextPhase] = useState(0)
    const [showGalaxy, setShowGalaxy] = useState(false)

    useEffect(() => {

        const t1 = setTimeout(() => setTextPhase(1), 500)

        const t2 = setTimeout(() => setTextPhase(2), TEXT_DURATION + TEXT_GAP)

        const t3 = setTimeout(() => setTextPhase(3), (TEXT_DURATION + TEXT_GAP) * 2)

        const t4 = setTimeout(() => setTextPhase(4), (TEXT_DURATION + TEXT_GAP) * 3)

        const t5 = setTimeout(() => {
            setTextPhase(0)
            setShowGalaxy(true)
        }, (TEXT_DURATION + TEXT_GAP) * 4)

        return () => {
            clearTimeout(t1)
            clearTimeout(t2)
            clearTimeout(t3)
            clearTimeout(t4)
            clearTimeout(t5)
        }

    }, [])

    return (

        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center text-white text-center">

            {textPhase === 1 && <p className="intro">We looked at the sky.</p>}
            {textPhase === 2 && <p className="intro">We asked questions.</p>}
            {textPhase === 3 && <p className="intro">We reached the stars.</p>}
            {textPhase === 4 && <h1 className="title">Evolution of Space</h1>}

            {showGalaxy && (

                <Canvas
                    camera={{ position: [0, 0, 40], fov: 45 }}
                    gl={{ antialias: true }}
                >

                    <color attach="background" args={["black"]} />

                    <Suspense fallback={null}>

                        <CameraAnimation done={onComplete} />

                        <ambientLight intensity={1.5} />

                        <Environment preset="night" />

                        <Galaxy />

                    </Suspense>

                </Canvas>

            )}

            <style jsx>{`

        .intro{
          font-size:clamp(1.5rem,3vw,3rem);
          opacity:0;
          animation:fade 2s forwards;
        }

        .title{
          font-size:clamp(2rem,5vw,5rem);
          letter-spacing:0.25em;
          opacity:0;
          animation:fade 2s forwards;
        }

        @keyframes fade{
          0%{opacity:0; transform:scale(.95)}
          20%{opacity:1}
          80%{opacity:1}
          100%{opacity:0; transform:scale(1.05)}
        }

      `}</style>

        </div>
    )
}


// "use client";

// import { Canvas, useFrame, useLoader } from "@react-three/fiber";
// import { Environment, PerspectiveCamera, Stars } from "@react-three/drei";
// import { Suspense, useEffect, useRef, useState, useMemo } from "react";
// import * as THREE from "three";
// import { PLYLoader } from "three/examples/jsm/loaders/PLYLoader";


// // ─────────────────────────────
// // INTRO TIMING
// // ─────────────────────────────
// const TEXT_DURATION = 100
// const TEXT_GAP = 50

// const CAMERA_SPEED = 0.40
// const FINAL_WARP_SPEED = 18



// // ─────────────────────────────
// // Galaxy Model (PLY)
// // ─────────────────────────────
// function Galaxy() {

//     const geometry = useLoader(PLYLoader, "/model/model.ply")

//     const ref = useRef<THREE.Points>(null!)

//     useEffect(() => {
//         geometry.computeVertexNormals()
//         geometry.center()
//     }, [geometry])

//     const material = useMemo(() => {

//         return new THREE.PointsMaterial({
//             size: 0.05,
//             vertexColors: true,
//             transparent: true,
//             opacity: 0.9,
//             blending: THREE.AdditiveBlending,
//             depthWrite: false,
//             sizeAttenuation: true
//         })

//     }, [])

//     useFrame((_, delta) => {

//         if (ref.current) {
//             ref.current.rotation.y += delta * 0.02
//         }

//     })

//     return <points ref={ref} geometry={geometry} material={material} />
// }



// // ─────────────────────────────
// // Camera Animation
// // ─────────────────────────────
// function CameraAnimation({ done }: { done: () => void }) {

//     const cam = useRef<THREE.PerspectiveCamera>(null!)

//     const progress = useRef(0)
//     const warp = useRef(false)

//     const forward = new THREE.Vector3()

//     const curve = new THREE.CatmullRomCurve3([
//         new THREE.Vector3(0, 0, 40),
//         new THREE.Vector3(0, 0, 35),
//         new THREE.Vector3(0.5, 0.5, 20),
//         new THREE.Vector3(1.5, 1, 10),
//         new THREE.Vector3(2, 1.5, 5),
//         new THREE.Vector3(2, 1.5, 3),
//     ])

//     useFrame((_, delta) => {

//         if (!cam.current) return

//         if (!warp.current) {

//             progress.current += delta * CAMERA_SPEED

//             if (progress.current > 1) progress.current = 1

//             const pos = curve.getPointAt(progress.current)

//             cam.current.position.copy(pos)

//             cam.current.lookAt(0, 0, 0)

//             if (progress.current >= 1) {

//                 cam.current.getWorldDirection(forward)

//                 warp.current = true
//             }

//         }
//         else {

//             cam.current.position.addScaledVector(forward, delta * FINAL_WARP_SPEED)

//             cam.current.fov += delta * 25
//             cam.current.updateProjectionMatrix()

//             if (cam.current.position.length() < 1) {
//                 done()
//             }

//         }

//     })

//     return (
//         <PerspectiveCamera
//             ref={cam}
//             makeDefault
//             position={[0, 0, 40]}
//             fov={45}
//         />
//     )
// }



// // ─────────────────────────────
// // Intro Component
// // ─────────────────────────────
// export default function Intro({ onComplete }: { onComplete: () => void }) {

//     const [textPhase, setTextPhase] = useState(0)
//     const [showGalaxy, setShowGalaxy] = useState(false)

//     useEffect(() => {

//         const t1 = setTimeout(() => setTextPhase(1), 500)

//         const t2 = setTimeout(() => setTextPhase(2), TEXT_DURATION + TEXT_GAP)

//         const t3 = setTimeout(() => setTextPhase(3), (TEXT_DURATION + TEXT_GAP) * 2)

//         const t4 = setTimeout(() => setTextPhase(4), (TEXT_DURATION + TEXT_GAP) * 3)

//         const t5 = setTimeout(() => {
//             setTextPhase(0)
//             setShowGalaxy(true)
//         }, (TEXT_DURATION + TEXT_GAP) * 4)

//         return () => {
//             clearTimeout(t1)
//             clearTimeout(t2)
//             clearTimeout(t3)
//             clearTimeout(t4)
//             clearTimeout(t5)
//         }

//     }, [])



//     return (

//         <div className="fixed inset-0 bg-black z-50 flex items-center justify-center text-white text-center">

//             {textPhase === 1 && <p className="intro">We looked at the sky.</p>}
//             {textPhase === 2 && <p className="intro">We asked questions.</p>}
//             {textPhase === 3 && <p className="intro">We reached the stars.</p>}
//             {textPhase === 4 && <h1 className="title">Evolution of Space</h1>}

//             {showGalaxy && (

//                 <Canvas camera={{ position: [0, 0, 40], fov: 45 }} gl={{ antialias: true }}>

//                     <color attach="background" args={["black"]} />

//                     <Stars
//                         radius={200}
//                         depth={60}
//                         count={8000}
//                         factor={4}
//                         fade
//                         speed={1}
//                     />

//                     <Suspense fallback={null}>

//                         <CameraAnimation done={onComplete} />

//                         <ambientLight intensity={0.4} />

//                         <pointLight position={[0, 0, 10]} intensity={2} />

//                         <Environment preset="night" />

//                         <Galaxy />

//                     </Suspense>

//                 </Canvas>

//             )}

//             <style jsx>{`

//         .intro{
//           font-size:clamp(1.5rem,3vw,3rem);
//           opacity:0;
//           animation:fade 2s forwards;
//         }

//         .title{
//           font-size:clamp(2rem,5vw,5rem);
//           letter-spacing:0.25em;
//           opacity:0;
//           animation:fade 2s forwards;
//         }

//         @keyframes fade{
//           0%{opacity:0; transform:scale(.95)}
//           20%{opacity:1}
//           80%{opacity:1}
//           100%{opacity:0; transform:scale(1.05)}
//         }

//       `}</style>

//         </div>
//     )
// }