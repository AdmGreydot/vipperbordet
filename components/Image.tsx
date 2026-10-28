import classes from './Image.module.css';
type ImageProps={
    src:string,
    children:React.ReactNode,
    textInside?:boolean
}
export default function Image({src, textInside, children}:ImageProps){
    return (
        <div className={`${classes.image} ${textInside?classes.textInside:''}`}>
            <img src={src} alt="" />
            <div className={classes.text}>{children}</div>
        </div>
    );
}