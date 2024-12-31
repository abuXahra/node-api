const Adverts = require("../models/Adverts");

// Create a new advert
exports.createAds = async (req, res) => {
  try {
    const advert = new Adverts(req.body);

    await advert.save();
    res.status(201).json(advert);
  } catch (err) {
    res.status(400).json({ message: "Error creating advert", error: err });
  }
};

// Get advert by ID
exports.getAd = async (req, res) => {
  try {
    const advert = await Adverts.findById(req.params.id);
    if (advert) {
      res.json(advert.getAdvertOrPlaceholder());
    } else {
      res.status(404).json({ message: "Advert not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error fetching advert", error: err });
  }
};

// Get all adverts
exports.getAds = async (req, res) => {
  try {
    const advert = await Adverts.find();
    res.status(200).json(advert);
  } catch (err) {
    res.status(500).json({ message: "Error fetching advert", error: err });
  }
};

// Update an advert
exports.updateAd = async (req, res) => {
  try {
    const advert = await Adverts.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (advert) {
      res.json(advert);
    } else {
      res.status(404).json({ message: "Advert not found" });
    }
  } catch (err) {
    res.status(400).json({ message: "Error updating advert", error: err });
  }
};

// Delete an advert
exports.deleteAd = async (req, res) => {
  try {
    const advert = await Adverts.findByIdAndDelete(req.params.id);
    if (advert) {
      res.json({ message: "Advert deleted successfully" });
    } else {
      res.status(404).json({ message: "Advert not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error deleting advert", error: err });
  }
};
