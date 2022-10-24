import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

const Charts = ({spring, summer, autumn, winter}) => {
  const options = {
    chart: {
      type: 'spline'
    },
    title: {
      text: 'My chart'
    },
    series: [
      {
        data: spring
      },
      {
        data: summer
      },
      {
        data: autumn
      },
      {
        data: winter
      }
    ]
  }

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  )
}

export default Charts
