from flask import Flask, request, session, jsonify, redirect
from flask_cors import CORS, cross_origin  # Cross-Origin Resorce Sharing
from db import Database
import pymysql

# 서로 다른 도메인 간에 리소스를 주고 받는 것을 허용해주거나 차단하는 설정

app = Flask(__name__)
CORS(app, supports_credentials=True)
app.secret_key = "Um_AI_Diary_Hungry_BBC_BBQ_Chicken"

db = Database()


def execute_query(query):
    try:
        db.cursor.execute(query)
    except pymysql.err.InternalError as e:
        # Handle the exception
        print("An InternalError occurred. Trying to reconnect.")
        # Reconnect to the database
        db.reconnect()
        # Retry the query
        db.cursor.execute(query)


@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        data = request.get_json()
        user_id = data["userId"]
        user_pw = data["password"]
        # try:
        # db.cursor.execute(
        #     f"SELECT * FROM userInfo WHERE userId='{user_id}' AND userPw='{user_pw}'"
        # )
        execute_query(
            f"SELECT * FROM userInfo WHERE userId='{user_id}' AND userPw='{user_pw}'"
        )
        result = db.cursor.fetchone()
        if result:
            session["user_id"] = user_id
            return jsonify({"success": 1, "user_id": user_id})
        else:
            return jsonify({"success": 0})
        # except Exception as e:
        #     print(e)
        #     return jsonify({"success": 0})
    if request.method == "GET":
        if "user_id" in session:
            # db.cursor.execute(
            #     f"SELECT * FROM userInfo WHERE userId='{session['user_id']}'"
            # )
            execute_query(
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

        # db.cursor.execute(
        #     f"INSERT INTO userInfo (userId, userPw, userName, userAge, userGender, userAddress) VALUES "
        #     f"('{user_id}', '{user_pw}', '{user_name}', '{user_age}', '{user_gender}', '{user_address}')"
        # )
        execute_query(
            f"INSERT INTO userInfo (userId, userPw, userName, userAge, userGender, userAddress) VALUES "
            f"('{user_id}', '{user_pw}', '{user_name}', '{user_age}', '{user_gender}', '{user_address}')"
        )

        db.conn.commit()

        return jsonify({"success": 1})


@app.route("/user", methods=["GET"])
def fetch_user():
    if request.method == "GET":
        # db.cursor.execute(
        #     f"SELECT * FROM userInfo WHERE userId='{session['user_id']}'"
        # )
        execute_query(
            f"SELECT * FROM userInfo WHERE userId='{session['user_id']}'"
        )
        result = db.cursor.fetchone()
        return jsonify(result)


@app.route("/diaries", methods=["GET"])
def fetch_diary():
    if request.method == "GET":
        # db.cursor.execute(
        #     f"SELECT * FROM diaryInfo WHERE userId='{session['user_id']}'"
        # )
        execute_query(
            f"SELECT * FROM diaryInfo WHERE userId='{session['user_id']}'"
        )
        result = db.cursor.fetchall()
        return jsonify(result)


@app.route("/diaries", methods=["POST"])
def create_diary():
    data = request.get_json()
    # db.cursor.execute(
    #     f"INSERT INTO diaryInfo (userId, diaryTitle, diaryContent) VALUES "
    #     f"('{session['user_id']}', '{data['title']}', '{data['content']}')"
    # )

    execute_query(
        f"INSERT INTO diaryInfo (userId, diaryTitle, diaryContent) VALUES "
        f"('{session['user_id']}', '{data['title']}', '{data['content']}')"
    )
    db.conn.commit()

    return {"success": 1}


@app.route("/diaries/<int:id>", methods=["GET"])
def fetch_diary_detail(id):
    # db.cursor.execute(f"SELECT * FROM diaryInfo WHERE num={id}")
    execute_query(f"SELECT * FROM diaryInfo WHERE num={id}")
    result = db.cursor.fetchone()
    return jsonify(result)


@app.route("/diaries/<int:id>", methods=["PUT"])
def update_diary(id):
    data = request.get_json()
    # db.cursor.execute(
    #     f"UPDATE diaryInfo SET diaryTitle='{data['title']}', diaryContent='{data['content']}' WHERE num={id}"
    # )
    execute_query(
        f"UPDATE diaryInfo SET diaryTitle='{data['title']}', diaryContent='{data['content']}' WHERE num={id}"
    )
    db.conn.commit()

    return {"success": 1}


@app.route("/diaries/<int:id>", methods=["DELETE"])
def delete_diary(id):
    # db.cursor.execute(f"DELETE FROM diaryInfo WHERE num={id}")
    execute_query(f"DELETE FROM diaryInfo WHERE num={id}")
    db.conn.commit()

    return {"success": 1}


if __name__ == "__main__":
    app.run(debug=True)
