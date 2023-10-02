import bcrypt from "bcrypt"
import {v4 as uuid} from "uuid"
import { createSession } from "../repositories/auth.repository.js"
import { createUser, getUserByEmail } from "../repositories/user.repository.js"

export async function signUp(req, res) {
    const {name, email, password} = req.body

    try {
        const user = await getUserByEmail(email)
        if(user.rowCount !== 0) return res.status(409).send({message: "Email já está cadastrado!"})

        const hash = bcrypt.hashSync(password, 10)
        await createUser(name, email, hash)
        res.sendStatus(201)
    } catch(error) {
        res.status(500).send(error.message)
    }
}

export async function signIn(req, res) {
    const {email, password} = req.body

    try{
        const user = await getUserByEmail(email)
        if(user.rowCount === 0) return res.status(401).send({message: "Email não está cadastrado!"})

        const correctPassword = bcrypt.compare(password, user.rows[0].password)
        if(!correctPassword) return res.status(401).send({message: "Senha incorreta!"})

        const token = uuid()
        await createSession(user.rows[0].id, token)
        res.send({token})
    } catch(error) {
        res.status(500).send(error.message)
    }
}