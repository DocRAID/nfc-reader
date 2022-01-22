
const { NFC } = require('nfc-pcsc');
const nfc = new NFC(); // optionally you can pass logger

const express = require('express');
const app = express();
const mysql_dbc = require('./models/db_con')();
const pool = mysql_dbc.init_pool();
app.set('port', process.env.PORT || 8080);

nfc.on('reader', reader => {

	console.log(`${reader.reader.name} 기기가 인식되었습니다.`);
	// enable when you want to auto-process ISO 14443-4 tags (standard=TAG_ISO_14443_4)
	// when an ISO 14443-4 is detected, SELECT FILE command with the AID is issued
	// the response is available as card.data in the card event
	// see examples/basic.js line 17 for more info
	// reader.aid = 'F222222222';

	reader.on('card', card => {

		// card is object containing following data
		// [always] String type: TAG_ISO_14443_3 (standard nfc tags like MIFARE) or TAG_ISO_14443_4 (Android HCE and others)
		// [always] String standard: same as type
		// [only TAG_ISO_14443_3] String uid: tag uid
		// [only TAG_ISO_14443_4] Buffer data: raw data from select APDU response

		console.log("nfc가 입력되었습니다.")
		console.log(`${reader.reader.name}  card detected`, card);
		console.log(card.uid)

		// connection.query('select * from new_boards', function (err, result) {
		// 	console.log(err);
		// 	if (err) {
		// 		var err = new Error('Not Found');
		// 		err.status = 404;
		// 		console.log(err)
		// 		// next(err);
		// 	} else {
		// 		console.log(JSON.stringify(result));
		// 		res.json(result);
		// 	}
		// 	connection.release();
		// });
	});

	reader.on('card.off', card => {
		console.log("nfc가 정상처리 되었습니다.")
		console.log(`${reader.reader.name}  card removed`, card);
	});

	reader.on('error', err => {
		console.log("에러")
		console.log(`${reader.reader.name}  an error occurred`, err);
	});

	reader.on('end', () => {
		console.log("기기가 연결되지 않았습니다.")
		console.log(`${reader.reader.name}  device removed`);
		
	});

});

nfc.on('error', err => {
	console.log('an error occurred', err);
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 서버 실행 중 ..')
});