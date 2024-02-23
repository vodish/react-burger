
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


    useEffect(()=> {

        fetchRequest(`/api/orders/${id}`)
        .then( (res) => {
            console.log(res)
        } )
        .catch( (err: Error) => {
            console.log(err)
        })

    })



    // карточка товара в модалке
    if ( location.state?.background ) {
    return (
        <Modal handleClose={()=>{navigate(-1)}}>
            <div>
                <div>Подробности заказа в модалочке</div>
                <div>id: {id}</div>
                https://norma.nomoreparties.space/api/orders/{id}
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