import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Tile, TileTypes } from 'components';
import Styled from './styled-components';

function ShowDetails() {

    const [show, setShow] = useState(null);
    const { showId } = useParams();

    useEffect(() => {
        // fetch show with embedded cast
        fetch(`http://api.tvmaze.com/shows/${showId}?embed[]=cast`)
            .then(res => res.json())
            .then(show => setShow(show));
    }, [showId])

    return (
        <div>
            {show && (
                <div>
                    <Tile type={TileTypes.show} data={show} hideName />
                    <Styled.Characters>
                        {show._embedded.cast.map(cast => (
                                <Tile type={TileTypes.character} data={cast} key={cast.character.id}/>
                        ))}
                    </Styled.Characters>
                </div>
            )}
        </div>
    );
}

export default ShowDetails;
