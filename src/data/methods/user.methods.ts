import { Collections } from "data/collections";
import { User } from "data/models";
import { TypedJSON } from "typedjson";

export class UserMethods {
    private _storage: firebase.firestore.Firestore;
    private _userSerializer: TypedJSON<User>;

    constructor(storage: firebase.firestore.Firestore){
        this._storage = storage;
        this._userSerializer = new TypedJSON<User>(User);
    }

    public async getMe(userId: string): Promise<User|null> {
        let rawUser = await this._storage.collection(Collections.USERS_COLLECTION).doc(userId).get();
        if(!rawUser.exists){
            return null;
        }
        return this._userSerializer.parse(rawUser.data()) || null;
    }

    // public async findUserByGoogleID(googleId: string): Promise<User|null> {
    //   try {
    //     await this._storage.collection(Collections.USERS_COLLECTION)
    //     /*.orderByChild('googleid').equalTo(googleId).on("child_added", function(snapshot) {
    //       return snapshot.val();
    //     });*/
    // 
    //   }
    //   catch(error){
    //     throw new Error(`Failed to look up user by Google ID`);
    //   }
    // }

    public async createUser(newUser: User){
      console.log(newUser)
        try{
            await this._storage.collection(Collections.USERS_COLLECTION).doc(newUser.uid).set({... newUser});
            return Promise.resolve();
        }
        catch(error){
            throw new Error(`Failed to create backend user: ${error}`);
        }
    }

    public async setUserTheme(userId: string, theme: 'dark'|'light'){
        try{
            return await this._storage.collection(Collections.USERS_COLLECTION).doc(userId).update({
                Theme: theme
            });
        }
        catch(error){
            throw new Error(`Failed to update backend user: ${error}`);
        }
    }
    
    public async setUserTokens(userId: string, token: string, refresh: string){
        try{
            return await this._storage.collection(Collections.USERS_COLLECTION).doc(userId).update({
                gaaccess: token,
                garefresh: refresh
            });
        }
        catch(error){
            throw new Error(`Failed to update backend user tokens: ${error}`);
        }
    }
}