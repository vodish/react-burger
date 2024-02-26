import { useEffect, useState } from "react";


export default function OrderTimer() {

    const [ second, setSecond ] = useState(1)

    useEffect( () => {
        setTimeout( ()=>setSecond(second + 1) , 1000)
    }, [second])


    return <div>{second}</div>

}