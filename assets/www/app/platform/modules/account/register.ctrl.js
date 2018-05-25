/**
 * Created by lifeng on 2016/1/20.
 */
(function () {
    'use strict';

    /* Controllers */
    angular.module('app').controller('RegisterCtrl', RegisterCtrl);

    RegisterCtrl.$inject = ['$rootScope', '$scope', '$stateParams', '$sessionStorage', '$ionicNativeTransitions', '$interval', '$ionicLoading','$ionicPopup', '$state', 'UserService'];
    function RegisterCtrl($rootScope, $scope, $stateParams, $sessionStorage, $ionicNativeTransitions, $interval, $ionicLoading, $ionicPopup, $state, UserService) {
        var vm = this;
        var referralCode = $stateParams.referralCode;
        vm.username = '';
        vm.password = '';
        if(referralCode){
            vm.referralCode = referralCode;
        }else{
            vm.referralCode = '';
        }
        vm.phone = '';
        vm.code = '';
        vm.captcha = '';
        vm.reCaptcha = '';
        vm.captchaBtn = {
            disabled: false,
            label: '获取动态码'
        };

        getCode();

        vm.register = register;
        vm.clearForm = clearForm;
        vm.getCaptcha = getCaptcha;
        vm.getCode = getCode;
        vm.login = login;

        function getCode(){
            vm.codeUrl = 'http://bucn.ghbacoin.com/api/authcode/index?t='+new Date().getTime();
        }

        function register() {
            var re = null;
            if (vm.username == null
                || $.trim(vm.username) == '') {
                $scope.$emit('alertWarning', '请输入用户名');
                return;
            }
            if (vm.username.length<6
                || vm.username.length>20) {
                $scope.$emit('alertWarning', '用户名长度不正确');
                return;
            }
            if (!((/^[A-Za-z0-9\u4e00-\u9fa5_-]+$/.test(vm.username)
                && !/^\d+$/.test(vm.username)))) {
                $scope.$emit('alertWarning', '用户名格式不正确');
                return;
            }
            if (/^GHCN\d+$/.test(vm.username.toUpperCase())) {
                $scope.$emit('alertWarning', '用户名已被占用');
                return;
            }
            if (vm.password == null
                || $.trim(vm.password) == '') {
                $scope.$emit('alertWarning', '请输入密码');
                return;
            }
            re = /^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{6,22}$/;
            if (!re.test(vm.password)) {
                $scope.$emit('alertWarning', '密码格式不正确');
                return;
            }
            if (vm.referralCode == null
                || $.trim(vm.referralCode) == '') {
                $scope.$emit('alertWarning', '请输邀请码');
                return;
            }
            if (vm.phone == null
                || $.trim(vm.phone) == '') {
                $scope.$emit('alertWarning', '请输入手机号');
                return;
            }
            re = /^1\d{10}$/;
            if (!re.test(vm.phone)) {
                $scope.$emit('alertWarning', '手机号格式不正确');
                return;
            }
            if (vm.captcha == null
                || $.trim(vm.captcha) == '') {
                $scope.$emit('alertWarning', '请输动态码');
                return;
            }
            // if(vm.referralCode == null
            //     || $.trim(vm.referralCode) == ''){
            //     vm.showConfirm = function() {
            //         var confirmPopup = $ionicPopup.confirm({
            //             title: '确认',
            //             template: '<div class="text-center">确认您没有推荐人吗?</div>',
            //             cancelText: '否',
            //             okText: '是'
            //         });
            //
            //         confirmPopup.then(function(res) {
            //             if(res) {
            //                 $ionicLoading.show();
            //                 UserService.register(
            //                     vm.username,
            //                     vm.password,
            //                     vm.referralCode,
            //                     vm.phone,
            //                     vm.captcha,
            //                     vm.reCaptcha
            //                 ).success(function (data) {
            //                     var username = vm.username;
            //                     var password = vm.password;
            //                     vm.clearForm();
            //                     //$state.go('login');
            //                     vm.login(username, password);
            //                 }).error(function (error) {
            //                 }).finally (function(){
            //                     $ionicLoading.hide();
            //                 });
            //             }
            //         });
            //     };
            //     vm.showConfirm();
            // }else{
                $ionicLoading.show();
                UserService.validateCode(
                    vm.referralCode
                ).success(function (message) {
                    if(message.code==1){
                        var confirmPopup = $ionicPopup.confirm({
                            title: '确认',
                            template: '<div class="text-center">您的推荐人是'+message.data+'?</div>',
                            cancelText: '否',
                            okText: '是'
                        });
                        confirmPopup.then(function(res) {
                            if(res) {
                                $ionicLoading.show();
                                UserService.register(
                                    vm.username,
                                    vm.password,
                                    vm.referralCode,
                                    vm.phone,
                                    vm.captcha,
                                    vm.reCaptcha
                                ).success(function (data) {
                                    var username = vm.username;
                                    var password = vm.password;
                                    vm.clearForm();
                                    //$state.go('login');
                                    vm.login(username, password);
                                }).error(function (error) {
                                }).finally (function(){
                                    $ionicLoading.hide();
                                });
                            }
                        });
                    }else{
                        $scope.$emit('alertWarning', message.message);
                    }
                }).error(function (error) {
                }).finally (function(){
                    $ionicLoading.hide();
                });
            // }
        }

        function login(username, password) {
            UserService.login(
                username,
                password
            ).success(function (data) {
                $rootScope.isLogged = $sessionStorage.isLogged = true;
                $rootScope.userInfo = $sessionStorage.userInfo = data;
                $rootScope.userInfo.subAccountTypeList = $sessionStorage.userInfo.subAccountTypeList = data.subAccountTypeList.list;
                $rootScope.token = $sessionStorage.token = data.token;
                $ionicNativeTransitions.stateGo('tab.account', {}, {}, {
                    "type": "slide",
                    "direction": "down"
                });
            }).error(function (error) {
            }).finally(function(error){
                //$ionicLoading.hide();
            })
        }

        var timePromise;
        var second = 180;

        function getCaptcha(verifyPhone) {
            if (vm.code == null
                || $.trim(vm.code) == '') {
                $scope.$emit('alertWarning', '请输入验证码');
                return;
            }
            var re = null;
            if (vm.phone == null
                || $.trim(vm.phone) == '') {
                $scope.$emit('alertWarning', '请输入手机号');
                return;
            }
            re = /^1\d{10}$/;
            if (!re.test(vm.phone)) {
                $scope.$emit('alertWarning', '手机号格式不正确');
                return;
            }
            UserService.getCaptcha(vm.code,vm.phone, verifyPhone).success(function (data) {
                vm.reCaptcha = data;
                changeCaptchaButton();
                timePromise = $interval(function () {
                    if (second == 0) {
                        initCaptchaButton(timePromise);
                    } else {
                        changeCaptchaButton();
                    }
                }, 1000);
            });
        }

        function clearForm() {
            vm.username = '';
            vm.password = '';
            vm.referralCode = '';
            vm.code = '';
            vm.phone = '';
            vm.captcha = '';
            vm.reCaptcha = '';
        }

        function initCaptchaButton() {
            vm.captchaBtn.disabled = false;
            vm.captchaBtn.label = '获取动态码';
            second = 180;
            $interval.cancel(timePromise);
        }

        function changeCaptchaButton() {
            vm.captchaBtn.disabled = true;
            vm.captchaBtn.label = "重新发送(" + second + ")";
            second--;
        }
    }
})();