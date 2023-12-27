require('dotenv').config({ path: './db/project.env' });
const express = require('express');
const app = express();
const mysql = require('./db.js');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'uploads/');
	},
	filename: function (req, file, cb) {
		cb(null, new Date().valueOf() + path.basename(file.originalname));
	},
});

const upload = multer({ storage: storage });

app.use(express.json({ limit: '50mb' }));
app.use('/public', express.static('uploads'));

app.post('/photos', upload.single('file'), (req, res) => {
	const file = req.file;
	res.status(200).json({ message: '등록성공', filename: file.filename });
});

// app.post('/photos', upload.array('fileInput', 12), (req, resp) => {
// 	for (let file of req.files) {
// 		console.log(file);
// 	}
// });

app.post('/ptupload', async (req, rep) => {
	let result = await mysql.query('ptinsert', req.body.param);
	rep.send(result);
});

app.get('/ptlist', async (req, rep) => {
	let result = await mysql.query('ptlist');
	rep.send(result);
});

app.get('/ptlist/:no', async (req, rep) => {
	let result = await mysql.query('ptinfo', req.params.no);
	rep.send(result[0]);
});

app.listen(3000, () => {
	console.log('서버 시작');
});
