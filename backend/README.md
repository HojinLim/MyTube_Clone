# firstSetting backend
```
프로텍트 백엔드 엔드 첫 셋팅 규격화(v1.0)
maker: splash
createDate: 20. 10. 09
contact: db99136@naver.com

!업데이트시 꼭 history 기록할것!
```
## upgrade History
```
1. 20.10.09 - 프로텍트 splash 제작 
2. 21.12.08 - schema.graphql.js 셋팅 구문 & 파일 추가
```

# Strapi application
```
1. DB 셋팅
.env 파일을 만들고 밑의 텍스트를 복사 붙여 넣기합니다.ㅏ

DB_CLIENT=mysql
DB_DATABASE=DBName
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USERNAME=Username
DB_PASSWORD=Password

ex) DBName = 데이터 베이스 이름,  username = DB 사용자 이름, Password = 패스워드
그후 각각의 = 이후에 자신의 DB 정보를 입력합니다.

2. yarn dev
테스트 서버 실행
```
