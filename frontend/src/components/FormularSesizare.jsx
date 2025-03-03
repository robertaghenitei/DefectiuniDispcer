import "../styles/FormularSesizare.css"

function FormularSesizare(){
    return(
        
<div id="outside">
<form id="survey-form" action="/my-handling-form-page" method="post">
  <h1 id="title">Adauga Sesizare</h1>
  <p id="description"><b>Note:</b> Va rugam sa completati toate detaliile</p>
  
  <fieldset>
   
    <legend>Cine sesizeaza</legend>
    
    <div>
      <label id="name-label" for="name">Nume:</label>
      <input type="text" required id="name" name="user_name" placeholder="Intrdu numele" />  </div>
    <div>
      <label for="address-label">Adresa:</label>
      <input type="Address" id="address" name="Address" ></input>
    </div>
      
      </fieldset>
      <fieldset>
    <div>
      <label for="politics">Punct Termic:</label>
       <select id="dropdown">
  <option value="armonia">Armonia</option>
  <option value="cornisa">Cornisa</option>
  <option value="bancila1">Bancila 1</option>
  <option value="bancila2">Bancila 2</option>
  </select>
      </div>
  </fieldset>
    <fieldset>
         <div>
      <label for="sector">Sector</label>
      <p>
        <input type="radio" name="sector" value="iftime" checked> Iftime</input>
        <input type="radio" name="sector" value="scutaru"> Scutaru</input>
      </p>
    </div>
    </fieldset>

    <fieldset>
    <div>
      <label for="comunicat">Comunicat la</label>
      <p>
        <input type="radio" name="comunicat" value="sef_sectie" checked> Sef Sectie</input>
        <input type="radio" name="comunicat" value="sef_formatie"> Sef Formatie</input>
        <input type="radio" name="comunicat" value="maistru"> Maistru</input>
      </p>
    </div>
    </fieldset>
  

  <fieldset>
   <div>
      <label for="serv">Serviciul</label>
      <p>
        <input type="radio" name="serv" value="inc" checked> INC</input>
        <input type="radio" name="serv" value="acm"> ACM</input>
      </p>
    </div>
  </fieldset>
  
  
  <fieldset>
    <div>
      <label for="localizare">Localizare:</label>
      <select id="dropdown">
  <option value="scara">Casa Scarii</option>
  <option value="subsol">Subsol</option>
  <option value="apartament">Apartament</option>
  <option value="altceva">Altceva</option>
  </select>

      <label for="dist">Distributie/Transport:</label>
      <select id="dropdown2">
  <option value="distributie">Distributie</option>
  <option value="transport">Transporte</option>
  
  </select>
    </div>
  </fieldset>
<fieldset>
     <div>
      <label for="serv">Scara inchisa?</label>
      <p>
        <input type="radio" name="serv" value="acm" checked> DA</input>
        <input type="radio" name="serv" value="inc"> NU</input>
      </p>
    </div>
    </fieldset>
 
  
  <fieldset>
    <legend>Observatie</legend>
    <div>
      <label for="msg"></label>
      <p> Va rugam sa adaugati detalii referitoare la sesizarea in curs</p>
      <textarea id="msg" name="user_message" rows="4" cols="50" placeholder="Enter Text Here"></textarea> </div>
    <div>
      <label for="msg">Please upload contact details for 2 references</label>
      <textarea id="msg2" name="user_message" rows="4" cols="50" placeholder="Enter Text Here"></textarea> </div>
  
  </fieldset>

  <div id="submitbutton">
    <button type="submit" id="submit">Submit</button> </div>

</form>
  </div>
)
}


export default FormularSesizare