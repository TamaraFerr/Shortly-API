import bcrypt from "bcrypt"
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
    res.send()
}