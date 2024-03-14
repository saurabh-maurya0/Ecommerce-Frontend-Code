import React from 'react'
import { Container } from 'react-bootstrap'

import { DNA } from 'react-loader-spinner';
const Loading = ({show}) => {
    return show &&(
  <Container className='text-center  ' style={{marginTop:"250px"}}>
  <DNA
    visible={true}
    height="100"
    width="100"
    ariaLabel="dna-loading"
    wrapperStyle={{}}
    wrapperClass="dna-wrapper"
    />
  
  </Container>
  )
}

export default Loading