'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsTestUtils = require('react-addons-test-utils');

var _reactAddonsTestUtils2 = _interopRequireDefault(_reactAddonsTestUtils);

var _dropzone = require('src/dropzone');

var _dropzone2 = _interopRequireDefault(_dropzone);

var _fileInput = require('src/file-input');

var _fileInput2 = _interopRequireDefault(_fileInput);

var _fineUploaderWrappers = require('fine-uploader-wrappers');

var _fineUploaderWrappers2 = _interopRequireDefault(_fineUploaderWrappers);

var _gallery = require('src/gallery');

var _gallery2 = _interopRequireDefault(_gallery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isMobile = !!('ontouchstart' in window);
var sampleBlob = new Blob(['hi!'], { type: 'text/plain' });
var sampleBlobWrapper = { blob: sampleBlob, name: 'test' };
var sampleCannedFile = { name: 'test', uuid: 'test uuid', thumbnailUrl: 'http://localhost/images/test.jpg' };

describe('<Gallery />', function () {
    var uploader = void 0;

    beforeEach(function () {
        uploader = new _fineUploaderWrappers2.default({
            options: {
                autoUpload: false
            }
        });
    });

    if (!isMobile) {
        it('renders a <Dropzone /> by default', function () {
            var GalleryComponent = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(_gallery2.default, { uploader: uploader }));
            var DropzoneComponent = _reactAddonsTestUtils2.default.scryRenderedComponentsWithType(GalleryComponent, _dropzone2.default)[0];

            expect(DropzoneComponent).toBeTruthy();
        });
    }

    it('does not render a <Dropzone /> if disabled via dropzone-disabled', function () {
        var GalleryComponent = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(_gallery2.default, { 'dropzone-disabled': true,
            uploader: uploader
        }));
        var DropzoneComponent = _reactAddonsTestUtils2.default.scryRenderedComponentsWithType(GalleryComponent, _dropzone2.default)[0];

        expect(DropzoneComponent).toBeFalsy();
    });

    it('renders children inside <MaybeDropzone />', function () {
        var GalleryComponent = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(
            _gallery2.default,
            { uploader: uploader },
            _react2.default.createElement(
                'span',
                { className: 'gallery-child' },
                'test 123'
            )
        ));
        var maybeDropzoneChild = _reactAddonsTestUtils2.default.scryRenderedDOMComponentsWithClass(GalleryComponent, 'gallery-child')[0];

        expect(maybeDropzoneChild).toBeTruthy();
        expect(maybeDropzoneChild.textContent).toBe('test 123');
    });

    it('renders a <FileInput /> by default', function () {
        var GalleryComponent = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(_gallery2.default, { uploader: uploader }));
        var FileInputComponent = _reactAddonsTestUtils2.default.scryRenderedComponentsWithType(GalleryComponent, _fileInput2.default)[0];

        expect(FileInputComponent).toBeTruthy();
    });

    it('does not render a <FileInput /> if disabled via fileInput-disabled', function () {
        var GalleryComponent = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(_gallery2.default, { 'fileInput-disabled': true,
            uploader: uploader
        }));
        var FileInputComponent = _reactAddonsTestUtils2.default.scryRenderedComponentsWithType(GalleryComponent, _fileInput2.default)[0];

        expect(FileInputComponent).toBeFalsy();
    });

    it('renders a tile for each submitted file', function (done) {
        var GalleryComponent = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(_gallery2.default, { uploader: uploader }));

        uploader.methods.addFiles([sampleBlobWrapper, sampleBlobWrapper]);

        setTimeout(function () {
            var tiles = _reactAddonsTestUtils2.default.scryRenderedDOMComponentsWithClass(GalleryComponent, 'react-fine-uploader-gallery-file');

            expect(tiles.length).toBe(2);
            done();
        }, 100);
    });

    it('removes a tile when cancel is clicked', function (done) {
        var GalleryComponent = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(_gallery2.default, { animationsDisabled: true,
            uploader: uploader
        }));

        uploader.methods.addFiles([sampleBlobWrapper, sampleBlobWrapper]);

        setTimeout(function () {
            var cancelButtons = _reactAddonsTestUtils2.default.scryRenderedDOMComponentsWithClass(GalleryComponent, 'react-fine-uploader-gallery-cancel-button');

            _reactAddonsTestUtils2.default.Simulate.click(cancelButtons[1]);

            setTimeout(function () {
                var tiles = _reactAddonsTestUtils2.default.scryRenderedDOMComponentsWithClass(GalleryComponent, 'react-fine-uploader-gallery-file');

                expect(tiles.length).toBe(1);
                done();
            }, 100);
        }, 100);
    });

    it('renders a tile for each initial file', function (done) {
        var GalleryComponent = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(_gallery2.default, { uploader: uploader }));

        uploader.methods.addInitialFiles([sampleCannedFile]);

        setTimeout(function () {
            var tiles = _reactAddonsTestUtils2.default.scryRenderedDOMComponentsWithClass(GalleryComponent, 'react-fine-uploader-gallery-file');

            expect(tiles.length).toBe(1);
            done();
        }, 100);
    });
});