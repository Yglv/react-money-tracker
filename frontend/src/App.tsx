import React, { ReactElement, useContext, useEffect } from 'react';
import './App.css';
import Menu from './components/Menu'
import Home from './components/Home'
import { Context } from '.';
import { observer } from 'mobx-react-lite'
import { LoadingPanel } from './components/LoadingPanel';

function App(): ReactElement {
  const {store} = useContext(Context)

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth()
    }
  }, [])

  if (store.isLoading) {
    return <LoadingPanel/>
  }

  if (!store.isAuth ) {
    return (<Home/>)
  }
  return (
    <Menu/>
  )
}

export default observer(App);
