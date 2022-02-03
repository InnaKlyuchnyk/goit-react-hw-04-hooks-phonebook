import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Section from "./Section/Section";
import Filter from "./Filter/Filter";
import Form from "./Form/Form";
import PhoneBookList from "./PhoneBookList/PhoneBookList";

import { GlobalStyle } from "../constans/GlobalStyle";

export default function Phonebook() {
  const [contacts, setContacts] = useState([
    { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
    { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
    { id: "id-3", name: "Eden Clements", number: "645-17-79" },
    { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
  ]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const contactsList = localStorage.getItem("contacts");
    const parsedContactsList = JSON.parse(contactsList);
    if (parsedContactsList) {
      setContacts(parsedContactsList);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const formSubmitHandler = (name, number) => {
    const newContact = { id: nanoid(), name, number };

    if (
      !contacts.find(
        (contact) =>
          contact.name.toLowerCase() === newContact.name.toLowerCase()
      )
    ) {
      setContacts((contacts) => (contacts = [newContact, ...contacts]));
    } else {
      alert(`${newContact.name} is already in contacts`);
    }
  };

  const handleFilterChange = (event) => {
    setFilter(event.currentTarget.value);
  };

  const getFiltredNames = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const deleteContact = (event) => {
    event.preventDefault();
    const idDeletedContact = event.currentTarget.id;
    setContacts((prevState) =>
      prevState.filter((contact) => contact.id !== idDeletedContact)
    );
  };

  return (
    <div>
      <Section title="Phonebook">
        <Form onSubmit={formSubmitHandler} />
      </Section>

      {contacts.length !== 0 && (
        <Section title="Contacts">
          <Filter value={filter} onChange={handleFilterChange} />
          <PhoneBookList
            filtredNames={getFiltredNames()}
            onDeleteContact={deleteContact}
          />
        </Section>
      )}

      <GlobalStyle />
    </div>
  );
}
