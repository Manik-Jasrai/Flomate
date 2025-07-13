import SmallButton from "./buttons/SmallButton"
import FlowCell from "./FlowCell"

const Workspace = ({trigger, setMode} : any) => {

  return (
    <div className="min-h-screen border-2 border-dashed border-zinc-800 rounded-2xl flex flex-col justify-center bg-zinc-900/20">
        {/* <p className="text-zinc-500">Drag triggers & actions here to build your automation</p> */}
        <div className="flex flex-col items-center gap-2">
            {/* On Click , Set Trigger */}
            <FlowCell idx={1} name={trigger?.name ? trigger.name : "Trigger"} onClick={() => setMode("trigger")} />
            <SmallButton onClick={() => console.log("add step")} >+</SmallButton>
            <FlowCell idx={2} name="Action" />
            <SmallButton onClick={() => console.log("add step")} >+</SmallButton>
        </div>

    </div>
  )
}

export default Workspace