function bindActionCreator(actionCreator, dispatch) {
    return (...arg) => {
        return dispatch(actionCreator.call(this, ...arg));
    }
}

function bindActionCreators(actionCreators, dispatch) {

    if (typeof actionCreators === 'function') {
        return bindActionCreator(actionCreators, dispatch);
    }


    var actionCreatorKeys = Object.keys(actionCreators);
    var result = {};
    actionCreatorKeys.map(key => {
        result[key] = bindActionCreator(actionCreators[key], dispatch);
    })
    return result;
}

export default bindActionCreators;