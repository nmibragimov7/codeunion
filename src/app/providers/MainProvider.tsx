import {PropsWithChildren} from 'react';
import {QueryClientProvider} from "@tanstack/react-query";
import {ConfigProvider} from "antd";

import {queryClient} from "@/shared/setup/query/queryClient";
import {antdTheme} from "@/shared/setup/theme/theme";

const MainProvider = (props: PropsWithChildren) => {
    const {children} = props;
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <ConfigProvider theme={antdTheme}>
                    {children}
                </ConfigProvider>
            </QueryClientProvider>
        </>
    );
};

export default MainProvider;
