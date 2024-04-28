#!/bin/bash

################# Project Setting Start
export PROJECT=store-service
export GROUP=newmakeshop
export PROJECT_NUM=3
export MYPORT=$((UID - 2000000 + (($PROJECT_NUM+30) * 1000)))

################# Project Setting End

export ME=`whoami`
export CURRENT_UID=$(id -u):$(id -g) 
export PROJECT_DIR=$(dirname `pwd`)

echo "$ME => PORT: $MYPORT"
export COMPOSE_PROJECT_NAME="${PROJECT}_${ME}"

docker-compose down
docker-compose pull
docker-compose up -d  --remove-orphans