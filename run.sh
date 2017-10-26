#!/bin/sh

json-server --watch json-server/dev.json --port 3000 &
npm start