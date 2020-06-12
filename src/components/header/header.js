import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Input from '@material-ui/core/Input';
import { useSelector, useDispatch } from 'react-redux';

import { setShows } from 'stores/showSlice';
import { useDebounce } from 'hooks';
import { useStateMachine } from 'fsm';
import Styled from './styled-components';

const Header = () => {

    const history = useHistory();
    const dispatch = useDispatch();

    const [query, setQuery] = useState('');
    const bedouncedQuery = useDebounce(query, 500);
    const machine = useStateMachine();
    const { actor } = useSelector((state) => state.actor);
    const { show } = useSelector((state) => state.show);

    useEffect(() => {
        // fetch shows based on debounced query
        fetch(`http://api.tvmaze.com/search/shows?q=${bedouncedQuery}`)
            .then(res => res.json())
            .then(shows => shows.map(show => show.show))
            .then(shows => shows.filter(show => show.image))
            .then(shows => dispatch(setShows(shows)))
            .then(() => {
                machine.currentState.toHome({
                    action: {
                        afterTransition: () => history.push('/'),
                    },
                });
            });

    }, [bedouncedQuery]);

    return (
        <Styled.Header>
            <div>
                Search show:
                <Input value={query} onChange={e => setQuery(e.target.value)} />
            </div>
            { show &&
                <div>Current Show: {show.name}</div>
            }
            { actor &&
                <div>Current Actor: {actor.person.name} </div>
            }
        </Styled.Header>
    );
};

export default Header;
