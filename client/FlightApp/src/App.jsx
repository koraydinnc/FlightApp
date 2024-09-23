import { Route, Routes } from 'react-router-dom'
import './App.css'
import { MainRouter } from './Routers'
import MainLayout from './layout/MainLayout'

function App() {

  return (
      <Routes>
         {MainRouter.map((route, index) => (
            <Route
             key={index}
             path={route.path}
             element={
              <MainLayout>
                <route.component/>
              </MainLayout>
             }

            >

            </Route>
         ))}
      </Routes> 

  )
}

export default App
