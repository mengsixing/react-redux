function combineReducers(reducers) {

    return function (state= {}, action) {
        let newState = {};
        Object.keys(reducers).map(key => {
            const reducer = reducers[key]
            newState[key] = reducer(state[key], action);
        })
        return newState;
    }
}

export default combineReducers;