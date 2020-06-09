This project purpose is to showcase a Finite State Machine implementation and a complimentary app that showcases its usage.

The FSM package can be found under src/fsm, and includes:

* StateMachineContext - the context provider that provides the FSM instance
* useStateMachine - a reusable hook that makes getting the instance from the context cleaner
* FiniteStateMachine.js - the FSM code. It expects a StateMachineDefinition and returns the instance.


The StateMachineDefinition should look something like this, and **must** include `initialState`:

```
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
```

The StateMachineDefinition will initialize the fsm to initialState and create dynamic API to make a transition.
So for the case above, since the initialState is `home`, the `machine.currentState` will expose:
```
{
    value: 'home',
    toShow: () => {}
    toHome: () => {}
}
```

Calling `machine.currentState.toShow()` will make the transition to the `showDetails` state.
When calling a transition method - one can pass an optional event object, that can utilize lifecycle hooks to execute logic before or after the transition:
```
machine.currentState.toShow({
    action: {
        beforeTransition: () => console.log('before transition'),
        afterTransition: () => console.log('after transition'),
    },
})
```

## Using it in your project
To use the FiniteStateMachine, you should first provide the machine instance using the `StateMachineProvider` and passing in the `StateMachineDefinition` as described above.
```
<StateMachineProvider states={states}>
```

To get the machine instance for making transitions, you can use the `useStateMachine` hook:
```
const machine = useStateMachine();
machine.currentState.toShow();
```

## The demo app
The demo app that showcases a possible FSM usage is a IMDB style app. The user can search for a TV show in the search box and will be presented with relevant results based on the search criteria.

Clicking on a show tile will present the show details page, with season information where available and a list of characters played in the show.

Clicking on a character tile will present the actor details page, with shows he participated in.

This uses the [tvmaze api](http://www.tvmaze.com/api), which is free, not always complete or accurate api, so sometimes data will be missing.

The app uses the FSM for transitioning between states and making the relevant route change using the `afterTransition` hook.

It is possible to see the FSM state change due to transitions in the DevTools console.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.
