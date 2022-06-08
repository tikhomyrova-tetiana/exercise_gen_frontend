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

export const selectCompletedExercises = (reduxState) =>
  reduxState.exercises.completed;

export const selectCompletedArms = (reduxState) => {
  if (reduxState.exercises.completed) {
    const { completed } = reduxState.exercises;
    // const sorted = completed.sort((a, b) => b.createdAt - a.createdAt);

    const arms = completed.filter(
      (e) =>
        e.bodyPart === "upper arms" ||
        e.bodyPart === "lower arms" ||
        e.bodyPart === "shoulders"
    ).length;
    return arms;
  }
  return;
};

export const selectCompletedLegs = (reduxState) => {
  if (reduxState.exercises.completed) {
    const { completed } = reduxState.exercises;
    // const sorted = completed.sort((a, b) => b.createdAt - a.createdAt);

    const legs = completed.filter(
      (e) => e.bodyPart === "upper legs" || e.bodyPart === "lower legs"
    ).length;
    return legs;
  }
  return;
};

export const selectCompletedBack = (reduxState) => {
  if (reduxState.exercises.completed) {
    const { completed } = reduxState.exercises;
    // const sorted = completed.sort((a, b) => b.createdAt - a.createdAt);

    const back = completed.filter(
      (e) => e.bodyPart === "back" || e.bodyPart === "neck"
    ).length;
    return back;
  }
  return;
};

export const selectCompletedWaist = (reduxState) => {
  if (reduxState.exercises.completed) {
    const { completed } = reduxState.exercises;
    // const sorted = completed.sort((a, b) => b.createdAt - a.createdAt);

    const waist = completed.filter((e) => e.bodyPart === "waist").length;
    return waist;
  }
  return;
};

export const selectCompletedChest = (reduxState) => {
  if (reduxState.exercises.completed) {
    const { completed } = reduxState.exercises;
    // const sorted = completed.sort((a, b) => b.createdAt - a.createdAt);

    const chest = completed.filter((e) => e.bodyPart === "chest").length;
    return chest;
  }
  return;
};

export const selectCompletedCardio = (reduxState) => {
  if (reduxState.exercises.completed) {
    const { completed } = reduxState.exercises;
    // const sorted = completed.sort((a, b) => b.createdAt - a.createdAt);

    const cardio = completed.filter((e) => e.bodyPart === "cardio").length;
    return cardio;
  }
  return;
};
