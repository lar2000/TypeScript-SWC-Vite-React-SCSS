import React, { useEffect, useContext, useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { AppSettings } from "./../../config/app-settings";
import Pagination from "./../../utils/pagination";
import FormModal from "./currencyForm";
import { InputGroup, Input, Loader, Placeholder } from "rsuite";
// ----------------- Types -----------------
interface CurrencyItem {
  id?: number | string;
  name: string;
  currency_name_la: string;
  currency_name_en: string;
  rate_currency: string;
}

// ----------------- Component -----------------
function Currency(): React.ReactElement {
  const context = useContext(AppSettings);
  const navigate = useNavigate();

  const [isLoading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [length, setLength] = useState<number>(30); // items per page
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [getData, setData] = useState<CurrencyItem>();
  const [response, setResponse] = useState<CurrencyItem | null>(null)

  const [open, setOpen] = useState<boolean>(false);

  const handleTableHeight = (): void => {
    const table = document.getElementById("table");
    if (table) {
      const targetHeight =
        window.innerHeight - table.getBoundingClientRect().top;
      table.style.height = targetHeight + "px";
    }
  };

  useEffect(() => {
    context?.handleSetAppContentFullHeight(true);
    context?.handleSetAppContentClass(" p-0 bg-component");
    handleTableHeight();

    return () => {
      context?.handleSetAppContentFullHeight(false);
      context?.handleSetAppContentClass("");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setLoading(true); // start loading

    const timer = setTimeout(() => {
      setLoading(false); // stop loading after 1.5s
    }, 1500);

    // cleanup on unmount
    return () => clearTimeout(timer);
  }, [response]);

  // Mock data
  const mockData: CurrencyItem[] = Array.from({ length: 4 }, (_, i) => ({
    id: i + 1,
    name: `LAK, USD, THB, CNY`,
    currency_name_la: `ກີບ, ໂດລາ, ບາດ, ຢວນ`,
    currency_name_en: `K, $, B, Y`,
    rate_currency: `120` + i,
  }));

  const handleAdd = () => {
    setData(undefined);
    setOpen(true)
  };

  const handleEdit = (item: CurrencyItem): void => {
    setData(item);
    setOpen(true);
  };

  const handleDelete = (id: number | string | undefined): void => {
    console.log(id);
  };

  const filteredData = mockData.filter( (item) =>
      item.currency_name_la.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.currency_name_en.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startIndex = (currentPage - 1) * length;
  const endIndex = startIndex + length;
  const currentData = filteredData.slice(startIndex, endIndex);

  return (
    <div className="h-100 py-0 my-0">
       <ol className="breadcrumb float-sm-end mt-lg-2 me-lg-4">
        <li className="breadcrumb-item">
          <Link to={"/dashboard/v1"}>Home</Link>
        </li>
        <li className="breadcrumb-item text-blue">
          Table Currency List
        </li>
        <li className="breadcrumb-item">
          <a href="#" className="text-green" onClick={handleAdd}>
            <i className="fas fa-circle-plus me-1"></i>ເພີ່ມຂໍ້ມູນ
          </a>
        </li>
      </ol>
      <h1 className="page-header pt-lg-3 mb-0">ລາຍການອັດຕາແລກປ່ຽນ</h1>
      <div className=" row w-100">
        <div className="col-lg-8 col-sm-4 d-sm-flex d-none align-items-center">
          <button onClick={() => navigate(-1)} className="btn btn-danger btn-icon btn-md">
            <i className="fa fa-arrow-left"></i>
          </button>
        </div>
        <div className="col-lg-4 col-sm-8 mb-2">
          <InputGroup className="border">
            <Input className="fw-medium" placeholder="ຄົ້ນຫາອັດຕາແລກປ່ຽນ..."
              value={searchTerm}
              onChange={(value: string) => setSearchTerm(value)}
            />
            <InputGroup.Button>
              <i className="fa fa-search fa-lg"></i>
            </InputGroup.Button>
          </InputGroup>
        </div>
      </div>
      <div className="panel shadow-lg rounded-2">
        <div className="table-responsive mx-1 mt-2" id="table">
          <table
            className="table table-thead-sticky table-tfoot-sticky table-bordered mb-0
             align-middle table-px-10px table-py-6px table-hover table-sm table-striped text-nowrap fs-5"
          >
            <thead>
              <tr className=" fw-normal">
                <th className="text-center w-10px">ລຳດັບ</th>
                <th>ຊື່ທາງການ</th>
                <th>ສະກຸນເງິນ(ອັງກິດ)/(ລາວ)</th>
                <th>ອັດຕາແລກປ່ຽນ</th>
                <th className="text-center w-100px">ຈັດການ</th>
              </tr>
            </thead>
            {isLoading ? (
              <tr>
                <td colSpan={4}>
                  <Placeholder.Grid
                    active
                    rows={15}
                    columns={3}
                    className="my-4"
                  />
                  <Loader center size="lg" content="loading" />
                </td>
              </tr>
            ) : (
              <>
                <tbody>
                  {currentData.map((item, index) => (
                    <tr key={item.id} className=" fw-bold">
                      <td className="text-end">{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.currency_name_en}/{item.currency_name_la}</td>
                      <td className="text-end">{item.rate_currency} K</td>
                      <td className="text-center">
                        <button className="btn btn-cyan btn-xs px-1 me-1"
                          onClick={() => handleEdit(item)}
                        >
                          <i className="fa fa-pen-to-square fa-fw"></i>
                        </button>
                        <button className="btn btn-danger btn-xs px-1"
                          onClick={() => handleDelete(item.id)}
                        >
                          <i className="fa fa-trash fa-fw"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={5}>
                      <div className="d-lg-flex align-items-center mx-2 my-n2">
                        <div className="d-lg-flex d-none align-items-center text-nowrap">
                          <select
                            value={length}
                            className="form-select form-select-lg h-30px py-0 pe-30px"
                            onChange={(e) => {
                              setLength(Number(e.target.value));
                              setCurrentPage(1);
                            }}
                          >
                            <option value={30}>30</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                          </select>
                        </div>
                        <div className="d-lg-block d-none ms-2 text-body text-opacity-50">
                          {mockData.length} results found
                        </div>
                        <ul className="pagination pagination-sm mb-0 ms-auto justify-content-center">
                          <Pagination
                            total={currentData.length}
                            length={length}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                          />
                        </ul>
                      </div>
                    </td>
                  </tr>
                </tfoot>
              </>
            )}
          </table>
        </div>
      </div>

      {/* ---------------- Modal ---------------- */}
      <FormModal
        open={open}
        setOpen={() => setOpen(false)}
        data={getData}
        response={setResponse}
      />
    </div>
  );
}

export default Currency;