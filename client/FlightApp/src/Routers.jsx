import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import TicketsPage from "./pages/TicketsPage";

export const MainRouter = [
    {
        path:'/',
        component: HomePage,
        exact:true
    },
    {
        path:'/Login',
        component:AuthPage,
        exact:true
        
    },
    {
        path:'/Tickets/:userId',
        component: TicketsPage,
        exact:true
    }
    ]