import { useSelector } from "react-redux"
import CategoryItems from "./CategoryItems"
import Breadcrumb from '../../global/Breadcrumb'
import Warning from "../../global/Warning"

const Categories = () => {

  const { categories } = useSelector(state => state.categories)
  
  return (
    <div id='categories'>
      <div class='container'>
        <Breadcrumb category="Thể loại" />
        {
          categories && categories.length > 0 &&
          categories.map(item => (
            <div key={item._id} className="category-container">
              <CategoryItems category={item} />
            </div>
          ))
          ||
          <Warning alert='Chưa có chuyên mục!' />
        }
      </div>
    </div>
  )
}

export default Categories