import React from 'react'
import { Container } from 'react-bootstrap'
import Footer from './Footer'

const Base = ({title="Page Title",description="Welcome to dynamic store",childern}) => {
  return (
    <div>
    <Container fluid>
    <h4 className='text-center'>{title}</h4>
    <p className='text-center fw-light '>{description}</p>
    
    </Container>
    {childern}
    <Footer/>
    </div>
  )
}

export default Base