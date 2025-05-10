export interface IPost {
	content: string;
	time?: string;
	image: string;
	user:{
		name:string,
		image:string
	};
}

export interface IPostState {
	post:IPost
}