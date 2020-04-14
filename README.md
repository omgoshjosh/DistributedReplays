# Calculated.gg Backend [![Build Status](https://api.travis-ci.org/SaltieRL/DistributedReplays.svg?branch=master)](https://travis-ci.org/SaltieRL/DistributedReplays) [<img src="https://img.shields.io/endpoint.svg?url=https%3A%2F%2Fshieldsio-patreon.herokuapp.com%2Fcalculated">](https://www.patreon.com/calculated)  [<img src="https://img.shields.io/discord/482991399017512960.svg?colorB=7581dc&logo=discord&logoColor=white">](https://discord.gg/c8cArY9)

## Setup
- Install Python 3.6/pip
- Create a virtual environment `py -m venv venv && source venv/Scripts/activate`, `py` should be however you run python 3
  - in windows cmd you might not have to source it (i.e. `.\venv\Scripts\activate`), but in vs code integrated terminal (bash-like) you must `source /path/to/activate`
- Install packages to your virtual environment `pip install -r requirements.txt`
- Install and run Redis with default port + settings (Windows is included, [Ubuntu](https://redis.io/topics/quickstart))
- Install postgreSQL ([Windows](https://www.enterprisedb.com/thank-you-downloading-postgresql?anid=1255928), [Ubuntu](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-16-04), [Mac](https://stackoverflow.com/a/35308200/2187510))
- Make sure that postgreSQL is in the path and running
- If only for local development [change the password in Ubuntu](https://blog.2ndquadrant.com/how-to-safely-change-the-postgres-user-password-via-psql/) to `postgres`
- Ensure you have the latest LTS version of node and npm installed
- Run `cd webapp`, `npm install`

## Running

#### Ubuntu
- Run RLBotServer.py.
- `cd webapp`, `npm start`

#### Windows
- Run win_run.bat or pick the commands out of that file and run them separately (for flask, set the environment variables in your call, see below)
- There are 5 things to start, `frontend` (create-react-app living in the webapp directory), `backend` (flask app), `celery` (worker threads for lower priority or longer running tasks), `flower` (management console for workers), and `redis` (in memory key-value store).
  - `redis/redis.exe`
  - `FLASK_ENV=development FLASK_DEBUG=1 python RLBotServer.py`
  - `celery -A backend.tasks.celery_worker.celery worker --pool=solo -l info`
  - `celery flower -A backend.tasks.celery_worker.celery --port=5555`
  - `cd webapp && npm start`
- You can optionally kill the python process and start it in an IDE
- You can log into psql command line with `psql postgresql://postgres:postgres@localhost`
- If the included redis does not work here is [install directions](https://dingyuliang.me/redis-3-2-install-redis-windows/)
- DO NOT USE IDLE, either use command line or pycharm (pycharm is recommended for development of backend)

#### Mac
- Run mac_run.sh

**You need to run in `python3`. Mac comes with `python2` by default so do not run any commands without the 3**




## Structure

The structure of the server is split into different directories:

- `blueprints` - Backend Python code, split into subsections
- `database` - Database objects and queries
- `helpers` - Various scripts to help in maintaining the server
- `static` - Static website files (JS/CSS/images)
- `tasks` - Contains celery code user for processing the queue of replays
- `templates` - Dynamic website files (rendered HTML templates)

---

## Setup and Running with Docker (Docs WIP)

### Basic Dependencies

- [Docker Community Edition (Stable)](https://docs.docker.com/install/)

  Docker will run Postgres, Redis, Flask, Celery, and Node inside linux based "Containers" on most platforms.
  Download and install Docker and Docker Compose for your platform:
  - [Mac/Windows: Docker Desktop](https://www.docker.com/products/docker-desktop)
  - [Ubuntu/Debian-ish: Docker CLI](https://docs.docker.com/install/linux/docker-ce/debian/#install-docker-ce)

### Run Everything
```bash
# Start containers. Should be in project root directory (where docker-compose.yml is)
docker-compose up

# See your containers running
docker ps
```

Now go to `localhost:3000` and the site should be running.


### Testing

We run with pytest and use some features from it.
If you are using an ide (pycharm/intellij) you must change the default runner from unit tests to pytests
You can make this change by going to settings and searching for "unittest"
[Python unit test configuration](https://www.jetbrains.com/help/idea/run-debug-configuration-python-unit-test.html)
