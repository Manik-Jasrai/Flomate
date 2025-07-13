import { useNavigate } from "react-router-dom";

interface FlowItemProps {
  flow: {
    id: string;
    name: string;
    trigger: {
      type: {
        name: string;
      };
    };
    action: Array<{
      type: {
        name: string;
      };
    }>;
  };
}

const FlowItem = ({ flow }: FlowItemProps) => {
  const navigate = useNavigate();

  return (
    <div
      key={flow.id}
      className="bg-white border border-zinc-200 rounded-xl p-4 shadow-sm hover:shadow-md transition flex justify-between items-center cursor-pointer"
      onClick={() => navigate(`./flow/${flow.id}`)}
    >
      <div>
        <h3 className="text-lg font-semibold text-zinc-800">Name</h3>
        <p className="text-sm text-zinc-500 mb-1">
          Trigger: <span className="font-medium">{flow.trigger.type.name}</span>
        </p>
        {flow.action?.length > 0 && (
          <p className="text-sm text-zinc-500">
            Actions:{" "}
            {flow.action
              .slice(0, 3)
              .map((act) => act.type.name)
              .join(", ")}
            {flow.action.length > 3 ? "..." : ""}
          </p>
        )}
      </div>
    </div>
  );
};

export default FlowItem;


