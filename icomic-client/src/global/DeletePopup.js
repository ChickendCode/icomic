const DeletePopup = ({ action, closePopup, title, status, id, parentId }) => {
  return (
    <>
      {
        status &&
        <div id='delete-pop'>
          <span>{title}</span>
          <div>
            <button onClick={() => action(id, parentId)} className='delete'>
              Xóa
            </button>
            <button onClick={closePopup} className='edit'>
              Hủy
            </button>
          </div>
        </div>
      }
    </>
  )
}

export default DeletePopup