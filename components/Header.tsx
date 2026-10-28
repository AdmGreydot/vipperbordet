import Link from 'next/link';
import classes from './Header.module.css'
export default function Header(){
    return (
        <header className={classes.header}>
            <div className="container">
                <div className={classes.wrap}>
                    <Link href="/" className={classes.logo}>
                        <img src="/logo.png" alt="Vipperbordet"/>
                    </Link>
                    <a href='/#bestil' className='btn btn-white'>Bestil</a>
                </div>
            </div>
        </header>
    );
}