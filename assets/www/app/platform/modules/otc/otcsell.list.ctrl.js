/**
 * Created by lifeng on 2016/1/19.
 */
(function () {
    'use strict';

    /* Controllers */
    angular.module('app').controller('OtcSellListCtrl', OtcSellListCtrl);

    OtcSellListCtrl.$inject = ['$stateParams', '$rootScope', '$scope', '$state', '$ionicPopover', 'OtcService','$ionicLoading'];
    function OtcSellListCtrl($stateParams, $rootScope, $scope, $state, $ionicPopover,OtcService,$ionicLoading) {
        var vm = this;
        vm.items = [];
        vm.hasMoreData = false;
        vm.hasData = true;
        vm.page = {
            currentPage: 1,
            itemsPerPage: 10
        }

        vm.criteria = {
            status:0,
            otcType:0,
            subAccountType:'0010'
        };

        vm.otcTypes = [
            {
                value: '0',
                text: '卖出'
            },
            {
                value: '1',
                text: '买入'
            }
        ];

        vm.loadMore = loadMore;
        vm.doRefresh = doRefresh;
        vm.otcTypeChanged = otcTypeChanged;

        getList();

        function getList() {
            $ionicLoading.show();
            doRefresh();
        }

        function otcTypeChanged(otcTypeVal){
            vm.criteria.otcType = otcTypeVal;
            getList();
            // if(vm.input.otcType == '0'){
            //
            // }else{
            //
            // }
        }

        function doRefresh() {
            OtcService.getOtcSellList(1, vm.page.itemsPerPage, vm.criteria)
                .success(function (data) {
                    vm.page = {
                        currentPage: 1,
                        itemsPerPage: 10
                    }
                    vm.items = [];
                    if (data.otcSellModelList.length == 0) {
                        vm.hasMoreData = false;
                        vm.hasData = false;
                    } else {
                        angular.forEach(data.otcSellModelList, function (item) {
                            vm.items.push(item);
                        });
                        vm.page.currentPage++;
                        if (data.otcSellModelList.length < vm.page.itemsPerPage) {
                            vm.hasMoreData = false;
                            vm.hasData = false;
                        } else {
                            vm.hasMoreData = true;
                        }
                    }
                })
                .error(function (error) {
                    vm.hasMoreData = false;
                    vm.hasData = false;
                }).finally(function () {
                $scope.$broadcast('scroll.refreshComplete');
                $ionicLoading.hide();
            });
        }

        function loadMore() {
            OtcService.getOtcSellList(vm.page.currentPage,vm.page.itemsPerPage,vm.criteria)
                .success(function (data) {
                    if (data.otcSellModelList.length == 0) {
                        vm.hasMoreData = false;
                        vm.hasData = false;
                    } else {
                        angular.forEach(data.otcSellModelList, function (item) {
                            vm.items.push(item);
                        });
                        vm.page.currentPage++;
                        if (data.otcSellModelList.length < vm.page.itemsPerPage) {
                            vm.hasMoreData = false;
                            vm.hasData = false;
                        } else {
                            vm.hasMoreData = true;
                        }
                    }
                }).error(function (error) {
                vm.hasMoreData = false;
                vm.hasData = false;
            }).finally(function () {
                $scope.$broadcast('scroll.infiniteScrollComplete');
            });
        }
    }
})();