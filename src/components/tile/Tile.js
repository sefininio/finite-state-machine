import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import get from 'lodash/get';

import { TileTypes } from '../';
import { useStore } from 'hooks';
import { useStateMachine } from 'fsm';
import Styled from './styled-components';

const Tile = ({ type, data, hideSummary, hideName }) => {

    const history = useHistory();
    const {
        showsStore,
        actorStore,
    } = useStore();
    const machine = useStateMachine();

    const handleClick = () => {
        switch(type) {
            case TileTypes.show:
                showsStore.setCurrentShow(data);
                machine.currentState.toShow({
                    action: () => history.push(`/show/${data.id}`),
                });
                break;
            case TileTypes.character:
                actorStore.setActor(data);
                machine.currentState.toActor({
                    action: () => history.push(`/actor/${data.person.id}`),
                });
                break;
            case TileTypes.season:
            case TileTypes.actor:
            default:
                return;
        }
    }

    const processData = () => {
        if (type === TileTypes.character) {
            return [
                get(data, 'character.image.medium', ''),
                get(data, 'character.name'),
            ];
        }

        if (type === TileTypes.actor) {
            return [
                get(data, 'person.image.medium', ''),
                get(data, 'person.name'),
            ];
        }

        return [
            get(data, 'image.medium', ''),
            get(data, 'name'),
        ];
    }

    const [imgSource, name] = processData();

    return (
        <Styled.Tile onClick={() => handleClick()}>
            <Styled.Image>
                <img
                    alt={name}
                    src={imgSource}
                />
                {!hideName && name}
            </Styled.Image>
            {!hideSummary && data.summary &&
                <div dangerouslySetInnerHTML={{ __html: data.summary}}></div>
            }
        </Styled.Tile>
    );
};

export default Tile;
