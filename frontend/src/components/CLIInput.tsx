import { useEffect, useRef } from "react";
import validCommandsSet from "../utils/commands";

interface CommandProps {
    setCommands: any,
}

interface CommandState {
    input: string,
    result: string
}

const CLIInput = ({ setCommands }: CommandProps ) => {
    const command = useRef<HTMLInputElement | null>(null);
    
    useEffect(() => {
        if(command.current) command.current.focus();

        return () => {
            if(command.current) command.current = null;
        }
    }, []);

    const handleKeyDown = (event: any) => {
        if(!command.current) return;
        
        const commandInput = command.current.value;
        let result = "";

        if(!validCommandsSet.has(commandInput.trim())) {
            result = `bash: ${commandInput}: command not found`
        } 

        if(event.key === 'Enter' || event.key === 'enter') {
            setCommands((prev: CommandState[]) => [...prev, { input: commandInput, result: result }]);
            if(command.current) command.current.value = "";
        }
        
        else if(event.ctrlKey) {
            if(event.key === 'c' || event.key == 'C') {
                setCommands((prev: CommandState[]) => [...prev, { input: commandInput + "^C", result: result }]);
                if(command.current) command.current.value = "";
            }
        }  
    
    }

  return (
    <div className="flex gap-2 items-center text-lg">
        <p className="text-slate-100">
            $
        </p>
        <input 
            type="text"
            className="bg-transparent outline-none ml-1 placeholder-slate-500 w-full text-slate-100"
            placeholder="Enter command you have to run"
            ref={command}
            onKeyDown={handleKeyDown}
        />
    </div>
  )
}

export default CLIInput