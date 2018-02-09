#!/bin/bash

mongo --ssl --sslCAFile ~/Dropbox/TractionB2B.com/A.\ Database/6.\ Passive\ Database/db.crt  aws-eu-central-1-portal.0.dblayer.com:15123/dp-web-prod -u sidharthchugh -p Yoginder.123 ~/workspace/DigitalPartners-Data/Passive-DataUpload/allfunctions_passive.js
