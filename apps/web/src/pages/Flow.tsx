import { useParams } from "react-router-dom"

const Flow = () => {
    const { flowId } = useParams();
    return (
    <div>{flowId}</div>
    )
}

export default Flow