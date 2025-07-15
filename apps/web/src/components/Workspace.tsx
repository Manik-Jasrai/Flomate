import useAxiosPrivate from "../hooks/useAxiosPrivate";
import SmallButton from "./buttons/SmallButton"
import FlowCell from "./FlowCell"


const Workspace = ({trigger, setMode, actions, setActions} : any) => {

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
            onClick={() => setMode("trigger")} 
            />
            <SmallButton onClick={addEmtpyAction} >+</SmallButton>
            {actions.map((a : any, idx : any) => {
              return <>
                <FlowCell idx={idx+2} 
                name={a.name ? a.name : "Action"}
                onClick={() => setMode("action")} 
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