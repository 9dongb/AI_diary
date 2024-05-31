from flask import Flask, request
from flask_cors import CORS  # Cross-Origin Resorce Sharing
# 서로 다른 도메인 간에 리소스를 주고 받는 것을 허용해주거나 차단하는 설정

app = Flask(__name__)
CORS(app, supports_credentials=True)  # 다른 포트에 대한 보안 제거
app.secret_key = "Um_AI_Diary_Hungry_BBC_BBQ_Chicken"

# empty_id = '9dongb'
# empty_pw = '1234'


diary_data = [
    {
        "id": 1,
        "title": "배고픈하루 1",
        "content": "This is the content of diary 1.dddddddddddddddddddddddddddddddddddd",
        "createdAt": "2022-01-01",
        "updatedAt": "2022-01-02",
    },
    {
        "id": 2,
        "title": "Diary 2",
        "content": "This is the content of diary 2.",
        "createdAt": "2022-01-01",
        "updatedAt": "2022-01-02",
    },
]

# yahoo wahoo jahoo wahoo


@app.route("/")
def index():
    return "lkcjf;lasjdf;laksjdf;lasjdf;lkjas"


@app.route("/login", methods=["GET", "POST"])
def login():
    data = request.json

    print(data)
    return {"status": "ok"}


@app.route("/diaries")
def fetchDiary():
    return diary_data


@app.route("/diaries/<int:id>")
def fetchDiary_detail(id):
    return diary_data[id - 1]


if __name__ == "__main__":
    app.run(debug=True)
