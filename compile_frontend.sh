#!/bin/bash

# This script runs during building the sandbox template
# and makes sure the frontend app is (1) running and (2) the server is accessible

# Source environment variables if .env file exists
if [ -f ".env" ]; then
    echo "Loading environment variables from .env file"
    export $(cat .env | xargs)
    echo "Environment variables loaded:"
    echo "PORT: $PORT"
    echo "NEXT_PUBLIC_BACKEND_URL: $NEXT_PUBLIC_BACKEND_URL"
else
    echo "No .env file found, using default environment variables"
fi

function ping_server() {
	counter=0
	response=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:3000")
	while [[ ${response} -ne 200 ]]; do
	  let counter++
	  if  (( counter % 20 == 0 )); then
        echo "Waiting for frontend server to start..."
        sleep 0.1
      fi

	  response=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:3000")
	done
}

ping_server &
cd /home/user && npm run dev 