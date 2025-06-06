import { ChangeEvent, useState } from 'react';
import {
	getComments,
	getPost,
	postComments,
} from 'src/features/posts/api/request';
import { useAppDispatch } from 'src/providers/store/hooks';
import { IUseModalPost } from '../lib/type';
export const useModalPost = ({ setModuleOpen, postId }:IUseModalPost) => {
	const [fieldInput, setFieldInput] = useState<string>('');
	const [isActiveInput, setIsActiveInput] = useState<boolean>(false);
	const dispatch = useAppDispatch();
	const closeModel = () => {
		setModuleOpen(false);
	};
	const handChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
		setFieldInput(event.target.value);
		if (event.target.value.length > 0) {
			setIsActiveInput(true);
		} else {
			setIsActiveInput(false);
		}
	};
	const createComments = async () => {
		await postComments(fieldInput, postId);
		setFieldInput('');
		dispatch(getComments(postId));
		dispatch(getPost());
	};
	return { isActiveInput, fieldInput, closeModel, handChange, createComments };
};
