import React, { useState } from "react";
import styles from "./SearchPage.module.css";
import Button from "../../atoms/Button/Button";
import TripPlanner from "../../molecules/TripPlanner/TripPlanner";
import Input from "../../atoms/Input/Input";

const SearchPage: React.FC = () => {
  const [isFormValid, setIsFormValid] = useState(false);
  const [passengerCount, setPassengerCount] = useState(0);
  const [date, setDate] = useState("");
  return (
    <div className={styles.searchPage}>
      <div className={styles.formItems}>
        <div className={styles.leftInput}>
          <TripPlanner setIsValid={setIsFormValid} />
        </div>
        <div className={styles.rightInputs}>
          <Input
            value={passengerCount + ""}
            type="number"
            onNumberChange={(value) => setPassengerCount(value)}
            label={"Passenger"}
          />
          <Input
            value={date}
            type="date"
            onChange={(e) => setDate(e.target.value)}
            label={"Date"}
          />
        </div>
      </div>
      <div className={styles.controlGroup}>
        <Button disabled={!isFormValid}>Submit</Button>
      </div>
    </div>
  );
};

export default SearchPage;
