pipeline {
    /*comment*/
    agent any
    environment {
        REPO_NAME = 'canaanfront'
    }
    stages {
        stage('Build Docker images') {
            when {
                expression {
                    return env.GIT_BRANCH == 'master'  

                }
            }
            steps {
                sh 'cp /var/lib/jenkins/enviroments/$REPO_NAME/$GIT_BRANCH ./.env'
                sh 'docker-compose build'
            }
        }
        stage('Deploy containers') {
            when {
                expression {
                   return env.GIT_BRANCH == 'master'  
                }
            }
            steps {
                sh 'docker-compose up -d'
            }
        }
    }
    post {
        success {
            sh 'echo "All tasks completed succesfully!!!"'
        }
        failure {
            sh 'echo "WARNING: there were error during the pipeline!!!"'
        }
    }
}
