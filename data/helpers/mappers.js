module.exports = {
    intToBoolean,
    booleanToint,
    noteToBody,
    actionToBody,
  };
  
  function intToBoolean(int) {
    return int === 1 ? true : false;
  }
  
  function booleanToint(bool) {
    return bool === true ? 1 : 0;
  }
  
  function noteToBody(note) {
    const result = {
      ...note,
      completed: intToBoolean(note.completed),
    };
  
    if (note.actions) {
      result.actions = note.actions.map(action => ({
        ...action,
        completed: intToBoolean(action.completed),
      }));
    }
  
    return result;
  }
  
  function actionToBody(action) {
    return {
      ...action,
      completed: intToBoolean(action.completed),
    };
  }
  