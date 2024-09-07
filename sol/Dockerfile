FROM debian:bookworm

WORKDIR /root/workspace

SHELL ["/bin/bash", "-l", "-c"]

RUN apt update && apt upgrade -y

RUN apt install -y make gcc g++ git libaio1 wget unzip zip curl nano

RUN apt install -y build-essential gdb lcov pkg-config libbz2-dev libffi-dev libgdbm-dev libgdbm-compat-dev liblzma-dev libncurses5-dev libreadline6-dev libsqlite3-dev libssl-dev lzma lzma-dev tk-dev uuid-dev zlib1g-dev

RUN apt clean

# RUN curl -fsSL https://fnm.vercel.app/install | bash

# RUN curl -O https://www.python.org/ftp/python/3.12.6/Python-3.12.6.tgz

# RUN apt install -y yarn

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

ENTRYPOINT [ "/bin/bash" ]