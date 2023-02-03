export const differenceBetweenDates = (start: Date, end: Date) => {
    return (end.getTime() - start.getTime())
}

export const getTimeOut = (time: Date, timeOutSeconds: number) => {
    const elapsedTimeMillis = differenceBetweenDates(time, new Date())
    return Math.round(timeOutSeconds - elapsedTimeMillis / 1000)
}

export const genereateCode = (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString()
}