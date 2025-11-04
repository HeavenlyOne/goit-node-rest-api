import HttpError from '../helpers/HttpError.js';
import validateBody from '../helpers/validateBody.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../schemas/contactsSchemas.js';
import {
  addContact,
  getContactById,
  listContacts,
  removeContact,
} from '../services/contactsServices.js';

export const getAllContacts = async (req, res) => {
  const contacts = await listContacts();
  res.json({
    status: 'success',
    code: 200,
    data: {
      result: contacts,
    },
  });
};

export const getOneContact = async (req, res) => {
  const { id } = req.params;
  const result = await getContactById(id);
  if (!result) {
    const error = HttpError(404);
    return res.status(error.status).json({
      message: error.message,
    });
  }
  res.json({
    status: 'success',
    code: 200,
    data: {
      result,
    },
  });
};

export const deleteContact = async (req, res) => {
  const { id } = req.params;
  const result = await removeContact(id);
  if (!result) {
    const error = HttpError(404);
    return res.status(error.status).json({
      message: error.message,
    })
  };
  res.json({
    status: 'success',
    code: 200,
    data: {
      result,
    },
  });
};

export const createContact = async (req, res) => {
    const result = await addContact(req.body);
    res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        result,
      },
    });
};

export const updateContact = async (req, res) => {
  console.log(req.body)
  console.log(req.params)
  // if (!req.body) {
  //   console.log('err')
  //   return res.status(400).json({
  //     status: 400,
  //     message: 'Body must have at least one field',
  //   });
  // }
  const { id } = req.params;
  const result = await updateContact(id, req.body);
  if (!result) {
    HttpError(404, error.message);
  }
  res.json({
    status: 'success',
    code: 200,
    data: {
      result,
    },
  });
};

// console.log(await getAllContacts())
// console.log(await getOneContact("drsAJ4SHPYqZeG-83QTVW"))

  // {
  //   "id": "AeHIrLTr6JkxGE6SN-0Rw",
  //   "name": "Allen Raymond",
  //   "email": "nulla.ante@vestibul.co.uk",
  //   "phone": "(992) 914-3792"
  // }

// const obg = {
//   son: "dddsf",
//   djn: "fgslsk",
//   dkfjsl: 1
// }
// const key = Object.keys(obg)

// console.log(key.length)
