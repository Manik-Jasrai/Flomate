import { useState } from "react";
import type { AvailableActionType, AvailableTriggerType } from "../types"
import MetaDataSelector from "./MetaDataSelector";

type AvailableItemType = AvailableTriggerType | AvailableActionType;

interface SelectionAreaProps {
  mode : number | null
  availableItems : Array<AvailableItemType> 
  onSelect : (props : null | {id : string, name : string, metadata ?: any}) => void
}

const SelectionArea = ({mode, availableItems, onSelect} : SelectionAreaProps) => {
  const [step, setStep] = useState<number>(0);
  const [selectedAction, setSelectedAction] = useState<{id : string, name : string, metadata ?: any}>()
  const [selectedActionType, setSelectedActionType] = useState<AvailableActionType>()

  const setMetadata = (formdata : Record<string, string>) => {
    if (selectedAction?.id && selectedAction?.name) {
      const updatedAction = {...selectedAction, metadata : formdata}
      onSelect(updatedAction)
    }
  }

  return (
    <div className="w-1/4 p-4  border-l border-zinc-800 flex flex-col">
      <div className="flex justify-center">
        <div className="text-lg font-bold text-amber-400 text-center mb-4">
          Select a {mode === 1 ? "Trigger" : "Action"}
        </div>
      </div>
      {/* List of  Actions / Triggers*/}
      
      {step === 0 && availableItems.map((item : AvailableItemType) => {
        return <div 
        className="my-2 text-zinc-500 bg-white border border-zinc-200 rounded-xl p-4 shadow-sm hover:shadow-md flex cursor-pointer"
        onClick = {() => {
          const id = item.id;
          const name = item.name;

          if (mode === 1) {
            onSelect({id, name});
          } else {
            setStep(s => s+1);
            setSelectedAction({id, name})
            setSelectedActionType(item as AvailableActionType);
          }
        }}
        >
          {item.name}
        </div>
      })
      }


      {step === 1 && 
        <MetaDataSelector 
          selectedActionType={selectedActionType}
          setMetadata={setMetadata}
        />}
      </div>
  )
}

export default SelectionArea