import React from "react";
import styles from "./ResultsPage.module.css";
import { useSearchParams } from "react-router-dom";
import { isObjectOfArraysOfStrings } from "../../../utils/array";

const ResultsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const passengerCount = searchParams.get("passengerCount");
  const tripDate = searchParams.get("tripDate");
  const tripDestinations = searchParams.get("tripDestinations");

  const isParametersValid = () => {
    
    if (tripDate && passengerCount && tripDestinations) {
      // Check if tripDate is in the format DD-MM-YYYY
      const dateRegex = /^\d{2}-\d{2}-\d{4}$/;
      if (!dateRegex.test(tripDate)) {
        return false;
      }
      try {
        
        const destinations = JSON.parse(tripDestinations);
        if (typeof destinations !== "object" && !isObjectOfArraysOfStrings(destinations)) {
          return false;
        }

        if (isNaN(Number(passengerCount))) {
          return false;
        }
      } catch (e) {
        return false;
      }
    } else {
      return false;
    }
    return true;
  };
  return (
    <div className={styles.ResultsPage}>
      <p>ResultsPage</p>
      {isParametersValid()}
      {isParametersValid() ? (
        <>
          <p>{passengerCount}</p>
          <p>{tripDate}</p>
          <p>{tripDestinations}</p>
        </>
      ) : (
        <p>Your search is invalid.</p>
      )}
    </div>
  );
};

export default ResultsPage;
