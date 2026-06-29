export default function AddMember() {
    return (
        <main className="min-h-screen bg-black text-white p-6">
            <h1 className="text-3xl font-bold mb-6">Add Family Member</h1>

            <form className="space-y-4 max-w-xl">
                <input
                    className="w-full p-4 rounded-xl bg-zinc-900"
                    placeholder="Name"
                />

                <input
                    className="w-full p-4 rounded-xl bg-zinc-900"
                    placeholder="Phone Number"
                />

                <input
                    className="w-full p-4 rounded-xl bg-zinc-900"
                    placeholder="Device Name"
                />

                <input
                    className="w-full p-4 rounded-xl bg-zinc-900"
                    placeholder="Emergency Contact"
                />

                <button className="bg-white text-black px-6 py-3 rounded-xl">
                    Add Member
                </button>
            </form>
        </main>
    );
}