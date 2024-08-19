import { useDispatch, useSelector } from "react-redux";
import AdminLayout from "../../adminLayout";
import { useEffect, useState } from "react";
import {
  deleteSoalPilgan,
  getSoalPilgan,
} from "../../../../lib/redux/api/soalPilgan";
import Loading from "../../../../Component/loading";
import ModalPilihanGanda from "./modal";
import { ArrowLeft } from "../../forumQuiz/forumDetail";
import { Link } from "react-router-dom";

const PilihanGanda = () => {
  const tableHead = [
    "No",
    "Soal",
    "Judul Dongeng",
    "Opsi 1",
    "Opsi 2",
    "Opsi 3",
    "Opsi 4",
    "Jawaban",
    "",
  ];

  const [action, setAction] = useState();
  const [idEdit , setIdEdit] = useState();

  const dispatch = useDispatch();
  const { soalPilgan, isLoading } = useSelector(
    (state) => state.soalPilihanGanda
  );

  useEffect(() => {
    dispatch(getSoalPilgan());
  }, []);

  return (
    <AdminLayout>
      {isLoading ? (
        <section className="d-flex justify-content-center align-items-center h-100">
          <Loading />
        </section>
      ) : (
        <div className="container">
          <div className="d-flex justify-content-between align-items-center p-0">
            <Link
              to={"/admin/bank-soal"}
              className={
                "d-flex align-items-center  gap-2 text-decoration-none fs-5 text-black "
              }
            >
              <ArrowLeft size={24} /> Bank Soal List
            </Link>
          </div>
          <hr className="my-3" />
          <div className="row mb-3">
            <div className="input-group col">
              <input
                type="text"
                className="form-control"
                placeholder="Search...."
                aria-label="Search"
                aria-describedby="button-addon2"
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                id="Search"
              >
                Search
              </button>
            </div>
            <div className="col d-flex justify-content-end">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  document.getElementById("showModalAddSoalPilgan").click();
                  setAction("add");
                }}
              >
                Add
              </button>
            </div>
          </div>
          <section className="card-body p-0">
            <section className="table-responsive">
              <table className="table table-striped m-0 ">
                <thead>
                  <tr>
                    {tableHead.map((item, i) => (
                      <th key={i}>{item}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {soalPilgan.map((item, i) => (
                    <tr key={i}>
                      <td>{i+1}</td>
                      <td>{item.soal || ""}</td>
                      <td>{item.dongeng.title || ""}</td>
                      <td>{item.opsi_1 || ""}</td>
                      <td>{item.opsi_2 || ""}</td>
                      <td>{item.opsi_3 || ""}</td>
                      <td>{item.opsi_4 || ""}</td>
                      <td>{item.jawaban || ""}</td>
                      <td className="d-flex gap-2">
                        <button
                          type="button"
                          className="btn btn-secondary "
                          onClick={() => {
                            document
                              .getElementById("showModalAddSoalPilgan")
                              .click();
                            setIdEdit(item.id);
                            setAction("edit");
                          }}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="btn btn-secondary "
                          onClick={() => {
                            if (window.confirm("Are you sure?")) {
                              dispatch(deleteSoalPilgan(item.id));
                            }
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </section>
        </div>
      )}
      <ModalPilihanGanda action={action} id={idEdit}/>
    </AdminLayout>
  );
};

export default PilihanGanda;
