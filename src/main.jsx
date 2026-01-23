import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import RootLayout from "./component/rootLayout.jsx";
import Movies from "./component/movies.jsx";
import Series from "./component/series.jsx";
import History from "./component/history.jsx";
import Search from "./component/search.jsx";
import Details from "./component/details.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Movies,
            },
            {
                path: "/series",
                Component: Series,
            },
            {
                path: "/history",
                Component: History,
            },
            {
                path: "/search",
                Component: Search,
            },
            {
                path: "/details/:type/:id",
                Component: Details,
            }
        ]
    },
]);

createRoot(document.getElementById('root')).render(
    <RouterProvider router={router}/>
)
