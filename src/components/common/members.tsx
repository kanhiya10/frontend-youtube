import React, { useEffect, useState } from "react";
import { getChannelMembers } from "../../services/membership";
import {ChannelMember} from '../../types/types'



const ChannelMembers = () => {
    const [members, setMembers] = useState<ChannelMember[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMembers();
    }, []);

    const fetchMembers = async () => {
        try {
            const res = await getChannelMembers();
            setMembers(res.data.data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="max-w-5xl mx-auto p-6">

            <h1 className="text-2xl font-bold mb-6">
                Memberships
            </h1>

            <div className="space-y-4">

                {members.map((member) => (

                    <div
                        key={member._id}
                        className="flex items-center justify-between rounded-lg border p-4 shadow-sm"
                    >

                        <div className="flex items-center gap-4">

                            <img
                                src={member.member.avatar}
                                className="w-14 h-14 rounded-full object-cover"
                            />

                            <div>

                                <h2 className="font-semibold">
                                    {member.member.fullName}
                                </h2>

                                <p className="text-sm text-gray-500">
                                    @{member.member.username}
                                </p>

                            </div>

                        </div>

                        <div className="text-right">

                            <p>
                                ₹{member.amount}
                            </p>

                            <p
                                className={`text-sm ${
                                    member.status === "active"
                                        ? "text-green-600"
                                        : "text-red-600"
                                }`}
                            >
                                {member.status}
                            </p>

                            <p className="text-xs text-gray-500">
                                Expires:
                                {" "}
                                {new Date(
                                    member.expiryDate
                                ).toLocaleDateString()}
                            </p>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
};

export default ChannelMembers;