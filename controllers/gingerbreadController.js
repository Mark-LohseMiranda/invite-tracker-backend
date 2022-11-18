const { Gingerbread } = require("../models");
require("dotenv").config();
const nodemailer = require("nodemailer");

module.exports = {
	async createEntry({ body }, res) {
		try {
			const findEmail = await Gingerbread.findOne({ email: body.email });
			if (findEmail) {
				return res
					.status(503)
					.json({ message: "email address already in use" });
			}
			const gingerbread = await Gingerbread.create(body);
			if (!gingerbread) {
				return res.status(400).json({ message: "unable to create entry" });
			}
			let mailTransporter = nodemailer.createTransport({
				service: "gmail",
				auth: {
					user: process.env.GOOGLE,
					pass: process.env.GOOGLEPW,
				},
				from: process.env.GOOGLE,
			});
			let mailDetails = {
				from: "Mark Lohse-Miranda <mark.lohsemiranda@gmail.com>",
				to: gingerbread.email,
				subject: "Gingerbread House Building Time!",
				text: `It's that time again! December 4th, 2022 @ 230p. 7509 Canyon Rd E, Puyallup WA 98371. Here is your personalized link to RSVP for Gingerbread House party: http://www.url.com/${gingerbread._id}`,
				html: `<div style="text-align: center;"><H1>2022 Gingerbread House Party</H1><br>
                <p>It's that time again!</p>
				<p>Casual dress, bring a dish if you want. BYOC (bring your own candy)</p>
				<p>December 4th, 2022 @ 230p</p>
				<p>7509 Canyon Rd E</p>
				<p>Puyallup WA 98371</p><br>
                <p>Please follow your personalized link below (please don't share it) to RSVP</p>
                    <p>https://gingerbread.mark-lohsemiranda.com?guest=${gingerbread._id}</p> </div>`
			};
			mailTransporter.sendMail(mailDetails, function (err, data) {
				if (err) {
					console.log(err);
				} else {
					console.log("Email sent successfully");
				}
			});
			res.json(gingerbread);
		} catch (err) {
			res.status(500).json(err);
		}
	},

	async findEntryByEmail({ body }, res) {
		try {
			const findEmail = await Gingerbread.findOne({ email: body.email });
			if (findEmail) {
				res.status(200).json(findEmail);
			} else {
				res
					.status(400)
					.json({ message: "Email not found please contact coordinator" });
			}
		} catch (err) {
			res.status(500).json(err);
		}
	},

	async findEntryByID({ body }, res) {
		try {
			const findGuest = await Gingerbread.findById(body.id);
			res.status(200).json(findGuest);
		} catch (err) {
			res.status(500).json(err);
		}
	},

	async updateEntry({ body, query }, res) {
		try {
			const updated = await Gingerbread.findOneAndUpdate(
				{ _id: query.guest },
				body,
				{ new: true }
			);
			if (!updated) {
				res.status(400).json({ message: "unable to update" });
			}
			res.status(200).json(updated);
		} catch (err) {
			res.status(500).json(err);
		}
	},

	async numbers(req, res) {
		try {
			const guests = await Gingerbread.aggregate([
				{ $group: { _id: null, guests: { $sum: "$guests" } } },
			]);
			const houses = await Gingerbread.aggregate([
				{ $group: { _id: null, houses: { $sum: "$houses" } } },
			]);
			res
				.status(200)
				.json({ guests: guests[0].guests, houses: houses[0].houses });
		} catch (err) {
			res.status(500).json(err);
		}
	},
};
