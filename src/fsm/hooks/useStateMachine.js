import React from 'react';
import { fsmContext } from '../';

function useStateMachine () {
  const machine = React.useContext(fsmContext);
  return machine;
}

export default useStateMachine;
