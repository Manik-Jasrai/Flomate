import {  z } from "zod"

export const registerSchema = z.object({
    username: z.string().min(5),
    password: z.string().min(4)
})
export type registerInputSchema = z.infer<typeof registerSchema>

export const loginSchema = z.object({
    username: z.string(),
    password: z.string()
})
export type loginInputSchema = z.infer<typeof loginSchema>

export const flowCreateSchema = z.object({
    availableTriggerId: z.string(),
    triggerMetadata: z.any().optional(),
    actions: z.array(z.object({
        availableAction: z.string(),
        metadata: z.any().optional()
    }))
})
export type flowCreateInputSchema = z.infer<typeof flowCreateSchema>

export const triggerCreateSchema = z.object({
    id: z.string().optional(),
    name: z.string()
})
export type triggerCreateInputSchema = z.infer<typeof triggerCreateSchema>

export const actionCreateSchema = z.object({
    id: z.string().optional(),
    name: z.string()
})
export type actionCreateInputSchema = z.infer<typeof actionCreateSchema>
