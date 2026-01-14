import React from 'react'
import Navbar from './components/home/Navbar'
import CTASection from './components/home/CTASection'
import HowYouLevelUp from './components/home/HowYouLevelUp'
import ChooseYourPath from './components/home/ChooseYourPath'
import EarnTitles from './components/home/EarnTitles'
import ForRecruiters from './components/home/ForRecruiters'
import FinalCTASection from './components/home/FinalCTASection'
import Footer from './components/home/Footer'

const page = () => {
  return (
    <div style={{ overflowX: 'hidden', width: '100%' }}>
      <Navbar />
      <CTASection />
      <HowYouLevelUp />
      <ChooseYourPath />
      <EarnTitles />
      <ForRecruiters />
      <FinalCTASection />
      <Footer />
    </div>
  )
}

export default page
