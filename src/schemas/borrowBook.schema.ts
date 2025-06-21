
import {date, z} from 'zod'


export const borrowBookSchems = z.object({
 book : z.string().min(1,"Book Id required"),
 quantity: z.number().min(1,"At list one required"),
 dueDate: z.preprocess((val) => (val instanceof Date ? new Date(val) : new Date()), z.date())
})