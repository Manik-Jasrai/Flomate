import React from "react";

const flows = [
  { name: "New User Welcome Email", updated: "2 hours ago" },
  { name: "Slack → Notion Daily Sync", updated: "1 day ago" },
  { name: "Webhook to Airtable", updated: "3 days ago" },
  { name: "GitHub → Discord CI Alert", updated: "1 week ago" },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen font-mono text-zinc-900">
      {/* Header Section */}
      <div className="max-w-5xl mx-auto px-6 py-10 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-extrabold text-zinc-800 mb-1">Your Flows</h2>
          <p className="text-zinc-500 text-sm">Automate, monitor, and create new integrations.</p>
        </div>
        <button className="bg-amber-600 hover:bg-amber-500 text-white px-4 py-2 rounded-lg font-semibold shadow">
          + Create Flow
        </button>
      </div>

      {/* Flow List */}
      <div className="max-w-5xl mx-auto px-6 space-y-4">
        {flows.map((flow, idx) => (
          <div
            key={idx}
            className="bg-white border border-zinc-200 rounded-xl p-4 shadow-sm hover:shadow-md transition flex justify-between items-center"
          >
            <div>
              <h3 className="text-lg font-semibold text-zinc-800">{flow.name}</h3>
              <p className="text-sm text-zinc-500">Last updated: {flow.updated}</p>
            </div>
            <button className="text-sm text-amber-600 hover:underline">Open</button>
          </div>
        ))}
      </div>

      {/* Empty state example (if no flows) */}
      {/* 
      <div className="text-center text-zinc-500 mt-16">
        <p className="text-xl">No flows yet. Time to create your first automation!</p>
        <button className="mt-4 bg-amber-600 hover:bg-amber-500 text-white px-6 py-2 rounded-lg font-semibold">
          + Create Flow
        </button>
      </div>
      */}
    </div>
  );
}
