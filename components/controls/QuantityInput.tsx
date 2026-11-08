import classes from './Control.module.css';
type InputProps = {
    label:string,
    required:boolean,
    name:string,
    quantity:number,
    increase:()=>void,
    decrease:()=>void,
    addQuantity:(quantity:number)=>void
};

export default function QuantityInput({label, required, name, quantity, increase, decrease, addQuantity}:InputProps) {
  return (
    <div className={classes.control}>
        <label>
            <span>
              {label}
              {!required && <span className={classes.optional}> (valgfri)</span>}
            </span>

        </label>
        <div className={classes.quantity}>
            <button type="button" onClick={decrease}>
                −
            </button>

            <input
                type="number"
                value={quantity}
                onChange={(e) => addQuantity(Number(e.target.value))}
                min="50"
                name={name}
                required={required}
            />

            <button type="button" onClick={increase}>
                +
            </button>
        </div>
    </div>
  );
}