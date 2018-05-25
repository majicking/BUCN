/**
 * Created by lifeng on 2016/1/13.
 */
(function () {
    'use strict';

    /* Services */
    angular.module('app').service('UserService', UserService);

    UserService.$inject = ['$http', '$q'];
    function UserService($http, $q) {
        return {
            checkUserCode:function(code){
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.get('http://bucn.ghbacoin.com/api/app/checkUserCode',{
                    params: {
                        userCode: code
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
            login: function (username, password) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.post('http://bucn.ghbacoin.com/api/user/login', {
                    username: username,
                    password: password
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
            forgot: function (password, phone, captcha , reCaptcha) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.post('http://bucn.ghbacoin.com/api/user/forgot', {
                    password: password,
                    phone: phone,
                    captcha: captcha,
                    reCaptcha: reCaptcha
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
            loginForQiYe: function (username, password) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.post('http://bucn.ghbacoin.com/api/qiye/login', {
                    username: username,
                    password: password
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
            forgotForQiYe: function (username,password, phone, captcha , reCaptcha) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.post('http://bucn.ghbacoin.com/api/qiye/forgot', {
                    username: username,
                    password: password,
                    phone: phone,
                    captcha: captcha,
                    reCaptcha: reCaptcha
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
            loginForWechat: function (code) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.post('http://bucn.ghbacoin.com/api/user/wechat/login', {
                    code: code
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
            validateCode: function (referralCode) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.post('http://bucn.ghbacoin.com/api/user/validate/referralCode', {
                    referralCode: referralCode
                }).success(function (message) {
                    deferred.resolve(message);
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
            validateUsername: function (username) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.post('http://bucn.ghbacoin.com/api/user/validate/username', {
                    username: username
                }).success(function (message) {
                    deferred.resolve(message);
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
            verifyForQiYe: function (userId, name,idCard,bizCredentialName,bizLicenseNo) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.post('http://bucn.ghbacoin.com/api/qiye/verify', {
                    userId: userId,
                    name: name,
                    idCard:idCard,
                    bizCredentialName:bizCredentialName,
                    bizLicenseNo:bizLicenseNo
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
            verify: function (userId, name,idCard) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.post('http://bucn.ghbacoin.com/api/user/verify', {
                    userId: userId,
                    name: name,
                    idCard:idCard
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
            addPaymentPw: function (userId, paymentPw) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.post('http://bucn.ghbacoin.com/api/user/payment', {
                    userId: userId,
                    paymentPw: paymentPw
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
            getCaptcha: function (code,phone,verifyPhone) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.post('http://bucn.ghbacoin.com/api/user/captcha', {
                    code:code,
                    phone: phone,
                    verifyPhone: verifyPhone
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
            register: function (username, password,referralCode, phone, captcha , reCaptcha) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.post('http://bucn.ghbacoin.com/api/user/register', {
                    username: username,
                    password: password,
                    referralCode:referralCode,
                    phone: phone,
                    captcha: captcha,
                    reCaptcha: reCaptcha
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
            changePassword: function (userId, oldPassword, newPassword) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.post('http://bucn.ghbacoin.com/api/user/password', {
                    userId: userId,
                    oldPassword: oldPassword,
                    newPassword: newPassword
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
            changePayment: function (userId, oldPassword, newPassword) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.post('http://bucn.ghbacoin.com/api/user/repayment', {
                    userId: userId,
                    oldPassword: oldPassword,
                    newPassword: newPassword
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
            bindAccount: function (username, password,openId) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.put('http://bucn.ghbacoin.com/api/user/binding', {
                    username: username,
                    password: password,
                    openId:openId
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
            getWechatInfo: function (code) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.get('http://bucn.ghbacoin.com/api/user/wechat', {
                    params: {
                        code: code
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
            addReferralCode: function (userId, referralCode, password) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.post('http://bucn.ghbacoin.com/api/user/referral', {
                    userId: userId,
                    referralCode: referralCode,
                    password: password
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
            validateReferralCode: function (referralCode,userId) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.post('http://bucn.ghbacoin.com/api/user/validate/referral', {
                    referralCode: referralCode,
                    userId: userId
                }).success(function (message) {
                    deferred.resolve(message);
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
            mobile: function (userId, phone, captcha , reCaptcha, password) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.post('http://bucn.ghbacoin.com/api/user/mobile', {
                    userId: userId,
                    phone: phone,
                    captcha: captcha,
                    reCaptcha: reCaptcha,
                    password: password
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