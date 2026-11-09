import classes from './How.module.css';
import Image from './Image';
export default function How(){
    return (
        <section>
            <div className="container">
                <div className={classes.wrap}>
                    <div className={classes.content}>
                        <h2>Et lille trick, når bordet vipper.</h2>
                        <p>En bordkile er god at have ved hånden, når et bord pludselig står ustabilt. En enkel hjælp, der kan gøre en stor forskel for gæstens oplevelse.</p>
                    </div>
                    <div className={classes.imageGroup}>
                        <Image src="/images/how1.png">
                            <p><b>Uden bordkile</b></p>
                            <p>Bordet vipper, og gæsten mærker det.</p>
                        </Image>
                        <Image src="/images/how2.png">
                            <p><b>Med bordkile</b></p>
                            <p>En hurtig justering, og bordet står stabilt igen.</p>
                        </Image>
                    </div>
                </div>
            </div>
        </section>
    );
}