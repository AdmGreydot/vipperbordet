import Image from './Image';
import classes from './Places.module.css';
export default function Places(){
    return (
        <section>
            <div className="container">
                <div className={classes.head}>
                    <h2>En lille løsning når bordet vipper</h2>
                    <p>Uanset om I driver café, restaurant, bar, hotel eller et andet sted med mange borde, gør bordkilen det nemt at få styr på de borde, der ikke står helt stabilt.</p>
                </div>
                <div className={classes.imageGroup}>
                    <Image src="/images/place1.png" textInside={true}>
                        <p>Restauranter</p>
                    </Image>
                    <Image src="/images/place2.png" textInside={true}>
                        <p>Caféer</p>
                    </Image>
                    <Image src="/images/place3.png" textInside={true}>
                        <p>Hoteller</p>
                    </Image>
                    <Image src="/images/place4.png" textInside={true}>
                        <p>Kontorer</p>
                    </Image>
                </div>
            </div>
        </section>
    );
}