# npm repository

npm install -g vsts-npm-auth
vsts-npm-auth -config .npmrc

# compilation release

yarn install (first time only)
gulp production

result : dist/

# generate class from json-schema

npm run entity

# generate classes for views

npm run view

# update database (config.js: SpoDirect)

npm run update-database

# compile
gulp

# compile incremental
gulp ic
