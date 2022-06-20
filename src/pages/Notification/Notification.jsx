import React, { useState} from 'react';

import { useNavigate } from "react-router-dom";

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


const Notification = () => {
    const [tieude, setTitle] = useState('');
    const [noidung, setContent] = useState('');
    const [nguoinhan, setChecked] = useState(1)

    //post data 


    //reset form
    const handleRefresh = (e) => {
        e.preventDefault();
        setContent('');
        setTitle('');
        setChecked(1)
    }

    const navigate = useNavigate();


    const ckeditorstate = (event, editor) => {
        const data = editor.getData();
        this.setState({ content: data });
        console.log("STATE", { data })
    }
    const newPage = () => {
        
    }
    return (
        <div className='notification'>
            <form method='POST' action='http://localhost:8080/create-thongbao' >
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
                <div className="submit">
                    <button  className='btn post' type='submit'> Đăng bài</button>
                    <button href='#' onClick={handleRefresh} className='btn' type='submit'>Làm mới</button>
                </div>
            </form>
        </div>
    );
};

export default React.memo(Notification); 