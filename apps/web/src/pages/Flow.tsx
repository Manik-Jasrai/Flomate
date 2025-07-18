import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import type { FlowType } from "../types";

const Flow = () => {
  const { flowId } = useParams();
  const [flow, setFlow] = useState<FlowType | null>(null);
  const apiPrivate = useAxiosPrivate();

  useEffect(() => {
    const getFlow = async () => {
      const response = await apiPrivate.get(`/flow/${flowId}`);
      setFlow(response.data.flow);
    };
    getFlow();
  }, [flowId]);

  if (!flow) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 text-amber-600 text-lg font-medium">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 text-gray-900">
      <div className="max-w-4xl mx-auto shadow-lg rounded-xl p-6">
        <h1 className="text-3xl font-bold text-amber-600 mb-4">Flow: {flow.name}</h1>

        {/* Trigger Info */}
        <div className="mb-6 border-l-4 border-amber-400 pl-4">
          <h2 className="text-xl font-semibold text-amber-500 mb-2">Trigger</h2>
          <p><span className="font-medium">Type:</span> {flow.trigger.type.name}</p>
        </div>

        {/* Action List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-amber-500">Actions</h2>
          {flow.action.map((action, index) => (
            <div
              key={action.id}
              className="p-4 rounded-lg border border-gray-200 bg-gray-50"
            >
              <p className="text-lg font-semibold text-amber-600 mb-2">
                Action {index + 1}: {action.type.name}
              </p>           

              {/* Metadata */}
              <div className="mt-2">
                <p className="font-medium text-gray-600 mb-1">Metadata:</p>
                {action.metaData.toString()}
                
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Flow;
