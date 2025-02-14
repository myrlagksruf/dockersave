#!/bin/bash

for file in ./*.vsix; do
    ~/.vscode-server/bin/*/bin/code-server --install-extension $file --force;
done