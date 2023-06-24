import {Suspense} from "react";
import {createBrowserRouter, Navigate, RouteObject} from "react-router-dom";
import {Outlet} from "react-router-dom";

import CabinetLayout from "@/widgets/CabinetLayout/CabinetLayout";
import Fallback from "@/shared/ui/Fallback/Fallback";
import {AnalyticsLazy} from "@/page/Analytics/Analytics.module";
import {TeamLazy} from "@/page/Team/Team.module";

const routes: RouteObject[] = [
    {
        path: "/",
        element: (
            <CabinetLayout>
                <Suspense fallback={<Fallback/>}>
                    <Outlet/>
                </Suspense>
            </CabinetLayout>
        ),
        children: [
            {
                index: true,
                element: <Navigate to={"analytics"} replace={true}/>
            },
            {
                element: <AnalyticsLazy/>,
                path: "analytics"
            },
            {
                element: <TeamLazy/>,
                path: "team"
            },
        ],
    },
    {
        path: '*',
        element: <Navigate to={'/'} replace={true}/>
    }
];

export const getRoutes = () => {
    return createBrowserRouter(routes)
};
