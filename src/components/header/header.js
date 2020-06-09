import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useObserver } from 'mobx-react-lite';
import Input from '@material-ui/core/Input';

import { useStore, useDebounce } from 'hooks';
import { useStateMachine } from 'fsm';
import Styled from './styled-components';

const Header = () => {

    const history = useHistory();
    const [query, setQuery] = useState('');
    const bedouncedQuery = useDebounce(query, 500);
    const machine = useStateMachine();

    const {
        showsStore,
        actorStore,
    } = useStore();

    useEffect(() => {
        // fetch shows based on debounced query

        fetch(`http://api.tvmaze.com/search/shows?q=${bedouncedQuery}`)
            .then(res => res.json())
            .then(shows => showsStore.setShows(shows))
            .then(() => {
                machine.currentState.toHome({
                    action: {
                        afterTransition: () => history.push('/'),
                    },
                });
            });

    }, [bedouncedQuery]);

    return useObserver(() => (
        <Styled.Header>
            <div>
                Search show:
                <Input value={query} onChange={e => setQuery(e.target.value)} />
            </div>
            { showsStore.show &&
                <div>Current Show: {showsStore.show.name}</div>
            }
            { actorStore.actor &&
                <div>Current Actor: {actorStore.actor.person.name} </div>
            }
        </Styled.Header>
    ));
};

export default Header;
