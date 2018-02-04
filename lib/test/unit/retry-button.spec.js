'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsTestUtils = require('react-addons-test-utils');

var _reactAddonsTestUtils2 = _interopRequireDefault(_reactAddonsTestUtils);

var _retryButton = require('src/retry-button');

var _retryButton2 = _interopRequireDefault(_retryButton);

var _fineUploaderWrappers = require('fine-uploader-wrappers');

var _fineUploaderWrappers2 = _interopRequireDefault(_fineUploaderWrappers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('<RetryButton />', function () {
    var getButton = function getButton() {
        return _reactAddonsTestUtils2.default.scryRenderedDOMComponentsWithClass(RetryButtonComponent, 'react-fine-uploader-retry-button')[0];
    };

    var onCompleteCallback = void 0,
        RetryButtonComponent = void 0,
        uploader = void 0;

    var makeUploader = function makeUploader(_ref) {
        var options = _ref.options,
            onlyRenderIfRetryable = _ref.onlyRenderIfRetryable;

        uploader = new _fineUploaderWrappers2.default({ options: options });

        spyOn(uploader, 'on').and.callFake(function (type, callback) {
            if (type === 'complete') {
                onCompleteCallback = callback;
            }
        });

        if (onlyRenderIfRetryable != null) {
            RetryButtonComponent = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(_retryButton2.default, { id: 0,
                onlyRenderIfRetryable: onlyRenderIfRetryable,
                uploader: uploader
            }));
        } else {
            RetryButtonComponent = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(_retryButton2.default, { id: 0, uploader: uploader }));
        }
    };

    it('does not display retry button by default if upload has not failed', function () {
        makeUploader({ options: {} });

        onCompleteCallback(0, 'foo.bar', { success: true });
        expect(getButton()).toBeFalsy();
    });

    it('disables retry button if upload has not failed', function () {
        makeUploader({ options: {}, onlyRenderIfRetryable: false });

        onCompleteCallback(0, 'foo.bar', { success: true });
        expect(getButton().disabled).toBeTruthy();
    });

    it('displays retry button if upload has failed', function () {
        makeUploader({ options: {} });

        onCompleteCallback(0, 'foo.bar', { success: false });
        expect(getButton().disabled).toBeFalsy();
    });

    it('retries upload if button has been clicked', function () {
        makeUploader({ options: {} });

        onCompleteCallback(0, 'foo.bar', { success: false });

        spyOn(uploader.methods, 'retry');
        _reactAddonsTestUtils2.default.Simulate.click(getButton());
        expect(uploader.methods.retry).toHaveBeenCalledWith(0);
    });

    it('does not display retry button by default if upload has failed and retries are forbidden (default response property)', function () {
        makeUploader({ options: {} });

        onCompleteCallback(0, 'foo.bar', { success: false, preventRetry: true });
        expect(getButton()).toBeFalsy();
    });

    it('does not display retry button by default if upload has failed and retries are forbidden (custom response property)', function () {
        makeUploader({
            options: {
                retry: {
                    preventRetryResponseProperty: 'dontDareRetry'
                }
            }
        });

        onCompleteCallback(0, 'foo.bar', { success: false, dontDareRetry: true });
        expect(getButton()).toBeFalsy();
    });

    it('disables retry button if upload has failed and retries are forbidden', function () {
        makeUploader({ options: {}, onlyRenderIfRetryable: false });

        onCompleteCallback(0, 'foo.bar', { success: false, preventRetry: true });
        expect(getButton().disabled).toBeTruthy();
    });
});