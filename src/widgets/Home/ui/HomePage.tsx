import { Post } from '@features/posts/index'
import style from "../style/homePage.module.css"
export const HomePage = () =>{
	return(
		<div className={style.content}>
			<Post/>
		</div>
	)
}