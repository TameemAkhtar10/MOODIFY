import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { Router } from './app.routes'
import './features/shared/styles/globle.scss'
import { Authprovider } from '../src/features/Auth/auth.context'
import { SongContextProvider } from './features/home/song.context'


const App = () => {
  return (
    <Authprovider>
      <SongContextProvider>

        <RouterProvider router={Router} />
      </ SongContextProvider>
    </Authprovider>

  )
}

export default App
