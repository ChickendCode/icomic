import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCategoriesAsync } from '../../redux/actions/categories.actions'
import { getAllStories } from '../../services/stories.services'

const CategoriesChart = () => {
  const {categories} = useSelector(state => state.categories)
  const [data, setData] = useState({})
  
  const [options, setOptions] = useState({
    title: {
      text: 'Thể loại'
    },
    xAxis: {
      categories: [],
    },
    series: [{
      data: []
    }]
  })

  useEffect(() => {
    if (categories && categories.length > 0) {
      const promises = []
      let tempData = []
      categories.forEach(item => {
        if (item && item._id) {
          promises.push(
            getAllStories({ categories: [item._id], page: -1 })
              .then(res => {
                if (res.data && res.data.status) {
                  tempData.push({
                    category: item.title,
                    quantity: res.data.stories.length
                  })
                } else {
                  alert('ERROR! ' + res.data.message)
                }
              })
              .catch((err) => {
                alert('ERROR! ' + err)
              })
          )
        }
      })

      Promise.all(promises)
        .then(() => {
          setData({
            quantities: tempData.map(item => item.quantity),
            categories: tempData.map(item => item.category),
          })
        })
    }
  }, [categories])

  useEffect(() => {
    setOptions(
      {
        ...options,
        xAxis: {
          categories: data.categories,
        },
        series: [{
          data: data.quantities
        }]
      })
  }, [data])

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
    />
  )
}

export default CategoriesChart