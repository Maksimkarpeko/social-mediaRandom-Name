export interface IPosts {
	id?:number,
	content: string;
	updatedAt?: number;
	isEditable: boolean,
	isLiked:boolean
	image: string;
	user:{
		username:string,
		image:string
	};
	_count:{
		like: number;
		comments:number,
		likes:number
	}
}

export interface IComments {
	content:string,
	user:{
		image:string,
		username:string
	}
}
export interface IPostState {
	posts:IPosts[]
}
export interface ICommentsState {
	comments:IComments[]
}