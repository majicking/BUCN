/**
 * Created by lifeng on 2016/1/19.
 */
(function () {
    'use strict';

    /* Controllers */
    angular.module('app').controller('OtcMyBuysListCtrl', OtcMyBuysListCtrl);

    OtcMyBuysListCtrl.$inject = ['$stateParams', '$rootScope', '$scope', '$state', '$ionicPopover', 'OtcService', '$ionicLoading', '$ionicNativeTransitions'];
    function OtcMyBuysListCtrl($stateParams, $rootScope, $scope, $state, $ionicPopover, OtcService, $ionicLoading, $ionicNativeTransitions) {
        var vm = this;
        vm.subAccountType = $stateParams.subAccountType;
        vm.items = [];
        vm.hasMoreData = false;
        vm.hasData = true;
        vm.page = {
            currentPage: 1,
            itemsPerPage: 10
        }
        vm.selectType = {value: "9999", text: '全部'};
        vm.criteria = {
            status: "9999",
            currentUser: $rootScope.userInfo.userId,
            isCurrent: "01",
            otcType:'1',
            subAccountType:vm.subAccountType
        };
        vm.model={
            subAccountTypeText:''
        }
        vm.input = {
            id:'',
            sn:'',
            status : '0',
            createUser: $rootScope.userInfo.userId,
            checkCode:'',
            subAccountType : vm.subAccountType,
            tokenOtcSellCancel:''
        };

        angular.forEach($rootScope.userInfo.subAccountTypeList, function (item) {
            if (item.value == vm.subAccountType) {
                vm.model.subAccountTypeText = item.text;
                return;
            }
        });
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
        vm.selectItem = selectItem;
        //vm.cancelSell = cancelSell;
        vm.otcTypeChanged = otcTypeChanged;
        vm.openDetail = openDetail;
        vm.returnClass = returnClass;
        vm.urlencode = urlencode;

        $scope.visible = false;
        $scope.moreToggle = function(){
            $scope.visible = !$scope.visible;
        }

        getSeletDatas();
        getList();

        function returnClass(v){
            var strClass = '';
            if(v == '挂单中'){
                strClass = 'state-guadan';
            }else if(v == '交易中'){
                strClass = 'state-deal';
            }else if(v == '已付款'){
                strClass = 'state-payment';
            }else if(v == '交易完成'){
                strClass = 'state-complete';
            }else if(v == '取消'){
                strClass = 'state-cancel';
            }else {
                strClass = 'state-cancel';
            }
            return strClass;
        }
        function otcTypeChanged(otcTypeVal){
            vm.criteria.otcType = otcTypeVal;
            getList();
            // if(vm.criteria.otcType == '0'){
            //     vm.pageContent.amountStr='卖出数量';
            //     vm.pageContent.otcStr = '卖单';
            // }else{
            //     vm.pageContent.amountStr='买进数量';
            //     vm.pageContent.otcStr = '买单';
            // }
        }
        function getList() {
            $ionicLoading.show();
            doRefresh();
        }

        function urlencode(v) {
            return encodeURIComponent(v);
        }

        function doRefresh() {
            vm.criteria.status = vm.selectType.value;
            OtcService.getOtcBuyList(1, vm.page.itemsPerPage, vm.criteria)
                .success(function (data) {
                    vm.model = data;
                    angular.forEach(vm.model.subAccountTypeList, function (item) {
                        if (item.value == vm.subAccountType) {
                            item.text = vm.model.subAccountTypeText;
                            return;
                        }
                    });
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
                            if(item.status == 0){
                                item.status_str = '挂单中';
                            }else if(item.status == 1){
                                item.status_str = '交易中';
                            }else if(item.status == 2){
                                item.status_str = '已付款';
                            }else if(item.status == 3){
                                item.status_str = '交易完成';
                            }else if(item.status == 4){
                                item.status_str = '取消';
                            }
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
            vm.criteria.seqType = vm.selectType.value;
            OtcService.getOtcBuyList(vm.page.currentPage,vm.page.itemsPerPage,vm.criteria)
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

        function openDetail(param){
            var routerStr = '';
            if(vm.criteria.otcType == '0'){
                routerStr = 'tab.otcbuy-detail';
            }else{
                routerStr = 'tab.otcsell-detail';
            }
            $ionicNativeTransitions.stateGo(routerStr, param, {}, {
                "type": "slide",
                "direction": "right"
            });
        }

        function getSeletDatas(){
            var items = [
                    {sort: 1, text: "交易中", value: "1", $$hashKey: "object:61"},
                    {sort: 2, text: "已付款", value: "2", $$hashKey: "object:62"},
                    {sort: 3, text: "交易完成", value: "3", $$hashKey: "object:63"},
                    {sort: 5, text: "全部", value: "9999", $$hashKey: "object:64"}
                ];
            vm.selectTypes = items;
        }

        function selectItem(item) {
            vm.selectType = item;
            $ionicLoading.show();
            doRefresh();
        }
    }
})();