'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsTestUtils = require('react-addons-test-utils');

var _reactAddonsTestUtils2 = _interopRequireDefault(_reactAddonsTestUtils);

var _fineUploaderWrappers = require('fine-uploader-wrappers');

var _fineUploaderWrappers2 = _interopRequireDefault(_fineUploaderWrappers);

var _filesize = require('src/filesize');

var _filesize2 = _interopRequireDefault(_filesize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sampleBlob = new Blob(['hi!'], { type: 'text/plain' });
var sampleBlobWrapper = { blob: sampleBlob, name: 'test' };

describe('<Filesize />', function () {
    var nativeObjectToString = Object.prototype.toString;

    beforeEach(function () {
        Object.prototype.toString = function () {
            if (this && this.type === 'fakeBlob') {
                return '[object Blob]';
            }

            return nativeObjectToString.apply(this, arguments);
        };
    });

    afterEach(function () {
        Object.prototype.toString = nativeObjectToString;
    });

    it('renders file size for tiny file using default units/text', function () {
        var uploader = new _fineUploaderWrappers2.default({
            options: {
                autoUpload: false
            }
        });

        uploader.methods.addFiles(sampleBlobWrapper);

        var FilesizeComponent = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(_filesize2.default, { id: 0, uploader: uploader }));
        var filesizeEl = _reactAddonsTestUtils2.default.findRenderedDOMComponentWithClass(FilesizeComponent, 'react-fine-uploader-filesize');

        expect(filesizeEl.textContent).toBe(sampleBlob.size + ' B');
    });

    it('renders an empty filesize component if size is not known initially', function () {
        var uploader = new _fineUploaderWrappers2.default({
            options: {
                autoUpload: false
            }
        });

        uploader.methods.addFiles({ type: 'fakeBlob' });

        var FilesizeComponent = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(_filesize2.default, { id: 0, uploader: uploader }));
        var filesizeEl = _reactAddonsTestUtils2.default.findRenderedDOMComponentWithClass(FilesizeComponent, 'react-fine-uploader-filesize');

        expect(filesizeEl.textContent).toBe('');
    });

    it('renders file size for various sized files using default units/text', function () {
        var uploader = new _fineUploaderWrappers2.default({
            options: {
                autoUpload: false
            }
        });

        uploader.methods.addFiles([{ size: 1100, type: 'fakeBlob' }, { size: 1100000, type: 'fakeBlob' }, { size: 1100000000, type: 'fakeBlob' }, { size: 1100000000000, type: 'fakeBlob' }]);

        var expectedSizes = ['1.10 KB', '1.10 MB', '1.10 GB', '1.10 TB'];

        expectedSizes.forEach(function (expectedSize, id) {
            var FilesizeComponent = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(_filesize2.default, { id: id, uploader: uploader }));
            var filesizeEl = _reactAddonsTestUtils2.default.findRenderedDOMComponentWithClass(FilesizeComponent, 'react-fine-uploader-filesize');

            expect(filesizeEl.textContent).toBe(expectedSize);
        });
    });

    it('renders file size for various sized files using custom units/text', function () {
        var uploader = new _fineUploaderWrappers2.default({
            options: {
                autoUpload: false
            }
        });

        var customUnits = {
            byte: 'bytes',
            kilobyte: 'kilobytes',
            megabyte: 'megabytes',
            gigabyte: 'gigabytes',
            terabyte: 'terabytes'
        };

        uploader.methods.addFiles([{ size: 1100, type: 'fakeBlob' }, { size: 1100000, type: 'fakeBlob' }, { size: 1100000000, type: 'fakeBlob' }, { size: 1100000000000, type: 'fakeBlob' }]);

        var expectedSizes = ['1.10 kilobytes', '1.10 megabytes', '1.10 gigabytes', '1.10 terabytes'];

        expectedSizes.forEach(function (expectedSize, id) {
            var FilesizeComponent = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(_filesize2.default, { id: id, uploader: uploader, units: customUnits }));
            var filesizeEl = _reactAddonsTestUtils2.default.findRenderedDOMComponentWithClass(FilesizeComponent, 'react-fine-uploader-filesize');

            expect(filesizeEl.textContent).toBe(expectedSize);
        });
    });

    it('renders file size at upload time for scaled blobs', function () {
        var uploader = new _fineUploaderWrappers2.default({
            options: {
                autoUpload: false,
                scaling: {
                    sizes: [{ name: 'test', maxSize: 100 }]
                }
            }
        });

        var onUploadCallback = void 0;
        spyOn(uploader, 'on').and.callFake(function (type, callback) {
            if (type === 'upload') {
                onUploadCallback = callback;
            }
        });

        var fakeBlob = { type: 'fakeBlob' };
        uploader.methods.addFiles(fakeBlob);

        var FilesizeComponent = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(_filesize2.default, { id: 0, uploader: uploader }));
        var filesizeEl = _reactAddonsTestUtils2.default.findRenderedDOMComponentWithClass(FilesizeComponent, 'react-fine-uploader-filesize');

        expect(filesizeEl.textContent).toBe('');

        spyOn(uploader.methods, 'getSize').and.returnValue(1);
        onUploadCallback(0);

        expect(uploader.methods.getSize).toHaveBeenCalledWith(0);
        expect(filesizeEl.textContent).toBe('1 B');
    });
});