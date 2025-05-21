FROM python:3.8-slim-bookworm
# FROM ghcr.io/astral-sh/uv:python3.12-bookworm-slim

RUN mkdir -p /opt/oracle

RUN apt update -y && apt upgrade -y && \
    apt install -y build-essential libaio1 curl wget zip unzip && \
    apt clean && \
    wget -O restic.bz2 https://github.com/restic/restic/releases/download/v0.18.0/restic_0.18.0_linux_amd64.bz2 &&\
    bunzip2 restic.bz2 &&\
    chmod +x restic &&\
    mv restic /usr/local/bin/ &&\
    rm -f restic.bz2 && \
    cd /opt/oracle && \
    curl -O https://download.oracle.com/otn_software/linux/instantclient/2340000/instantclient-basiclite-linux.x64-23.4.0.24.05.zip && \
    unzip instantclient-basiclite-linux.x64-23.4.0.24.05.zip && \
    rm -rf instantclient-basiclite-linux.x64-23.4.0.24.05.zip META-INF && \
    curl -O https://download.oracle.com/otn_software/linux/instantclient/2340000/instantclient-sqlplus-linux.x64-23.4.0.24.05.zip && \
    unzip instantclient-sqlplus-linux.x64-23.4.0.24.05.zip && \
    rm -rf instantclient-sqlplus-linux.x64-23.4.0.24.05.zip META-INF && \
    echo /opt/oracle/instantclient_23_4 > /etc/ld.so.conf.d/oracle-instantclient.conf && \
    ldconfig