import { nanoid } from 'nanoid';
import { useState, useEffect } from "react";
import Container from "components/Container";
import ContactForm from 'components/ContactForm';
import ContactList from "components/ContactList";
import Filter from "components/Filter";
import contactsList from './contacts.json';

function App() {
  const [contacts, setContacts] = useState(() =>
    JSON.parse(window.localStorage.getItem('contacts')) ?? contactsList
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts))
}, [contacts]);

  const formSubmitHanler = ({ name, number }) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    const findContact = contacts.find(contact => contact.name === name);
    
    if (findContact) {
      return alert(contact.name + ' is already in contact')
    } else setContacts([contact, ...contacts])
  };

  const changeFilter = (event) => {
    setFilter(event.currentTarget.value)
  };

 const filteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(({name}) =>
     name.toLowerCase().includes(normalizedFilter),
    );
  };

   const deleteContact = (id) => {
     setContacts(prevContacts => prevContacts.filter(contact => contact.id !== id))
  }

   return (
      <Container>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={formSubmitHanler} />
        <h2>Contacts</h2>
        <Filter value={filter} onChange={changeFilter}/>
        <ContactList contacts={filteredContacts()} deleteContact={deleteContact}/>
      </Container>
    )
 
};

export default App;

