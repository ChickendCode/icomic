import { useRef, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { createCategoryAsync, updateCategoryAsync } from '../../redux/actions/categories.actions'

const Update = ({ updateForm, setUpdateForm }) => {

  const dispatch = useDispatch()
  const { info, index } = updateForm
  const nameEl = useRef(null)


  const handleSubmit = (e) => {
    e.preventDefault()

    const name = nameEl.current.value.trim()
    const data = {
      title: name
    }

    dispatch(updateCategoryAsync(info._id, data, index, setUpdateForm({ status: false, info: {}, index: null })))

  }

  return (
    <>
      {
        updateForm.status &&
        <div id='product-create'>
          <div className='create-container'>
            <form onSubmit={handleSubmit} className='create-form'>
              <span onClick={() => { setUpdateForm({ status: false, info: {} }) }} className='close'>
                <i className="fas fa-times"></i>
              </span>
              <div className='form-container'>
                <h4>Cập nhật chuyên mục</h4>
                <div className='create-name'>
                  <label htmlFor='create_name'>Tiêu đề: </label>
                  <input defaultValue={info.title} placeholder='VD: Tiểu thuyết' required ref={nameEl} id='create_name' name='major_name' />
                </div>
                <button className='sm-btn' type='submit'>Thêm</button>
              </div>
            </form>
          </div>
        </div>
        ||
        null
      }
    </>
  )
}

export default Update