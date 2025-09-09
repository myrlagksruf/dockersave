#!/bin/bash

# Build Docker image for linux/amd64 platform with full logging
docker build \
  --platform linux/amd64 \
  --progress=plain \
  -t sol-dist:5000/debian:1.5 \
  . 2>&1 | tee build.log