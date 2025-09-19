// src/pages/email/Commisions.tsx
import React, { useEffect, useContext, useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { InputGroup, Input, SelectPicker, Loader, Placeholder } from "rsuite";
import { AppSettings } from "../../config/app-settings";
import Pagination from "../../utils/pagination";

interface OacItem {
  id?: string | number;
  com_name: string;
  insType: string;
  percent_sale: string;
}

function Commisions(): React.ReactElement {
  const context = useContext(AppSettings);
  const [isMobileEmailNavOn, setIsMobileEmailNavOn] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isLoading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [length, setLength] = useState<number>(30); // items per page
  const [searchTerm, setSearchTerm] = useState<string>("");

  const navItems = [
    "ຄ່າຄອມມິດຊັນຮັບບໍລິສັດໂອເອຊີ",
    "ຄ່າຄອມມິດຊັນຈ່າຍຕົວແທນຂາຍ",
  ];

  useEffect(() => {
    context?.handleSetAppContentFullHeight(true);
    context?.handleSetAppContentClass("p-0 bg-component");

    return () => {
      context?.handleSetAppContentFullHeight(false);
      context?.handleSetAppContentClass("");
    };
  }, [context]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500)
  }, [])

  const mockData01: OacItem[] = Array.from({ length: 550 }, (_, i) => ({
    id: i + 1,
    com_name: "ບໍລິສັດປະກັນໄພ-01 " + i,
    insType: `ປະກັນໄພ-01 ` + (i + 1),
    percent_sale: "10%",
  }));

  const mockData02: OacItem[] = Array.from({ length: 550 }, (_, i) => ({
    id: i + 1,
    com_name: "ບໍລິສັດປະກັນໄພ-02 " + i,
    insType: `ປະກັນໄພ-02 ` + (i + 1),
    percent_sale: "10%",
  }));

  function toggleMobileEmailNav(): void {
    setIsMobileEmailNavOn(!isMobileEmailNavOn);
  }

  const filteredData = mockData01.filter(
    (item) =>
      item.com_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.insType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startIndex = (currentPage - 1) * length;
  const endIndex = startIndex + length;
  const currentData = filteredData.slice(startIndex, endIndex);

  return (
    <>
      <div className="d-lg-flex justify-content-end my-n3 pb-1">sddassd/sdwed</div>
      <div className="mailbox border mx-n3 mt-3">
        {/* Sidebar */}
        <div className="mailbox-sidebar bg-white">
          <div className="mailbox-sidebar-header d-flex justify-content-center my-n1">
            <button onClick={toggleMobileEmailNav}
              className="btn btn-dark btn-sm me-auto d-block d-lg-none"
            >
              <i className="fa fa-cog"></i>
            </button>
            <button className="btn btn-success btn-sm">Compose</button>
          </div>
          <div className={ "mailbox-sidebar-content collapse d-lg-block " +
              (isMobileEmailNavOn ? "show" : "")
            }
          >
            {/* <PerfectScrollbar className="h-100" options={{ suppressScrollX: true }}> */}
              <div className="nav-title border-bottom fs-5">
                <b>ຄ່າຄອມມິດຊັນ<i className="fa fa-chart-line ms-2"></i></b>
              </div>
              <ul className="nav nav-inbox">
                {navItems.map((label, index) => (
                  <li key={index}>
                    <a onClick={() => setActiveIndex(index)}
                      className={`btn btn-lg border-0 fw-medium fs-5 ${ activeIndex === index
                          ? "bg-blue-400 text-white" : "btn-white"}`} >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="nav-title border-top fw-bold fs-5">ຄົ້ນຫາ</div>
              <ul className="nav nav-inbox">
                <li>
                  <SelectPicker data={[]} block className="rounded-0" appearance="subtle" 
                  placeholder='ເລຶອກບໍລິສັດ'/>
                </li>
                <li>
                  <SelectPicker data={[]} block className="rounded-0" appearance="subtle" 
                  placeholder='ເລຶອກປະເພດປະກັນໄພ'/>
                </li>
              </ul>
            {/* </PerfectScrollbar> */}
          </div>
        </div>

        {/* Content */}
        <div className="mailbox-content">
          <div className="mailbox-content-header bg-white">
            <div className="btn-toolbar row align-items-center justify-content-between px-2 mb-n2">
              <div className="fw-bold fs-3 col-lg-6 mt-n3">ຕັ້ງຄ່າ ຄ່າຄອມມິດຊັນຂາຍປະກັນໄພ</div>
              <div className="col-lg-6">
               <InputGroup className="border">
                <Input className="fw-medium" placeholder="ຄົ້ນຫາ..." value={searchTerm}
                  onChange={(value: string) => setSearchTerm(value)}
                />
                <InputGroup.Button>
                  <i className="fa fa-search fa-lg"></i>
                </InputGroup.Button>
              </InputGroup>
              </div>
            </div>
          </div>
          <div className="mailbox-content-body">
            <PerfectScrollbar className="h-100">
              <table className="table table-bordered table-thead-sticky table-tfoot-sticky table-hover align-middle mb-0">
                <thead>
                  <tr>
                    <th className="text-center w-100px">ລຳດັບ</th>
                    <th>ບໍລິສັດປະກັນໄພ</th>
                    <th>ປະເພດປະກັນ</th>
                    <th className="text-center">ເປີເຊັນຂາຍ</th>
                    <th className="text-center w-100px">ຈັດການ</th>
                  </tr>
                </thead>
                {isLoading ? (
                  <tr>
                    <td colSpan={5}>
                      <Placeholder.Grid active rows={12} columns={6} className="my-4"/>
                      <Loader center size="lg" content="loading" vertical />
                    </td>
                  </tr>
                ) : (
                  <>
                  <tbody>
                    {currentData.length > 0 ? (
                      currentData.map((item, index) => (
                        <tr key={item.id} className="">
                          <td className="text-center">{index + 1}</td>
                          <td className="min-w-200">{item.com_name}</td>
                          <td className="min-w-200">{item.insType}</td>
                          <td className="text-center min-w-100">{item.percent_sale}</td>
                          <td className="text-center min-w-100">
                            <button className="btn btn-cyan btn-xs px-1 me-1">
                              <i className="fa fa-pen-to-square fa-fw"></i>
                            </button>
                            <button className="btn btn-danger btn-xs px-1">
                              <i className="fa fa-trash fa-fw"></i>
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="text-red text-center">
                          ==========================ບໍ່ມີຂໍ້ມູນຕົວແທນ=============================
                        </td>
                      </tr>
                    )}
                  </tbody>
                  <tfoot>
                  <tr>
                    <td colSpan={5}>
                      <div className="mx-2 my-n2">
                        {/* <ul className="pagination pagination-sm mb-0 ms-auto justify-content-center"> */}
                          <Pagination
                            total={filteredData.length}
                            length={length}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                          />
                        {/* </ul> */}
                      </div>
                    </td>
                  </tr>
                </tfoot>
                </>
                )}
              </table>
            </PerfectScrollbar>
          </div>
{/* 
          <div className="border bg-white px-2 h-40px">
            <Pagination
              total={filteredData.length}
              length={length}
              currentPage={currentPage}
               setCurrentPage={setCurrentPage}
            />
          </div> */}
        </div>
      </div>
    </>
  );
}

export default Commisions;
