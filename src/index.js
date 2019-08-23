import React from 'react';
import bindActionCreators from './bindActionCreators'
import compose from './compose'
import combineReducers from './combineReducers'


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
        // 在 useReducer 后赋值
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

        // 整合中间件
        var chain = middlewares.map(item => item(store));
        var middlewaresFun = compose(...chain);
        store.dispatch = middlewaresFun(store.dispatch);

        // 重置 store 中的数据
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

export default {
    createStore,
    combineReducers,
    bindActionCreators,
    compose
};