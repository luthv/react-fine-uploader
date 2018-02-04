'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsTestUtils = require('react-addons-test-utils');

var _reactAddonsTestUtils2 = _interopRequireDefault(_reactAddonsTestUtils);

var _fineUploaderWrappers = require('fine-uploader-wrappers');

var _fineUploaderWrappers2 = _interopRequireDefault(_fineUploaderWrappers);

var _pauseResumeButton = require('src/pause-resume-button');

var _pauseResumeButton2 = _interopRequireDefault(_pauseResumeButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('<PauseResumeButton />', function () {
    var resumeCallback = void 0,
        statusChangeCallback = void 0,
        uploadChunkSuccessCallback = void 0,
        uploader = void 0;

    beforeEach(function () {
        uploader = new _fineUploaderWrappers2.default({ options: {} });

        spyOn(uploader, 'on').and.callFake(function (type, callback) {
            if (type === 'statusChange') {
                statusChangeCallback = callback;
            } else if (type === 'uploadChunkSuccess') {
                uploadChunkSuccessCallback = callback;
            } else if (type === 'resume') {
                resumeCallback = callback;
            }
        });
    });

    it('by default renders a disabled pause button until the first chunk has been uploaded', function () {
        var PauseResumeButtonComponent = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(_pauseResumeButton2.default, { id: 0, uploader: uploader }));

        var button = _reactAddonsTestUtils2.default.scryRenderedDOMComponentsWithClass(PauseResumeButtonComponent, 'react-fine-uploader-pause-button')[0];
        expect(button).toBeFalsy();

        uploadChunkSuccessCallback(0, { partIndex: 3 });
        button = _reactAddonsTestUtils2.default.scryRenderedDOMComponentsWithClass(PauseResumeButtonComponent, 'react-fine-uploader-pause-button')[0];
        expect(button).toBeTruthy();
    });

    it('by default disables the pause button again when the upload is no longer actionable', function () {
        var PauseResumeButtonComponent = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(_pauseResumeButton2.default, { id: 0, uploader: uploader }));

        uploadChunkSuccessCallback(0, { partIndex: 1 });
        statusChangeCallback(0, null, 'deleted');
        var button = _reactAddonsTestUtils2.default.scryRenderedDOMComponentsWithClass(PauseResumeButtonComponent, 'react-fine-uploader-pause-button')[0];
        expect(button).toBeFalsy();
    });

    it('allows a paused upload to be resumed and then paused again', function () {
        var PauseResumeButtonComponent = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(_pauseResumeButton2.default, { id: 0, uploader: uploader }));

        uploadChunkSuccessCallback(0, { partIndex: 7 });

        statusChangeCallback(0, null, 'paused');
        var button = _reactAddonsTestUtils2.default.scryRenderedDOMComponentsWithClass(PauseResumeButtonComponent, 'react-fine-uploader-resume-button')[0];
        expect(button).toBeTruthy();

        var resumeUploadMethod = spyOn(uploader.methods, 'continueUpload');
        _reactAddonsTestUtils2.default.Simulate.click(button);
        expect(resumeUploadMethod).toHaveBeenCalledWith(0);

        statusChangeCallback(0, null, 'uploading');
        button = _reactAddonsTestUtils2.default.scryRenderedDOMComponentsWithClass(PauseResumeButtonComponent, 'react-fine-uploader-pause-resume-button')[0];
        expect(button).toBeTruthy();
        expect(button.className.indexOf('react-fine-uploader-pause-button')).not.toBe(-1);
        expect(button.className.indexOf('react-fine-uploader-resume-button')).toBe(-1);

        var pauseUploadMethod = spyOn(uploader.methods, 'pauseUpload');
        _reactAddonsTestUtils2.default.Simulate.click(button);
        expect(pauseUploadMethod).toHaveBeenCalledWith(0);
        statusChangeCallback(0, null, 'paused');
        button = _reactAddonsTestUtils2.default.scryRenderedDOMComponentsWithClass(PauseResumeButtonComponent, 'react-fine-uploader-pause-resume-button')[0];
        expect(button).toBeTruthy();
        expect(button.className.indexOf('react-fine-uploader-pause-button')).toBe(-1);
        expect(button.className.indexOf('react-fine-uploader-resume-button')).not.toBe(-1);
    });

    it('allows a resumed file to be paused immediately', function () {
        var PauseResumeButtonComponent = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(_pauseResumeButton2.default, { id: 0, uploader: uploader }));

        resumeCallback(0, { partIndex: 3 });

        var button = _reactAddonsTestUtils2.default.scryRenderedDOMComponentsWithClass(PauseResumeButtonComponent, 'react-fine-uploader-pause-button')[0];
        expect(button).toBeTruthy();
        expect(button.className.indexOf('react-fine-uploader-pause-button')).not.toBe(-1);
        expect(button.className.indexOf('react-fine-uploader-resume-button')).toBe(-1);
    });
});