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

export interface IPostState {
	posts:IPosts[]
}