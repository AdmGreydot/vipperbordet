import classes from './CustomizationSection.module.css';
import PriseInfo from './PriseInfo';
export default function CustomizationSection(){
    return (
        <section className={classes.design}>
            <img src="/images/design.png" alt="" />
            <div className="container">
                <div className={classes.content}>
                    <h2>Gør bordkilen til jeres egen</h2>
                    <p>Vi trykker jeres navn eller logo på den ene side og vores Greydot-logo på den anden. En diskret og praktisk detalje, der passer til jeres sted.</p>
                    <PriseInfo/>
                </div>
            </div>
        </section>
    )
}