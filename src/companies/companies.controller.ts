/**
 * Required External Modules and Interfaces
 */
import { Request, Response } from "express";
import { IBaseCompany, ICompany } from "../interfaces/objects.interface";
import * as CompaniesValidation from "./companies.validation";
import * as CompaniesService from "./companies.service";
import { errorHandler } from "../middleware/error.handlers";

/**
 * Controller Definitions
 */

const create = async (req: Request, res: Response) => {
    try {
        const company: ICompany = res.locals.validCompany
        company.company_id = new Date().valueOf() // add company ID
        const newCompany: ICompany = await CompaniesService.create(company)
        res.status(201).json(newCompany)
    } catch (err) {
        errorHandler(err, res)
    };
};

const read = async (req: Request, res: Response) => {
    try {
        const company: ICompany = res.locals.foundCompany
        res.json(company)
    } catch (err) {
        errorHandler(err, res)
    }
}

const update = async (req: Request, res: Response) => {
    try {
        const updatedCompany: IBaseCompany = res.locals.validCompany
        const id: number = parseInt(res.locals.foundCompany.company_id)
        const responseCompany: ICompany = await CompaniesService.update(updatedCompany, id)
        res.json(responseCompany)
    } catch (err) {
        errorHandler(err, res)
    }
}

const destroy = async (req: Request, res: Response) => {
    try {
        const id: number = parseInt(res.locals.foundCompany.company_id);
        const response: void = await CompaniesService.destroy(id);
        res.json(response)
    } catch (err) {
        errorHandler(err, res)
    }
}

/**
 * Exports
 */

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
    delete: [CompaniesValidation.companyExists, destroy]
};