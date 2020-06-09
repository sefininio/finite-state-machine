import capitalize from 'lodash/capitalize';
import camelCase from 'lodash/camelCase';

function createMachine(stateMachineDefinition) {
    const machine = {
        transition(event) {
            const currentStateDefinition = stateMachineDefinition[this.currentState.value];
            const destinationState = currentStateDefinition.transitions[event.target];
            if (!destinationState) {
                return;
            }
            event.action && event.action();
            machine.currentState = Object.assign({}, machine.getStateTransitions(destinationState), {
                value: destinationState,
            });
            console.log('current state:', machine.currentState.value);

            return machine.currentState;
        },
        getStateTransitions(state) {
            return Object.keys(stateMachineDefinition[state].transitions).reduce((fncs, action) => {
                fncs[`to${capitalize(camelCase(action))}`] = event => this.transition({target: action, ...event});
                return fncs;
            }, {});
        }
    }
    machine.currentState = Object.assign({}, machine.getStateTransitions(stateMachineDefinition.initialState), {
        value: stateMachineDefinition.initialState,
    });
    return machine;
}

export default createMachine;
