import { Leaf, ListCheck, Pen, WavesHorizontal } from 'lucide-react';
import classes from './Stats.module.css';
export default function Stats(){
    return (
        <div className={classes.wrap}>
            <div className={classes.item}>
                <WavesHorizontal strokeWidth={2}/>
                <p>Stabile borde og glade gæster</p>
            </div>
            <div className={classes.item}>
                <Pen strokeWidth={2}/>
                <p>Jeres navn på kilen</p>
            </div>
            <div className={classes.item}>
                <Leaf strokeWidth={2}/>
                <p>En enkel løsning med stor effekt</p>
            </div>
            <div className={classes.item}>
                <ListCheck strokeWidth={2}/>
                <p>Mindre besvær for jer og personalet</p>
            </div>
        </div>
    );
}