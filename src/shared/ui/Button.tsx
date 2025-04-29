import {FC} from 'react'
import { ButtonType } from '../lib/types'
import style from '../styles/ui/Button.module.css'
import classNames from 'classnames'
export const Button:FC<ButtonType> = ({text,anotherСlass}) =>{
	return (
		<>
			<button className={classNames(style.button, anotherСlass)}>
				{text}
			</button>
		</>
	)
}