const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roomSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    imageUrl: [
      {
        type: String,
      },
    ],
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
    },
    discountedPrice: {
      type: Number,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    person: {
      type: Number,
    },
    roomType: {
      type: String,
      enum: ["Ac", "Non-Ac"],
    },
    rating: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Room = mongoose.model("Room", roomSchema);
module.exports = Room;
