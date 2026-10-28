import classes from "./Control.module.css";
type TextareaProps = {
    label:string
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>  & React.RefAttributes<HTMLTextAreaElement>;
export default function Textarea({label, required, ...props}:TextareaProps){
    return (
        <div className={classes.control}>
          <label>
            <span>
              {label}
              {!required && <span className={classes.optional}> (valgfri)</span>}
            </span>
            <textarea required={required} rows={5} {...props}></textarea>
          </label>
        </div>
    );
}