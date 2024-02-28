export const ADD_USER_VIDEO = "ADD_USER_VIDEO";
export const ADD_USER_NAME = "ADD_USER_VIDEO";
export const REMOVE_USER_VIDEO = "REMOVE_USER_VIDEO";
export const ADD_ALL_USERS = "ADD_ALL_USERS"

export const addUserVideoAction = (userId, stream)=>({
    type : ADD_USER_VIDEO,
    payload : {userId, stream}
})

export const addUserNameAction = (userId, userNamex)=>({
    type : ADD_USER_NAME,
    payload : {userId, userNamex}
})

export const removeUserVideoAction = (userId)=>({
    type : REMOVE_USER_VIDEO,
    payload : {userId}
})

export const addAllUsers = (users, userNamex)=>({
    type : ADD_ALL_USERS,
    payload : {users}
})
