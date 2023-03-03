import { 
    Html, 
    useMatcapTexture, 
    useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useState, useRef } from "react";

export default function Duck(){
    
    //all gltf models are downloaded from https://market.pmnd.rs/
    const duck = useGLTF(`./glTF/duck.gltf`)

    const [donutMaterial, setDonutMaterial] = useState();
    const [donutGeometry, setDonutGeometry] = useState();
    const [showDonuts, setShowDonuts] = useState(false);

    const donutsGroup = useRef([]);

     //matcaps are used from here https://github.com/emmelleppi/matcaps
    const [donutTexture] = useMatcapTexture(`FBB43F_FBE993_FB552E_FCDD65`, 256);

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

    const createDonuts = (event) => 
    {
        setShowDonuts(!showDonuts);
    }
    return <>
    
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

        <torusGeometry ref={setDonutGeometry} args={[ 1, 0.6, 16, 32 ]}/>
        <group ref={donutsGroup}>
            {
            [...Array(1000)].map((value, index) => 
                <mesh
                    key={index}
                    geometry={donutGeometry}
                    material={donutMaterial}
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
            
        <meshMatcapMaterial ref={setDonutMaterial} matcap={donutTexture}/>
    </>
}