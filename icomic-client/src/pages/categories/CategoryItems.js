import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import DetailPopup from "../../global/DetailPopup"
import Warning from "../../global/Warning"
import { toggleLoading } from "../../redux/actions/web.actions"
import { getAllStories } from "../../services/stories.services"

const CategoryItems = ({ category }) => {

  const dispatch = useDispatch()

  const [currentItems, setCurrentItems] = useState([])

  useEffect(() => {

    if (category && category._id) {
      dispatch(toggleLoading(true))

      getAllStories({ categories: [category._id] }, true)
        .then(res => {
          if (res.data && res.data.status) {
            dispatch(toggleLoading(false))
            setCurrentItems(res.data.stories)
          } else {
            alert(res.data.message)
          }
        })
        .catch(err => alert('Error: ' + err))
        .then(() => dispatch(toggleLoading(false)))
    }

  }, [category && category._id || category])

  return (
    <div className='stories-list'>
      {
        category &&
        <div className='stories-list-container'>
          <div className='category-name' data-aos="zoom-out-right" data-aos-duration="1000">
            <span>{category.title}</span>
          </div>

          {
            currentItems && currentItems.length > 0 &&
            <div className='row custom-gutter'>
              {
                currentItems.map(item => (
                  <div key={item._id} className='col-12 col-sm-12 col-md-6 col-lg-3 col-xl-2 custom-gutter'>
                    <div className='item-container'>
                      <DetailPopup story={item} />
                      <div className='thumb'>
                        <Link to={`/stories/${item._id}`}>
                          <img data-aos="fade-down" data-aos-easing="linear" data-aos-duration="700" src={item.image && item.image.url || '/images/product_default_img.png'} />
                        </Link>
                      </div>
                      <div className='info'>
                        <Link to={`/stories/${item._id}`}>{item.title || 'Chưa cập nhật!'}</Link>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
            ||
            <Warning alert='Chưa có truyện!' />
          }
        </div>
      }
    </div>
  )
}

export default CategoryItems