import React from 'react';
import { MDBInput, MDBCheckbox, MDBBtn, MDBTextArea } from 'mdb-react-ui-kit';

function Formcontact() {
 return (
    <div class="container" style={{ alignItems: 'center',
    justifyContent: 'center', }}>
        <div class="row justify-content-center">
<form id='form' 
action="https://formspree.io/f/xeqdgwnq"
method="POST"

className='text-center'  style={{ width: '100%', maxWidth: '300px',alignItems: 'center',
justifyContent: 'center', }}>

      <h2> LEAVE A RESPONSE</h2>
      <p class="text-center w-responsive mx-auto mb-5">Do you have any questions? Please do not hesitate to contact us directly. Our team will come back to you within
        a matter of hours to help you.</p>

      <MDBInput label='Name' v-model='name' wrapperClass='mb-4' />

      <MDBInput type='email' label='Email address' v-model='email' wrapperClass='mb-4' />

      <MDBTextArea wrapperClass='mb-4' label='Message' />

      <MDBCheckbox wrapperClass='d-flex justify-content-center' label='Send me copy' />

      <MDBBtn color='primary' block className='my-4'>
        Send
      </MDBBtn>
      
    </form>
    </div>
    </div>
 )
};

export default Formcontact;