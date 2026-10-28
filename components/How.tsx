import classes from './How.module.css';
import Image from './Image';
export default function How(){
    return (
        <section>
            <div className="container">
                <div className={classes.wrap}>
                    <div className={classes.content}>
                        <h2>Bordet vipper. Bordkilen løser det.</h2>
                        <p>En bordkile placeres under det ustabile bordben og giver bordet den støtte, der mangler. En enkel løsning, der gør en stor forskel i hverdagen.</p>
                    </div>
                    <div className={classes.imageGroup}>
                        <Image src="/images/how1.png">
                            <p><b>Uden bordkile</b></p>
                            <p>Bordet vipper og kan føles ustabilt.</p>
                        </Image>
                        <Image src="/images/how2.png">
                            <p><b>Med bordkile</b></p>
                            <p>Bordet står stabilt og sikkert.</p>
                        </Image>
                    </div>
                </div>
            </div>
        </section>
    );
}