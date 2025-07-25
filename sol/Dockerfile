FROM ghcr.io/astral-sh/uv:bookworm

WORKDIR /root/workspace

SHELL ["/bin/bash", "-l", "-c"]

ENV NVM_DIR=/usr/local/nvm
ENV LC_ALL=ko_KR.UTF-8
ENV PATH=$PATH:/opt/oracle/instantclient_23_4
ARG COMM_ID="c306e94f98122556ca081f527b466015e1bc37b0"
RUN mkdir -p /opt/oracle && mkdir -p /root/workspace && mkdir -p /root/.vscode-server/bin/$COMM_ID && mkdir -p /root/.config/uv
COPY clangd /root/.clangd

RUN uv python install 3.8 3.12

RUN apt update && \
    apt upgrade -y && \
    apt install -y graphviz build-essential \
        p7zip-full \
        curl wget \
        cmake \
        git git-flow \
        libaio1 \
        unzip zip \
        nano \
        locales clangd-19 proxychains4 && \
    apt clean && \
    rm -rf /var/lib/apt/lists/* && \
    update-alternatives --install /usr/bin/clangd clangd /usr/bin/clangd-19 100 && \
    localedef -f UTF-8 -i ko_KR ko_KR.UTF-8

RUN wget -O restic.bz2 https://github.com/restic/restic/releases/download/v0.18.0/restic_0.18.0_linux_amd64.bz2 &&\
    bunzip2 restic.bz2 &&\
    chmod +x restic &&\
    mv restic /usr/local/bin/ && \
    rm -f restic.bz2
    
RUN curl -o vscode-server-linux-x64.tar.gz -L https://update.code.visualstudio.com/commit:$COMM_ID/server-linux-x64/stable && \
    cd /root/.vscode-server/bin/$COMM_ID && \
    tar -xvzf /root/workspace/vscode-server-linux-x64.tar.gz --strip-components 1 && \
    rm /root/workspace/vscode-server-linux-x64.tar.gz

RUN cd /opt/oracle && \
    curl -O https://download.oracle.com/otn_software/linux/instantclient/2340000/instantclient-basiclite-linux.x64-23.4.0.24.05.zip && \
    unzip instantclient-basiclite-linux.x64-23.4.0.24.05.zip && \
    rm -rf instantclient-basiclite-linux.x64-23.4.0.24.05.zip META-INF && \
    curl -O https://download.oracle.com/otn_software/linux/instantclient/2340000/instantclient-sqlplus-linux.x64-23.4.0.24.05.zip && \
    unzip instantclient-sqlplus-linux.x64-23.4.0.24.05.zip && \
    rm -rf instantclient-sqlplus-linux.x64-23.4.0.24.05.zip META-INF && \
    echo /opt/oracle/instantclient_23_4 > /etc/ld.so.conf.d/oracle-instantclient.conf && \
    ldconfig

RUN cd /root/workspace && \
    mkdir /usr/local/nvm && \
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash && \
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
    
RUN echo '[pip]' >> /root/.config/uv/uv.toml && \
    echo 'index-url = "http://sol-dist:3141/root/pypi/+simple/"' >> /root/.config/uv/uv.toml;
    
WORKDIR /root/workspace

ENTRYPOINT [ "/bin/bash" ]