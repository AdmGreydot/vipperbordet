import Image from 'next/image';
import classes from './Hero.module.css';
import Stats from './Stats';
export default function Hero(){
    return (
        <section className={classes.hero}>
            <Image 
            src="/hero.png" 
            fill
            alt="Hero"
            priority />
            <div className="container">
                <div className={classes.group}>
                    <div className={classes.accent}>Ups. Bordet vipper!</div>
                    <h2>Heldigvis har vi en løsning.</h2>
                    <p>Vi tilbyder praktiske bordkiler til caféer, restauranter og andre virksomheder – klar til de øjeblikke, hvor bordet pludselig vipper.</p>
                    <a href='/#bestil' className='btn btn-white'>Bestil jeres bordkiler</a>
                </div>
                <Stats />
            </div>
        </section>
    );
}