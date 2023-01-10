
const setStorage = (item) => {

    localStorage.setItem('_advice_token', item.token);
    localStorage.setItem('_advice_user', item.user);

};

const getStorage = {
    token: localStorage.getItem('_advice_token'),
    user: localStorage.getItem('_advice_user')
};

const removeStorage = () => {

    localStorage.removeItem('_advice_token');
    localStorage.removeItem('_advice_user');

};

export { setStorage, getStorage, removeStorage };