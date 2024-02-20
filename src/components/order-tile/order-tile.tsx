import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components"
import cm from "./order-tile.module.css"
import { TFeedOrder } from "../../utils/types"

//: JSX.Element

const list: number[] = [1,1,1,1]

export default function OrderTile({order}: {order: TFeedOrder}) {

    return <div className={cm.box}>

        <div className={cm.head}>
            <div className={cm.number}>#{order.number}</div>
            <FormattedDate className={cm.time} date={new Date(order.createdAt)} />
        </div>
        
        <div className={cm.name}>{order.name}</div>
        <div className={cm.descr}>
            <div className={cm.list}>
                <div className={cm.border}><img src="https://code.s3.yandex.net/react/code/bun-02-mobile.png" alt="" /><span>+3</span></div>
                {list.map(
                    (el, k) => <div key={k} className={cm.border}><img src="https://code.s3.yandex.net/react/code/bun-02-mobile.png" alt="" /></div>
                )}
            </div>
            <div className={cm.sum}>
                <div className={cm.price}>345</div>
                <CurrencyIcon type="primary" />
            </div>
        </div>
        

    </div>
}