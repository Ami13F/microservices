docker-compose down --remove-orphans

docker image prune -a -f

docker volume prune -f
