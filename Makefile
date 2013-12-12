start_server:
	node node_modules/.bin/http-server

copy_ace_build:
	cp -rf ace-builds/src-noconflict javascripts/ace

.PHONY: start_server copy_ace_build
