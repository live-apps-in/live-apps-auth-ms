pipeline {
    agent any

    stages {
        stage('Build Docker Image') {
            steps {
                sh 'docker build -t live-apps-auth .'
            }
        }
        stage('Stop running Container') {
            steps {
                sh 'docker rm live-apps-auth --force'
            }
        }
        stage('Start Container') {
            steps {
                sh 'docker run -p 5001:5000 -d --name live-apps-auth live-apps-auth'
            }
        }

    }
}