
const states = {
    initialState: 'home',
    home: {
        transitions: {
            show: 'showDetails',
            home: 'home',
        },
    },
    showDetails: {
        transitions: {
            home: 'home',
            actor: 'actorDetails',
        },
    },
    actorDetails: {
        transitions: {
            home: 'home',
            show: 'showDetails',
        },
    }
};

export default states;
