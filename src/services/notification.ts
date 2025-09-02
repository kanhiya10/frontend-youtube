import api from "./api";
import { Notification, VideoInfoType, Topic, SendTopicNotification } from "@/types/types";

interface FetchNotificationsResponse {
    data: Notification[];
}

interface MarkAsReadResponse {
    message: string;
}

interface AllTopicsResponse {
    data: {
        topics: Topic[];
    };
}

interface MyTopicsResponse {
    data: {
        topics: { name: string }[];
    };
}

interface SubscriptionResponse {
    message: string;
}

interface CreateTopicResponse {
    data: Topic;
}

interface SendNotificationResponse {
    message: string;
}

interface DeleteResponse {
    message: string;
    deletedCount?: number;
}

/**
 * Fetches all notifications for the current user.
 * @returns A promise that resolves to the notifications data.
 */
export const fetchUserNotifications = () =>
    api.get<FetchNotificationsResponse>("/notifications/fetchUserNotifications");

/**
 * Marks a specific notification as read.
 * @param notificationId The ID of the notification to mark.
 * @returns A promise that resolves to a success message.
 */
export const markNotificationAsRead = (notificationId: string) =>
    api.patch<MarkAsReadResponse>(`/notifications/mark-as-read/${notificationId}`);

export const getAllTopics = () =>
    api.get<AllTopicsResponse>("/notifications/all-topics");

/**
 * Fetches the topics the current user is subscribed to.
 * @returns A promise that resolves to a list of the user's subscribed topics.
 */
export const getMyTopics = () =>
    api.get<MyTopicsResponse>("/notifications/my-topics");

/**
 * Subscribes the current user to a specific topic.
 * @param data An object containing the user's token and the topic name.
 * @returns A promise that resolves upon successful subscription.
 */
export const subscribeToTopic = (data: { token: string; topic: string }) =>
    api.post<SubscriptionResponse>("/notifications/subscribe", data);

/**
 * Unsubscribes the current user from a specific topic.
 * @param data An object containing the user's token and the topic name.
 * @returns A promise that resolves upon successful unsubscription.
 */
export const unsubscribeFromTopic = (data: { token: string; topic: string }) =>
    api.post<SubscriptionResponse>("/notifications/unsubscribe", data);

export const createTopic = (formData: FormData) =>
    api.post<CreateTopicResponse>("/notifications/create-topic", formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });

export const sendTopicNotification = (payload: SendTopicNotification) =>
    api.post<SendNotificationResponse>("/notifications/send-topic-notification", payload);

export const deleteNotification = (notificationId: string) =>
    api.delete<DeleteResponse>(`/notifications/delete/${notificationId}`);
export const deleteAllNotifications = () =>
    api.delete<DeleteResponse>("/notifications/delete-all");