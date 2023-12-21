#!/bin/bash

# Git 저장소 복제
# GIT_REPO, GIT_USERNAME, GIT_PASSWORD 환경 변수 필요

if [ ! -d "$GIT_REPO" ]; then
    git clone https://$GIT_USERNAME:$GIT_PASSWORD@github.com/$GIT_USER/$GIT_REPO
fi
# Bun을 사용하여 의존성 설치 및 애플리케이션 설정
# 여기서는 예시로 bun install을 실행한다고 가정
cd "$GIT_REPO" || exit

for var in $(set | grep "^HAN" | cut -d '=' -f 1); do
    export "${var?}"
done

bun upgrade

bun install

# 여기에 추가적인 설정이나 스크립트 실행 명령을 추가할 수 있음
bun start