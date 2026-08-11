import api from "./api";
// import { UserType,Conversation,ChatMessage } from "@/types/types";

export const createOrderId = (channelId: string) =>
  api.post<{
      data: any; orderId: string 
}>("/payment/createOrderId",  { channelId });

export const verifyPayment = (paymentData: {
  razorpay_order_id: string;
  razorpay_payment_id: string;
    razorpay_signature: string;
}) => api.post("/payment/verify", paymentData);

export const failPayment = (error: any) =>
  api.post("/payment/fail", error);