FROM	node:lts-slim

ENV	PORT="8080" \
	DGRAM_TYPE="udp4" \
	UDP_SERVER_IP="192.168.1.1" \
	UDP_SERVER_PORT="30000"

COPY	ws /ws
WORKDIR	/ws
RUN	chown -R node:node /ws
USER	node:node
CMD	npm i && node proxy.js
