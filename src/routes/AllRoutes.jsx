import React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {Home, MemberRenting, StrangerRenting, Statics} from '../pages'
const AllRoutes = () => {
    return (
        <>
            <Routes>
                <Route
                    exact
                    path='/'
                    element={<Home/>}
                />

                <Route
                    exact
                    path='/thongke'
                    element={<Statics/>}
                />
                
                <Route
                    exact
                    path='/thuethanhvien'
                    element={<MemberRenting/>}
                />

                <Route
                    exact
                    path='/stranger'
                    element={<StrangerRenting/>}
                />
            </Routes>
        </>
    )
}

export default AllRoutes