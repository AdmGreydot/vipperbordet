import classes from './Hero.module.css';
import Stats from './Stats';
export default function Hero(){
    return (
        <section className={classes.hero}>
            <img src="/hero.png" alt="Hero" />
            <div className="container">
                <div className={classes.group}>
                    <div className={classes.accent}>Ikke igen.</div>
                    <svg className={classes.arrow} width="49" height="44" viewBox="0 0 49 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.5 0C2.50061 28.5 14.6715 38.6835 44.8738 33M37.9998 41.5L44.8738 33L35.8738 27" strokeWidth="5" stroke="white"/>
                    </svg>
                    <h1>Derfor har vi lavet bordkilen.</h1>
                    <a href='/#bestil' className='btn btn-white'>Bestil jeres bordkiler</a>
                </div>
                <Stats />
            </div>
        </section>
    );
}