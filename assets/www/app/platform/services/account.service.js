(function () {
    'use strict';

    /* Services */
    angular.module('app').service('AccountService', AccountService);

    AccountService.$inject = ['$http', '$q'];
    function AccountService($http, $q) {
        return {
            getUserGraph: function (currentPage, itemsPerPage, criteria) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.get('http://bucn.ghbacoin.com/api/account/graph', {
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
            getPaymentSeqlist: function (currentPage, itemsPerPage, criteria) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.get('http://bucn.ghbacoin.com/api/account/payment/list', {
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
            getBillList: function (currentPage, itemsPerPage, criteria) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.get('http://bucn.ghbacoin.com/api/account/bill', {
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
            getIdsFromCededBill: function (userId, subAccountType) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.get('http://bucn.ghbacoin.com/api/account/ceded/ids', {
                    params: {
                        userId: userId,
                        subAccountType: subAccountType
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
            getIdsFromTransferBill: function (userId, subAccountType) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.get('http://bucn.ghbacoin.com/api/account/transfer/ids', {
                    params: {
                        userId: userId,
                        subAccountType: subAccountType
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
            getIdsFromConvertBill: function (userId, subAccountType) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.get('http://bucn.ghbacoin.com/api/account/convert/ids', {
                    params: {
                        userId: userId,
                        subAccountType: subAccountType
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
            getAsset: function (userId, subAccountType) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.get('http://bucn.ghbacoin.com/api/account/asset', {
                    params: {
                        userId: userId,
                        subAccountType: subAccountType
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
            getAsset2: function (userId, subAccountType) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.get('http://bucn.ghbacoin.com/api/account/asset2', {
                    params: {
                        userId: userId,
                        subAccountType: subAccountType
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
            getCode: function (userId) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.get('http://bucn.ghbacoin.com/api/account/code', {
                    params: {
                        userId: userId
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
            getAccountInfo: function (userId) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.get('http://bucn.ghbacoin.com/api/account/info', {
                    params: {
                        userId: userId
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
            //refreshUser: function (userId) {
            //    var deferred = $q.defer();
            //    var promise = deferred.promise;
            //    $http.get('http://bucn.ghbacoin.com/api/user/genGrade', {
            //        params: {
            //            userId: userId
            //        }
            //    }).success(function (message) {
            //        deferred.resolve(message);
            //    }).error(function (error) {
            //        deferred.reject(error);
            //    });
            //    promise.success = function (fn) {
            //        promise.then(fn);
            //        return promise;
            //    };
            //    promise.error = function (fn) {
            //        promise.then(null, fn);
            //        return promise;
            //    };
            //    return promise;
            //},
            getWithdrawInfo: function (userId, subAccountType) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.get('http://bucn.ghbacoin.com/api/account/withdraw', {
                    params: {
                        userId: userId,
                        subAccountType: subAccountType
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
            withdraw: function (input) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.post('http://bucn.ghbacoin.com/api/account/withdraw', input).success(function (message) {
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
            getWithdrawResult: function (id, subAccountType) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.get('http://bucn.ghbacoin.com/api/account/withdraw/result', {
                    params: {
                        id: id,
                        subAccountType: subAccountType
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
            getTransferInfo: function (userId, subAccountType) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.get('http://bucn.ghbacoin.com/api/account/transfer', {
                    params: {
                        userId: userId,
                        subAccountType: subAccountType
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
            transfer: function (input) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.post('http://bucn.ghbacoin.com/api/account/transfer', input).success(function (message) {
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
            getTransferResult: function (id, subAccountType) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.get('http://bucn.ghbacoin.com/api/account/transfer/result', {
                    params: {
                        id: id,
                        subAccountType: subAccountType
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
            getCededInfo: function (userId, id, subAccountType) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.get('http://bucn.ghbacoin.com/api/account/ceded', {
                    params: {
                        userId:userId,
                        id: id,
                        subAccountType: subAccountType
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
            getCededList: function (currentPage, itemsPerPage, criteria) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.get('http://bucn.ghbacoin.com/api/account/ceded/list', {
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
            ceded: function (input) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.post('http://bucn.ghbacoin.com/api/account/ceded', input).success(function (message) {
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
            getCededResult: function (id, subAccountType) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.get('http://bucn.ghbacoin.com/api/account/ceded/result', {
                    params: {
                        id: id,
                        subAccountType: subAccountType
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
            getPayInfo: function (subscribe_fee,code,username) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.get('http://bucn.ghbacoin.com/api/account/pay/info', {
                    params: {
                        subscribe_fee: subscribe_fee,
                        code: code,
                        username:username
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
            imgUpload: function (userId,imgAddr) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.put('http://bucn.ghbacoin.com/api/account/img/upload', {
                    userId: userId,
                    imgAddr: imgAddr
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
            saveBankUsed: function (userId, bankTypeValue) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.put('http://bucn.ghbacoin.com/api/account/used/save', {
                    userId: userId,
                    bankTypeValue: bankTypeValue
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