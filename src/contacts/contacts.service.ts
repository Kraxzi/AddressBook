import {Request, Response} from "express";
import {firebaseDB} from "../db/firebase.connection";
import {collection, addDoc} from "firebase/firestore/lite";

export class ContactsService {
  async addContact(req: Request, res: Response): Promise<Response> {
    try {
      const {firstName, lastName, phoneNumber, address} = req.body;
      const contactsCollection = collection(firebaseDB, "contacts");

      const phoneNumberRegex = /^\+\d{1,3}\d{9}$/;
      if (!phoneNumberRegex.test(phoneNumber)) {
        return res.status(401).json({message: "Invalid phone number"});
      }
      if (address.length < 10) {
        return res.status(401).json({message: "Invalid address"});
      }

      await addDoc(contactsCollection, {
        firstName,
        lastName,
        phoneNumber,
        address,
      });
      return res.status(200).json({message: "Contact was successfully added"});
    } catch (e) {
      console.error(e);
      return res.status(500).json({message: "Adding contact error"});
    }
  }
}
