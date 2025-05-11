export interface IPosts {
	content: string;
	time?: string;
	isEditable: boolean,
	isLiked:boolean
	image: string;
	user:{
		username:string,
		image:string
	};
	_count:{
		comments:number,
		likes:number
	}
}

export interface IPostState {
	posts:IPosts[]
}