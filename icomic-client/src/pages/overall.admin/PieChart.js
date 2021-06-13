import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PieChart } from 'react-minimal-pie-chart'

const CompleteChart = ({ totalStories }) => {
  const { stories } = useSelector(state => state.stories)
  const completed = stories.filter(x => x.isCompleted)
  const unCompleted = stories.filter(x => !x.isCompleted)

  return (
    <>
      <PieChart
        data={[
          { title: 'Đã hoàng thành', value: completed.length, color: '#E38627', key: 'Manh' },
          { title: 'Chưa hoàn thành', value: unCompleted.length, color: '#C13C37' },
        ]}
      />
      <span style={{ background: "#E38627" }}>{`${Math.ceil(completed.length / totalStories * 100)}%`} Đã hoàn thành</span>
      <span style={{ background: "#C13C37" }}>{`${Math.ceil(unCompleted.length / totalStories * 100)}%`} Chưa hoàn thành</span>
    </>
  )
}

export default CompleteChart