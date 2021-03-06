import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useTable } from "react-table";
import Table from "./TableData";
import "./Statistical.scss";
import { compareAsc, format } from "date-fns";
import fi from "date-fns/esm/locale/fi/index.js";

function Statistical() {
  const [data, setData] = useState([]);
  const [isRender, setIsRender] = useState(false);
  const fetchData = async () => {
    const resp = await axios.get(
      "https://parkingmanagement16.herokuapp.com/dangkyvanglai"
    );

    resp?.data?.map((item, index) => {
      const startDate = new Date(item?.thoigianbatdau).getTime();
      const endDate = new Date(item?.thoigianketthuc).getTime();
      const endDateReal = new Date(item?.thoigiankethucthuc).getTime();
      const soGio = (endDate - startDate) / 3600 / 1000;
      const soGioNo = (endDateReal - endDate) / 3600 / 1000;

      item.sogio = soGio.toFixed(1).toLocaleString();
      item.sogiono = soGioNo.toFixed(0).toLocaleString();

      // item.thanhTien = item.thanhTien.toLocaleString() + ` VNĐ`;

      item.thoigianbatdau = format(
        new Date(item?.thoigianbatdau),
        "H:mma dd/MM/yyyy"
      );
      item.thoigianketthuc = format(
        new Date(item?.thoigianketthuc),
        "H:mma dd/MM/yyyy"
      );
      item.thoigiankethucthuc = format(
        new Date(item?.thoigiankethucthuc),
        "H:mma dd/MM/yyyy"
      );
      const getCate = item.loaixe.split(" ")[1];
      var a = 0;
      if (item.sogiono < -10000) {
        a = "";
        item.sogiono = "Chưa lấy xe";
      } else {
        if (getCate === "7") {
          a = item?.sogio * "17000" + item.sogiono * "15000";

          a = "chưa lấy xe";
        } else {
          if (getCate === "5") {
            a = item?.sogio * "15000" + item.sogiono * "15000";
            // a = "chưa lấy xe";
          }
          item.thanhTien = a.toLocaleString() + ` VNĐ`;
        }
      }
      console.log(item?.thanhTien);
      return item?.thanhTien;
    });
    setData(resp.data);
  };

  useEffect(() => {
    fetchData();
  }, []);
  const a = 1;
  console.log(data);

  const columns = React.useMemo(
    () => [
      {
        Header: "Mã ô đỗ",
        accessor: "tenodo",
      },
      {
        Header: "Họ và tên",
        accessor: "hoten", // accessor is the "key" in the data
      },

      {
        Header: "Số điện thoại",
        accessor: "sodienthoai",
      },
      {
        Header: "Biển số xe",
        accessor: "biensoxe",
      },
      {
        Header: "Loại xe",
        accessor: "loaixe",
      },
      {
        Header: "Thời gian bắt đầu",
        accessor: "thoigianbatdau",
      },
      {
        Header: "Thời gian kết thúc",
        accessor: "thoigianketthuc",
      },
      {
        Header: "Thời gian kết thúc thực",
        accessor: "thoigiankethucthuc",
      },
      {
        Header: "Số giờ",
        accessor: "sogio",
      },
      {
        Header: "Số giờ nợ",
        accessor: "sogiono",
      },
      {
        Header: "Thành tiền",
        accessor: "thanhTien",
      },
    ],
    []
  );

  // function handleSortTime2() {
  //   const dataF = data.map((item) => {
  //     const getCate = item.loaixe.split(" ")[1];
  //     var a = 0;
  //     console.log(item.soGio);
  //     if (getCate === "7") {
  //       a = item?.sogio * "17000";
  //     } else {
  //       a = item?.sogio * "15000";
  //     }
  //     item.thanhTien = a.toLocaleString() + ` VNĐ`;
  //     console.log(item?.thanhTien);
  //     return item?.thanhTien;
  //   });
  //   setIsRender(!isRender);
  // }
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
      const getCate = item?.thanhTien.split(" ")[0];
      console.log(getCate);
      switch (filterValue) {
        case "500":
          {
            console.log(123);
            if (getCate < 500) {
              return item;
            }
          }
          break;
        case "1000":
          {
            if (getCate < 1000) {
              return item;
            }
          }
          break;
        case "5000":
          {
            if (getCate < 5000) {
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
    setIsRender(!isRender);
  }

  function handleSortPlace(value) {
    switch (value) {
      case "up":
        data.sort((a, b) => a.tenodo.localeCompare(b.tenodo));
        break;
      case "down":
        data.sort((a, b) => b.tenodo.localeCompare(a.tenodo));
        break;
    }

    setIsRender(!isRender);
  }

  return (
    <div className="wrapper">
      <div className="combobox">
        <label for="typeOfCar" className="label loaixe">
          Loại xe
        </label>
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
        </select>
      </div>

      <Table columns={columns} data={data} />
    </div>
  );
}
export default Statistical;
