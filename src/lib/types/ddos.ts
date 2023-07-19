import { z } from 'zod'

export const infoschema = z.object({
    level: z.string(),
    ts: z.number(),
    caller: z.string(),
    msg: z.string(),
    target: z.string(),
})

export type infoType = z.infer<typeof infoschema>

export const DdosSchema = z.object({
    level: z.string(),
    ts: z.number(),
    caller: z.string(),
    msg: z.string(),
    total: z.object({
        requests_attempted: z.number(),
        requests_sent: z.number(),
        responses_received: z.number(),
        bytes_sent: z.number(),
        bytes_received: z.number(),
    }),
    targets: z.record(
        z.string(),
        z.object({
            requests_attempted: z.number(),
            requests_sent: z.number(),
            responses_received: z.number(),
            bytes_sent: z.number(),
            bytes_received: z.number(),
        })
    ),
    total_since_last_report: z.object({
        requests_attempted: z.number(),
        requests_sent: z.number(),
        responses_received: z.number(),
        bytes_sent: z.number(),
        bytes_received: z.number(),
    }),
    targets_since_last_report: z.record(
        z.string(),
        z.object({
            requests_attempted: z.number(),
            requests_sent: z.number(),
            responses_received: z.number(),
            bytes_sent: z.number(),
            bytes_received: z.number(),
        })
    ),
})

export type DdosType = z.infer<typeof DdosSchema>
