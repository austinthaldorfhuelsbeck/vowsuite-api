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
    company_name: string
    img_URL: string
    website_URL: string
    youtube_URL: string
    instagram_URL: string
    facebook_URL: string
    vimeo_URL: string
    tiktok_URL: string
    created_at: Date
    updated_at: Date
}

export interface ICompany extends IBaseCompany {
    company_id: number
}

export interface IBaseGallery {
    user_id: number
    gallery_name: string
    img_URL: string
    font: string
    hex1: string
    hex2: string
    hex3: string
    created_at: Date
    updated_at: Date
    videos: IVideo[]
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