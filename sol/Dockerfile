FROM debian:bookworm

WORKDIR /root/workspace

SHELL ["/bin/bash", "-l", "-c"]

RUN apt update -y && \
    apt upgrade -y && \
    apt install -y curl make gcc g++ git libaio1 wget unzip zip nano build-essential gdb lcov pkg-config libbz2-dev libffi-dev libgdbm-dev libgdbm-compat-dev liblzma-dev libncurses5-dev libreadline6-dev libsqlite3-dev libssl-dev lzma lzma-dev tk-dev uuid-dev zlib1g-dev default-libmysqlclient-dev php && \
    apt clean && \
    rm -rf /var/lib/apt/lists/* && \
    git config --global user.name "Han Kyeol Kim" && \
    git config --global user.email "hankyeol.kim@meritz.co.kr" && \
    git config --global credential.helper store

RUN mkdir /usr/local/nvm

ENV NVM_DIR /usr/local/nvm
    
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash && \
    source $NVM_DIR/nvm.sh && \
    nvm install 16 && \
    nvm install 22 && \
    nvm use 16 && \
    npm i -g yarn && \
    yarn config set registry "http://sol-dist:4873" && \
    yarn config set ignore-engines true && \
    nvm use 22 && \
    npm i -g npm yarn && \
    yarn config set registry "http://sol-dist:4873" && \
    yarn config set ignore-engines true
    
RUN curl -O https://www.python.org/ftp/python/3.12.6/Python-3.12.6.tgz && \
    curl -O https://www.python.org/ftp/python/3.8.20/Python-3.8.20.tgz && \
    tar xvf Python-3.8.20.tgz && \
    tar xvf Python-3.12.6.tgz

WORKDIR /root/workspace/Python-3.12.6

RUN ./configure --enable-optimizations && \
    make -j "$(nproc)" && \
    make altinstall

WORKDIR /root/workspace/Python-3.8.20

RUN ./configure --enable-optimizations && \
    make -j "$(nproc)" && \
    make altinstall

WORKDIR /root/workspace

RUN rm -rf Python-3.8.20.tgz Python-3.8.20 Python-3.12.6.tgz Python-3.12.6

RUN python3.8 -m pip install --upgrade pip setuptools wheel pytest-runner; \
    pip3.8 install --upgrade setuptools wheel pytest-runner pip; \
    python3.12 -m pip install --upgrade pip setuptools wheel pytest-runner; \
    pip3.12 install --upgrade setuptools wheel pytest-runner pip; \
    pip3.8 config --global set global.trusted_host sol-dist; \
    pip3.8 config --global set global.index_url http://sol-dist:3141/root/pypi/+simple/; \
    pip3.12 config --global set global.trusted_host sol-dist; \
    pip3.12 config --global set global.index_url http://sol-dist:3141/root/pypi/+simple/;

WORKDIR /root

RUN curl -o vscode-server-linux-x64.tar.gz -L https://update.code.visualstudio.com/commit:4849ca9bdf9666755eb463db297b69e5385090e3/server-linux-x64/stable && \
    mkdir -p /root/.vscode-server/bin/4849ca9bdf9666755eb463db297b69e5385090e3 && \
    cd /root/.vscode-server/bin/4849ca9bdf9666755eb463db297b69e5385090e3 && \
    tar -xvzf /root/vscode-server-linux-x64.tar.gz --strip-components 1 && \
    rm /root/vscode-server-linux-x64.tar.gz

WORKDIR /root/workspace

ENTRYPOINT [ "/bin/bash" ]