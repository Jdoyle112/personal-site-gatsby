import React from 'react'
import Helmet from 'react-helmet'

import Navbar from '../components/Navbar'
import Footer from './Footer';
import './all.sass'

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet title="Home | Gatsby + Netlify CMS" />
    {/* <Navbar /> */}
    <div className="main-container">{children}</div>
    <Footer />
  </div>
)

export default TemplateWrapper
