import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { useStore } from "../../store/hooks";

import './pagination.css'
import Axios from 'axios'

const Pagination = ({ pagesVisited, usersPerPage, data }) => {

    const navigate = useNavigate()
    const [state, dispatch] = useStore()
    const { right, accessToken, phone } = state
    //call API delete notification by Id
    const handleDeleteById = id => {
        Axios.delete(`http://localhost:8080/delete-thongbao/${id}`)
            .then(res => {
                console.log(res);
            });

    }






    //Hiển thị danh sách thông báo
    // const displayData = data.slice(pagesVisited, pagesVisited + usersPerPage)
    //     .map((post) => {
    //         return (
    //             <tr>
    //                 <td>{post.id}</td>
    //                 <td>{post.tieude}</td>
    //                 <td>{post.noidung}</td>
    //                 <td>{post.ngaydang}</td>
    //                 <td>
    //                     <div className='list_btn'>
    //                         <button onClick={() => handleDeleteById(post.id)} className='btn-delete'>Xóa</button>
    //                         <Link to={{
    //                             pathname: `/sua-thongbao/${post.id}`,
    //                         }} className='btn-edit'>Sửa</Link>
    //                     </div>
    //                 </td>
    //             </tr>
    //         )
    //     });
    //Chuyênr trang
    const history = useNavigate();


    return (
        <div>
            <table id="customers">
                {
                    right == 1 ?
                        (
                            <tr>
                                <th>STT</th>
                                <th>Title</th>
                                <th>Content</th>
                                <th>Time</th>
                                <th>Active</th>
                            </tr>
                        ) :
                        (<tr>
                            <th>STT</th>
                            <th>Title</th>
                            <th>Content</th>
                            <th>Time</th>
                        </tr>)
               }
                {
                    right == 1 ? (data.slice(pagesVisited, pagesVisited + usersPerPage)
                        .map((post) => {
                            return (
                                <tr>
                                    <td>{post.id}</td>
                                    <td>{post.tieude}</td>
                                    <td>{post.noidung}</td>
                                    <td>{post.ngaydang}</td>
                                    <td>
                                        <div className='list_btn'>
                                            <button onClick={() => handleDeleteById(post.id)} className='btn-delete'>Xóa</button>
                                            <Link to={{
                                                pathname: `/sua-thongbao/${post.id}`,
                                            }} className='btn-edit'>Sửa</Link>
                                        </div>
                                    </td>
                                </tr>
                            )
                        }))
                        :
                        (data.slice(pagesVisited, pagesVisited + usersPerPage)
                            .map((post) => {
                                return (
                                    <tr>
                                        <td>{post.id}</td>
                                        <td>{post.tieude}</td>
                                        <td>{post.noidung}</td>
                                        <td>{post.ngaydang}</td>
                                        {/* <td>
                                            <div className='list_btn'>
                                                <button onClick={() => handleDeleteById(post.id)} className='btn-delete'>Xóa</button>
                                                <Link to={{
                                                    pathname: `/sua-thongbao/${post.id}`,
                                                }} className='btn-edit'>Sửa</Link>
                                            </div>
                                        </td> */}
                                    </tr>
                                )
                            }))
                }
            </table>
        </div>
    );
};

export default Pagination;