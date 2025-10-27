import Contact from "../models/contact.models.js";
import mongoose from "mongoose";


export const getContacts = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const option = {
      page: parseInt(page),
      limit: parseInt(limit),
    };

    const result = await Contact.paginate({}, option);

    res.render("home", {
      totalDocs: result.totalDocs,
      limit: result.limit,
      totalPages: result.totalPages,
      currentPage: result.page,
      pagingCounter: result.pagingCounter,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      contacts: result.docs,
    });
  } catch (error) {
    console.error("Pagination error:", error);
    res.status(500).send("Server Error");
  }

};


export const getContact = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ error: "Invalid ID format" });
  }

  const contact = await Contact.findOne({ _id: id });
  res.render("show-contact", { contact });
};

export const addContactPage = (req, res) => {
  res.render("add-contact");
};

export const addContact = async (req, res) => {
  await Contact.create(req.body);
  res.redirect("/");
};

export const updateContactPage = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  try {
    const contact = await Contact.findById(id);

    if (!contact) {
      return res.status(404).json({ error: "ID Not found" });
    }

    res.render("update-contact", { contact });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const updateContact = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ error: "Invalid ID format" });
  }
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/");
  } catch (error) {}
};

export const deleteContact = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ error: "Invalid ID format" });
  }
  await Contact.findByIdAndDelete(req.params.id);
  res.redirect("/");
};
