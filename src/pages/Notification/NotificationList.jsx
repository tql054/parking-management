import React, { useEffect, useState } from 'react';
import Axios from 'axios'
import './notification.css'
import ReactPaginate from "react-paginate";
import Pagination from '../../components/Pagination/Pagination';



const NotificationList = () => {
    const [data, setData] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);

    const usersPerPage = 10;
    const pagesVisited = pageNumber * usersPerPage;
    //fetch API
    useEffect(() => {
        const fetchData = async () => {
            const res = await Axios.get('http://localhost:8080/thongbao');
            setData(res.data);
        };
        fetchData();
    }, []);


    const pageCount = Math.ceil(data.length / usersPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };
    //Page


    return (
        <>
            <Pagination pagesVisited={pagesVisited} usersPerPage={usersPerPage} data={data} />
            <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={"paginationBttns"}
                previousLinkClassName={"previousBttn"}
                nextLinkClassName={"nextBttn"}
                disabledClassName={"paginationDisabled"}
                activeClassName={"paginationActive"}
            />
        </>

    );
};

export default NotificationList;