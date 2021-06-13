import { useSelector } from "react-redux"
import CategoryItems from "./CategoryItems"
import Breadcrumb from '../../global/Breadcrumb'
import Warning from "../../global/Warning"
import { useParams } from "react-router-dom"

const Category = () => {
  const { _id } = useParams()

  const { categories } = useSelector(state => state.categories)
  const item = categories.filter(x => x._id === _id)[0]
  return (
    <div id='categories'>
      <div class='container'>
        <Breadcrumb category="Thể loại" item />
        <div key={item && item._id} className="category-container">
          <CategoryItems category={item} />
        </div>
      </div>
    </div>
  )
}

export default Category