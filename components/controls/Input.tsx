import classes from './Control.module.css';
type InputProps = {
    label:string,
} & React.InputHTMLAttributes<HTMLInputElement> & React.RefAttributes<HTMLInputElement>;
export default function Input({label, required, ...props}:InputProps){
    return (
        <div className={classes.control}>
          <label>
            <span>
              {label}
              {!required && <span className={classes.optional}> (valgfri)</span>}
            </span>
            <input required={required}
            {...props} 
            />
          </label>
        </div>
    );
}