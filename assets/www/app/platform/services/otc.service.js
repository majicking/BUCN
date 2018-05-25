/**
 * Created by wyym on 2018/3/21.
 */
(function () {
    'use strict';

    angular.module('app').service('OtcService', OtcService);

    OtcService.$inject = ['$http', '$q'];
    function OtcService($http, $q) {
        return {
            getOtcSellList: function (currentPage, itemsPerPage, criteria) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.get('http://bucn.ghbacoin.com/api/otc/market_page', {
                    params: {
                        currentPage: currentPage,
                        itemsPerPage: itemsPerPage,
                        criteria: criteria
                    }
                }).success(function (message) {
                    deferred.resolve(message.data);
                }).error(function (error) {
                    deferred.reject(error);
                });
                promise.success = function (fn) {
                    promise.then(fn);
                    return promise;
                };
                promise.error = function (fn) {
                    promise.then(null, fn);
                    return promise;
                };
                return promise;
            },
            getOtcBuyList: function (currentPage, itemsPerPage, criteria) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.get('http://bucn.ghbacoin.com/api/otc/my_buy_list', {
                    params: {
                        currentPage: currentPage,
                        itemsPerPage: itemsPerPage,
                        criteria: criteria
                    }
                }).success(function (message) {
                    deferred.resolve(message.data);
                }).error(function (error) {
                    deferred.reject(error);
                });
                promise.success = function (fn) {
                    promise.then(fn);
                    return promise;
                };
                promise.error = function (fn) {
                    promise.then(null, fn);
                    return promise;
                };
                return promise;
            },
            addOtcSell: function (input) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.post('http://bucn.ghbacoin.com/api/otc/addOtcSell', input).success(function (message) {
                    deferred.resolve(message.data);
                }).error(function (error) {
                    deferred.reject(error);
                });
                promise.success = function (fn) {
                    promise.then(fn);
                    return promise;
                };
                promise.error = function (fn) {
                    promise.then(null, fn);
                    return promise;
                };
                return promise;
            },
            initOtcSellModel: function (input) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.post('http://bucn.ghbacoin.com/api/otc/initOtcSellModel', input).success(function (message) {
                    deferred.resolve(message.data);
                }).error(function (error) {
                    deferred.reject(error);
                });
                promise.success = function (fn) {
                    promise.then(fn);
                    return promise;
                };
                promise.error = function (fn) {
                    promise.then(null, fn);
                    return promise;
                };
                return promise;
            },
            cancelOtcSell: function (input) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.post('http://bucn.ghbacoin.com/api/otc/cancelOtcSell', input).success(function (message) {
                    deferred.resolve(message.data);
                }).error(function (error) {
                    deferred.reject(error);
                });
                promise.success = function (fn) {
                    promise.then(fn);
                    return promise;
                };
                promise.error = function (fn) {
                    promise.then(null, fn);
                    return promise;
                };
                return promise;
            },
            confimBuy: function (input) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.post('http://bucn.ghbacoin.com/api/otc/confimBuy', input).success(function (message) {
                    deferred.resolve(message.data);
                }).error(function (error) {
                    deferred.reject(error);
                });
                promise.success = function (fn) {
                    promise.then(fn);
                    return promise;
                };
                promise.error = function (fn) {
                    promise.then(null, fn);
                    return promise;
                };
                return promise;
            },
            cancelBuy: function (input) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.post('http://bucn.ghbacoin.com/api/otc/cancelBuy', input).success(function (message) {
                    deferred.resolve(message.data);
                }).error(function (error) {
                    deferred.reject(error);
                });
                promise.success = function (fn) {
                    promise.then(fn);
                    return promise;
                };
                promise.error = function (fn) {
                    promise.then(null, fn);
                    return promise;
                };
                return promise;
            },
            confimPay: function (input) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.post('http://bucn.ghbacoin.com/api/otc/confimPay', input).success(function (message) {
                    deferred.resolve(message.data);
                }).error(function (error) {
                    deferred.reject(error);
                });
                promise.success = function (fn) {
                    promise.then(fn);
                    return promise;
                };
                promise.error = function (fn) {
                    promise.then(null, fn);
                    return promise;
                };
                return promise;
            },
            confirmComplet: function (input) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.post('http://bucn.ghbacoin.com/api/otc/payComplete', input).success(function (message) {
                    deferred.resolve(message.data);
                }).error(function (error) {
                    deferred.reject(error);
                });
                promise.success = function (fn) {
                    promise.then(fn);
                    return promise;
                };
                promise.error = function (fn) {
                    promise.then(null, fn);
                    return promise;
                };
                return promise;
            },
            imgUpload: function (currentBuyId,imgAddr,currentUser) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.put('http://bucn.ghbacoin.com/api/otc/img/upload', {
                    currentBuyId: currentBuyId,
                    imgAddr: imgAddr,
                    currentUser:currentUser
                }).success(function (message) {
                    deferred.resolve(message.data);
                }).error(function (error) {
                    deferred.reject(error);
                });
                promise.success = function (fn) {
                    promise.then(fn);
                    return promise;
                };
                promise.error = function (fn) {
                    promise.then(null, fn);
                    return promise;
                };
                return promise;
            }

        }
    }
})();