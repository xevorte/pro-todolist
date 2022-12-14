import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import * as MODULE from "@Modules";
import Layouts from "@Layouts";
import Reducer from "@Bootstraps/bootstrapReducers";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "@Styles/_global.css";

const store = createStore(Reducer);

export default function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layouts />}>
                        <Route index element={<MODULE.Home />} />
                        <Route path="/detail/:id" element={<MODULE.Detail />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </Provider>
    );
}