import { TextElement } from "@/types/kile";
import Input from "../controls/Input";
import classes from './DesignSection.module.css';
import FontPicker from "./FontPicker";
import { Underline, Italic, Bold } from "lucide-react";
type TextPropertiesProps = {
    layer:TextElement,
    onChangeLayer:(element:TextElement)=>void
}
export default function TextProperties({layer, onChangeLayer}:TextPropertiesProps){
    function handleChangeStyle(style: 'bold' | 'italic' | 'underline') {
        const currentStyles = layer.style ?? [];
        console.log(layer);
        const updatedStyles = currentStyles.includes(style)
            ? currentStyles.filter((item) => item !== style)
            : [...currentStyles, style];
    
        onChangeLayer({
            ...layer,
            style: updatedStyles,
        });
    }
    function checkStyle(style: 'bold' | 'italic' | 'underline'){
        const currentStyles = layer.style ?? [];
    
        return currentStyles.includes(style)
            ? true
            : false;
    }
    return (
        <div>
            <Input label="Tekst" type="text" name="text_kilen" defaultValue={layer.text} required 
            onChange={(e)=>onChangeLayer({...layer, text:e.target.value})}/>
            <FontPicker layer={layer} font={layer.fontFamily ?? 'Nunito'} onChange={onChangeLayer}/>
            <div className={classes.textStyles}>
                <Input label="Størrelse" type="number" name="fontsize1" defaultValue={layer.fontSize ?? '24' }
                onChange={(e)=>onChangeLayer({...layer, fontSize:Number(e.target.value)})}/>
                <button type="button" onClick={()=>handleChangeStyle('bold')} className={checkStyle('bold')?classes.activeStyle:''}><Bold /></button>
                <button type="button" onClick={()=>handleChangeStyle('italic')} className={checkStyle('italic')?classes.activeStyle:''}><Italic /></button>
                <button type="button"  onClick={()=>handleChangeStyle('underline')} className={checkStyle('underline')?classes.activeStyle:''}><Underline /></button>
            </div>
        </div>
    );
}