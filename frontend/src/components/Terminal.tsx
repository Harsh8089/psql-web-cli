import { useEffect, useState } from "react"
import Welcome from "./Welcome"
import Command from "./Command";
import ExecutedCommand from "./ExecutedCommand";

interface CommandState {
    input: string,
    result: string
}

const Terminal = () => {
    const [commands, setCommands] = useState<CommandState[]>([]);

    useEffect(() => {
        commands.forEach((cmd, index) => console.log(index, cmd.input, cmd.result))
    }, [commands]); 

  return (
    <div className="overflow-x-hidden">
        <div className="fixed top-0 left-0 bg-blue-950 w-[100vw] h-14 flex items-end z-10">
            <p className="text-blue-100 font-semibold text-lg border-b-2 border-blue-100 h-full py-4 px-10">Terminal</p>
            <div className="bg-blue-700 h-[80%] w-full border-l-[1px] border-t-[1px] border-b-[1px] border-slate-700 rounded-t-md"></div>
        </div>
        <div className="bg-blue-800 w-[100vw] min-h-[93vh] max-h-[1000vh] mt-14 px-2 flex flex-col gap-4">
            <Welcome />
            {
                commands.length > 0 ? (
                    commands.map((_, idx) => {
                        return (
                            <ExecutedCommand
                                key={idx}
                                commandInput={commands[idx].input}
                                commandResult={commands[idx].result}
                            />
                        )
                    })
                ) : (
                    <Command 
                        setCommands={setCommands}
                    />
                )
            }
            {
                commands.length > 0 && (
                    <Command
                        setCommands={setCommands}
                    />
                )
            }
        </div>
    </div>
  )
}

export default Terminal