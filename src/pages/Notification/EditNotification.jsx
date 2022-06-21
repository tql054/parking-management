import React, { useState, useEffect } from 'react';
import Axios from 'axios'
import './notification.css'
import { Navigate, useNavigate, useParams } from 'react-router-dom';

const data = [
    {
        id: 1,
        name: 'Tất cả'
    },
    {
        id: 2,
        name: 'Nhân viên'
    },
    {
        id: 3,
        name: 'Khách hàng'
    }
];

const EditNotification = (props) => {

    const [tieude, setTitle] = useState('')
    const [noidung, setContent] = useState('')
    const [nguoinhan, setChecked] = useState(1)
    const { id } = useParams();

    const fetchData = async () => {
        const res = await Axios.get(`https://parkingmanagement16.herokuapp.com/edit-thongbao/${id}`);

        setTitle(res.data.tieude)
        setContent(res.data.noidung)

    }
    useEffect(() => {    
        fetchData();
    }, [id]);
    const navigate = useNavigate();
    const newPage = () => {
        navigate('/danhsachthongbao')
    }
    return (
        <div>
           { console.log(id)}
            <div className='notification'>
                <form method='POST' action='https://parkingmanagement16.herokuapp.com/put-thongbao' >
                    <h2>SỬA THÔNG BÁO</h2>
                    <div className="title">
                        <label htmlFor="">Tiêu đề thông báo</label>
                        <input
                            type="text"
                            required
                            name="tieude"
                            value={tieude}
                            onChange={e => setTitle(e.target.value)}
                        /> <span style={{ color: 'red', margin: 'auto 20px', fontWeight: '700' }}>(*)</span>
                    </div>
                    <div className="ckeditor">
                        <label htmlFor="ckeditor">Nội dung thông báo</label>
                        <textarea name="noidung" id="ckeditor" value={noidung} onChange={e => setContent(e.target.value)} cols="65" rows="10"></textarea>
                    </div>
                    <div className="receiver">
                        <label htmlFor="">Người nhận thông báo</label>
                        <div className="content">
                            {
                                data.map(dt => (
                                    <div key={dt.id}>
                                        <input type="radio"
                                            value={dt.name}
                                            id={dt.id}
                                            name="nguoinhan"
                                            checked={nguoinhan === dt.id}
                                            onChange={() => setChecked(dt.id)}
                                        />
                                        <label style={{ marginLeft: '10px' }} htmlFor={dt.id}>{dt.name}</label>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <input type="text" name="id" value={id} hidden />
                    <div className="submit">
                        <button className='btn post' type='submit'  >Sửa</button>
                        <button onClick={newPage} className='btn' type='submit'>Đóng</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditNotification;