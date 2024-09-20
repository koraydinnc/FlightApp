import React from 'react'
import Header from '../components/Header'

const layout = ({children}) => {
  return (
    <div>
        <Header/>
        <div>
            {children}
        </div>
    </div>
  )
}

export default layout
