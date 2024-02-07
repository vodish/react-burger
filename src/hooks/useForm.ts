import { useState } from "react";


export function useForm <T> (initValues: T) {

    const [values, setValues] = useState(initValues);


    const handleChange = (e: React.BaseSyntheticEvent) => {
        
        const {value, name} = e.target;

        setValues({...values, [name]: value});
    };

    
    return {values, handleChange, setValues};
}