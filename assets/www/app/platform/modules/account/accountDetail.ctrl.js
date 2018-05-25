(function () {
    'use strict';
    
    /* Controllers */
    angular.module('app').controller('AccountDetailCtrl', AccountDetailCtrl);

    AccountDetailCtrl.$inject = ['$rootScope', '$scope', '$ionicLoading', 'AccountService', '$stateParams','$ionicPopup', '$timeout'];
    function AccountDetailCtrl($rootScope, $scope, $ionicLoading, AccountService, $stateParams,$ionicPopup, $timeout) {
        var vm = this;
        vm.subAccountType = $stateParams.subAccountType;
        vm.detailId=$stateParams.detailId
        vm.userId = $rootScope.userInfo.userId;
        vm.type = $stateParams.type;
        vm.model = {};
        vm.items = [];
        vm.hasMoreData = false;
        vm.hasData = true;
        $scope.visible = false;
        vm.doRefresh = doRefresh;
        getList();
        function getList(){
           $ionicLoading.show();
            AccountService.getAccontDetail(vm.detailId)
                .success(function (data) {
                    vm.model=data.data;
                }).error(function (error) {
                vm.hasMoreData = false;
                vm.hasData = false;
            }).finally(function() {
                $scope.$broadcast('scroll.refreshComplete');
                $ionicLoading.hide();
            });
        }
        doRefresh();
        function doRefresh() {
            $scope.$broadcast('scroll.refreshComplete');
        }

    }
})();