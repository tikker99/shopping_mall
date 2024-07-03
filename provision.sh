docker-compose -f ./docker-compose.yml down
docker volume rm shopping_mall_postgres_data --force
docker volume rm shopping_mall_postgres_data --force

docker-compose -f ./docker-compose.yml up -d
sleep 5s
npm run migrate:reset -- --force
npm run seed
