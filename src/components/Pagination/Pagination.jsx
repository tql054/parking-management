import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import './pagination.css'
import Axios from 'axios'

const Pagination = ({ pagesVisited, usersPerPage, data }) => {

 

    //call API delete notification by Id
    const handleDeleteById = id => {
        Axios.delete(`http://localhost:8080/delete-thongbao/${id}`)
            .then(res => {
                console.log(res);
            })

    }



    //Hiển thị danh sách thông báo
    const displayData = data
        .slice(pagesVisited, pagesVisited + usersPerPage)
        .map((post) => {
            return (
                <tr>
                    <td>{post.id}</td>
                    <td>{post.tieude}</td>
                    <td>{post.noidung}</td>
                    <td>{post.ngaydang}</td>
                    <td>
                        <div className='list_btn'>
                            <a href='http://localhost:3000/danhsachthongbao' onClick={() => handleDeleteById(post.id)} className='btn-delete'>Xóa</a>
                            <Link to={{
                                pathname: `/sua-thongbao/${post.id}`,
                            }} className='btn-edit'>Sửa</Link>
                        </div>
                    </td>
                </tr>
            )
        });
    //Chuyênr trang
    const history = useNavigate();


    return (
        <div>
            <table id="customers">
                <tr>
                    <th>STT</th>
                    <th>Title</th>
                    <th>Content</th>
                    <th>Time</th>
                    <th>Active</th>
                </tr>
                {displayData}
            </table>
        </div>
    );
};

export default Pagination;