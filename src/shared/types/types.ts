export type InputType = {
	Placeholder:string,
	type:string
}

export type ClickType = {
	click?:(event: React.MouseEvent<HTMLButtonElement>) => void
}