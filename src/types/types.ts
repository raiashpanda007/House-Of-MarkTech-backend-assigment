export interface SignUpUsers {
    id:string
    name:string
    phone:string
    email:string
    password:string
    createdAt:Date
    updatedAt:Date
}

export interface Tasks {
    id:string
    userId:string
    title:string
    description:string
    createdAt:Date
    updatedAt:Date
}