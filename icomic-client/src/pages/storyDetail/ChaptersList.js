import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Warning from "../../global/Warning"
import { getAllChaptersAsync } from "../../redux/actions/chapters.actions"
import { date } from "../../utils/getDate"
import { Link } from 'react-router-dom'

const ChaptersList = ({ storyId }) => {
  const { chapters } = useSelector(state => state.chapters)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllChaptersAsync({ story: storyId }, true))
  }, [dispatch, storyId])

  return (
    <div className='chapter-list'>
      {
        chapters && chapters.length > 0 &&
        <div className='chapter-list-container'>
          <span className='title'><i className="fas fa-th-list"></i> Danh sách chương: </span>
          <ul className='scroll'>
            {
              chapters.map((item, index) => (
                <li key={item._id}>
                  <Link target="_blank" to={`/chapters/${storyId}/${item._id}/${index + 1}`}>Chương {index + 1}: {item.name}</Link>
                  <span>{date(item.createdAt)}</span>
                </li>
              ))
            }
          </ul>
        </div>
        ||
        <Warning alert='Chưa có chương nào!' />
      }
    </div>
  )
}

export default ChaptersList