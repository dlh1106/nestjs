# Basic nginx dockerfile starting with Ubuntu 20.04
FROM node:18-alpine
# RUN apk add --no-cache git
RUN apk add --no-cache bash curl
# RUN apk add --no-cache openssh-client
# RUN mkdir ~/.ssh
# RUN ssh-keyscan -t rsa github.com > ~/.ssh/known_hosts
ENV BUILD_DIR="dist_docker"
ARG branch
ENV BRANCH=$branch

WORKDIR /usr/src/app
ENV npm_config_cache=/usr/src/app/cache

# 앱 소스 추가
# COPY . .
# RUN yarn install
COPY package.json package.json
RUN  npm install


# ENV NEXT_PUBLIC_ORDER_URL=https://order.stampang.com
# ENV NEXT_PUBLIC_MAIN_URL=https://stampang.com
# ENV NEXT_PUBLIC_NAME=NextOrder
# ENV NEXT_PUBLIC_DOCKER=1

# RUN yarn build
COPY . .


EXPOSE 3000


RUN chmod +x entrypoint.sh

ENTRYPOINT [ "/usr/src/app/entrypoint.sh" ]
