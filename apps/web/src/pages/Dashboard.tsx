import { useEffect, useState } from "react";
import RectButton from "../components/buttons/RectButton";
import FlowItem from "../components/FlowItem";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import type { FlowType } from "../types";

export default function Dashboard() {
  const apiPrivate = useAxiosPrivate();
  const [flows, setFlows] = useState<Array<FlowType>>([]);
  const navigate = useNavigate();

  const getAllFlows = async () => {
    const response = await apiPrivate.get('/flow');
    setFlows(response.data.flows)
  }

  useEffect(() => {
    getAllFlows();
  },[]);

  return (
    <div className="min-h-screen font-mono text-zinc-900">
      {/* Header Section */}
      <div className="max-w-5xl mx-auto px-6 py-10 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-extrabold text-zinc-800 mb-1">Your Flows</h2>
          <p className="text-zinc-500 text-sm">Automate, monitor, and create new integrations.</p>
        </div>
        <RectButton onClick={() => navigate('./newFlow')}>
          + Create Flow
        </RectButton>
      </div>

      {/* Flow List */}
      <div className="max-w-5xl mx-auto px-6 space-y-2">
        {flows.map((flow) => (
          <FlowItem 
            flow={flow}
          />
        ))}
      </div>

      {/* Empty state example (if no flows) */}
            
      {/* <div className="text-center text-zinc-500 mt-16 py-5 justify-center">
        <p className="text-xl">No flows yet. Time to create your first automation!</p>
        <RectButton onClick={() => console.log("New Flow")}>
          + Create Flow
        </RectButton>
      </div> */}
     
    </div>
  );
}
