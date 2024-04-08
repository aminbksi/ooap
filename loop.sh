#!/bin/sh

while true
do
    if ! node ./dist/index.js
    then
        sleep 1
    fi
done