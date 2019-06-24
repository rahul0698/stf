module.exports = function SignInCtrl($scope, $http, $location, $timeout) {

  $scope.error = null
  $scope.isSignUp = false
  $scope.isUserCreated = false

  $scope.runSignUp = function() {
    $scope.isSignUp = true
  }

  $scope.signUpSubmit = function() {
    var data = {
      name: this.name,
      email: this.email
    }
    $http.post('/auth/api/v1/mock2', data).success(function(response) {
      $scope.isUserCreated = true
      $scope.error = false
      $scope.successMessage = 'User created successfully,Please Login'
      $timeout(()=> {
        $location.path('/')
    }, 2000);
    }).error(function(response) {
      switch (response.error) {
        case 'ValidationError':
          $scope.error = {
            $invalid: true
          }
          break
        case 'InvalidCredentialsError':
          $scope.error = {
            $incorrect: true
          }
          break
        case 'UserAlreadyExistsError':
          $scope.error = {
            $userExists: true
          }
          $scope.errorMessage = response.message;
          break
        default:
          $scope.error = {
            $server: true
          }
          break
      }
    })
  }


  $scope.submit = function() {
    var data = {
      name: this.username,
      email: this.email
    }
    $scope.invalid = false
    $http.post('/auth/api/v1/mock', data)
      .success(function(response) {
        $scope.error = null
        location.replace(response.redirect)
      })
      .error(function(response) {
        switch (response.error) {
          case 'ValidationError':
            $scope.error = {
              $invalid: true
            }
            break
          case 'InvalidCredentialsError':
            $scope.error = {
              $incorrect: true
            }
            break
          default:
            $scope.error = {
              $server: true
            }
            break
        }
      })
  }
}
