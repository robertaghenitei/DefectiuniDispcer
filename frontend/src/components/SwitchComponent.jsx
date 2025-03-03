import React, { useEffect, useState } from "react";
import api from "../api";

function SwitchComponent({ sesizare, setRemediat }) {
  // State to track the checked value
  const [isChecked, setIsChecked] = useState(sesizare.remediat);

  // Handle checkbox change
  const handleChange = async (e) => {
    const checkedValue = e.target.checked; // Get latest value from event
    setIsChecked(checkedValue);
    if (checkedValue) {
      const date = new Date(); // Current date and time
      const formattedDate = date.toISOString(); // Convert to ISO format
      try {
        const response = await api.patch(
          `api/sesizari/update/${sesizare.id}/`,
          {
            remediat: checkedValue, // Updates only this field
            data_remedierii: formattedDate,
            cine_inchide_defectiunea: 1,
          }
        );

        console.log("Response:", response.data);
      } catch (error) {
        console.error("Error updating field:", error);
      }
    } else {
      try {
        const response = await api.patch(
          `api/sesizari/update/${sesizare.id}/`,
          {
            remediat: checkedValue, // Updates only this field
            data_remedierii: null,
            cine_inchide_defectiunea: null,
          }
        );

        console.log("Response:", response.data);
      } catch (error) {
        console.error("Error updating field:", error);
      }
    }
  };

  return (
    <div className="switch">
      <input
        type="checkbox"
        id={`check-${sesizare.id}`}
        checked={isChecked}
        onChange={handleChange} // Handle changes
      />
      <label htmlFor={`check-${sesizare.id}`}>
        <span className="slider"></span>
      </label>

      <span>
        <p>
          {isChecked ? (
            <span
              className="label-text"
              style={{
                backgroundColor: "red",
                fontWeight: "bold",
                fontFamily: "sans-serif",
              }}
            >
              DA
            </span>
          ) : (
            <span
              className="label-text"
              style={{
                backgroundColor: "lightblue",
                fontWeight: "bold",
                fontFamily: "sans-serif",
              }}
            >
              NU
            </span>
          )}
        </p>
      </span>
    </div>
  );
}

export default SwitchComponent;
