pipeline {
  agent any
  stages {
    stage('Prepare') {

      steps {

      echo 'Clonning Repository'
        
        git(url: 'https://lab.ssafy.com/s06-bigdata-rec-sub2/S06P22A104.git', branch: 'backend', credentialsId: 'gitlab_id')
      
      }

      post {
        success {
          echo 'Successfully Pulled Repository'
        }
      }
    }

    stage('Build backend') {

/**
      agent {
        docker {
          image 'ssafit:latest'
        }
      }
*/
      steps {
        dir('/var/lib/jenkins/workspace/ssafit-backend/backend/spring'){
          sh 'chmod +x gradlew'
          sh './gradlew build'
        }

        dir('/var/lib/jenkins/workspace/ssafit-backend/backend/spring/build/libs'){
          sh 'java -jar spring-0.0.1-SNAPSHOT.jar'
        }
        //sh 'cd /var/lib/jenkins/workspace/ssafit-backend/backend/spring/gradlew build'
          // sh 'chmod +x gradlew'
        //sh 'gradlew.bat build'
        //sh 'cd /var/lib/jenkins/workspace/ssafit-backend/backend/spring/build/libs/java -jar spring-0.0.1-SNAPSHOT.jar'
        //sh 'java -jar spring-0.0.1-SNAPSHOT.jar'
          // sh 'docker build --tag=ssafit .'
          // sh 'docker rm -f $(docker ps -a --filter "name=ssafit" -q)'
        
      }

      post {
        success {
          echo 'Successfully Building spring'
        }

        failure {
          echo 'Failed Building backend'
        }
      }
    }

  }
}
