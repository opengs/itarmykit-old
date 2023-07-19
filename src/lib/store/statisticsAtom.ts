import { atom } from 'jotai'

export const efficiencyAtom = atom('0')
export const incomingTrafficAtom = atom('0 Bytes')
export const outgoingTrafficAtom = atom('0 Bytes')
export const timeAttackAtom = atom(0)
export const chartAtom = atom<number[]>([...Array(61).keys()].map(() => 0))
export const hightBarAtom = atom(1000)
export const changeChartAtom = atom(false)
export const logsAtom = atom('')

export const setChartAtom = atom(null, (get, set, newRequests: number) => {
    let chart = get(chartAtom)
    chart.shift()
    chart.push(newRequests)

    set(chartAtom, chart)

    const checkHightBar = get(chartAtom).find((el) => el > get(hightBarAtom))

    set(hightBarAtom, checkHightBar)
    set(changeChartAtom, !get(changeChartAtom))
})

export const convertBytes = (bytes: number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']

    if (bytes == 0) {
        return 'n/a'
    }

    const i = Number(Math.floor(Math.log(bytes) / Math.log(1024)))

    if (i == 0) {
        return bytes + ' ' + sizes[i]
    }

    return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i]
}
