pipeline {
    agent any

    environment {
        BACKEND_IMAGE = "yourdockerhub/backend:latest"
        FRONTEND_IMAGE = "yourdockerhub/frontend:latest"
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/your/repo.git'
            }
        }

        stage('Backend Build & Test') {
            steps {
                sh '''
cd backend
npm install
npm test || true
                '''
            }
        }

        stage('Frontend Build & Test') {
            steps {
                sh '''
cd frontend
npm install
npm test || true
                '''
            }
        }

        stage('Docker Build') {
            steps {
                sh '''
docker build -t $BACKEND_IMAGE ./backend
docker build -t $FRONTEND_IMAGE ./frontend
                '''
            }
        }

        stage('Docker Login & Push') {
            steps {
                withCredentials([string(credentialsId: 'dockerhub-pass', variable: 'DOCKER_PASS')]) {
                    sh '''
echo $DOCKER_PASS | docker login -u yourdockerhub --password-stdin
docker push $BACKEND_IMAGE
docker push $FRONTEND_IMAGE
                    '''
                }
            }
        }

        stage('Deploy to Server') {
            steps {
                sshagent(['ec2-key']) {
                    sh '''
ssh -o StrictHostKeyChecking=no ubuntu@YOUR_EC2_PUBLIC_IP "docker pull $BACKEND_IMAGE && docker pull $FRONTEND_IMAGE"
ssh ubuntu@YOUR_EC2_PUBLIC_IP "docker stop backend_c || true && docker rm backend_c || true"
ssh ubuntu@YOUR_EC2_PUBLIC_IP "docker stop frontend_c || true && docker rm frontend_c || true"
ssh ubuntu@YOUR_EC2_PUBLIC_IP "docker run -d -p 5000:5000 --name backend_c $BACKEND_IMAGE"
ssh ubuntu@YOUR_EC2_PUBLIC_IP "docker run -d -p 80:80 --name frontend_c $FRONTEND_IMAGE"
                    '''
                }
            }
        }
    }
}
