import {FC} from 'react'
import { ClickType } from '../types/types'
import style from '../styles/ui/Button.module.css'
export const Button:FC<ClickType> = ({click}) =>{
	return (
		<>
			<button className={style.Button} onClick={click}>
				Submit
			</button>
		</>
	)
}