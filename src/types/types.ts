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
  thumbnail?: string;
  createdAt: string;
//   owner:string;
//   isPublished:boolean;
  views:number;
  // likes:number;
  duration:number;

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

export interface UserType {
  _id: string;
  username: string;
  email: string;
  fullName?: string;
  avatar?: string;
  coverImage?: string;
  description?: string;
}

export interface ChatMessage {
  from: string;
  to: string;
  text?: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'video' | 'file';
}

export interface Conversation {
  _id: string;
  participants: UserType[];
  createdAt: string;
  updatedAt: string;
  lastMessage?: ChatMessage;
}

export interface SearchResultType {
  videos: {
    _id: string;
    title: string;
    thumbnail?: string;
    createdAt: string;
    views: number;
    duration: number;
  }[];
  creators: {
    _id: string;          // <- align with backend (not `id`, since you use `user._id` in map)
    username: string;
    fullName: string;
    avatar: string;
    subscribersCount: number;
    isSubscribed: boolean;
  }[];
}


export interface Notification {
  _id: string;
  title: string;
  body: string;
  createdAt: string;
  isRead: boolean;
  type: 'videoUpload' | 'like' | 'comment' | 'subscription';
  actor?: {
    _id: string;
    username: string;
  };
  data?: {
    video: VideoInfoType;
  };
}

export interface SendTopicNotification {
  topicName: string;
  title: string;
  body: string;
  data?: any
}

export interface MessageProps {
  text?: string;
  isSender: boolean;
  mediaUrl?: string;
  mediaType?: 'image' | 'video' | 'file';
}