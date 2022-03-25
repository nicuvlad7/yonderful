
export interface loginUser {
    id?: number,
    name?: string,
    email: string,
    password: string,
    token?: string;
}

export interface loginUserToStore {
    email: string,
    token: string;
}