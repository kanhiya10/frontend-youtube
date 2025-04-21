export interface VideoInfoType {
  _id: string;
  title: string;
  videoFile: string;
  description?: string;
  thumbnail?: string;
  createdAt: string;
//   owner:string;
//   isPublished:boolean;
  views:number;
  likes:number;
//   duration:number;

}

export interface UserInfoType{
    _id:string;
    fullName:string;
    username:string;
    avatar:string;
    coverImage:string;

}