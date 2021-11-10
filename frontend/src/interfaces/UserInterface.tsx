export interface SettingsState {
    Name: string;
    Email: string;
    Password: string;
    Loading: SettingsStateLoading
}

export interface SettingsStateLoading {
    Name: boolean;
    Email: boolean;
    Password: boolean;
}