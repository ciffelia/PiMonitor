# PiMonitor

[![Build Status](https://travis-ci.org/prince0203/PiMonitor.svg?branch=master)](https://travis-ci.org/prince0203/PiMonitor)
[![CircleCI](https://circleci.com/gh/prince0203/PiMonitor.svg?style=svg)](https://circleci.com/gh/prince0203/PiMonitor)
[![wercker status](https://app.wercker.com/status/a7338e295590f77f90e07fc29691ab68/s/master "wercker status")](https://app.wercker.com/project/byKey/a7338e295590f77f90e07fc29691ab68)
[![Greenkeeper badge](https://badges.greenkeeper.io/prince0203/PiMonitor.svg)](https://greenkeeper.io/)

## Install

```sh
$ yarn
$ mkdir firebase && cp /path/to/serviceAccountKey.json ./firebase/serviceAccountKey.json
```

## Usage

```sh
$ export PIMONITOR_FIREBASE_URL=https://<YOUR FIREBASE>.firebaseio.com
$ export PIMONITOR_WEBSOCKET_PORT=8081
$ yarn start
```

```sh
$ wscat -c ws://localhost:8081
```

