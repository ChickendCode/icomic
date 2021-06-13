import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import Create from "./Create"
import CategoriesList from "./List"
import CategoryMenu from "./Menu"
import CategoryInfo from "./CategoryDetail"
import Update from "./Update"

const Category = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({
      type: 'SET_ADMIN_TITLE',
      payload: 'Chuyên mục'
    })
    
    // dispatch(getAllProductsAsync({}, true))
  }, [])

  const [createForm, setCreateForm] = useState(false)
  const [updateForm, setUpdateForm] = useState({ status: false, info: {} })
  const [categoryInfo, setCategoryInfo] = useState({status: false, info: {}})

  return (
    <div id='product-tab'>
      <Create status={createForm} setCreateForm={setCreateForm} />
      <Update updateForm={updateForm} setUpdateForm={setUpdateForm} />
      <CategoryInfo categoryInfo={categoryInfo} setCategoryInfo={setCategoryInfo} />
      <div className='product-container'>
        <CategoryMenu setCreateForm={setCreateForm} />
        <CategoriesList setUpdateForm={setUpdateForm} setCategoryInfo={setCategoryInfo} />
      </div>
    </div>
  )
}

export default Category