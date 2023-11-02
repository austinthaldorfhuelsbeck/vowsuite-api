/**
 * Data Model Interfaces
 */

import { IBaseCompany, IColor, ICompany, IGallery } from "../interfaces/objects.interface"

/**
 * Knex object for database connection
 */

import knex from "../db/connection"

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

export const readByUserId = async (id: number): Promise<ICompany> => {
    return knex("companies")
        .select("*")
        .where({ user_id: id })
        .then((foundCompanies) => foundCompanies[0])
}

export const listColors = async (id: number): Promise<IColor[]> => {
    return knex("colors as co")
        .join("companyColors as cc", "co.color_id", "cc.color_id")
        .join("companies as c", "c.company_id", "cc.company_id")
        .distinct("co.*")
        .where({ "c.company_id": id })
}