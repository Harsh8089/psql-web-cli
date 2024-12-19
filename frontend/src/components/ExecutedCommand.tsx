import CLIHeader from "./CLIHeader"

interface ExecutedCommandProps {
    commandInput: string,
    commandResult: string
}

const ExecutedCommand = ({ commandInput, commandResult }: ExecutedCommandProps) => {

    return (
        <div className="flex flex-col">
            <CLIHeader />
            <div className="flex gap-2 items-center text-lg">
                <p className="text-slate-100">
                    $
                </p>
                <input 
                    type="text"
                    className="bg-transparent outline-none ml-1 w-full text-slate-100"
                    value={commandInput}
                    disabled
                />
                
            </div>    
            <div className="text-slate-200 tracking-wide text-lg">
                {commandResult}
            </div>   
        </div>
    )
}

export default ExecutedCommand