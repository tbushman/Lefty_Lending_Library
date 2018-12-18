import {jsonObject, jsonMember} from 'typedjson'

export enum UiTheme{
    "dark",
    "light"
}

export enum UserLocation{
    "NA",
    "South valley",
    "Central Valley",
    "North Valley",
    "Logan",
    "Park City"
}

export interface IUser {
    uid: string,
    DisplayName: string,
    Email: string,
    Phone: string,
    Location: UserLocation
}

@jsonObject
export class User implements IUser {
    @jsonMember({ constructor: String })
    uid: string;

    @jsonMember({ constructor: String })
    DisplayName: string;

    @jsonMember({ constructor: String })
    Phone: string;

    Location: UserLocation;

    @jsonMember({ constructor: String })
    Email: string;

    public static initializeBackendUserFromFirebaseUser(firebaseUser: firebase.User): IUser{
        let user = new User();
        user.uid = firebaseUser.uid;
        user.DisplayName = firebaseUser.displayName ? firebaseUser.displayName : "NA";
        user.Email = firebaseUser.email || "na@notprovided.com";
        return user;
    }
}