'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsTestUtils = require('react-addons-test-utils');

var _reactAddonsTestUtils2 = _interopRequireDefault(_reactAddonsTestUtils);

var _fineUploaderWrappers = require('fine-uploader-wrappers');

var _fineUploaderWrappers2 = _interopRequireDefault(_fineUploaderWrappers);

var _filename = require('src/filename');

var _filename2 = _interopRequireDefault(_filename);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sampleBlob = new Blob(['hi!'], { type: 'text/plain' });
var sampleBlobWrapper = { blob: sampleBlob, name: 'test' };

describe('<Filename />', function () {
    it('renders initial filename', function () {
        var uploader = new _fineUploaderWrappers2.default({
            options: {
                autoUpload: false
            }
        });

        uploader.methods.addFiles(sampleBlobWrapper);

        var FilenameComponent = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(_filename2.default, { id: 0, uploader: uploader }));
        var filenameEl = _reactAddonsTestUtils2.default.findRenderedDOMComponentWithClass(FilenameComponent, 'react-fine-uploader-filename');

        expect(filenameEl.textContent).toBe('test');
    });

    it('updates filename on setName', function () {
        var uploader = new _fineUploaderWrappers2.default({
            options: {
                autoUpload: false
            }
        });

        uploader.methods.addFiles(sampleBlobWrapper);

        var FilenameComponent = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(_filename2.default, { id: 0, uploader: uploader }));

        uploader.methods.setName(0, 'new-name');
        var filenameEl = _reactAddonsTestUtils2.default.findRenderedDOMComponentWithClass(FilenameComponent, 'react-fine-uploader-filename');
        expect(filenameEl.textContent).toBe('new-name');
    });
});