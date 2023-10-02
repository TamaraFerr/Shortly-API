import { getUrlsByUsers, getUserById, getUserRanking } from "../repositories/user.repository.js"

export async function getUser(req, res) {
    const {userId} = res.locals

    try{
        const {rows: [user]} = await getUserById(userId)
        const {rows: urls} = await getUrlsByUsers(userId)
        res.send({...user, shortenedUrls: [...urls]})
    } catch(error) {
        res.status(500).send(error.message)
    }
}

export async function getRanking(req, res) {
    try{
        const {rows: ranking} = await getUserRanking()
        res.send(ranking)
    } catch(error) {
        res.status(500).send(error.message)
    }
}