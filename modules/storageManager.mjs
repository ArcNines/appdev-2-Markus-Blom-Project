import pg from "pg"
import SuperLogger from "./SuperLogger.mjs";

if (process.env.DB_CONNECTIONSTRING == undefined) {
    throw ("You forgot the db connection string");
}


class DBManager {

    #credentials = {};

    constructor(connectionString) {
        this.#credentials = {
            connectionString,
            ssl: (process.env.DB_SSL === "true") ? process.env.DB_SSL : false
        };

    }

    async updateUser(user) {

        const client = new pg.Client(this.#credentials);

        try {
            await client.connect();
            const output = await client.query('Update "public"."Users" set "name" = $1, "email" = $2, "password" = $3 where id = $4;', [user.name, user.email, user.pswHash, user.id]);

        } catch (error) {
           
        } finally {
            client.end();
        }

        return user;

    }

    async deleteUser(user) {

        const client = new pg.Client(this.#credentials);

        try {
            await client.connect();
            const output = await client.query('Delete from "public"."Users"  where id = $1;', [user.id]);

        } catch (error) {

        } finally {
            client.end(); 
        }

        return user;
    }

    async createUser(user) {

        const client = new pg.Client(this.#credentials);

        try {
            await client.connect();
            const output = await client.query('INSERT INTO public."Users"(name, email, password) VALUES($1::Text, $2::Text, $3::Text) RETURNING id;', [user.name, user.email, user.pswHash]);

          
            if (output.rows.length == 1) {
                user.id = output.rows[0].id;
            }

        } catch (error) {
            console.error(error);
        
        } finally {
            client.end();
        }

        return user;

    }

    

}








export default new DBManager(process.env.DB_CONNECTIONSTRING);

//