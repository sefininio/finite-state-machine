import React from 'react';
import { useSelector } from 'react-redux';

import { Tile, TileTypes } from 'components'
import Styled from './styled-components';

const List = () => {

    const { shows } = useSelector((state) => state.show);

    return (
        <Styled.List>
            { shows.map((show) => {
                return (
                    <Tile type={TileTypes.show} data={show} key={show.id} hideSummary hideName />
                );
            })}
        </Styled.List>
    );
};

export default List;
