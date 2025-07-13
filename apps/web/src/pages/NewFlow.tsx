import Workspace from "../components/Workspace";
import SelectionArea from "../components/SelectionArea";
import { useState } from "react";

export default function NewFlow() {
  const [mode, setMode] = useState<"trigger" | "action">("trigger");
  const [trigger, setTrigger] = useState<any>({});


  return (
    <div className="flex h-screen text-zinc-100">
      {/* Workspace: 3/4 */}
      <div className="w-3/4 border-r border-zinc-800 p-6 overflow-auto">
        <h1 className="text-2xl font-mono font-black tracking-wide text-amber-500 mb-4">
          Workspace
        </h1>
        <Workspace 
          trigger={trigger} 
          setMode={setMode}
        />
      </div>

      {/* Selection Area: 1/4 */}
      <SelectionArea 
        mode={mode} 
        setMode={setMode}
      />
      
    </div>
  );
}


