import { useEffect, useRef, useState } from "react";
import { validateCommands } from "../utils/validateCommands";
import { ValidateCommand } from "../interfaces/validateCommand";

interface CommandProps {
    setCommands: any,
}

interface CommandState {
    input: string,
    result: string
}

const CLIInput = ({ setCommands }: CommandProps ) => {
    const command = useRef<HTMLInputElement | null>(null);
    const [dbConfig, setdbConfig] = useState({
        username: "",
        hostname: "",
        dbName: ""
    });
    
    useEffect(() => {
        if(command.current) command.current.focus();

        return () => {
            if(command.current) command.current = null;
        }
    }, []);

    const handleKeyDown = (event: any) => {
        if(!command.current) return;
        
        const commandInput = command.current.value;

        if(event.key === 'Enter' || event.key === 'enter') {
            const validation: ValidateCommand = validateCommands(commandInput);
            let result = validation.isValid ? "" : `bash: ${commandInput}: command not found`;

            
            if(!validation.isValid) {
                console.log(validation, result);
                setCommands((prev: CommandState[]) => [...prev, { input: commandInput, result: result }]);
            }
            else {
                if(validation.type === 'CLEAR') setCommands([]);
                if(validation.type === 'ESCAPE') setCommands((prev: CommandState[]) => [...prev, { input: commandInput, result: commandInput + "^C" }]);
                if(validation.type === 'INIT') {
                    setdbConfig({
                        hostname: commandInput.split(" ")[2],
                        dbName: commandInput.split(" ")[4],
                        username: commandInput.split(" ")[6]
                    });
                    // setCommands((prev: CommandState[]) => [...prev, { input: commandInput, result: commandInput }]);
                    
                }
            }
            if(command.current) command.current.value = "";
        }
        else if(event.ctrlKey) {
            if(event.key === 'c' || event.key == 'C') {
                const result = "";
                setCommands((prev: CommandState[]) => [...prev, { input: commandInput + "^C", result: result }]);
                if(command.current) command.current.value = "";
            }
        }  
    
    }

  return (
    <div className="flex flex-col text-lg">
        <div className="flex items-center gap-2">
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
        <form 
            action=""
            className={dbConfig.username.length === 0 ? "hidden" : "flex gap-4" }
        >
            <label 
                htmlFor=""
                className="text-slate-100 tracking-wide"
            >
                Password for {dbConfig.username}
            </label>
            <input 
                type="password"
                placeholder="Enter password"
                className="bg-transparent outline-none ml-1 placeholder-slate-500 text-slate-100"
            />
        </form>
    </div>
  )
}

export default CLIInput