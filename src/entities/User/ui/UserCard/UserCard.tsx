import {FC, useState} from "react";
import {Button, Dropdown, Modal} from "antd";

import Tag from "@/shared/ui/Tag/Tag";
import {User} from "@/entities/User/api/types";
import {classNames} from "@/shared/lib/classNames";
import css from "./UserCard.module.scss";
import dots from "@/shared/assets/svg/dots.svg";

interface IUserCard {
    user: User;
    onRemove: (user: User) => void;
}

const UserCard: FC<IUserCard> = ({user, onRemove}) => {
    const modalSendHandler = () => {
        setIsModalSendOpened(true);
    }
    const modalRemoveHandler = () => {
        onRemove(user);
    }
    const items = [
        {
            key: "change",
            label: (
                <Button
                    type="text"
                    className={"w-full"}
                >Изменить права доступа</Button>
            ),
        },
        {
            key: "send",
            label: (
                <Button
                    type="text"
                    className={"w-full"}
                    onClick={modalSendHandler}
                >Отправить код повторно</Button>
            ),
        },
        {
            key: "remove",
            label: (
                <Button
                    type="text"
                    className={"w-full"}
                    onClick={modalRemoveHandler}
                >Удалить</Button>
            ),
        }
    ];
    const [isModalSendOpened, setIsModalSendOpened] = useState(false);
    return (
        <>
            <div className={classNames(css.UserCard)}>
                <div className={"flex gap-4"}>
                    <img
                        src={user.image}
                        alt="avatar"
                        className={"w-16 h-16 rounded-[50%] object-cover"}
                    />
                    <div>
                        <p className={"mb-2"}>
                            <span className={"text-lg font-semibold"}>{user.name}</span> <span
                            className={"text-lg text-gray-500"}>{user.email}</span>
                        </p>
                        <div className={"flex items-center gap-2"}>
                            {user.permissions.map(permission => (
                                <Tag key={permission} text={permission}/>
                            ))}
                        </div>
                    </div>
                </div>
                <Dropdown menu={{items}}>
                    <img src={dots} alt="dots" className={"p-2"}/>
                </Dropdown>
            </div>
            {isModalSendOpened ? (
                <Modal
                    width={"auto"}
                    className={"max-w-[500px]"}
                    open={isModalSendOpened}
                    footer={null}
                    onCancel={() => setIsModalSendOpened(false)}
                >
                    <div className={"p-4"}>
                        <p className={"text-[22px] leading-7 font-bold text-center mb-4"}>Приглашение отправлено на
                            почту example@email.com</p>
                        <Button
                            size={"large"}
                            className={"w-full bg-green text-white rounded-[10px] !py-3"}
                            onClick={() => setIsModalSendOpened(false)}
                        >
                            Закрыть
                        </Button>
                    </div>
                </Modal>
            ) : null}
        </>
    );
};

export default UserCard;
