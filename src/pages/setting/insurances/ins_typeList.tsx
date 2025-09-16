import React, { useEffect, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppSettings } from "../../../config/app-settings";
import Pagination from "../../../utils/pagination";
import FormModal from "./ins-Form/ins_Form";
import { InputGroup, Input, Loader, Placeholder } from "rsuite";
// ----------------- Types -----------------
interface InsTypeItems {
  id?: number | string;
  ins_type_name_la: string;
  ins_type_name_en: string;
  ins_status: string;
  optionsIndex?: number;
}

// ----------------- Component -----------------
function CarType(): React.ReactElement {
  const context = useContext(AppSettings);
  const navigate = useNavigate();

  const [isLoading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [length, setLength] = useState<number>(30); // items per page
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [inputs, setInputs] = useState<InsTypeItems>({
    id: "",
    ins_type_name_la: "",
    ins_type_name_en: "",
    ins_status: "",
  });

  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);

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
  }, []);

  // Mock data
  const mockData: InsTypeItems[] = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    ins_type_name_la: `ປະເພດປະກັນ ${i + 1}`,
    ins_type_name_en: `Insurance_name ${i + 1}`,
    ins_status: "Normal or carIns",
    optionsIndex: Math.floor(Math.random() * 12) + 1,
  }));

  const handleOption = (id: number | string | undefined): void => {
    if (!id) return;
    navigate(`/setting/option/${id}`, { state: { id } });
  };
  const handleEdit = (item: InsTypeItems): void => {
    setInputs({ ...item });
    handleOpen();
  };
  const handleDelete = (id: number | string | undefined): void => {
    console.log(id);
  };

  const filteredData = mockData.filter(
    (item) =>
      item.ins_type_name_la.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.ins_type_name_en.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.ins_status.toLowerCase().includes(searchTerm.toLowerCase())
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
          Table Inssurances type List
        </li>
        <li className="breadcrumb-item">
          <a href="#" className="text-green" onClick={handleOpen}>
            <i className="fas fa-circle-plus me-1"></i>ເພີ່ມຂໍ້ມູນ
          </a>
        </li>
      </ol>
      <h1 className="page-header pt-lg-3 mb-0">ປະເພດປະກັນ</h1>
      <div className=" row w-100">
        <div className="col-lg-8 col-sm-4 d-sm-flex d-none align-items-center">
          <button onClick={() => navigate(-1)} className="btn btn-danger btn-icon btn-md">
            <i className="fa fa-arrow-left"></i>
          </button>
        </div>
        <div className="col-lg-4 col-sm-8 mb-2">
          <InputGroup className="border">
            <Input className="fw-medium" placeholder="ຄົ້ນຫາປະເພດປະກັນ..."
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
                <th>ປະເພດປະກັນ(ລາວ)</th>
                <th>ປະເພດປະກັນ(ອັງກິດ)</th>
                <th>ສະຖານະ</th>
                <th>ທາງເລຶອກ</th>
                <th className="text-center w-100px">ຈັດການ</th>
              </tr>
            </thead>
            {isLoading ? (
              <tr>
                <td colSpan={6}>
                  <Placeholder.Grid active rows={15} columns={6} className="my-4"
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
                      <td>{item.ins_type_name_la}</td>
                      <td>{item.ins_type_name_en}</td>
                      <td>{item.ins_status}</td>
                      <td className="fs-5">
                        <span className="btn btn-primary btn-xs w-30px me-3">
                          {item.optionsIndex}
                        </span>
                        <span className="">
                          <button
                            type="button"
                            className="btn btn-success btn-xs fw-medium"
                            onClick={() => handleOption(item.id)}
                          >
                            <i className="fas fa-angles-right me-2"></i>
                            ເພີ່ມທາງເລຶອກ
                          </button>
                        </span>
                      </td>
                      <td className="text-center">
                        <button
                          className="btn btn-cyan btn-xs px-1 me-1"
                          onClick={() => handleEdit(item)}
                        >
                          <i className="fa fa-pen-to-square fa-fw"></i>
                        </button>
                        <button
                          className="btn btn-danger btn-xs px-1"
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
                    <td colSpan={6}>
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
        setOpen={setOpen}
        inputs={inputs}
        setInputs={setInputs}
      />
    </div>
  );
}

export default CarType;
