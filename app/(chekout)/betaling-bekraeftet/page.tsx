import classes from '../page.module.css';

export default function BetalingBekraeftetPage() {
    return (
        <main className={classes.payment}>
            <div className={classes.card}>
                <div className={classes.icon}>
                    ✓
                </div>

                <h1>Tak for jeres betaling!</h1>

                <p>
                    Betalingen er gennemført, og vi har modtaget jeres ordre.
                </p>

                <p>
                    I modtager en bekræftelse på e-mail.
                </p>
            </div>
        </main>
    );
}