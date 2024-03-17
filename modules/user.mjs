
import DBManager from "./storageManager.mjs";


class User {

  constructor(name = "", email = "", pwsHash = "") {
    this.id = null;
    this.name = name;
    this.email = email;
    this.pswHash = pwsHash;
  }

  async save() {
    try {
      if (!this.id) {
        const createdUser = await DBManager.createUser(this);
        if (!createdUser || !createdUser.id){
          throw new Error("failed to create user.");
        }
        this.id = createdUser.id;
    } else {
        await DBManager.updateUser(this);
    }

    } catch (error){
        console.error("error seving/updating User:", error);
        throw new Error("failed to save/update user." + error.message);
    }
     
  }

  delete() {
    
    DBManager.deleteUser(this);
  }
}

export default User;