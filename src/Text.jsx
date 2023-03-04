import { 
    Center, 
    Text3D, 
    useMatcapTexture } from "@react-three/drei";
import { useState } from "react";


export default function Text(){
    
    const [textMaterial, setTextMaterial] = useState();

    //matcaps are used from here https://github.com/emmelleppi/matcaps
    const [textTexture] = useMatcapTexture(`E6BF3C_5A4719_977726_FCFC82`, 256);

    return <>
        
        <meshMatcapMaterial ref={setTextMaterial} matcap={textTexture}/>
    
        <Center position-y={2}>
                <Text3D
                    font="./fonts/helvetiker_regular.typeface.json"
                    material={textMaterial}
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
                    <meshMatcapMaterial matcap={textTexture}/>
                </Text3D>
            </Center> 
    </>
}