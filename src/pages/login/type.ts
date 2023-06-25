export type User = {
    email:string,
    password:string
}

export type Auth = {
    auth:null,
    setAuth:(data:Object)=>void
}