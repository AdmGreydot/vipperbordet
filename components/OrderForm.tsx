"use client";

import { useState } from 'react';
import classes from './OrderForm.module.css';
import Input from './controls/Input';
import QuantityInput from './controls/QuantityInput';
import Select from './controls/Select';
import Textarea from './controls/Textarea';
export default function OrderForm(){
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);
    const [isSuccess, setIsSuccess] = useState(false);
    async function submitHandler(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        const companyName = formData.get("company_name") as string;
        const contactName = formData.get("contact_name") as string;
        const email = formData.get("email") as string;
        const textKilen = formData.get("text_kilen") as string;
        const color = formData.get("color") as string;
        const quantity = formData.get("quantity") as string;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let errorsArr:string[]=[];
        setIsSuccess(false);
        setErrors([]);
        if(companyName.trim().length === 0 || contactName.trim().length === 0 || email.trim().length === 0 || textKilen.trim().length === 0 || color.trim().length === 0 || quantity.trim().length === 0){
            errorsArr.push('Du har ikke udfyldt alle obligatoriske felter.');
        }
        if (!emailRegex.test(email)) {
            errorsArr.push('Indtast en gyldig e-mailadresse');
        }
        if(errorsArr.length>0){
            setErrors(errorsArr);
            return;
        }
        setIsLoading(true);
        const data = {
            companyName,
            contactName,
            email,
            phone: formData.get("phone") as string,
            textKilen,
            color,
            quantity,
            kommentar: formData.get("kommentar") as string,
        }
        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            
            const result = await response.json();
            if (!response.ok) {
                setErrors(['Der opstod en fejl. Prøv venligst igen, eller kontakt os direkte på email.']);
                console.error('Failed to send email:', result.error);
                return;
            }
        
            setIsSuccess(true);
            form.reset();

        } catch (error) {
            setErrors(['Der opstod en fejl. Prøv venligst igen, eller kontakt os direkte på email.']);
            console.error('Failed to send email:', error);
        } finally{
            setIsLoading(false);
        }
    }
    return (
        <section className={classes.bestil}>
            <div className="container">
                <div className={classes.formWrapper}>
                    <div className={classes.head}>
                        <h2>Bestil jeres bordkiler</h2>
                        <p>Vælg farve, tekst og antal – så er I klar til bestilling.</p>
                    </div>
                    <form onSubmit={submitHandler}>
                        {errors.length > 0 && (
                            <div className={classes.errors}>
                                {errors.map((error) => (
                                    <p key={error}>{error}</p>
                                ))}
                            </div>
                        )}
                        {isSuccess && (
                        <div className={classes.success}>
                            <p className={classes.successTitle}>Tak for jeres bestilling!</p>
                            <p>Vi har modtaget jeres bestilling og vender tilbage hurtigst muligt.</p>
                        </div>
                        )}
                        <div className={classes.row}>
                            <Input label="Navn på virksomhed" type="text" name="company_name" required/>
                            <Input label="Kontaktperson" type="text" name="contact_name" required/>
                        </div>
                        <div className={classes.row}>
                            <Input label="E-mail" type="email" name="email" required/>
                            <Input label="Telefon" type="tel" name="phone"/>
                        </div>
                        <Input label="Tekst på bordkilen( fx. jeres navn)" type="text" name="text_kilen" required/>
                        <div className={classes.row}>
                            <Select 
                                label="Farve"
                                name="color"
                                required
                                defaultValue=''
                                placeholder='Vælg en farve'
                                options={
                                    [
                                        {
                                            value:"black",
                                            label:"Sort"
                                        },
                                        {
                                            value:"blue",
                                            label:"Blå"
                                        },
                                        {
                                            value:"green",
                                            label:"Grøn"
                                        },
                                        {
                                            value:"red",
                                            label:"Rød"
                                        },
                                    ]
                                }
                            />
                            <QuantityInput label="Antal" required name="quantity"/>
                        </div>
                        <Textarea label="Kommentar" name='kommentar'/>
                        <div className={classes.footer}>
                            <button type='submit' className={`btn ${classes.button}`} disabled={isLoading}>Bestil bordkiler</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}