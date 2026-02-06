export interface User {
    fullName:string,
    email:string,
    password:string,
    role?:'admin' | 'user'
}