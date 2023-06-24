import {useEffect, useState} from "react";
import {Layout, Menu} from "antd";
import {useLocation, useNavigate} from "react-router-dom";

import {classNames} from "@/shared/lib/classNames";
import {paths} from "@/shared/options/constants";
import logo from "@/shared/assets/svg/logo.svg";
import avatar from "@/shared/assets/png/avatar.png";
import analytics from "@/shared/assets/svg/analytics.svg";
import profile from "@/shared/assets/svg/profile.svg";
import moderation from "@/shared/assets/svg/moderation.svg";
import chats from "@/shared/assets/svg/chats.svg";
import banners from "@/shared/assets/svg/banners.svg";
import team from "@/shared/assets/svg/team.svg";
import blog from "@/shared/assets/svg/blog.svg";
import exchangeRates from "@/shared/assets/svg/exchange-rates.svg";
import logout from "@/shared/assets/svg/logout.svg";

const {Sider} = Layout;

const Sidebar = () => {
    const [selectedKeys, setSelectedKeys] = useState<string[]>([paths.TEAM.path]);
    const navigate = useNavigate();
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false);
    const onClick = (path: string) => {
        navigate(path);
    }
    const onLogout = () => {
        console.log("logout");
    }
    useEffect(() => {
        for (const key in paths) {
            if (location.pathname.includes(paths[key].path)) {
                // @ts-ignore
                setSelectedKeys(paths[key].path);
            }
        }
    }, [location]);
    return (
        <>
            <div className={"shadow-gray-100 bg-gray-100 rounded-tr-2xl rounded-br-2xl"}>
                <Sider
                    width={240}
                    collapsible
                    collapsed={collapsed}
                    onCollapse={(value: boolean) => setCollapsed(value)}
                >
                    <div className={classNames("w-full flex justify-center cursor-pointer hover:opacity-70 my-6")}>
                        <img src={logo} alt="logo"/>
                    </div>
                    <div className={"w-full flex justify-center mb-6"}>
                        <img src={avatar} alt="avatar" className={"w-16 h-16 rounded-[50%] object-cover"}/>
                    </div>
                    <Menu
                        theme="dark"
                        mode="inline"
                        selectedKeys={selectedKeys}
                        items={[
                            {
                                key: paths.ANALYTICS.path,
                                icon: <img src={analytics} alt="analytics" className={classNames("!w-5 !h-5")}/>,
                                label: paths.ANALYTICS.title,
                                onClick: () => onClick(paths.ANALYTICS.path)
                            },
                            {
                                key: paths.PROFILE.path,
                                icon: <img src={profile} alt="profile" className={classNames("!w-5 !h-5")}/>,
                                label: paths.PROFILE.title,
                                onClick: () => onClick(paths.ANALYTICS.path)
                            },
                            {
                                key: paths.MODERATION.path,
                                icon: <img src={moderation} alt="moderation" className={classNames("!w-5 !h-5")}/>,
                                label: paths.MODERATION.title,
                                onClick: () => onClick(paths.MODERATION.path)
                            },
                            {
                                key: paths.CHATS.path,
                                icon: <img src={chats} alt="chats" className={classNames("!w-5 !h-5")}/>,
                                label: paths.CHATS.title,
                                onClick: () => onClick(paths.CHATS.path)
                            },
                            {
                                key: paths.BANNERS.path,
                                icon: <img src={banners} alt="banners" className={classNames("!w-5 !h-5")}/>,
                                label: paths.BANNERS.title,
                                onClick: () => onClick(paths.BANNERS.path)
                            },
                            {
                                key: paths.TEAM.path,
                                icon: <img src={team} alt="team" className={classNames("!w-5 !h-5")}/>,
                                label: paths.TEAM.title,
                                onClick: () => onClick(paths.TEAM.path)
                            },
                            {
                                key: paths.BLOG.path,
                                icon: <img src={blog} alt="blog" className={classNames("!w-5 !h-5")}/>,
                                label: paths.BLOG.title,
                                onClick: () => onClick(paths.BLOG.path)
                            },
                            {
                                key: paths.EXCHANGERATES.path,
                                icon: <img src={exchangeRates} alt="exchange-rates" className={classNames("!w-5 !h-5")}/>,
                                label: paths.EXCHANGERATES.title,
                                onClick: () => onClick(paths.EXCHANGERATES.path)
                            },
                            {
                                key: "logout",
                                icon: <img src={logout} alt="logout" className={classNames("!w-5 !h-5")}/>,
                                label: <span className={"!text-red-500"}>Выйти</span>,
                                onClick: () => onLogout()
                            },
                        ]}
                    />
                </Sider>
            </div>
        </>
    );
};

export default Sidebar;
