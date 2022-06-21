import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
const AllRoutes = () => {
    return (
        <>
            <Routes>
                <Route exact path="/" element={<Home />} />

                <Route exact path="/thuethanhvien" element={<MemberRenting />} />

                <Route
                    exact
                    path='/dangky-KTV/:id/:dateBegin/:dateEnd/:dateBg/:dateEd'
                    params
                    element={<MemberRenting />}
                />

                <Route
                    exact
                    path='/dangky-KVL/:id/:dateBegin/:dateEnd/:dateBg/:dateEd'
                    element={<StrangerRenting />}
                />

                <Route
                    exact
                    path='/thongbao'
                    element={<Notification />}
                />

                <Route
                    exact
                    path='/danhsachthongbao'
                    element={<NotificationList />}
                />

                <Route
                    exact
                    path='/sua-thongbao/:id'
                    element={<EditNotification />}
                />

                <Route exact path="/stranger" element={<StrangerRenting />} />

                <Route exact path="/thongbao" element={<Notification />} />

                <Route exact path="/danhsachthongbao" element={<NotificationList />} />

                <Route exact path="/thongketheogio" element={<Statics />} />

                <Route exact path="/thongketheothang" element={<StatisticalMonth />} />

                <Route exact path="/search/:type/:key" element={<SearchResult />} />
            </Routes>
        </>
    );
};

export default AllRoutes;
