import React, { useState } from "react";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  selectExercises,
  selectRepetitions,
  selectArmsExercise,
  selectBackExercise,
  selectCardioExercise,
  selectChestExercise,
  selectLegsExercise,
  selectWaistExercise,
} from "../../store/exercises/selectors";
import { fetchExercises, fetchRepetitions } from "../../store/exercises/thunk";
import ExerciseCard from "../../components/ExerciseCard/ExerciseCard";
import GenerateButton from "../../components/GenerateButton/GenerateButton";

export default function Workout() {
  const dispatch = useDispatch();
  const exercises = useSelector(selectExercises);
  const arms = useSelector(selectArmsExercise);
  const legs = useSelector(selectLegsExercise);
  const back = useSelector(selectBackExercise);
  const waist = useSelector(selectWaistExercise);
  const chest = useSelector(selectChestExercise);
  const cardio = useSelector(selectCardioExercise);
  const repetitions = useSelector(selectRepetitions);
  //   const token = useSelector(selectToken);
  // console.log(exercises.length);
  // console.log("arms", arms);
  // console.log("legs", legs);
  // console.log("back", back);
  // console.log("waist", waist);
  // console.log("chest", chest);
  // console.log("cardio", cardio);

  const [legsExercId, setLegsExercId] = useState(0);
  const [armsExercId, setArmsExercId] = useState(0);
  const [waistExercId, setWaistExercId] = useState(0);
  const [backExercId, setBackExercId] = useState(0);
  const [chestExercId, setChestExercId] = useState(0);
  const [cardioExercId, setCardioExercId] = useState(0);
  const [reps1Id, setReps1Id] = useState(0);
  const [reps2Id, setReps2Id] = useState(0);
  const [reps3Id, setReps3Id] = useState(0);
  const [reps4Id, setReps4Id] = useState(0);
  const [reps5Id, setReps5Id] = useState(0);
  const [reps6Id, setReps6Id] = useState(0);

  //This is the necessary step to fetch the data and put it in the Redux store.
  useEffect(() => {
    dispatch(fetchExercises) && dispatch(fetchRepetitions);
  }, [dispatch]);

  const diceLegsExer = (min, max) => {
    min = 1;
    max = legs.length - 1;
    return Math.floor(Math.random() * (max - min + 1) + min); //Максимум и минимум включаются
  };
  const diceArmsExer = (min, max) => {
    min = 1;
    max = arms.length - 1;
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  const diceBackExer = (min, max) => {
    min = 1;
    max = back.length - 1;
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  const diceWaistExer = (min, max) => {
    min = 1;
    max = waist.length - 1;
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  const diceChestExer = (min, max) => {
    min = 1;
    max = chest.length - 1;
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  const diceCardioExer = (min, max) => {
    min = 1;
    max = cardio.length - 1;
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  const diceTime = (min, max) => {
    min = 1;
    max = repetitions.length - 1;
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const onClick = () => {
    setLegsExercId(diceLegsExer);
    setArmsExercId(diceArmsExer);
    setWaistExercId(diceWaistExer);
    setBackExercId(diceBackExer);
    setChestExercId(diceChestExer);
    setCardioExercId(diceCardioExer);
    setReps1Id(diceTime);
    setReps2Id(diceTime);
    setReps3Id(diceTime);
    setReps4Id(diceTime);
    setReps5Id(diceTime);
    setReps6Id(diceTime);
  };

  return !exercises.length ? (
    "Loading"
  ) : (
    <div className="pageworkout">
      <div className="mainpart">
        <div className="genpart">
          <div className="firstcolumn">
            <div className="cards">
              <div className="exerciseInfo">
                <ExerciseCard
                  key={arms[armsExercId].id}
                  name={arms[armsExercId].name}
                  bodyPart={arms[armsExercId].bodyPart}
                  image={arms[armsExercId].gifUrl}
                  reps={repetitions[reps1Id].time}
                />
              </div>
              <div className="exerciseInfo">
                <ExerciseCard
                  key={legs[legsExercId].id}
                  name={legs[legsExercId].name}
                  bodyPart={legs[legsExercId].bodyPart}
                  image={legs[legsExercId].gifUrl}
                  reps={repetitions[reps2Id]?.time}
                />
              </div>
              <div className="exerciseInfo">
                <ExerciseCard
                  key={waist[waistExercId].id}
                  name={waist[waistExercId].name}
                  bodyPart={waist[waistExercId].bodyPart}
                  image={waist[waistExercId].gifUrl}
                  reps={repetitions[reps3Id]?.time}
                />
              </div>
            </div>
            <div className="cards">
              <div className="exerciseInfo">
                <ExerciseCard
                  key={back[backExercId].id}
                  name={back[backExercId].name}
                  bodyPart={back[backExercId].bodyPart}
                  image={back[backExercId].gifUrl}
                  reps={repetitions[reps4Id]?.time}
                />
              </div>
              <div className="exerciseInfo">
                <ExerciseCard
                  key={chest[chestExercId].id}
                  name={chest[chestExercId].name}
                  bodyPart={chest[chestExercId].bodyPart}
                  image={chest[chestExercId].gifUrl}
                  reps={repetitions[reps5Id]?.time}
                />
              </div>
              <div className="exerciseInfo">
                <ExerciseCard
                  key={cardio[cardioExercId].id}
                  name={cardio[cardioExercId].name}
                  bodyPart={cardio[cardioExercId].bodyPart}
                  image={cardio[cardioExercId].gifUrl}
                  reps={repetitions[reps6Id]?.time}
                />
              </div>
            </div>
            {/* {addFavourites} */}
          </div>
          <div className="secondcolumn">
            <GenerateButton click={onClick} />
          </div>
        </div>
      </div>
    </div>
  );
}
