import Knex from "knex"
import knexConfig from "../../knexfile"

// environment defaults to dev if none specified
let environment: string = "development"
if (process.env.NODE_ENV) environment = process.env.NODE_ENV

const knex = Knex(knexConfig[environment])

export default knex