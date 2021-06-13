import { useState, useRef, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { date } from "../../utils/getDate";
// import { addProduct } from "../../services/global";
// import {
//   getAllGuestsAsync,
//   getAllProductsAsync,
//   toggleLoading,
// } from "../../redux/actions";
import Warning from "../../global/Warning";

const Product = ({ product, setProduct }) => {
  const { user } = product;
  const products = []
  const dispatch = useDispatch();
  const [majors, setMajors] = useState([1,2,3,4,5,6,6])

  const buyProduct = (data) => {

  };

  const search = (e) => {
    let value = e.target.value.trim();

    // dispatch(getAllProductsAsync({ search: toChar(value) }));
  };

  const close = () => {
    if (majors.length > 0) {
      alert('Đăng kí thành công!')
      setProduct(false)
    }
  }
  return (
    <>
      {(!product.status && (
        <div id="client-client-add">
          <div className="client-add-container">
            <div className="form">
              {
                majors.length > 0 &&
                <button className="close-btn" onClick={close}>
                  <i className="fas fa-times"></i>
                </button>
              }
              <h4 style={{ fontWeight: 'bold' }}>Chọn chuyên ngành</h4>
              <form style={{ marginBottom: 12 }}>
                <input onChange={search} placeholder="Nhập tên chuyên ngành..." />
                <button>
                  <i className="fas fa-search"></i>
                </button>
              </form>
              {(products && products.length > 0 && (
                <div className="form-container">
                  <div className="products">
                    <ul className="scroll">
                      <li className="title-row">
                        <span className="count">Đăng ký</span>
                        <span>Tên</span>
                        <span>Chỉ tiêu</span>
                        <span>Số năm</span>
                      </li>
                      {products.map((item, index) => {
                        let check = false
                        for(let major of majors) {
                          if (item._id === major) check = true
                        }

                        return (
                          <li key={item._id}>
                            {
                              !check &&
                              <span
                                onClick={() => buyProduct(item)}
                                className="count"
                              >
                                <i className="fas fa-plus"></i>
                              </span> ||
                              <span className='count'>Đã ĐK</span>
                            }
                            <span>{item.name}</span>
                            <span>{item.quantity || 'Chưa cập nhật'}</span>
                            <span>{item.years || 'Chưa cập nhật'}</span>
                          </li>
                        )
                      }
                      )}
                    </ul>
                  </div>
                </div>
              )) || <Warning alert="Chưa có chuyên ngành!" />}
            </div>
          </div>
        </div>
      )) ||
        null}
    </>
  );
};

export default Product;
