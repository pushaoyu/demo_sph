// 持久化存储token
export const setToken = (token) =>{
    localStorage.setItem('TOKEN',token)
}

//读取token
export const getToken = ()=>{
    return localStorage.getItem('TOKEN')
}

// 移除token
export const removeToken = ()=>{
    localStorage.removeItem('TOKEN')
}