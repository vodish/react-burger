import { TOrderStatus } from "../../utils/types";


export default function OrderStatus({status}: {status: TOrderStatus}) {


    const statuses = {
        status:     { name: status, color: 'inherit' },
        'created':  { name: 'Создан', color: '#4C4CFF' },
        'pending':  { name: 'Готовится', color: '#E33CD5' },
        'done':     { name: 'Готов', color: '#00CCCC' },
    }

    return(
    <div style={{color: statuses[status].color}}>
        {statuses[status].name}
    </div>
    );
}

