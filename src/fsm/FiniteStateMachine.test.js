import createMachine from './FiniteStateMachine';

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

it('should fail creation on empty states definition', () => {
    expect(() => createMachine()).toThrow();
});

it('should fail creation on states definition without initial state', () => {
    const states = {
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
    expect(() => createMachine(states)).toThrow();
});

it('should create a machine instance', () => {
    const machine = createMachine(states);
    expect(machine.currentState).toBeDefined();
    expect(machine.currentState.value).toEqual('home');
});

it('should define trnasition api correctly', () => {
    const machine = createMachine(states);
    expect(machine.currentState).toBeDefined();
    expect(machine.currentState.toShow).toBeDefined();
    expect(machine.currentState.toHome).toBeDefined();
    expect(machine.currentState.toActor).not.toBeDefined();
    expect(() => machine.currentState.toActor()).toThrow();

    machine.currentState.toShow();
    expect(machine.currentState.value).toEqual('showDetails');
    expect(machine.currentState.toShow).not.toBeDefined();
    expect(machine.currentState.toHome).toBeDefined();
    expect(machine.currentState.toActor).toBeDefined();

});

it('should call before/after hooks', () => {
    const before = jest.fn();
    const after = jest.fn();

    const machine = createMachine(states);
    machine.currentState.toShow({
        action: {
            beforeTransition: before,
            afterTransition: after,
        },
    });

    expect(before).toHaveBeenCalledTimes(1);
    expect(after).toHaveBeenCalledTimes(1);
});
