# scripts/run-integration.sh
#!/usr/bin/env bash

DIR="$(cd "$(dirname "$0")" && pwd)"
source $DIR/setenv.sh
docker compose -f int.docker-compose.yml up -d
echo '🟨 Waiting for database to be ready...'
"$DIR/wait-for-it.sh" "${DATABASE_URL}" -- echo '🟩 Database is ready'
npx prisma migrate dev --name init

if [ "$#" -eq "0" ]; 
  then
    vitest --project int
else
    vitest --project int --ui
fi    