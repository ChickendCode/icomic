import { useEffect, useState } from "react"
import SideBar from "./SideBar"
import MainContent from "./MainContent"
import { useSelector } from "react-redux"
import { useHistory } from 'react-router-dom'
import Loading from "../../global/Loading"
import DeletePopup from "../../global/DeletePopup"

const Admin = () => {
  const login = localStorage.getItem('login')
  const role = localStorage.getItem('role')

  const history = useHistory()

  const [mbSide, setMbSide] = useState(true)
  useEffect(() => {
    if (!login || role !== 'admin') 
      history.push('/login')
  }, [login, role])
  
  return (
    <div id='admin-layout'>
      <Loading />
      <div className='row no-gutters'>
        <div className='col-12 col-sm-12 col-md-12 col-lg-3 col-xl-3'>
          <div className={!mbSide && 'side__bar-container' || 'side__bar-container active'}>
            <button onClick={() => setMbSide(!mbSide)}>
              {
                !mbSide &&
                < i className="fas fa-caret-right"></i>
                ||
                <i className="fas fa-caret-left"></i>
              }
            </button>
            <SideBar />
          </div>
        </div>
        <div className='col-12 col-sm-12 col-md-12 col-lg-9 col-xl-9'>
          <div className='main-content-container'>
            <MainContent />
          </div>
        </div>
      </div>
    </div >
  )
}

export default Admin