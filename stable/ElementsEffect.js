"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @author Milan Turyna
 * @link https://github.com/MilanTuryna
 * Just a few effects for HTML elements without any JS library (jquery, etc.)
 */
var ElementsEffects;
(function (ElementsEffects) {
    var Effect = /** @class */ (function () {
        /**
         * @param elements
         * @param callback
         */
        function Effect(elements, callback) {
            this.elements = __spreadArrays(elements);
            this.callback = callback;
        }
        Effect.prototype.getElements = function () {
            return this.elements;
        };
        return Effect;
    }());
    ElementsEffects.Effect = Effect;
    var TypeWriterEffect = /** @class */ (function (_super) {
        __extends(TypeWriterEffect, _super);
        function TypeWriterEffect() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TypeWriterEffect.prototype.start = function () {
            var _this = this;
            this.elements.forEach(function (element) {
                var splitText = element.innerText.split('');
                var intervalTimeout = Number(element.dataset["typeWriter-timeout"]) || 50;
                var counter = 0;
                var interval;
                element.innerHTML = '';
                interval = setInterval(function () {
                    if (counter === splitText.length) {
                        clearInterval(interval);
                        _this.callback(element);
                        return;
                    }
                    element.innerHTML += splitText[counter];
                    counter++;
                }, intervalTimeout);
            });
            return this;
        };
        return TypeWriterEffect;
    }(Effect));
    ElementsEffects.TypeWriterEffect = TypeWriterEffect;
    var CounterEffect = /** @class */ (function (_super) {
        __extends(CounterEffect, _super);
        /**
         * @param elements
         * @param callback
         * @param counterGoal
         * @param startFrom
         * @param numberChar
         */
        function CounterEffect(elements, callback, counterGoal, startFrom, numberChar) {
            if (counterGoal === void 0) { counterGoal = 100; }
            if (startFrom === void 0) { startFrom = 0; }
            if (numberChar === void 0) { numberChar = "%"; }
            var _this = _super.call(this, elements, callback) || this;
            _this.counterGoal = counterGoal;
            _this.startFrom = startFrom;
            _this.numberChar = numberChar;
            return _this;
        }
        CounterEffect.prototype.start = function () {
            var _this = this;
            this.elements.forEach(function (element) {
                var counter = Number(element.dataset["counterEffect-startFrom"]) || 0;
                var counterGoal = Number(element.dataset["counterEffect-goal"]) || 100;
                var intervalTimeout = Number(element.dataset["hundredPercents-timeout"]) || 50;
                var interval = setInterval(function () {
                    if (counter === counterGoal) {
                        clearInterval(interval);
                        _this.callback(element);
                        return;
                    }
                    counter++;
                    element.innerHTML = counter + _this.numberChar;
                }, intervalTimeout);
            });
            return this;
        };
        CounterEffect.prototype.getCounterGoal = function () {
            return this.counterGoal;
        };
        CounterEffect.prototype.getNumberChar = function () {
            return this.numberChar;
        };
        return CounterEffect;
    }(Effect));
    ElementsEffects.CounterEffect = CounterEffect;
})(ElementsEffects = exports.ElementsEffects || (exports.ElementsEffects = {}));