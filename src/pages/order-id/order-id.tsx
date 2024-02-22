
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components"
import { TFeedOrder, TIngredient, TOrderStatus } from "../../utils/types"
import { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import Modal from "../../components/modal/modal"



export default function OrderId() {

    const { id }    = useParams()
    const location  = useLocation()
    const navigate  = useNavigate()



    // карточка товара в модалке
    if ( location.state?.background ) {
    return (
        <Modal handleClose={()=>{navigate(-1)}}>
            <div>
                <div>Подробности заказа в модалочке</div>
                <div>id: {id}</div>
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