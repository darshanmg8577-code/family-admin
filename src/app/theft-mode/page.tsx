import { supabase } from "@/lib/supabase";

export default async function TheftModePage({
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

    const { data: events } = await supabase
        .from("theft_events")
        .select("*")
        .eq("member_id", memberId)
        .order("created_at", { ascending: false });

    return (
        <main className="min-h-screen bg-black text-white p-6">
            <h1 className="text-4xl font-bold mb-8 text-red-500">
                Theft Mode
            </h1>

            {!status ? (
                <div className="p-5 bg-zinc-900 rounded-2xl">
                    No theft data available.
                </div>
            ) : (
                <div className="space-y-4 mb-8">
                    <div className="p-5 bg-zinc-900 rounded-2xl">
                        <p>⚠ Last Shutdown Time: {status.last_shutdown || "Not recorded"}</p>
                    </div>

                    <div className="p-5 bg-zinc-900 rounded-2xl">
                        <p>📍 Last Shutdown Latitude: {status.last_shutdown_lat || "N/A"}</p>
                        <p>📍 Last Shutdown Longitude: {status.last_shutdown_lng || "N/A"}</p>
                    </div>

                    <div className="p-5 bg-zinc-900 rounded-2xl">
                        <p>🔋 Battery Before Shutdown: {status.battery || "N/A"}%</p>
                        <p>📶 Last Network: {status.network_type || "Unknown"}</p>
                    </div>
                </div>
            )}

            <h2 className="text-2xl font-bold mb-4">Event History</h2>

            <div className="space-y-4">
                {events?.length ? (
                    events.map((event) => (
                        <div
                            key={event.id}
                            className="p-4 bg-zinc-900 rounded-2xl border border-red-800"
                        >
                            <p>🚨 {event.event_type}</p>
                            <p>{event.description}</p>
                            <p className="text-zinc-400 text-sm mt-2">
                                {event.created_at}
                            </p>
                        </div>
                    ))
                ) : (
                    <div className="p-4 bg-zinc-900 rounded-2xl">
                        No theft events yet.
                    </div>
                )}
            </div>
        </main>
    );
}