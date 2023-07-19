import { changeChartAtom, chartAtom, hightBarAtom } from '@store/statisticsAtom'
import { BarElement, CategoryScale, Chart as ChartJS, LinearScale, Tooltip } from 'chart.js'
import { useAtomValue } from 'jotai'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip)

export const Chart = () => {
    const labels = [...Array(61).keys()].map((value) => value).reverse()
    const dataChart = useAtomValue(chartAtom)
    const hightBar = useAtomValue(hightBarAtom)
    useAtomValue(changeChartAtom)

    return (
        <div className='w-[438px] h-[233px] bg-[#F3F6FD] rounded-lg dark:bg-[#293444] p-2 drop-shadow-md'>
            <Bar
                data={{
                    labels: labels,
                    datasets: [
                        {
                            data: dataChart,
                            backgroundColor: '#C4D1F3',
                            borderRadius: 30,
                            grouped: false,
                            minBarLength: 4,
                            maxBarThickness: 10,
                            barThickness: 3.5,
                            barPercentage: 0.5,
                        },
                    ],
                }}
                options={{
                    scales: {
                        x: {
                            border: {
                                dash: [2, 3],
                                color: '#D0DAF5',
                            },
                        },
                        y: {
                            max: hightBar,
                        },
                    },
                }}
            />
        </div>
    )
}
