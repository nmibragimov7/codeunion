import {RouterProvider} from "react-router-dom";

import MainProvider from "../providers/MainProvider";
import {getRoutes} from "../routes/routes";
import "./rewrite.css";
import './index.css';

const App = () => {
    return (
        <>
            <MainProvider>
                <RouterProvider router={getRoutes()} />
            </MainProvider>
        </>
    );
};

export default App;
