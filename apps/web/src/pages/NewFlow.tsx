import Workspace from "../components/Workspace";
import SelectionArea from "../components/SelectionArea";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import type { AvailableActionType, AvailableTriggerType } from "../types";

const useAvailableActionsandTriggers = () => {
  const [availableTriggers, setAvailableTriggers] = useState<AvailableTriggerType[]>([]);
  const [availableActions, setAvailableActions] = useState<AvailableActionType[]>([]);

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
  const [mode, setMode] = useState<number | null>(null);
  
  
  const [trigger, setTrigger] = useState<AvailableTriggerType>({id : " ", name : ""});
  const [actions, setActions] = useState<Array<any>>([]);
  const {availableTriggers, availableActions} = useAvailableActionsandTriggers();

  const apiPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const onSelect = (props : null | {name : string, id : string, metadata ?: any}) => {
    if (props === null) {
      setMode(null);
      return
    };

    if (mode === 1) {
      setTrigger({
        id : props.id,
        name : props.name
      })
    } else if (mode && mode > 1) {
      let newActions = [...actions];
      newActions[mode - 2] = {
        id : props.id,
        name : props.name,
        metadata : JSON.stringify(props.metadata)
      };
      console.log()
      setActions(newActions);
    }


    setMode(null);
  }

  const createFlow = async () => {
    const response = await apiPrivate.post('/flow', {
      availableTriggerId: trigger.id,
      name : "Flow",
      actions : actions.map((a : AvailableActionType) => {
        return {
          availableAction : a.id,
          metadata : a.metadata
        }
      })
    });
    console.log(response)
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
          actions={actions}
          setMode={setMode}
          setActions={setActions}
        />
      </div>
      {
        mode && 
        <SelectionArea 
          mode={mode} 
          onSelect={onSelect}
          availableItems={mode === 1 ? availableTriggers : availableActions}
        />
      }
      
    </div>
  );
}


