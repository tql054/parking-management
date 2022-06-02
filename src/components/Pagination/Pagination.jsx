import React from 'react';
import './pagination.css'
const Pagination = ({ pagesVisited, usersPerPage, data }) => {
    const displayData = data
        .slice(pagesVisited, pagesVisited + usersPerPage)
        .map((post) => {
            return (
                <tr>
                    <td>{post.id}</td>
                    <td>{post.title}</td>
                    <td>{post.body}</td>
                    <td>8:25:00 31-05-2022</td>
                    <td>
                        <div className='list_btn'>
                            <button className='btn-delete'>Xóa</button>
                            <button className='btn-edit'>Sửa</button>
                        </div>

                    </td>
                </tr>
            )
        });
    // const his = useHistory();
    // const move_notificationList = () => {
    //     his.push('/danhsachthongbao');
    // }


    return (
        <div>
            <button className='btn-list-notification' >Danh sách thông báo</button>
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