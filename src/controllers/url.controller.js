import { customAlphabet } from "nanoid"
import { createShortenURL, getUrlById, getUrlByNAme, getUserUrlById, Views } from "../repositories/url.repository.js"
const nanoid = customAlphabet('1234567890abcdef', 8)

export async function shortenURL(req, res) {
    const {url} = req.body
    const shortURL = nanoid()
    const {userId} = res.locals
    
    try{
        const URL = await createShortenURL(url, shortURL, userId)
        res.status(201).send(URL.rows[0])
    } catch(error){
        res.status().send()
    }
}

export async function getURL(req, res) {
    const {id} = req.params

    try{
        const URL = await getUrlById(id)
        if(URL.rowCount === 0) return res.status(404).send({message: "Url não existe!"})

        res.send(URL.rows[0])
    } catch(error) {
        res.status(500).send(error.message)
    }
}

export async function openShortenURL(req, res) {
    const {shortUrl} = req.params
    try{
        const URL = await getUrlByNAme(shortUrl)
        if(URL.rowCount === 0 ) return res.status(404).send({message: "Url não existe!"})

        await Views(shortUrl)
        res.redirect(URL.rows[0].url)
    } catch(error) {
        res.status(500).send(error.message)
    }
}

export async function deleteURL(req, res) {
    const {id} = req.params
    const {userId} = res.locals

    try{
        const URL = await getUserUrlById(id)
        if(URL.rowCount === 0) return res.status(404).send({message: "Url não existe!"})
        if(URL.rows[0].userId !== userId) return res.status(401).send({message: "você só pode deletar o que você criou!"})
        
        await deleteURL(id)
        res.status(204)
    } catch(error) {
        res.status(500).send(error.message)
    }
}