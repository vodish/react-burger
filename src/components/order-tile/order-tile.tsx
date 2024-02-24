import cm from "./order-tile.module.css"
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components"
import { TFeedOrder, TIngredient, TOrderStatus } from "../../utils/types"
import { useSelector2 } from "../../services/redux"
import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import OrderStatus from "../order-status/order-status"


type TList1 = {
    'list': TIngredient[],
    'more': TIngredient[],
}





export default function OrderTile({order, status}: {order: TFeedOrder, status?: boolean | undefined}) {

    const location      =   useLocation()
    const ingredients   =   useSelector2( state => state.ingredients.list )
    const indexes       =   useSelector2( state => state.ingredients.indexes )
    
    const [ list, setList   ] = useState<TList1>({'list': [], 'more': []})
    const [ sum, setSum     ] = useState(0)

    useEffect( () => {

        let sum1  =   0;
        let list1 =   order.ingredients.reduce( (acc: TList1, el) => {
            if ( ingredients[ indexes[el] ] === undefined ) return acc;
            
            const k     =   acc['list'].length < 5? 'list': 'more';
            const it    =   ingredients[ indexes[el] ]
            acc[ k ].push(it)
            sum1        =   sum1 + it.price

            return acc;
        }, list);
        
        setList(list1)
        setSum( sum1 )
        
        // console.log( order.ingredients );
        // console.log( list );

    }, [] )
    

    

    return (
        <Link
            to={`./${order.number}`}
            state={{ background: location }}
            className={cm.box}
            >
        
            <div className={cm.head}>
                <div className={cm.number}>#{order.number}</div>
                <OrderStatus status={order.status} />
                <FormattedDate className={cm.time} date={new Date(order.createdAt)} />
            </div>
            
            <div className={cm.name}>{order.name}</div>
            
            

            <div className={cm.descr}>
                <div className={cm.list}>

                    { list.more.length > 0 &&
                        <div className={cm.border}>
                            <img src={list.more[0].image_mobile} alt={`+${list.more.length}`} />
                            <span>{`+${list.more.length}`}</span>
                        </div>
                    }
                    
                    {list.list.map( (ingredient, idx) =>
                        <div key={idx} className={cm.border}>
                            <img src={ingredient.image_mobile} alt={ingredient.name} />
                        </div>
                    )}

                </div>
                <div className={cm.sum}>
                    <div className={cm.price}>{sum}</div>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        
        </Link>
    )
}