import {useEffect, useState} from "react";
import {Form, FormInstance} from "antd";

export const useForm = <T>(form: FormInstance<T>) => {
    const [isValidated, setIsValidated] = useState<boolean>(false);
    const values = Form.useWatch([], form);
    useEffect(() => {
        form.validateFields().then(
            () => { setIsValidated(true); },
            () => { setIsValidated(false); },
        );
    }, [values]);

    return {isValidated};
}
