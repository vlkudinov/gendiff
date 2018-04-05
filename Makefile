install:
	npm install

run:
	npm run babel-node -- 'src/bin/gendiff.js'

build:
	rm -rf dist
	npm run build

watch:
	npm run watch

test:
	npm run test

lint:
	npm run eslint .

publish:
	npm publish