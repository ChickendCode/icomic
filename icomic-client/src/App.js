import { useEffect, useState } from 'react'
import { Switch, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'


import './static/styles/common.css'
import './static/styles/global.scss'
import './static/styles/sign.scss'
import './static/styles/home.scss'
import './static/styles/stories.scss'
import './static/styles/storydetail.scss'
import './static/styles/story.admin.scss'
import './static/styles/category.admin.scss'
import './static/styles/template.scss'
import './static/styles/responsive.admin.scss'
import './static/styles/header.admin.scss'
import './static/styles/overall.admin.scss'
import './static/styles/sidebar.admin.scss'
import './static/styles/story.admin.scss'
import './static/styles/category.admin.scss'
import './static/styles/responsive.scss'

import MainLayout from './layouts/main'
import Home from './pages/home'
import Stories from './pages/stories'
import Profile from './pages/profile'
import Login from './layouts/sign/Login'
import Register from './layouts/sign/Register'
import Search from './pages/search'
import { authAsync } from './redux/actions/authen.actions'
import Admin from './layouts/admin'
import { getAllCategoriesAsync } from './redux/actions/categories.actions'
import { getAllStoriesAsync } from './redux/actions/stories.action'
import Categories from './pages/categories'
import LatestStories from './pages/Latest'
import DetailStory from './pages/storyDetail'
import FollowStories from './pages/follow'
import ReadLayout from './layouts/read'
import Chapter from './pages/chapters'
import Category from './pages/categories/Category'

import AOS from 'aos'
import "aos/dist/aos.css"

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);


  useEffect(() => {
    dispatch(authAsync())
  }, [])

  useEffect(() => {
    dispatch(getAllCategoriesAsync({}))
  }, [])

  useEffect(() => {
    dispatch(getAllStoriesAsync({}))
  }, [])

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  return (
    <div className='my-app'>
      <button id='scroll-top' data-aos="fade-up"
     data-aos-duration="1000" data-aos-easing="linear"  onClick={scrollTop}><i className="fas fa-arrow-up"></i></button>
      <Switch>
      <Route path='/chapters/:storyId/:_id/:chap'>
          <ReadLayout>
            <Chapter />
          </ReadLayout>
        </Route>
        <Route path='/search'>
          <MainLayout>
            <Search />
          </MainLayout>
        </Route>
        <Route path='/stories/:_id'>
          <MainLayout>
            <DetailStory />
          </MainLayout>
        </Route>
        <Route path='/stories'>
          <MainLayout>
            <Stories />
          </MainLayout>
        </Route>
        <Route path='/profile'>
          <MainLayout>
            <Profile />
          </MainLayout>
        </Route>
        <Route path='/follows'>
          <MainLayout>
            <FollowStories />
          </MainLayout>
        </Route>
        <Route path='/latest'>
          <MainLayout>
            <LatestStories />
          </MainLayout>
        </Route>
        <Route path='/categories/:_id'>
          <MainLayout>
            <Category />
          </MainLayout>
        </Route>
        <Route path='/categories'>
          <MainLayout>
            <Categories />
          </MainLayout>
        </Route>
        <Route path='/admin'>
          <Admin />
        </Route>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/register'>
          <Register />
        </Route>
        <Route path='/'>
          <MainLayout>
            <Home />
          </MainLayout>
        </Route>
      </Switch>
    </div>
  )
}

export default App
