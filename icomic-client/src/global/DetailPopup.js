import { Link } from 'react-router-dom'

const DetailPopup = ({ story }) => {
  return story && (
    <div className='detail-popup'>
      <span className='triangle'></span>
      <div className='detail-container'>
        <Link className='title' to=''>
          {story.title}
        </Link>
        <p><strong><i style={{ color: 'rgb(40, 161, 40)', marginRight: 4 }} className="fas fa-toggle-on"></i>Tình trạng: </strong>{story.isCompleted && "Đã hoàn thành" || "Chưa hoàn thành"}</p>
        <p><strong><i style={{ color: 'rgb(250, 90, 90)', marginRight: 4 }} className="fas fa-heart"></i>Theo dõi : </strong>{story.follows && story.follows.length || "Chưa có người theo dõi"} </p>
        <div className='categories'>
          {
            story.categories && story.categories.length > 0 &&
            story.categories.map(item => (
              <>
                {
                  item && item.category && item.category.title &&
                  <span>#{item.category.title}</span>
                }
              </>
            ))
          }
        </div>
        <p className='short-desc'>
          {
            story.shortDescription || 'Đang cập nhật mô tả...'
          }
        </p>
      </div>
    </div>
  )
}

export default DetailPopup