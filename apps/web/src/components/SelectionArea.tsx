
const SelectionArea = ({mode, setMode} : any) => {
    
  return (
    <div className="w-1/4 p-4  border-l border-zinc-800 flex flex-col">
        <h2 className="text-lg font-bold text-amber-400 text-center mb-4">
          Select a {mode === "trigger" ? "Trigger" : "Action"}
        </h2>

        {/* Mode Switch */}
        <div className="flex mb-4 rounded-xl p-1 text-sm font-semibold">
          <button
            className={`flex-1 py-2 rounded-xl transition text-zinc-500 ${
  mode === "trigger" ? "bg-amber-500 text-zinc-950" : "hover:text-amber-400"}`}
            onClick={() => setMode("trigger")}
          >
            Trigger
          </button>
          <button
            className={`flex-1 py-2 rounded-xl transition text-zinc-500 ${
  mode === "action" ? "bg-amber-500 text-zinc-950" : "hover:text-amber-400"}`}
            onClick={() => setMode("action")}
          >
            Action
          </button>
        </div>

        {/* Options List */}
        <ul className="flex-1 overflow-y-auto space-y-2">
          {(mode === "trigger" ? triggerOptions : actionOptions).map((opt) => (
            <li
              key={opt.id}
              className="px-3 py-2 rounded-xl cursor-pointer transition flex items-center gap-2"
              onClick={() => {
                // TODO: insert into workspace
              }}
            >
              <div className="w-2 h-2 rounded-full bg-amber-500" />
              <span className="text-zinc-600">{opt.label}</span>
            </li>
          ))}
        </ul>
      </div>
  )
}

const triggerOptions = [
  { id: "http", label: "HTTP Request" },
  { id: "cron", label: "Schedule (Cron)" },
  { id: "webhook", label: "Incoming Webhook" },
  { id: "email", label: "Email Received" },
];

const actionOptions = [
  { id: "email-send", label: "Send Email" },
  { id: "slack", label: "Post to Slack" },
  { id: "pdf", label: "Generate PDF" },
  { id: "gdrive", label: "Save File to GDrive" },
];
export default SelectionArea