import { ChangeEvent } from "react";

class BaseHelper {
    public static generateUrl(path: string, params: any = null): string {
        params = params ? `?${new URLSearchParams(params).toString()}` : '';

        return `${process.env.REACT_APP_API_URL}/${path}${params}`;
    }

    public static buildFormData(data: any): FormData {
        const formData = new FormData();

        // Only objects can be used for formData
        if (typeof data !== 'object') {
            return formData;
        }

        for (const key in data) {
            let value = data[key];

            if (typeof value === 'object') {
                value = JSON.stringify(value);
            }

            if (['string', 'number'].includes(typeof value)) {
                formData.append(key, value);
            }

            if (typeof value === 'boolean') {
                formData.append(key, value ? '1' : '0')
            }
        }

        return formData;
    }

    public static inputChange(event: ChangeEvent<HTMLInputElement>, setState: any, getState: any, key: string): void {
        const newState = {...getState};
        // @ts-ignore
        newState[key] = event.currentTarget.value;
        setState(newState);
    }

    public static toggleCheckbox(getState: any, setState: any, key: string): void {
        const newState = {...getState};
        newState[key] = !newState[key];
        setState(newState);
    }

    public static validateSubmit(event: any, callback: any): void {
        if (event.keyCode === 13) {
            callback();
        }
    }
}

export default BaseHelper