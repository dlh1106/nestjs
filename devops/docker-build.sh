#!/bin/bash

PROJECT=store-service
GROUP=newmakeshop

TODAY=$(date +'%Y%m%d')
echo  "Build Docker for $PROJECT - $1 - $TODAY" 

if [ ${#1} -gt 0 ]; then

docker build --build-arg branch=${1} --tag $PROJECT:${1} --tag $PROJECT:${1}$TODAY -f ./Dockerfile .. || exit
docker image tag $PROJECT:${1} hb.koapp.com/$GROUP/$PROJECT:${1}
docker image tag $PROJECT:${1} hb.koapp.com/$GROUP/$PROJECT:${1}$TODAY
docker image push -a hb.koapp.com/$GROUP/$PROJECT

else

docker build --tag $PROJECT:${1}latest --tag $PROJECT:${1}$TODAY -f ./Dockerfile .. || exit
docker image tag $PROJECT:${1}latest hb.koapp.com/$GROUP/$PROJECT:${1}latest
docker image tag $PROJECT:${1}latest hb.koapp.com/$GROUP/$PROJECT:${1}$TODAY
docker image push -a hb.koapp.com/$GROUP/$PROJECT

fi

