import React from 'react'
import Common from '../components/Common'
import { ContactForm } from './HomePageComponent'
import { Container } from 'react-bootstrap'



 export  const Contact = () => {
  return (
   <Common title='Store / Contact Us'>
<Container  style={{position:"relative",
top: -50,}}>
{
  ContactForm()
  }
</Container>
   </Common>
  )
}

