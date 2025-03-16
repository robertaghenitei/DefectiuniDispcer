import React, { useEffect, useState, useMemo } from "react";
import Select from "react-select";
import Sesizare from "../components/Sesizare";
import api from "../api";
import  "../styles/SelectAdresa.css"
import { Link } from "react-router-dom";

function SelectAdresa() {
 
  const [adrese, setAdrese] = useState([]);
  const [selectedAdresa, setSelectedAdresa] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sesizariAdresa, setSesizariAdresa] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    api.get("/api/sesizari/")
      .then((res) => {
        const uniqueAdrese = [...new Set(res.data.results.map((s) => s.adresa))];
        setAdrese(uniqueAdrese);
      })
      .catch((err) => {
        console.error("Error fetching addresses:", err);
        setError("Failed to load addresses. Please try again.");
      })
      .finally(() => setLoading(false));
  }, []);

  const adreseOptions = useMemo(
    () => adrese.map((adr) => ({ value: adr, label: adr })),
    [adrese]
  );

  const handleSelect = () => {
    if (selectedAdresa) {
      api.get(`/api/sesizari/${selectedAdresa.value}`)
      .then((res)=>res.data)
      .then((data)=>{
        setSesizariAdresa(data.results)
      })
      .catch((error) => alert(error))
      }
      
    }
  
    const pagesToDisplay = [];
    if (totalPages <= 3) {
      for (let i = 1; i <= totalPages; i++) {
        pagesToDisplay.push(i);
      }
    } else {
      const pageStart = Math.max(1, currentPage - 1);
      const pageEnd = Math.min(totalPages, currentPage + 1);
  
      for (let i = pageStart; i <= pageEnd; i++) {
        if (i >= 1 && i <= totalPages) {
          pagesToDisplay.push(i);
        }
      }
    }
  
    const handlePageChange = (page) => {
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
      }
    };
  
 


  return (
    <div>
      <div>
      <br></br>
      <Link to="/" className="select-adresa-link">
        Mergi la pagina principala
      </Link>
      </div>
    <div className="container-cauta-adresa">
      <div className="card-select-adresa">
        <h2>Selectează adresa</h2>
        <p>Alege o adresă pentru a vedea istoricul defecțiunilor.</p>

        {loading ? (
          <p className="loading">Se încarcă adresele...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : (
          <>
            <Select
              options={adreseOptions}
              isClearable
              placeholder="Caută adresa..."
              value={selectedAdresa}
              onChange={setSelectedAdresa}
              className="select-box"
            />
            <button
              onClick={handleSelect}
              disabled={!selectedAdresa || loading}
              className={`button ${selectedAdresa ? "active" : "disabled"}`}
            >
              Vezi sesizarile la adresa selectata
            </button>
          </>
        )}
      </div>
    </div>
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
            {sesizariAdresa.map((sesizare) => (
              <Sesizare sesizare={sesizare} key={sesizare.id} />
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
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(page);
                    }}
                    className={currentPage === page ? "active" : ""}
                  >
                    {page}
                  </a>
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
    </div>
  );
}

export default SelectAdresa;
