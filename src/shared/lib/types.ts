export type InputType = {
	Placeholder:string,
	type:string
}

export type ButtonType = {
	text:string,
	anotherСlass?:string
}
export type LinkType = {
	img:string,
	text?:string,
	width:string,
	onClick?:(type:string)=>void
}