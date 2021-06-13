import { createElement, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toggleLoading } from "../../redux/actions/web.actions"
import { followStory, unFollowStory } from "../../services/stories.services"
import { date } from "../../utils/getDate"

const MainInfo = ({ storyInfo }) => {
  const { user } = useSelector(state => state.users)
  const [isFollowed, setIsFollowed] = useState(false)
  const [follows, setFollows] = useState(0)
  const dispatch = useDispatch()

  useEffect(() => {
    if (storyInfo && storyInfo.follows && user && user._id) {
      let check = storyInfo.follows.findIndex(x => x.author._id === user._id)
      setFollows(storyInfo.follows.length)
      if (check !== -1) {
        setIsFollowed(true)
      }
    }
  }, [storyInfo, user])

  const follow = () => {
    followStory(storyInfo._id, user._id)
      .then(res => {
        if (res.data && res.data.status) {
          setFollows(follows + 1)
          setIsFollowed(true)
        } else {
          alert(res.data.message)
        }
      })
      .catch(err => alert('ERROR: ' + err))
      .then(() => dispatch(toggleLoading(false)))
  }

  const unfollow = () => {
    unFollowStory(storyInfo._id, user._id)
      .then(res => {
        if (res.data && res.data.status) {
          setFollows(follows - 1)
          setIsFollowed(false)
        } else {
          alert(res.data.message)
        }
      })
      .catch(err => alert('ERROR: ' + err))
      .then(() => dispatch(toggleLoading(false)))
  }
  
  return (
    <div className='main-info'>
      <div className='row'>
        <div className='col-12 col-sm-12 col-md-12 col-lg-3 col-xl-3'>
          <div className='thumb'>
            <img src={storyInfo?.image?.url || '/images/product_default_img.png'} />
          </div>
        </div>
        <div className='col-12 col-sm-12 col-md-12 col-lg-9 col-xl-9'>
          <div className='info'>
            <h1>{storyInfo?.title}</h1>
            <ul>
              <li className='title'><i className="fas fa-filter"></i> <strong>Thể loại:</strong> </li>
              {
                storyInfo?.categories && storyInfo.categories.length > 0 &&
                storyInfo.categories.map(item => (
                  <>
                    {
                      item.category && item.category.title &&
                      <li key={item._id} className='cate'>#{item.category.title}</li>
                    }
                  </>
                ))
              }
            </ul>
            <p><i className="fas fa-toggle-on"></i> <strong>Trạng thái:</strong> {storyInfo.isCompleted ? 'Đã hoàn thành' : 'Chưa hoàn thành'}</p>
            <p><i className="fas fa-clock"></i> <strong>Ngày tạo:</strong> {date(storyInfo.createdAt)}</p>
            <p><i className="fas fa-pen-nib"></i> <strong>Cập nhật:</strong> {date(storyInfo.updatedChap)}</p>
            {
              !isFollowed &&
              <button onClick={follow}><i class="fas fa-heart"></i> Theo dõi {(follows)}</button>
              ||
              <button onClick={unfollow}><i class="fas fa-heart"></i> Bỏ theo dõi {(follows)}</button>
            }
            <p className='description'>{storyInfo?.shortDescription}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainInfo
