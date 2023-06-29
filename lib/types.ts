export type registrationInfo = {
    building: number,
    number: number,
    reported_at: Date | null,
    available: boolean
}

export type ReportedLocker = {
    building_id: number,
    num: number,
    name: string,
    email: string,
    reported_at: Date
}