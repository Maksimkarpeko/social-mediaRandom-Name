import {FC} from 'react'
import { ClickType } from '../lib/types'
import style from '../styles/ui/Button.module.css'
export const Button:FC<ClickType> = ({click}) =>{
	return (
		<>
			<button className={style.button} onClick={click}>
				Submit
			</button>
		</>
	)
}