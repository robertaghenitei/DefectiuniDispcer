import React, { useState, useEffect, useCallback  } from "react";
import api from "../api";
import "../styles/Home.css";
import Sesizare from "../components/Sesizare";
import Weather from "../components/Weather";
import Adresa from "../components/Adresa";


function Home() {
  const [sesizari, setSesizari] = useState([]);
  const [sector, setSector] = useState("1 Iftime");
  const [emitent, setEmitent] = useState("");
  const [comunicat_la, setComunicat_la] = useState("Maistru");
  const [punct_termic, setPunct_termic] = useState("Armonia");
  const [adresa, setAdresa] = useState("");
  const [acm_inc, setAcm_inc] = useState("INC");
  const [localizare, setLocalizare] = useState("Subsol");
  const [distributie_transport, setDistributie_transport] =
    useState("Distributie");
  const [scara_inchisa, setScara_inchisa] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [totalPages, setTotalPages] = useState(1); // Track total number of pages
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getSesizari(currentPage);
  }, [currentPage]);

  const getSesizari = (page) => {
    setLoading(true);
    api
      .get(`/api/sesizari/?page=${page}`)
      .then((res) => res.data)
      .then((data) => {
        setSesizari(data.results);
     //   console.log(data.results);
        setTotalPages(Math.ceil(data.count / data.results.length));
      //  console.log(data.next);
      })
      .catch((error) => alert(error))
      .finally(() => {
        setLoading(false);
      });
  };



  const createSesizare = (e) => {
    e.preventDefault();
    api
      .post("/api/sesizari/", {
        sector,
        emitent,
        comunicat_la,
        punct_termic,
        adresa,
        acm_inc,
        localizare,
        distributie_transport,
        scara_inchisa,
      })
      .then((res) => {
        if (res.status === 201) {
          alert("Sesizarea a fost creata!");
        } else {
          alert("Sesizarea nu a putut fi creata!");
        }
        getSesizari(1);
      })
      .catch((error) => console.log(error));
  };

  const pagesToDisplay = [];
  const pageStart = Math.max(1, currentPage - 1); // Show 1 page before and after the current page
  const pageEnd = Math.min(totalPages, currentPage + 1); // Ensure we don't go beyond the total pages

  for (let i = pageStart; i <= pageEnd; i++) {
    pagesToDisplay.push(i);
  }

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="dispecerat">
      <div className="vremea">
        <Weather />
      </div>
      <br />
      <h1>Utilizatorul logat e {localStorage.getItem("user")}</h1>
      <div>
        <h2>Sesizari</h2>
        <div className="divTable blueTable">
          <div className="divTableHeading">
            <div className="divTableRow">
              <div className="divTableHead">Nr.</div>
              <div className="divTableHead">Sector</div>
              <div className="divTableHead">Cine anunta</div>
              <div className="divTableHead">Data</div>
              <div className="divTableHead">Dispecer</div>
              <div className="divTableHead">Comunicat La</div>
              <div className="divTableHead">Punct Termic</div>
              <div className="divTableHead">Adresa</div>
              <div className="divTableHead">Serviciul</div>
              <div className="divTableHead">Localizare</div>
              <div className="divTableHead">Dist/Trans</div>
              <div className="divTableHead">Scara Inchisa?</div>
              <div className="divTableHead">Observatii</div>
              <div className="divTableHead">Remediat</div>
              <div className="divTableHead">Cine a inchis</div>
            </div>
          </div>
          <div className="divTableBody">
            {sesizari.map((sesizare) => (
              <Sesizare
                sesizare={sesizare}
                key={sesizare.id}
              />
            ))}
          </div>
        </div>
        <div className="blueTable outerTableFooter">
          <div className="tableFootStyle">
            <div className="links">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(currentPage - 1);
                }}
              >
                &laquo;
              </a>

              {pagesToDisplay.map((page) => (
                <React.Fragment key={page}>
                  {currentPage === page && " "}
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(page); // Set the clicked page number
                    }}
                    className={currentPage === page ? "active" : ""}
                  >
                    {page}
                  </a>
                  {currentPage === page && " "}
                </React.Fragment>
              ))}

              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(currentPage + 1);
                }}
              >
                &raquo;
              </a>
            </div>
          </div>
        </div>
      </div>
      <div>
        <span>
          Page {currentPage} of {totalPages}
        </span>
      </div>
      <h2>Adauga o sesizare</h2>
      <form onSubmit={createSesizare}>
        <label htmlFor="sector">Sector</label>
        <select
          id="sector"
          name="sector"
          onChange={(e) => setSector(e.target.value)}
          value={sector}
        >
          <option>1 Iftime</option>
          <option>2 Scutaru</option>
        </select>
        <br />
        <label htmlFor="emitent">Emitent</label>
        <input
          type="text"
          id="emitent"
          name="emitent"
          required
          onChange={(e) => setEmitent(e.target.value)}
          value={emitent}
        ></input>
        <br />
        <label htmlFor="comunicat_la">Comunicat_la</label>
        <select
          id="comunicat_la"
          name="comunicat_la"
          onChange={(e) => setComunicat_la(e.target.value)}
          value={comunicat_la}
        >
          <option>Maistru</option>
          <option>Sef Formatie</option>
          <option>Sef Sectie</option>
        </select>
        <br />
       <Adresa setAdresa={setAdresa} setPunct_termic={setPunct_termic}/>
        <br />
        <label htmlFor="acm_inc">ACM sau INC</label>
        <select
          id="acm_inc"
          name="acm_inc"
          onChange={(e) => setAcm_inc(e.target.value)}
          value={acm_inc}
        >
          <option>INC</option>
          <option>ACM</option>
        </select>
        <br />
        <label htmlFor="localizare">Localizare</label>
        <select
          id="localizare"
          name="localizare"
          onChange={(e) => setLocalizare(e.target.value)}
          value={localizare}
        >
          <option>In afara blocului</option>
          <option>Subsol</option>
          <option>Casa_Scarii</option>
          <option>Apartament</option>
        </select>
        <br />
        <label htmlFor="distributie_transport">Distributie sau Transport</label>
        <select
          id="distributie_transport"
          name="distributie_transport"
          onChange={(e) => setDistributie_transport(e.target.value)}
          value={distributie_transport}
        >
          <option>Distributie</option>
          <option>Transport</option>
        </select>
        <br />
        <label htmlFor="scara_inchisa">Scara Inchisa</label>
        <select
          id="scara_inchisa"
          name="scara_inchisa"
          onChange={(e) =>
            setScara_inchisa(e.target.value === "DA" ? true : false)
          }
          value={scara_inchisa}
        >
          <option>DA</option>
          <option>Nu</option>
        </select>
        <br />
        <input type="submit" value="Submit"></input>
      </form>
    </div>
  );
}

export default Home;
