import { customAlphabet } from "nanoid"
import { createShortenURL } from "../repositories/url.repository.js"
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
    res.send("urlIHHU")
}

export async function openShortenURL(req, res) {
    res.send()
}

export async function deleteURL(req, res) {
    res.send("delete url")
}