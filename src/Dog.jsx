import { 
    Html, 
    PivotControls, 
    useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef,useState } from "react";
import * as THREE from 'three'

export default function Dog(){

    //all gltf models are downloaded from https://market.pmnd.rs/
    const dog = useGLTF(`./glTF/dog.gltf`);
    const icosahedronRef = useRef();

    const [ smoothedCameraPostion ] = useState(() => new THREE.Vector3(0, 10, 250));
    const [ smoothedCameraTarget ] = useState(() => new THREE.Vector3(0,0,0));

    useFrame((state,delta)=>
    {
        icosahedronRef.current.rotation.y += delta/2;
        icosahedronRef.current.rotation.x += delta/2;

        const cameraPosition = new THREE.Vector3();
        const cameraTarget = new THREE.Vector3();

        cameraPosition.x = 0;
        cameraPosition.y = 0.75;
        cameraPosition.z = 15;
        cameraTarget.x = cameraPosition.x;
        cameraTarget.y = 0;
        cameraTarget.z = -cameraPosition.z;

        smoothedCameraPostion.lerp(cameraPosition, 1 * delta);
        smoothedCameraTarget.lerp(cameraTarget, 1 * delta);

        state.camera.position.copy(smoothedCameraPostion);
        state.camera.lookAt(smoothedCameraTarget);

    })

    const colorChanger = (event) => 
    {
        icosahedronRef.current.material.color.set(`hsl(${Math.random() * 360}, 100%, 75%)`)
        event.stopPropagation();
        
    }

    return <>
        <PivotControls 
            anchor={[0, 0, 0]} 
            depthTest={false}
            lineWidth={5}
            axisColors={['#9381ff', '#ff4d6d', '#7ae582']}
        >
            <mesh 
                ref={icosahedronRef}
                position ={[0, 3.7, 0]}
                onClick = {() => window.location.href = 'https://github.com/blockedaccess/threejs-helloworld'}
                onPointerEnter={() => {document.body.style.cursor = 'pointer'}}
                onPointerLeave={() => {document.body.style.cursor = 'default'}}
            >
                <icosahedronGeometry args={[1, 2]} />
                <meshStandardMaterial flatShading color="#A882DD"/>               
            </mesh>

            <Html 
                wrapperClass="label" 
                position={[ 0, 5, 0]} 
                center 
                positionFixed
                distanceFactor={8} 
            >
                code in the icosahedron
            </Html>
        </PivotControls>

        <primitive 
            object={dog.scene} 
            position-y={-1} 
            position-x={-2}
            onClick={colorChanger} 
            onPointerEnter={() => {document.body.style.cursor = 'pointer'}}
            onPointerLeave={() => {document.body.style.cursor = 'default'}}
        >
            <Html 
                wrapperClass="label" 
                position={[ 0, 2, 0]} 
                center 
                distanceFactor={8} 
            >
                click the dog
            </Html>
        </primitive>
    </>
}