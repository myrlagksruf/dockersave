FROM debian:bookworm

WORKDIR /root/workspace

SHELL ["/bin/bash", "-l", "-c"]

ARG P_version="3.13.1 3.11.11 3.8.20"
ENV NVM_DIR /usr/local/nvm
ENV LC_ALL ko_KR.UTF-8
ENV PATH $PATH:/opt/oracle/instantclient_23_4
ARG COMM_ID="cd4ee3b1c348a13bafd8f9ad8060705f6d4b9cba"
RUN mkdir -p /opt/oracle && mkdir -p /root/workspace && mkdir -p /root/.vscode-server/bin/$COMM_ID

RUN apt update -y && \
    apt upgrade -y && \
    apt install -y graphviz \
        p7zip-full \
        curl wget \
        build-essential mingw-w64 \
        git git-flow \
        libaio1 \
        unzip zip \
        nano \
        gdb lcov pkg-config libbz2-dev libffi-dev libgdbm-dev libgdbm-compat-dev liblzma-dev libncurses5-dev libreadline6-dev libsqlite3-dev libssl-dev lzma lzma-dev tk-dev uuid-dev zlib1g-dev \
        default-libmysqlclient-dev \
        locales && \
    apt clean && \
    rm -rf /var/lib/apt/lists/* && \
    git config --global user.name "Han Kyeol Kim" && \
    git config --global user.email "hankyeol.kim@meritz.co.kr" && \
    git config --global credential.helper store && \
    localedef -f UTF-8 -i ko_KR ko_KR.UTF-8 && \
    curl -o vscode-server-linux-x64.tar.gz -L https://update.code.visualstudio.com/commit:$COMM_ID/server-linux-x64/stable && \
    cd /root/.vscode-server/bin/$COMM_ID && \
    tar -xvzf /root/workspace/vscode-server-linux-x64.tar.gz --strip-components 1 && \
    rm /root/workspace/vscode-server-linux-x64.tar.gz && \
    cd /opt/oracle && \
    curl -O https://download.oracle.com/otn_software/linux/instantclient/2340000/instantclient-basiclite-linux.x64-23.4.0.24.05.zip && \
    unzip instantclient-basiclite-linux.x64-23.4.0.24.05.zip && \
    rm -rf instantclient-basiclite-linux.x64-23.4.0.24.05.zip META-INF && \
    curl -O https://download.oracle.com/otn_software/linux/instantclient/2340000/instantclient-sqlplus-linux.x64-23.4.0.24.05.zip && \
    unzip instantclient-sqlplus-linux.x64-23.4.0.24.05.zip && \
    rm -rf instantclient-sqlplus-linux.x64-23.4.0.24.05.zip META-INF && \
    echo /opt/oracle/instantclient_23_4 > /etc/ld.so.conf.d/oracle-instantclient.conf && \
    ldconfig && \
    cd /root/workspace && \
    mkdir /usr/local/nvm && \
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash && \
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
    yarn config set ignore-engines true && \
    for P in ${P_version}; do \
        P_M=(`echo $P | tr "." "\n"`) && \
        P_MM="${P_M[0]}.${P_M[1]}" && \
        echo "$P, $P_MM" && \
        sleep 1 && \
        curl -O https://www.python.org/ftp/python/$P/Python-$P.tgz && \
        tar xvf Python-$P.tgz && \
        cd /root/workspace/Python-$P && \
        ./configure --enable-optimizations --disable-gil && \
        make -j "$(nproc)" && \
        make altinstall && \
        cd /root/workspace && \
        rm -rf Python-$P.tgz Python-$P && \ 
        python$P_MM -m pip install --upgrade pip setuptools wheel pytest-runner && \
        pip$P_MM install --upgrade setuptools wheel pytest-runner pip; \
    done

# go-debugger 필요
# WORKDIR /root
# RUN curl -O https://go.dev/dl/go1.23.1.linux-amd64.tar.gz && \
#     tar xzfp go1.23.1.linux-amd64.tar.gz --directory /usr/local

# ENV PATH /go

RUN for P in ${P_version}; do \
    pip$P_MM config --global set global.trusted_host sol-dist && \
    pip$P_MM config --global set global.index_url http://sol-dist:3141/root/pypi/+simple/; \
done

WORKDIR /root/workspace

ENTRYPOINT [ "/bin/bash" ]