'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsTestUtils = require('react-addons-test-utils');

var _reactAddonsTestUtils2 = _interopRequireDefault(_reactAddonsTestUtils);

var _status = require('src/status');

var _status2 = _interopRequireDefault(_status);

var _fineUploaderWrappers = require('fine-uploader-wrappers');

var _fineUploaderWrappers2 = _interopRequireDefault(_fineUploaderWrappers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('<Status />', function () {
    var getStatus = function getStatus() {
        return _reactAddonsTestUtils2.default.findRenderedDOMComponentWithClass(StatusComponent, 'react-fine-uploader-status').textContent;
    };
    var StatusComponent = void 0,
        statusChangeCallback = void 0,
        uploader = void 0;

    beforeEach(function () {
        uploader = new _fineUploaderWrappers2.default({ options: {} });

        spyOn(uploader, 'on').and.callFake(function (type, callback) {
            if (type === 'statusChange') {
                statusChangeCallback = callback;
            }
        });

        StatusComponent = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(_status2.default, { id: 0, uploader: uploader }));
    });

    it('render nothing for a different file', function () {
        statusChangeCallback(1, 'upload successful', 'deleting');

        expect(getStatus()).toBe('');
    });

    it('render nothing for an untracked status value', function () {
        statusChangeCallback(0, 'deleting', 'delete failed');

        expect(getStatus()).toBe('');
    });

    it('renders correct default text for a single-word status value', function () {
        statusChangeCallback(0, 'upload successful', 'deleting');

        expect(getStatus()).toBe('Deleting...');
    });

    it('renders correct default text for a two-word status value', function () {
        statusChangeCallback(0, 'uploading', 'upload successful');

        expect(getStatus()).toBe('Completed');
    });

    it('renders custom text for a status value', function () {
        StatusComponent = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(_status2.default, { id: 0, text: { upload_successful: 'Success' }, uploader: uploader }));

        statusChangeCallback(0, 'uploading', 'upload successful');
        expect(getStatus()).toBe('Success');

        statusChangeCallback(0, 'uploading', 'upload failed');
        expect(getStatus()).toBe('Failed');
    });
});