import Workspace from "../components/Workspace";
import SelectionArea from "../components/SelectionArea";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";

const useAvailableActionsandTriggers = () => {
  const [availableTriggers, setAvailableTriggers] = useState<[]>([]);
  const [availableActions, setAvailableActions] = useState<[]>([]);

  const apiPrivate = useAxiosPrivate();

  useEffect(() => {
    apiPrivate.get('/trigger').then(res => {
      setAvailableTriggers(res.data.availableTriggers);
    });
    apiPrivate.get('/action').then(res => {
      setAvailableActions(res.data.availableActions);
    });
  },[]);

  return {
    availableTriggers,
    availableActions
  }
}

export default function NewFlow() {
  const [mode, setMode] = useState<"trigger" | "action" | null>(null);
  
  const [trigger, setTrigger] = useState<{id : string, name : string}>();
  const [actions, setActions] = useState<{
        id: string;
        name: string;
        metadata: any;
    }[]>([]);
  const {availableTriggers, availableActions} = useAvailableActionsandTriggers();

  const apiPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const onSelect = (props : null | {name : string, id : string}) => {
    if (props === null) {
      setMode(null);
      return
    };

    if (mode === "trigger") {
      setTrigger({
        id : props.id,
        name : props.name
      })
    } else {
      let newActions = [...actions];
      newActions[newActions.length - 1] = {
        id : props.id,
        name : props.name,
        metadata : ""
      };
      setActions(newActions);
    }


    setMode(null);
  }

  const createFlow = () => {
    apiPrivate.post('/flow', {
      availableTriggerId: trigger?.id,
      actions : actions.map((a : any) => {
        return {
          availableAction : a.id
        }
      })
    });
    navigate('/dashboard');
  }
  
  return (
    <div className="flex h-screen text-zinc-100">
      {/* Workspace: 3/4 */}
      <div className={`border-r border-zinc-800 p-6 overflow-auto ${mode ? "w-3/4" : "w-full" }`} >
        <div className="flex justify-between py-2">
          <div className="text-2xl font-mono font-black tracking-wide text-amber-500 mb-4">
            Workspace
          </div>
          <button 
          className="text-lg font-medium text-white bg-amber-500 px-10 py-2 rounded-2xl cursor-pointer hover:bg-amber-400"
          onClick={createFlow}
          >
            Publish
          </button>
        </div>
        <Workspace
          trigger={trigger}
          setMode={setMode}
          actions={actions}
          setActions={setActions}
        />
      </div>
      {
        mode && 
        <SelectionArea 
          mode={mode} 
          onSelect={onSelect}
          availableItems={mode==="trigger" ? availableTriggers : availableActions}
        />
      }
      
    </div>
  );
}


