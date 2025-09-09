FROM ghcr.io/astral-sh/uv:bookworm

WORKDIR /root/workspace

SHELL ["/bin/bash", "-l", "-c"]

ENV LC_ALL=ko_KR.UTF-8
ENV PATH=$PATH:/opt/oracle/instantclient_23_4:/usr/local/go/bin
ARG COMM_ID="6f17636121051a53c88d3e605c491d22af2ba755"
ARG GO_VERSION="1.25.1"
ARG NPM_PROXY="http://sol-dist:4873"
ARG PIP_PROXY="http://sol-dist:3141/root/pypi/+simple/"
ARG NODE_VERSION="16 24"
RUN mkdir -p /opt/oracle && mkdir -p /root/workspace && mkdir -p /root/.vscode-server/bin/$COMM_ID && mkdir -p /root/.config/uv
COPY clangd /root/.clangd

RUN uv python install 3.8 3.13

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

RUN wget -q https://go.dev/dl/go${GO_VERSION}.linux-amd64.tar.gz && \
    rm -rf /usr/local/go && \
    tar -C /usr/local -xzf go${GO_VERSION}.linux-amd64.tar.gz && \
    rm go${GO_VERSION}.linux-amd64.tar.gz

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
    wget https://download.oracle.com/otn_software/linux/instantclient/2340000/instantclient-basiclite-linux.x64-23.4.0.24.05.zip && \
    unzip instantclient-basiclite-linux.x64-23.4.0.24.05.zip && \
    rm -rf instantclient-basiclite-linux.x64-23.4.0.24.05.zip META-INF && \
    wget https://download.oracle.com/otn_software/linux/instantclient/2340000/instantclient-sqlplus-linux.x64-23.4.0.24.05.zip && \
    unzip instantclient-sqlplus-linux.x64-23.4.0.24.05.zip && \
    rm -rf instantclient-sqlplus-linux.x64-23.4.0.24.05.zip META-INF && \
    echo /opt/oracle/instantclient_23_4 > /etc/ld.so.conf.d/oracle-instantclient.conf && \
    ldconfig

RUN curl -fsSL https://fnm.vercel.app/install | bash && \
    export PATH="/root/.local/share/fnm:$PATH"

RUN for version in $NODE_VERSION; do \
        fnm install $version; \
    done

RUN echo "next"

RUN for version in $NODE_VERSION; do \
        eval "$(fnm env)"; \
        fnm use $version; \
        echo "Current Node.js path: $(which node)"; \
        echo "Current Node.js version: $(node --version)"; \
        echo "Current npm version: $(npm --version)"; \
        echo "Setting up Node.js version: $version"; \
        if [ "$version" = "16" ]; then \
            npm i -g npm@9 yarn; \
            yarn config set registry "$NPM_PROXY"; \
            yarn config set ignore-engines true; \
        else \
            npm i -g npm@latest; \
            corepack enable && corepack prepare yarn --activate; \
        fi; \
        echo "After npm install - npm version: $(npm --version)"; \
        echo "After npm install - yarn version: $(yarn --version)"; \
        echo "Completed Node.js $version setup"; \
    done
    
RUN echo '[pip]' >> /root/.config/uv/uv.toml && \
    echo "index-url = \"$PIP_PROXY\"" >> /root/.config/uv/uv.toml;

WORKDIR /root/workspace

ENTRYPOINT [ "/bin/bash" ]