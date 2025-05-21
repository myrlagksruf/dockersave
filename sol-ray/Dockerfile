# FROM rayproject/ray:2.44.1-py312-cpu
FROM rayproject/ray:2.10.0-py38
USER "root"

RUN apt update &&\
    apt install -y libaio1 build-essential wget && \
    wget -O restic.bz2 https://github.com/restic/restic/releases/download/v0.18.0/restic_0.18.0_linux_amd64.bz2 &&\
    bunzip2 restic.bz2 &&\
    chmod +x restic &&\
    mv restic /usr/local/bin/ &&\
    rm -f restic.bz2 && \
    apt clean