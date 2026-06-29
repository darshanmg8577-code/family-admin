import { supabase } from "@/lib/supabase";

export default async function MembersPage() {
    const { data: members } = await supabase
        .from("family_members")
        .select(`
      *,
      device_status (
        connection_status,
        battery,
        last_seen
      )
    `)
        .order("created_at", { ascending: false });

    return (
        <main className="min-h-screen bg-black text-white p-6">
            <h1 className="text-4xl font-bold mb-8">Family Members</h1>

            <div className="space-y-4">
                {members?.map((member: any) => {
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
                                <p>🏠 Family Code: {member.family_code}</p>
                                <p>🆔 Member Code: {member.member_code}</p>
                                <p>🚨 Emergency: {member.emergency_contact}</p>

                                <p>
                                    🌐 Status:{" "}
                                    {status?.connection_status || "Not Connected"}
                                </p>

                                <p>
                                    🔋 Battery:{" "}
                                    {status?.battery ? `${status.battery}%` : "N/A"}
                                </p>

                                <p>
                                    ⏰ Last Seen:{" "}
                                    {status?.last_seen || "Never"}
                                </p>
                            </div>

                            <div className="mt-4 flex gap-3">
                                <a
                                    href={`/live-map?member=${member.id}`}
                                    className="px-4 py-2 bg-white text-black rounded-xl"
                                >
                                    Track
                                </a>

                                <a
                                    href={`/theft-mode?member=${member.id}`}
                                    className="px-4 py-2 bg-red-600 rounded-xl"
                                >
                                    Theft Mode
                                </a>
                            </div>
                        </div>
                    );
                })}
            </div>
        </main>
    );
}