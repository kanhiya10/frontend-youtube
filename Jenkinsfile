pipeline {
  agent any

  environment {
    DOCKERHUB_CREDS = credentials('dockerhub-credentials')
    IMAGE_NAME = "kanhiya693/ec2_repo"
    IMAGE_TAG = "nginx-rtmp-prod-v1"
    DEPLOY_DIR = "/workspace"
  }

  stages {
    stage('Checkout') {
      steps {
        dir('/workspace/frontend-youtube') {
          git branch: 'deploy-frontend', url: 'https://github.com/kanhiya10/frontend-youtube.git'
        }
      }
    }

    stage('Build & Push Docker Image') {
      steps {
        dir('/workspace/frontend-youtube') {
          sh '''
            docker build -f nginx/Dockerfile -t $IMAGE_NAME:$IMAGE_TAG .
            echo "$DOCKERHUB_CREDS_PSW" | docker login -u "$DOCKERHUB_CREDS_USR" --password-stdin
            docker push $IMAGE_NAME:$IMAGE_TAG
          '''
        }
      }
    }

    stage('Deploy Frontend') {
      steps {
        dir("$DEPLOY_DIR") {
          sh '''
            docker-compose pull nginx-rtmp
            docker-compose up -d --force-recreate nginx-rtmp
          '''
        }
      }
    }
  }
}
