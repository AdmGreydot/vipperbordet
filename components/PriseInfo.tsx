import { Info, Tag } from 'lucide-react';
import classes from './PriseInfo.module.css';
export default function PriseInfo(){
    return (
        <div className={classes.wrap}>
            <div className={classes.head}>
                <Tag strokeWidth={1.25} />
                <h4>Enkel og gennemsigtig pris</h4>
            </div>
            <div className={classes.item}>
                <p>Pr. bordkile</p>
                <span className={classes.amount}>3,50 kr.</span>
            </div>
            <div className={classes.item}>
                <p>Oprettelse af personligt stempel</p>
                <span className={classes.amount}>150 kr</span>
            </div>
            <div className={classes.footer}>
                <Info strokeWidth={1.25} />
                <p>Stempel betales kun ved første bestilling. Ved genbestilling er det ingen ekstra stempelomkostning.</p>
            </div>
        </div>
    )
}