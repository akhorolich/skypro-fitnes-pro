export const getUserEmail = () => {
    const email = window.localStorage.getItem('user')
    if(!email) return null;
    return email;
}

export const getTokenBool = () => {
    const token = window.localStorage.getItem('token')
    if(!token) return null;
    return true;
}