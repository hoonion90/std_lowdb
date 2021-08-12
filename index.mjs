//lowdb 선언
const low = require('lowdb');

//lowdb 동기식으로 관리
const FileSync = require('lowdb/adapters/FileSync');

//동기식으로 관리할 데이터베이스 json 파일 경로 설정
const adapter = new FileSync('db.json');

//lowdb 사용 변수 설정
const db = low(adapter);
 
//json 파일내 테이블 역할을 하는
//데이터 선언 (리스트, 객체 등 모든 자료형 가능하다)
//lowdb는 뒤에 항상 .write()를 붙여야되는데,
//저장(데이터 갱신)의 의미로 이해하면 좋을듯하다.
db.defaults({ posts: [], user: {} }).write();
 
//데이터 추가 get
//post[] 리스트에 객체형태로 데이터 추가 
//.write()가 없으면 저장이 되지 않는다.
db.get('posts')
.push({ id: 1, title: 'lowdb is awesome'})
.write();
 
//데이터 추가 (객체내 속성 추가 set)
//user이라는 객체 내 속성을 만들어 value 추가
//역시 .write()가 있어야 저장이 된다.
db.set('user.name', 'typicode')
.write()

//데이터 읽기
let posts = db.get('posts').value();

//데이터 수정
db.get('posts')
.find({id : 1})
.assign({title : 'Hello~'})
.write();

//데이터 삭제
db.get('posts')
.remove({id:1})
.write();