import { 
    OrbitControls, 
    Sky} from "@react-three/drei";
import { Perf } from "r3f-perf";
import Duck from "./Duck.jsx";
import Dog from "./Dog.jsx";
import Bear from "./Bear.jsx";
import Text from "./Text.jsx";
import Ground from "./Ground.jsx";

export default function Experience()
{
    return <>
        <OrbitControls makeDefault/>
        <Perf position="top-left"/>        
        <directionalLight 
            position={ [ 1, 2, 3 ] } 
            intensity={ 1.5 } 
        />
        <ambientLight intensity={ 0.5 }/>
        <Sky />
        <Ground/>
        <Text/>
        <Dog/>
        <Duck/>
        <Bear/>

    </>
}