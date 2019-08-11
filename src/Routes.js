import React from "react"
import {Switch , Route } from "react-router-dom"
//components
import Home from "./components/Home"
import Listgql from "./components/Listgql"


const Routes = ({childProps}) =>

    <Switch>
        <Route path="/:year" exact component={Listgql}  props={childProps}/>
        <Route path="/" exact component={Home}  props={childProps}/>
    </Switch>;



export default Routes;