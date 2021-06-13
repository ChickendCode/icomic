const initState = {
  menu: [
    {
      title: "Trang chủ",
      path: "/",
    },
    {
      title: "Truyện",
      path: "/stories",
    },
    {
      title: "Thể loại",
      path: "/categories",
    },
    {
      title: "Mới cập nhật",
      path: "/latest",
    },
    {
      title: "Theo dõi",
      path: "/follows",
    }
  ],
  adminMenu: [
    {
      title: "Tổng quan",
      path: "/admin/overall",
      icon: <i className="fas fa-chart-bar"></i>,
    },
    {
      title: "Quản lý truyện",
      path: "/admin/stories",
      icon: <i className="fas fa-book-reader"></i>,
    },
    {
      title: "Quản lý chuyên mục",
      path: "/admin/categories",
      icon: <i className="fas fa-filter"></i>
    },
    {
      title: "Đi tới trang chủ",
      path: "/",
      icon: <i className="fas fa-home"></i>
    },
  ],
  loading: false,
  adminTitle: ''
}

const webReducer = (state = initState, action) => {
  const { type, payload } = action

  switch (type) {
    case "TOGGLE_LOADING": {
      return {
        ...state,
        loading: payload
      }
    }

    case "TOGGLE_LOGIN": {
      return {
        ...state,
        login: payload
      }
    }

    case "SET_ADMIN_TITLE": {
      return {
        ...state,
        adminTitle: payload
      }
    }
  }

  return state
}

export default webReducer