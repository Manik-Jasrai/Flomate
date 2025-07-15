import type { AvailableActionType, AvailableTriggerType } from "../types";
import SmallButton from "./buttons/SmallButton"
import FlowCell from "./FlowCell"

interface WorkspaceProps {
  trigger : AvailableTriggerType,
  setMode : React.Dispatch<React.SetStateAction<number| null>>
  actions : Array<AvailableActionType>
  setActions : React.Dispatch<React.SetStateAction<Array<AvailableActionType>>>
}

const Workspace = ({trigger, setMode, actions, setActions} : WorkspaceProps) => {

  const addEmtpyAction = () => {
    setActions((prev : any) => [...prev, {}]);
  }
   
  
  return (
    <div className="py-5 min-h-screen border-2 border-dashed border-zinc-800 rounded-2xl flex flex-col justify-center bg-zinc-900/20">
        {/* <p className="text-zinc-500">Drag triggers & actions here to build your automation</p> */}
        <div className="flex flex-col items-center gap-2">
            <FlowCell 
            idx={1} 
            name={trigger?.name ? trigger.name : "Trigger"} 
            onClick={() => setMode(1)} 
            />
            <SmallButton onClick={addEmtpyAction} >+</SmallButton>
            {actions.map((a : any, idx : any) => {
              return <>
                <FlowCell idx={idx+2} 
                name={a.name ? a.name : "Action"}
                onClick={() => setMode(idx + 2)} 
                 />
                <SmallButton onClick={addEmtpyAction} >+</SmallButton>
              </>
            })
            }
        </div>

    </div>
  )
}

export default Workspace