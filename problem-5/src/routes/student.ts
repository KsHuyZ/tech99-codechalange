import { Router, Request, Response } from "express";
import Student from "../models/student";
import httpStatus from "http-status";

const router = Router();

// Create a student
router.post("/", async (req: Request, res: Response) => {
  try {
    const student = new Student(req.body);
    await student.save();
    return res.status(httpStatus.CREATED).json(student);
  } catch (err) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ error: (err as Error).message });
  }
});

// List students with basic filters (name, enrolled)
router.get("/", async (req: Request, res: Response) => {
  try {
    const { name, age } = req.query;
    const filter: any = {};
    if (name) filter.name = { $regex: name, $options: "i" };
    if (age) filter.age = age;
    const students = await Student.find(filter);
    return res.status(httpStatus.OK).json(students);
  } catch (err) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: (err as Error).message });
  }
});

// Get student by id
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student)
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ error: "Student not found" });
    return res.status(httpStatus.OK).json(student);
  } catch (err) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: (err as Error).message });
  }
});

// Update student by id
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!student)
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ error: "Student not found" });
    return res.status(httpStatus.OK).json(student);
  } catch (err) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ error: (err as Error).message });
  }
});

// Delete student by id
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student)
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ error: "Student not found" });
    return res.status(httpStatus.OK).json({ message: "Student deleted" });
  } catch (err) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: (err as Error).message });
  }
});

export default router;
