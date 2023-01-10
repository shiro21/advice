import { createStore } from "redux";

const data = [
    {
        token: '',
        user: ''
    }
];

const reducer = (state = data, action) => {
    if (action.type === 'login' || action.type === 'join') {
        // state.token = 
    }
    return state;
};

const store = createStore(reducer);

export default store;