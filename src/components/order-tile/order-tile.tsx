import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components"
import cm from "./order-tile.module.css"

//: JSX.Element

const list: number[] = [1,1,1,1]

export default function OrderTile() {

    return <div className={cm.box}>

        <div className={cm.head}>
            <div className={cm.number}>#98797</div>
            <FormattedDate className={cm.time} date={new Date()} />
        </div>
        
        <div className={cm.name}>Название наме наме наме наме наме наме</div>

        <div className={cm.descr}>
            <ul className={cm.list}>
                <li className={cm.border}><img src="https://code.s3.yandex.net/react/code/bun-02-mobile.png" alt="" /><span>+3</span></li>
                {list.map(
                    () => <li className={cm.border}><img src="https://code.s3.yandex.net/react/code/bun-02-mobile.png" alt="" /></li>
                )}
            </ul>
            <div className={cm.sum}>
                <div className={cm.price}>345</div>
                <CurrencyIcon type="primary" />
            </div>
        </div>
        

    </div>
}