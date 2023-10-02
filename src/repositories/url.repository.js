import db from "../database/database.connection.js"

export function createShortenURL(url, shortUrl, userId){
    return db.query(`INSERT INTO urls(url, "shortUrl", "userId") VALUES ($1, $2, $3) RETURNING  id, "shortUrl";`, [url, shortUrl, userId])
}