import {FC} from "react";
import {Button, Checkbox, Form, Input} from "antd";
import type { CheckboxChangeEvent } from 'antd/es/checkbox';

import BaseFieldFile from "@/shared/ui/BaseFieldFile/BaseFieldFile";
import {User} from "../../api/types";
import {initialValues, permissions} from "../../options/constants";
import {useForm} from "@/app/hooks/useForm";
import css from "./UserForm.module.scss";
import {classNames} from "@/shared/lib/classNames";

interface IUserForm {
    onSave: (values: User) => void;
}

const UserForm: FC<IUserForm> = ({onSave}) => {
    const [form] = Form.useForm<User>();
    const {isValidated} = useForm(form);
    const image = Form.useWatch("image", form);
    const onTake = (file: string) => {
        form.setFieldValue("image", file);
    }
    const onChange = (event: CheckboxChangeEvent) => {
        for (const key in permissions) {
            form.setFieldValue(["permissions", key], event.target.checked);
        }
    }
    const onSubmit = (values: User) => {
        const data = [];
        for (const key in values.permissions) {
            if (values.permissions[key]) {
                data.push(permissions[key]);
            }
        }
        onSave({
            image: values.image,
            name: values.name,
            email: values.email,
            permissions: [...data]
        });
    }
    return (
        <>
            <Form
                initialValues={initialValues}
                form={form}
                size={"small"}
                layout={"vertical"}
                className={"grid gap-2"}
                onFinish={onSubmit}
            >
                <Form.Item
                    name={"name"}
                    label="ФИО"
                    rules={[
                        { required: true, message: 'Заполните обязательное поле' },
                    ]}
                >
                    <Input placeholder="" className={css.UserFormInput}/>
                </Form.Item>
                <Form.Item
                    name={"email"}
                    label="Email"
                    rules={[
                        { required: true, message: 'Заполните обязательное поле' },
                    ]}
                >
                    <Input placeholder="" className={css.UserFormInput}/>
                </Form.Item>
                <Form.Item
                    name={"image"}
                    label="Фотография"
                    rules={[
                        { required: true, message: 'Заполните обязательное поле' },
                    ]}
                >
                    <BaseFieldFile
                        name={"image"}
                        className={classNames({"border border-solid border-red-500": !image})}
                        onTake={onTake}
                    />
                </Form.Item>
                <Form.Item
                    name={"all"}
                    valuePropName="checked"
                >
                    <Checkbox onChange={onChange}>Все</Checkbox>
                </Form.Item>
                <Form.Item
                    name={["permissions", "moderation"]}
                    valuePropName="checked"
                >
                    <Checkbox>{permissions.moderation}</Checkbox>
                </Form.Item>
                <Form.Item
                    name={["permissions", "blog"]}
                    valuePropName="checked"
                >
                    <Checkbox>{permissions.blog}</Checkbox>
                </Form.Item>
                <Form.Item
                    name={["permissions", "support"]}
                    valuePropName="checked"
                >
                    <Checkbox>{permissions.support}</Checkbox>
                </Form.Item>
                <Form.Item
                    name={["permissions", "inquiries"]}
                    valuePropName="checked"
                >
                    <Checkbox>{permissions.inquiries}</Checkbox>
                </Form.Item>
                <Form.Item
                    name={["permissions", "analytics"]}
                    valuePropName="checked"
                >
                    <Checkbox>{permissions.analytics}</Checkbox>
                </Form.Item>
                <Form.Item
                    name={["permissions", "stock"]}
                    valuePropName="checked"
                >
                    <Checkbox>{permissions.stock}</Checkbox>
                </Form.Item>
                <Button
                    htmlType={"submit"}
                    size={"large"}
                    className={"w-full bg-green text-white rounded-[10px] !py-3 mt-6"}
                    disabled={!isValidated}
                >
                    Сохранить
                </Button>
            </Form>
        </>
    );
};

export default UserForm;
