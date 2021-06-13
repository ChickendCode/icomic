import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import TextareaAutosize from 'react-textarea-autosize'
import Warning from '../../global/Warning'
import { commentStory, removeCommentStory } from '../../services/stories.services'
import { date } from '../../utils/getDate'

const Comment = ({ storyId, commentList }) => {
  const { user, login } = useSelector(state => state.users)
  const commentEl = useRef(null)
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (commentList && commentList.length > 0) {
      setComments(commentList.reverse())
    }
  }, [commentList])

  const comment = () => {
    if (!login) return alert('Bạn chưa đăng nhập!')

    const content = commentEl.current.value
    if (!content || content === '') return

    setLoading(true)
    commentStory(storyId, user._id, content)
      .then(res => {
        if (res.data && res.data.status) {
          setLoading(false)
          const newComment = {
            _id: res.data.newCommentId,
            content: content,
            author: user
          }
          commentEl.current.value = ''
          setComments([
            newComment,
            ...comments
          ])
        } else {
          alert(res.data.message)
        }
      })
      .catch(err => alert('ERROR: ' + err))
      .then(() => {
        setLoading(false)
      })
  }

  const removeComment = (commentId, authorId) => {
    if (!login) return alert('Bạn chưa đăng nhập!')

    removeCommentStory(storyId, authorId, commentId)
      .then(res => {
        if (res.data && res.data.status) {
          let temp = comments.filter(x => x._id !== commentId)
          setComments([
            ...temp
          ])
        } else {
          alert(res.data.message)
        }
      })
      .catch(err => alert('ERROR: ' + err))
      .then(() => {
        setLoading(false)
      })
  }

  return (
    <div className='comment-wrapper'>
      <span className='title'><i className="fas fa-comments"></i> Đánh giá:</span>
      <div className='comment-container'>
        <div className='comment-input-container'>
          <button onClick={comment}><i className="fas fa-paper-plane"></i></button>
          <TextareaAutosize ref={commentEl} placeholder='Đánh giá của bạn...' className='comment-input scroll' />
        </div>
        <ul>
          {
            loading &&
            <li className='comment-loading'>
              <img src='/images/commentLoading.txt' />
            </li>
          }
          {
            comments && comments.length > 0 &&
            comments.map((item, index) => (
              <li key={index}>
                <div className='comment-detail'>
                  {
                    login && ((item.author && item.author._id) === user._id || user.role === 'admin') && 
                    <button onClick={() => removeComment(item._id, (item.author && item.author._id || null))} className='remove-btn'>
                      <i className="far fa-trash-alt"></i>
                    </button>
                  }
                  <strong>{item.author && item.author.fullName || '...'}</strong>
                  <i style={{display: 'block', fontSize: '.8rem', marginBottom: 12, marginLeft: 4}}>{date(item.createdAt)}</i>
                  <p>{item.content}</p>
                </div>
              </li>
            ))
            ||
            <Warning alert="Chưa có đánh giá nào" />
          }
        </ul>
      </div>
    </div>
  )
}

export default Comment