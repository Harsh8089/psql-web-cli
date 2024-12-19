import CLIHeader from "./CLIHeader"
import CLIInput from "./CLIInput"

interface CommandProps {
    setCommands: any,
}

const Command = ({ setCommands }: CommandProps ) => {
  return (
    <div className="flex flex-col">
        <CLIHeader />
        <CLIInput setCommands={setCommands}/>
    </div>
  )
}



export default Command

