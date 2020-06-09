import styled from 'styled-components';


const Tile = styled.div`
    display: flex;
    flex-direction: row;
    cursor: pointer;
    margin: 1rem;
    width: fit-content;
`;

const Image = styled.div`
    display: flex;
    flex-direction: column;

    img: {
        width: fit-content;
    }
`;

export default {
    Image,
    Tile,
};