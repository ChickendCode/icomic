import { Link } from 'react-router-dom'

const Breadcrumb = ({ category, story, chapter }) => {
  return (
    <div className='my-bread'>
      <span>
        <Link to='/'>
          Trang chủ
        <i className="fas fa-hand-point-right"></i>
        </Link>
      </span>
      {
        category &&
        <span>
          {
            story &&
            <Link to='/'>
              {category}
              <i className="fas fa-hand-point-right"></i>
            </Link>
            ||
            <span>
              {category}
            </span>
          }
        </span>
      }
      {
        story &&
        <span>
          {
            chapter &&
            <Link to={story.url}>
              {story.name}
              <i className="fas fa-hand-point-right"></i>
            </Link>
            ||
            <span>
              {story.name}
            </span>
          }
        </span>
      }
      {
        chapter &&
        <span>
          {chapter}
        </span>
      }
    </div>
  )
}

export default Breadcrumb