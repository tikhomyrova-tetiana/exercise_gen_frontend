export const selectExercises = (reduxState) => reduxState.exercises.exercises;

export const selectRepetitions = (reduxState) =>
  reduxState.exercises.repetition;

export const selectArmsExercise = (reduxState) => {
  const arms = reduxState.exercises.exercises.filter(
    (e) =>
      e.bodyPart === "upper arms" ||
      e.bodyPart === "lower arms" ||
      e.bodyPart === "shoulders"
  );
  return arms;
};

export const selectLegsExercise = (reduxState) => {
  const legs = reduxState.exercises.exercises.filter(
    (e) => e.bodyPart === "upper legs" || e.bodyPart === "lower legs"
  );
  return legs;
};

export const selectBackExercise = (reduxState) => {
  const back = reduxState.exercises.exercises.filter(
    (e) => e.bodyPart === "back" || e.bodyPart === "neck"
  );
  return back;
};

export const selectWaistExercise = (reduxState) => {
  const waist = reduxState.exercises.exercises.filter(
    (e) => e.bodyPart === "waist"
  );
  return waist;
};

export const selectChestExercise = (reduxState) => {
  const chest = reduxState.exercises.exercises.filter(
    (e) => e.bodyPart === "chest"
  );
  return chest;
};

export const selectCardioExercise = (reduxState) => {
  const cardio = reduxState.exercises.exercises.filter(
    (e) => e.bodyPart === "cardio"
  );
  return cardio;
};

export const selectUserExercises = (reduxState) =>
  reduxState.exercises.favourites;
