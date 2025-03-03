import mysql from "mysql2/promise";

const dbConfig = {
    host: "localhost",
    user: "root",
    password: "rootpassword",
    database: "blog",
};

// Bağlantıyı oluşturup döndüren fonksiyon
export async function getDBConnection() {
    return await mysql.createConnection(dbConfig);
}
