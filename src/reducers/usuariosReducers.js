const INITIAL_STATE = {
    usuarios: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "_traer_usuarios":
            return { ...state, usuarios: action.payload };
        default:
            return state;
    }
};
