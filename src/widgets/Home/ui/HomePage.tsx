import { Post } from '../../../features/posts/ui/Post'
import style from "../style/homePage.module.css"
export const HomePage = () =>{
	return(
		<div className={style.content}>
			<Post/>
		</div>
	)
}