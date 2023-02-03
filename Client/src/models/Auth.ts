export interface User {
    id: number;
    email: string;
}

export interface Auth {
    user: User;
    token: string;
}