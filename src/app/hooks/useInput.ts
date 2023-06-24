import {ChangeEvent, useState} from "react";

export const useInput = (initialValue: string) => {
    const [value, setValue] = useState<string>(initialValue);
    const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const value: string = event.target.value;
        setValue(value);
    }

    return {
        value,
        onChange
    }
}
