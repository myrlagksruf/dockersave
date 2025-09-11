#!/bin/bash

# Build Docker image for linux/amd64 platform with full logging
docker buildx build \
  --platform linux/amd64 \
  --progress=plain \
  -t sol-dist:5000/debian:1.6 \
  . 2>&1 | tee build.log