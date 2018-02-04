'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsTestUtils = require('react-addons-test-utils');

var _reactAddonsTestUtils2 = _interopRequireDefault(_reactAddonsTestUtils);

var _fineUploaderWrappers = require('fine-uploader-wrappers');

var _fineUploaderWrappers2 = _interopRequireDefault(_fineUploaderWrappers);

var _cancelButton = require('src/cancel-button');

var _cancelButton2 = _interopRequireDefault(_cancelButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sampleBlob = new Blob(['hi!'], { type: 'text/plain' });

describe('<CancelButton />', function () {
    var button = void 0,
        CancelButtonComponent = void 0,
        uploader = void 0;

    beforeEach(function (done) {
        uploader = new _fineUploaderWrappers2.default({ options: { autoUpload: false } });

        uploader.on('submitted', done);

        uploader.methods.addFiles(sampleBlob);

        CancelButtonComponent = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(_cancelButton2.default, { id: 0, uploader: uploader }));

        button = _reactAddonsTestUtils2.default.findRenderedDOMComponentWithClass(CancelButtonComponent, 'react-fine-uploader-cancel-button');
    });

    it('renders the button for a submitted file w/ default content', function () {
        expect(button.disabled).toBeFalsy();
        expect(button.textContent).toBe('Cancel');
    });

    it('renders the button for a submitted file w/ custom content', function () {
        var CancelButtonComponent = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(
            _cancelButton2.default,
            { id: 0, uploader: uploader },
            'foo'
        ));

        button = _reactAddonsTestUtils2.default.findRenderedDOMComponentWithClass(CancelButtonComponent, 'react-fine-uploader-cancel-button');
        expect(button.textContent).toBe('foo');
    });

    it('allows custom attributes to be attached to the button', function () {
        var CancelButtonComponent = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(_cancelButton2.default, { id: 0, uploader: uploader, 'data-foo': 'bar' }));

        button = _reactAddonsTestUtils2.default.findRenderedDOMComponentWithClass(CancelButtonComponent, 'react-fine-uploader-cancel-button');
        expect(button.getAttribute('data-foo')).toBe('bar');
    });

    it('cancels the upload if clicked', function (done) {
        uploader.on('statusChange', function (id, oldStatus, newStatus) {
            if (id === 0 && newStatus === 'canceled') {
                expect(uploader.methods.getUploads()[0].status).toBe('canceled');
                done();
            }
        });

        _reactAddonsTestUtils2.default.Simulate.click(button);
    });

    it('removes the button by default if the file can no longer be canceled', function (done) {
        uploader.on('statusChange', function (id, oldStatus, newStatus) {
            if (id === 0 && newStatus === 'canceled') {
                var buttons = _reactAddonsTestUtils2.default.scryRenderedDOMComponentsWithClass(CancelButtonComponent, 'react-fine-uploader-cancel-button');
                expect(buttons.length).toBe(0);
                done();
            }
        });

        uploader.methods.cancel(0);
    });

    it('disables the button if requested when the file can no longer be canceled', function (done) {
        uploader.on('statusChange', function (id, oldStatus, newStatus) {
            if (id === 0 && newStatus === 'canceled') {
                setTimeout(function () {
                    var buttons = _reactAddonsTestUtils2.default.scryRenderedDOMComponentsWithClass(CancelButtonComponent, 'react-fine-uploader-cancel-button');
                    expect(buttons.length).toBe(1);
                    expect(buttons[0].disabled).toBe(true);
                    done();
                });
            }
        });

        CancelButtonComponent = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(_cancelButton2.default, { id: 0, onlyRenderIfCancelable: false, uploader: uploader }));

        uploader.methods.cancel(0);
    });
});