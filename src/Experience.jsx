import { Html, PivotControls, OrbitControls, MeshReflectorMaterial, Center, Text3D, useMatcapTexture, Sky, useGLTF } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { useFrame } from "@react-three/fiber";
import { useState, useRef } from "react";

export default function Experience()
{
    const icosahedronRef = useRef();
    const bigSphereRef = useRef();
    const donutsGroup = useRef([]);

    //all gltf models are downloaded from https://market.pmnd.rs/
    const bear = useGLTF(`./glTF/bear.gltf`)
    const duck = useGLTF(`./glTF/duck.gltf`)
    const dog = useGLTF(`./glTF/dog.gltf`)

    const [torusGeometry, setTorusGeometry] = useState();
    const [showDonuts, setShowDonuts] = useState(false);
    const [material, setMaterial] = useState();
    const [material2, setMaterial2] = useState();

    //matcaps are used from here https://github.com/emmelleppi/matcaps

    const [matcapTexture] = useMatcapTexture(`85B9D3_C9EAF9_417277_528789`, 256)
    const [matcapTexture2] = useMatcapTexture(`FBB43F_FBE993_FB552E_FCDD65`, 256)

    useFrame((state,delta)=>
    {
        bigSphereRef.current.rotation.y += delta/50
        icosahedronRef.current.rotation.y += delta/2
        icosahedronRef.current.rotation.x += delta/2
    })

    useFrame((state, delta) => 
    {
        for(const donut of donutsGroup.current.children){
            donut.rotation.y += delta * 1
            donut.rotation.x += delta * 1
        }
    })

    useFrame(() => {
        if (showDonuts) {
          donutsGroup.current.visible = true;
        }else{
            donutsGroup.current.visible = false;
        }
      });

    const colorChanger = (event) => 
    {
        icosahedronRef.current.material.color.set(`hsl(${Math.random() * 360}, 100%, 75%)`)
        event.stopPropagation();
        
    }
    
    const cChanger = (event) =>
    {
        bigSphereRef.current.material.color.set(`hsl(${Math.random() * 360}, 100%, 75%)`)   
        event.stopPropagation();
    }

    const createDonuts = (event) => 
    {
        setShowDonuts(!showDonuts);
    }


    return <>

        <OrbitControls makeDefault/>
        <Perf position="top-left"/>        
        
        <directionalLight 
            position={ [ 1, 2, 3 ] } 
            intensity={ 1.5 } 
        />

        <ambientLight 
            intensity={ 0.5 } 
        />
        
        <Sky />

        {/* donut shapes and color */}
        <torusGeometry ref={setTorusGeometry} args={[ 1, 0.6, 16, 32 ]}/>
        <meshMatcapMaterial ref={setMaterial} matcap={matcapTexture}/>

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
                <icosahedronGeometry  />
                <meshStandardMaterial color="#A882DD"/>               
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

        <Center position-y={2}>
            <Text3D
                font="./fonts/helvetiker_regular.typeface.json"
                material={material}
                size={ 0.75 }
                height={ 0.1 }
                curveSegments={ 12 }
                bevelEnabled
                bevelThickness={ 0.02 }
                bevelSize={ 0.02 }
                bevelOffset={ 0 }
                bevelSegments={ 5 }
            >
                Hello World
                <meshMatcapMaterial matcap={matcapTexture}/>
            </Text3D>
        </Center> 

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

        <primitive 
            object={duck.scene} 
            position-y={-1}                        
            onClick={createDonuts} 
            onPointerEnter={() => {document.body.style.cursor = 'pointer'}}
            onPointerLeave={() => {document.body.style.cursor = 'default'}}
        >
            <Html 
                wrapperClass="label" 
                position={[ 0, 2.2, 0]} 
                center 
                distanceFactor={8} 
            >
                click the duck
            </Html>
        </primitive>

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

        <group ref={donutsGroup}>
        {
        [...Array(1000)].map((value, index) => 
            <mesh
                key={index}
                geometry={torusGeometry}
                material={material2}
                position={[
                    (Math.random()- 0.5)*100, 
                    (Math.random()- 0.5)*50, 
                    (Math.random()- 0.5)*100 
                ]}
                scale={0.2 + Math.random() * 0.2}
                rotation={[
                    Math.random()*Math.PI,
                    Math.random()*Math.PI,
                    0
                ]}
                />
            )
        }
        </group>
        
        <meshMatcapMaterial ref={setMaterial2} matcap={matcapTexture2}/>

    </>
}