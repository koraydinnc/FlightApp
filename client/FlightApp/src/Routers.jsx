import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";

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
        
    }
    ]