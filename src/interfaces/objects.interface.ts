export interface IBaseUser {
    user_name: string
    email: string
    img_URL: string
    created_at: Date
    updated_at: Date
    company: ICompany
    galleries: IGallery[]
}

export interface IUser extends IBaseUser {
    user_id: number
}

export interface IBaseCompany {
    user_id: number
    font_id: number
    company_name: string
    img_URL: string
    created_at: Date
    updated_at: Date
    colors: IColor[]
    company_urls: ICompanyUrl[]
}

export interface ICompany extends IBaseCompany {
    company_id: number
}

export interface IBaseGallery {
    user_id: number
    font_id: number
    gallery_name: string
    img_URL: string
    created_at: Date
    updated_at: Date
    videos: IVideo[]
    colors: IColor[]
}

export interface IGallery extends IBaseGallery {
    gallery_id: number
}

export interface IBaseVideo {
    gallery_id: number
    video_URL: string
    video_name: string
    img_URL: string
    views: number
    downloads: number
    is_displayed: boolean
    created_at: Date
    updated_at: Date
}

export interface IVideo extends IBaseVideo {
    video_id: number
}

export interface IBaseFont {
    font_name: string
    created_at: Date
    updated_at: Date
}

export interface IFont extends IBaseFont {
    font_id: number
}

export interface IBaseColor {
    hex: string
    created_at: Date
    updated_at: Date
}

export interface IColor extends IBaseColor {
    color_id: number
}

export interface IBaseGalleryColor {
    gallery_id: number
    color_id: number
    created_at: Date
    updated_at: Date
}

export interface IGalleryColor extends IBaseGalleryColor {
    gallery_color_id: number
}

export interface IBaseCompanyColor {
    company_id: number
    color_id: number
    created_at: Date
    updated_at: Date
}

export interface ICompanyColor extends IBaseCompanyColor {
    company_color_id: number
}

export interface IBaseCompanyUrl {
    company_id: number
    label: string
    target: string
    created_at: Date
    updated_at: Date
}

export interface ICompanyUrl extends IBaseCompanyUrl {
    company_url_id: number
}