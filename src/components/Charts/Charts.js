import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

const Charts = ({spring, summer, autumn, winter}) => {
  const options = {
    chart: {
      type: 'spline'
    },
    title: {
      text: 'Relative Price Charts'
    },
    xAxis: {
      categories: [''],
      title: {
          text: null
      },
      labels: {
       enabled:false,//default is true
       y : 20, rotation: -45, align: 'right' }
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
      y: -10,
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
        marker: {
          enabled: false
        }  
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
