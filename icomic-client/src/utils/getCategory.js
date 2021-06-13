const getCate = (categories) => {
  let categoryTitle = "Đang cập nhật..."

  if (categories && categories.length > 0) {
    for (let cate of categories) {
      if (cate && cate.category && cate.category.title) {
        categoryTitle = cate.category.title
        break
      }
    }
  }

  return categoryTitle
}

export default getCate