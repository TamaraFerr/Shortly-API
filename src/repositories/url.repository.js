import db from "../database/database.connection.js"

export function createShortenURL(url, shortUrl, userId){
    return db.query(`INSERT INTO urls(url, "shortUrl", "userId") VALUES ($1, $2, $3) RETURNING  id, "shortUrl";`, [url, shortUrl, userId])
}

export function getUrlById(id){
    return db.query(`SELECT id, url, "shortUrl" FROM urls WHERE id=$1;`, [id])
}

export function getUserUrlById(id){
    return db.query(`SELECT "userId" FROM urls WHERE id=$1;`, [id])
}

export function getUrlByNAme(shortUrl){
    return db.query(`SELECT id, url FROM urls WHERE "shortUrl"=$1;`, [shortUrl])
}

export function Views(shortUrl){
    return db.query(`UPDATE urls SET "visitCount" = "visitCount" + 1 WHERE "shortUrl"=$1;` [shortUrl])
}

export function deleteURL(id){
    return db.query(`DELETE FROM urls WHERE id=$1`, [id])
}