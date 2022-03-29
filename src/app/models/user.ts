export interface User {
    name: string,
    email: string,
    password: string
    token?: string;
}

export interface UserDetails {
    name: string,
    email: string,
    password: string,
    role: number,
    position: string,
    phoneNo: string
}