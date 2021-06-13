import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllStoriesAsync } from "../../redux/actions/stories.action";
import toChar from "../../utils/toChar";

const StoryMenu = ({ setCreateForm, query, setQuery }) => {
  const dispatch = useDispatch();
  const categories = useSelector(state => state.categories.categories)
  const queryEl = useRef(null)
  const categoryEl = useRef(null)

  const filerByCategory = (e) => {
    const category = JSON.parse(e.target.value)
    if (!(category && category._id)) {
      return dispatch(getAllStoriesAsync({ ...query, categories: null }, true));
    }
    setQuery({ ...query });

    dispatch(getAllStoriesAsync({ ...query, categories: category._id }, true));
  };

  const filterByName = (e) => {
    const search = toChar(queryEl.current.value)

    if (search.length > 0 && search !== '')
      dispatch(getAllStoriesAsync({ search: search }))
  }

  const filterAll = () => {
    categoryEl.current.value = 'null'
    dispatch(getAllStoriesAsync({}, true))
  }

  return (
    <div id="client-menu">
      <div className="client-menu-container">
        <ul>
          <li className="add">
            <button onClick={() => setCreateForm(true)}>
              <i className="fas fa-plus"></i>
              <span>Thêm truyện mới</span>
            </button>
          </li>
          <li className="name">
            <button onClick={filterAll} style={{ padding: '4px 8px', border: 'none', borderRadius: 4, marginRight: 12, background: 'var(--primary-color)', color: 'white' }}>Tất cả</button>
            <input
              id="name"
              ref={queryEl}
              placeholder="Nhập tên truyện..."
            />
            <button onClick={filterByName} style={{ padding: '4px 8px', border: 'none' }}>Tìm kiếm</button>
          </li>
          <li className="category">
            <select ref={categoryEl} onChange={filerByCategory}>
              <option
                value={JSON.stringify(null)}
                selected
              >
                Tất cả
              </option>
              {
                categories && categories.length > 0 &&
                categories.map(item =>
                  <option key={item._id} value={JSON.stringify(item)}>
                    {item.title}
                  </option>
                )
              }
            </select>
          </li>

        </ul>
      </div>
    </div>
  );
};

export default StoryMenu;
