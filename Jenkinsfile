pipeline {
    agent none
    options {
        checkoutToSubdirectory('argo-status-pages')
        newContainerPerStage()
    }
    environment {
        PROJECT_DIR='argo-status-pages'
    }
    stages {
        stage ('Run argo-status-pages ansible-playbook for each tenant') {
            agent {
                docker {
                    image 'node:buster'
                }
            }
            steps {
                git "https://github.com/ARGOeu/argo-ansible.git"
                withCredentials([file(credentialsId: 'vault-argo', variable: 'vault_file')]) {
                    sh 'ansible-playbook -v -i argo-status-pages --vault-password-file $vault_file argo-status-pages.yml'
                }
            }
        }
    }
    post {
        success {
            script{
                if ( env.BRANCH_NAME == 'devel' ) {
                    slackSend( message: ":rocket: New version for <$BUILD_URL|$PROJECT_DIR>:$BRANCH_NAME Job: $JOB_NAME !")
                    slackSend( message: ":satellite: New version of <$BUILD_URL|$PROJECT_DIR> Deployed successfully to devel!")
                }
                else if ( env.BRANCH_NAME == 'master' ) {
                    slackSend( message: ":rocket: New version for <$BUILD_URL|$PROJECT_DIR>:$BRANCH_NAME Job: $JOB_NAME !")
                }
            }
        }
        failure {
            script{
                if ( env.BRANCH_NAME == 'master' || env.BRANCH_NAME == 'devel' ) {
                    slackSend( message: ":rain_cloud: Build Failed for <$BUILD_URL|$PROJECT_DIR>:$BRANCH_NAME Job: $JOB_NAME")
                }
            }
        }
    }
}
