import { MeshReflectorMaterial } from "@react-three/drei";

export default function Ground(){
    return <>
        <mesh 
            position-y={ - 1 } 
            rotation-x={ - Math.PI * 0.5 } 
            scale={ 100 }
        >
            <planeGeometry />
            <MeshReflectorMaterial 
                color="greenyellow" 
                resolution={512} 
                blur={[1000,1000]} 
                mixBlur={.6} 
                mirror={.95}
            />
        </mesh>
    </>
}