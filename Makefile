install:
	npm install

run:
	npm run babel-node -- 'src/bin/gendiff.js'

build:
	rm -rf dist
	npm run build

test:
	npm test

lint:
	npm run eslint .

publish:
	npm publish