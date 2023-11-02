// External Modules
import { Request, Response } from "express"
import { IBaseCompany, ICompany, IGallery } from "../interfaces/objects.interface"
import * as CompaniesValidation from "./companies.validation"
import * as CompaniesService from "./companies.service"
import * as GalleriesService from "../galleries/galleries.service"
import { errorHandler } from "../middleware/error.handlers"

// Controllers
const create = async (req: Request, res: Response) => {
    try {
        const company: ICompany = res.locals.validCompany
        company.company_id = new Date().valueOf() // add company ID
        const newCompany: ICompany = await CompaniesService.create(company)
        res.status(201).json(newCompany)
    } catch (err) {
        errorHandler(err, res)
    }
}

const read = async (req: Request, res: Response) => {
    try {
        const responseCompany: ICompany = res.locals.foundCompany
        res.status(200).json(responseCompany)
    } catch (err) {
        errorHandler(err, res)
    }
}

const update = async (req: Request, res: Response) => {
    try {
        const updatedCompany: IBaseCompany = res.locals.validCompany
        const id: number = parseInt(res.locals.foundCompany.company_id)
        const responseCompany: ICompany = await CompaniesService.update(updatedCompany, id)
        res.status(204).json(responseCompany)
    } catch (err) {
        errorHandler(err, res)
    }
}

const destroy = async (req: Request, res: Response) => {
    try {
        const id: number = parseInt(res.locals.foundCompany.company_id)
        const response: void = await CompaniesService.destroy(id)
        res.status(200).json(response)
    } catch (err) {
        errorHandler(err, res)
    }
}

const readByUserId = async (req: Request, res: Response) => {
    try {
        const id: number = parseInt(String(req.query.user_id))
        const response: ICompany = await CompaniesService.readByUserId(id)
        res.status(204).json(response)
    } catch (err) {
        errorHandler(err, res)
    }
}

// const listCompanyColors = async (req: Request, res: Response) => {
//     try {
        
//     }
// }

// Exports
export const CompaniesController = {
    create: [
        CompaniesValidation.isValidCompany,
        CompaniesValidation.appendData,
        create
    ],
    read: [CompaniesValidation.companyExists, read],
    update: [CompaniesValidation.companyExists,
        CompaniesValidation.isValidCompany,
        update
    ],
    delete: [CompaniesValidation.companyExists, destroy],
    readCompanyByEmail: [readCompanyByEmail],
    readCompanyByCompanyID: [CompaniesValidation.companyExists, readCompanyByCompanyID],
    listGalleriesByCompanyID: [CompaniesValidation.companyExists, listGalleriesByCompanyID]
}