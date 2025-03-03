import React, { useEffect, useState } from "react";
import "../styles/Sesizare.css";
import api from "../api";
import Observatie from "../components/Observatie";
import SwitchComponent from "./SwitchComponent";

function Sesizare({ sesizare }) {
  const [observatii, setObservatii] = useState([]);
  const [open, setOpen] = useState(false);
  const [continut, setContinut] = useState("");
  const [obstext, setObstext] = useState("Vezi Observatii  ⬇");

  const [remediat, setRemediat] = useState(sesizare.remediat);
  const formattedDate = new Date(sesizare.data_emiterii).toLocaleDateString(
    "ro-RO",
    { hour: "2-digit", minute: "2-digit" }
  );

  let scara_inchisa = sesizare.scara_inchisa === true ? "DA" : "NU";

  useEffect(() => {
    getObservatii();
  }, []);

  const handleChange = async ()=>{
    try {
      const response = await api.patch(`api/observatii/${sesizare.id}/`, {
        remediat: remediat // Updates only this field
      });
  
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error updating field:', error);
    }
  }

  const getObservatii = () => {
    api
      .get(`api/observatii/${sesizare.id}/`)
      .then((res) => res.data)
      .then((data) => {
        setObservatii(data.results);
        setContinut("");
       // console.log(data);
      })
      .catch((error) => alert(error));
  };

  const createObservatie = (e) => {
    e.preventDefault();
    const concatenatedText = `${localStorage.getItem(
      "user"
    )} a scris: ${continut}`;
    api
      .post(`api/observatii/${sesizare.id}/`, {
        continut: concatenatedText,
        sesizare,
      })
      .then((res) => {
        if (res.status === 201) {
          console.log("Observatie creata");
        } else {
          alert("Observatia nu a fost creata");
        }
        getObservatii();
      })
      .catch((error) => console.log(error));
  };

  const handleObservatie = () => {
    setOpen(!open);
    setObstext(open === true ? "Vezi Observatii ⬇" : "Inchide observatiile ⬆");
  };

  return (
    <div className="divTableRow">
      <div className="divTableCell">{sesizare.id}</div>
      <div className="divTableCell">{sesizare.sector}</div>
      <div className="divTableCell">{sesizare.emitent}</div>
      <div className="divTableCell">{formattedDate}</div>
      <div className="divTableCell">{sesizare.author_name}</div>
      <div className="divTableCell">{sesizare.comunicat_la}</div>
      <div className="divTableCell">{sesizare.punct_termic}</div>
      <div className="divTableCell">{sesizare.adresa}</div>
      <div className="divTableCell">{sesizare.acm_inc}</div>
      <div className="divTableCell">{sesizare.localizare}</div>
      <div className="divTableCell">{sesizare.distributie_transport}</div>
      <div className="divTableCell">{scara_inchisa}</div>
      <div className="divTableCell celula-observatii">
        <button className="collapsible" onClick={handleObservatie}>
          {obstext}
        </button>
        <div className={`content-parent ${open ? "content-show" : ""}`}>
        {open && (
          
          <div>
            {observatii.map((observatie) => (
              <Observatie observatie={observatie} key={observatie.id} />
            ))}

            <div className="form-observatie">
              <form onSubmit={createObservatie}>
                <textarea
                  id="continut"
                  name="continut"
                  required
                  value={continut}
                  cols="64"
                  rows="3"
                  onChange={(e) => setContinut(e.target.value)}
                ></textarea>
                <br />
                <input type="submit" value="Adauga Observatie"></input>
              </form>
            </div>
          </div>
        )}
        </div>
      </div>
      <div className="divTableCell">
        <SwitchComponent
          sesizare={sesizare}
          setRemediat={setRemediat}
        />
      </div>
      <div className="divTableCell">
              {sesizare.cine_inchide_defectiunea_name || "In lucru"}
              </div>
    </div>
  );
}

export default Sesizare;
