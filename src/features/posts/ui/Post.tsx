import { useEffect } from 'react';
import style from '../style/post.module.css'
import { getPost } from '../api/request';
import { useAppDispatch } from '../../../providers/store/hooks';
export const Post = () =>{
	const dispatch = useAppDispatch();
	useEffect(()=>{
		dispatch(getPost())
	},[])
	return(
		<>
			<h2>
				New Post
			</h2>
		</>
	);
}