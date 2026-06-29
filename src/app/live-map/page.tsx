import { supabase } from "@/lib/supabase";

export default async function LiveMapPage({
    searchParams,
}: {
    searchParams: { member?: string };
}) {
    const memberId = searchParams.member;

    const { data: status } = await supabase
        .from("device_status")
        .select("*")
        .eq("member_id", memberId)
        .single();

    if (!status) {
        return (
            <main className="min-h-screen bg-black text-white p-6">
                <h1 className="text-3xl font-bold">No Live Data Found</h1>
                <p className="text-zinc-400 mt-2">
                    This device has not connected yet.
                </p>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-black text-white p-6">
            <h1 className="text-4xl font-bold mb-8">Live Device Status</h1>

            <div className="space-y-4 max-w-2xl">
                <div className="p-5 bg-zinc-900 rounded-2xl">
                    <p>📍 Latitude: {status.latitude}</p>
                    <p>📍 Longitude: {status.longitude}</p>
                </div>

                <div className="p-5 bg-zinc-900 rounded-2xl">
                    <p>🔋 Battery: {status.battery}%</p>
                    <p>
                        🌐 Status:{" "}
                        {status.is_online ? "Online" : "Offline"}
                    </p>
                    <p>📶 Network: {status.network_type}</p>
                </div>

                <div className="p-5 bg-zinc-900 rounded-2xl">
                    <p>⏰ Last Seen: {status.last_seen}</p>
                    <p>⚠ Last Shutdown: {status.last_shutdown || "Not recorded"}</p>
                </div>
            </div>
        </main>
    );
}