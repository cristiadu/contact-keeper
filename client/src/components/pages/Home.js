import React from 'react'

import ContactList from '../contacts/ContactList'
import ContactForm from '../contacts/ContactForm'

const Home = () => (
  <div className="grid-2">
    <div>
      <ContactForm />
    </div>
    <div>
      <ContactList />
    </div>
  </div>
)

export default Home
