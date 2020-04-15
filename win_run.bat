echo OFF
title win_run
set FLASK_ENV=development
set FLASK_DEBUG=1
start redis/redis-server.exe
start cmd /k python RLBotServer.py
start cmd /k celery -A backend.tasks.celery_worker.celery worker --pool=solo -l info
:: TODO: find out if this still works. On windows, in gitbash, i had to run flower with celery like below
:: celery flower -A backend.tasks.celery_worker.celery --port=5555
start flower --port=5555
cd webapp
npm start
EXIT
