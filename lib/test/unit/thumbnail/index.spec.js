'use strict';

var _all = require('fine-uploader/lib/core/all');

var _all2 = _interopRequireDefault(_all);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsTestUtils = require('react-addons-test-utils');

var _reactAddonsTestUtils2 = _interopRequireDefault(_reactAddonsTestUtils);

var _thumbnail = require('src/thumbnail');

var _thumbnail2 = _interopRequireDefault(_thumbnail);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('<Thumbnail />', function () {
    var drawThumbnail = void 0,
        qqPromise = void 0,
        uploader = void 0;

    beforeEach(function () {
        drawThumbnail = jasmine.createSpy('drawThumbnail');

        qqPromise = new _all2.default.Promise();

        uploader = {
            methods: { drawThumbnail: drawThumbnail }
        };
    });

    it('renders thumbnail as canvas using default values', function () {
        qqPromise.success();
        drawThumbnail.and.returnValue(qqPromise);

        var ThumbnailComponent = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(_thumbnail2.default, { id: 3, uploader: uploader }));

        expect(ThumbnailComponent._canvas.hasAttribute('hidden')).toBeFalsy();
        expect(drawThumbnail).toHaveBeenCalledWith(3, ThumbnailComponent._canvas, _thumbnail.defaultMaxSize, undefined, undefined);
    });

    it('renders thumbnail as canvas using passed size', function () {
        qqPromise.success();
        drawThumbnail.and.returnValue(qqPromise);

        var ThumbnailComponent = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(_thumbnail2.default, { id: 3, maxSize: 333, uploader: uploader }));

        expect(ThumbnailComponent._canvas.hasAttribute('hidden')).toBeFalsy();
        expect(drawThumbnail).toHaveBeenCalledWith(3, ThumbnailComponent._canvas, 333, undefined, undefined);
    });

    it('renders thumbnail as canvas using passed thumbnail origin', function () {
        qqPromise.success();
        drawThumbnail.and.returnValue(qqPromise);

        var ThumbnailComponent = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(_thumbnail2.default, { id: 3, maxSize: 333, uploader: uploader, fromServer: true }));

        expect(ThumbnailComponent._canvas.hasAttribute('hidden')).toBeFalsy();
        expect(drawThumbnail).toHaveBeenCalledWith(3, ThumbnailComponent._canvas, 333, true, undefined);
    });

    it('renders default waiting placeholder until thumbnail generation is complete', function () {
        drawThumbnail.and.returnValue(qqPromise);

        var ThumbnailComponent = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(_thumbnail2.default, { id: 3, uploader: uploader }));
        var placeholderEls = _reactAddonsTestUtils2.default.scryRenderedDOMComponentsWithClass(ThumbnailComponent, 'react-fine-uploader-thumbnail-' + _thumbnail.waitingStatus);

        expect(ThumbnailComponent._canvas.hasAttribute('hidden')).toBeTruthy();
        expect(placeholderEls.length).toBe(1);
    });

    it('renders custom waiting placeholder, if provided, until thumbnail generation is complete', function () {
        var customWaitingSvg = _react2.default.createElement(
            'svg',
            { className: 'custom-waiting-thumbnail', width: '40px', height: '40px', viewBox: '0 0 40 40', version: '1.1' },
            _react2.default.createElement('path', { opacity: '0.2', fill: '#000', d: 'M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z' }),
            _react2.default.createElement(
                'path',
                { fill: '#000', d: 'M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0C22.32,8.481,24.301,9.057,26.013,10.047z' },
                _react2.default.createElement('animateTransform', { attributeName: 'transform',
                    type: 'rotate',
                    from: '0 20 20',
                    to: '360 20 20',
                    dur: '0.5s',
                    repeatCount: 'indefinite' })
            )
        );
        drawThumbnail.and.returnValue(qqPromise);

        var ThumbnailComponent = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(_thumbnail2.default, { id: 3, uploader: uploader, waitingPlaceholder: customWaitingSvg }));
        var customWaitingThumbnailEl = _reactAddonsTestUtils2.default.findRenderedDOMComponentWithClass(ThumbnailComponent, 'custom-waiting-thumbnail');

        expect(ThumbnailComponent._canvas.hasAttribute('hidden')).toBeTruthy();
        expect(customWaitingThumbnailEl).toBeDefined();
    });

    it('renders default "not available" placeholder if thumbnail generation fails', function () {
        qqPromise.failure();
        drawThumbnail.and.returnValue(qqPromise);

        var ThumbnailComponent = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(_thumbnail2.default, { id: 3, uploader: uploader }));
        var placeholderEls = _reactAddonsTestUtils2.default.scryRenderedDOMComponentsWithClass(ThumbnailComponent, 'react-fine-uploader-thumbnail-' + _thumbnail.notAvailableStatus);

        expect(ThumbnailComponent._canvas.hasAttribute('hidden')).toBeTruthy();
        expect(placeholderEls.length).toBe(1);
    });

    it('renders custom "not available" placeholder, if provided, if thumbnail generation fails', function () {
        var customNotAvailableSvg = _react2.default.createElement(
            'svg',
            { className: 'not-available-svg', height: '300px', width: '300px', version: '1.0', viewBox: '-300 -300 600 600' },
            _react2.default.createElement('circle', { stroke: '#AAA', strokeWidth: '10', r: '280', fill: '#FFF' }),
            _react2.default.createElement(
                'text',
                { style: {
                        letterSpacing: 1,
                        textAnchor: 'middle',
                        textAlign: 'center',
                        strokeOpacity: 0.5,
                        stroke: '#000',
                        strokeWidth: 2,
                        fill: '#444',
                        fontSize: '360px',
                        fontFamily: 'Bitstream Vera Sans,Liberation Sans, Arial, sans-serif',
                        lineHeight: '125%',
                        writingMode: 'lr-tb' },
                    transform: 'scale(0.2)' },
                _react2.default.createElement(
                    'tspan',
                    { y: '-40', x: '8' },
                    'NO IMAGE'
                ),
                _react2.default.createElement(
                    'tspan',
                    { y: '400', x: '8' },
                    'AVAILABLE'
                )
            )
        );
        qqPromise.failure();
        drawThumbnail.and.returnValue(qqPromise);

        var ThumbnailComponent = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(_thumbnail2.default, { id: 3, uploader: uploader, notAvailablePlaceholder: customNotAvailableSvg }));
        var notAvailableSvgEl = _reactAddonsTestUtils2.default.findRenderedDOMComponentWithClass(ThumbnailComponent, 'not-available-svg');

        expect(ThumbnailComponent._canvas.hasAttribute('hidden')).toBeTruthy();
        expect(notAvailableSvgEl).toBeDefined();
    });
});