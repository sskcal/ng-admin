import React, { Suspense } from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"
import { Spin } from 'antd'
import { leftMenu } from "./config/router"
import axios from './Utils/axios'
React.axios = axios
function getRouter(item) {
  return item.map(x => {
    const { children, path } = x
    if (!children) {
      if (x.layout) {
        return <Route exact path={path}>
          <x.layout><x.component /></x.layout>
        </Route>
      }
      return <Route exact path={path}><x.component /></Route>
    }
    return getRouter(children)
  })
}

export default function App() {
  return (
    <Suspense fallback={<Spin />}>
        <Router>
          <Switch>
            {getRouter(leftMenu)}
          </Switch>
        </Router>
    </Suspense>

  )
}

