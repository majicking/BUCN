(function () {
    'use strict';

    /* Controllers */
    angular.module('app').controller('TemporaryCtrl', TemporaryCtrl);

    TemporaryCtrl.$inject = ['$state','$rootScope', '$scope', '$ionicLoading', 'AccountService', '$stateParams','$ionicPopup', '$timeout','$ionicNativeTransitions'];
    function TemporaryCtrl($state,$rootScope, $scope, $ionicLoading, AccountService, $stateParams,$ionicPopup, $timeout,$ionicNativeTransitions) {
        var vm = this;
        vm.type = $stateParams.type; // type:1 首页（我的账户）跳转进来 ; type:0 首页（临时节点）跳转进来
        vm.subAccountTypeForStyle = $stateParams.subAccountType;
        vm.subAccountType = '0011';
        vm.userId = $rootScope.userInfo.userId;
        vm.model = {};

        angular.forEach($rootScope.userInfo.subAccountTypeList, function (item) {
            if (item.value == vm.subAccountTypeForStyle) {
                vm.model.subAccountTypeText = item.text;
                return;
            }
        });

        vm.items = [];
        vm.hasMoreData = false;
        vm.hasData = true;
        vm.page = {
            currentPage : 1,
            itemsPerPage : 10
        }

        vm.criteria = {
            userId:vm.userId,
            subAccountType:vm.subAccountType,
            subAccountTypeForStyle:vm.subAccountTypeForStyle
        }

        vm.loadMore = loadMore;
        vm.doRefresh = doRefresh;
        vm.goBack = goBack;
        vm.switchAccount = switchAccount;

        $scope.visible = false;
        $scope.moreToggle = function(){
            $scope.visible = !$scope.visible;
        }

        $scope.accountAdd = function(){
            $scope.data = {};
            AccountService.getAccountVerify(vm.userId)
                .success(function (res) {
                    if(res.data == '30318'){
                        $ionicPopup.show({
                            template: '<input type="text" style="border: 0.5px solid #ddd;padding-left: 10px;" placeholder="请输入临时账户名称" ng-model="data.accountName">',
                            title: '账户名称',
                            scope: $scope,
                            buttons: [
                                {
                                    text: '确定',
                                    type: 'button-balanced botton-radius',
                                    onTap: function(e) {
                                        if (!$scope.data.accountName) {
                                            e.preventDefault();
                                            $scope.$emit('alertWarning', '请输入账户名称');
                                        } else {
                                            var reg = /^(?!\d+$)[\da-zA-Z\u4e00-\u9fa5]{1,10}$|^(?!\d+$)[\da-zA-Z]{1,20}$/;
                                            if(!reg.test($scope.data.accountName)){
                                                $scope.$emit('alertWarning', '只能输入20个字母、数字或10个汉字,不能为纯数字');
                                            }else {
                                                AccountService.addAccount(vm.userId,$scope.data.accountName)
                                                    .success(function (data) {
                                                        if(data.code == '30314'){
                                                            getList();
                                                        }else if(data.code == '20503') {
                                                            $scope.$emit('alertWarning', '账户名称重复，请重新输入!')
                                                        }else {
                                                            $scope.$emit('alertWarning', '服务器繁忙，请稍后再试!');
                                                        }
                                                    }).error(function (error) {
                                                        if(error.errorCode == '20503') {
                                                            $scope.$emit('alertWarning', '账户名称重复,请重新输入!')
                                                        }else {
                                                            $scope.$emit('alertWarning', '服务器繁忙，请稍后再试!');
                                                        }
                                                    }).finally(function() {
                                                    $scope.$broadcast('scroll.refreshComplete');
                                                    $ionicLoading.hide();
                                                });
                                            }
                                        }
                                    }
                                },
                                {
                                    text: '取消',
                                    type: 'button-org botton-radius'
                                },
                            ]
                        });
                    }else {
                        $scope.$emit('alertWarning', '申请资格未达到！');
                    }
                }).error(function (error) {
                    $scope.$emit('alertWarning', '服务器繁忙，请稍后再试!');
                }).finally(function() {
                    $scope.$broadcast('scroll.refreshComplete');
                    $ionicLoading.hide();
                });
        };
        getList();

        function getList(){
            $ionicLoading.show();
            doRefresh();
        }

        function goBack() {
            if(vm.type == 1){
                $ionicNativeTransitions.stateGo('tab.account', {}, {}, {
                    "type": "slide",
                    "direction": "down"
                });
            }else {
                $ionicNativeTransitions.stateGo('tab.account-payment-account-0004', { subAccountType:vm.subAccountType }, {}, {
                    "type": "slide",
                    "direction": "down"
                });
            }
        }

        function switchAccount(e) {
            //e.stopPropagation(vm.id);
            AccountService.SwitchingMainAccount(e).success(function (data) {
                if(data.code == 30316){
                    $scope.$emit('alertWarning', '临时账户切换成功');
                    $state.reload('tab.temporaryAccount');
                }else {
                    $scope.$emit('alertWarning', '临时账户切换失败');
                }
            }).error(function (error) {
                $ionicLoading.hide();
                $scope.$emit('alertWarning', '临时账户切换失败');
            }).finally(function () {
                $ionicLoading.hide();
            });
        }

        function doRefresh(){
            AccountService.getAccontList(1,vm.page.itemsPerPage,vm.criteria)
                .success(function (data) {
                    vm.model = data;
                    // vm.model.subAccountTypeText = data.subAccountTypeText;

                    angular.forEach($rootScope.userInfo.subAccountTypeList, function (item) {
                        if (item.value == vm.subAccountTypeForStyle) {
                            item.text = vm.model.subAccountTypeText;
                            return;
                        }
                    });

                    vm.page = {
                        currentPage : 1,
                        itemsPerPage : 10
                    }
                    vm.items = [];
                    if(vm.model.paymentSubAccountModelList.length==0){
                        vm.hasMoreData = false;
                        vm.hasData = false;
                    }else{
                        angular.forEach(vm.model.paymentSubAccountModelList, function (item) {
                            vm.items.push(item);
                        });
                        vm.page.currentPage++;
                        if(vm.model.paymentSubAccountModelList.length<vm.page.itemsPerPage){
                            vm.hasMoreData = false;
                            vm.hasData = false;
                        }else{
                            vm.hasMoreData = true;
                        }
                    }
                })
                .error(function (error) {
                    vm.hasMoreData = false;
                    vm.hasData = false;
                }).finally(function() {
                $scope.$broadcast('scroll.refreshComplete');
                $ionicLoading.hide();
            });

        }

        function loadMore(){
                AccountService.getAccontList(vm.page.currentPage,vm.page.itemsPerPage,vm.criteria)
                    .success(function (data) {
                        vm.model = data;

                        angular.forEach($rootScope.userInfo.subAccountTypeList, function (item) {
                            if (item.value == vm.subAccountTypeForStyle) {
                                item.text = vm.model.subAccountTypeText;
                                return;
                            }
                        });

                        if(vm.model.paymentSubAccountModelList.length==0){
                            vm.hasMoreData = false;
                            vm.hasData = false;
                        }else{
                            angular.forEach(vm.model.paymentSubAccountModelList, function (item) {
                                vm.items.push(item);
                            });
                            vm.page.currentPage++;
                            if(vm.model.paymentSubAccountModelList.length<vm.page.itemsPerPage){
                                vm.hasMoreData = false;
                                vm.hasData = false;
                            }else{
                                vm.hasMoreData = true;
                            }
                        }
                    })
                    .error(function (error){
                        vm.hasMoreData = false;
                        vm.hasData = false;
                    }).finally(function() {
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                });
        }
    }
})();