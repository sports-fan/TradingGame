import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

const Charts = ({spring, summer, autumn, winter, currentYear}) => {
  const options = {
    chart: {
      type: 'spline'
    },
    title: {
      text: 'Relative Price Charts'
    },
    xAxis: {
      categories: currentYear > 2022 ? [currentYear -2, currentYear-1, currentYear] : (currentYear > 2021 ? [currentYear-1, currentYear] : [currentYear]),
      accessibility: {
        rangeDescription: 'Range: 2021 to 2031',
        description: 'Years'
      }
    },
    yAxis: {
      title: {
        text: 'Prices'
      },
      labels: {
        formatter: function () {
          return this.value;
        }
      }
    },
    legend: {
      layout: 'vertical',
      align: 'left',
      verticalAlign: 'top',
      x: 50,
      y: 42,
      floating: true,
      borderWidth: 1,
      backgroundColor:
        Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF'
    },
    plotOptions: {
      series: {
        label: {
          connectorAllowed: false
        },
        pointStart: 2021
      }
    },
    series: [
      {
        name: 'Spring',
        color: '#afb84e',
        data: spring
      },
      {
        name: 'Summer',
        color: '#e06e22',
        data: summer
      },
      {
        name: 'Autumn',
        color: '#f9a825',
        data: autumn
      },
      {
        name: 'Winter',
        color: '#04aaf7',
        data: winter
      }
    ],
    responsive: {
      rules: [{
        condition: {
          maxWidth: 500
        },
        chartOptions: {
          legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom'
          }
        }
    }]
  }
  }

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  )
}

export default Charts
