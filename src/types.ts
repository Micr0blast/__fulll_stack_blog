export interface PostData {
    _id?: string,
    title: string,
    author: string,
    contents: string,
    fullPost?: boolean
}

export interface LoginDetails{
    username: string,
    password: string
}
