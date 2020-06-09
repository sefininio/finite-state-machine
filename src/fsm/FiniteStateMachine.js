import capitalize from 'lodash/capitalize';
import camelCase from 'lodash/camelCase';

function createMachine(stateMachineDefinition) {
    const machine = {
        transition(event) {
            const currentStateDefinition = stateMachineDefinition[this.currentState.value];
            const destinationState = currentStateDefinition.transitions[event.target];
            if (!destinationState) {
                throw new Error(`${event.target} is not a valid transition from ${this.currentState.value}`);
                return;
            }
            event?.action?.beforeTransition && event.action.beforeTransition();
            machine.currentState = Object.assign({}, machine.getStateTransitions(destinationState), {
                value: destinationState,
            });
            event?.action?.afterTransition && event.action.afterTransition();

            console.log('current state:', machine.currentState.value);

            return machine.currentState;
        },
        getStateTransitions(state) {
            return Object.keys(stateMachineDefinition[state].transitions).reduce((funcs, action) => {
                funcs[`to${capitalize(camelCase(action))}`] = event => this.transition({ target: action, ...event });
                return funcs;
            }, {});
        }
    }

    if (!stateMachineDefinition || !stateMachineDefinition.initialState) {
        throw new Error('stateMachineDefinition is not valid');
    }

    machine.currentState = Object.assign({}, machine.getStateTransitions(stateMachineDefinition.initialState), {
        value: stateMachineDefinition.initialState,
    });
    return machine;
}

export default createMachine;
