#!/bin/bash

cp src/config/localconfig.ts src/config/config.ts
rm -r www/services
cp -r ../services www/services
ionic serve
