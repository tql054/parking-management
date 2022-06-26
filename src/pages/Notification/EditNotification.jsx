import React, { useState, useEffect, useRef } from 'react';
import Axios from 'axios'
import './notification.css'
import { Navigate, useNavigate, useParams } from 'react-router-dom';



const EditNotification = (props) => {

    
    

    const [tieude, setTitle] = useState('');
    const [noidung, setContent] = useState('');
    const doituong = useRef([])
    const idDt = useRef([])
    const [quyen, setQuyen] = useState([])
    const [nguoinhan, setNguoiNhan] = useState([])
    const { id } = useParams();

    // call api get quyen
    const fetchQuyen = async () => {
        const resp = await Axios.get("https://parkingmanagement16.herokuapp.com/quyen");
        const q = await resp.data.filter(item => item.tenquyen !== "Quản lý")
        setNguoiNhan(q.map(item => item.id));
        setQuyen(resp.data.filter(item => item.tenquyen !== "Quản lý"));
        doituong.current = q
        idDt.current = q.map(item => item.id)
        // setData(resp.data);
    };

    useEffect(() => {
        fetchQuyen()
    }, [])


    // call api lay thong tin (tieude, noidung, maquyen) thong bao
    const fetchData = async () => {
        const res = await Axios.get(`http://localhost:8080/edit-thongbao/{id}`);
        setTitle(res.data.tieude)
        setContent(res.data.noidung)
    }
    useEffect(() => {    
        fetchData();
    }, [id]);


    const handleChecked = (id, a) => {
        setNguoiNhan(id);
        setQuyen(a);
    }

    const navigate = useNavigate();
    const newPage = () => {
        navigate('/danhsachthongbao')
    }
    return (
        <div>
           { console.log(id)}
            <div className='notification'>
                <form method='POST' action='http://localhost:8080/put-thongbao' >
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
                            <div >
                                <input type="radio"
                                    name="nguoinhan"
                                    value={nguoinhan}
                                    // checked={nguoinhan == idDt.current}
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
                                            // checked={nguoinhan === dt.id}
                                            onChange={() => handleChecked(dt.id, dt)}
                                        />
                                        <label style={{ marginLeft: '10px' }} htmlFor={dt.id}>{dt.tenquyen}</label>
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