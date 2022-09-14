# 매치기 클라이언트

[전체 아키텍처 확인하기](https://github.com/voyage-fianl-team1)

## 📚 주요 기술 스택

![react](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

![redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)
![redux](https://img.shields.io/badge/ReactQuery-FF4154?style=for-the-badge&logo=react-query&logoColor=white)

![tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) 

![socket](https://img.shields.io/badge/SockJS-010101?&style=for-the-badge&logo=Socket.io&logoColor=white)
![socket](https://img.shields.io/badge/StompJS-43B02A?&style=for-the-badge&logo=Sogou&logoColor=white)

## 💻 Code Reusability

- 컴포넌트에서 모든 비즈니스로직을 분리하여 custom hook 으로 구현한 [hooks pattern](https://blog.bitsrc.io/new-react-design-pattern-return-component-from-hooks-79215c3eac00) 을 따르고 있습니다.(서비스에서 사용된 모든 로직은 내부 구현사항에 상관없이 재사용가능합니다.)


## 💁 역할

### 태민

- **회원가입 및 로그인(+카카오)**
  - axios intercept를 이용한 401 에러시 refresh 요청
- **채팅 및 실시간 알림**
  - 부실했던 공식문서를 대신해 useStomp() 커스텀 훅으로 구현
- **마이페이지**
  - 내 정보의 특성상 본인이 직접 수정하지 않는 이상 데이터가 변할일이 없는 부분은 캐싱 활용하기
- **CI/CD**
  - github Actions 으로 CI/CD 파이프라인 구축하기
- **배포**
  - AWS S3 + CloudFront + Route53 배포환경 구축

### 지민
 
- **경기목록**
- **경기 CRUD**
- **댓글**
- **참가목록 및 경기결과**
- **검색 및 정렬**
- **지도**
- **PWA**


