export interface ValidateCommand {
    isValid: boolean;
    type: "INIT" | "CREATE" | "INSERT" | "SELECT" | "ERROR" | "CLEAR" | "ESCAPE";     
}