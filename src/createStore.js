import React from 'react';
import compose from './compose'

const { useContext, createContext, useReducer } = React;

function createStore(reducer, initialState, middlewares) {

    const storeContext = createContext();

    const store = {
        _state: initialState,
        getState: () => {
            return store._state;
        },
        useContext: () => {
            return useContext(storeContext);
        },
        // assign after useReducer 
        dispatch: undefined
    };

    const Provider = (props) => {
        const [state, dispatch] = useReducer(reducer, store._state);

        store.dispatch = async (action) => {
            if (typeof action === 'function') {
                await action(dispatch, state);
            } else {
                dispatch(action);
            }
        };

        // compose middlewares
        var chain = middlewares.map(item => item(store));
        var middlewaresFun = compose(...chain);
        store.dispatch = middlewaresFun(store.dispatch);

        // reset _state
        store._state = state;

        return (
            <storeContext.Provider {...props} value={state} />
        )
    }

    return {
        Provider,
        store
    }
}

export default createStore;

