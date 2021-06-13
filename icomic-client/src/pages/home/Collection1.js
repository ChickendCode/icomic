import { useRef, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { toggleLoading } from '../../redux/actions/web.actions'
import { getAllStories } from '../../services/stories.services'
import Slider from 'react-slick'

const Collection1 = () => {
  const [stories, setStories] = useState([])
  const dispatch = useDispatch()

  const ref = useRef();

  const settings = {
    dots:false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive:[
      {
        breakpoint:575,
        settings:{
          slidesToShow:1,
          dots:true
        }
      }
    ]
  }
  const next = () => {
    ref.current.slickNext();
  }
  const previous = () => {
    ref.current.slickPrev();
  }

  useEffect(() => {
    dispatch(toggleLoading(false))
    getAllStories({ sort: '-createdAt' }, true)
      .then(res => {
        if (res.data && res.data.status) {
          dispatch(toggleLoading(false))
          setStories(res.data.stories)
        } else {
          alert(res.data.message)
        }
      })
      .catch(err => alert('ERROR: ' + err))
      .then(() => dispatch(toggleLoading(false)))
  }, [])

  return (
    <div className='collection1'>

      {
        stories && stories.length >= 5 &&
        <div className='collection1-container'>
          <Slider ref={ref} {...settings}>
            {/* item 1 */}
            <div className='extra-item'>
              <span className='category'>Chapter: {stories[3] && stories[3].chapters && stories[3].chapters.length || 'Chưa có chương'}</span>
              <Link to={`/stories/${stories[3]._id}`}>
                <div className='image-wrapper'>
                  <img src={`${stories[3].image && stories[3].image.url}`} alt="" />
                  <div className='title'>
                    <span>{stories[3].title}</span>
                  </div>
                </div>
              </Link>
            </div>
            {/* item2 */}
            <div className='extra-item'>
              <span className='category'>Chapter: {stories[0] && stories[0].chapters && stories[0].chapters.length}</span>
              <Link to={`/stories/${stories[0]._id}`}>
                <div className='image-wrapper'>
                  <img src={`${stories[0].image && stories[0].image.url}`} alt="" />
                  <div className='title'>
                    <span>{stories[0].title}</span>
                  </div>
                </div>
              </Link>
            </div>
            {/* item3 */}
            <div className='extra-item'>
              <span className='category'>Chapter: {stories[1] && stories[1].chapters && stories[1].chapters.length || 'Chưa có chương'}</span>
              <Link to={`/stories/${stories[1]._id}`}>
                <div className='image-wrapper'>
                  <img src={`${stories[1].image && stories[1].image.url}`} alt="" />
                  <div className='title'>
                    <span>{stories[1].title}</span>
                  </div>
                </div>
              </Link>
            </div>
            {/* item4 */}
            <div className='extra-item'>
              <span className='category'>Chapter: {stories[2] && stories[2].chapters && stories[2].chapters.length || 'Chưa có chương'}</span>
              <Link to={`/stories/${stories[2]._id}`}>
                <div  className='image-wrapper'>
                  <img src={`${stories[2].image && stories[2].image.url}`} alt="" />
                  <div className='title'>
                    <span>{stories[2].title}</span>
                  </div>
                </div>
              </Link>
            </div>
            {/* item5 */}
            <div className='extra-item'>
              <span className='category'>Chapter: {stories[4] && stories[4].chapters && stories[4].chapters.length || 'Chưa có chương'}</span>
              <Link to={`/stories/${stories[4]._id}`}>
                <div  className='image-wrapper'>
                  <img src={`${stories[4].image && stories[4].image.url}`} alt="" />
                  <div className='title'>
                    <span>{stories[4].title}</span>
                  </div>
                </div>
              </Link>
            </div>
            {/*  */}
          </Slider>
        </div>
      }
    </div>
  )
}

export default Collection1
