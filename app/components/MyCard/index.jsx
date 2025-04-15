import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
import { Canvas, extend, useThree, useFrame } from "@react-three/fiber";
import {
	useGLTF,
	useTexture,
	Environment,
	Lightformer,
} from "@react-three/drei";
import {
	BallCollider,
	CuboidCollider,
	Physics,
	RigidBody,
	useRopeJoint,
	useSphericalJoint,
} from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";

extend({ MeshLineGeometry, MeshLineMaterial });
useGLTF.preload("/card/tag3.glb");
useTexture.preload("/card/band.jpg");

export default function MyCard() {
	// const { debug } = useControls({ debug: false })

	const [clicked, setClicks] = useState(0);
	return (
		<>
			<Canvas
				camera={{ position: [9, 0, 12], fov: 25 }}
				className="cursor-default"
			>
				<ambientLight intensity={Math.PI} />
				<Physics interpolate gravity={[0, -40, 0]} timeStep={1 / 60}>
					<Band clicks={() => setClicks(clicked + 1)} />
				</Physics>
				<Environment background blur={0.75}>
					{/* <color attach="background" args={['black']} /> */}
					<Lightformer
						intensity={6}
						color="white"
						position={[0, -1, 5]}
						rotation={[0, 0, Math.PI / 3]}
						scale={[100, 0.1, 1]}
					/>
					<Lightformer
						intensity={3}
						color="white"
						position={[-1, -1, 1]}
						rotation={[0, 0, Math.PI / 3]}
						scale={[100, 0.1, 1]}
					/>
					<Lightformer
						intensity={3}
						color="white"
						position={[1, 1, 1]}
						rotation={[0, 0, Math.PI / 3]}
						scale={[100, 0.1, 1]}
					/>
				</Environment>
			</Canvas>
			{clicked >= 2 && clicked < 5 && (
				<p className="absolute -z-50 bottom-[15vh] right-[15dvw] text-wrap w-36 text-center">
					Seems like you enjoy it. You clicked{" "}
					<span className="linear-wipe-fir font-bold">{clicked}</span> times.
				</p>
			)}
			{clicked >= 5 && clicked < 8 && (
				<p className="absolute -z-50 bottom-[15vh] right-[15dvw] text-wrap w-36 text-center">
					You know... I could make that for you too!
				</p>
			)}
			{clicked >= 8 && clicked < 11 && (
				<p className="absolute -z-50 bottom-[15vh] right-[15dvw] text-wrap w-36 text-center">
					Stop It! You're gonna break it...
				</p>
			)}
			{clicked >= 11 && clicked < 13 && (
				<p className="absolute -z-50 bottom-[15vh] right-[15dvw] text-wrap w-36 text-center">
					Just kidding!
				</p>
			)}
			{clicked >= 13 && clicked < 15 && (
				<p className="absolute -z-50 bottom-[15vh] right-[15dvw] text-wrap w-36 text-center">
					No Seriously, Stop It!
				</p>
			)}
			{clicked === 15 && (
				<p className="absolute -z-50 bottom-[15vh] right-[15dvw] text-wrap w-36 text-center">
					Whatever...
				</p>
			)}
		</>
	);
}

function Band({ maxSpeed = 30, minSpeed = 10, clicks }) {
	const band = useRef();
	const fixed = useRef();
	const j1 = useRef();
	const j2 = useRef();
	const j3 = useRef();
	const card = useRef(); // prettier-ignore
	const vec = new THREE.Vector3();
	const ang = new THREE.Vector3();
	const rot = new THREE.Vector3();
	const dir = new THREE.Vector3(); // prettier-ignore
	const segmentProps = {
		type: "dynamic",
		canSleep: true,
		colliders: false,
		angularDamping: 2,
		linearDamping: 2,
	};
	const { nodes, materials } = useGLTF("/card/tag2.glb");
	const texture = useTexture("/card/band.jpg");
	const { width, height } = useThree((state) => state.size);
	const [curve] = useState(
		() =>
			new THREE.CatmullRomCurve3([
				new THREE.Vector3(),
				new THREE.Vector3(),
				new THREE.Vector3(),
				new THREE.Vector3(),
			]),
	);
	const [dragged, drag] = useState(false);
	const [hovered, hover] = useState(false);

	useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 0.6]); // prettier-ignore
	useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]); // prettier-ignore
	useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]); // prettier-ignore
	useSphericalJoint(j3, card, [
		[0, 0, 0],
		[0, 1.45, 0],
	]); // prettier-ignore

	useFrame((state, delta) => {
		if (dragged) {
			vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
			dir.copy(vec).sub(state.camera.position).normalize();
			vec.add(dir.multiplyScalar(state.camera.position.length()));
			[card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
			card.current?.setNextKinematicTranslation({
				x: vec.x - dragged.x,
				y: vec.y - dragged.y,
				z: vec.z - dragged.z,
			});
		}
		if (fixed.current) {
			[j1, j2].forEach((ref) => {
				if (!ref.current.lerped)
					ref.current.lerped = new THREE.Vector3().copy(
						ref.current.translation(),
					);
				const clampedDistance = Math.max(
					0.1,
					Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())),
				);
				ref.current.lerped.lerp(
					ref.current.translation(),
					delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed)),
				);
			});
			// Calculate catmul curve
			curve.points[0].copy(j3.current.translation());
			curve.points[1].copy(j2.current.lerped);
			curve.points[2].copy(j1.current.lerped);
			curve.points[3].copy(fixed.current.translation());
			band.current.geometry.setPoints(curve.getPoints(32));
			// Tilt it back towards the screen
			ang.copy(card.current.angvel());
			rot.copy(card.current.rotation());
			card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
		}
	});
	curve.curveType = "chordal";
	texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
	return (
		<>
			<group position={[4.5, 4, 0]}>
				<RigidBody ref={fixed} {...segmentProps} type="fixed" />
				<RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
					<BallCollider args={[0.1]} />
				</RigidBody>
				<RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
					<BallCollider args={[0.1]} />
				</RigidBody>
				<RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
					<BallCollider args={[0.1]} />
				</RigidBody>
				<RigidBody
					position={[2, 0, 0]}
					ref={card}
					{...segmentProps}
					type={dragged ? "kinematicPosition" : "dynamic"}
				>
					<CuboidCollider args={[0.8, 1.125, 0.01]} />
					<group
						onClick={clicks}
						scale={2.25}
						position={[0, -1.2, -0.05]}
						onPointerOver={() => hover(true)}
						onPointerOut={() => hover(false)}
						onPointerUp={(e) => (
							e.target.releasePointerCapture(e.pointerId), drag(false)
						)}
						onPointerDown={(e) => (
							e.target.setPointerCapture(e.pointerId),
							drag(
								new THREE.Vector3()
									.copy(e.point)
									.sub(vec.copy(card.current.translation())),
							)
						)}
					>
						<mesh geometry={nodes.card.geometry}>
							<meshPhysicalMaterial
								map={materials.base.map}
								map-anisotropy={16}
								clearcoat={1}
								clearcoatRoughness={0.15}
								roughness={0.3}
								metalness={0.5}
							/>
						</mesh>
						<mesh
							geometry={nodes.clip.geometry}
							material={materials.metal}
							material-roughness={0.3}
						/>
						<mesh geometry={nodes.clamp.geometry} material={materials.metal} />
					</group>
				</RigidBody>
			</group>
			<mesh ref={band}>
				<meshLineGeometry />
				<meshLineMaterial
					color="white"
					depthTest={false}
					resolution={[width, height]}
					useMap
					map={texture}
					repeat={[-3, 1]}
					lineWidth={1}
				/>
			</mesh>
		</>
	);
}
