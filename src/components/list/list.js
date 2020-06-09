import React from 'react';
import { useObserver } from 'mobx-react-lite';

import { useStore } from 'hooks';
import { Tile, TileTypes } from 'components'
import Styled from './styled-components';

const List = () => {

    const { showsStore } = useStore();

    return useObserver(() => (
        <Styled.List>
            { showsStore.showsPlain.map((show) => {
                return (
                    <Tile type={TileTypes.show} data={show} key={show.id} hideSummary hideName />
                );
            })}
        </Styled.List>
    ));
};

export default List;
