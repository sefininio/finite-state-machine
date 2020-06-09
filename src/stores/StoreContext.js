import React from 'react';
import { useLocalStore } from 'mobx-react-lite';

import { createActorStore } from './ActorStore';
import { createShowsStore } from './ShowsStore';

export const storeContext = React.createContext(null);

export const StoreProvider = ({ children }) => {
    const store = {
        actorStore: useLocalStore(createActorStore),
        showsStore: useLocalStore(createShowsStore),
    };
    return <storeContext.Provider value={store}>{children}</storeContext.Provider>
}
