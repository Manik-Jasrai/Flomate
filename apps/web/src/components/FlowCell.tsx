
const FlowCell = ({idx, name, onClick} : any) => {
  return (
    <div className="flex border bg-white px-4 py-4 w-70 text-zinc-700 rounded-2xl " onClick={onClick}>
        <div className="text-zinc-700 text-xl">
            <div className="font-bold">{idx + '.'}</div>
            <div>{name}</div>
        </div>
    </div>
  )
}

export default FlowCell