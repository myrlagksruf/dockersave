# FROM rayproject/ray:2.44.1-py312-cpu
FROM rayproject/ray:2.54.1-py313
USER "root"


RUN apt update &&\
    apt install -y libaio1 build-essential wget

RUN ARCH=$(dpkg --print-architecture) && \
    OS=$(uname -s | tr '[:upper:]' '[:lower:]') && \
    wget -O restic.bz2 https://github.com/restic/restic/releases/download/v0.18.1/restic_0.18.1_${OS}_${ARCH}.bz2 && \
    bunzip2 restic.bz2 &&\
    chmod +x restic &&\
    mv restic /usr/local/bin/ &&\
    rm -f restic.bz2 && \
    apt clean