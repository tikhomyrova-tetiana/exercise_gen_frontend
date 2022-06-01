import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { selectExercises } from "../../store/exercises/selectors";
import { fetchExercises } from "../../store/exercises/thunk";

export default function Homepage() {
  const dispatch = useDispatch();
  const exercises = useSelector(selectExercises);
  console.log(exercises.length);

  //This is the necessary step to fetch the data and put it in the Redux store.
  useEffect(() => {
    dispatch(fetchExercises);
  }, [dispatch]);

  const dice = (min, max) => {
    min = 1;
    max = exercises.length;
    return Math.floor(Math.random() * (max - min + 1) + min); //Максимум и минимум включаются
  };
  const [number, setNumber] = useState(0);

  return (
    <div>
      <h2>Generate an exercise</h2>
      <button onClick={() => setNumber(dice)}>Generate</button>
      {/* Number: {number} */}
      {!exercises.length ? (
        "Loading"
      ) : (
        <div>
          <li>{exercises[number].name}</li>
          <img src={exercises[number].gifUrl} alt="exercise"></img>
        </div>
      )}
    </div>
  );
}
