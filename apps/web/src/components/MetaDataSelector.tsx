import { useState, type ChangeEvent } from "react"
import type { AvailableActionType } from "../types";
import RectButton from "./buttons/RectButton";

const MetaDataSelector = ({selectedActionType, setMetadata} : {selectedActionType : AvailableActionType | undefined, setMetadata : (params : any) => void}) => {
    const [formdata, setFormdata] = useState<Record<string, string>>({});
    const handleChange = (e : ChangeEvent<HTMLInputElement>, field : string) => {
        setFormdata({
        ...formdata,
        [field]: e.target.value,
        });
    };
  return (
    <div>
        {selectedActionType?.dataRequired.map((field : string) => {
            return (
            <div key={field} className="flex flex-col">
                <label className="m-1 text-md font-bold text-zinc-700">{field}</label>
                <input
                    type="text"
                    value={formdata[field] || ""}
                    onChange={(e) => handleChange(e, field)}
                    placeholder={`Enter ${field}`}
                    className="px-3 py-2 rounded text-zinc-500 bg-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
            </div>
            )
        })}
        <RectButton onClick={() => setMetadata(formdata)}>Submit</RectButton>


    </div>
  )
}

export default MetaDataSelector