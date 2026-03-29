# syntax=docker/dockerfile:1.3-labs

# ── Stage 1: HAProxy build ────────────────────────────────────────────────────
# trixie는 Lua 5.4가 기본. HAProxy 3.x는 Lua 5.3+ 요구.
FROM debian:trixie-slim AS haproxy-builder

ARG HAPROXY_VERSION=3.3.6

RUN <<EOF
set -euo pipefail
apt-get update -y
apt-get install -y --no-install-recommends \
    build-essential \
    ca-certificates \
    curl \
    liblua5.4-dev \
    libpcre2-dev \
    libssl-dev \
    zlib1g-dev
rm -rf /var/lib/apt/lists/*
EOF

RUN <<EOF
set -euo pipefail
BUILD_DIR=$(mktemp -d)
curl -sSfL -o "${BUILD_DIR}/haproxy.tar.gz" \
    "https://www.haproxy.org/download/3.3/src/haproxy-${HAPROXY_VERSION}.tar.gz"
tar -xzf "${BUILD_DIR}/haproxy.tar.gz" -C "${BUILD_DIR}" --strip-components=1
make -C "${BUILD_DIR}" TARGET=linux-glibc \
    USE_OPENSSL=1 USE_ZLIB=1 USE_PCRE2=1 USE_LUA=1 USE_PROMEX=1 \
    -j$(nproc)
make -C "${BUILD_DIR}" install SBINDIR=/usr/local/bin
rm -rf "${BUILD_DIR}"
EOF

# ── Stage 2: Main Ray image ───────────────────────────────────────────────────
FROM ghcr.io/astral-sh/uv:python3.13-trixie

ENV TZ=Asia/Seoul \
    LANG=ko_KR.UTF-8 \
    LC_ALL=ko_KR.UTF-8 \
    LANGUAGE=ko_KR:ko \
    DEBIAN_FRONTEND=noninteractive

# ray[default] = dashboard + autoscaler
# ray[all]     = data/train/tune/serve/rllib 포함 (무거움)
ARG RAY_EXTRAS="default"
ARG RAY_VERSION=2.54.1

RUN <<EOF
set -euo pipefail
apt-get update -y
apt-get upgrade -y
apt-get install -y --no-install-recommends \
    locales git wget ca-certificates \
    libjemalloc-dev \
    gcc g++ zlib1g-dev \
    libsnappy1v5 libzstd1 liblz4-1 \
    tmux screen rsync \
    netbase openssh-client gnupg \
    socat liblua5.4-0 libpcre2-8-0 \
    bzip2
rm -rf /var/lib/apt/lists/*
EOF

# 한국어 로케일 + 시간대 설정
RUN <<EOF
set -euo pipefail
echo "ko_KR.UTF-8 UTF-8" >> /etc/locale.gen
locale-gen

apt-get update -y
# trixie 버전에 따라 tzdata 또는 tzdata-legacy
apt-get install -y --no-install-recommends tzdata || \
apt-get install -y --no-install-recommends tzdata-legacy
rm -rf /var/lib/apt/lists/*

ln -snf /usr/share/zoneinfo/Asia/Seoul /etc/localtime
echo "Asia/Seoul" > /etc/timezone
EOF

# HAProxy 디렉터리
RUN mkdir -p /etc/haproxy /run/haproxy /var/log/haproxy

COPY --from=haproxy-builder /usr/local/bin/haproxy /usr/local/bin/haproxy

# restic (아키텍처 자동 감지)
RUN <<EOF
set -euo pipefail
ARCH=$(dpkg --print-architecture)
wget -qO /tmp/restic.bz2 \
    "https://github.com/restic/restic/releases/download/v0.18.1/restic_0.18.1_linux_${ARCH}.bz2"
bunzip2 /tmp/restic.bz2
chmod +x /tmp/restic
mv /tmp/restic /usr/local/bin/
rm -f /tmp/restic.bz2
EOF

# Ray 설치 (system-wide)
RUN uv pip install --system --no-cache-dir "ray[${RAY_EXTRAS}]==${RAY_VERSION}"

# 설치된 패키지 목록 기록
RUN uv pip freeze --system > /pip-freeze.txt

WORKDIR /root
