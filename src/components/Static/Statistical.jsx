import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Statistical.scss";

import Axios from "axios";
import axios from "axios";
import { filter } from "domutils";

function Statistical() {
  const [data, setData] = useState();

  const fetchData = async () => {
    const resp = await axios.get(
      "https://parkingmanagement16.herokuapp.com/dangkyvanglai"
    );
    setData(resp.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  function tinhTien() {
    data?.map((item) => {
      const startDate = new Date(item?.thoigianbatdau);
      const endDate = new Date(item?.thoigianketthuc);
      const soGio = (endDate - startDate) / 3600 / 1000;
      const thanhTien = soGio * 15000;
    });
  }

  function handlecars(filterValue) {
    if (!filterValue) {
      fetchData();
      return;
    }

    const dataFilter = data?.filter((item) => {
      const getCate = item?.loaixe.split(" ")[1];
      //    const getCate = item.loaixe.slice(3, 4);
      if (filterValue === getCate) {
        return item;
      }
    });
    setData(dataFilter);
  }

  function handlemoney(filterValue) {
    if (!filterValue) {
      fetchData();
      return;
    }

    const dataFilter = data?.filter((item) => {
      const startDate = new Date(item?.thoigianbatdau);
      const endDate = new Date(item?.thoigianketthuc);
      const soGio = (endDate - startDate) / 3600 / 1000;
      const thanhTien = soGio * 15;
      console.log(thanhTien);
      if (thanhTien < filterValue) {
        return item;
      }
    });
    setData(dataFilter);
  }
  return (
    <div class="wrapper">
      <div class="combobox">
        <label for="typeOfCar">Loại xe</label>
        <select
          name="cars"
          id="cars"
          onChange={(e) => handlecars(e.target.value)}
        >
          <option value=""> -- Chọn -- </option>
          <option value="5">5 Chỗ</option>
          <option value="7">7 chỗ</option>
        </select>

        <label for="time">Thời gian</label>
        <select name="time" id="time">
          <option value=""> -- Chọn -- </option>
          <option value="up">Tăng dần</option>
          <option value="down">Giảm dần</option>
          <option value="input">Nhập khung giờ</option>
        </select>

        <label for="loan">Tiền nợ</label>
        <select
          name="loan"
          id="loan"
          onChange={(e) => handlemoney(e.target.value)}
        >
          <option value=""> -- Chọn -- </option>
          <option value="50">Dưới 50.000vnđ</option>
          <option value="100">Dưới 100.000vnđ</option>
          <option value="input">Tuỳ chọn khác</option>
        </select>
        <label for="toatal">Tổng tiền</label>
        <select
          name="total"
          id="total"
          onChange={(e) => handlemoney(e.target.value)}
        >
          <option value=""> -- Chọn -- </option>
          <option value="50">Dưới 50.000vnđ</option>
          <option value="500">Dưới 500.000vnđ</option>
          <option value="input">Tuỳ chọn khác</option>
        </select>
        <label for="id">Mã ô đỗ</label>
        <select name="id" id="id">
          <option value=""> -- Chọn -- </option>
          <option value="up">Tăng dần</option>
          <option value="down">Giảm dần</option>
          <option value="input">Nhập khung giờ</option>
        </select>
      </div>
      <div className="table">
        <table>
          <thead>
            <th>STT</th>
            <th>Mã Ô đỗ</th>
            <th>Biển số xe</th>
            <th>Số điện thoại</th>
            <th>Loại xe</th>
            <th>Giờ vào bãi</th>
            <th>Giờ ra bãi</th>
            <th>Mã khu đỗ</th>
            <th>Số giờ</th>
            <th>Thành tiền</th>
            <th>Tiền nợ</th>
            <th>Tổng Tiền</th>
          </thead>
          {data?.map((item, index) => {
            const startDate = new Date(item?.thoigianbatdau);
            const endDate = new Date(item?.thoigianketthuc);
            const soGio = (endDate - startDate) / 3600 / 1000;
            const thanhTien = soGio * 15000;
            return (
              <tbody className="body" key={index}>
                <td>{index + 1}</td>
                <td>{item?.tenodo}</td>
                <td>{item?.biensoxe}</td>
                <td>{item?.sodienthoai}</td>
                <td>{item?.loaixe}</td>
                <td>{item?.thoigianbatdau}</td>
                <td>{item?.thoigianketthuc}</td>
                <td>{item?.makhudo}</td>
                <td>{soGio}</td>
                <td>{`${thanhTien.toLocaleString()} VNĐ`}</td>
                <td></td>
              </tbody>
            );
          })}
        </table>
      </div>
    </div>
  );
}
export default Statistical;
