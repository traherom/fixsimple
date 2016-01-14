FROM node:5.3
EXPOSE 3000
RUN mkdir /src
WORKDIR /src
COPY . /src
RUN rm -rf node_modules; npm install
ENTRYPOINT ["bash", "/src/start.sh"]



