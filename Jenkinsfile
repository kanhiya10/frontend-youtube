pipeline {
  agent any

  environment {
    DOCKERHUB_USER = credentials('dockerhub-username')
    DOCKERHUB_PASS = credentials('dockerhub-password')
  }

  stages {
    stage('Checkout') {
      steps {
        // Store code inside /workspace/frontend-youtube
        dir('/workspace/frontend-youtube') {
          git branch: 'frontend', url: 'https://github.com/kanhiya10/frontend-youtube.git'
        }
      }
    }

    stage('Build & Push Docker Image') {
      steps {
        dir('/workspace') {
          sh '''
            docker build -f nginx/Dockerfile -t kanhiya693/ec2_repo:nginx-rtmp-prod-v1 .
            echo "$DOCKERHUB_PASS" | docker login -u "$DOCKERHUB_USER" --password-stdin
            docker push kanhiya693/ec2_repo:nginx-rtmp-prod-v1
          '''
        }
      }
    }

    stage('Deploy Frontend') {
      steps {
        dir('/workspace') {
          sh '''
            docker-compose pull nginx-rtmp
            docker-compose up -d nginx-rtmp
          '''
        }
      }
    }
  }
}
