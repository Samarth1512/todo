const router = require("express").Router();
const User = require("../models/user");
const List = require("../models/list");
const multer = require('multer');
const storage = multer.memoryStorage();
const imageUpload = multer({ storage: storage });
//create

router.post("/addTask", async (req, res) => {
  try {
    const { title, body, id } = req.body;
    const taskimg = req.file ? req.file.buffer.toString('base64') : null;

    
    const existingUser = await User.findById(id);
    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const list = new List({ taskimg, title, body, user: existingUser._id });
    await list.save();

    existingUser.list.push(list._id);
    await existingUser.save();

    return res.status(200).json({ list });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});


//update
router.put("/updateTask/:id", async (req, res) => {
  try {
    const { title, body } = req.body;
    const list = await List.findByIdAndUpdate(req.params.id, { title, body });
    list.save().then(() => res.status(200).json({ message: "Task Updated" }));
  } catch (error) {
    console.log(error);
  }
});

//delete
router.delete("/deleteTask/:id", async (req, res) => {
  try {
    const { id } = req.body;
    const existingUser = await User.findByIdAndUpdate(id, {
      $pull: { list: req.params.id },
    });
    if (existingUser) {
      await List.findByIdAndDelete(req.params.id).then(() =>
        res.status(200).json({ message: "Task Deleted" })
      );
    }
  } catch (error) {
    console.log(error);
  }
});

//getTska
router.get("/getTasks/:id", async (req, res) => {
  try {
    const list = await List.find({ user: req.params.id }).sort({
      createdAt: -1,
    });
    if (list.length !== 0) {
      res.status(200).json({ list: list });
    }
  } catch (error) {
    console.log(error);
  }
});
// Add a new route for fetching user details
router.get("/getAllUserDetails", async (req, res) => {
  try {
    // Fetch all users along with their tasks
    const users = await User.find().populate('list');

    // Extract relevant information from each user
    const userDetails = users.map(user => {
      const { _id, username, list, role } = user;
      return { _id, username, list: list || [], role };
    });

    res.status(200).json(userDetails);
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
module.exports = router;
