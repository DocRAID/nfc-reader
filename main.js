const { NFC } = require('nfc-pcsc'); //nfc 모듈 
const express = require('express'); //express 
const { db } = require('./variable/database.js'); //db 모듈 
const app = express();
app.use(express.json());
app.listen(8080, ()=> console.log('server running!'))
//attend에 이름도 넣으셈
function insertInfo(input_uid){
	//정보가 없을시 임의로 등록하는 함수
	try {
		let stuId, stuName,position;
		const readline = require("readline");
		const rl = readline.createInterface({
			input: process.stdin,
			output: process.stdout,
		});
		console.log("학번을 기입해주세요 ex)1학년 1반 1번 => 1101")
		rl.on("line", (line) => {
			if(!stuId){
				stuId=line
				stuId=parseInt(stuId)
				console.log("이름을 적어주세요")
			}
			else if(!stuName){
				stuName=line
				console.log("고등학생 : 1 , 중학생 : 2 , 교직원 : 0")
				//직책 넣는건 아직 안만듬
			}
			else if(!position){
				position=line
				stuId+=(1000*position)
				rl.close();
			}
		});
		rl.on('close', () => {
			console.log(stuId,stuName,input_uid);
			
				db('student_info').insert({
					stu_id: stuId,
					stu_name: stuName,
					nfc_uid: input_uid
				}).then(console.log("정상적인 등록이 되었습니다. 위 정보에 이상이 있으시면 문의 바랍니다."))
				stuId=""
				stuName=""
				input_uid=0
				return 0;
		})
	} catch (error) {
		console.log("에러!")
	}
}
//만들어야 할거 : 학생이 아닐때 뭐시기 하고 미들워에 만들기
const nfc = new NFC();
nfc.on('reader', reader => {
	console.log(`${reader.reader.name} 기기가 인식되었습니다.`);
	reader.on('card', card => {
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
				.then(async(data)=>{
					if(data[0]!=null){
						console.log(data[0].stu_id + " 번 " + data[0].stu_name + " 님이 조회되셨습니다.")
						await db('attend').insert({
							//id:null,
							stu_id:data[0].stu_id,
							israte:'yes',
							// attend_time:''
						})
						const whatPosition = data[0].stu_id/1000
						console.log(whatPosition)
						//뭘 기준으로 하려했더라..
					}
					else{
						console.log("등록되지 않은 nfc 입니다.")
						console.log("카드를 대고 있는 상태에서 정보를 기입합니다.")
						console.log("등록을 취소하시려면 카드를 때주세요")
						insertInfo(card.uid);
					}
				})
			})()
		} catch (error) {
		}
	});

	reader.on('card.off', card => {
		console.log("nfc가 정상처리 되었습니다.")
		// console.log(`${reader.reader.name}  card removed`, card);
		//뭔가 되어야 함
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