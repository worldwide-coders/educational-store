import React from 'react'
import './Footer.css'
// import github from './github-original-wordmark.svg'

const Footer = () => (
  <div>
    &#169; 2020 worldwidecoders
    <span className='gitHub'>
      <a href='https://github.com/worldwide-coders'>
        <i className="devicon-github-plain-wordmark colored"></i>
        GitHub Repo
      </a>
    </span>
  </div>
)

export default Footer
