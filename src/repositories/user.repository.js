import db from "../database/database.connection.js"

export function getUserByEmail(email){
    return db.query(`SELECT * FROM users WHERE email=$1;`, [email])
}

export function getUserById(id){
    return db.query(
        `SELECT users.id, users.name SUM(urls."visitCount") AS "visitCount"
            FROM users
            JOIN urls ON users.id = urls."userId" 
            WHERE id=$1
            GROUP BY users.id, users.name;`, 
        [id])
}

export function getUserRanking(){
    return db.query(`
        SELECT users.id, users.name, COUNT(urls.id) "linksCount", COALESCE(SUM(urls."visitCount"), 0) AS "visitCount"
            FROM users
            LEFT JOIN urls ON users.id = urls."userId"
            GROUP BY users.id, users,name
            ORDER BY "visitCount" DESC, "linkCount" DESC
            LIMIT 10;
    `)
}

export function getUrlsByUsers(userId){
    return db.query(`SELECT id, url, "shortUrl", "visitCount" FROM urls WHERE "userId"=$1`, [userId])
}

export function createUser(name, email, password){
    return db.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3);`, [name, email, password])
}