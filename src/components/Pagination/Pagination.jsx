import React,{useState,useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import './pagination.css'
import Axios from 'axios'
const Pagination = ({ pagesVisited, usersPerPage }) => {
    const [data1, setData1] = useState([])
    const fetchData = async () => {
        const res = await Axios.get('https://parkingmanagement16.herokuapp.com/thongbao');
        setData1(res.data1);
    };

    useEffect(() => {
        fetchData();
    }, []);


    const handleDeleteById = id => {
        Axios.delete(`http://localhost:8080/delete-thongbao/${id}`)
            .then(res => {
                console.log(res);
                console.log(res.data1);
            })
    }
    const displayData = data1
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
                            <button onClick={() => handleDeleteById(post.id)} className='btn-delete'>Xóa</button>
                            <button className='btn-edit'>Sửa</button>
                        </div>

                    </td>
                </tr>
            )
        });

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