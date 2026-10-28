import classes from './Control.module.css';
type SelectProps = {
    label:string,
    placeholder:string,
    options:readonly{
        value:string,
        label:string
    }[]
} & React.SelectHTMLAttributes<HTMLSelectElement>;
export default function Select({label, placeholder, options, required, ...props}:SelectProps){
    return (
        <div className={classes.control}>
          <label>
            <span>
                {label}
                {!required && <span className={classes.optional}> (optional)</span>}
            </span>
            <select required={required} {...props}>
                <option value="" disabled>{placeholder}</option>
                {options.map(item=><option key={item.value} value={item.value}>{item.label}</option>)}
            </select>
          </label>
        </div>
    );
}