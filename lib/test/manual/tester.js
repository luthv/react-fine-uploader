'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pica = require('pica/dist/pica');

var _pica2 = _interopRequireDefault(_pica);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _gallery = require('lib/gallery');

var _gallery2 = _interopRequireDefault(_gallery);

var _s = require('fine-uploader-wrappers/s3');

var _s2 = _interopRequireDefault(_s);

var _fineUploaderWrappers = require('fine-uploader-wrappers');

var _fineUploaderWrappers2 = _interopRequireDefault(_fineUploaderWrappers);

require('lib/gallery/gallery.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var traditionalUploader = new _fineUploaderWrappers2.default({
    options: {
        chunking: {
            enabled: true
        },
        debug: true,
        deleteFile: {
            enabled: true,
            endpoint: '/vendor/fineuploader/php-traditional-server/endpoint.php'
        },
        request: {
            endpoint: '/vendor/fineuploader/php-traditional-server/endpoint.php'
        },
        retry: {
            enableAuto: true
        }
    }
});

var s3Uploader = new _s2.default({
    options: {
        chunking: {
            enabled: true,
            concurrent: {
                enabled: true
            }
        },
        debug: true,
        deleteFile: {
            enabled: true,
            endpoint: "/vendor/fineuploader/php-s3-server/endpoint.php"
        },
        request: {
            endpoint: "http://fineuploadertest.s3.amazonaws.com",
            accessKey: "AKIAIXVR6TANOGNBGANQ"
        },
        retry: {
            enableAuto: true
        },
        signature: {
            endpoint: "/vendor/fineuploader/php-s3-server/endpoint.php"
        },
        uploadSuccess: {
            endpoint: "/vendor/fineuploader/php-s3-server/endpoint.php?success"
        }
    }
});

var Tester = function (_Component) {
    _inherits(Tester, _Component);

    function Tester() {
        _classCallCheck(this, Tester);

        return _possibleConstructorReturn(this, (Tester.__proto__ || Object.getPrototypeOf(Tester)).apply(this, arguments));
    }

    _createClass(Tester, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'h2',
                    null,
                    'Traditional'
                ),
                _react2.default.createElement(_gallery2.default, { uploader: traditionalUploader,
                    'thumbnail-customResizer': !traditionalUploader.qq.ios() && customResizer
                }),
                _react2.default.createElement(
                    'h2',
                    null,
                    'S3'
                ),
                _react2.default.createElement(_gallery2.default, { uploader: s3Uploader })
            );
        }
    }]);

    return Tester;
}(_react.Component);

var customResizer = function customResizer(resizeInfo) {
    return new Promise(function (resolve) {
        _pica2.default.resizeCanvas(resizeInfo.sourceCanvas, resizeInfo.targetCanvas, {}, resolve);
    });
};

exports.default = Tester;