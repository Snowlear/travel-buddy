import React, { useEffect, useState } from "react";
import styles from "./TripPlanner.module.css";
import Input from "../../atoms/Input/Input";
import Dot from "../../../assets/images/svgs/ellipse.svg";
import Line from "../../../assets/images/svgs/line.svg";
import Plus from "../../../assets/images/svgs/plus.svg";
import LocationTag from "../../../assets/images/svgs/locationTag.svg";
import { useCitiesContext } from "../../../context/CitiesContext";
import { upperCaseFirst } from "../../../utils/string";
import {
  DestinationSelection,
  exampleDestinationSelection,
} from "../../../types/DestinationSelection";
import Link from "../../atoms/Link/Link";

interface TripPlannerProps {
  setIsValid: (input: boolean) => void;
}

const TripPlanner: React.FC<TripPlannerProps> = ({ setIsValid }) => {
  const [destinations, setDestinations] = useState<DestinationSelection[]>([
    { ...exampleDestinationSelection },
    { ...exampleDestinationSelection },
  ]);
  const { searchCities } = useCitiesContext();
  const setDestination = (
    input: string,
    index: number,
    key: "name" | "error" = "name"
  ) => {
    let currentDestinations = [...destinations];
    currentDestinations[index][key] = input;
    setDestinations(currentDestinations);
  };

  const addDestination = () => {
    setDestinations([...destinations, { ...exampleDestinationSelection }]);
  };

  const setDestinationValidity = (input: boolean, index: number) => {
    let currentDestinations = [...destinations];
    currentDestinations[index].isValid = input;
    setDestinations(currentDestinations);
  };

  const checkDestination = (input: DestinationSelection, index: number) => {
    if (input.name.trim().length > 0) {
      searchCities(input.name).then((result) => {
        if (result.some((city) => city.name === input.name)) {
          setDestination("", index, "error");
          setDestinationValidity(true, index);
        } else {
          setDestination("Its not a valid city", index, "error");
          setDestinationValidity(false, index);
        }
      });
    } else {
      setDestination("This field is mandatory.", index, "error");
      setDestinationValidity(false, index);
    }
  };

  useEffect(() => {
    setIsValid(
      destinations.filter((d) => d.isValid).length === destinations.length
    );
  }, [destinations, setIsValid]);

  return (
    <div className={styles.TripPlanner}>
      <div className={styles.dotArea}>
        {[...Array(destinations.length - 1)].map((e, i) => (
          <React.Fragment key={"dotsOf"+i}>
            <img key={"dotsOf"+i} className={styles.dot} alt="dot" src={Dot}></img>
            <img key={"lineOf"+i} className={styles.dot} alt="line" src={Line}></img>
          </React.Fragment>
        ))}

        <img className={styles.dot} alt="dot" src={LocationTag}></img>
        <img className={styles.plus} alt="dot" src={Plus}></img>
      </div>
      <div className={styles.inputArea}>
        {destinations.map((destination, idx) => (
          <Input
            key={idx + "_dest"}
            isValid={destination.isValid}
            onBlur={() => checkDestination(destination, idx)}
            onChange={(e) =>
              setDestination(upperCaseFirst(e.target.value), idx)
            }
            value={destination.name}
            error={
              destination.error && destination.error.length > 0
                ? destination.error
                : undefined
            }
            label={idx === 0 ? "City of Origin" : "City of Destination"}
          />
        ))}
        <Link onClick={() => {addDestination()}} label={"Add destination"}/>
      </div>
    </div>
  );
};

export default TripPlanner;
