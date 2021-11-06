export interface ResetPasswordState {
    token: number | null;
    password: string;
    validatePassword: string;
}

export interface ResetPasswordProps {
    match: ResetPasswordPropsMatch;
}

export interface ResetPasswordApplyState {
    email: string;
}

interface ResetPasswordPropsMatch {
    isExact: boolean;
    params: ResetPasswordPropsMatchParams;
    path: string;
    url: string;
}

interface ResetPasswordPropsMatchParams {
    token: number;
}