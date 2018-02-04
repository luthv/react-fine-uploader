'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsTestUtils = require('react-addons-test-utils');

var _reactAddonsTestUtils2 = _interopRequireDefault(_reactAddonsTestUtils);

var _fileInput = require('src/file-input');

var _fileInput2 = _interopRequireDefault(_fileInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DummyStylableElement = function (_React$Component) {
    _inherits(DummyStylableElement, _React$Component);

    function DummyStylableElement() {
        _classCallCheck(this, DummyStylableElement);

        return _possibleConstructorReturn(this, (DummyStylableElement.__proto__ || Object.getPrototypeOf(DummyStylableElement)).apply(this, arguments));
    }

    _createClass(DummyStylableElement, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement('div', { className: 'file-input',
                onChange: this.props.onChange
            });
        }
    }]);

    return DummyStylableElement;
}(_react2.default.Component);

describe('<FileInput />', function () {
    beforeEach(function () {
        _fileInput2.default.__Rewire__('StyleableElement', DummyStylableElement);
    });

    afterEach(function () {
        _fileInput2.default.__ResetDependency__('StyleableInput');
    });

    it('adds files to Fine Uploader when files are selected', function () {
        var addFiles = jasmine.createSpy('addFiles');
        var uploader = {
            methods: { addFiles: addFiles }
        };
        var FileInputComponent = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(
            _fileInput2.default,
            { uploader: uploader },
            'click me'
        ));
        var fileInputElement = _reactAddonsTestUtils2.default.findRenderedDOMComponentWithClass(FileInputComponent, 'file-input');

        _reactAddonsTestUtils2.default.Simulate.change(fileInputElement);
        expect(addFiles).toHaveBeenCalled();
    });
});