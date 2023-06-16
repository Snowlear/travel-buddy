import React, { useEffect, useState } from "react";
import styles from "./ResultsPage.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { isObjectOfArraysOfStrings, sumArray } from "../../../utils/array";
import Button from "../../atoms/Button/Button";
import { formatDate } from "../../../utils/date";
import classnames from "classnames";
import { City, CityDistanceData } from "../../../types/City";
import { useCitiesContext } from "../../../context/CitiesContext";
import { roundNumber } from "../../../utils/number";
import ArrowBubble from "../../atoms/ArrowBubble/ArrowBubble";
import LocationTag from "../../../assets/images/svgs/locationTag.svg";
import ThreeDots from "../../../assets/images/svgs/3dots.svg";

const ResultsPage: React.FC = () => {
  const navigate = useNavigate();
  const [distancesData, setDistancesData] = useState<CityDistanceData>();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();
  const [searchParams] = useSearchParams();
  const passengerCount = searchParams.get("passengerCount");
  const tripDate = searchParams.get("tripDate");
  const tripDestinations = searchParams.get("tripDestinations");
  const [destinations] = useState<string[]>(JSON.parse(tripDestinations!));
  const { getCities, isValidCity, calculateDistances } = useCitiesContext();
  const isParametersValid = () => {
    if (tripDate && passengerCount && tripDestinations) {
      const dateRegex = /^\d{2}-\d{2}-\d{4}$/;
      if (!dateRegex.test(tripDate)) {
        return false;
      }
      try {
        if (
          typeof destinations !== "object" &&
          !isObjectOfArraysOfStrings(destinations)
        ) {
          return false;
        }

        destinations.forEach(function (item) {
          if (!isValidCity(item)) {
            return false;
          }
        });

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

  useEffect(() => {
    if (tripDestinations && !isLoaded) {
      const destinationStrings = JSON.parse(tripDestinations);
      getCities(destinationStrings)
        .then((cities: City[]) => {
          calculateDistances(cities)
            .then((distances) => {
              const distanceData: CityDistanceData = {
                totalDistance: sumArray(distances),
                distanceBetween: distances,
              };
              setDistancesData(distanceData);
            })
            .catch(() => {
              setError("Error occured while parsing your request.");
            })
            .finally(() => setIsLoaded(true));
        })
        .catch(() => {
          setError("Error occured while parsing your request.");
          setIsLoaded(true);
        });
    }
  }, [calculateDistances, getCities, isLoaded, tripDestinations]);

  return (
    <div className={styles.ResultsPage}>
      {isParametersValid() ? (
        isLoaded ? (
          error ? (
            <p>{error}</p>
          ) : (
            <>
              <div className={classnames(styles.pathWrapper, styles.blueText)}>
                <div className={styles.distancesBox}>
                  {distancesData?.distanceBetween?.map((distance) => (
                    <ArrowBubble
                      key={"dist" + distance}
                      isRelative
                      direction="right"
                    >
                      <p className={styles.bubbleText}>
                        {roundNumber(distance, 2)} km
                      </p>
                    </ArrowBubble>
                  ))}
                </div>
                <div className={styles.dotContainer}>
                  {destinations?.map((x, idx) => {
                    if (idx === destinations.length - 1) {
                      return (
                        <img
                          key="locationTag"
                          className={styles.dot}
                          alt="dot"
                          src={LocationTag}
                        ></img>
                      );
                    }
                    return (
                      <img
                        alt="3dots"
                        key={"dotsOf" + idx}
                        src={ThreeDots}
                      ></img>
                    );
                  })}
                </div>
                <div className={styles.citiesContainer}>
                  {destinations?.map((x) => (
                    <p key={"city_" + x}>{x}</p>
                  ))}
                </div>
              </div>
              <p className={styles.text}>
                <span className={classnames(styles.boldText, styles.blueText)}>
                  {roundNumber(distancesData?.totalDistance!, 2)} km
                </span>{" "}
                is total distance
              </p>
              <p className={styles.text}>
                <span className={classnames(styles.boldText, styles.blueText)}>
                  {passengerCount}
                </span>{" "}
                passengers
              </p>
              <p className={classnames(styles.boldText, styles.blueText)}>
                {tripDate && formatDate(tripDate)}
              </p>
            </>
          )
        ) : (
          <p>Loading...</p>
        )
      ) : (
        <p>Your search is invalid.</p>
      )}
      <div className={styles.controlGroup}>
        <Button onClick={() => navigate(`../`)}>Back</Button>
      </div>
    </div>
  );
};

export default ResultsPage;
