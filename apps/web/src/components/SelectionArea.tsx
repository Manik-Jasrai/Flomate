import type { AvailableActionType, AvailableTriggerType } from "../types"

type AvailableItemType = AvailableTriggerType | AvailableActionType;

interface SelectionAreaProps {
  mode : number | null
  availableItems : Array<AvailableItemType> 
  onSelect : (props : null | {id : string, name : string}) => void
}

const SelectionArea = ({mode, availableItems, onSelect} : SelectionAreaProps) => {
  
  return (
    <div className="w-1/4 p-4  border-l border-zinc-800 flex flex-col">
      <div className="flex justify-center">
        <div className="text-lg font-bold text-amber-400 text-center mb-4">
          Select a {mode === 1 ? "Trigger" : "Action"}
        </div>
      </div>
      {/* List of  Actions / Triggers*/}
      {availableItems.map((item : AvailableItemType) => {
        return <div 
        className="my-2 text-zinc-500 bg-white border border-zinc-200 rounded-xl p-4 shadow-sm hover:shadow-md flex cursor-pointer"
        onClick = {() => {
          const id = item.id;
          const name = item.name;
          onSelect({id, name});
        }}
        >
          {item.name}
        </div>
      })
      }
      </div>
  )
}
export default SelectionArea