import pymysql

DATABASE_HOST = "localhost"
DATABASE_PORT = 55005
DATABASE_USER = "root"
DATABASE_PASSWORD = "1927"
DATABASE_DB = "ai_servicedb"


class Database:
    """
    Database 클래스는 MySQL 데이터베이스와 연결을 담당합니다.
    """

    def __init__(self):
        """
        Database 클래스의 생성자입니다.
        """

        self.conn = pymysql.connect(
            host=DATABASE_HOST,
            user=DATABASE_USER,
            password=DATABASE_PASSWORD,
            port=DATABASE_PORT,
            db=DATABASE_DB,
            charset="utf8",
        )  # (1) MYSQL Connection 연결 (연결자 = pymysql.connect(연결옵션))
        self.cursor = self.conn.cursor(
            pymysql.cursors.DictCursor
        )  # (2) 연결자로 부터 DB를 조작할 Cusor 생성 (커서이름 = 연결자.cursor())
        self.init_db()

    def reconnect(self):
        """
        데이터베이스 재연결 함수입니다.
        """
        self.conn = pymysql.connect(
            host=DATABASE_HOST,
            user=DATABASE_USER,
            password=DATABASE_PASSWORD,
            port=DATABASE_PORT,
            db=DATABASE_DB,
            charset="utf8",
        )
        self.cursor = self.conn.cursor(pymysql.cursors.DictCursor)

    def init_db(self):
        """
        데이터베이스 시딩 전용 함수입니다. 테이블이 없을 경우 테이블을 생성합니다.
        """
        connection = pymysql.connect(
            host=DATABASE_HOST,
            user=DATABASE_USER,
            password=DATABASE_PASSWORD,
            port=DATABASE_PORT,
            db=DATABASE_DB,
        )
        try:
            with connection.cursor() as cursor:
                sql_user_info = """
                CREATE TABLE IF NOT EXISTS userInfo (
                    num int NOT NULL AUTO_INCREMENT PRIMARY KEY,
                    userId varchar(20) NOT NULL UNIQUE,
                    userPw varchar(20) NOT NULL,
                    userName varchar(8) NOT NULL,
                    userAge int DEFAULT NULL,
                    userGender varchar(2) DEFAULT NULL,
                    userAddress varchar(100) DEFAULT NULL,
                    signupTime timestamp NULL DEFAULT CURRENT_TIMESTAMP,
                    INDEX userId_idx (userId)
                );"""
                cursor.execute(sql_user_info)

                sql_diary_info = """
                CREATE TABLE IF NOT EXISTS diaryInfo (
                    num int NOT NULL AUTO_INCREMENT PRIMARY KEY,
                    userId varchar(20) NOT NULL,
                    diaryTitle varchar(100) NOT NULL,
                    diaryContent text NOT NULL,
                    diaryTime timestamp NULL DEFAULT CURRENT_TIMESTAMP,
                    INDEX userId_idx (userId)
                );"""
                cursor.execute(sql_diary_info)

            connection.commit()
        finally:
            connection.close()
