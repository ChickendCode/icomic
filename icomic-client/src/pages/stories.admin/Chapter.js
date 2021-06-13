// import { useRef, useEffect, useState } from 'react'
// import { useHistory, Link } from 'react-router-dom'
// import { useSelector, useDispatch } from 'react-redux'
// // import { getAllProductsAsync, toggleLoading } from '../../redux/actions'
// import { createProduct } from '../../services/global'
// import toChar from '../../utils/toChar'
// import Editor from '../../global/CkEditor'

// const Create = ({ status, setCreateForm }) => {

//   const dispatch = useDispatch()

//   const [description, setDescription] = useState('Đang cập nhật')
//   const nameEl = useRef(null)
//   const yearsEl = useRef(null)
//   const targetEl = useRef(null)
//   const blockEl = useRef(null)
//   const certEl = useRef(null)


//   useEffect(() => {
//     // if (!login) {
//     //   setTimeout(() => {
//     //     history.replace('/login')
//     //   }, 1000)
//     // }
//   }, [])


//   const handleSubmit = (e) => {
//     e.preventDefault()

//     const name = nameEl.current.value.trim()
//     const years = yearsEl.current.value
//     const target = targetEl.current.value
//     const block = blockEl.current.value.trim()
//     const cert = certEl.current.value
//     const text = toChar(name)

//     const data = {
//       name, description, years, text, target, cert, block
//     }

//   }

//   return (
//     <>
//       {
//         status &&
//         <div id='product-create'>
//           <div className='create-container'>
//             <form onSubmit={handleSubmit} className='create-form'>
//               <span onClick={() => { setCreateForm(false) }} className='close'>
//                 <i className="fas fa-times"></i>
//               </span>
//               <div className='form-container'>
//                 <h4>Thêm chuyên ngành</h4>
//                 <div className='create-name'>
//                   <label htmlFor='create_name'>Tên chuyên ngành: </label>
//                   <input placeholder='VD: Khoa học máy tính' required ref={nameEl} id='create_name' name='major_name' />
//                 </div>
//                 <div className='create-year'>
//                   <label htmlFor='create_year'>Số năm: </label>
//                   <input required ref={yearsEl} id='create_year' type='number' name='years' min={1} />
//                 </div>
//                 <div className='create-year'>
//                   <label htmlFor='create_targe'>Chỉ tiêu: </label>
//                   <input required ref={targetEl} id='create_targe' name='target' type='number' min={1} />
//                 </div>
//                 <div className='create-year'>
//                   <label htmlFor='create_year'>Khối: </label>
//                   <input required ref={blockEl} id='create_block' placeholder='VD: A01, D01...' min={1} />
//                 </div>
//                 <div className='create-cert'>
//                   <select ref={certEl} required defaultValue='Bằng đào tạo' name="categories">
//                     <option value="Bằng đào tạo" disabled hidden>Bằng đào tạo</option>
//                     <option value={'Cao đẳng'}>
//                       Cao đẳng
//                   </option>
//                     <option value={'Cử nhân'}>
//                       Cử nhân
//                   </option>
//                     <option value='Kĩ sư'>
//                       Kĩ sư
//                   </option>
//                     <option value='Thạc sĩ'>
//                       Thạc sĩ
//                   </option>
//                   </select>
//                 </div>
//                 <div className='create-desc'>
//                   <Editor setDescription={setDescription} />
//                 </div>
//                 <button className='sm-btn' type='submit'>Thêm</button>
//               </div>
//             </form>
//           </div>
//         </div>
//         ||
//         null
//       }
//     </>
//   )
// }

// export default Create