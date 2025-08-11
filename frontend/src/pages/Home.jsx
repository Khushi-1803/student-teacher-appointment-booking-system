import React from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/specialityMenu'
import TopTeachers from '../components/TopTeachers'
import Banner from '../components/Banner'

const Home = () => {
  return (
    <div>
      <Header />
     <SpecialityMenu />
     <TopTeachers />
     <Banner />
    </div>
  )
}

export default Home

