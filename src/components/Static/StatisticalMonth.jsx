import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { filter } from "domutils";
import "./Statistical.scss";
function StatisticalMonth() {
<<<<<<< HEAD
  const [data, setData] = useState();
  const [isRender, setIsRender] = useState(false);
  //fetch data
  const fetchData = async () => {
    const resp = await axios.get(
      "https://parkingmanagement16.herokuapp.com/dangkythanhvien"
    );
    setData(resp.data);
  };

  useEffect(() => {
    fetchData();
  }, []);
  console.log(data);

  function handlecars(filterValue) {
    if (!filterValue) {
      fetchData();
      return;
    }
    const dataFilter = data?.filter((item) => {
      const getCate = item?.loaixe.split(" ")[1];
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
      const endDateReal = new Date(item?.thoigiankethucthuc).getTime();
      const soGio = (endDateReal - endDate) / 3600 / 1000;
      const thanhTien = soGio * 15;
      console.log(soGio);
      console.log(endDate);
      console.log(thanhTien);
      switch (filterValue) {
        case "50":
          {
            console.log(123);
            if (thanhTien < 50000) {
              return item;
            }
          }
          break;
        case "0":
          {
            if (thanhTien < 100000) {
              return item;
            }
          }
          break;
        case "500":
          {
            if (thanhTien < 500000) {
              return item;
            }
          }
          break;
      }
    });
    setData(dataFilter);
    setIsRender(!isRender);
  }

  function handleSortTime(value) {
    switch (value) {
      case "up":
        data.sort(
          (a, b) =>
            new Date(a.thoigianbatdau).getTime() -
            new Date(b.thoigianbatdau).getTime()
=======
    const [data, setData] = useState();
    const [isRender, setIsRender] = useState(false);
    //fetch data
    const fetchData = async () => {
        const resp = await axios.get(
            "https://parkingmanagement16.herokuapp.com/dangkythanhvien"
>>>>>>> main
        );
        setData(resp.data);
    };

    useEffect(() => {
        fetchData();
    }, []);
    console.log(data);

    function handlecars(filterValue) {
        if (!filterValue) {
            fetchData();
            return;
        }
        const dataFilter = data?.filter((item) => {
            const getCate = item?.loaixe.split(" ")[1];
            if (filterValue === getCate) {
                return item;
            }
        });
        setData(dataFilter);
    }
<<<<<<< HEAD
    setIsRender(!isRender);
  }

  function handleSortPlace(value) {
    switch (value) {
      case "up":
        data.sort((a, b) => a.tenodo - b.tenodo);

        break;
      case "down":
        {
          data.sort((a, b) => b.tenodo - a.tenodo);
        }
        break;
    }

    setIsRender(!isRender);
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
        <select
          name="time"
          id="time"
          onChange={(e) => handleSortTime(e.target.value)}
        >
          <option value=""> -- Chọn -- </option>
          <option value="up">Tăng dần</option>
          <option value="down">Giảm dần</option>
        </select>

        <label for="loan">Tiền nợ</label>
        <select
          name="loan"
          id="loan"
          onChange={(e) => handlemoney(e.target.value)}
        >
          <option value=""> -- Chọn -- </option>
          <option value="50">Dưới 50.000vnđ</option>
          <option value="0">Dưới 100.000vnđ</option>
          <option value="500">Dưới 500.000vnđ</option>
        </select>
        <label for="toatal">Tổng tiền</label>
        <select
          name="total"
          id="total"
          onChange={(e) => handlemoney(e.target.value)}
        >
          <option value=""> -- Chọn -- </option>
          <option value="50">Dưới 50.000vnđ</option>
          <option value="100">Dưới 100.000vnđ</option>
          <option value="500">Dưới 500.000vnđ</option>
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
        </select>
      </div>
      <table class="tabledata" cellSpacing="0">
        <thead>
          <tr>
            <th>Số thứ tự</th>
            <th>Mã ô đỗ</th>
            <th>Họ và tên</th>
            <th>Biển số xe</th>
            <th>Số điện thoại</th>
            <th>Loại xe</th>
            <th>Ngày bắt đầu</th>
            <th>Ngày kết thúc</th>
            <th>Ngày kết thúc thực</th>

            <th>Trạng thái</th>
            <th>Thành tiền</th>
          </tr>
        </thead>

        {data?.map((item, index) => {
          const endDateReal = new Date(item?.thoigiankethucthuc).getTime();
          const endDate = new Date(item?.thoigianketthuc).getTime();
          const dateNo = (endDateReal - endDate) / 3600 / 1000;
          const thanhTien = dateNo * 15;
          const thoigianbd = new Date(item.thoigianbatdau);
          const thoigianktt = new Date(item.thoigiankethucthuc);
          const thoigiankt = new Date(item.thoigianketthuc);
          console.log(dateNo);
          return (
            <tbody className="body" key={index}>
              <tr>
                <td>{index++}</td>
                <td>{item?.tenodo}</td>
                <td>{item?.hoten}</td>
                <td>{item?.biensoxe}</td>
                <td>{item?.sodienthoai}</td>
                <td>{item?.loaixe}</td>
                <td>{`${thoigianbd.getHours()} : ${thoigianbd.getMinutes()}0 || ${thoigianbd.getDay()}-${thoigianbd.getMonth()}-${thoigianbd.getFullYear()}`}</td>
                <td>{`${thoigiankt.getHours()} : ${thoigiankt.getMinutes()}0 || ${thoigiankt.getDay()}-${thoigiankt.getMonth()}-${thoigiankt.getFullYear()}`}</td>
                <td>{`${thoigianktt.getHours()} : ${thoigianktt.getMinutes()}0 || ${thoigianktt.getDay()}-${thoigianktt.getMonth()}-${thoigianktt.getFullYear()}`}</td>

                <td>{item?.trangthai}</td>
                <td>{`${thanhTien.toLocaleString()} VNĐ`}</td>
              </tr>
            </tbody>
          );
        })}
      </table>
    </div>
  );
=======
    function handlemoney(filterValue) {
        if (!filterValue) {
            fetchData();
            return;
        }
        const dataFilter = data?.filter((item) => {
            const startDate = new Date(item?.thoigianbatdau).getTime();
            const endDate = new Date(item?.thoigianketthuc).getTime();
            const endDateReal = new Date(item?.thoigiankethucthuc).getTime();
            const soGio = (endDateReal - endDate) / 3600 / 1000;
            const thanhTien = soGio * 15;
            console.log(soGio);
            console.log(endDate);
            console.log(thanhTien);
            switch (filterValue) {
                case "50":
                    {
                        console.log(123);
                        if (thanhTien < 50) {
                            return item;
                        }
                    }
                    break;
                case "100":
                    {
                        if (thanhTien < 100) {
                            return item;
                        }
                    }
                    break;
                case "500":
                    {
                        if (thanhTien < 500) {
                            return item;
                        }
                    }
                    break;
            }
        });
        setData(dataFilter);
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
                    <option value="50">Dưới 50.000vnđ</option>
                    <option value="100">Dưới 100.000vnđ</option>
                    <option value="500">Dưới 500.000vnđ</option>
                </select>
                <label for="toatal">Tổng tiền :</label>
                <select
                    name="total"
                    id="total"
                    onChange={(e) => handlemoney(e.target.value)}
                >
                    <option value=""> -- Chọn -- </option>
                    <option value="50">Dưới 50.000vnđ</option>
                    <option value="100">Dưới 100.000vnđ</option>
                    <option value="500">Dưới 500.000vnđ</option>
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
                            <th>Số thứ tự</th>
                            <th>Mã ô đỗ</th>
                            <th>Họ và tên</th>
                            <th>Biển số xe</th>
                            <th>Số điện thoại</th>
                            <th>Loại xe</th>
                            <th>Ngày bắt đầu</th>
                            <th>Ngày kết thúc</th>
                            <th>Ngày kết thúc thực</th>

                            <th>Trạng thái</th>
                            <th>Thành tiền</th>
                        </tr>
                    </thead>

                    {data?.map((item, index) => {
                        const endDateReal = new Date(item?.thoigiankethucthuc).getTime();
                        const endDate = new Date(item?.thoigianketthuc).getTime();
                        const dateNo = (endDateReal - endDate) / 3600 / 1000;
                        const thanhTien = dateNo * 15;
                        console.log(dateNo);
                        return (
                            <tbody key={index}>
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{item?.tenodo}</td>
                                    <td>{item?.hoten}</td>
                                    <td>{item?.biensoxe}</td>
                                    <td>{item?.sodienthoai}</td>
                                    <td>{item?.loaixe}</td>
                                    <td>{item?.thoigianbatdau}</td>
                                    <td>{item?.thoigianketthuc}</td>
                                    <td>{item?.thoigiankethucthuc}</td>
                                    <td>{item?.trangthai}</td>
                                    <td>{`${thanhTien.toLocaleString()} VNĐ`}</td>
                                </tr>
                            </tbody>
                        );
                    })}
                </table>
            </div>
        </div>
    );
>>>>>>> main
}
export default StatisticalMonth;
