import React from 'react';
import { useHistory } from 'react-router-dom';
import get from 'lodash/get';
import { useDispatch } from 'react-redux';

import { TileTypes } from '../';
import { setCurrentShow } from 'stores/showSlice';
import { setActor } from 'stores/actorSlice';
import { useStateMachine } from 'fsm';
import Styled from './styled-components';

const Tile = ({ type, data, hideSummary, hideName }) => {

    const history = useHistory();
    const dispatch = useDispatch();

    const machine = useStateMachine();

    const handleClick = () => {
        switch(type) {
            case TileTypes.show:
                dispatch(setCurrentShow(data));
                machine.currentState.toShow({
                    action: {
                        afterTransition: () => history.push(`/show/${data.id}`),
                    },
                });
                break;
            case TileTypes.character:
                dispatch(setActor(data));
                machine.currentState.toActor({
                    action: {
                        afterTransition: () => history.push(`/actor/${data.person.id}`),
                    },
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
                <div>{data.summary.replace(/(<([^>]+)>)/ig,"")}</div>
            }
        </Styled.Tile>
    );
};

export default Tile;
