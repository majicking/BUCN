/**
 * Created by lifeng on 2016/1/20.
 */
(function () {
    'use strict';

    /* Controllers */
    angular.module('app').controller('PaymentCtrl', PaymentCtrl);
    PaymentCtrl.$inject = ['$rootScope', '$scope', '$sessionStorage', '$ionicLoading', '$state', 'UserService'];
    function PaymentCtrl($rootScope, $scope, $sessionStorage, $ionicLoading, $state, UserService) {
        var vm = this;
        vm.userId = $rootScope.userInfo.userId;

        vm.paymentPw = '';
        vm.rePassword = '';

        vm.confirm = confirm;

        function confirm() {
            var re = /^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{6,22}$/;
            if (vm.paymentPw == null
                || $.trim(vm.paymentPw) == '') {
                $scope.$emit('alertWarning', '请输入新密码');
                return;
            }
            if (!re.test(vm.paymentPw)) {
                $scope.$emit('alertWarning', '新密码格式不正确');
                return;
            }
            if (vm.rePassword == null
                || $.trim(vm.rePassword) == '') {
                $scope.$emit('alertWarning', '请输入再确认密码');
                return;
            }
            if (vm.paymentPw != vm.rePassword) {
                $scope.$emit('alertWarning', '两次输入的密码不一致');
                return;
            }
            $ionicLoading.show();
            UserService.addPaymentPw(
                vm.userId,
                vm.paymentPw
            ).success(function (data) {
                $rootScope.userInfo.isPayment = $sessionStorage.userInfo.isPayment = 1;
                $ionicLoading.hide();
                $state.go('tab.account');
            }).error(function (error) {
                $ionicLoading.hide();
            });
        }
    }
})();