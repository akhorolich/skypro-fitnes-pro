export const getUser = () => {
    const user = window.localStorage.getItem('user')
    if(!user) return null;
    return JSON.stringify(user);
}

export const getTokenBool = () => {
    const token = window.localStorage.getItem('token')
    if(!token) return null;
    return true;
}