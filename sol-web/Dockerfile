FROM python:3.8-slim-bookworm

RUN mkdir -p /opt/oracle

RUN apt update -y && apt upgrade -y && \
    apt install -y build-essential libaio1 curl wget zip unzip && \
    apt clean && \
    cd /opt/oracle && \
    curl -O https://download.oracle.com/otn_software/linux/instantclient/2340000/instantclient-basiclite-linux.x64-23.4.0.24.05.zip && \
    unzip instantclient-basiclite-linux.x64-23.4.0.24.05.zip && \
    rm -rf instantclient-basiclite-linux.x64-23.4.0.24.05.zip META-INF && \
    curl -O https://download.oracle.com/otn_software/linux/instantclient/2340000/instantclient-sqlplus-linux.x64-23.4.0.24.05.zip && \
    unzip instantclient-sqlplus-linux.x64-23.4.0.24.05.zip && \
    rm -rf instantclient-sqlplus-linux.x64-23.4.0.24.05.zip META-INF && \
    echo /opt/oracle/instantclient_23_4 > /etc/ld.so.conf.d/oracle-instantclient.conf && \
    ldconfig