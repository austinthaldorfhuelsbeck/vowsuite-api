/**
 * Data Model Interfaces
 */
import { IBaseCompany, ICompany } from "../interfaces/objects.interface";

/**
 * Knex object for database connection
 */
import knex from "../db/connection";

export const create = async (newCompany: ICompany): Promise<ICompany> => {
    return knex("companies")
        .insert(newCompany)
        .returning("*")
        .then((createdCompanies) => createdCompanies[0])
}

export const read = async (id: number): Promise<ICompany> => {
    return knex("companies")
        .select("*")
        .where({ company_id: id })
        .then((foundCompanies) => foundCompanies[0])
}

export const update = async (
    updatedCompany: IBaseCompany,
    id: number
): Promise<ICompany> => {
    return knex("companies")
        .select("*")
        .where({ company_id: id })
        .update(updatedCompany, "*")
        .then((updatedCompanies) => updatedCompanies[0])
}

export const destroy = async (id: number): Promise<void> => {
    return knex("companies").where({ company_id: id }).del()
}