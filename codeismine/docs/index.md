# codeismine

[![Build Status](https://travis-ci.org/The owner of the repository. Either your github username or organization name./codeismine.svg?branch=master)](https://travis-ci.org/The owner of the repository. Either your github username or organization name./codeismine)
[![Built with](https://img.shields.io/badge/Built_with-Cookiecutter_Django_Rest-F7B633.svg)](https://github.com/agconti/cookiecutter-django-rest)

Its all about a Weissman score > 5.0. Check out the project's [documentation](http://The owner of the repository. Either your github username or organization name..github.io/codeismine/).

# Prerequisites

- [Docker](https://docs.docker.com/docker-for-mac/install/)

# Initialize the project

Start the dev server for local development:

```bash
docker-compose up
```

Create a superuser to login to the admin:

```bash
docker-compose run --rm web ./manage.py createsuperuser
```
