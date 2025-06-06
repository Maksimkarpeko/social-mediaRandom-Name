
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


export type ModalType = {
	postId:number | undefined
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