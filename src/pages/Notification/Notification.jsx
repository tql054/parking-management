import React, { useState, useEffect } from 'react';

import { useNavigate } from "react-router-dom";
// import pmApi from '../../api/pmApi';
import Axios from 'axios';

import './notification.css'

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


//





const Notification = () => {
    const [tieude, setTitle] = useState('');
    const [noidung, setContent] = useState('');
    const [nguoinhan, setChecked] = useState(1);

    const [nv, setNv] = useState('8')
    const [kh, setKh] = useState('9')

    const navigate = useNavigate();


    //reset form
    const handleRefresh = (e) => {
        e.preventDefault();
        setContent('');
        setTitle('');
        setChecked(1)
    }

    const handleChange = (id) => {
        setChecked(id);
    }

    return (

        <div className='notification'>
            <form action='https://parkingmanagement16.herokuapp.com/create-thongbao' method='POST' >
                <h2>ĐĂNG THÔNG BÁO</h2>
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
                {/* <input type="text" value={[...quyen]} /> */}
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
                                        // value={{  }}
                                        id={dt.id}
                                        name="nguoinhan"
                                        checked={nguoinhan === dt.id}
                                        onChange={() => handleChange(dt.id)}
                                    />
                                    <label style={{ marginLeft: '10px' }} htmlFor={dt.id}>{dt.name}</label>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="submit">
                    <button className='btn post' type='submit'> Đăng bài</button>
                    <button href='#' onClick={handleRefresh} className='btn' type='submit'>Làm mới</button>
                </div>
            </form>
        </div>
    );
};

export default React.memo(Notification); 