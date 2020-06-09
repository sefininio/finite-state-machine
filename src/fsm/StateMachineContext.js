import React from 'react';

import { createMachine } from './';

export const fsmContext = React.createContext(null);

export const StateMachineProvider = ({ states, children }) => {
    const machine = createMachine(states);

    return <fsmContext.Provider value={machine}>{children}</fsmContext.Provider>
}
