import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title } from 'chart.js'
// import faker from '@faker-js/faker'
ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)
import { Pie, Line } from 'react-chartjs-2'
import { loadToys } from '../store/actions/toy.actions.js'



export function Dashboard(){
    const toys = useSelector(storeState => storeState.toyModule.toys)
    const [pricePerLabel, setPricePerLabel] = useState({})
    const [labels, setLabels] = useState([])
    const [prices, setPrices] = useState([])

    useEffect(() => {
        loadToys()
        setPricePerLabel(calcPricePerLabel())
        setLabels(Object.keys(pricePerLabel))
        setPrices(Object.values(pricePerLabel))
    }, [])

    function calcPricePerLabel(){
    return toys.reduce((acc, toy) => {
            toy.labels.forEach(label => {
            if (!acc[label]) acc[label] = 0
            acc[label] += toy.price
        })
        return acc
    }, {})
    }

    const dataPricePerLabel = {
    labels: labels,
    datasets: [
        {
        label: 'Price per label',
        data: prices,
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
        },
    ],
    }

    const options = {
  responsive: true,
  plugins: {
    legend: {
    //   position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
}

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const dataLineChart = {
  labels: months,
  datasets: [
    {
      label: 'Dataset 1',
      data: 'bla',
    //   data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: 'bli',
    //   data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};


    console.log(toys)
    console.log(pricePerLabel)

        return (
        <section className="my-chart">
            <h2>Dashboard</h2>
            <Pie data={dataPricePerLabel} />
            <Line options={options} data={dataLineChart} />
        </section>
    )


}








