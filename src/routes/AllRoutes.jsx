import React from "react";
import { useStore } from "../store/hooks";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import {
    Home,
    MemberRenting,
    StrangerRenting,
    Statics,
    StatisticalMonth,
    SearchResult,
    Notification,
    NotificationList,
    EditNotification
} from "../pages";

import Login from "../pages/Authentication/Login";
const AllRoutes = () => {

    const [state, dispatch] = useStore()
    const { accessToken, right, phone } = state
    console.log(accessToken)
    return (
        <Routes>
            {accessToken? (
                <>
                    <>
                        <Route exact path="/login" element={<Home />} />
                    </>
                    <Route exact path="/" element={<Home />} />

                    {/* <Route exact path="/thuethanhvien" element={<MemberRenting />} /> */}

                    <Route
                        exact
                        path='/dangky-KTV/:id/:dateBegin/:dateEnd/:type'
                        params
                        element={<MemberRenting />}
                    />

                    <Route
                        exact
                        path='/dangky-KVL/:id/:dateBegin/:dateEnd/:type'
                        element={right === 2 ? <StrangerRenting /> : <Home/>}
                    />

                    <Route
                        exact
                        path='/thongbao'
                        element={right <=1 ?<Notification /> : <Home/>}
                    />

                    <Route
                        exact
                        path='/danhsachthongbao'
                        element={<NotificationList />}
                    />

                    <Route
                        exact
                        path='/sua-thongbao/:id'
                        element={right <=1 ?<EditNotification />:<Home/>}
                    />

                    {/* <Route exact path="/stranger" element={true? (<StrangerRenting />):(<Navigate to="/" />)} /> */}

                    <Route exact path="/thongbao" element={right <=1 ?<Notification />:<Home/>} />

                    {/* <Route exact path="/danhsachthongbao" element={<NotificationList />} /> */}

                    <Route exact path="/thongketheogio" element={right <=2 ?<Statics />:<Home/>} />

                    <Route exact path="/thongketheothang" element={right <=2 ?<StatisticalMonth />:<Home/>} />

                    <Route exact path="/search/:type/:key" element={right <=2 ?<SearchResult />:<Home/>} />
                </>
            ):
            (
                <>
                    <>
                        <Route exact path="/" element={<Home />} />
                    </>

                    <>
                        <Route exact path="/login" element={<Login />} />
                    </>
                </>
            )}
        </Routes>
    );
};

export default AllRoutes;
