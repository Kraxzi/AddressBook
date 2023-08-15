import {Request, Response} from "express";
import {ContactsService} from "./contacts.service";
import {firebaseDB} from "../db/firebase.connection";
import {collection, addDoc} from "firebase/firestore/lite";

jest.mock("../db/firebase.connection");
jest.mock("firebase/firestore/lite");

describe("ContactsService", () => {
  let contactsService: ContactsService;
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;

  beforeEach(() => {
    contactsService = new ContactsService();
    mockReq = {
      body: {
        firstName: "John",
        lastName: "Doe",
        phoneNumber: "+1234567890",
        address: "123 Main St",
      },
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should add a contact", async () => {
    const mockCollection = jest.fn();

    (collection as jest.Mock).mockReturnValue(mockCollection);
    (addDoc as jest.Mock).mockReturnValue(Promise.resolve());

    await contactsService.addContact(mockReq as Request, mockRes as Response);

    expect(collection).toHaveBeenCalledWith(firebaseDB, "contacts");
    expect(addDoc).toHaveBeenCalledWith(mockCollection, {
      firstName: "John",
      lastName: "Doe",
      phoneNumber: "+1234567890",
      address: "123 Main St",
    });
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "Contact was successfully added",
    });
  });

  it("should handle invalid phone number", async () => {
    mockReq.body.phoneNumber = "invalid-number";

    await contactsService.addContact(mockReq as Request, mockRes as Response);

    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "Invalid phone number",
    });
  });

  it("should handle invalid address", async () => {
    mockReq.body.address = "short";

    await contactsService.addContact(mockReq as Request, mockRes as Response);

    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({message: "Invalid address"});
  });
});
