
export interface IUser {
    login: string
    password?: string
}

export interface IUserRegister {
    login: string;
    password?: string;
    email: string;
}
export const UserStoragKey = 'current_user';