const express = require('express');
const app = express();
let dbservices = require("./services/dbservices");

let fileUpload = require('express-fileupload');
let cors = require("cors");
app.use(fileUpload());
app.use(cors());


app.post('/upload', (req, res) => {
	let posts = req.body.posts;
	if (!posts) {
		return res.status(400).json({ msg: "Empty posts has been sent" });

	}
	if (req.files === null) {
		return res.status(400).json({ msg: "No file Uploaded" });
	}
	const file = req.files.file;
	let fileStr = Date.now() + file.name;
	file.mv(`${__dirname}/client/public/uploads/${fileStr}`, async err => {
		if (err) {
			console.error(err);
			return res.status(500).send(err);
		}

		// updating db
		let postData = {
			posts: req.body.posts,
			imagepath: `uploads/${fileStr}`
		}

		let response = await dbservices.updatePosts(postData);

		if (response) {
			return res.json({ status: 200, filename: file.name, filePath: `/uploads/${file.name}` });

		} else {
			return res.json({ msg: "something went wrong" });
		}

	})
});

app.get('/posts', async (req, res) => {

	let response = await dbservices.getPosts();

	if (response.length > 0) {
		return res.json({
			status: 200,
			result: response
		})
	}
});



app.listen(5000, () => {
	console.log("server started 0n 5000");
})