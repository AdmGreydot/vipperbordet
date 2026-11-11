import Link from 'next/link';
import classes from './Header.module.css'
import Image from 'next/image';
export default function Header(){
    return (
        <header className={classes.header}>
            <div className="container">
                <div className={classes.wrap}>
                    <Link href="/" className={classes.logo}>
                        <Image 
                        src="/logo.png" 
                        alt="Vipperbordet" 
                        width={70} 
                        height={70} />
                        <p>Vipperbordet</p>
                    </Link>
                    <a href='/#bestil' className={`btn btn-white ${classes.button}`}>Bestil bordkiler →</a>
                </div>
            </div>
        </header>
    );
}