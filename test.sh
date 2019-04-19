#!/bin/bash

if [ -f data/testing.sqlite3 ]
then
    rm data/testing.sqlite3 && knex migrate:latest --env testing && knex seed:run --env testing && cross-env DB_ENV=testing jest --watchAll --verbose --runInBand -- $1
else
    knex migrate:latest --env testing && knex seed:run --env testing && cross-env DB_ENV=testing jest --watchAll --verbose --runInBand -- $1
fi
