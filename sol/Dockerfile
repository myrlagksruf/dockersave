FROM debian:bookworm

WORKDIR /root/workspace

SHELL ["/bin/bash", "-l", "-c"]

RUN apt update && apt upgrade -y

RUN apt install -y curl

RUN apt install -y make gcc g++ git libaio1 wget unzip zip nano

RUN apt install -y build-essential gdb lcov pkg-config libbz2-dev libffi-dev libgdbm-dev libgdbm-compat-dev liblzma-dev libncurses5-dev libreadline6-dev libsqlite3-dev libssl-dev lzma lzma-dev tk-dev uuid-dev zlib1g-dev

RUN apt install -y default-libmysqlclient-dev

RUN apt clean

RUN mkdir /usr/local/nvm

ENV NVM_DIR /usr/local/nvm

RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash

RUN source $NVM_DIR/nvm.sh && nvm install 16 && nvm install 22

RUN source $NVM_DIR/nvm.sh && nvm use 16 && npm i -g yarn && nvm use 22 && npm i -g npm yarn

RUN curl -O https://www.python.org/ftp/python/3.12.6/Python-3.12.6.tgz

RUN tar xvf Python-3.12.6.tgz

WORKDIR /root/workspace/Python-3.12.6

RUN ./configure --enable-optimizations

RUN make -j "$(nproc)"

RUN make altinstall

WORKDIR /root/workspace

RUN rm -rf Python-3.12.6.tgz Python-3.12.6

RUN curl -O https://www.python.org/ftp/python/3.8.20/Python-3.8.20.tgz

RUN tar xvf Python-3.8.20.tgz

WORKDIR /root/workspace/Python-3.8.20

RUN ./configure --enable-optimizations

RUN make -j "$(nproc)"

RUN make altinstall

WORKDIR /root/workspace

RUN rm -rf Python-3.8.20.tgz Python-3.8.20

RUN git config --global user.name "Han Kyeol Kim"; \
    git config --global user.email "hankyeol.kim@meritz.co.kr"; \
    git config --global credential.helper store

RUN python3.8 -m pip install --upgrade pip setuptools wheel pytest-runner; \
    pip3.8 install --upgrade setuptools wheel pytest-runner pip;

RUN python3.12 -m pip install --upgrade pip setuptools wheel pytest-runner; \
    pip3.12 install --upgrade setuptools wheel pytest-runner pip;

RUN pip3.8 config --global set global.trusted_host sol-dist; \
    pip3.8 config --global set global.index_url http://sol-dist:3141/root/pypi/+simple/; \
    pip3.12 config --global set global.trusted_host sol-dist; \
    pip3.12 config --global set global.index_url http://sol-dist:3141/root/pypi/+simple/;

RUN source $NVM_DIR/nvm.sh && nvm use 16 && yarn config set registry "http://sol-dist:4873" && yarn config set ignore-engines true
RUN source $NVM_DIR/nvm.sh && nvm use 22 && yarn config set registry "http://sol-dist:4873" && yarn config set ignore-engines true

WORKDIR /root

RUN curl -o vscode-server-linux-x64.tar.gz -L https://update.code.visualstudio.com/commit:b1c0a14de1414fcdaa400695b4db1c0799bc3124/server-linux-x64/stable

WORKDIR /root/.vscode-server/bin/b1c0a14de1414fcdaa400695b4db1c0799bc3124

RUN tar -xvzf /root/vscode-server-linux-x64.tar.gz --strip-components 1

RUN rm /root/vscode-server-linux-x64.tar.gz

WORKDIR /root/workspace

ENTRYPOINT [ "/bin/bash" ]