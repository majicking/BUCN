/**
 * Created by lifeng on 2016/1/20.
 */
(function () {
    'use strict';

    /* Controllers */
    angular.module('app').controller('AliPayCtrl', AliPayCtrl);

    AliPayCtrl.$inject = ['$rootScope', '$sessionStorage','$scope', '$ionicLoading', '$ionicNativeTransitions','$ionicPopup', 'UserService', 'AccountService'];
    function AliPayCtrl($rootScope, $sessionStorage, $scope, $ionicLoading, $ionicNativeTransitions, $ionicPopup, UserService, AccountService) {
        var vm = this;
        vm.userId = $rootScope.userInfo.userId;

        vm.model = {
            aliPay:$rootScope.userInfo.aliPay
        }

        vm.addAliPay = addAliPay;

        getAccountInfo();

        function getAccountInfo(){
            $ionicLoading.show();
            AccountService.getAccountInfo(
                vm.userId
            ).success(function (data) {
                vm.model = data;
                $rootScope.userInfo.aliPay = $sessionStorage.userInfo.aliPay = vm.model.aliPay;
            }).error(function (error) {
            }).finally(function (error) {
                $ionicLoading.hide();
            });
        }

        function addAliPay() {
            if (vm.model.aliPay == null || $.trim(vm.model.aliPay) == '') {
                $scope.$emit('alertWarning', '请输入微信账号');
                return;
            } else if (vm.model.aliPay.length > 30) {
                $scope.$emit('alertWarning', '账号长度过长');
                return;
            }else{
                $ionicLoading.show();
                UserService.addAliPay(
                    vm.userId,
                    vm.model.aliPay
                ).success(function (data) {
                    $rootScope.userInfo.aliPay = $sessionStorage.userInfo.aliPay = data;
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