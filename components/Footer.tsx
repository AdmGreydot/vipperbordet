import classes from './Footer.module.css';
export default function Footer(){
    return (
        <footer className={classes.footer}>
            <div className={`container ${classes.wrap}`}>
                <p>© 2026 Vipperbordet · Greydot · CVR 34399131</p>
                <a href="mailto:kontakt@greydot.dk">kontakt@greydot.dk</a>
            </div>
        </footer>
    );
}