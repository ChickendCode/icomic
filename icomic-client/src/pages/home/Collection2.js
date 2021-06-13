import { Link } from 'react-router-dom'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toggleLoading } from '../../redux/actions/web.actions'
import { getAllStories } from '../../services/stories.services'
import getCate from '../../utils/getCategory'
import DetailPopup from '../../global/DetailPopup'

const Collection2 = () => {
  const [updated, setupdated] = useState([])
  const [hot, setHot] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(toggleLoading(false))
    getAllStories({ sort: '-updatedChap', page: -1 }, true)
      .then(res => {
        if (res.data && res.data.status) {
          dispatch(toggleLoading(false))
          setupdated(res.data.stories)
          getHotStories(res.data.stories)
        } else {
          alert(res.data.message)
        }
      })
      .catch(err => alert('ERROR: ' + err))
      .then(() => dispatch(toggleLoading(false)))
  }, [])

  const getHotStories = (stories) => {
    const newStories = [...stories]
    const sortedStories = newStories.sort((a, b) => b.follows.length - a.follows.length)
    setHot(sortedStories)
  }

  return (
    <div className='collection2'>
      <div className='collection2-container'>
        <div className='row'>
          <div className='col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8'>
            <h5 style={{ fontWeight: 'bold', color: 'var(--primary-color-2)' }}>Truyện mới cập nhật</h5>
            {
              updated && updated.length > 0 &&
              <div className='left-container'>
                <div className='row custom-gutter'>
                  {
                    updated.map((item, index) => {
                      if (index < 6)
                        return (
                          <div key={item._id} className='col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 custom-gutter'>
                            <div className='item'>
                              <DetailPopup story={item} />
                              <div className='thumb'>
                                <Link to={`/stories/${item._id}`}>
                                  <div className='image-wrapper'>
                                    <img data-aos="zoom-in"  data-aos-easing="linear" data-aos-duration="1500" src={item.image && item.image.url || '/images/product_default_img.png'} />
                                  </div>
                                </Link>
                              </div>
                              <div className='info'>
                                <Link to={`/stories/${item._id}`}>{item.title}</Link>
                                <p>{
                                  item.chapters && item.chapters.length > 0 &&
                                  `${item.chapters.length} Chương`
                                  ||
                                  'Chưa có chương'
                                }</p>
                              </div>
                            </div>
                          </div>
                        )
                    })
                  }
                </div>
              </div>
            }
          </div>
          <div className='col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4'>
            <h5 style={{ fontWeight: 'bold', color: 'var(--primary-color-2)' }}>Truyện hot</h5>
            {
              hot && hot.length > 0 &&
              <div className='right-container scroll'>
                <div>
                  {
                    hot.map((item, index) => {
                      if (index < 8)
                        return (
                          <div key={item._id} className='item' data-aos="fade-left"
                          data-aos-duration="500">
                            <span className={`count stt${index + 1}`}>
                              {`${index + 1 < 9 && `0${index + 1}` || index + 1}`}
                            </span>
                            <div className="thumb">
                              <Link to={`/stories/${item._id}`}>
                                <div className='image-wrapper'>
                                  <img src={item.image && item.image.url || '/images/product_default_img.png'} />
                                </div>
                              </Link>
                            </div>
                            <div className='info'>
                              <Link to={`/stories/${item._id}`}>
                                {item.title}
                              </Link>
                              <p>Chapter: {item.chapters && item.chapters.length || "Updating..."}</p>
                            </div>

                          </div>
                        )
                    })
                  }
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Collection2