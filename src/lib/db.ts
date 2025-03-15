import mysql from "mysql2/promise";

const dbConfig = {
    host: "localhost",
    user: "root",
    password: "1User1234",
    database: "blog",
};

// Bağlantıyı oluşturup döndüren fonksiyon
export async function getDBConnection() {
    return await mysql.createConnection(dbConfig);
}
