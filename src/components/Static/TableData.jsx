import classNames from "classnames/bind";
import "./Statistical.scss";
import { useCallback, useState } from "react";
import {
  useTable,
  usePagination,
  useGlobalFilter,
  useSortBy,
  useColumnOrder,
} from "react-table/dist/react-table.development";
import { GlobalFilter } from "./GlobalFilter.jsx";

const renderDataTable = (cell, header) => {
  switch (header) {
    case "hoten":
    case "tenodo":
    case "sodienthoai":
    case "biensoxe":
    case "thoigianbatdau":
    case "thoigianketthuc":
    case "thoigiankethucthuc":
    case "loaixe":
    case "STT":
    case "":
      return <div dangerouslySetInnerHTML={{ __html: cell.value }} />;
    default:
      return <span>{cell.render("Cell")}</span>;
  }
};

const InfoTable = ({ columns, data }) => {
  console.log(data);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    pageCount,
    state,
    setPageSize,
    setGlobalFilter,
    setColumnOrder,
    rows,
  } = useTable(
    { columns, data, initialState: { pageIndex: 0 } },

    useGlobalFilter,
    useColumnOrder,
    useSortBy,
    usePagination
  );
  console.log(state);
  const { pageIndex, PageSize } = state;
  const { globalFilter } = state;
  const memoizedRenderDataTable = useCallback(renderDataTable, [columns, data]);

  return (
    <>
      <div>
        <div>
          <div class="search">
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
          </div>
          <table {...getTableProps()} cellSpacing="0">
            <thead>
              {headerGroups.map((headerGroup, index) => (
                <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps)}
                      key={column.id}
                    >
                      {column.render("Header")}
                      <span>
                        {column.isSorted ? (column.isSortedDesc ? "" : "") : ""}
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} key={row.id}>
                    {row.cells.map((cell) => {
                      return (
                        <td
                          {...cell.getCellProps()}
                          key={cell.column.id}
                          className="table-data text-center p-0"
                        >
                          <div>
                            {memoizedRenderDataTable(cell, cell.column.id)}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div class="gotoPage">
            <div className="gotoPage_item">
              <span id="page_number">
                page{""}
                <strong>
                  {pageIndex + 1}of{pageOptions.length}
                </strong>
                {""}
              </span>
              <span id="page_goto">
                | Go to page : {""}
                <input
                  type="number"
                  defaultValue={pageIndex + 1}
                  onChange={(e) => {
                    const pageNumber = e.target.value
                      ? Number(e.target.value) - 1
                      : 0;
                    gotoPage(pageNumber);
                  }}
                  style={{ width: "50px" }}
                />
              </span>
              <select
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                }}
              >
                {[10, 20, 30, 50].map((pageSize) => (
                  <option value={pageSize} key={pageSize}>
                    show {pageSize}
                  </option>
                ))}
              </select>

              <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                {"<<<"}
              </button>

              <button
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                Previous
              </button>
              <button onClick={() => nextPage()} disabled={!canNextPage}>
                Next
              </button>
              <button
                onClick={() => gotoPage(pageCount - 1)}
                disabled={!canNextPage}
              >
                {">>>"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InfoTable;
