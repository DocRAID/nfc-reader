
const { NFC } = require('nfc-pcsc'); //nfc 모듈 
const express = require('express'); //express 
const { db } = require('./variable/database.js'); //db 모듈 
const { now } = require('sequelize/dist/lib/utils');
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
		// console.log(`${reader.reader.name}  card detected`, card);
		console.log(card.uid)

		try {
			(async () => {
				// 만약 입력된 uid가 데이터베이스에 없다면 register 펑션 작동. SELECT stu_id FROM student_info WHERE nfc_uid='048a235ad37280';
				// 있으면 정상적으로 처리 
				const data = await db.select('stu_id','stu_name')
				.from('student_info')
				.where('nfc_uid',card.uid)
				.catch(function(error) { console.log("등록되지 않은 정보입니다."+ error) }); // 여기가 이상함.

				console.log(data[0].stu_id + " 번 " + data[0].stu_name + " 님이 조회되셨습니다.")
				//INSERT INTO attend VALUES(NULL,1213,'rate',NOW())
				// db('attend').insert({
				// 	id:null,
				// 	stu_id:data[0].stu_id,
				// 	israte:'yes',
				// 	attend_time:now()
				// })
			
			})()
		} catch (error) {
			
		}
	});

	reader.on('card.off', card => {
		console.log("nfc가 정상처리 되었습니다.")
		// console.log(`${reader.reader.name}  card removed`, card);
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

