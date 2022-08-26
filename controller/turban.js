const Turban = require("../models/Turban");

const createTurban = async (req, res) => {
  try {
    const { name, location, description, imageUrl, modelUrl, videoUrl } =
      req.body;

    if (!name || !location || !description || !imageUrl)
      return res.status(400).json({ message: "Provide all neccessary data" });

    const newTurban = new Turban({
      name,
      location,
      description,
      imageUrl,
      modelUrl,
      videoUrl,
    });

    const savedTurban = await newTurban.save();

    return res.status(200).json(savedTurban);
  } catch (error) {
    console.log("Error: createTurban", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

const editTurban = async (req, res) => {
  try {
    const { name, location, description, imageUrl, modelUrl, videoUrl } =
      req.body;

    const { id } = req.params;

    if (!name || !location || !description || !imageUrl)
      return res.status(400).json({ message: "Provide all neccessary data" });

    const turban = await Turban.findById(id);

    if (!turban) return res.status(404).json({ message: "Turban not found" });

    const updatedTurban = await Turban.findById(id, {
      name,
      location,
      description,
      imageUrl,
      modelUrl,
      videoUrl,
    });

    return res.status(200).json(updatedTurban);
  } catch (error) {
    console.log("Error: createTurban", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

const deleteTurban = async (req, res) => {
  try {
    console.log("DeleteTurban");
    const { id } = req.params;
    await Turban.findByIdAndDelete(id);
    return res.status(200).json({ message: "Turban deleted" });
  } catch (error) {
    console.log("turban controller, deleteT urban\n", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const getAllTurbans = async (req, res) => {
  try {
    const turbans = await Turban.find().sort({ createdAt: -1 });
    return res.status(200).json(turbans);
  } catch (error) {
    console.log("turban controller, getAllTurbans\n", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const getTurbanById = async (req, res) => {
  try {
    const { id } = req.params;

    const turban = await Turban.findById(id);

    if (!turban) return res.status(404).json({ message: "Turban Not Found" });

    return res.status(200).json(turban);
  } catch (error) {
    console.log("turban controller, getAllTurbans\n", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  createTurban,
  editTurban,
  deleteTurban,
  getAllTurbans,
  getTurbanById,
};
