import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Statistical.scss";

import Axios from "axios";
import axios from "axios";
import { filter } from "domutils";

function Statistical() {
  const [data, setData] = useState();
  const [isRender, setIsRender] = useState(false);
  //fetch data
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
      const startDate = new Date(item?.thoigianbatdau).getTime();
      const endDate = new Date(item?.thoigianketthuc).getTime();

      const soGio = (endDate - startDate) / 3600 / 1000;
      const thanhTien = soGio * 15;
      console.log(soGio);
      console.log(endDate);
      console.log(thanhTien);
      switch (filterValue) {
        case "500":
          {
            console.log(123);
            console.log(thanhTien);
            if (thanhTien < 500) {
              return item;
            }
          }
          break;
        case "1000":
          {
            if (thanhTien < 1000) {
              return item;
            }
          }
          break;
        case "5000":
          {
            if (thanhTien < 5000) {
              return item;
            }
          }
          break;
      }
    });
    setData(dataFilter);
    setIsRender(!isRender);
  }
  function handleSortPlace(value) {
    switch (value) {
      case "up":
        console.log(12);
        console.log(data);
        data.sort((a, b) => a.tenodo.localeCompare(b.tenodo));
        break;
      case "down":
        data.sort((a, b) => b.tenodo.localeCompare(a.tenodo));
        break;
    }
    setIsRender(!isRender);
  }

  function handleSortTime(value) {
    switch (value) {
      case "up":
        data.sort(
          (a, b) =>
            new Date(a.thoigianbatdau).getTime() -
            new Date(b.thoigianbatdau).getTime()
        );
        break;
      case "down":
        data.sort(
          (a, b) =>
            new Date(b.thoigianbatdau).getTime() -
            new Date(a.thoigianbatdau).getTime()
        );
        break;
    }
    setIsRender(!isRender);
  }
  return (
    <div class="wrapper">
      <div class="combobox">
        <label for="typeOfCar">Loại xe :</label>
        <select
          name="cars"
          id="cars"
          onChange={(e) => handlecars(e.target.value)}
        >
          <option value=""> -- Chọn -- </option>
          <option value="5">5 Chỗ</option>
          <option value="7">7 chỗ</option>
        </select>

        <label for="time">Thời gian :</label>
        <select
          name="time"
          id="time"
          onChange={(e) => handleSortTime(e.target.value)}
        >
          <option value=""> -- Chọn -- </option>
          <option value="up">Tăng dần</option>
          <option value="down">Giảm dần</option>
          <option value="input">Nhập khung giờ</option>
        </select>

        <label for="loan">Tiền nợ :</label>
        <select
          name="loan"
          id="loan"
          onChange={(e) => handlemoney(e.target.value)}
        >
          <option value=""> -- Chọn -- </option>
          <option value="500">Dưới 500.000vnđ</option>
          <option value="1000">Dưới 1.000.000vnđ</option>
          <option value="5000">Dưới 5.000.000vnđ</option>
        </select>
        <label for="toatal">Tổng tiền :</label>
        <select
          name="total"
          id="total"
          onChange={(e) => handlemoney(e.target.value)}
        >
          <option value=""> -- Chọn -- </option>
          <option value="500">Dưới 500.000vnđ</option>
          <option value="1000">Dưới 1.000.000vnđ</option>
          <option value="5000">Dưới 5.000.000vnđ</option>
        </select>
        <label for="id">Mã ô đỗ :</label>
        <select
          name="id"
          id="id"
          onChange={(e) => handleSortPlace(e.target.value)}
        >
          <option value=""> -- Chọn -- </option>
          <option value="up">Tăng dần</option>
          <option value="down">Giảm dần</option>
          <option value="input">Nhập khung giờ</option>
        </select>
      </div>
      <div className="table">
        <table class="tabledata" cellSpacing="0">
          <thead>
            <tr>
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
            </tr>
          </thead>
          {data?.map((item, index) => {
            const startDate = new Date(item?.thoigianbatdau).getTime();
            const endDate = new Date(item?.thoigianketthuc).getTime();
            const soGio = (endDate - startDate) / 3600 / 1000;
            const thanhTien = soGio * 15000;
            return (
              <tbody className="body" key={index}>
                <tr>
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
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
    </div>
  );
}
export default Statistical;
