import { Link } from "react-router-dom"
import getCate from "../utils/getCategory"
import DetailPopup from "./DetailPopup"
import Warning from "./Warning"

const StoriesList = ({ stories }) => {

  return (
    <div className='stories-list'>
      <div className='stories-list-container'>
        <div className='row custom-gutter'>
          {
            stories && stories.length > 0 && stories.map(item => (
              <div key={item._id} className='col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3 custom-gutter'>
                <div className='item-container' >
                  <DetailPopup story={item} />
                  <div className='thumb'>
                    <Link to={`/stories/${item._id}`}>
                      <img data-aos="zoom-out" data-aos-easing="linear" data-aos-duration="700"  src={item.image && item.image.url || '/images/product_default_img.png'} />
                    </Link>
                  </div>
                  <div className='info'>
                    <Link to={`/stories/${item._id}`}>{item.title || 'Chưa cập nhật!'}</Link>
                    <p>{
                      item.chapters && item.chapters.length > 0 &&
                      `${item.chapters.length} Chương`
                      ||
                      'Chưa có chương'
                    }</p>
                  </div>
                </div>
              </div>
            ))
            ||
            <Warning alert='Không có truyện!' />
          }
        </div>
      </div>
    </div>
  )
}

export default StoriesList