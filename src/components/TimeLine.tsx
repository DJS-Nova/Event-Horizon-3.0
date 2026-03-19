'use client';

import React, { useRef, useLayoutEffect, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture, useGLTF, Stars, Line } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

// Register GSAP
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const ASSET_PATH = '/timeline';

// ==========================================
// 🎛️ CONTROLS: TWEAK SIZES, POSITIONS & ROTATIONS HERE
// ==========================================
const SCALES = {
    moon: 0.5,
    chandrayaan: 0.07,
    sputnik: 0.1,
    hubble: 0.05,
    iss: 0.009,
    rocket: 0.5,
    jamesWebb: 0.3,
};

const ORBIT_RADII = {
    mercury: 10,
    venus: 16,
    sputnik: 3.0,
    hubble: 4.5,
    iss: 6.0,
    moon: 15.0,
};

const ROCKET_ROTATION_OFFSET = [Math.PI / 2, Math.PI, 0] as [number, number, number];
const EARTH_POS = new THREE.Vector3(25, 0, 0);
const MARS_POS = new THREE.Vector3(35, 0, -25);
const JWST_POS = new THREE.Vector3(60, 10, 20);
const CHANDRAYAAN_POS = new THREE.Vector3(0, SCALES.moon + -0.03, 0);

// ==========================================
// 📝 2D TEXT OVERLAYS (Adjust top/left/right/bottom to position on screen)
// ==========================================
const TEXT_OVERLAYS = [
    { stage: 0, time: "8:00 PM", title: "Inauguration Ceremony", top: "40%", left: "55%", fontWeight: "100" },
    { stage: 1, time: "9:00 PM", title: "Speaker Session", top: "40%", right: "15%", fontWeight: "100" },
    { stage: 2, time: "10:00 PM", title: "Round 1", top: "30%", left: "15%", fontWeight: "100" },
    { stage: 3, time: "11:30 PM", title: "Round 2", top: "60%", right: "10%", fontWeight: "100" },
    { stage: 4, time: "1:00 AM", title: "Round 3", top: "25%", left: "10%", fontWeight: "100" },
    { stage: 5, time: "3:00 AM", title: "Round 4", top: "45%", right: "20%", fontWeight: "100" },
    { stage: 6, time: "5:00 AM", title: "Prize Distribution", top: "70%", left: "15%" },
    { stage: 7, time: "6:00 AM", title: "Closing Ceremony", top: "15%", left: "50%", transform: "translateX(-50%)" }, // Centered example
];


// --- MAIN EXPERIENCE COMPONENT (3D Only) ---
const Experience = ({ setActiveStage }: { setActiveStage: (stage: number) => void }) => {
    const sunRef = useRef<THREE.Group>(null);
    const sputnikRef = useRef<THREE.Group>(null);
    const hubbleRef = useRef<THREE.Group>(null);
    const issRef = useRef<THREE.Group>(null);
    const rocketRef = useRef<THREE.Group>(null);
    const jwstRef = useRef<THREE.Group>(null);
    const moonRef = useRef<THREE.Group>(null);
    const earthRef = useRef<THREE.Group>(null);

    const [sunTex, mercuryTex, venusTex, earthTex, moonTex, marsTex] = useTexture([
        `${ASSET_PATH}/texture/2k_sun.jpg`,
        `${ASSET_PATH}/texture/2k_mercury.jpg`,
        `${ASSET_PATH}/texture/2k_venus_surface.jpg`,
        `${ASSET_PATH}/texture/2k_earth_daymap.jpg`,
        `${ASSET_PATH}/texture/2k_moon.jpg`,
        `${ASSET_PATH}/texture/2k_mars.jpg`,
    ]);

    const { camera } = useThree();
    const scrollProxy = useRef({ progress: 0 });
    const lastStage = useRef(0);

    useLayoutEffect(() => {
        const tl = gsap.to(scrollProxy.current, {
            progress: 7,
            ease: "none",
            scrollTrigger: {
                trigger: "#scroll-container",
                start: "top top",
                end: "bottom bottom",
                scrub: 1.5,
            }
        });
        return () => { tl.kill(); };
    }, []);

    useFrame(() => {
        const p = scrollProxy.current.progress;

        // Broadcast active stage to the 2D UI Layer
        const currentStage = Math.round(p);
        if (currentStage !== lastStage.current) {
            lastStage.current = currentStage;
            setActiveStage(currentStage);
        }

        const idx = Math.floor(p);
        const nextIdx = Math.min(idx + 1, 7);
        const t = p - idx;
        const easeT = gsap.parseEase("power2.inOut")(t);

        const waypoints = [
            { target: sunRef, offset: new THREE.Vector3(0, 80, 5) },
            { target: sputnikRef, offset: new THREE.Vector3(2, 1, 2) },
            { target: hubbleRef, offset: new THREE.Vector3(-2, 1, 2) },
            { target: issRef, offset: new THREE.Vector3(2, -1, 2) },
            { target: rocketRef, offset: new THREE.Vector3(4, 2, 4) },
            { target: jwstRef, offset: new THREE.Vector3(3, 1, 3) },
            { target: moonRef, offset: new THREE.Vector3(2, 1, 3) },
            {
                target: earthRef,
                dynamicOffset: () => {
                    const moonPos = new THREE.Vector3();
                    if (moonRef.current) moonRef.current.getWorldPosition(moonPos);
                    const dirFromEarthToMoon = moonPos.clone().sub(EARTH_POS).normalize();
                    return dirFromEarthToMoon.multiplyScalar(ORBIT_RADII.moon + 5);
                }
            },
        ];

        if (!waypoints[idx].target.current || !waypoints[nextIdx].target.current) return;

        const pos1 = new THREE.Vector3();
        waypoints[idx].target.current.getWorldPosition(pos1);
        const pos2 = new THREE.Vector3();
        waypoints[nextIdx].target.current.getWorldPosition(pos2);

        const finalLookAt = pos1.clone().lerp(pos2, easeT);

        const camPos1 = pos1.clone();
        if (waypoints[idx].dynamicOffset) camPos1.copy(waypoints[idx].dynamicOffset!());
        else camPos1.add(waypoints[idx].offset!);

        const camPos2 = pos2.clone();
        if (waypoints[nextIdx].dynamicOffset) camPos2.copy(waypoints[nextIdx].dynamicOffset!());
        else camPos2.add(waypoints[nextIdx].offset!);

        const finalCamPos = camPos1.lerp(camPos2, easeT);

        camera.position.lerp(finalCamPos, 0.1);
        camera.lookAt(finalLookAt);
    });

    return (
        <group>
            {/* MACRO PLANET ORBITS */}
            <OrbitPath radius={ORBIT_RADII.mercury} color="#ffffff" opacity={0.08} />
            <OrbitPath radius={ORBIT_RADII.venus} color="#ffffff" opacity={0.08} />
            <OrbitPath radius={25} color="#ffffff" opacity={0.1} />
            <OrbitPath radius={Math.hypot(MARS_POS.x, MARS_POS.z)} color="#ffffff" opacity={0.1} />

            {/* SUN */}
            <group ref={sunRef}>
                <mesh position={[0, 0, 0]}>
                    <sphereGeometry args={[5, 64, 64]} />
                    <meshStandardMaterial map={sunTex} emissiveMap={sunTex} emissive="#ffdd88" emissiveIntensity={1.5} />
                    <pointLight intensity={800} distance={300} decay={1.5} />
                </mesh>
            </group>

            {/* INNER PLANETS */}
            <PlanetOrbit texture={mercuryTex} radius={ORBIT_RADII.mercury} size={0.8} speed={0.1} />
            <PlanetOrbit texture={venusTex} radius={ORBIT_RADII.venus} size={1.2} speed={0.05} />

            {/* EARTH SYSTEM */}
            <group position={EARTH_POS} ref={earthRef}>
                <mesh>
                    <sphereGeometry args={[2, 64, 64]} />
                    <meshStandardMaterial map={earthTex} />
                </mesh>

                <OrbitingSatellite ref={sputnikRef} path={`${ASSET_PATH}/sputnik.glb`} radius={ORBIT_RADII.sputnik} speed={0.2} scale={SCALES.sputnik} tiltX={0.4} />
                <OrbitingSatellite ref={hubbleRef} path={`${ASSET_PATH}/hubble_space_telescope.glb`} radius={ORBIT_RADII.hubble} speed={0.1} scale={SCALES.hubble} tiltX={-0.3} tiltZ={0.5} />
                <OrbitingSatellite ref={issRef} path={`${ASSET_PATH}/international_space_station.glb`} radius={ORBIT_RADII.iss} speed={0.05} scale={SCALES.iss} tiltZ={-0.2} />

                {/* Moon Orbiting Earth */}
                <group rotation={[0.1, 0, 0.1]}>
                    <OrbitPath radius={ORBIT_RADII.moon} color="#ffffff" opacity={0.05} />
                    <OrbitingBody radius={ORBIT_RADII.moon} speed={0.02} ref={moonRef}>
                        <mesh>
                            <sphereGeometry args={[SCALES.moon, 32, 32]} />
                            <meshStandardMaterial map={moonTex} />
                        </mesh>
                        <StaticModel path={`${ASSET_PATH}/isro_chandrayyan-3.glb`} position={CHANDRAYAAN_POS} scale={SCALES.chandrayaan} />
                    </OrbitingBody>
                </group>
            </group>

            {/* MARS SYSTEM */}
            <group position={MARS_POS}>
                <mesh>
                    <sphereGeometry args={[1.5, 64, 64]} />
                    <meshStandardMaterial map={marsTex} />
                </mesh>
            </group>

            {/* STATIC ROCKET */}
            <FixedRocket ref={rocketRef} startPos={EARTH_POS} endPos={MARS_POS} progress={0.6} />

            {/* DEEP SPACE: JAMES WEBB */}
            <group position={JWST_POS} ref={jwstRef}>
                <StaticModel path={`${ASSET_PATH}/james_webb_space_telescope.glb`} position={new THREE.Vector3(0, 0, 0)} scale={SCALES.jamesWebb} />
            </group>
        </group>
    );
};

// --- HELPER COMPONENTS ---
const OrbitPath = ({ radius, color, opacity }: { radius: number, color: string, opacity: number }) => {
    const points = [];
    for (let i = 0; i <= 128; i++) {
        const angle = (i / 128) * Math.PI * 2;
        points.push(new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius));
    }
    return <Line points={points} color={color} transparent opacity={opacity} lineWidth={0.5} />;
};

const PlanetOrbit = ({ texture, radius, size, speed }: { texture: any, radius: number, size: number, speed: number }) => {
    const ref = useRef<THREE.Group>(null);
    useFrame(({ clock }) => {
        if (ref.current) {
            const t = clock.getElapsedTime() * speed;
            ref.current.position.set(Math.cos(t) * radius, 0, Math.sin(t) * radius);
            ref.current.rotation.y += 0.005;
        }
    });
    return (
        <group>
            <group ref={ref}><mesh><sphereGeometry args={[size, 32, 32]} /><meshStandardMaterial map={texture} /></mesh></group>
        </group>
    );
};

const OrbitingSatellite = React.forwardRef(({ path, radius, speed, scale, tiltX = 0, tiltZ = 0 }: any, externalRef) => {
    const { scene } = useGLTF(path, true) as any;
    const internalRef = useRef<THREE.Group>(null);
    React.useImperativeHandle(externalRef, () => internalRef.current);

    useFrame(({ clock }) => {
        if (internalRef.current) {
            const t = clock.getElapsedTime() * speed;
            internalRef.current.position.set(Math.cos(t) * radius, 0, Math.sin(t) * radius);
            internalRef.current.rotation.y = -t;
        }
    });

    return (
        <group rotation={[tiltX, 0, tiltZ]}>
            <OrbitPath radius={radius} color="#ffffff" opacity={0.08} />
            <group ref={internalRef}>
                <primitive object={scene.clone()} scale={scale} />
            </group>
        </group>
    );
});
OrbitingSatellite.displayName = "OrbitingSatellite";

const OrbitingBody = React.forwardRef(({ radius, speed, children }: any, externalRef) => {
    const internalRef = useRef<THREE.Group>(null);
    React.useImperativeHandle(externalRef, () => internalRef.current);

    useFrame(({ clock }) => {
        if (internalRef.current) {
            const t = clock.getElapsedTime() * speed;
            internalRef.current.position.set(Math.cos(t) * radius, 0, Math.sin(t) * radius);
            internalRef.current.rotation.y += 0.002;
        }
    });
    return <group ref={internalRef}>{children}</group>;
});
OrbitingBody.displayName = "OrbitingBody";

const StaticModel = ({ path, position, scale }: { path: string, position: THREE.Vector3, scale: number }) => {
    const { scene } = useGLTF(path, true) as any;
    const ref = useRef<THREE.Group>(null);
    useFrame(() => { if (ref.current) ref.current.rotation.y += 0.001; });
    return <group ref={ref} position={position}><primitive object={scene.clone()} scale={scale} /></group>;
};

const FixedRocket = React.forwardRef(({ startPos, endPos, progress }: any, externalRef) => {
    const { scene } = useGLTF(`${ASSET_PATH}/atlas_v.glb`, true) as any;
    const internalRef = useRef<THREE.Group>(null);
    React.useImperativeHandle(externalRef, () => internalRef.current);

    const curve = useMemo(() => {
        const midPoint = new THREE.Vector3().addVectors(startPos, endPos).multiplyScalar(0.5);
        midPoint.y += 10;
        return new THREE.QuadraticBezierCurve3(startPos, midPoint, endPos);
    }, [startPos, endPos]);

    const rocketPos = curve.getPoint(progress);
    const lookAtPos = curve.getPoint(progress + 0.01);
    const trailPoints = curve.getPoints(50).filter((_, i) => i / 50 <= progress);

    useLayoutEffect(() => {
        if (internalRef.current) internalRef.current.lookAt(lookAtPos);
    }, [lookAtPos]);

    return (
        <group>
            <Line points={trailPoints} color="#ffaa00" transparent opacity={0.3} lineWidth={1} />
            <group position={rocketPos} ref={internalRef}>
                <primitive object={scene.clone()} scale={SCALES.rocket} rotation={ROCKET_ROTATION_OFFSET} />
            </group>
        </group>
    );
});
FixedRocket.displayName = "FixedRocket";


// --- MAIN LAYOUT SHELL ---
export default function EventHorizonTimeline() {
    // 🎛️ State lifted to control 2D UI
    const [activeStage, setActiveStage] = useState(0);

    return (
        <div id="timeline" className="relative w-full bg-black text-white selection:bg-cyan-500/30 font-sans">


            {/* STICKY WRAPPER */}
            <div className="sticky top-0 left-0 w-full h-screen overflow-hidden z-0">
                <h2 className="absolute top-6 left-1/2 -translate-x-1/2 z-30 
               text-4xl md:text-6xl lg:text-7xl 
               text-white uppercase tracking-[0.2em] 
               font-black text-center pointer-events-none">
                    Timeline
                </h2>
                {/* 2D HTML OVERLAY LAYER */}
                <div className="absolute inset-0 z-20 pointer-events-none">
                    {TEXT_OVERLAYS.map((overlay, index) => {
                        const isActive = activeStage === overlay.stage;
                        return (
                            <div
                                key={index}
                                className={`absolute transition-all duration-700 ease-in-out ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                                    }`}
                                style={{
                                    top: overlay.top,
                                    left: (overlay as any).left,
                                    right: (overlay as any).right,
                                    bottom: (overlay as any).bottom,
                                    transform: (overlay as any).transform || 'none',
                                }}
                            >
                                <div className="text-cyan-400 font-bold text-sm md:text-base tracking-widest uppercase drop-shadow-md font-extralight">
                                    {overlay.time}
                                </div>
                                {/* Example Tailwind Stroke: text-transparent bg-clip-text [-webkit-text-stroke:1px_white] */}
                                <div className="text-white text-2xl font-extralight md:text-5xl drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                                    {overlay.title}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* 3D Canvas */}
                <div className="absolute inset-0 z-10 w-full h-full">
                    <Canvas camera={{ position: [0, 80, 5], fov: 45 }}>
                        <color attach="background" args={['#000000']} />
                        <ambientLight intensity={0.6} />
                        <directionalLight position={[20, 50, 20]} intensity={2} color="#ffffff" castShadow />
                        <directionalLight position={[-20, -20, -20]} intensity={0.5} color="#4455aa" />

                        <Stars radius={150} depth={50} count={6000} factor={4} saturation={0} fade speed={0.2} />
                        <React.Suspense fallback={null}>
                            <Experience setActiveStage={setActiveStage} />
                        </React.Suspense>
                    </Canvas>
                </div>
            </div>

            {/* SCROLL TRIGGER CONTAINER */}
            <div id="scroll-container" className="relative z-10 w-full -mt-[100vh]">
                <section className="h-[800vh] w-full pointer-events-none"></section>
            </div>
        </div>
    );
}