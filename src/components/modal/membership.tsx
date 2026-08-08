import React from "react";
import { X, CheckCircle, Clock, XCircle, Crown } from "lucide-react";
import { useTheme } from "../../context/themeContext";
import { MembershipType } from "../../types/types";
import { MembershipStatus } from "../../types/types";
import { createOrderId, verifyPayment, failPayment } from "../../services/payment";

interface MembershipModalProps {
    status: MembershipStatus;
    membership: MembershipType | null;
    displayPrice: number;
    channelName: string;
    channelAvatar: string;
    channelId: string;
    onClose: () => void;
}

const MembershipModal: React.FC<MembershipModalProps> = ({
    status,
    membership,
    displayPrice,
    channelName,
    channelAvatar,
    channelId,
    onClose,
}) => {
    const { theme } = useTheme();

    const formatDate = (date?: string) => {
        if (!date) return "N/A";

        return new Date(date).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    };

    const initPay = (data: any) => {

        var options = {
            "key": import.meta.env.VITE_RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
            "amount": data.amount * 100, // Amount is in currency subunits.
            "currency": "INR",
            "name": "VideoTube", //your business name
            "description": "Payment for membership",
            "image": "",
            "order_id": data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "handler": async (response: any) => {
                try {
                    const res = await verifyPayment({
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_signature: response.razorpay_signature
                    });
                    console.log('Payment verification response:', res.data);
                } catch (error) {
                    console.log(error);
                }
            }
        }
        const rzp1 = new window.Razorpay(options);
        rzp1.on("payment.failed", async function (response: any) {
            try {
                await failPayment(response.error);
            } catch (err) {
                console.error(err);
            }
        });
        rzp1.open();
    }

    const handleJoinMembership = async () => {
        const response = await createOrderId(channelId);
        initPay(response.data.data);
    }

    const renderContent = () => {
        // No membership
        if (status === null) {
            return (
                <>
                    <div className="flex justify-center mb-4">
                        <Crown
                            className="w-12 h-12"
                            style={{ color: theme.primary }}
                        />
                    </div>

                    <h2
                        className="text-xl font-bold text-center"
                        style={{ color: theme.text }}
                    >
                        Join {channelName}
                    </h2>

                    <p
                        className="text-sm text-center mt-2"
                        style={{ color: theme.textSecondary }}
                    >
                        Become a member of this channel and support the creator.
                    </p>

                    <div
                        className="mt-6 p-4 rounded-lg border"
                        style={{
                            backgroundColor: theme.inputBackground,
                            borderColor: theme.border,
                        }}
                    >
                        <div className="flex justify-between">
                            <span style={{ color: theme.textSecondary }}>
                                Membership
                            </span>

                            <span
                                className="font-semibold"
                                style={{ color: theme.text }}
                            >
                                ₹{displayPrice} / month
                            </span>
                        </div>
                    </div>

                    <button
                        className="w-full mt-6 py-3 rounded-full font-semibold"
                        style={{
                            backgroundColor: theme.primary,
                            color: "#FFFFFF",
                        }}
                        onClick={() => handleJoinMembership()} // Placeholder for join membership action
                    >
                        Join Membership
                    </button>
                </>
            );
        }

        // Active membership
        if (status === "active" && membership) {
            return (
                <>
                    <div className="flex justify-center mb-4">
                        <CheckCircle
                            className="w-12 h-12"
                            style={{ color: theme.success }}
                        />
                    </div>

                    <h2
                        className="text-xl font-bold text-center"
                        style={{ color: theme.text }}
                    >
                        You're a Member
                    </h2>

                    <p
                        className="text-sm text-center mt-2"
                        style={{ color: theme.textSecondary }}
                    >
                        You are currently a member of {channelName}.
                    </p>

                    <div
                        className="mt-6 space-y-4 p-4 rounded-lg border"
                        style={{
                            backgroundColor: theme.inputBackground,
                            borderColor: theme.border,
                        }}
                    >
                        <div className="flex justify-between gap-4">
                            <span style={{ color: theme.textSecondary }}>
                                Status
                            </span>

                            <span
                                className="font-semibold"
                                style={{ color: theme.success }}
                            >
                                Active
                            </span>
                        </div>

                        <div className="flex justify-between gap-4">
                            <span style={{ color: theme.textSecondary }}>
                                Amount
                            </span>

                            <span
                                className="font-semibold"
                                style={{ color: theme.text }}
                            >
                                ₹{membership.amount}
                            </span>
                        </div>

                        <div className="flex justify-between gap-4">
                            <span style={{ color: theme.textSecondary }}>
                                Started
                            </span>

                            <span
                                className="font-medium text-right"
                                style={{ color: theme.text }}
                            >
                                {formatDate(membership.startDate)}
                            </span>
                        </div>

                        <div className="flex justify-between gap-4">
                            <span style={{ color: theme.textSecondary }}>
                                Expires
                            </span>

                            <span
                                className="font-medium text-right"
                                style={{ color: theme.text }}
                            >
                                {formatDate(membership.expiryDate)}
                            </span>
                        </div>
                    </div>

                    {/* Placeholder for future cancellation functionality */}
                    <button
                        className="w-full mt-6 py-3 rounded-full font-medium border"
                        style={{
                            borderColor: theme.border,
                            color: theme.text,
                        }}
                    >
                        Manage Membership
                    </button>
                </>
            );
        }

        // Expired membership
        if (status === "expired" && membership) {
            return (
                <>
                    <div className="flex justify-center mb-4">
                        <Clock
                            className="w-12 h-12"
                            style={{ color: theme.warning }}
                        />
                    </div>

                    <h2
                        className="text-xl font-bold text-center"
                        style={{ color: theme.text }}
                    >
                        Membership Expired
                    </h2>

                    <p
                        className="text-sm text-center mt-2"
                        style={{ color: theme.textSecondary }}
                    >
                        Your membership with {channelName} has expired.
                    </p>

                    <div
                        className="mt-6 space-y-4 p-4 rounded-lg border"
                        style={{
                            backgroundColor: theme.inputBackground,
                            borderColor: theme.border,
                        }}
                    >
                        <div className="flex justify-between gap-4">
                            <span style={{ color: theme.textSecondary }}>
                                Status
                            </span>

                            <span
                                className="font-semibold"
                                style={{ color: theme.warning }}
                            >
                                Expired
                            </span>
                        </div>

                        <div className="flex justify-between gap-4">
                            <span style={{ color: theme.textSecondary }}>
                                Previous Amount
                            </span>

                            <span
                                className="font-semibold"
                                style={{ color: theme.text }}
                            >
                                ₹{membership.amount}
                            </span>
                        </div>

                        <div className="flex justify-between gap-4">
                            <span style={{ color: theme.textSecondary }}>
                                Started
                            </span>

                            <span
                                className="font-medium text-right"
                                style={{ color: theme.text }}
                            >
                                {formatDate(membership.startDate)}
                            </span>
                        </div>

                        <div className="flex justify-between gap-4">
                            <span style={{ color: theme.textSecondary }}>
                                Expired On
                            </span>

                            <span
                                className="font-medium text-right"
                                style={{ color: theme.text }}
                            >
                                {formatDate(membership.expiryDate)}
                            </span>
                        </div>
                    </div>

                    <button
                        className="w-full mt-6 py-3 rounded-full font-semibold"
                        style={{
                            backgroundColor: theme.primary,
                            color: "#FFFFFF",
                        }}
                    >
                        Renew Membership
                    </button>
                </>
            );
        }

        // Cancelled membership
        if (status === "cancelled" && membership) {
            return (
                <>
                    <div className="flex justify-center mb-4">
                        <XCircle
                            className="w-12 h-12"
                            style={{ color: theme.error }}
                        />
                    </div>

                    <h2
                        className="text-xl font-bold text-center"
                        style={{ color: theme.text }}
                    >
                        Membership Cancelled
                    </h2>

                    <p
                        className="text-sm text-center mt-2"
                        style={{ color: theme.textSecondary }}
                    >
                        Your membership with {channelName} has been cancelled.
                    </p>

                    <div
                        className="mt-6 space-y-4 p-4 rounded-lg border"
                        style={{
                            backgroundColor: theme.inputBackground,
                            borderColor: theme.border,
                        }}
                    >
                        <div className="flex justify-between gap-4">
                            <span style={{ color: theme.textSecondary }}>
                                Status
                            </span>

                            <span
                                className="font-semibold"
                                style={{ color: theme.error }}
                            >
                                Cancelled
                            </span>
                        </div>

                        <div className="flex justify-between gap-4">
                            <span style={{ color: theme.textSecondary }}>
                                Amount
                            </span>

                            <span
                                className="font-semibold"
                                style={{ color: theme.text }}
                            >
                                ₹{membership.amount}
                            </span>
                        </div>

                        <div className="flex justify-between gap-4">
                            <span style={{ color: theme.textSecondary }}>
                                Started
                            </span>

                            <span
                                className="font-medium text-right"
                                style={{ color: theme.text }}
                            >
                                {formatDate(membership.startDate)}
                            </span>
                        </div>

                        <div className="flex justify-between gap-4">
                            <span style={{ color: theme.textSecondary }}>
                                Membership Date
                            </span>

                            <span
                                className="font-medium text-right"
                                style={{ color: theme.text }}
                            >
                                {formatDate(membership.expiryDate)}
                            </span>
                        </div>
                    </div>

                    <button
                        className="w-full mt-6 py-3 rounded-full font-semibold"
                        style={{
                            backgroundColor: theme.primary,
                            color: "#FFFFFF",
                        }}
                    >
                        Join Again
                    </button>
                </>
            );
        }

        return null;
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
            onClick={onClose}
        >
            <div
                className="w-full max-w-md rounded-2xl shadow-2xl border overflow-hidden"
                style={{
                    backgroundColor: theme.card,
                    borderColor: theme.border,
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div
                    className="flex items-center justify-between p-5 border-b"
                    style={{ borderColor: theme.border }}
                >
                    <div className="flex items-center gap-3 min-w-0">
                        <img
                            src={channelAvatar}
                            alt={channelName}
                            className="w-10 h-10 rounded-full object-cover"
                        />

                        <div className="min-w-0">
                            <h3
                                className="font-semibold truncate"
                                style={{ color: theme.text }}
                            >
                                {channelName}
                            </h3>

                            <p
                                className="text-xs"
                                style={{ color: theme.textSecondary }}
                            >
                                Channel Membership
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:opacity-70"
                        style={{ color: theme.textMuted }}
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default MembershipModal;