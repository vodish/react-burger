import { useState } from "react";


export function useForm(initValues={}) {
    const [values, setValues] = useState(initValues);

    const handleChange = (event) => {
        const {value, name} = event.target;
        setValues({...values, [name]: value});
    };

    return {values, handleChange, setValues};
}