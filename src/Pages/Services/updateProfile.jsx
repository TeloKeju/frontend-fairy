import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import errorMessage from "../../Component/errorMessage";
import axios from "axios";
import fairyApi from "../../lib/axios";
import { getCookies } from "cookies-next";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNewAccessToken } from "../../lib/redux/api/auth";
import { getUserById } from "../../lib/redux/api/users";
import UserLayout from "./Component/userLayout";

const schema = Yup.object().shape({
  nama: Yup.string()
    .required("Nama harus diisi")
    .min(3, "Nama harus memiliki minimal 3 karakter")
    .max(50, "Nama tidak boleh lebih dari 50 karakter"),
  email: Yup.string().email("Email tidak valid").required("Email harus diisi"),
  kelas: Yup.string().matches(
    /^\d+[A-Z]?$/,
    "Kelas harus berupa angka, dan bisa diikuti oleh huruf besar (opsional)"
  ),
  sekolah: Yup.string()
    .min(3, "Nama sekolah harus memiliki minimal 3 karakter")
    .max(100, "Nama sekolah tidak boleh lebih dari 100 karakter"),
});

// const result = await axios.post(
//     "http://localhost:5000/api/users",
//     { nama, email, password },
//     {
//       headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//     }
//   );

const submit = async (values, token, Navigate) => {
  try {
    // api/profile/update
    const p = await axios.post(
      `http://localhost:5000/api/profile/update/${token}`,
      values
    );
    if (p.status == 200) {
      Navigate("/profile");
    }
  } catch (error) {
    console.log(error.message);
  }
};
const updateProfile = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const userID = getCookies("userID");
  const { user: data } = useSelector((state) => state.user);

  useEffect(() => {
    const getProfile = async () => {
      const result = await dispatch(getUserById(userID));
      if (result.error) {
        if (result.error.message === "401") {
          console.log("get new access token");
          await dispatch(getNewAccessToken());
          return getProfile();
        }
      }
    };
    getProfile();
  }, []);

  return (
    <UserLayout>
      <section className="row justify-content-center pt-2 pt-md-5 p-3 p-md-0 login">
        <section className="col-lg-5">
          <h2 className="text-blue mt-4 mt-md-0">Update Profil</h2>
          <section className="card mt-2 shadow">
            <section className="card-body p-4">
              <Formik
                enableReinitialize
                initialValues={{
                  nama: data.nama || "",
                  username: data.username || "",
                  email: data.email || "",
                  kelas: data.kelas || "",
                  sekolah: data.sekolah || "",
                }}
                validationSchema={schema}
                validateOnChange={false}
                validateOnBlur={false}
                onSubmit={(values, { setSubmitting, errors }) => {
                  submit(values, token, Navigate);
                }}
              >
                <Form>
                  <section className="form-group">
                    <label className="form-label fw-bold">Nama</label>
                    <Field
                      type="text"
                      name="nama"
                      className="form-control"
                      placeholder="Masukan nama"
                    />
                    <ErrorMessage name="nama" render={errorMessage} />
                  </section>
                  <section className="form-group my-4">
                    <label className="form-label fw-bold float-start">
                      Username
                    </label>
                    <section className="input-group">
                      <Field
                        name="username"
                        type="text"
                        className="form-control"
                        placeholder="Masukan username"
                      />
                    </section>
                    <ErrorMessage name="username" render={errorMessage} />
                  </section>
                  <section className="form-group my-4">
                    <label className="form-label fw-bold float-start">
                      Email
                    </label>
                    <section className="input-group">
                      <Field
                        name="email"
                        type="text"
                        className="form-control"
                        placeholder="Masukan email"
                      />
                    </section>
                    <ErrorMessage name="email" renders={errorMessage} />
                  </section>
                  {data.role == "siswa" ? (
                    <>
                      <section className="form-group my-4">
                        <label className="form-label fw-bold float-start">
                          Kelas
                        </label>
                        <section className="input-group">
                          <Field
                            name="kelas"
                            type="text"
                            className="form-control"
                            placeholder="Masukan kelas"
                          />
                        </section>
                        <ErrorMessage name="kelas" renders={errorMessage} />
                      </section>
                      <section className="form-group my-4">
                        <label className="form-label fw-bold float-start">
                          Sekolah
                        </label>
                        <section className="input-group">
                          <Field
                            name="sekolah"
                            type="text"
                            className="form-control"
                            placeholder="Masukan nama sekolah"
                          />
                        </section>
                        <ErrorMessage name="sekolah" renders={errorMessage} />
                      </section>
                    </>
                  ) : (
                    ""
                  )}
                  <section className="form-group d-grid gap-2 mt-3">
                    <button
                      type="submit"
                      className="btn btn-orange py-2 text-white"
                    >
                      Submit
                    </button>
                  </section>
                </Form>
              </Formik>
            </section>
          </section>
        </section>
      </section>
    </UserLayout>
  );
};

export default updateProfile;
