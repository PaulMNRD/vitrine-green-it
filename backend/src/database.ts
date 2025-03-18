import {Surreal} from "surrealdb";

export const setupDatabase = async () => {
    try {
        const db = new Surreal();

        await db.connect("http://surrealdb:8000");

        await db.use({
            namespace: "GreenIT",
            database: "VitrineDB"
        });

        await db.signin({
            username: "root",
            password: "root"
        });

        console.log("Successfully connected to the database");

        return db;

    } catch (error) {
        console.error("Impossible to connect to the database :", error);
        throw error;
    }
};