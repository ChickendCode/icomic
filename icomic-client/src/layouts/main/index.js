import Loading from "../../global/Loading"
import Footer from "./Footer"
import Header from "./Header"

const MainLayout = ({ children }) => {
  return (
    <div id='main-layout'>
      <Header />
      <div className='main-content'>
        <Loading />
        <div className='main-content-container'>
          { children }
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default MainLayout