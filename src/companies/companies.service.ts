// Data Models
import {
	IBaseCompany,
	IBaseCompanyColor,
	IBaseCompanyUrl,
	IColor,
	ICompany,
	ICompanyColor,
	ICompanyUrl,
} from "../interfaces/objects.interface"

// Config
import knex from "../db/connection"

// Methods
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
	id: number,
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

export const createColor = async (
	newCompanyColor: IBaseCompanyColor,
): Promise<ICompanyColor> => {
	return knex("company_colors")
		.insert(newCompanyColor)
		.returning("*")
		.then((createdCompanyColors) => createdCompanyColors[0])
}

export const readColor = async (id: number): Promise<ICompanyColor> => {
	return knex("company_colors")
		.select("*")
		.where({ company_color_id: id })
		.then((foundCompanyColors) => foundCompanyColors[0])
}

export const updateColor = async (
	updatedCompanyColor: IBaseCompanyColor,
	id: number,
): Promise<ICompanyColor> => {
	return knex("company_colors")
		.select("*")
		.where({ company_color_id: id })
		.update(updatedCompanyColor, "*")
		.then((updatedCompanyColors) => updatedCompanyColors[0])
}

// export const listColors = async (id: number): Promise<IColor[]> => {
// 	return knex("colors as co")
// 		.join("company_colors as cc", "co.color_id", "cc.color_id")
// 		.join("companies as c", "c.company_id", "cc.company_id")
// 		.distinct("co.*")
// 		.where({ "c.company_id": id })
// }

export const listColors = async (id: number): Promise<ICompanyColor[]> => {
	return knex("company_colors").select("*").where({ company_id: id })
}

export const listUrls = async (id: number): Promise<ICompanyUrl[]> => {
	return knex("company_urls").select("*").where({ company_id: id })
}

export const createUrl = async (
	newCompanyUrl: IBaseCompanyUrl,
): Promise<ICompanyUrl> => {
	return knex("company_urls")
		.insert(newCompanyUrl)
		.returning("*")
		.then((createdCompanyUrls) => createdCompanyUrls[0])
}

export const readUrl = async (id: number): Promise<ICompanyUrl> => {
	return knex("company_urls")
		.select("*")
		.where({ company_url_id: id })
		.then((foundCompanyUrls) => foundCompanyUrls[0])
}

export const updateUrl = async (
	updatedCompanyUrl: IBaseCompanyUrl,
	id: number,
): Promise<ICompanyUrl> => {
	return knex("company_urls")
		.select("*")
		.where({ company_url_id: id })
		.update(updatedCompanyUrl, "*")
		.then((updatedCompanyUrl) => updatedCompanyUrl[0])
}
