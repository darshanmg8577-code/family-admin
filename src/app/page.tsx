import Link from "next/link";

export default function Dashboard() {
  const cards = [
    {
      title: "Family Members",
      value: "0",
      link: "/members",
    },
    {
      title: "Live Tracking",
      value: "0 Online",
      link: "/live-map",
    },
    {
      title: "Theft Alerts",
      value: "0",
      link: "/theft-mode",
    },
    {
      title: "Add Member",
      value: "+",
      link: "/add-member",
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-4xl font-bold mb-8">Family Tracker Admin</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {cards.map((card, i) => (
          <Link
            key={i}
            href={card.link}
            className="p-6 rounded-2xl bg-zinc-900 hover:bg-zinc-800 transition"
          >
            <h2 className="text-xl font-semibold">{card.title}</h2>
            <p className="text-3xl mt-3">{card.value}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}