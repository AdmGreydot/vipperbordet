'use client';

import { useState } from 'react';
import classes from './Control.module.css';
import { ChevronDown } from 'lucide-react';

type SelectProps = {
    label:string,
    placeholder:string,
    options:{
        label:React.ReactNode,
        value:string,
    }[],
    value:string|null,
    onChange: (value:string) => void
};

export default function Select({
    label,
    placeholder,
    value,
    options,
    onChange,
}: SelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const selectedElement = options.find(
        (item) => item.value === value
    );

    function handleSelectFont(value:string) {
        onChange(value);
        setIsOpen(false);
    }

    return (
        <div className={`control ${classes.selectControl}`}>
                <label>
                    {label}
                </label>

                <button
                    type="button"
                    className={classes.trigger}
                    onClick={() => setIsOpen((prev) => !prev)}
                >
                        {selectedElement?.label ?? placeholder}

                    <span className={classes.arrow}>
                        <ChevronDown />
                    </span>
                </button>

                {isOpen && (
                    <div className={classes.dropdown}>
                        {options.map((item) => (
                            <button
                                type="button"
                                key={item.value}
                                className={`${classes.option} ${
                                    value === item.value
                                        ? classes.active
                                        : ''
                                }`}
                                onClick={() => handleSelectFont(item.value)}
                            >
                                {item.label}

                                {value === item.value && (
                                    <span className={classes.check}>
                                        ✓
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                )}
            </div>
    );
}
