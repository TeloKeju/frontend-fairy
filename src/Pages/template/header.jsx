import { getCookie } from "cookies-next";
import { LogoutIcon } from "../Admin/adminLayout";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../../lib/redux/api/users";
import { getNewAccessToken, signOut } from "../../lib/redux/api/auth";
import { useEffect } from "react";

const Header = () => {
  const id = getCookie("userID");
  const dispatch = useDispatch();

  async function getDataUser() {
    const res = await dispatch(getUserById(id));
    if (res.error) {
      if (res.error.message === "401") {
        console.log("getting new access token");
        await dispatch(getNewAccessToken());
        return getDataUser();
      }
    }
  }
  async function handleLogout() {
    await dispatch(signOut());
  }

  useEffect(() => {
    if (id) {
      getDataUser();
    }
  }, []);
  const token = getCookie("refreshToken");
  const { user } = useSelector((state) => state.user);

  return (
    <>
      <header className="sticky-top fixed-top">
        <nav className="navbar navbar-expand-lg navbar-dark bg-night">
          <section className="container">
            <a href="/" className="navbar-brand d-flex align-items-center">
              <img
                src="https://buku.kemdikbud.go.id/assets/image/logo-sibi.png"
                height={50}
                alt="Logo"
              />
              <section className="navbar-dark" style={{ fontSize: "0.95rem" }}>
                <section>Sistem Informasi</section>
                <section className="fw-bold">Perbukuan Indonesia</section>
              </section>
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <section className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item mx-1">
                  <a href="/" className="nav-link fw-bold">
                    Beranda
                  </a>
                </li>
                <li className="nav-item dropdown mx-1">
                  <a href="/katalog" className="nav-link" role="button">
                    Katalog Buku
                  </a>
                </li>
                <li className="nav-item dropdown mx-1">
                  <a
                    href="/petunjuk"
                    className="nav-link dropdown-toggle dropdown-mobile"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Petunjuk
                  </a>
                  <ul
                    className="dropdown-menu dropdown-menu-end px-2"
                    aria-labelledby="dropdownCatalogue"
                  >
                    <li>
                      <a href="/petunjuk" className="dropdown-item p-2">
                        <img
                          src="https://buku.kemdikbud.go.id/assets/image/home/Group%2020.png"
                          width={30}
                          alt=""
                        />
                        <span className="ms-2 my-auto">untuk Siswa</span>
                      </a>
                    </li>
                    <li>
                      <a href="/petunjuk" className="dropdown-item p-2">
                        <img
                          src="https://buku.kemdikbud.go.id/assets/image/home/Group%2021.png"
                          width={30}
                          alt=""
                        />
                        <span className="ms-2 my-auto">untuk Guru</span>
                      </a>
                    </li>
                    <li>
                      <a href="/petunjuk" className="dropdown-item p-2">
                        <img
                          src="https://buku.kemdikbud.go.id/assets/image/home/Group%2022.png"
                          width={30}
                          alt=""
                        />
                        <span className="ms-2 my-auto">untuk Orang Tua</span>
                      </a>
                    </li>
                  </ul>
                </li>
                <li className={`nav-item dropdown mx-1 ${token ? "" : "d-none"}`}>
                  <a
                    href="#"
                    className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
                    id="dropdownUser1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img
                      src="https://th.bing.com/th/id/OIP.oVIyTk_GGnAj3YzNXppdpQAAAA?w=189&h=189&c=7&r=0&o=5&pid=1.7"
                      alt="hugenerd"
                      width="40"
                      height="40"
                      className="rounded-circle"
                    />
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end text-small shadow mt-3">
                    <div>
                      <p className="dropdown-item m-0 text-capitalize">
                        {user?.role || "undefined"}
                      </p>
                      <hr className="my-2" />
                    </div>
                    {user.role === "siswa" ? (
                      <li>
                        <a
                          className="dropdown-item d-flex justify-content-between align-items-center"
                          style={{ cursor: "pointer" }}
                        >
                          Profile
                        </a>
                      </li>
                    ) : (
                      ""
                    )}
                    {user.role === "admin" || user.role === "guru" ? (
                      <li>
                        <a
                          className="dropdown-item d-flex justify-content-between align-items-center"
                          style={{ cursor: "pointer" }}
                          href="/admin"
                        >
                          Databases
                        </a>
                      </li>
                    ) : user.role === "siswa" ? (
                      <li>
                        <a
                          className="dropdown-item d-flex justify-content-between align-items-center"
                          style={{ cursor: "pointer" }}
                          href="/quiz"
                        >
                          Quiz
                        </a>
                      </li>
                    ) : null}
                    <li>
                      <a
                        className="dropdown-item d-flex justify-content-between align-items-center"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleLogout()}
                      >
                        Sign out
                        <LogoutIcon />
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
              <ul
                className={`navbar-nav mb-2 mb-lg-0 text-center text-xl-start ${
                  token ? "d-none" : ""
                }`}
              >
                <li className="nav-item ms-3 pt-1">
                  <a href="/login" className="btn btn-sm btn-outline-light">
                    Masuk
                  </a>
                </li>
              </ul>
            </section>
          </section>
        </nav>
      </header>
    </>
  );
};

export default Header;
