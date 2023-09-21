# 프로젝트 제목: YOLOv8을 활용한 EDS 공정에서의 칩 식별자 자동 감지

## 개요
이 프로젝트는 EDS 공정 중 Inking 단계에서 칩에 부여되는 식별자나 코드를 자동으로 감지하기 위해 YOLOv8 모델을 사용합니다. 이를 통해 인력 및 시간 절약에 기여하고 생산 프로세스의 효율성을 높일 수 있습니다. 또한, 이전 단계에서 발견하지 못한 불량 칩이나 결함이 있는 부분을 식별하고 경계 상자로 표시하여 자동으로 분류하고 제거하는데 사용됩니다.

## 웹 UI/UX
웹 디자인은 신뢰감과 안정감에 중점을 두고 있으며, 메인 색상으로 짙은 파란색과 밝은 화이트, 깔끔한 검정색을 조합하여 상쾌한 느낌을 주었습니다. 메인 UI는 사용자의 몰입도와 메시지 전달력 증가를 위해 전체 페이지로 구성되었으며, 직급에 따라 다른 UI를 제공합니다.

## 설치 및 사용 방법
프로젝트는 front, back, iot 세 개의 폴더로 구성되어 있습니다.


### 프론트엔드 설정
터미널에서 다음과 같이 입력하세요:

```bash
Copy code
cd front
npm install
그리고 루트 디렉토리에 .env 파일을 다음과 같이 생성하세요:

bash
Copy code
REACT_APP_KAKAO_ID={{your KAKAO_ID}}
REACT_APP_URL=http://{{your IP}}:8080 => mysql port
```



### 백엔드 설정
터미널에서 다음과 같이 입력하세요:

```bash
Copy code
cd back
npm install
그리고 루트 디렉토리에 .env 파일을 다음과 같이 생성하세요:

bash
Copy code
NODE_ENV=development
PORT=3001
LOGGER_LEVEL=debug
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=project
DB_ID=root
DB_PASS=1234
DB_DIALECT=mysql
MONGO_URL="mongodb+srv://{{your MONGODB url}}"
COOKIE_SECRET=secretkey
KAKAO_ID={{yourid}}
```


### IoT 설정
터미널에서 다음과 같이 입력하세요:

```bash
Copy code
cd iot
npm install # 또는 pip install (환경에 따라 다름)
cap = cv2.VideoCapture({{비전 센서 포트 번호}})를 본인의 설정에 맞게 수정하세요.

YOLO GUI를 실행한 후, 웹 브라우저에서 localhost:5000/detection을 엽니다. 이 URL은 React 애플리케이션 내에서 사용할 수 있습니다.
```



