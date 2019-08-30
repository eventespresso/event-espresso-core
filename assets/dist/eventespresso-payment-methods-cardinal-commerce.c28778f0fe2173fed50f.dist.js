/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/src/payment-methods/cardinal-commerce/index.js":
/*!***************************************************************!*\
  !*** ./assets/src/payment-methods/cardinal-commerce/index.js ***!
  \***************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/typeof.js");
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @eventespresso/eejs */ "@eventespresso/eejs");
/* harmony import */ var _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_eejs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_2__);



/**
 * @var ee_paypal_smart_button_args array of localized variables
 */

var eeCardinalCruise = null;
jquery__WEBPACK_IMPORTED_MODULE_2___default()(document).ready(function () {
  //add SPCO object
  var eeCardinalCommerceData = _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_1__["data"].cardinalCommerce;
  eeCardinalCommerceData.data.spco = window.SPCO || null;
  eeCardinalCommerceData.data.cardinal = window.Cardinal || null; //create the smart buttons object

  eeCardinalCruise = new EeCardinalCruise(eeCardinalCommerceData.data, eeCardinalCommerceData.translations); //and set it up to listen for its cue to get initialized

  eeCardinalCruise.setInitListeners();
});
/**
 *
 * @param {Object} instanceVars {
 * }
 * @param {Object} translations {
 * 	no_SPCO_error: string
 * 	no_paypal_js: string
 * }
 * @constructor
 */

function EeCardinalCruise(instanceVars, translations) {
  this.spco = instanceVars.spco;
  this.cardinal = instanceVars.cardinal;
  this.jwt = instanceVars.jwt;
  this.slug = instanceVars.slug;
  this.translations = translations;
  /**
   * Sets listeners that will trigger initializing the smart buttons.
   */

  this.setInitListeners = function () {
    this.setListenerForPaymentMethodSelector();
    this.setListenerForDisplaySpco();
    this.setListenerForPaymentAmountChange(); //also, if the page was reloaded on the payment option step, we should initialize immediately

    if (this.billingFormLoaded()) {
      this.initialize();
    }
  };
  /**
   * When SPCO displays a step, if its the payment options step, and our billing
   * form is present, initialize the smart buttons
   *
   */


  this.setListenerForDisplaySpco = function () {
    var _this = this;

    this.spco.main_container.on('spco_display_step', function (event, stepToShow) {
      if (typeof stepToShow !== 'undefined' && stepToShow === 'payment_options' && _this.billingFormLoaded()) {
        _this.initialize();
      }
    });
  };
  /**
   * When they switch payment methods, if the payment method is this one,
   * initialize the smart button (or if it's already initialized, just show it again).
   * If they selected a different payment method, hide the smart buttons
   */


  this.setListenerForPaymentMethodSelector = function () {
    var _this2 = this;

    this.spco.main_container.on('spco_switch_payment_methods', function (event, paymentMethod) {
      if (typeof paymentMethod !== 'undefined' && paymentMethod === _this2.slug) {
        _this2.initialize();
      } else if (_this2.initialized) {//and if this was previously initialized, make sure we hide the button
      }
    });
  };
  /**
   * Returns true if this payment method's billing form exists on the page
   * @return {boolean} whether it was successffully loaded or not.
   */


  this.billingFormLoaded = function () {
    return jquery__WEBPACK_IMPORTED_MODULE_2___default()('#paypal-pro-billing-form-credit-card').length > 0;
  };
  /**
   * Initializes jQuery selected objects so we don't need to query for anything afterwards
   */


  this.initializeObjects = function () {
    // Only initialize objects once. It's not removed when switching payment methods, and PayPal's JS
    // malfunctions if this gets reset.
    if (!this.initialized) {}
  };
  /**
   * Shows the smart buttons (this may require initializing them) and otherwise initializes this object
   */


  this.initialize = function () {
    var _this3 = this;

    if (typeof this.spco === 'undefined' || typeof this.spco.show_event_queue_ajax_msg !== 'function' || typeof this.spco.display_messages !== 'function' || !this.spco.main_container) {
      // No SPCO object, so we can't use SPCO to show a nice error message. At least put something in the console.
      warning(false, this.translations.no_SPCO_error);
      return;
    } // ensure that the Cardinal Commerce object (from https://songbird.cardinalcommerce.com/edge/v1/songbird.js) js class is loaded


    if (typeof this.cardinal === 'undefined' // @todo: make sure we have all the methods we need too...
    // typeof this.cardinal.Button !== 'object' ||
    // typeof this.paypal.Button.render !== 'function'
    ) {
        this.spco.show_event_queue_ajax_msg('error', this.translations.no_cardinal_error, this.spco.notice_fadeout_attention, true);
        return;
      } // Tell me how it goes...


    this.cardinal.configure({
      logging: {
        level: "on"
      }
    }); // Fire up Cardinal Cruise.

    this.cardinal.setup("init", {
      jwt: this.jwt
    }); // Ran when Cardinal is ready to go. See https://cardinaldocs.atlassian.net/wiki/spaces/CC/pages/557065/Songbird.js#Songbird.js-payments.setupComplete

    this.cardinal.on('payments.setupComplete', function (setupCompleteData) {
      _this3.cardinalSetupComplete = true;
    });
    this.setListenerForCardinalPaymentValidated();
    this.setListenerForPaymentSubmit(); // Always re-initialize jQuery objects. If they were payment method switching, the old billing for inputs got
    // removed from the page and we need to find them again.

    this.initializeObjects();
  };
  /**
   * Ran when Cardinal Cruise has finished validating  the mode of payment. Continue with processing the payment.
   */


  this.setListenerForCardinalPaymentValidated = function () {
    var _this4 = this;

    this.cardinal.on('payments.validated', function (data, jwt) {
      if (_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(data) !== 'object') {
        _this4.spco.show_event_queue_ajax_msg('error', _this4.translations.invalid_response_from_cardinal, _this4.spco.notice_fadeout_attention, true);

        return;
      }

      if (data.ActionCode === 'ERROR') {
        _this4.spco.show_event_queue_ajax_msg('error', data.ErrorDescription + '[' + data.ErrorNumber + ']', _this4.spco.notice_fadeout_attention, true);

        return;
      }

      _this4.saveCardinalCruiseResult(data, jwt); // Only pay attention if Cardinal is completely setup.


      if (!_this4.cardinalSetupComplete) {
        return;
      }

      _this4.getForm().find('.spco-next-step-btn').trigger('click');
    });
  };

  this.saveCardinalCruiseResult = function (data, jwt) {
    var result = JSON.stringify({
      data: data,
      jwt: jwt
    });
    alert('cardinal cruse done. REsult was ' + result);
  };
  /**
   * When the payment amount changes, just update this object's transaction_total
   */


  this.setListenerForPaymentAmountChange = function () {
    var _this5 = this;

    this.spco.main_container.on('spco_payment_amount', function (event, paymentAmount) {
      if (typeof paymentAmount !== 'undefined' && parseInt(paymentAmount) !== 0) {
        _this5.transactionTotal = paymentAmount;
      }
    });
  };

  this.setListenerForPaymentSubmit = function () {
    var _this6 = this;

    alert('setup listener for payment submit');
    this.getForm().on('submit', function (e) {
      e.preventDefault();
      var data = {
        Consumer: {
          Account: {
            AccountNumber: jquery__WEBPACK_IMPORTED_MODULE_2___default()('#paypal-pro-billing-form-credit-card').val(),
            ExpirationMonth: jquery__WEBPACK_IMPORTED_MODULE_2___default()('#paypal-pro-billing-form-exp-month').val(),
            ExpirationYear: jquery__WEBPACK_IMPORTED_MODULE_2___default()('#paypal-pro-billing-form-exp-year').val(),
            CardCode: jquery__WEBPACK_IMPORTED_MODULE_2___default()('#paypal-pro-billing-form-cvv').val()
          }
        }
      };
      alert('Cardinal sent credit card etails off I think');

      _this6.cardinal.start('cca', data, _this6.jwt);
    });
  };

  this.getForm = function () {
    return jquery__WEBPACK_IMPORTED_MODULE_2___default()('#paypal-pro-billing-form-credit-card').parents('form:first');
  };
  /**
   * Rounds a number to the specified precision.
   * See http://www.jacklmoore.com/notes/rounding-in-javascript/.
   * @param {number} value
   * @param {number} decimals
   * @return {number} The original value, to the given precision.
   */


  this.round = function (value, decimals) {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
  };
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/typeof.js":
/*!*******************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/typeof.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

function _typeof(obj) {
  if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return _typeof2(obj);
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;

/***/ }),

/***/ 0:
/*!*********************************************************************!*\
  !*** multi ./assets/src/payment-methods/cardinal-commerce/index.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./assets/src/payment-methods/cardinal-commerce/index.js */"./assets/src/payment-methods/cardinal-commerce/index.js");


/***/ }),

/***/ "@eventespresso/eejs":
/*!**********************************!*\
  !*** external {"this":["eejs"]} ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = this["eejs"]; }());

/***/ }),

/***/ "jquery":
/*!**********************************!*\
  !*** external {"this":"jQuery"} ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = this["jQuery"]; }());

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL3NyYy9wYXltZW50LW1ldGhvZHMvY2FyZGluYWwtY29tbWVyY2UvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvdHlwZW9mLmpzIiwid2VicGFjazovLy9leHRlcm5hbCB7XCJ0aGlzXCI6W1wiZWVqc1wiXX0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInRoaXNcIjpcImpRdWVyeVwifSJdLCJuYW1lcyI6WyJlZUNhcmRpbmFsQ3J1aXNlIiwialF1ZXJ5IiwiZG9jdW1lbnQiLCJyZWFkeSIsImVlQ2FyZGluYWxDb21tZXJjZURhdGEiLCJkYXRhIiwiY2FyZGluYWxDb21tZXJjZSIsInNwY28iLCJ3aW5kb3ciLCJTUENPIiwiY2FyZGluYWwiLCJDYXJkaW5hbCIsIkVlQ2FyZGluYWxDcnVpc2UiLCJ0cmFuc2xhdGlvbnMiLCJzZXRJbml0TGlzdGVuZXJzIiwiaW5zdGFuY2VWYXJzIiwiand0Iiwic2x1ZyIsInNldExpc3RlbmVyRm9yUGF5bWVudE1ldGhvZFNlbGVjdG9yIiwic2V0TGlzdGVuZXJGb3JEaXNwbGF5U3BjbyIsInNldExpc3RlbmVyRm9yUGF5bWVudEFtb3VudENoYW5nZSIsImJpbGxpbmdGb3JtTG9hZGVkIiwiaW5pdGlhbGl6ZSIsIm1haW5fY29udGFpbmVyIiwib24iLCJldmVudCIsInN0ZXBUb1Nob3ciLCJwYXltZW50TWV0aG9kIiwiaW5pdGlhbGl6ZWQiLCJsZW5ndGgiLCJpbml0aWFsaXplT2JqZWN0cyIsInNob3dfZXZlbnRfcXVldWVfYWpheF9tc2ciLCJkaXNwbGF5X21lc3NhZ2VzIiwid2FybmluZyIsIm5vX1NQQ09fZXJyb3IiLCJub19jYXJkaW5hbF9lcnJvciIsIm5vdGljZV9mYWRlb3V0X2F0dGVudGlvbiIsImNvbmZpZ3VyZSIsImxvZ2dpbmciLCJsZXZlbCIsInNldHVwIiwic2V0dXBDb21wbGV0ZURhdGEiLCJjYXJkaW5hbFNldHVwQ29tcGxldGUiLCJzZXRMaXN0ZW5lckZvckNhcmRpbmFsUGF5bWVudFZhbGlkYXRlZCIsInNldExpc3RlbmVyRm9yUGF5bWVudFN1Ym1pdCIsImludmFsaWRfcmVzcG9uc2VfZnJvbV9jYXJkaW5hbCIsIkFjdGlvbkNvZGUiLCJFcnJvckRlc2NyaXB0aW9uIiwiRXJyb3JOdW1iZXIiLCJzYXZlQ2FyZGluYWxDcnVpc2VSZXN1bHQiLCJnZXRGb3JtIiwiZmluZCIsInRyaWdnZXIiLCJyZXN1bHQiLCJKU09OIiwic3RyaW5naWZ5IiwiYWxlcnQiLCJwYXltZW50QW1vdW50IiwicGFyc2VJbnQiLCJ0cmFuc2FjdGlvblRvdGFsIiwiZSIsInByZXZlbnREZWZhdWx0IiwiQ29uc3VtZXIiLCJBY2NvdW50IiwiQWNjb3VudE51bWJlciIsInZhbCIsIkV4cGlyYXRpb25Nb250aCIsIkV4cGlyYXRpb25ZZWFyIiwiQ2FyZENvZGUiLCJzdGFydCIsInBhcmVudHMiLCJyb3VuZCIsInZhbHVlIiwiZGVjaW1hbHMiLCJOdW1iZXIiLCJNYXRoIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFDQTtBQUdBOzs7O0FBR0EsSUFBSUEsZ0JBQWdCLEdBQUcsSUFBdkI7QUFDQUMsNkNBQU0sQ0FBRUMsUUFBRixDQUFOLENBQW1CQyxLQUFuQixDQUEwQixZQUFNO0FBRS9CO0FBQ0EsTUFBTUMsc0JBQXNCLEdBQUdDLHdEQUFJLENBQUNDLGdCQUFwQztBQUNBRix3QkFBc0IsQ0FBQ0MsSUFBdkIsQ0FBNEJFLElBQTVCLEdBQW1DQyxNQUFNLENBQUNDLElBQVAsSUFBZSxJQUFsRDtBQUNBTCx3QkFBc0IsQ0FBQ0MsSUFBdkIsQ0FBNEJLLFFBQTVCLEdBQXVDRixNQUFNLENBQUNHLFFBQVAsSUFBbUIsSUFBMUQsQ0FMK0IsQ0FNL0I7O0FBQ0FYLGtCQUFnQixHQUFHLElBQUlZLGdCQUFKLENBQXNCUixzQkFBc0IsQ0FBQ0MsSUFBN0MsRUFBbURELHNCQUFzQixDQUFDUyxZQUExRSxDQUFuQixDQVArQixDQVEvQjs7QUFDQWIsa0JBQWdCLENBQUNjLGdCQUFqQjtBQUNBLENBVkQ7QUFZQTs7Ozs7Ozs7Ozs7QUFVQSxTQUFTRixnQkFBVCxDQUEwQkcsWUFBMUIsRUFBd0NGLFlBQXhDLEVBQXVEO0FBQ3RELE9BQUtOLElBQUwsR0FBWVEsWUFBWSxDQUFDUixJQUF6QjtBQUNBLE9BQUtHLFFBQUwsR0FBZ0JLLFlBQVksQ0FBQ0wsUUFBN0I7QUFDQSxPQUFLTSxHQUFMLEdBQVdELFlBQVksQ0FBQ0MsR0FBeEI7QUFDQSxPQUFLQyxJQUFMLEdBQVlGLFlBQVksQ0FBQ0UsSUFBekI7QUFDQSxPQUFLSixZQUFMLEdBQW9CQSxZQUFwQjtBQUVBOzs7O0FBR0EsT0FBS0MsZ0JBQUwsR0FBd0IsWUFBVztBQUNsQyxTQUFLSSxtQ0FBTDtBQUNBLFNBQUtDLHlCQUFMO0FBQ0EsU0FBS0MsaUNBQUwsR0FIa0MsQ0FJbEM7O0FBQ0EsUUFBSyxLQUFLQyxpQkFBTCxFQUFMLEVBQWdDO0FBQy9CLFdBQUtDLFVBQUw7QUFDQTtBQUNELEdBUkQ7QUFVQTs7Ozs7OztBQUtBLE9BQUtILHlCQUFMLEdBQWlDLFlBQVc7QUFBQTs7QUFDM0MsU0FBS1osSUFBTCxDQUFVZ0IsY0FBVixDQUF5QkMsRUFBekIsQ0FBNkIsbUJBQTdCLEVBQWtELFVBQUVDLEtBQUYsRUFBU0MsVUFBVCxFQUF5QjtBQUMxRSxVQUFLLE9BQU9BLFVBQVAsS0FBc0IsV0FBdEIsSUFDSkEsVUFBVSxLQUFLLGlCQURYLElBRUosS0FBSSxDQUFDTCxpQkFBTCxFQUZELEVBR0U7QUFDRCxhQUFJLENBQUNDLFVBQUw7QUFDQTtBQUNELEtBUEQ7QUFRQSxHQVREO0FBV0E7Ozs7Ozs7QUFLQSxPQUFLSixtQ0FBTCxHQUEyQyxZQUFXO0FBQUE7O0FBQ3JELFNBQUtYLElBQUwsQ0FBVWdCLGNBQVYsQ0FBeUJDLEVBQXpCLENBQTZCLDZCQUE3QixFQUE0RCxVQUFFQyxLQUFGLEVBQVNFLGFBQVQsRUFBNEI7QUFDdkYsVUFBSyxPQUFPQSxhQUFQLEtBQXlCLFdBQXpCLElBQXdDQSxhQUFhLEtBQUssTUFBSSxDQUFDVixJQUFwRSxFQUEyRTtBQUMxRSxjQUFJLENBQUNLLFVBQUw7QUFDQSxPQUZELE1BRU8sSUFBSyxNQUFJLENBQUNNLFdBQVYsRUFBd0IsQ0FDOUI7QUFDQTtBQUNELEtBTkQ7QUFPQSxHQVJEO0FBVUE7Ozs7OztBQUlBLE9BQUtQLGlCQUFMLEdBQXlCLFlBQVc7QUFDbkMsV0FBT3BCLDZDQUFNLENBQUUsc0NBQUYsQ0FBTixDQUFpRDRCLE1BQWpELEdBQTBELENBQWpFO0FBQ0EsR0FGRDtBQUlBOzs7OztBQUdBLE9BQUtDLGlCQUFMLEdBQXlCLFlBQVc7QUFDbkM7QUFDQTtBQUNBLFFBQUssQ0FBRSxLQUFLRixXQUFaLEVBQTBCLENBQ3pCO0FBQ0QsR0FMRDtBQU9BOzs7OztBQUdBLE9BQUtOLFVBQUwsR0FBa0IsWUFBVztBQUFBOztBQUU1QixRQUFLLE9BQU8sS0FBS2YsSUFBWixLQUFxQixXQUFyQixJQUNKLE9BQU8sS0FBS0EsSUFBTCxDQUFVd0IseUJBQWpCLEtBQStDLFVBRDNDLElBRUosT0FBTyxLQUFLeEIsSUFBTCxDQUFVeUIsZ0JBQWpCLEtBQXNDLFVBRmxDLElBR0osQ0FBRSxLQUFLekIsSUFBTCxDQUFVZ0IsY0FIYixFQUc4QjtBQUM3QjtBQUNBVSxhQUFPLENBQUUsS0FBRixFQUFTLEtBQUtwQixZQUFMLENBQWtCcUIsYUFBM0IsQ0FBUDtBQUNBO0FBQ0EsS0FUMkIsQ0FVNUI7OztBQUNBLFFBQUssT0FBTyxLQUFLeEIsUUFBWixLQUF5QixXQUE5QixDQUNDO0FBQ0E7QUFDQTtBQUhELE1BSUU7QUFDRCxhQUFLSCxJQUFMLENBQVV3Qix5QkFBVixDQUFxQyxPQUFyQyxFQUE4QyxLQUFLbEIsWUFBTCxDQUFrQnNCLGlCQUFoRSxFQUFtRixLQUFLNUIsSUFBTCxDQUFVNkIsd0JBQTdGLEVBQXVILElBQXZIO0FBQ0E7QUFDQSxPQWxCMkIsQ0FxQjVCOzs7QUFDQSxTQUFLMUIsUUFBTCxDQUFjMkIsU0FBZCxDQUF3QjtBQUN2QkMsYUFBTyxFQUFFO0FBQ1JDLGFBQUssRUFBRTtBQURDO0FBRGMsS0FBeEIsRUF0QjRCLENBNEI1Qjs7QUFDQSxTQUFLN0IsUUFBTCxDQUFjOEIsS0FBZCxDQUFvQixNQUFwQixFQUE0QjtBQUMzQnhCLFNBQUcsRUFBRSxLQUFLQTtBQURpQixLQUE1QixFQTdCNEIsQ0FpQzVCOztBQUNBLFNBQUtOLFFBQUwsQ0FBY2MsRUFBZCxDQUFpQix3QkFBakIsRUFBMkMsVUFBQ2lCLGlCQUFELEVBQXVCO0FBQ2pFLFlBQUksQ0FBQ0MscUJBQUwsR0FBNkIsSUFBN0I7QUFDQSxLQUZEO0FBSUEsU0FBS0Msc0NBQUw7QUFDQSxTQUFLQywyQkFBTCxHQXZDNEIsQ0F5QzVCO0FBQ0E7O0FBQ0EsU0FBS2QsaUJBQUw7QUFDQSxHQTVDRDtBQThDQTs7Ozs7QUFHQSxPQUFLYSxzQ0FBTCxHQUE4QyxZQUFVO0FBQUE7O0FBQ3ZELFNBQUtqQyxRQUFMLENBQWNjLEVBQWQsQ0FBaUIsb0JBQWpCLEVBQXVDLFVBQUNuQixJQUFELEVBQU9XLEdBQVAsRUFBZTtBQUNyRCxVQUFJLHFFQUFPWCxJQUFQLE1BQWlCLFFBQXJCLEVBQStCO0FBQzlCLGNBQUksQ0FBQ0UsSUFBTCxDQUFVd0IseUJBQVYsQ0FBcUMsT0FBckMsRUFBOEMsTUFBSSxDQUFDbEIsWUFBTCxDQUFrQmdDLDhCQUFoRSxFQUFnRyxNQUFJLENBQUN0QyxJQUFMLENBQVU2Qix3QkFBMUcsRUFBb0ksSUFBcEk7O0FBQ0E7QUFDQTs7QUFDRCxVQUFHL0IsSUFBSSxDQUFDeUMsVUFBTCxLQUFvQixPQUF2QixFQUErQjtBQUM5QixjQUFJLENBQUN2QyxJQUFMLENBQVV3Qix5QkFBVixDQUFxQyxPQUFyQyxFQUE4QzFCLElBQUksQ0FBQzBDLGdCQUFMLEdBQXdCLEdBQXhCLEdBQThCMUMsSUFBSSxDQUFDMkMsV0FBbkMsR0FBaUQsR0FBL0YsRUFBb0csTUFBSSxDQUFDekMsSUFBTCxDQUFVNkIsd0JBQTlHLEVBQXdJLElBQXhJOztBQUNBO0FBQ0E7O0FBRUQsWUFBSSxDQUFDYSx3QkFBTCxDQUE4QjVDLElBQTlCLEVBQW9DVyxHQUFwQyxFQVZxRCxDQVdyRDs7O0FBQ0EsVUFBSSxDQUFFLE1BQUksQ0FBQzBCLHFCQUFYLEVBQWtDO0FBQ2pDO0FBQ0E7O0FBQ0QsWUFBSSxDQUFDUSxPQUFMLEdBQWVDLElBQWYsQ0FBcUIscUJBQXJCLEVBQTZDQyxPQUE3QyxDQUFzRCxPQUF0RDtBQUNBLEtBaEJEO0FBaUJBLEdBbEJEOztBQW9CQSxPQUFLSCx3QkFBTCxHQUFnQyxVQUFTNUMsSUFBVCxFQUFlVyxHQUFmLEVBQW9CO0FBQ25ELFFBQU1xQyxNQUFNLEdBQUdDLElBQUksQ0FBQ0MsU0FBTCxDQUFlO0FBQzdCbEQsVUFBSSxFQUFFQSxJQUR1QjtBQUU3QlcsU0FBRyxFQUFFQTtBQUZ3QixLQUFmLENBQWY7QUFJQXdDLFNBQUssQ0FBRyxxQ0FBcUNILE1BQXhDLENBQUw7QUFDQSxHQU5EO0FBUUE7Ozs7O0FBR0EsT0FBS2pDLGlDQUFMLEdBQXlDLFlBQVc7QUFBQTs7QUFDbkQsU0FBS2IsSUFBTCxDQUFVZ0IsY0FBVixDQUF5QkMsRUFBekIsQ0FBNkIscUJBQTdCLEVBQW9ELFVBQUVDLEtBQUYsRUFBU2dDLGFBQVQsRUFBNEI7QUFDL0UsVUFBSyxPQUFPQSxhQUFQLEtBQXlCLFdBQXpCLElBQXdDQyxRQUFRLENBQUVELGFBQUYsQ0FBUixLQUE4QixDQUEzRSxFQUErRTtBQUM5RSxjQUFJLENBQUNFLGdCQUFMLEdBQXdCRixhQUF4QjtBQUNBO0FBQ0QsS0FKRDtBQUtBLEdBTkQ7O0FBUUEsT0FBS2IsMkJBQUwsR0FBbUMsWUFBVztBQUFBOztBQUM3Q1ksU0FBSyxDQUFFLG1DQUFGLENBQUw7QUFDQSxTQUFLTixPQUFMLEdBQWUxQixFQUFmLENBQW1CLFFBQW5CLEVBQTZCLFVBQUVvQyxDQUFGLEVBQVM7QUFDckNBLE9BQUMsQ0FBQ0MsY0FBRjtBQUNBLFVBQU14RCxJQUFJLEdBQUc7QUFDWnlELGdCQUFRLEVBQUU7QUFDVEMsaUJBQU8sRUFBRTtBQUNSQyx5QkFBYSxFQUFFL0QsNkNBQU0sQ0FBQyxzQ0FBRCxDQUFOLENBQStDZ0UsR0FBL0MsRUFEUDtBQUVSQywyQkFBZSxFQUFFakUsNkNBQU0sQ0FBQyxvQ0FBRCxDQUFOLENBQTZDZ0UsR0FBN0MsRUFGVDtBQUdSRSwwQkFBYyxFQUFFbEUsNkNBQU0sQ0FBQyxtQ0FBRCxDQUFOLENBQTRDZ0UsR0FBNUMsRUFIUjtBQUlSRyxvQkFBUSxFQUFFbkUsNkNBQU0sQ0FBQyw4QkFBRCxDQUFOLENBQXVDZ0UsR0FBdkM7QUFKRjtBQURBO0FBREUsT0FBYjtBQVVBVCxXQUFLLENBQUUsOENBQUYsQ0FBTDs7QUFDQSxZQUFJLENBQUM5QyxRQUFMLENBQWMyRCxLQUFkLENBQW9CLEtBQXBCLEVBQTJCaEUsSUFBM0IsRUFBaUMsTUFBSSxDQUFDVyxHQUF0QztBQUNBLEtBZEQ7QUFlQSxHQWpCRDs7QUFtQkEsT0FBS2tDLE9BQUwsR0FBZSxZQUFVO0FBQ3hCLFdBQU9qRCw2Q0FBTSxDQUFDLHNDQUFELENBQU4sQ0FBK0NxRSxPQUEvQyxDQUF3RCxZQUF4RCxDQUFQO0FBQ0EsR0FGRDtBQUlBOzs7Ozs7Ozs7QUFPQSxPQUFLQyxLQUFMLEdBQWEsVUFBVUMsS0FBVixFQUFpQkMsUUFBakIsRUFBNEI7QUFDeEMsV0FBT0MsTUFBTSxDQUFFQyxJQUFJLENBQUNKLEtBQUwsQ0FBWUMsS0FBSyxHQUFHLEdBQVIsR0FBY0MsUUFBMUIsSUFBdUMsSUFBdkMsR0FBOENBLFFBQWhELENBQWI7QUFDQSxHQUZEO0FBR0EsQzs7Ozs7Ozs7Ozs7QUMvTkQsd0JBQXdCLDJFQUEyRSxvQ0FBb0MsbUJBQW1CLEdBQUcsRUFBRSxPQUFPLG9DQUFvQyw4SEFBOEgsR0FBRyxFQUFFLHNCQUFzQjs7QUFFblc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLHlCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2hCQSxhQUFhLCtCQUErQixFQUFFLEk7Ozs7Ozs7Ozs7O0FDQTlDLGFBQWEsaUNBQWlDLEVBQUUsSSIsImZpbGUiOiJldmVudGVzcHJlc3NvLXBheW1lbnQtbWV0aG9kcy1jYXJkaW5hbC1jb21tZXJjZS5jMjg3NzhmMGZlMjE3M2ZlZDUwZi5kaXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuIiwiaW1wb3J0IHsgZGF0YSB9IGZyb20gJ0BldmVudGVzcHJlc3NvL2VlanMnO1xuaW1wb3J0IGpRdWVyeSBmcm9tICdqcXVlcnknO1xuXG5cbi8qKlxuICogQHZhciBlZV9wYXlwYWxfc21hcnRfYnV0dG9uX2FyZ3MgYXJyYXkgb2YgbG9jYWxpemVkIHZhcmlhYmxlc1xuICovXG5sZXQgZWVDYXJkaW5hbENydWlzZSA9IG51bGw7XG5qUXVlcnkoIGRvY3VtZW50ICkucmVhZHkoICgpID0+IHtcblxuXHQvL2FkZCBTUENPIG9iamVjdFxuXHRjb25zdCBlZUNhcmRpbmFsQ29tbWVyY2VEYXRhID0gZGF0YS5jYXJkaW5hbENvbW1lcmNlO1xuXHRlZUNhcmRpbmFsQ29tbWVyY2VEYXRhLmRhdGEuc3BjbyA9IHdpbmRvdy5TUENPIHx8IG51bGw7XG5cdGVlQ2FyZGluYWxDb21tZXJjZURhdGEuZGF0YS5jYXJkaW5hbCA9IHdpbmRvdy5DYXJkaW5hbCB8fCBudWxsO1xuXHQvL2NyZWF0ZSB0aGUgc21hcnQgYnV0dG9ucyBvYmplY3Rcblx0ZWVDYXJkaW5hbENydWlzZSA9IG5ldyBFZUNhcmRpbmFsQ3J1aXNlKCBlZUNhcmRpbmFsQ29tbWVyY2VEYXRhLmRhdGEsIGVlQ2FyZGluYWxDb21tZXJjZURhdGEudHJhbnNsYXRpb25zICk7XG5cdC8vYW5kIHNldCBpdCB1cCB0byBsaXN0ZW4gZm9yIGl0cyBjdWUgdG8gZ2V0IGluaXRpYWxpemVkXG5cdGVlQ2FyZGluYWxDcnVpc2Uuc2V0SW5pdExpc3RlbmVycygpO1xufSApO1xuXG4vKipcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VWYXJzIHtcbiAqIH1cbiAqIEBwYXJhbSB7T2JqZWN0fSB0cmFuc2xhdGlvbnMge1xuICogXHRub19TUENPX2Vycm9yOiBzdHJpbmdcbiAqIFx0bm9fcGF5cGFsX2pzOiBzdHJpbmdcbiAqIH1cbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBFZUNhcmRpbmFsQ3J1aXNlKGluc3RhbmNlVmFycywgdHJhbnNsYXRpb25zICkge1xuXHR0aGlzLnNwY28gPSBpbnN0YW5jZVZhcnMuc3Bjbztcblx0dGhpcy5jYXJkaW5hbCA9IGluc3RhbmNlVmFycy5jYXJkaW5hbDtcblx0dGhpcy5qd3QgPSBpbnN0YW5jZVZhcnMuand0O1xuXHR0aGlzLnNsdWcgPSBpbnN0YW5jZVZhcnMuc2x1Zztcblx0dGhpcy50cmFuc2xhdGlvbnMgPSB0cmFuc2xhdGlvbnM7XG5cblx0LyoqXG5cdCAqIFNldHMgbGlzdGVuZXJzIHRoYXQgd2lsbCB0cmlnZ2VyIGluaXRpYWxpemluZyB0aGUgc21hcnQgYnV0dG9ucy5cblx0ICovXG5cdHRoaXMuc2V0SW5pdExpc3RlbmVycyA9IGZ1bmN0aW9uKCkge1xuXHRcdHRoaXMuc2V0TGlzdGVuZXJGb3JQYXltZW50TWV0aG9kU2VsZWN0b3IoKTtcblx0XHR0aGlzLnNldExpc3RlbmVyRm9yRGlzcGxheVNwY28oKTtcblx0XHR0aGlzLnNldExpc3RlbmVyRm9yUGF5bWVudEFtb3VudENoYW5nZSgpO1xuXHRcdC8vYWxzbywgaWYgdGhlIHBhZ2Ugd2FzIHJlbG9hZGVkIG9uIHRoZSBwYXltZW50IG9wdGlvbiBzdGVwLCB3ZSBzaG91bGQgaW5pdGlhbGl6ZSBpbW1lZGlhdGVseVxuXHRcdGlmICggdGhpcy5iaWxsaW5nRm9ybUxvYWRlZCgpICkge1xuXHRcdFx0dGhpcy5pbml0aWFsaXplKCk7XG5cdFx0fVxuXHR9O1xuXG5cdC8qKlxuXHQgKiBXaGVuIFNQQ08gZGlzcGxheXMgYSBzdGVwLCBpZiBpdHMgdGhlIHBheW1lbnQgb3B0aW9ucyBzdGVwLCBhbmQgb3VyIGJpbGxpbmdcblx0ICogZm9ybSBpcyBwcmVzZW50LCBpbml0aWFsaXplIHRoZSBzbWFydCBidXR0b25zXG5cdCAqXG5cdCAqL1xuXHR0aGlzLnNldExpc3RlbmVyRm9yRGlzcGxheVNwY28gPSBmdW5jdGlvbigpIHtcblx0XHR0aGlzLnNwY28ubWFpbl9jb250YWluZXIub24oICdzcGNvX2Rpc3BsYXlfc3RlcCcsICggZXZlbnQsIHN0ZXBUb1Nob3cgKSA9PiB7XG5cdFx0XHRpZiAoIHR5cGVvZiBzdGVwVG9TaG93ICE9PSAndW5kZWZpbmVkJyAmJlxuXHRcdFx0XHRzdGVwVG9TaG93ID09PSAncGF5bWVudF9vcHRpb25zJyAmJlxuXHRcdFx0XHR0aGlzLmJpbGxpbmdGb3JtTG9hZGVkKClcblx0XHRcdCkge1xuXHRcdFx0XHR0aGlzLmluaXRpYWxpemUoKTtcblx0XHRcdH1cblx0XHR9ICk7XG5cdH07XG5cblx0LyoqXG5cdCAqIFdoZW4gdGhleSBzd2l0Y2ggcGF5bWVudCBtZXRob2RzLCBpZiB0aGUgcGF5bWVudCBtZXRob2QgaXMgdGhpcyBvbmUsXG5cdCAqIGluaXRpYWxpemUgdGhlIHNtYXJ0IGJ1dHRvbiAob3IgaWYgaXQncyBhbHJlYWR5IGluaXRpYWxpemVkLCBqdXN0IHNob3cgaXQgYWdhaW4pLlxuXHQgKiBJZiB0aGV5IHNlbGVjdGVkIGEgZGlmZmVyZW50IHBheW1lbnQgbWV0aG9kLCBoaWRlIHRoZSBzbWFydCBidXR0b25zXG5cdCAqL1xuXHR0aGlzLnNldExpc3RlbmVyRm9yUGF5bWVudE1ldGhvZFNlbGVjdG9yID0gZnVuY3Rpb24oKSB7XG5cdFx0dGhpcy5zcGNvLm1haW5fY29udGFpbmVyLm9uKCAnc3Bjb19zd2l0Y2hfcGF5bWVudF9tZXRob2RzJywgKCBldmVudCwgcGF5bWVudE1ldGhvZCApID0+IHtcblx0XHRcdGlmICggdHlwZW9mIHBheW1lbnRNZXRob2QgIT09ICd1bmRlZmluZWQnICYmIHBheW1lbnRNZXRob2QgPT09IHRoaXMuc2x1ZyApIHtcblx0XHRcdFx0dGhpcy5pbml0aWFsaXplKCk7XG5cdFx0XHR9IGVsc2UgaWYgKCB0aGlzLmluaXRpYWxpemVkICkge1xuXHRcdFx0XHQvL2FuZCBpZiB0aGlzIHdhcyBwcmV2aW91c2x5IGluaXRpYWxpemVkLCBtYWtlIHN1cmUgd2UgaGlkZSB0aGUgYnV0dG9uXG5cdFx0XHR9XG5cdFx0fSApO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHRydWUgaWYgdGhpcyBwYXltZW50IG1ldGhvZCdzIGJpbGxpbmcgZm9ybSBleGlzdHMgb24gdGhlIHBhZ2Vcblx0ICogQHJldHVybiB7Ym9vbGVhbn0gd2hldGhlciBpdCB3YXMgc3VjY2Vzc2ZmdWxseSBsb2FkZWQgb3Igbm90LlxuXHQgKi9cblx0dGhpcy5iaWxsaW5nRm9ybUxvYWRlZCA9IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiBqUXVlcnkoICcjcGF5cGFsLXByby1iaWxsaW5nLWZvcm0tY3JlZGl0LWNhcmQnICkubGVuZ3RoID4gMDtcblx0fTtcblxuXHQvKipcblx0ICogSW5pdGlhbGl6ZXMgalF1ZXJ5IHNlbGVjdGVkIG9iamVjdHMgc28gd2UgZG9uJ3QgbmVlZCB0byBxdWVyeSBmb3IgYW55dGhpbmcgYWZ0ZXJ3YXJkc1xuXHQgKi9cblx0dGhpcy5pbml0aWFsaXplT2JqZWN0cyA9IGZ1bmN0aW9uKCkge1xuXHRcdC8vIE9ubHkgaW5pdGlhbGl6ZSBvYmplY3RzIG9uY2UuIEl0J3Mgbm90IHJlbW92ZWQgd2hlbiBzd2l0Y2hpbmcgcGF5bWVudCBtZXRob2RzLCBhbmQgUGF5UGFsJ3MgSlNcblx0XHQvLyBtYWxmdW5jdGlvbnMgaWYgdGhpcyBnZXRzIHJlc2V0LlxuXHRcdGlmICggISB0aGlzLmluaXRpYWxpemVkICkge1xuXHRcdH1cblx0fTtcblxuXHQvKipcblx0ICogU2hvd3MgdGhlIHNtYXJ0IGJ1dHRvbnMgKHRoaXMgbWF5IHJlcXVpcmUgaW5pdGlhbGl6aW5nIHRoZW0pIGFuZCBvdGhlcndpc2UgaW5pdGlhbGl6ZXMgdGhpcyBvYmplY3Rcblx0ICovXG5cdHRoaXMuaW5pdGlhbGl6ZSA9IGZ1bmN0aW9uKCkge1xuXG5cdFx0aWYgKCB0eXBlb2YgdGhpcy5zcGNvID09PSAndW5kZWZpbmVkJyB8fFxuXHRcdFx0dHlwZW9mIHRoaXMuc3Bjby5zaG93X2V2ZW50X3F1ZXVlX2FqYXhfbXNnICE9PSAnZnVuY3Rpb24nIHx8XG5cdFx0XHR0eXBlb2YgdGhpcy5zcGNvLmRpc3BsYXlfbWVzc2FnZXMgIT09ICdmdW5jdGlvbicgfHxcblx0XHRcdCEgdGhpcy5zcGNvLm1haW5fY29udGFpbmVyICkge1xuXHRcdFx0Ly8gTm8gU1BDTyBvYmplY3QsIHNvIHdlIGNhbid0IHVzZSBTUENPIHRvIHNob3cgYSBuaWNlIGVycm9yIG1lc3NhZ2UuIEF0IGxlYXN0IHB1dCBzb21ldGhpbmcgaW4gdGhlIGNvbnNvbGUuXG5cdFx0XHR3YXJuaW5nKCBmYWxzZSwgdGhpcy50cmFuc2xhdGlvbnMubm9fU1BDT19lcnJvciApO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHQvLyBlbnN1cmUgdGhhdCB0aGUgQ2FyZGluYWwgQ29tbWVyY2Ugb2JqZWN0IChmcm9tIGh0dHBzOi8vc29uZ2JpcmQuY2FyZGluYWxjb21tZXJjZS5jb20vZWRnZS92MS9zb25nYmlyZC5qcykganMgY2xhc3MgaXMgbG9hZGVkXG5cdFx0aWYgKCB0eXBlb2YgdGhpcy5jYXJkaW5hbCA9PT0gJ3VuZGVmaW5lZCdcblx0XHRcdC8vIEB0b2RvOiBtYWtlIHN1cmUgd2UgaGF2ZSBhbGwgdGhlIG1ldGhvZHMgd2UgbmVlZCB0b28uLi5cblx0XHRcdC8vIHR5cGVvZiB0aGlzLmNhcmRpbmFsLkJ1dHRvbiAhPT0gJ29iamVjdCcgfHxcblx0XHRcdC8vIHR5cGVvZiB0aGlzLnBheXBhbC5CdXR0b24ucmVuZGVyICE9PSAnZnVuY3Rpb24nXG5cdFx0KSB7XG5cdFx0XHR0aGlzLnNwY28uc2hvd19ldmVudF9xdWV1ZV9hamF4X21zZyggJ2Vycm9yJywgdGhpcy50cmFuc2xhdGlvbnMubm9fY2FyZGluYWxfZXJyb3IsIHRoaXMuc3Bjby5ub3RpY2VfZmFkZW91dF9hdHRlbnRpb24sIHRydWUgKTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblxuXHRcdC8vIFRlbGwgbWUgaG93IGl0IGdvZXMuLi5cblx0XHR0aGlzLmNhcmRpbmFsLmNvbmZpZ3VyZSh7XG5cdFx0XHRsb2dnaW5nOiB7XG5cdFx0XHRcdGxldmVsOiBcIm9uXCJcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdC8vIEZpcmUgdXAgQ2FyZGluYWwgQ3J1aXNlLlxuXHRcdHRoaXMuY2FyZGluYWwuc2V0dXAoXCJpbml0XCIsIHtcblx0XHRcdGp3dDogdGhpcy5qd3Rcblx0XHR9KTtcblxuXHRcdC8vIFJhbiB3aGVuIENhcmRpbmFsIGlzIHJlYWR5IHRvIGdvLiBTZWUgaHR0cHM6Ly9jYXJkaW5hbGRvY3MuYXRsYXNzaWFuLm5ldC93aWtpL3NwYWNlcy9DQy9wYWdlcy81NTcwNjUvU29uZ2JpcmQuanMjU29uZ2JpcmQuanMtcGF5bWVudHMuc2V0dXBDb21wbGV0ZVxuXHRcdHRoaXMuY2FyZGluYWwub24oJ3BheW1lbnRzLnNldHVwQ29tcGxldGUnLCAoc2V0dXBDb21wbGV0ZURhdGEpID0+IHtcblx0XHRcdHRoaXMuY2FyZGluYWxTZXR1cENvbXBsZXRlID0gdHJ1ZTtcblx0XHR9KTtcblxuXHRcdHRoaXMuc2V0TGlzdGVuZXJGb3JDYXJkaW5hbFBheW1lbnRWYWxpZGF0ZWQoKTtcblx0XHR0aGlzLnNldExpc3RlbmVyRm9yUGF5bWVudFN1Ym1pdCgpO1xuXG5cdFx0Ly8gQWx3YXlzIHJlLWluaXRpYWxpemUgalF1ZXJ5IG9iamVjdHMuIElmIHRoZXkgd2VyZSBwYXltZW50IG1ldGhvZCBzd2l0Y2hpbmcsIHRoZSBvbGQgYmlsbGluZyBmb3IgaW5wdXRzIGdvdFxuXHRcdC8vIHJlbW92ZWQgZnJvbSB0aGUgcGFnZSBhbmQgd2UgbmVlZCB0byBmaW5kIHRoZW0gYWdhaW4uXG5cdFx0dGhpcy5pbml0aWFsaXplT2JqZWN0cygpO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBSYW4gd2hlbiBDYXJkaW5hbCBDcnVpc2UgaGFzIGZpbmlzaGVkIHZhbGlkYXRpbmcgIHRoZSBtb2RlIG9mIHBheW1lbnQuIENvbnRpbnVlIHdpdGggcHJvY2Vzc2luZyB0aGUgcGF5bWVudC5cblx0ICovXG5cdHRoaXMuc2V0TGlzdGVuZXJGb3JDYXJkaW5hbFBheW1lbnRWYWxpZGF0ZWQgPSBmdW5jdGlvbigpe1xuXHRcdHRoaXMuY2FyZGluYWwub24oJ3BheW1lbnRzLnZhbGlkYXRlZCcsIChkYXRhLCBqd3QpID0+IHtcblx0XHRcdGlmKCB0eXBlb2YoZGF0YSkgIT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdHRoaXMuc3Bjby5zaG93X2V2ZW50X3F1ZXVlX2FqYXhfbXNnKCAnZXJyb3InLCB0aGlzLnRyYW5zbGF0aW9ucy5pbnZhbGlkX3Jlc3BvbnNlX2Zyb21fY2FyZGluYWwsIHRoaXMuc3Bjby5ub3RpY2VfZmFkZW91dF9hdHRlbnRpb24sIHRydWUgKTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0aWYoZGF0YS5BY3Rpb25Db2RlID09PSAnRVJST1InKXtcblx0XHRcdFx0dGhpcy5zcGNvLnNob3dfZXZlbnRfcXVldWVfYWpheF9tc2coICdlcnJvcicsIGRhdGEuRXJyb3JEZXNjcmlwdGlvbiArICdbJyArIGRhdGEuRXJyb3JOdW1iZXIgKyAnXScsIHRoaXMuc3Bjby5ub3RpY2VfZmFkZW91dF9hdHRlbnRpb24sIHRydWUgKTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLnNhdmVDYXJkaW5hbENydWlzZVJlc3VsdChkYXRhLCBqd3QpO1xuXHRcdFx0Ly8gT25seSBwYXkgYXR0ZW50aW9uIGlmIENhcmRpbmFsIGlzIGNvbXBsZXRlbHkgc2V0dXAuXG5cdFx0XHRpZiAoISB0aGlzLmNhcmRpbmFsU2V0dXBDb21wbGV0ZSkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHR0aGlzLmdldEZvcm0oKS5maW5kKCAnLnNwY28tbmV4dC1zdGVwLWJ0bicgKS50cmlnZ2VyKCAnY2xpY2snICk7XG5cdFx0fSk7XG5cdH07XG5cblx0dGhpcy5zYXZlQ2FyZGluYWxDcnVpc2VSZXN1bHQgPSBmdW5jdGlvbihkYXRhLCBqd3QpIHtcblx0XHRjb25zdCByZXN1bHQgPSBKU09OLnN0cmluZ2lmeSh7XG5cdFx0XHRkYXRhOiBkYXRhLFxuXHRcdFx0and0OiBqd3Rcblx0XHR9KTtcblx0XHRhbGVydCAoICdjYXJkaW5hbCBjcnVzZSBkb25lLiBSRXN1bHQgd2FzICcgKyByZXN1bHQpO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBXaGVuIHRoZSBwYXltZW50IGFtb3VudCBjaGFuZ2VzLCBqdXN0IHVwZGF0ZSB0aGlzIG9iamVjdCdzIHRyYW5zYWN0aW9uX3RvdGFsXG5cdCAqL1xuXHR0aGlzLnNldExpc3RlbmVyRm9yUGF5bWVudEFtb3VudENoYW5nZSA9IGZ1bmN0aW9uKCkge1xuXHRcdHRoaXMuc3Bjby5tYWluX2NvbnRhaW5lci5vbiggJ3NwY29fcGF5bWVudF9hbW91bnQnLCAoIGV2ZW50LCBwYXltZW50QW1vdW50ICkgPT4ge1xuXHRcdFx0aWYgKCB0eXBlb2YgcGF5bWVudEFtb3VudCAhPT0gJ3VuZGVmaW5lZCcgJiYgcGFyc2VJbnQoIHBheW1lbnRBbW91bnQgKSAhPT0gMCApIHtcblx0XHRcdFx0dGhpcy50cmFuc2FjdGlvblRvdGFsID0gcGF5bWVudEFtb3VudDtcblx0XHRcdH1cblx0XHR9ICk7XG5cdH07XG5cblx0dGhpcy5zZXRMaXN0ZW5lckZvclBheW1lbnRTdWJtaXQgPSBmdW5jdGlvbigpIHtcblx0XHRhbGVydCggJ3NldHVwIGxpc3RlbmVyIGZvciBwYXltZW50IHN1Ym1pdCcpO1xuXHRcdHRoaXMuZ2V0Rm9ybSgpLm9uKCAnc3VibWl0JywgKCBlICkgPT4ge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0Y29uc3QgZGF0YSA9IHtcblx0XHRcdFx0Q29uc3VtZXI6IHtcblx0XHRcdFx0XHRBY2NvdW50OiB7XG5cdFx0XHRcdFx0XHRBY2NvdW50TnVtYmVyOiBqUXVlcnkoJyNwYXlwYWwtcHJvLWJpbGxpbmctZm9ybS1jcmVkaXQtY2FyZCcpLnZhbCgpLFxuXHRcdFx0XHRcdFx0RXhwaXJhdGlvbk1vbnRoOiBqUXVlcnkoJyNwYXlwYWwtcHJvLWJpbGxpbmctZm9ybS1leHAtbW9udGgnKS52YWwoKSxcblx0XHRcdFx0XHRcdEV4cGlyYXRpb25ZZWFyOiBqUXVlcnkoJyNwYXlwYWwtcHJvLWJpbGxpbmctZm9ybS1leHAteWVhcicpLnZhbCgpLFxuXHRcdFx0XHRcdFx0Q2FyZENvZGU6IGpRdWVyeSgnI3BheXBhbC1wcm8tYmlsbGluZy1mb3JtLWN2dicpLnZhbCgpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdFx0YWxlcnQoICdDYXJkaW5hbCBzZW50IGNyZWRpdCBjYXJkIGV0YWlscyBvZmYgSSB0aGluaycpO1xuXHRcdFx0dGhpcy5jYXJkaW5hbC5zdGFydCgnY2NhJywgZGF0YSwgdGhpcy5qd3QpO1xuXHRcdH0pO1xuXHR9O1xuXG5cdHRoaXMuZ2V0Rm9ybSA9IGZ1bmN0aW9uKCl7XG5cdFx0cmV0dXJuIGpRdWVyeSgnI3BheXBhbC1wcm8tYmlsbGluZy1mb3JtLWNyZWRpdC1jYXJkJykucGFyZW50cyggJ2Zvcm06Zmlyc3QnICk7XG5cdH1cblxuXHQvKipcblx0ICogUm91bmRzIGEgbnVtYmVyIHRvIHRoZSBzcGVjaWZpZWQgcHJlY2lzaW9uLlxuXHQgKiBTZWUgaHR0cDovL3d3dy5qYWNrbG1vb3JlLmNvbS9ub3Rlcy9yb3VuZGluZy1pbi1qYXZhc2NyaXB0Ly5cblx0ICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBkZWNpbWFsc1xuXHQgKiBAcmV0dXJuIHtudW1iZXJ9IFRoZSBvcmlnaW5hbCB2YWx1ZSwgdG8gdGhlIGdpdmVuIHByZWNpc2lvbi5cblx0ICovXG5cdHRoaXMucm91bmQgPSBmdW5jdGlvbiggdmFsdWUsIGRlY2ltYWxzICkge1xuXHRcdHJldHVybiBOdW1iZXIoIE1hdGgucm91bmQoIHZhbHVlICsgJ2UnICsgZGVjaW1hbHMgKSArICdlLScgKyBkZWNpbWFscyApO1xuXHR9O1xufVxuXG4iLCJmdW5jdGlvbiBfdHlwZW9mMihvYmopIHsgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiKSB7IF90eXBlb2YyID0gZnVuY3Rpb24gX3R5cGVvZjIob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9OyB9IGVsc2UgeyBfdHlwZW9mMiA9IGZ1bmN0aW9uIF90eXBlb2YyKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTsgfSByZXR1cm4gX3R5cGVvZjIob2JqKTsgfVxuXG5mdW5jdGlvbiBfdHlwZW9mKG9iaikge1xuICBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIF90eXBlb2YyKFN5bWJvbC5pdGVyYXRvcikgPT09IFwic3ltYm9sXCIpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikge1xuICAgICAgcmV0dXJuIF90eXBlb2YyKG9iaik7XG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IF90eXBlb2YyKG9iaik7XG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiBfdHlwZW9mKG9iaik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX3R5cGVvZjsiLCIoZnVuY3Rpb24oKSB7IG1vZHVsZS5leHBvcnRzID0gdGhpc1tcImVlanNcIl07IH0oKSk7IiwiKGZ1bmN0aW9uKCkgeyBtb2R1bGUuZXhwb3J0cyA9IHRoaXNbXCJqUXVlcnlcIl07IH0oKSk7Il0sInNvdXJjZVJvb3QiOiIifQ==