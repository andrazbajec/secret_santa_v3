export interface CreateRoomState {
    title: string;
    password: string;
    shouldJoin: boolean;
    isPrivate: boolean;
    maxAmount: number | '';
    dateOfExchange: string;
    rules: string;
}

export interface JoinRoomState {
    roomUrl: string;
    password: string;
}

export interface RoomDB {
    title: string;
    roomUrl: number | null;
    roomID: number | null;
    users: User[];
    isNamePicked: boolean;
    rules: string;
    dateOfExchange: string | null;
    maxAmount: number | null;
    pickedUser: PickedUserData | null;
}

interface User {
    user: string;
}

export interface RoomListDB {
    rooms: RoomListDBElement[];
}

export interface RoomListDBElement {
    RoomID: number;
    Title: string;
    RoomUrl: number;
    Users: number;
    Author: string;
}

export interface RoomDataResponse {
    DateCreated: string;
    DateOfExchange: string | null;
    MaxAmount: number | null;
    RoomID: number;
    RoomUrl: number;
    RoomUsers: User[];
    Rules: string;
    Title: string;
    UserID: number;
    PickedUser: PickedUserData | null;
}

interface PickedUserData {
    UserID: number;
    Username: string;
    Name: string;
}