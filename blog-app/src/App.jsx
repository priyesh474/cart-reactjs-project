import { Route, Routes } from 'react-router-dom'
import './App.css'
import BlogDetails from './components/BlogDetails'
import BlogList from './components/BlogList'
import Header from './components/header'
import AddBlog from './components/addBlog'

function App() {

  return (
    <>
      <Header/>
      <Routes>
        <Route path='/' element={<BlogList/>}/>
        <Route path='/bloglist/:id' element={<BlogDetails/>}/>
        <Route path='/addblog' element={<AddBlog/>}/>
      </Routes>
    </>
  )
}

export default App
