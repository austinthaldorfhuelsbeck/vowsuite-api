/**
 * Data Model Interfaces
 */

import { IBaseUser, IUser, ICompany, IGallery } from "../interfaces/objects.interface"

/**
 * Knex object for database connection
 */

import knex from "../db/connection"

export const create = async (newUser: IUser): Promise<IUser> => {
    return knex("users")
        .insert(newUser)
        .returning("*")
        .then((createdUsers) => createdUsers[0])
}

export const read = async (id: number): Promise<IUser> => {
    return knex("users")
        .select("*")
        .where({ user_id: id })
        .then((foundUsers) => foundUsers[0])
}

export const update = async (
    updatedUser: IBaseUser,
    id: number
): Promise<IUser> => {
    return knex("users")
        .select("*")
        .where({ user_id: id })
        .update(updatedUser, "*")
        .then((updatedUsers) => updatedUsers[0])
}

export const destroy = async (id: number): Promise<void> => {
    return knex("users").where({ user_id: id }).del()
}

export const readUserByEmail = async (user_email: string): Promise<IUser> => {
    return knex("users")
        .select("*")
        .where({ email: user_email })
        .then((foundUsers) => foundUsers[0])
}

export const readCompanyByUserID = async (id: number): Promise<ICompany> => {
    return knex("users as u")
        .join("companies as c", "u.user_id", "c.user_id")
        .distinct("c.*")
        .where({ "c.user_id": id })
        .then((foundCompanies) => foundCompanies[0])
}

export const listGalleriesByUserID = async (id: number): Promise<IGallery[]> => {
    return knex("users as u")
        .join("galleries as g", "u.user_id", "g.user_id")
        .distinct("g.*")
        .where({ "g.user_id": id })
}