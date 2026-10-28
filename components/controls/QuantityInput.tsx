"use client";

import { useState } from "react";
import classes from './Control.module.css';
type InputProps = {
    label:string,
    required:boolean,
    name:string
};

export default function QuantityInput({label, required, name}:InputProps) {
  const [quantity, setQuantity] = useState(50);
  const step=10;
  const decrease = () => {
    setQuantity((prev) => Math.max(50, prev - step));
  };

  const increase = () => {
    setQuantity((prev) => prev + step);
  };

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
                onChange={(e) => setQuantity(Number(e.target.value))}
                min="50"
                name={name}
            />

            <button type="button" onClick={increase}>
                +
            </button>
        </div>
    </div>
  );
}