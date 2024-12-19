import { ValidateCommand } from "../interfaces/validateCommand";

const regexes: {
    pattern: RegExp,
    type: "INIT" | "CREATE" | "INSERT" | "SELECT" | "ERROR" | "CLEAR" | "ESCAPE"
}[] = [
    {
        pattern: /^\s+psql\s+-h\s+[a-zA-Z0-9.-]+\s+-d\s+\w+\s+-U\s+\w+$/,
        type: "INIT"
    },
    {
        pattern: /^clear$/,
        type: "CLEAR"
    },
    {
        pattern: /.*\^C$/,
        type: "ESCAPE"
    }
];

export function validateCommands(command: string): ValidateCommand {
    for(const regex of regexes) {
        if(regex.pattern.test(command)) {
            return {
                isValid: true,
                type: regex.type
            }
        }
    }

    return {
        isValid: false,
        type: "ERROR"
    }
}

/*
^ -> anchor that matches the begining of string
. -> matches any single character
* -> zero / more occurence of preceding character
\s -> matches whitespace (spaces, tabs, newlines)
+ -> atleast one
[a-zA-Z0-9.] -> matches a-z, A-Z, 0-9, .
\w -> [a-zA-Z0-9_]
*/ 