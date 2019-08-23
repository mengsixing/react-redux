function compose(...fns) {
    if (fns.length === 0) {
        return a => a;
    }
    if (fns.length === 1) {
        return fns[0];
    }

    var fn = fns.reduce((a, b) => {
        return (...args) => {
            return a(b(...args));
        }
    });
    return fn;
}

export default compose;