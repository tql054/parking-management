import React, { useState, useEffect, useRef } from 'react';
import { useStore } from "../../store/hooks";
import { useNavigate } from "react-router-dom";
// import pmApi from '../../api/pmApi';úe
import Axios from 'axios';

import './notification.css'

const Notification = () => {
    const [state, dispatch] = useStore()
    const { right, accessToken, phone } = state

    const [tieude, setTitle] = useState('');
    const [noidung, setContent] = useState('');
    const doituong = useRef([])
    const idDt = useRef([])
    const [quyen, setQuyen] = useState([])
    const [nguoinhan, setNguoiNhan] = useState([])

    //call api quyen
    const fetchData = async () => {
        const resp = await Axios.get("https://parkingmanagement16.herokuapp.com/quyen");
        const q = await resp.data.filter(item => item.tenquyen !== "Quản lý")
        setNguoiNhan(q.map(item => item.id));
        setQuyen(resp.data.filter(item => item.tenquyen !== "Quản lý"));
        doituong.current = q
        idDt.current = q.map(item => item.id)
        // setData(resp.data);
    };

    useEffect(() => {
        fetchData();
    }, []);



    //reset form
    const handleRefresh = (e) => {
        e.preventDefault();
        setContent('');
        setTitle('');
        // setChecked(1)
    }



    const handleSubmit = () => {
        Axios({
            method: 'post',
            url: 'http://localhost:8080/create-thongbao',
            data: {
                tieude: tieude,
                noidung: noidung,
                nguoinhan: nguoinhan,
                nguoidang: phone
            }
        });
    }

    const handleChecked = (id, a) => {
        setNguoiNhan(id);
        setQuyen(a);
    }

    return (
        <div className='notification'>
            {
                console.log('quyen : ', quyen)
            }
            <form onSubmit={handleSubmit}>
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
                        <div >
                            <input type="radio"
                                name="nguoinhan"
                                value={nguoinhan}
                                checked={JSON.stringify(nguoinhan) == JSON.stringify(idDt.current)}
                                onChange={() => handleChecked(idDt.current, doituong.current)}
                            />
                            <label style={{ marginLeft: '10px' }} >Tất cả</label>
                        </div>
                        {
                            doituong.current.map((dt, index) => (
                                <div key={index}>
                                    <input type="radio"
                                        value={nguoinhan}
                                        id={dt.id}
                                        name="nguoinhan"
                                        checked={JSON.stringify(nguoinhan) == JSON.stringify(dt.id)}
                                        
                                        onChange={() => handleChecked(dt.id, dt)}
                                    />
                                    <label style={{ marginLeft: '10px' }} htmlFor={dt.id}>{dt.tenquyen}</label>
                                </div>
                            ))
                        }
                    </div>
                    <input type="text" name="nguoidang" id="nguoidang" value={phone} hidden/>
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