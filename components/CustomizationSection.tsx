import classes from './CustomizationSection.module.css';
export default function CustomizationSection(){
    return (
        <section className={classes.design}>
            <img src="/images/design.png" alt="" />
            <div className="container">
                <div className={classes.content}>
                    <h2>Gør bordkilen til jeres egen</h2>
                    <p>Vi trykker jeres navn eller korte tekst direkte på bordkilen. En diskret og praktisk detalje, der passer til jeres sted. </p>
                </div>
            </div>
        </section>
    )
}