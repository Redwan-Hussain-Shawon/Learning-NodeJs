const express = require("express");
const router = express.Router();

const Student = require("../models/student.model");

router.get("/", async (req, res) => {
  try {
      const students = await Student.find();
      if (students) {
              res.json(students);
      } else {
            
      }
   res.json({ data: "not found" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status.json({ message: "Student not found" });

    return res.json(student);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
   const students = await Student.create(req.body);
   if (students) {
     res.json(students);
   } else {
     res.json({ data: "not found" });
   }

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updateStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updateStudent)
      return res.status.json({ message: "Student not found" });
    return res.status(201).json(updateStudent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id)
        if (!student) return res.status.json({ message: "Student not found" });

        res.json({message:'Student Deleted'})
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router