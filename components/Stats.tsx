import { Archive, Layers, Leaf, Zap } from 'lucide-react';
import classes from './Stats.module.css';
export default function Stats(){
    return (
        <div className={classes.wrap}>
            <div className={classes.item}>
                <Zap strokeWidth={2}/>
                <p>Hurtig løsning, når bordet vipper</p>
            </div>
            <div className={classes.item}>
                <Leaf strokeWidth={2}/>
                <p>Diskret og praktisk</p>
            </div>
            <div className={classes.item}>
                <Layers strokeWidth={2}/>
                <p>Til caféer, restauranter og andre</p>
            </div>
            <div className={classes.item}>
                <Archive strokeWidth={2}/>
                <p>Altid klar i skuffen</p>
            </div>
        </div>
    );
}