FROM azul/zulu-openjdk:8

WORKDIR /var/jenkins_home/workspace/stamper/backend
# build가 되는 시점에 JAR_FILE 이라는 변수명에 build/libs/*.jar 표현식을 선언했다는 의미
ARG JAR_FILE=build/libs/*.jar

# 위에 선언한 JAR_FILE 을 app.jar 로 복사
COPY ${JAR_FILE} app.jar

# jar 파일을 실행하는 명령어(java -jar jar파일)
ENTRYPOINT ["java","-jar","/app.jar"]
