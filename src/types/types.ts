export interface VideoInfoType {
  likes: number;
  dislikes: number;
  isSubscribed: boolean;
  subscribersCount: number;
  video:{
  owner: {
    _id: string;
    fullName: string;
    username: string;
    avatar: string;
    coverImage: string;
  };
  _id: string;
  title: string;
  videoFile: string;
  description?: string;
  thumbnail: string;
  views: number;
}
}

export interface HomeInfoType {
  _id: string;
  title: string;
  videoFile: string;
  description?: string;
  thumbnail?: string;
  createdAt: string;
//   owner:string;
//   isPublished:boolean;
  // views:number;
  // likes:number;
//   duration:number;

}


export interface UserInfoType {
  _id: string;

  likes: number;
  dislikes: number;

}

export interface Topic {
  _id: string;
  name: string;
  displayName: string;
  description?: string;
  icon?: string;
  subscriberCount: number;
}

export interface RecommandType {
  _id: string;
  title: string;
  videoFile: string;
  thumbnail?: string;
  views: number;
  createdAt: string;
  duration: number;
}

export interface RegisterPayload {
  fullName: string;
  username: string;
  description: string;
  email: string;
  password: string;
  avatar?: File;
  coverImage?: File;
}

