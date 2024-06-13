from flask import Flask, request, session, jsonify, redirect
from flask_cors import CORS, cross_origin  # Cross-Origin Resorce Sharing
from db import Database
# 서로 다른 도메인 간에 리소스를 주고 받는 것을 허용해주거나 차단하는 설정

app = Flask(__name__)
CORS(app, supports_credentials=True, origins=[
    "http://localhost:5173",
])
app.secret_key = "Um_AI_Diary_Hungry_BBC_BBQ_Chicken"

db = Database()

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
        "title": "Diary 33",
        "content": "This is the content of diary2737 2.",
        "createdAt": "2022-01-01",
        "updatedAt": "2022-01-02",
    },
]


@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        data = request.get_json()
        user_id = data["userId"]
        user_pw = data["password"]
        db.cursor.execute(
            f"SELECT * FROM userInfo WHERE userId='{user_id}' AND userPw='{user_pw}'"
        )
        result = db.cursor.fetchone()
        if result:
            session["user_id"] = user_id
            print(session["user_id"])
            return jsonify({"success": 1, "user_id": user_id})
        else:
            return
    if request.method == "GET":
        if "user_id" in session:
            db.cursor.execute(
                f"SELECT * FROM userInfo WHERE userId='{session['user_id']}'"
            )
            result = db.cursor.fetchone()
            return jsonify({"success": 1, "userName": result['userName']})
        else:
            return jsonify({"success": 0})


@app.route("/logout", methods=["GET"])
def logout():
    session.pop("user_id", None)
    return {"success": 1}


@app.route("/register", methods=["POST"])
def signup():
    if request.method == "POST":
        data = request.get_json()
        user_id = data["userId"]
        user_pw = data["password"]
        user_name = data["name"]
        user_age = data["age"]
        user_address = data["address"]
        user_gender = data["gender"]

        print(user_id, user_pw, user_name, user_age, user_address, user_gender)

        db.cursor.execute(
            f"INSERT INTO userInfo (userId, userPw, userName, userAge, userGender, userAddress) VALUES "
            f"('{user_id}', '{user_pw}', '{user_name}', '{user_age}', '{user_gender}', '{user_address}')"
        )

        db.conn.commit()

        return jsonify({"success": 1})



@app.route("/diaries")
def fetchDiary():
    return diary_data


@app.route("/diaries/<int:id>")
def fetchDiary_detail(id):
    return diary_data[id - 1]


if __name__ == "__main__":
    app.run(debug=True)
