// const fs = require('fs/promises');
import fs from 'fs/promises';
import path from 'node:path';
import { v4 } from 'uuid';
// const path = require('path');
// const { v4 } = require('uuid');

const contactsPath = path.join('db', 'contacts.json');

export async function listContacts() {
  // console.log(contactsPath)
  const data = await fs.readFile(contactsPath);
  // console.log(JSON.parse(data));
  return JSON.parse(data);
}

export async function getContactById(contactId) {
  const contacts = await listContacts();
  const result = contacts.find(contact => contact.id === contactId);
  if (!result) {
    return null;
  }
  return result;
}

export async function removeContact(contactId) {
  const contacts = await listContacts();
  const idx = contacts.findIndex((contact) => contact.id === contactId);
  if (idx === -1) {
    return null;
  }
  const newContacts = contacts.filter((_, index) => index !== idx);
  await fs.writeFile(contactsPath, JSON.stringify(newContacts));
  return contacts[idx];
}

export async function addContact(reqBody) {
  const contacts = await listContacts();
  const newContact = { ...reqBody, id: v4() };
  contacts.push(newContact)
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
}

export async function updateContact(id, data) {
  if (!data) {
    return null;
  }
  const contacts = await listContacts();
  const idx = contacts.findIndex((contact) => contact.id === id);
  if (idx === -1) {
    return null;
  }
  contacts[idx] = { ...contacts[idx], ...data, id: v4() };
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contacts[idx];
}

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   updateContact,
//   addContact,
// };
