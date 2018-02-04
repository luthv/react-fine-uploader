'use strict';

var _all = require('fine-uploader/lib/core/all');

var _all2 = _interopRequireDefault(_all);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsTestUtils = require('react-addons-test-utils');

var _reactAddonsTestUtils2 = _interopRequireDefault(_reactAddonsTestUtils);

var _fineUploaderWrappers = require('fine-uploader-wrappers');

var _fineUploaderWrappers2 = _interopRequireDefault(_fineUploaderWrappers);

var _progressBar = require('src/progress-bar');

var _progressBar2 = _interopRequireDefault(_progressBar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('<ProgressBar />', function () {
    it('renders total progress bar when a file ID is not supplied & updates progress appropriately', function () {
        var uploader = new _fineUploaderWrappers2.default({ options: {} });
        var totalProgressCallback = void 0;
        spyOn(uploader, 'on').and.callFake(function (type, callback) {
            if (type === 'totalProgress') {
                totalProgressCallback = callback;
            }
        });

        var ProgressBarComponent = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(_progressBar2.default, { uploader: uploader }));

        var fileProgressEls = _reactAddonsTestUtils2.default.scryRenderedDOMComponentsWithClass(ProgressBarComponent, 'react-fine-uploader-file-progress-bar');
        var totalProgressEls = _reactAddonsTestUtils2.default.scryRenderedDOMComponentsWithClass(ProgressBarComponent, 'react-fine-uploader-total-progress-bar');

        expect(fileProgressEls.length).toBe(0);
        expect(totalProgressEls.length).toBe(1);

        totalProgressCallback(100, 1000);
        var totalProgressEl = _reactAddonsTestUtils2.default.findRenderedDOMComponentWithClass(ProgressBarComponent, 'react-fine-uploader-total-progress-bar');
        expect(totalProgressEl.style.width).toBe('10%');
    });

    it('renders file progress bar when a file ID is supplied & updates progress appropriately', function () {
        var uploader = new _fineUploaderWrappers2.default({ options: {} });
        var fileProgressCallback = void 0;
        spyOn(uploader, 'on').and.callFake(function (type, callback) {
            if (type === 'progress') {
                fileProgressCallback = callback;
            }
        });

        var ProgressBarComponent = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(_progressBar2.default, { id: 3, uploader: uploader }));

        var fileProgressEls = _reactAddonsTestUtils2.default.scryRenderedDOMComponentsWithClass(ProgressBarComponent, 'react-fine-uploader-file-progress-bar');
        var totalProgressEls = _reactAddonsTestUtils2.default.scryRenderedDOMComponentsWithClass(ProgressBarComponent, 'react-fine-uploader-total-progress-bar');

        expect(fileProgressEls.length).toBe(1);
        expect(totalProgressEls.length).toBe(0);

        fileProgressCallback(3, 'foo.jpeg', 100, 1000);
        var fileProgressEl = _reactAddonsTestUtils2.default.findRenderedDOMComponentWithClass(ProgressBarComponent, 'react-fine-uploader-file-progress-bar');
        expect(fileProgressEl.style.width).toBe('10%');
    });

    it('hides total progress bar initially, by default', function () {
        var uploader = new _fineUploaderWrappers2.default({ options: {} });
        var ProgressBarComponent = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(_progressBar2.default, { uploader: uploader }));
        var totalProgressElContainer = _reactAddonsTestUtils2.default.findRenderedDOMComponentWithClass(ProgressBarComponent, 'react-fine-uploader-total-progress-bar-container');

        expect(totalProgressElContainer.hasAttribute('hidden')).toBeTruthy();
    });

    it('does not hide total progress bar initially, if ordered to do so', function () {
        var uploader = new _fineUploaderWrappers2.default({ options: {} });
        var ProgressBarComponent = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(_progressBar2.default, { hideBeforeStart: false, uploader: uploader }));
        var totalProgressElContainer = _reactAddonsTestUtils2.default.findRenderedDOMComponentWithClass(ProgressBarComponent, 'react-fine-uploader-total-progress-bar-container');

        expect(totalProgressElContainer.hasAttribute('hidden')).toBeFalsy();
    });

    it('hides file progress bar initially, by default', function () {
        var uploader = new _fineUploaderWrappers2.default({ options: {} });
        var ProgressBarComponent = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(_progressBar2.default, { id: 3, uploader: uploader }));
        var fileProgressElContainer = _reactAddonsTestUtils2.default.findRenderedDOMComponentWithClass(ProgressBarComponent, 'react-fine-uploader-file-progress-bar-container');

        expect(fileProgressElContainer.hasAttribute('hidden')).toBeTruthy();
    });

    it('does not hide file progress bar initially, if ordered to do so', function () {
        var uploader = new _fineUploaderWrappers2.default({ options: {} });
        var ProgressBarComponent = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(_progressBar2.default, { hideBeforeStart: false, id: 3, uploader: uploader }));
        var fileProgressElContainer = _reactAddonsTestUtils2.default.findRenderedDOMComponentWithClass(ProgressBarComponent, 'react-fine-uploader-file-progress-bar-container');

        expect(fileProgressElContainer.hasAttribute('hidden')).toBeFalsy();
    });

    it('hides total progress bar after all uploads are complete, by default', function () {
        var uploader = new _fineUploaderWrappers2.default({ options: {} });

        var statusChangeCallback = void 0;
        spyOn(uploader, 'on').and.callFake(function (type, callback) {
            if (type === 'statusChange') {
                statusChangeCallback = callback;
            }
        });

        var ProgressBarComponent = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(_progressBar2.default, { uploader: uploader }));

        // uploading
        spyOn(uploader.methods, 'getInProgress').and.returnValue(2);
        statusChangeCallback(3, _all2.default.status.QUEUED, _all2.default.status.UPLOADING);
        statusChangeCallback(4, _all2.default.status.QUEUED, _all2.default.status.UPLOADING);
        var totalProgressElContainer = _reactAddonsTestUtils2.default.findRenderedDOMComponentWithClass(ProgressBarComponent, 'react-fine-uploader-total-progress-bar-container');
        expect(totalProgressElContainer.hasAttribute('hidden')).toBeFalsy();

        // still uploading
        uploader.methods.getInProgress.and.returnValue(1);
        statusChangeCallback(3, _all2.default.status.UPLOADING, _all2.default.status.UPLOAD_SUCCESSFUL);
        totalProgressElContainer = _reactAddonsTestUtils2.default.findRenderedDOMComponentWithClass(ProgressBarComponent, 'react-fine-uploader-total-progress-bar-container');
        expect(totalProgressElContainer.hasAttribute('hidden')).toBeFalsy();

        // done uploading
        uploader.methods.getInProgress.and.returnValue(0);
        statusChangeCallback(4, _all2.default.status.UPLOADING, _all2.default.status.UPLOAD_SUCCESSFUL);
        totalProgressElContainer = _reactAddonsTestUtils2.default.findRenderedDOMComponentWithClass(ProgressBarComponent, 'react-fine-uploader-total-progress-bar-container');
        expect(totalProgressElContainer.hasAttribute('hidden')).toBeTruthy();
    });

    it('hides file progress bar after upload is complete, by default', function () {
        var uploader = new _fineUploaderWrappers2.default({ options: {} });

        var statusChangeCallback = void 0;
        spyOn(uploader, 'on').and.callFake(function (type, callback) {
            if (type === 'statusChange') {
                statusChangeCallback = callback;
            }
        });

        var ProgressBarComponent = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(_progressBar2.default, { id: 3, uploader: uploader }));

        // uploading
        statusChangeCallback(3, _all2.default.status.QUEUED, _all2.default.status.UPLOADING);
        var fileProgressElContainer = _reactAddonsTestUtils2.default.findRenderedDOMComponentWithClass(ProgressBarComponent, 'react-fine-uploader-file-progress-bar-container');
        expect(fileProgressElContainer.hasAttribute('hidden')).toBeFalsy();

        // done uploading
        statusChangeCallback(3, _all2.default.status.UPLOADING, _all2.default.status.UPLOAD_SUCCESSFUL);
        fileProgressElContainer = _reactAddonsTestUtils2.default.findRenderedDOMComponentWithClass(ProgressBarComponent, 'react-fine-uploader-file-progress-bar-container');
        expect(fileProgressElContainer.hasAttribute('hidden')).toBeTruthy();
    });
});