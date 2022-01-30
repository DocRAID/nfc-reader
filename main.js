
const { NFC } = require('nfc-pcsc'); //nfc 모듈 
const express = require('express'); //express 
const { db } = require('./variable/database.js'); //db 모듈 
const app = express();
app.use(express.json());
app.listen(8080, ()=> console.log('server running!'))

const nfc = new NFC(); // optionally you can pass logger
nfc.on('reader', reader => {

	console.log(`${reader.reader.name} 기기가 인식되었습니다.`);

	reader.on('card', card => {
		// [only TAG_ISO_14443_3] String uid: tag uid
		// [only TAG_ISO_14443_4] Buffer data: raw data from select APDU response

		console.log("nfc가 입력되었습니다.")
		console.log(`${reader.reader.name}  card detected`, card);
		console.log(card.uid)

		// try {
		// 	async function select() {
		// 		await db.select('*').from('test')
		// 	}
		// } catch (error) {
			
		// }
		// console.log(select())
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

