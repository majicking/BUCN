/**
 * Created by lifeng on 2016/1/20.
 */
(function () {
    'use strict';

    /* Controllers */
    angular.module('app').controller('WeichatPayCtrl', WeichatPayCtrl);

    WeichatPayCtrl.$inject = ['$rootScope', '$sessionStorage','$scope', '$ionicLoading', '$ionicNativeTransitions','$ionicPopup', 'UserService', 'AccountService'];
    function WeichatPayCtrl($rootScope, $sessionStorage, $scope, $ionicLoading, $ionicNativeTransitions, $ionicPopup, UserService, AccountService) {
        var vm = this;
        vm.userId = $rootScope.userInfo.userId;

        vm.model = {
            weichatPay:$rootScope.userInfo.weichatPay
        }

        vm.addWeichatPay = addWeichatPay;

        getAccountInfo();

        function getAccountInfo(){
            $ionicLoading.show();
            AccountService.getAccountInfo(
                vm.userId
            ).success(function (data) {
                vm.model = data;
                $rootScope.userInfo.weichatPay = $sessionStorage.userInfo.weichatPay = vm.model.weichatPay;
            }).error(function (error) {
            }).finally(function (error) {
                $ionicLoading.hide();
            });
        }

        function addWeichatPay() {
            if (vm.model.weichatPay == null || $.trim(vm.model.weichatPay) == '') {
                $scope.$emit('alertWarning', '请输入微信账号');
                return;
            } else if (vm.model.weichatPay.length > 30) {
                $scope.$emit('alertWarning', '账号长度过长');
                return;
            }else{
                $ionicLoading.show();
                UserService.addWeichatPay(
                    vm.userId,
                    vm.model.weichatPay
                ).success(function (data) {
                    $rootScope.userInfo.weichatPay = $sessionStorage.userInfo.weichatPay = data;
                    $ionicNativeTransitions.stateGo('tab.manage', {}, {}, {
                        "type": "slide",
                        "direction": "right"
                    });
                }).error(function (error) {
                }).finally (function(){
                    $ionicLoading.hide();
                });
            }
        }
    }
})();