start:
	node node_modules/.bin/http-server

copy_ace:
	cp -rf ace-builds/src-noconflict javascripts/ace

.PHONY: copy_ace
