import { ChangeEvent } from "react";

class BaseHelper {
    public static generateUrl(path: string): string {
        return `${process.env.REACT_APP_API_URL}/${path}`;
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
        }

        return formData;
    }

    public static inputChange(event: ChangeEvent, setState: any, getState: any, key: string): void {
        const newState = { ...getState };
        // @ts-ignore
        newState[key] = event.currentTarget.value;
        setState(newState);
    }

}

export default BaseHelper