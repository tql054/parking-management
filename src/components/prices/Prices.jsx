import React from "react";
import './prices.scss'

const MemmberPrice = () => {
    const priceList = {
        fiveList: [
            {
                type: 'giờ',
                price: '15,000 VND'
            },

            {
                type: 'ngày',
                price: '40,000 VND'
            },

            {
                type: 'tháng',
                price: '900,000 VND'
            },
        ],

        sevenList: [
            {
                type: 'giờ',
                price: '17,000 VND'
            },

            {
                type: 'ngày',
                price: '45,000 VND'
            },

            {
                type: 'tháng',
                price: '1,000,000 VND'
            },
        ]
    }

    return (
        <section className="prices">
            <h1 className="prices__title">Bảng niêm yết mức giá:</h1>
            <ul className="prices__list fiveList">
                <span className="prices__list__area">Khu cho xe 5 chỗ trở xuống:</span>
                {
                    priceList.fiveList.map((item, index) => (
                            <li 
                                key={index} 
                                className="prices__list__item">
                                <h3 className="title">{`- Giá thuê ô đỗ xe theo ${item.type}:`}</h3>
                                <span className="price">{`${item.price}/${item.type}/ô đỗ`}</span> 
                            </li>
                        )
                    )
                }
            </ul>

            <ul className="prices__list sevenList">
                <span className="prices__list__area">Khu cho xe 7 chỗ trở xuống:</span>
                {
                    priceList.sevenList.map((item, index) => (
                            <li 
                                key={index} 
                                className="prices__list__item">
                                <h3 className="title">{`- Giá thuê ô đỗ xe theo ${item.type}:`}</h3>
                                <span className="price">{`${item.price}/${item.type}/ô đỗ`}</span> 
                            </li>
                        )
                    )
                }
            </ul>
        </section>
    )
}

const StrangerPrice = () => {
    const priceList = {
        fiveList: [
            {
                type: 'giờ',
                price: '15,000 VND'
            },
        ],

        sevenList: [
            {
                type: 'giờ',
                price: '17,000 VND'
            },

        ]
    }

    return (
        <section className="prices">
            <h1 className="prices__title">Bảng niêm yết mức giá:</h1>
            <ul className="prices__list fiveList">
                <span className="prices__list__area">Khu cho xe 5 chỗ trở xuống:</span>
                {
                    priceList.fiveList.map((item, index) => (
                            <li 
                                key={index} 
                                className="prices__list__item">
                                <h3 className="title">{`- Giá thuê ô đỗ xe theo ${item.type}:`}</h3>
                                <span className="price">{`${item.price}/${item.type}/ô đỗ`}</span> 
                            </li>
                        )
                    )
                }
            </ul>

            <ul className="prices__list sevenList">
                <span className="prices__list__area">Khu cho xe 7 chỗ trở xuống:</span>
                {
                    priceList.sevenList.map((item, index) => (
                            <li 
                                key={index} 
                                className="prices__list__item">
                                <h3 className="title">{`- Giá thuê ô đỗ xe theo ${item.type}:`}</h3>
                                <span className="price">{`${item.price}/${item.type}/ô đỗ`}</span> 
                            </li>
                        )
                    )
                }
            </ul>
        </section>
    )
}

export {StrangerPrice}
export default MemmberPrice