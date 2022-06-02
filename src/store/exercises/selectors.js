export const selectExercises = (reduxState) => reduxState.exercises.exercises;

export const selectRepetitions = (reduxState) =>
  reduxState.exercises.repetition;
