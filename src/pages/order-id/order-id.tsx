import cm from "./order-id.module.css"

import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components"
import { TFeedOrder, TIngredient, TOrderStatus } from "../../utils/types"
import { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import Modal from "../../components/modal/modal"
import { fetchRequest } from "../../utils/api"



export default function OrderId() {

    const { id }    = useParams()
    const location  = useLocation()
    const navigate  = useNavigate()
    const [ order, setOrder ] = useState<TFeedOrder | null>(null)

    useEffect( ()=> {

        fetchRequest<{orders: TFeedOrder[], susses: boolean}>(`/api/orders/${id}`)
        .then( res => {
            if ( res.orders[0]) {
                setOrder(res.orders[0])
            }
        })
        .catch( (err: Error) => {
            console.log(err)
        })
        
        // console.log(err)
    })


    if ( !order )  return <></>;



    // карточка товара в модалке
    if ( location.state?.background && order ) {
        return (
            <Modal handleClose={()=>{navigate(-1)}}>
                
                <div>
                    <div className={cm.number}>#{order.number}</div>
                    <div className={cm.name}>{order.name}</div>
                    <div className={cm.status}>{order.status}</div>

                    
                    <div className={cm.list}>
                        <div>Состав:</div>
                        {order.ingredients.map( (el, key) => <div key={key}>
                            <div>img</div>
                            <div>{el}</div>
                            <div>1 X 00 <CurrencyIcon type="primary" /></div>
                        </div>)}
                    </div>

                    <div className={cm.sum}>
                        <div><FormattedDate date={new Date(order.createdAt)} /></div>
                        <div>00</div>
                        <CurrencyIcon type="primary" />
                    </div>
                    
                </div>
                
            </Modal>
        )
    }


    // карточка товара на отдельной странице
    return (
    <div className="center">
        <div>Заказ на отдельной страничке</div>
        <div>id: {id}</div>
    </div>
    )
}