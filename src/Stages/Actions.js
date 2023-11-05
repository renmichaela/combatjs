const disengage = ({ G, playerID, events }) => {
  G.states[playerID] = 'disengaged';
  events.endStage();
}

const dodge = ({ G, playerID, events }) => {
  G.states[playerID] = 'dodging';
  events.endStage();
}

const Actions = {
  disengage,
  dodge
}

export default Actions;
