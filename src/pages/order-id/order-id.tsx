import cm from "./order-id.module.css"

import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components"
import { TFeedOrder, TIngredient } from "../../utils/types"
import { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import Modal from "../../components/modal/modal"
import { fetchRequest } from "../../utils/api"
import { useSelector2 } from "../../services/redux"
import OrderStatus from "../../components/order-status/order-status"



export default function OrderId() {

    const { id }        =   useParams()
    const location      =   useLocation()
    const navigate      =   useNavigate()
    const ingredients   =   useSelector2( state => state.ingredients )
    const [ order, setOrder ]   =   useState<TFeedOrder | null>(null)
    const [ list, setList ]     =   useState<TIngredient[]>([])
    const [ sum, setSum ]       =   useState(0)


    useEffect( ()=> {

        fetchRequest<{orders: TFeedOrder[], susses: boolean}>(`/api/orders/${id}`)
        .then( res => {
            if ( !res.orders[0])    return;

            const cnt = res.orders[0].ingredients.reduce<{[n: string]: number}>( (acc, id) => {
                acc[id] = !acc[id] ? 1: acc[id]+1
                return acc;
            }, {});
            
            
            let ingr: TIngredient;
            let sum1    =   0;
            const list1 =   Object.keys(cnt).reduce<TIngredient[]>(
                (acc, idx) => {
                    if ( ingredients.indexes[ idx ] ) {
                        ingr    =   {...ingredients.list[ ingredients.indexes[idx] ], count: cnt[idx]}
                        sum1    +=  (ingr.count || 0) * ingr.price
                        acc.push( ingr )
                    }
                    else {
                        acc.push({...ingredients.list[0], name: "Какой-то ингредиент", price: 0})
                    }
                    return acc;
                }
            ,[]);
            
            // console.log(list1)
            setList(list1)
            setSum(sum1)
            setOrder(res.orders[0])

        })
        .catch( (err: Error) => {
            console.log(err)
        })
        
    }, [ingredients])


    

    function printCard(order: TFeedOrder) {
        return(
            <div>
                <div className={cm.number}>#{order.number}</div>
                <div className={cm.name}>{order.name}</div>
                <OrderStatus status={order.status} />

                <div className={cm.hlist}>Состав:</div>

                <div className={cm.list}>
                    {list.map( el => (
                        <div key={el.__v}>
                            <div><img src={el.image_mobile} alt="" /></div>
                            <div>{el.name}</div>
                            <div>{el.count} x {el.price}</div>
                            <div><CurrencyIcon type="primary" /></div>
                        </div>
                    ))}
                </div>

                <div className={cm.sum}>
                    <div><FormattedDate date={new Date(order.createdAt)} /></div>
                    <div>{sum}</div>
                    <CurrencyIcon type="primary" />
                </div>
                
            </div>
        )
    }


    // пока нет заказа
    if ( !order )  return <></>;


    // карточка товара в модалке
    if ( location.state?.background ) {
        return (
        <Modal handleClose={()=>{navigate(-1)}}>
            {printCard(order)}
        </Modal>
        )
    }


    // карточка товара на отдельной странице
    return (
    <div className={cm.page}>
        {printCard(order)}
    </div>
    )
}