import { ChevronRight } from 'lucide-react';
import classes from './DesignSection.module.css';
import { TextElement } from '@/types/kile';
type TextLayersProps = {
    layers:TextElement[],
    activeLayerId:string|null,
    onChangeActiveLayer:(id:string)=>void
}
export default function TextLayers({layers, activeLayerId, onChangeActiveLayer}:TextLayersProps){
    return (<div>
        {layers.map(layer => (
            <button key={layer.id} className={`${classes.nav} ${activeLayerId===layer.id?classes.navActive:''}`} type="button" onClick={()=>onChangeActiveLayer(layer.id)}>
                {layer.text}
                <ChevronRight/>
            </button>
        ))}

    </div>);
}