aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 992382616033.dkr.ecr.us-east-1.amazonaws.com
docker tag vite-mamp-js-api:latest 992382616033.dkr.ecr.us-east-1.amazonaws.com/datalous-api:latest
docker push 992382616033.dkr.ecr.us-east-1.amazonaws.com/datalous-api:latest
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 992382616033.dkr.ecr.us-east-1.amazonaws.com
docker tag vite-mamp-js-client:latest 992382616033.dkr.ecr.us-east-1.amazonaws.com/datalous-client:latest
docker push 992382616033.dkr.ecr.us-east-1.amazonaws.com/datalous-client:latest