'use client';
import { useState } from 'react';
import Select from '../controls/Select';
import TextLayers from './TextLayers';
import classes from './DesignSection.module.css';
import TextProperties from './TextProperties';
import { NewTextElement, TextElement } from '@/types/kile';
import DesignCanvas from './DesignCanvas';


type DesignSectionProps = {
    color: string;
    layers: TextElement[];
    onChangeLayer:(element:TextElement)=>void;
    onChangeColor:(color:string)=>void;
    onAddLayer:(element:NewTextElement)=>void;
    onExportReady: (exportFn: () => Promise<Blob | null>) => void;
};
export default function DesignSection({color, layers, onChangeLayer, onChangeColor, onAddLayer, onExportReady}:DesignSectionProps){
    const [activeLayerId, setActiveLayerId] = useState<string | null>(
        layers[0]?.id ?? null
    );
    const activeLayer = layers.find(
        (layer) => layer.id === activeLayerId
    ) ?? null;

    function handleChangeActiveLayer(id: string) {
        setActiveLayerId(id);
    }
    const colorOptions = [
        {
            value: '#000000',
            label: (
                <span className={classes.colorOption}>
                    <span style={{ background: '#000000' }} />
                    Sort
                </span>
            ),
        },
        {
            value: '#2563EB',
            label: (
                <span className={classes.colorOption}>
                    <span style={{ background: '#2563EB' }} />
                    Blå
                </span>
            ),
        },
        {
            value: '#16A34A',
            label: (
                <span className={classes.colorOption}>
                    <span style={{ background: '#16A34A' }} />
                    Grøn
                </span>
            ),
        },
        {
            value: '#DC2626',
            label: (
                <span className={classes.colorOption}>
                    <span style={{ background: '#DC2626' }} />
                    Rød
                </span>
            ),
        },
    ];
    
    return (<>
    <div className={classes.layout}>
        <div className={classes.column}>
            <Select
                label="Farve"
                placeholder='Vælg en farve'
                value={color}
                options={colorOptions}
                onChange={onChangeColor}
            />
            <TextLayers layers={layers} activeLayerId={activeLayerId} onChangeActiveLayer={handleChangeActiveLayer} />
            {layers.length < 4 && <button 
            type='button'
            className={`btn btn-outline ${classes.navButton}`}
            onClick={()=>onAddLayer({
                text: "Text",
                fontSize: 44,
            })}>+ Tilføj tekst</button>}
        </div>
        <div className={classes.column}>
            {activeLayer && <TextProperties key={activeLayerId} layer={activeLayer} onChangeLayer={onChangeLayer}/>}
        </div>
        <div className={classes.canvasWrap}>
            <DesignCanvas
                layers={layers}
                activeLayerId={activeLayerId}
                color={color}
                onUpdateLayer={onChangeLayer}
                onChangeActiveLayer={handleChangeActiveLayer}
                onExportReady={onExportReady}
            />
        </div>
    </div>
    </>);
}