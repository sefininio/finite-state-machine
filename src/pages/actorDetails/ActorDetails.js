import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { Tile, TileTypes } from 'components';
import Styled from './styled-components';

function ActorDetails() {

    const [credits, setCredits] = useState(null);
    const { actorId } = useParams();
    const dispatch = useDispatch();
    const { actor } = useSelector((state) => state.actor);

    useEffect(() => {
        // fetch actor credits (which shows he/she played in)
        fetch(`http://api.tvmaze.com/people/${actorId}/castcredits?embed=show`)
            .then(res => res.json())
            .then(credits => credits.map(credit => credit._embedded.show))
            .then(credits => setCredits(credits));
    }, [actorId])

    return (
        <div>
            {actor && (
                <Tile type={TileTypes.actor} data={actor} />
            )}
            <Styled.Credits>
                {credits && credits.map(show => (
                    <Tile type={TileTypes.show} data={show} hideSummary hideName key={show.id}/>
                ))}
            </Styled.Credits>
        </div>
    );
}

export default ActorDetails;
