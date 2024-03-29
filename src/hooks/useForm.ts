import { useState } from "react";


export function useForm <T extends {[n: string]: string}> (initValues: T) {

    const [values, setValues] = useState(initValues);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        
        const {value, name} = e.target;

        setValues({...values, [name]: value});
    };

    
    return {values, handleChange, setValues};
}