import { string, z } from "zod"

export const registerSchema = z.object({
    username : z.string().min(5),
    password : z.string().min(4)
})

export const loginSchema = z.object({
    username : z.string(),
    password : z.string()
})

export const flowCreateSchema = z.object({
    availableTriggerId: z.string(),
    triggerMetadata: z.any().optional(),
    actions : z.array(z.object({
        availableAction : z.string(),
        metadata : z.any().optional()
    }))
})

export const triggerCreateSchema = z.object({
    id : z.string().optional(),
    name : z.string()
})

export const actionCreateSchema = z.object({
    id : z.string().optional(),
    name : z.string()
})