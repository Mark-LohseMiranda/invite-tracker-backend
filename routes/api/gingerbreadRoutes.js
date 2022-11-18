const router = require("express").Router();

const {
	createEntry,
	updateEntry,
	numbers,
	findEntryByEmail,
	findEntryByID
} = require("../../controllers/gingerbreadController");

router.route("/").post(createEntry);

router.route("/").put(updateEntry);

router.route("/").get(numbers);

router.route("/email").put(findEntryByEmail);

router.route("/id").put(findEntryByID);

module.exports = router;
