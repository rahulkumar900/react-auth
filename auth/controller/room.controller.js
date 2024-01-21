/**
 * fill all room information
 */
const { default: mongoose } = require("mongoose");
const Room = require("../models/room.model");

const create = async (req, res) => {
  try {
    const newRoom = new Room(req.body);
    // save new Room to database
    savedRoom = await newRoom.save();
    res.status(201).json({
      success: true,
      message: "Room created successfully",
      data: savedRoom,
    });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      res.status(422).json({
        success: false,
        message: "Validation error",
        error: error.errors,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Internal server Error",
        error: error.message,
      });
    }
  }
};

const list = async (req, res) => {
  try {
    const rooms = await Room.find({});
    res.status(200).json({
      success: true,
      message: "Successfully retrieved all rooms",
      data: rooms,
    });
  } catch (error) {
    console.error("Error in list function:", error);

    if (error instanceof Error && error.name === "ValidationError") {
      // Mongoose validation error (e.g., invalid data)
      res.status(422).json({
        success: false,
        message: "Validation error",
        errors: error.errors,
      });
    } else {
      // Other unexpected errors
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }
};

/**
 * read A single room
 *   api/:id
 */

const read = async () => {
  console.log("red single room ");
};

/**
 * update single room data
 */

const update = async () => {
  console.log("update");
};

/**
 * delete single room data 
    /:id
 */

const destroy = async () => {
  console.log("delete single room ");
};

module.exports = { create, list, read, update, destroy };
