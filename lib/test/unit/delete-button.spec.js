'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsTestUtils = require('react-addons-test-utils');

var _reactAddonsTestUtils2 = _interopRequireDefault(_reactAddonsTestUtils);

var _deleteButton = require('src/delete-button');

var _deleteButton2 = _interopRequireDefault(_deleteButton);

var _fineUploaderWrappers = require('fine-uploader-wrappers');

var _fineUploaderWrappers2 = _interopRequireDefault(_fineUploaderWrappers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('<DeleteButton />', function () {
    var getButton = function getButton(Component) {
        return _reactAddonsTestUtils2.default.scryRenderedDOMComponentsWithClass(Component, 'react-fine-uploader-delete-button')[0];
    };
    var uploader = void 0,
        statusChangeCallback = void 0;

    beforeEach(function () {
        uploader = new _fineUploaderWrappers2.default({ options: {} });

        spyOn(uploader, 'on').and.callFake(function (type, callback) {
            if (type === 'statusChange') {
                statusChangeCallback = callback;
            }
        });
    });

    it('renders the button for a successfully uploaded file w/ default content', function () {
        var DeleteButtonComponent = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(_deleteButton2.default, { id: 0, uploader: uploader }));

        statusChangeCallback(0, null, 'upload successful');

        var button = getButton(DeleteButtonComponent);
        expect(button.disabled).toBeFalsy();
        expect(button.textContent).toBe('Delete');
    });

    it('renders the button for a successfully uploaded file w/ custom content', function () {
        var DeleteButtonComponent = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(
            _deleteButton2.default,
            { id: 0, uploader: uploader },
            'Delete me'
        ));

        statusChangeCallback(0, null, 'upload successful');

        var button = getButton(DeleteButtonComponent);
        expect(button.disabled).toBeFalsy();
        expect(button.textContent).toBe('Delete me');
    });

    it('allows custom attributes to be attached to the button', function () {
        var DeleteButtonComponent = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(_deleteButton2.default, { 'data-foo': 'bar', id: 0, uploader: uploader }));

        statusChangeCallback(0, null, 'upload successful');

        var button = getButton(DeleteButtonComponent);
        expect(button.getAttribute('data-foo')).toBe('bar');
    });

    it('deletes the file if clicked', function () {
        var deleteFileMethod = spyOn(uploader.methods, 'deleteFile');
        var DeleteButtonComponent = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(_deleteButton2.default, { 'data-foo': 'bar', id: 0, uploader: uploader }));

        statusChangeCallback(0, null, 'upload successful');

        var button = getButton(DeleteButtonComponent);
        _reactAddonsTestUtils2.default.Simulate.click(button);
        expect(deleteFileMethod).toHaveBeenCalled();
    });

    it('removes the button by default if the file can no longer be deleted', function () {
        var DeleteButtonComponent = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(_deleteButton2.default, { 'data-foo': 'bar', id: 0, uploader: uploader }));

        statusChangeCallback(0, null, 'deleted');

        var button = getButton(DeleteButtonComponent);
        expect(button).toBeFalsy();
    });

    it('disabled the button while the delete is in progress', function () {
        var DeleteButtonComponent = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(_deleteButton2.default, { 'data-foo': 'bar', id: 0, uploader: uploader }));

        statusChangeCallback(0, null, 'deleting');

        var button = getButton(DeleteButtonComponent);
        expect(button.disabled).toBe(true);
    });

    it('disables the button if requested when the file can no longer be deleted', function () {
        var DeleteButtonComponent = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(_deleteButton2.default, { 'data-foo': 'bar', id: 0, onlyRenderIfDeletable: false, uploader: uploader }));

        statusChangeCallback(0, null, 'deleted');

        var button = getButton(DeleteButtonComponent);
        expect(button).toBeTruthy();
        expect(button.disabled).toBe(true);
    });
});