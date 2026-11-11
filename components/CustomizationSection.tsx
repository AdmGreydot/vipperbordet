import Image from 'next/image';
import classes from './CustomizationSection.module.css';
import PriseInfo from './PriseInfo';
export default function CustomizationSection(){
    return (
        <section className={classes.design}>
             <Image
                src="/images/design.png"
                alt="Wooden table wedge"
                width={1200}
                height={900}
                sizes="(max-width: 800px) 100vw, 55vw"
                className={classes.designImage}
            />
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