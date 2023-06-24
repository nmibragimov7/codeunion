import {PropsWithChildren} from 'react';
import {Layout} from "antd";

import Sidebar from "./Sidebar/Sidebar";

const { Content } = Layout;

const CabinetLayout = (props:PropsWithChildren) => {
    const {children} = props;
    return (
        <Layout className={"!min-h-screen"}>
            <Sidebar/>
            <Layout>
                <Content className={"bg-base py-8"}>
                    <div className={"bg-gray-100 container mx-auto rounded-2xl py-4"}>
                        {children}
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default CabinetLayout;
