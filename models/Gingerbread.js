const { Schema, model } = require("mongoose");

const gingerbreadSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	guests: {
		type: Number,
	},
	houses: {
		type: Number,
	},
});

const Gingerbread = model("Gingerbread", gingerbreadSchema);

module.exports = Gingerbread;
