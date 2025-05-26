
export type InputType = {
	Placeholder:string,
	type:string
}

export type ButtonType = {
	text:string,
	anotherСlass?:string,
	onClick?:()=>void,
}
export type LinkType = {
	img:string,
	text?:string,
	width:string,
	onClick?:(type:string)=>void,
	isActive?: boolean,
}

export type CardType = {
	userImg:string,
	userName:string,
	data?:number,
	content:string,
	postImg:string,
	postLike:number,
	postComments:number,
	isLiked?:boolean,
	count?:number,
	postId?: number,
	getLike: () => void,
	deleteLike:()=>void,
	handleLike?:()=>Promise<void>,
	handleUnLike?:()=>Promise<void>
}

export type ModalType = {
	userImg:string,
	userName:string,
	content:string,
	postImg:string,
	isLike:boolean,
	handleUnLike:()=>Promise<void>,
	handleLike:()=>Promise<void>,
	count:number,
	setModuleOpen: React.Dispatch<React.SetStateAction<boolean>>
}