export interface PostData {
    _id?: string,
    title: string,
    author: string,
    contents: string,
    fullPost?: boolean,
    tags?: [string],
    createdAt: string,
    updatedAt: string,
}

export interface LoginDetails{
    username: string,
    password: string
}
