export type CardType = {
	userImg:string,
	userName:string,
	data?:number,
	content:string,
	postImg:string,
	isLiked:boolean,
	count?:number,
	postLike:number,
	postId: number,
	postCommentsCount:number,
	handleLike?:()=>Promise<void>,
	handleUnLike?:()=>Promise<void>
	getLike: () => void,
	deleteLike:()=>void,
	getComment: () => void
}
export interface IUseCardPost {
	isLiked:boolean,
	count:number,
	postLike:number,
	postId: number,
	getLike: () => void,
	deleteLike:()=>void,
	getComment: () => void
	setModalOpen: (open:boolean) => void
}