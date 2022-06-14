import React, { useRef, useState, useMemo } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import ReactHtmlParser from 'html-react-parser'
import axios from 'axios'
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
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [checked, setChecked] = useState(1)

    //post data 

    const handlePostNotification = event => {
        event.preventDefault();
        console.log(title)
        const notification = {
            // nguoidang: checked,
            tieude: title,
            noidung: ReactHtmlParser(content),
        };
        console.log(notification)
        axios.post(`https://parkingmanagement16.herokuapp.com/create-thongbao`, { notification })
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
    }
  
    //reset form
    const handleRefresh = (e) => {
        e.preventDefault();
        setContent('');
        setTitle('');
        setChecked(1)
    }

    console.log('re-render')
    return (
        <div className='notification'>
            <form>

                <div className="title">
                    <label htmlFor="">Tiêu đề thông báo</label>
                    <input
                        type="text"
                        required
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    /> <span style={{ color: 'red', margin: 'auto 20px', fontWeight: '700' }}>(*)</span>
                </div>
                <div className="ckeditor">
                    <label htmlFor="ckeditor">Nội dung thông báo</label>
                    <CKEditor
                        required
                        className='ckeditor_line'
                        data={content}
                        editor={ClassicEditor}
                        onChange={(e, editor) => setContent(editor.getData())}
                    />
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
                                        checked={checked === dt.id}
                                        onChange={() => setChecked(dt.id)}
                                    />
                                    <label style={{ marginLeft: '10px' }} htmlFor={dt.id}>{dt.name}</label>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="submit">
                    <button onClick={handlePostNotification}  className='btn post' type='submit'>Đăng</button>
                    {/* <button onClick={handleRefresh} className='btn' type='submit'>Làm mới</button> */}
                </div>
            </form>
        </div>
    );
};

export default React.memo(Notification); 