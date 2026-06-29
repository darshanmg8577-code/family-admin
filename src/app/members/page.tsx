"use client";

import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

export default function MembersPage() {
    const [members, setMembers] = useState<any[]>([]);

    useEffect(() => {
        fetchMembers();
    }, []);

    const fetchMembers = async () => {
        const { data } = await supabase.from("family_members").select(`
      *,
      device_status (
        connection_status,
        battery,
        last_seen
      )
    `);

        setMembers(data || []);
    };

    const sendCommand = async (memberId: string, command: string) => {
        const { error } = await supabase.from("device_commands").insert([
            {
                member_id: memberId,
                command,
            },
        ]);

        if (error) {
            alert(error.message);
            return;
        }

        alert(`${command} command sent`);
    };

    return (
        <main className="min-h-screen bg-black text-white p-6">
            <h1 className="text-4xl font-bold mb-8">Family Members</h1>

            <div className="space-y-4">
                {members.map((member) => {
                    const status = member.device_status?.[0];

                    return (
                        <div
                            key={member.id}
                            className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800"
                        >
                            <h2 className="text-2xl font-semibold">{member.name}</h2>

                            <div className="mt-3 space-y-1 text-zinc-300">
                                <p>📱 Phone: {member.phone}</p>
                                <p>📲 Device: {member.device_name}</p>
                                <p>🌐 Status: {status?.connection_status || "Not Connected"}</p>
                                <p>🔋 Battery: {status?.battery || "N/A"}%</p>
                                <p>⏰ Last Seen: {status?.last_seen || "Never"}</p>
                            </div>

                            <div className="mt-4 flex flex-wrap gap-3">
                                <button
                                    onClick={() => sendCommand(member.id, "ring")}
                                    className="px-4 py-2 bg-yellow-500 text-black rounded-xl"
                                >
                                    🔔 Ring
                                </button>

                                <button
                                    onClick={() => sendCommand(member.id, "stop_ring")}
                                    className="px-4 py-2 bg-green-600 rounded-xl"
                                >
                                    🛑 Stop
                                </button>

                                <a
                                    href={`/live-map?member=${member.id}`}
                                    className="px-4 py-2 bg-white text-black rounded-xl"
                                >
                                    📍 Track
                                </a>

                                <a
                                    href={`/theft-mode?member=${member.id}`}
                                    className="px-4 py-2 bg-red-600 rounded-xl"
                                >
                                    🚨 Theft Mode
                                </a>
                            </div>
                        </div>
                    );
                })}
            </div>
        </main>
    );
}