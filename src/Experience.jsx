import { Html, Float, Text, PivotControls, OrbitControls, TransformControls, MeshReflectorMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";


export default function Experience()
{
    const cubeRef = useRef(); 
    const sphereRef = useRef();
    const bigSphereRef = useRef();

    useFrame((state,delta)=>
    {
        bigSphereRef.current.rotation.y += delta/50
    })
    return <>

        <OrbitControls 
            makeDefault 
        />
        
        <directionalLight 
            position={ [ 1, 2, 3 ] } 
            intensity={ 1.5 } 
        />

        <ambientLight 
            intensity={ 0.5 } 
        />

        <PivotControls 
            anchor={[0,0,0]}   
            depthTest={false} 
            lineWidth={4} 
            axisColors={['#9381ff', '#ff4d6d', '#7ae582']} 
            scale={100} 
            fixed={true} 
        >
            <mesh 
                ref={sphereRef} 
                position-x={ - 2 }
            >
                    <sphereGeometry  />
                    <meshStandardMaterial 
                    color="orange" 
                    />
                <Html 
                    wrapperClass="label" 
                    position={[ -1, 1, 0]} 
                    center 
                    distanceFactor={8} 
                >
                    sphere
                </Html>
            </mesh>

        </PivotControls>
            <mesh 
                ref={cubeRef} 
                position-x={ 2 } 
                scale={ 1.5 }
            >
                <boxGeometry />
                <meshStandardMaterial 
                    color="mediumpurple" 
                />
                <Html 
                    wrapperClass="label" 
                    position={[ .85, .65, 0]} 
                    center 
                    distanceFactor={8} 
                >
                    cube
                </Html>
            </mesh>

        <TransformControls 
            object={cubeRef} 
            mode="translate"
            />
    
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

        <Float 
            speed={5} 
            floatIntensity={3}
        >
            <Text 
                font="./bangers-v20-latin-regular.woff" 
                fontSize={1} 
                color="salmon" 
                position-y={2} 
                maxWidth={2}
                textAlign="center"
            >
                Hello World ?
            </Text>
        </Float>   

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


    </>
}