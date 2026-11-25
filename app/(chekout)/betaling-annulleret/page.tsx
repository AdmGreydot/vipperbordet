import classes from '../page.module.css';

export default function BetalingAnnulleretPage() {
    return (
        <main className={classes.payment}>
            <div className={classes.card}>
                <div className={classes.icon}>
                    !
                </div>

                <h1>Betalingen blev ikke gennemført</h1>

                <p>
                    Betalingen er blevet annulleret, og vi har ikke modtaget
                    nogen betaling.
                </p>

                <p>
                    Fakturaen er stadig åben. Har I spørgsmål, er I
                    velkomne til at kontakte os.
                </p>
            </div>
        </main>
    );
}