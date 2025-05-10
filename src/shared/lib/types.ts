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