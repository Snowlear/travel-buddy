import React, { useEffect, useState } from "react";
import styles from "./SearchPage.module.css";
import Button from "../../atoms/Button/Button";
import TripPlanner from "../../molecules/TripPlanner/TripPlanner";
import Input from "../../atoms/Input/Input";
import { DestinationSelection, exampleDestinationSelection } from "../../../types/DestinationSelection";
import { toDMYOrder } from "../../../utils/date";

const SearchPage: React.FC = () => {
  const [isDestinationsValid, setIsDestinationsValid] = useState(false);
  const [destinations, setDestinations] = useState<DestinationSelection[]>([
    { ...exampleDestinationSelection },
    { ...exampleDestinationSelection },
  ]);
  const [isFormValid, setIsFormValid] = useState(false);
  const [passengerCount, setPassengerCount] = useState(0);
  const [date, setDate] = useState("");
  useEffect(() => {
    setIsFormValid(isDestinationsValid && passengerCount > 0 && date.length > 0);
  }, [date.length, isDestinationsValid, passengerCount]);
  return (
    <div className={styles.searchPage}>
      <div className={styles.formItems}>
        <div className={styles.leftInput}>
          <TripPlanner setIsValid={setIsDestinationsValid} destinations={destinations} setDestinations={setDestinations}/>
        </div>
        <div className={styles.rightInputs}>
          <Input
            value={passengerCount + ""}
            type="number"
            onNumberChange={(value) => setPassengerCount(value)}
            onChange={(e) => setPassengerCount(Number(e.target.value))}
            label={"Passenger"}
          />
          <Input
            className={styles.datePicker}
            value={date}
            type="date"
            onChange={(e) => setDate(e.target.value)}
            label={"Date"}
          />
        </div>
      </div>
      <div className={styles.controlGroup}>
        <Button onClick={() => window.open(`results?passengerCount=${passengerCount}&tripDate=${toDMYOrder(date)}&tripDestinations=${JSON.stringify(destinations.map(item => item.name))}`, "_blank")} disabled={!isFormValid}>Submit</Button>
      </div>
    </div>
  );
};

export default SearchPage;
