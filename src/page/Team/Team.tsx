import {useEffect, useState} from "react";
import {Button, Input, Skeleton, notification, Modal} from "antd";
import {useQuery} from "@tanstack/react-query";
import {AxiosError} from "axios";

import {useInput} from "@/app/hooks/useInput";
import {useDebounce} from "@/app/hooks/useDebounce";
import {User, UserCard, UserForm, userService} from "@/entities/User/User.module";
import {getErrorMessage} from "@/shared/lib/getErrorMessage";
import search from "@/shared/assets/svg/search.svg";

const Team = () => {
    const [users, setUsers] = useState<User[]>([]);
    const {value, onChange} = useInput("");
    const [isModalOpened, setIsModalOpened] = useState(false);
    const [isModalRemoveOpened, setIsModalRemoveOpened] = useState(false);
    const {data: response, isLoading, isFetching} = useQuery({
        queryKey: [userService.KEY],
        onSuccess(response: any) {
            if (response?.data) {
                setUsers(response?.data);
            }
        },
        onError(error: AxiosError) {
            console.dir(error)
            notification.error({
                message: getErrorMessage(error),
            });
        },
        queryFn: () => {
            return userService.list();
        },
        retry: false,
        refetchOnWindowFocus: false,
    });
    const searchData = (...args: any[]) => {
        const [value] = args;
        const data: User[] = response?.data;
        const filteredData = data.filter(user => user.email.includes(value));
        setUsers(filteredData);
    }
    const debouncedCallback = useDebounce({cb: searchData, delay: 500});
    const onSave = (values: User) => {
        const data = [...users, values];
        setUsers(data);
        setIsModalOpened(false);
        notification.success({
            message: "Пользователь успешно добавлен",
        });
    }
    const onRemove = (user: User) => {
        const data = [...users].filter(u => u.email !== user.email);
        setUsers(data);
        setIsModalRemoveOpened(true);
    }
    useEffect(() => {
        if (value) {
            debouncedCallback(value);
        } else {
            setUsers(response?.data);
        }
    }, [value]);
    return (
        <>
            <div
                className={"flex items-center justify-between gap-10 border-0 border-b border-solid border-gray-200 pt-4 px-6 pb-8"}>
                <p className={"text-[26px] font-bold text-dark"}>Команда</p>
                <div className={"grow flex items-center gap-2"}>
                    <Input
                        placeholder={"Поиск по Email"}
                        value={value}
                        className={"rounded-[10px] border border-solid border-gray-300 py-2 px-3"}
                        suffix={<img src={search} alt={"search"}/>}
                        onChange={onChange}
                    />
                    <Button
                        size={"large"}
                        className={"bg-green text-white rounded-[10px] py-3"}
                        onClick={() => setIsModalOpened(true)}
                    >
                        Добавить пользователя
                    </Button>
                </div>
            </div>
            <div className={"p-2"}>
                <Skeleton
                    loading={isLoading || isFetching}
                    active
                    paragraph={false}
                    className={"h-[500px]"}
                >
                    {(users && users.length) ? users.map((user: User) => (
                        <UserCard
                            key={user.email}
                            user={user}
                            onRemove={onRemove}
                        />
                    )) : <div className={"text-lg text-center my-8"}>Нет записей</div>}
                </Skeleton>
            </div>
            {isModalOpened ? (
                <Modal
                    width={"auto"}
                    className={"max-w-[500px]"}
                    open={isModalOpened}
                    footer={null}
                    onCancel={() => setIsModalOpened(false)}
                >
                    <UserForm onSave={onSave}/>
                </Modal>
            ) : null}
            {isModalRemoveOpened ? (
                <Modal
                    width={"auto"}
                    className={"max-w-[500px]"}
                    open={isModalRemoveOpened}
                    footer={null}
                    onCancel={() => setIsModalRemoveOpened(false)}
                >
                    <div className={"p-4"}>
                        <p className={"text-[22px] leading-7 font-bold text-center mb-4"}>
                            Пользователь успешно удален
                        </p>
                        <Button
                            size={"large"}
                            className={"w-full bg-green text-white rounded-[10px] !py-3"}
                            onClick={() => setIsModalRemoveOpened(false)}
                        >
                            Закрыть
                        </Button>
                    </div>
                </Modal>
            ) : null}
        </>
    );
};

export default Team;
