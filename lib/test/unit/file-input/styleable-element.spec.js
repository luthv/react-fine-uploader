'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsTestUtils = require('react-addons-test-utils');

var _reactAddonsTestUtils2 = _interopRequireDefault(_reactAddonsTestUtils);

var _utils = require('test/utils');

var _styleableElement = require('src/file-input/styleable-element');

var _styleableElement2 = _interopRequireDefault(_styleableElement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('<StylableElement />', function () {
    var WrappedStyleableElement = (0, _utils.wrapStatelessComponent)(_styleableElement2.default);

    it('renders the underlying input type="file" element', function () {
        var StyleableElementComponent = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(
            WrappedStyleableElement,
            null,
            'click me'
        ));

        expect(_reactAddonsTestUtils2.default.findRenderedDOMComponentWithTag(StyleableElementComponent, 'input')).toBeTruthy();
    });

    it('passes standard attributes to the underlying file input', function () {
        var StyleableElementComponent = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(
            WrappedStyleableElement,
            { multiple: true, name: 'test' },
            'click me'
        ));

        var fileInput = _reactAddonsTestUtils2.default.findRenderedDOMComponentWithTag(StyleableElementComponent, 'input');
        expect(fileInput.hasAttribute('multiple')).toBeTruthy();
        expect(fileInput.getAttribute('name')).toBe('test');
    });
});