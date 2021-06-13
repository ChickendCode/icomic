const Footer = () => {
  return (
    <div id='main-footer'>
      <div className='container py-5'>
        <div className="socialte d-flex align-items-center justify-content-center">
          <a href="https://www.facebook.com/khoa.trandang.3382"><i class="fab fa-facebook-f"></i></a>
          <a href="#"><i class="fab fa-github"></i></a>
          <a href="#"><i class="fas fa-envelope"></i></a>
          <a href="#"><i class="fab fa-instagram"></i></a>
        </div>
        <div className="nav-footer pt-4 d-flex justify-content-center">
          <li><a href="/"> Trang chủ </a></li>
          <li><a href="/stories"> Truyện </a></li>
          <li><a href="/latest"> Mới cập nhật </a></li>
          <li><a href="/follows"> Theo dõi </a></li>
        </div>
        <div className="copy-right text-center pt-3">
        © 2018 - 2020 Truyenz.info. All rights reserved | Liên Hệ: Truyenz.info@gmail.com
        </div>
      </div>
    </div>
  )
}

export default Footer