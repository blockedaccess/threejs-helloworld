import { 
    Html, 
    useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function Bear(){

    //all gltf models are downloaded from https://market.pmnd.rs/
    const bear = useGLTF(`./glTF/bear.gltf`);
    const bigSphereRef = useRef();

    useFrame((state,delta)=>
    {
        bigSphereRef.current.rotation.y += delta/50;

    })
        
    const cChanger = (event) =>
    {
        bigSphereRef.current.material.color.set(`hsl(${Math.random() * 360}, 100%, 75%)`);   
        event.stopPropagation();
    }

    return<>
    
        <mesh 
            ref={bigSphereRef}
            rotation-x={ - Math.PI * 0.5 }
            scale={ 100 }
        >
            <sphereGeometry />
            <meshStandardMaterial 
            color="cyan"
            wireframe/>
        </mesh>
        <primitive 
            object={bear.scene} 
            position-y={-1} 
            position-x={2}      
            onClick={cChanger}
            onPointerEnter={() => {document.body.style.cursor = 'pointer'}}
            onPointerLeave={() => {document.body.style.cursor = 'default'}}       
        >                
            <Html 
                wrapperClass="label" 
                position={[ 0, 2, 0]} 
                center 
                distanceFactor={8} 
            >
                click the bear
            </Html>
        </primitive>
    </>
}