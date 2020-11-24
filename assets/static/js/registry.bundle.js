this["eventespresso"] = this["eventespresso"] || {}; this["eventespresso"]["registry"] =
/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = this["webpackHotUpdate"];
/******/ 	this["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "0cf94e80b492817d1e9f";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_selfInvalidated: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 			invalidate: function() {
/******/ 				this._selfInvalidated = true;
/******/ 				switch (hotStatus) {
/******/ 					case "idle":
/******/ 						hotUpdate = {};
/******/ 						hotUpdate[moduleId] = modules[moduleId];
/******/ 						hotSetStatus("ready");
/******/ 						break;
/******/ 					case "ready":
/******/ 						hotApplyInvalidatedModule(moduleId);
/******/ 						break;
/******/ 					case "prepare":
/******/ 					case "check":
/******/ 					case "dispose":
/******/ 					case "apply":
/******/ 						(hotQueuedInvalidatedModules =
/******/ 							hotQueuedInvalidatedModules || []).push(moduleId);
/******/ 						break;
/******/ 					default:
/******/ 						// ignore requests in error states
/******/ 						break;
/******/ 				}
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash, hotQueuedInvalidatedModules;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus(hotApplyInvalidatedModules() ? "ready" : "idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "registry";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/ 		return hotApplyInternal(options);
/******/ 	}
/******/
/******/ 	function hotApplyInternal(options) {
/******/ 		hotApplyInvalidatedModules();
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (
/******/ 					!module ||
/******/ 					(module.hot._selfAccepted && !module.hot._selfInvalidated)
/******/ 				)
/******/ 					continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire &&
/******/ 				// when called invalidate self-accepting is not possible
/******/ 				!installedModules[moduleId].hot._selfInvalidated
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					parents: installedModules[moduleId].parents.slice(),
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		if (hotUpdateNewHash !== undefined) {
/******/ 			hotCurrentHash = hotUpdateNewHash;
/******/ 			hotUpdateNewHash = undefined;
/******/ 		}
/******/ 		hotUpdate = undefined;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = item.parents;
/******/ 			hotCurrentChildModule = moduleId;
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		if (hotQueuedInvalidatedModules) {
/******/ 			return hotApplyInternal(options).then(function(list) {
/******/ 				outdatedModules.forEach(function(moduleId) {
/******/ 					if (list.indexOf(moduleId) < 0) list.push(moduleId);
/******/ 				});
/******/ 				return list;
/******/ 			});
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	function hotApplyInvalidatedModules() {
/******/ 		if (hotQueuedInvalidatedModules) {
/******/ 			if (!hotUpdate) hotUpdate = {};
/******/ 			hotQueuedInvalidatedModules.forEach(hotApplyInvalidatedModule);
/******/ 			hotQueuedInvalidatedModules = undefined;
/******/ 			return true;
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApplyInvalidatedModule(moduleId) {
/******/ 		if (!Object.prototype.hasOwnProperty.call(hotUpdate, moduleId))
/******/ 			hotUpdate[moduleId] = modules[moduleId];
/******/ 	}
/******/
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
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(12)(__webpack_require__.s = 12);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@babel/runtime/helpers/defineProperty.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/defineProperty.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

module.exports = _defineProperty;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/extends.js":
/*!********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/extends.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _extends() {
  module.exports = _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

module.exports = _extends;

/***/ }),

/***/ "./node_modules/invariant/invariant.js":
/*!*********************************************!*\
  !*** ./node_modules/invariant/invariant.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var NODE_ENV = "development";

var invariant = function (condition, format, a, b, c, d, e, f) {
  if (NODE_ENV !== 'production') {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;

    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame

    throw error;
  }
};

module.exports = invariant;

/***/ }),

/***/ "./node_modules/ramda/src/F.js":
/*!*************************************!*\
  !*** ./node_modules/ramda/src/F.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * A function that always returns `false`. Any passed in parameters are ignored.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Function
 * @sig * -> Boolean
 * @param {*}
 * @return {Boolean}
 * @see R.T
 * @example
 *
 *      R.F(); //=> false
 */
var F = function () {
  return false;
};

module.exports = F;

/***/ }),

/***/ "./node_modules/ramda/src/T.js":
/*!*************************************!*\
  !*** ./node_modules/ramda/src/T.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * A function that always returns `true`. Any passed in parameters are ignored.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Function
 * @sig * -> Boolean
 * @param {*}
 * @return {Boolean}
 * @see R.F
 * @example
 *
 *      R.T(); //=> true
 */
var T = function () {
  return true;
};

module.exports = T;

/***/ }),

/***/ "./node_modules/ramda/src/__.js":
/*!**************************************!*\
  !*** ./node_modules/ramda/src/__.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * A special placeholder value used to specify "gaps" within curried functions,
 * allowing partial application of any combination of arguments, regardless of
 * their positions.
 *
 * If `g` is a curried ternary function and `_` is `R.__`, the following are
 * equivalent:
 *
 *   - `g(1, 2, 3)`
 *   - `g(_, 2, 3)(1)`
 *   - `g(_, _, 3)(1)(2)`
 *   - `g(_, _, 3)(1, 2)`
 *   - `g(_, 2, _)(1, 3)`
 *   - `g(_, 2)(1)(3)`
 *   - `g(_, 2)(1, 3)`
 *   - `g(_, 2)(_, 3)(1)`
 *
 * @name __
 * @constant
 * @memberOf R
 * @since v0.6.0
 * @category Function
 * @example
 *
 *      const greet = R.replace('{name}', R.__, 'Hello, {name}!');
 *      greet('Alice'); //=> 'Hello, Alice!'
 */
module.exports = {
  '@@functional/placeholder': true
};

/***/ }),

/***/ "./node_modules/ramda/src/add.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/src/add.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");
/**
 * Adds two values.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Math
 * @sig Number -> Number -> Number
 * @param {Number} a
 * @param {Number} b
 * @return {Number}
 * @see R.subtract
 * @example
 *
 *      R.add(2, 3);       //=>  5
 *      R.add(7)(10);      //=> 17
 */


var add = /*#__PURE__*/_curry2(function add(a, b) {
  return Number(a) + Number(b);
});

module.exports = add;

/***/ }),

/***/ "./node_modules/ramda/src/addIndex.js":
/*!********************************************!*\
  !*** ./node_modules/ramda/src/addIndex.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _concat = /*#__PURE__*/__webpack_require__(/*! ./internal/_concat */ "./node_modules/ramda/src/internal/_concat.js");

var _curry1 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry1 */ "./node_modules/ramda/src/internal/_curry1.js");

var curryN = /*#__PURE__*/__webpack_require__(/*! ./curryN */ "./node_modules/ramda/src/curryN.js");
/**
 * Creates a new list iteration function from an existing one by adding two new
 * parameters to its callback function: the current index, and the entire list.
 *
 * This would turn, for instance, [`R.map`](#map) function into one that
 * more closely resembles `Array.prototype.map`. Note that this will only work
 * for functions in which the iteration callback function is the first
 * parameter, and where the list is the last parameter. (This latter might be
 * unimportant if the list parameter is not used.)
 *
 * @func
 * @memberOf R
 * @since v0.15.0
 * @category Function
 * @category List
 * @sig ((a ... -> b) ... -> [a] -> *) -> ((a ..., Int, [a] -> b) ... -> [a] -> *)
 * @param {Function} fn A list iteration function that does not pass index or list to its callback
 * @return {Function} An altered list iteration function that passes (item, index, list) to its callback
 * @example
 *
 *      const mapIndexed = R.addIndex(R.map);
 *      mapIndexed((val, idx) => idx + '-' + val, ['f', 'o', 'o', 'b', 'a', 'r']);
 *      //=> ['0-f', '1-o', '2-o', '3-b', '4-a', '5-r']
 */


var addIndex = /*#__PURE__*/_curry1(function addIndex(fn) {
  return curryN(fn.length, function () {
    var idx = 0;
    var origFn = arguments[0];
    var list = arguments[arguments.length - 1];
    var args = Array.prototype.slice.call(arguments, 0);

    args[0] = function () {
      var result = origFn.apply(this, _concat(arguments, [idx, list]));
      idx += 1;
      return result;
    };

    return fn.apply(this, args);
  });
});

module.exports = addIndex;

/***/ }),

/***/ "./node_modules/ramda/src/adjust.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/src/adjust.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _concat = /*#__PURE__*/__webpack_require__(/*! ./internal/_concat */ "./node_modules/ramda/src/internal/_concat.js");

var _curry3 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry3 */ "./node_modules/ramda/src/internal/_curry3.js");
/**
 * Applies a function to the value at the given index of an array, returning a
 * new copy of the array with the element at the given index replaced with the
 * result of the function application.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category List
 * @sig Number -> (a -> a) -> [a] -> [a]
 * @param {Number} idx The index.
 * @param {Function} fn The function to apply.
 * @param {Array|Arguments} list An array-like object whose value
 *        at the supplied index will be replaced.
 * @return {Array} A copy of the supplied array-like object with
 *         the element at index `idx` replaced with the value
 *         returned by applying `fn` to the existing element.
 * @see R.update
 * @example
 *
 *      R.adjust(1, R.toUpper, ['a', 'b', 'c', 'd']);      //=> ['a', 'B', 'c', 'd']
 *      R.adjust(-1, R.toUpper, ['a', 'b', 'c', 'd']);     //=> ['a', 'b', 'c', 'D']
 * @symb R.adjust(-1, f, [a, b]) = [a, f(b)]
 * @symb R.adjust(0, f, [a, b]) = [f(a), b]
 */


var adjust = /*#__PURE__*/_curry3(function adjust(idx, fn, list) {
  if (idx >= list.length || idx < -list.length) {
    return list;
  }

  var start = idx < 0 ? list.length : 0;

  var _idx = start + idx;

  var _list = _concat(list);

  _list[_idx] = fn(list[_idx]);
  return _list;
});

module.exports = adjust;

/***/ }),

/***/ "./node_modules/ramda/src/all.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/src/all.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");

var _dispatchable = /*#__PURE__*/__webpack_require__(/*! ./internal/_dispatchable */ "./node_modules/ramda/src/internal/_dispatchable.js");

var _xall = /*#__PURE__*/__webpack_require__(/*! ./internal/_xall */ "./node_modules/ramda/src/internal/_xall.js");
/**
 * Returns `true` if all elements of the list match the predicate, `false` if
 * there are any that don't.
 *
 * Dispatches to the `all` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> Boolean
 * @param {Function} fn The predicate function.
 * @param {Array} list The array to consider.
 * @return {Boolean} `true` if the predicate is satisfied by every element, `false`
 *         otherwise.
 * @see R.any, R.none, R.transduce
 * @example
 *
 *      const equals3 = R.equals(3);
 *      R.all(equals3)([3, 3, 3, 3]); //=> true
 *      R.all(equals3)([3, 3, 1, 3]); //=> false
 */


var all = /*#__PURE__*/_curry2( /*#__PURE__*/_dispatchable(['all'], _xall, function all(fn, list) {
  var idx = 0;

  while (idx < list.length) {
    if (!fn(list[idx])) {
      return false;
    }

    idx += 1;
  }

  return true;
}));

module.exports = all;

/***/ }),

/***/ "./node_modules/ramda/src/allPass.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/src/allPass.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry1 */ "./node_modules/ramda/src/internal/_curry1.js");

var curryN = /*#__PURE__*/__webpack_require__(/*! ./curryN */ "./node_modules/ramda/src/curryN.js");

var max = /*#__PURE__*/__webpack_require__(/*! ./max */ "./node_modules/ramda/src/max.js");

var pluck = /*#__PURE__*/__webpack_require__(/*! ./pluck */ "./node_modules/ramda/src/pluck.js");

var reduce = /*#__PURE__*/__webpack_require__(/*! ./reduce */ "./node_modules/ramda/src/reduce.js");
/**
 * Takes a list of predicates and returns a predicate that returns true for a
 * given list of arguments if every one of the provided predicates is satisfied
 * by those arguments.
 *
 * The function returned is a curried function whose arity matches that of the
 * highest-arity predicate.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Logic
 * @sig [(*... -> Boolean)] -> (*... -> Boolean)
 * @param {Array} predicates An array of predicates to check
 * @return {Function} The combined predicate
 * @see R.anyPass
 * @example
 *
 *      const isQueen = R.propEq('rank', 'Q');
 *      const isSpade = R.propEq('suit', '♠︎');
 *      const isQueenOfSpades = R.allPass([isQueen, isSpade]);
 *
 *      isQueenOfSpades({rank: 'Q', suit: '♣︎'}); //=> false
 *      isQueenOfSpades({rank: 'Q', suit: '♠︎'}); //=> true
 */


var allPass = /*#__PURE__*/_curry1(function allPass(preds) {
  return curryN(reduce(max, 0, pluck('length', preds)), function () {
    var idx = 0;
    var len = preds.length;

    while (idx < len) {
      if (!preds[idx].apply(this, arguments)) {
        return false;
      }

      idx += 1;
    }

    return true;
  });
});

module.exports = allPass;

/***/ }),

/***/ "./node_modules/ramda/src/always.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/src/always.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry1 */ "./node_modules/ramda/src/internal/_curry1.js");
/**
 * Returns a function that always returns the given value. Note that for
 * non-primitives the value returned is a reference to the original value.
 *
 * This function is known as `const`, `constant`, or `K` (for K combinator) in
 * other languages and libraries.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig a -> (* -> a)
 * @param {*} val The value to wrap in a function
 * @return {Function} A Function :: * -> val.
 * @example
 *
 *      const t = R.always('Tee');
 *      t(); //=> 'Tee'
 */


var always = /*#__PURE__*/_curry1(function always(val) {
  return function () {
    return val;
  };
});

module.exports = always;

/***/ }),

/***/ "./node_modules/ramda/src/and.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/src/and.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");
/**
 * Returns `true` if both arguments are `true`; `false` otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Logic
 * @sig a -> b -> a | b
 * @param {Any} a
 * @param {Any} b
 * @return {Any} the first argument if it is falsy, otherwise the second argument.
 * @see R.both, R.xor
 * @example
 *
 *      R.and(true, true); //=> true
 *      R.and(true, false); //=> false
 *      R.and(false, true); //=> false
 *      R.and(false, false); //=> false
 */


var and = /*#__PURE__*/_curry2(function and(a, b) {
  return a && b;
});

module.exports = and;

/***/ }),

/***/ "./node_modules/ramda/src/andThen.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/src/andThen.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");

var _assertPromise = /*#__PURE__*/__webpack_require__(/*! ./internal/_assertPromise */ "./node_modules/ramda/src/internal/_assertPromise.js");
/**
 * Returns the result of applying the onSuccess function to the value inside
 * a successfully resolved promise. This is useful for working with promises
 * inside function compositions.
 *
 * @func
 * @memberOf R
 * @since v0.27.1
 * @category Function
 * @sig (a -> b) -> (Promise e a) -> (Promise e b)
 * @sig (a -> (Promise e b)) -> (Promise e a) -> (Promise e b)
 * @param {Function} onSuccess The function to apply. Can return a value or a promise of a value.
 * @param {Promise} p
 * @return {Promise} The result of calling `p.then(onSuccess)`
 * @see R.otherwise
 * @example
 *
 *      var makeQuery = (email) => ({ query: { email }});
 *
 *      //getMemberName :: String -> Promise ({firstName, lastName})
 *      var getMemberName = R.pipe(
 *        makeQuery,
 *        fetchMember,
 *        R.andThen(R.pick(['firstName', 'lastName']))
 *      );
 */


var andThen = /*#__PURE__*/_curry2(function andThen(f, p) {
  _assertPromise('andThen', p);

  return p.then(f);
});

module.exports = andThen;

/***/ }),

/***/ "./node_modules/ramda/src/any.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/src/any.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");

var _dispatchable = /*#__PURE__*/__webpack_require__(/*! ./internal/_dispatchable */ "./node_modules/ramda/src/internal/_dispatchable.js");

var _xany = /*#__PURE__*/__webpack_require__(/*! ./internal/_xany */ "./node_modules/ramda/src/internal/_xany.js");
/**
 * Returns `true` if at least one of the elements of the list match the predicate,
 * `false` otherwise.
 *
 * Dispatches to the `any` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> Boolean
 * @param {Function} fn The predicate function.
 * @param {Array} list The array to consider.
 * @return {Boolean} `true` if the predicate is satisfied by at least one element, `false`
 *         otherwise.
 * @see R.all, R.none, R.transduce
 * @example
 *
 *      const lessThan0 = R.flip(R.lt)(0);
 *      const lessThan2 = R.flip(R.lt)(2);
 *      R.any(lessThan0)([1, 2]); //=> false
 *      R.any(lessThan2)([1, 2]); //=> true
 */


var any = /*#__PURE__*/_curry2( /*#__PURE__*/_dispatchable(['any'], _xany, function any(fn, list) {
  var idx = 0;

  while (idx < list.length) {
    if (fn(list[idx])) {
      return true;
    }

    idx += 1;
  }

  return false;
}));

module.exports = any;

/***/ }),

/***/ "./node_modules/ramda/src/anyPass.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/src/anyPass.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry1 */ "./node_modules/ramda/src/internal/_curry1.js");

var curryN = /*#__PURE__*/__webpack_require__(/*! ./curryN */ "./node_modules/ramda/src/curryN.js");

var max = /*#__PURE__*/__webpack_require__(/*! ./max */ "./node_modules/ramda/src/max.js");

var pluck = /*#__PURE__*/__webpack_require__(/*! ./pluck */ "./node_modules/ramda/src/pluck.js");

var reduce = /*#__PURE__*/__webpack_require__(/*! ./reduce */ "./node_modules/ramda/src/reduce.js");
/**
 * Takes a list of predicates and returns a predicate that returns true for a
 * given list of arguments if at least one of the provided predicates is
 * satisfied by those arguments.
 *
 * The function returned is a curried function whose arity matches that of the
 * highest-arity predicate.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Logic
 * @sig [(*... -> Boolean)] -> (*... -> Boolean)
 * @param {Array} predicates An array of predicates to check
 * @return {Function} The combined predicate
 * @see R.allPass
 * @example
 *
 *      const isClub = R.propEq('suit', '♣');
 *      const isSpade = R.propEq('suit', '♠');
 *      const isBlackCard = R.anyPass([isClub, isSpade]);
 *
 *      isBlackCard({rank: '10', suit: '♣'}); //=> true
 *      isBlackCard({rank: 'Q', suit: '♠'}); //=> true
 *      isBlackCard({rank: 'Q', suit: '♦'}); //=> false
 */


var anyPass = /*#__PURE__*/_curry1(function anyPass(preds) {
  return curryN(reduce(max, 0, pluck('length', preds)), function () {
    var idx = 0;
    var len = preds.length;

    while (idx < len) {
      if (preds[idx].apply(this, arguments)) {
        return true;
      }

      idx += 1;
    }

    return false;
  });
});

module.exports = anyPass;

/***/ }),

/***/ "./node_modules/ramda/src/ap.js":
/*!**************************************!*\
  !*** ./node_modules/ramda/src/ap.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _concat = /*#__PURE__*/__webpack_require__(/*! ./internal/_concat */ "./node_modules/ramda/src/internal/_concat.js");

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");

var _reduce = /*#__PURE__*/__webpack_require__(/*! ./internal/_reduce */ "./node_modules/ramda/src/internal/_reduce.js");

var map = /*#__PURE__*/__webpack_require__(/*! ./map */ "./node_modules/ramda/src/map.js");
/**
 * ap applies a list of functions to a list of values.
 *
 * Dispatches to the `ap` method of the second argument, if present. Also
 * treats curried functions as applicatives.
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category Function
 * @sig [a -> b] -> [a] -> [b]
 * @sig Apply f => f (a -> b) -> f a -> f b
 * @sig (r -> a -> b) -> (r -> a) -> (r -> b)
 * @param {*} applyF
 * @param {*} applyX
 * @return {*}
 * @example
 *
 *      R.ap([R.multiply(2), R.add(3)], [1,2,3]); //=> [2, 4, 6, 4, 5, 6]
 *      R.ap([R.concat('tasty '), R.toUpper], ['pizza', 'salad']); //=> ["tasty pizza", "tasty salad", "PIZZA", "SALAD"]
 *
 *      // R.ap can also be used as S combinator
 *      // when only two functions are passed
 *      R.ap(R.concat, R.toUpper)('Ramda') //=> 'RamdaRAMDA'
 * @symb R.ap([f, g], [a, b]) = [f(a), f(b), g(a), g(b)]
 */


var ap = /*#__PURE__*/_curry2(function ap(applyF, applyX) {
  return typeof applyX['fantasy-land/ap'] === 'function' ? applyX['fantasy-land/ap'](applyF) : typeof applyF.ap === 'function' ? applyF.ap(applyX) : typeof applyF === 'function' ? function (x) {
    return applyF(x)(applyX(x));
  } : _reduce(function (acc, f) {
    return _concat(acc, map(f, applyX));
  }, [], applyF);
});

module.exports = ap;

/***/ }),

/***/ "./node_modules/ramda/src/aperture.js":
/*!********************************************!*\
  !*** ./node_modules/ramda/src/aperture.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _aperture = /*#__PURE__*/__webpack_require__(/*! ./internal/_aperture */ "./node_modules/ramda/src/internal/_aperture.js");

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");

var _dispatchable = /*#__PURE__*/__webpack_require__(/*! ./internal/_dispatchable */ "./node_modules/ramda/src/internal/_dispatchable.js");

var _xaperture = /*#__PURE__*/__webpack_require__(/*! ./internal/_xaperture */ "./node_modules/ramda/src/internal/_xaperture.js");
/**
 * Returns a new list, composed of n-tuples of consecutive elements. If `n` is
 * greater than the length of the list, an empty list is returned.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.12.0
 * @category List
 * @sig Number -> [a] -> [[a]]
 * @param {Number} n The size of the tuples to create
 * @param {Array} list The list to split into `n`-length tuples
 * @return {Array} The resulting list of `n`-length tuples
 * @see R.transduce
 * @example
 *
 *      R.aperture(2, [1, 2, 3, 4, 5]); //=> [[1, 2], [2, 3], [3, 4], [4, 5]]
 *      R.aperture(3, [1, 2, 3, 4, 5]); //=> [[1, 2, 3], [2, 3, 4], [3, 4, 5]]
 *      R.aperture(7, [1, 2, 3, 4, 5]); //=> []
 */


var aperture = /*#__PURE__*/_curry2( /*#__PURE__*/_dispatchable([], _xaperture, _aperture));

module.exports = aperture;

/***/ }),

/***/ "./node_modules/ramda/src/append.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/src/append.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _concat = /*#__PURE__*/__webpack_require__(/*! ./internal/_concat */ "./node_modules/ramda/src/internal/_concat.js");

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");
/**
 * Returns a new list containing the contents of the given list, followed by
 * the given element.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig a -> [a] -> [a]
 * @param {*} el The element to add to the end of the new list.
 * @param {Array} list The list of elements to add a new item to.
 *        list.
 * @return {Array} A new list containing the elements of the old list followed by `el`.
 * @see R.prepend
 * @example
 *
 *      R.append('tests', ['write', 'more']); //=> ['write', 'more', 'tests']
 *      R.append('tests', []); //=> ['tests']
 *      R.append(['tests'], ['write', 'more']); //=> ['write', 'more', ['tests']]
 */


var append = /*#__PURE__*/_curry2(function append(el, list) {
  return _concat(list, [el]);
});

module.exports = append;

/***/ }),

/***/ "./node_modules/ramda/src/apply.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/src/apply.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");
/**
 * Applies function `fn` to the argument list `args`. This is useful for
 * creating a fixed-arity function from a variadic function. `fn` should be a
 * bound function if context is significant.
 *
 * @func
 * @memberOf R
 * @since v0.7.0
 * @category Function
 * @sig (*... -> a) -> [*] -> a
 * @param {Function} fn The function which will be called with `args`
 * @param {Array} args The arguments to call `fn` with
 * @return {*} result The result, equivalent to `fn(...args)`
 * @see R.call, R.unapply
 * @example
 *
 *      const nums = [1, 2, 3, -99, 42, 6, 7];
 *      R.apply(Math.max, nums); //=> 42
 * @symb R.apply(f, [a, b, c]) = f(a, b, c)
 */


var apply = /*#__PURE__*/_curry2(function apply(fn, args) {
  return fn.apply(this, args);
});

module.exports = apply;

/***/ }),

/***/ "./node_modules/ramda/src/applySpec.js":
/*!*********************************************!*\
  !*** ./node_modules/ramda/src/applySpec.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry1 */ "./node_modules/ramda/src/internal/_curry1.js");

var apply = /*#__PURE__*/__webpack_require__(/*! ./apply */ "./node_modules/ramda/src/apply.js");

var curryN = /*#__PURE__*/__webpack_require__(/*! ./curryN */ "./node_modules/ramda/src/curryN.js");

var max = /*#__PURE__*/__webpack_require__(/*! ./max */ "./node_modules/ramda/src/max.js");

var pluck = /*#__PURE__*/__webpack_require__(/*! ./pluck */ "./node_modules/ramda/src/pluck.js");

var reduce = /*#__PURE__*/__webpack_require__(/*! ./reduce */ "./node_modules/ramda/src/reduce.js");

var keys = /*#__PURE__*/__webpack_require__(/*! ./keys */ "./node_modules/ramda/src/keys.js");

var values = /*#__PURE__*/__webpack_require__(/*! ./values */ "./node_modules/ramda/src/values.js"); // Use custom mapValues function to avoid issues with specs that include a "map" key and R.map
// delegating calls to .map


function mapValues(fn, obj) {
  return keys(obj).reduce(function (acc, key) {
    acc[key] = fn(obj[key]);
    return acc;
  }, {});
}
/**
 * Given a spec object recursively mapping properties to functions, creates a
 * function producing an object of the same structure, by mapping each property
 * to the result of calling its associated function with the supplied arguments.
 *
 * @func
 * @memberOf R
 * @since v0.20.0
 * @category Function
 * @sig {k: ((a, b, ..., m) -> v)} -> ((a, b, ..., m) -> {k: v})
 * @param {Object} spec an object recursively mapping properties to functions for
 *        producing the values for these properties.
 * @return {Function} A function that returns an object of the same structure
 * as `spec', with each property set to the value returned by calling its
 * associated function with the supplied arguments.
 * @see R.converge, R.juxt
 * @example
 *
 *      const getMetrics = R.applySpec({
 *        sum: R.add,
 *        nested: { mul: R.multiply }
 *      });
 *      getMetrics(2, 4); // => { sum: 6, nested: { mul: 8 } }
 * @symb R.applySpec({ x: f, y: { z: g } })(a, b) = { x: f(a, b), y: { z: g(a, b) } }
 */


var applySpec = /*#__PURE__*/_curry1(function applySpec(spec) {
  spec = mapValues(function (v) {
    return typeof v == 'function' ? v : applySpec(v);
  }, spec);
  return curryN(reduce(max, 0, pluck('length', values(spec))), function () {
    var args = arguments;
    return mapValues(function (f) {
      return apply(f, args);
    }, spec);
  });
});

module.exports = applySpec;

/***/ }),

/***/ "./node_modules/ramda/src/applyTo.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/src/applyTo.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");
/**
 * Takes a value and applies a function to it.
 *
 * This function is also known as the `thrush` combinator.
 *
 * @func
 * @memberOf R
 * @since v0.25.0
 * @category Function
 * @sig a -> (a -> b) -> b
 * @param {*} x The value
 * @param {Function} f The function to apply
 * @return {*} The result of applying `f` to `x`
 * @example
 *
 *      const t42 = R.applyTo(42);
 *      t42(R.identity); //=> 42
 *      t42(R.add(1)); //=> 43
 */


var applyTo = /*#__PURE__*/_curry2(function applyTo(x, f) {
  return f(x);
});

module.exports = applyTo;

/***/ }),

/***/ "./node_modules/ramda/src/ascend.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/src/ascend.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry3 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry3 */ "./node_modules/ramda/src/internal/_curry3.js");
/**
 * Makes an ascending comparator function out of a function that returns a value
 * that can be compared with `<` and `>`.
 *
 * @func
 * @memberOf R
 * @since v0.23.0
 * @category Function
 * @sig Ord b => (a -> b) -> a -> a -> Number
 * @param {Function} fn A function of arity one that returns a value that can be compared
 * @param {*} a The first item to be compared.
 * @param {*} b The second item to be compared.
 * @return {Number} `-1` if fn(a) < fn(b), `1` if fn(b) < fn(a), otherwise `0`
 * @see R.descend
 * @example
 *
 *      const byAge = R.ascend(R.prop('age'));
 *      const people = [
 *        { name: 'Emma', age: 70 },
 *        { name: 'Peter', age: 78 },
 *        { name: 'Mikhail', age: 62 },
 *      ];
 *      const peopleByYoungestFirst = R.sort(byAge, people);
 *        //=> [{ name: 'Mikhail', age: 62 },{ name: 'Emma', age: 70 }, { name: 'Peter', age: 78 }]
 */


var ascend = /*#__PURE__*/_curry3(function ascend(fn, a, b) {
  var aa = fn(a);
  var bb = fn(b);
  return aa < bb ? -1 : aa > bb ? 1 : 0;
});

module.exports = ascend;

/***/ }),

/***/ "./node_modules/ramda/src/assoc.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/src/assoc.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry3 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry3 */ "./node_modules/ramda/src/internal/_curry3.js");
/**
 * Makes a shallow clone of an object, setting or overriding the specified
 * property with the given value. Note that this copies and flattens prototype
 * properties onto the new object as well. All non-primitive properties are
 * copied by reference.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Object
 * @sig String -> a -> {k: v} -> {k: v}
 * @param {String} prop The property name to set
 * @param {*} val The new value
 * @param {Object} obj The object to clone
 * @return {Object} A new object equivalent to the original except for the changed property.
 * @see R.dissoc, R.pick
 * @example
 *
 *      R.assoc('c', 3, {a: 1, b: 2}); //=> {a: 1, b: 2, c: 3}
 */


var assoc = /*#__PURE__*/_curry3(function assoc(prop, val, obj) {
  var result = {};

  for (var p in obj) {
    result[p] = obj[p];
  }

  result[prop] = val;
  return result;
});

module.exports = assoc;

/***/ }),

/***/ "./node_modules/ramda/src/assocPath.js":
/*!*********************************************!*\
  !*** ./node_modules/ramda/src/assocPath.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry3 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry3 */ "./node_modules/ramda/src/internal/_curry3.js");

var _has = /*#__PURE__*/__webpack_require__(/*! ./internal/_has */ "./node_modules/ramda/src/internal/_has.js");

var _isArray = /*#__PURE__*/__webpack_require__(/*! ./internal/_isArray */ "./node_modules/ramda/src/internal/_isArray.js");

var _isInteger = /*#__PURE__*/__webpack_require__(/*! ./internal/_isInteger */ "./node_modules/ramda/src/internal/_isInteger.js");

var assoc = /*#__PURE__*/__webpack_require__(/*! ./assoc */ "./node_modules/ramda/src/assoc.js");

var isNil = /*#__PURE__*/__webpack_require__(/*! ./isNil */ "./node_modules/ramda/src/isNil.js");
/**
 * Makes a shallow clone of an object, setting or overriding the nodes required
 * to create the given path, and placing the specific value at the tail end of
 * that path. Note that this copies and flattens prototype properties onto the
 * new object as well. All non-primitive properties are copied by reference.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Object
 * @typedefn Idx = String | Int
 * @sig [Idx] -> a -> {a} -> {a}
 * @param {Array} path the path to set
 * @param {*} val The new value
 * @param {Object} obj The object to clone
 * @return {Object} A new object equivalent to the original except along the specified path.
 * @see R.dissocPath
 * @example
 *
 *      R.assocPath(['a', 'b', 'c'], 42, {a: {b: {c: 0}}}); //=> {a: {b: {c: 42}}}
 *
 *      // Any missing or non-object keys in path will be overridden
 *      R.assocPath(['a', 'b', 'c'], 42, {a: 5}); //=> {a: {b: {c: 42}}}
 */


var assocPath = /*#__PURE__*/_curry3(function assocPath(path, val, obj) {
  if (path.length === 0) {
    return val;
  }

  var idx = path[0];

  if (path.length > 1) {
    var nextObj = !isNil(obj) && _has(idx, obj) ? obj[idx] : _isInteger(path[1]) ? [] : {};
    val = assocPath(Array.prototype.slice.call(path, 1), val, nextObj);
  }

  if (_isInteger(idx) && _isArray(obj)) {
    var arr = [].concat(obj);
    arr[idx] = val;
    return arr;
  } else {
    return assoc(idx, val, obj);
  }
});

module.exports = assocPath;

/***/ }),

/***/ "./node_modules/ramda/src/binary.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/src/binary.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry1 */ "./node_modules/ramda/src/internal/_curry1.js");

var nAry = /*#__PURE__*/__webpack_require__(/*! ./nAry */ "./node_modules/ramda/src/nAry.js");
/**
 * Wraps a function of any arity (including nullary) in a function that accepts
 * exactly 2 parameters. Any extraneous parameters will not be passed to the
 * supplied function.
 *
 * @func
 * @memberOf R
 * @since v0.2.0
 * @category Function
 * @sig (* -> c) -> (a, b -> c)
 * @param {Function} fn The function to wrap.
 * @return {Function} A new function wrapping `fn`. The new function is guaranteed to be of
 *         arity 2.
 * @see R.nAry, R.unary
 * @example
 *
 *      const takesThreeArgs = function(a, b, c) {
 *        return [a, b, c];
 *      };
 *      takesThreeArgs.length; //=> 3
 *      takesThreeArgs(1, 2, 3); //=> [1, 2, 3]
 *
 *      const takesTwoArgs = R.binary(takesThreeArgs);
 *      takesTwoArgs.length; //=> 2
 *      // Only 2 arguments are passed to the wrapped function
 *      takesTwoArgs(1, 2, 3); //=> [1, 2, undefined]
 * @symb R.binary(f)(a, b, c) = f(a, b)
 */


var binary = /*#__PURE__*/_curry1(function binary(fn) {
  return nAry(2, fn);
});

module.exports = binary;

/***/ }),

/***/ "./node_modules/ramda/src/bind.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/src/bind.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _arity = /*#__PURE__*/__webpack_require__(/*! ./internal/_arity */ "./node_modules/ramda/src/internal/_arity.js");

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");
/**
 * Creates a function that is bound to a context.
 * Note: `R.bind` does not provide the additional argument-binding capabilities of
 * [Function.prototype.bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind).
 *
 * @func
 * @memberOf R
 * @since v0.6.0
 * @category Function
 * @category Object
 * @sig (* -> *) -> {*} -> (* -> *)
 * @param {Function} fn The function to bind to context
 * @param {Object} thisObj The context to bind `fn` to
 * @return {Function} A function that will execute in the context of `thisObj`.
 * @see R.partial
 * @example
 *
 *      const log = R.bind(console.log, console);
 *      R.pipe(R.assoc('a', 2), R.tap(log), R.assoc('a', 3))({a: 1}); //=> {a: 3}
 *      // logs {a: 2}
 * @symb R.bind(f, o)(a, b) = f.call(o, a, b)
 */


var bind = /*#__PURE__*/_curry2(function bind(fn, thisObj) {
  return _arity(fn.length, function () {
    return fn.apply(thisObj, arguments);
  });
});

module.exports = bind;

/***/ }),

/***/ "./node_modules/ramda/src/both.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/src/both.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");

var _isFunction = /*#__PURE__*/__webpack_require__(/*! ./internal/_isFunction */ "./node_modules/ramda/src/internal/_isFunction.js");

var and = /*#__PURE__*/__webpack_require__(/*! ./and */ "./node_modules/ramda/src/and.js");

var lift = /*#__PURE__*/__webpack_require__(/*! ./lift */ "./node_modules/ramda/src/lift.js");
/**
 * A function which calls the two provided functions and returns the `&&`
 * of the results.
 * It returns the result of the first function if it is false-y and the result
 * of the second function otherwise. Note that this is short-circuited,
 * meaning that the second function will not be invoked if the first returns a
 * false-y value.
 *
 * In addition to functions, `R.both` also accepts any fantasy-land compatible
 * applicative functor.
 *
 * @func
 * @memberOf R
 * @since v0.12.0
 * @category Logic
 * @sig (*... -> Boolean) -> (*... -> Boolean) -> (*... -> Boolean)
 * @param {Function} f A predicate
 * @param {Function} g Another predicate
 * @return {Function} a function that applies its arguments to `f` and `g` and `&&`s their outputs together.
 * @see R.and
 * @example
 *
 *      const gt10 = R.gt(R.__, 10)
 *      const lt20 = R.lt(R.__, 20)
 *      const f = R.both(gt10, lt20);
 *      f(15); //=> true
 *      f(30); //=> false
 *
 *      R.both(Maybe.Just(false), Maybe.Just(55)); // => Maybe.Just(false)
 *      R.both([false, false, 'a'], [11]); //=> [false, false, 11]
 */


var both = /*#__PURE__*/_curry2(function both(f, g) {
  return _isFunction(f) ? function _both() {
    return f.apply(this, arguments) && g.apply(this, arguments);
  } : lift(and)(f, g);
});

module.exports = both;

/***/ }),

/***/ "./node_modules/ramda/src/call.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/src/call.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var curry = /*#__PURE__*/__webpack_require__(/*! ./curry */ "./node_modules/ramda/src/curry.js");
/**
 * Returns the result of calling its first argument with the remaining
 * arguments. This is occasionally useful as a converging function for
 * [`R.converge`](#converge): the first branch can produce a function while the
 * remaining branches produce values to be passed to that function as its
 * arguments.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Function
 * @sig (*... -> a),*... -> a
 * @param {Function} fn The function to apply to the remaining arguments.
 * @param {...*} args Any number of positional arguments.
 * @return {*}
 * @see R.apply
 * @example
 *
 *      R.call(R.add, 1, 2); //=> 3
 *
 *      const indentN = R.pipe(R.repeat(' '),
 *                           R.join(''),
 *                           R.replace(/^(?!$)/gm));
 *
 *      const format = R.converge(R.call, [
 *                                  R.pipe(R.prop('indent'), indentN),
 *                                  R.prop('value')
 *                              ]);
 *
 *      format({indent: 2, value: 'foo\nbar\nbaz\n'}); //=> '  foo\n  bar\n  baz\n'
 * @symb R.call(f, a, b) = f(a, b)
 */


var call = /*#__PURE__*/curry(function call(fn) {
  return fn.apply(this, Array.prototype.slice.call(arguments, 1));
});
module.exports = call;

/***/ }),

/***/ "./node_modules/ramda/src/chain.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/src/chain.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");

var _dispatchable = /*#__PURE__*/__webpack_require__(/*! ./internal/_dispatchable */ "./node_modules/ramda/src/internal/_dispatchable.js");

var _makeFlat = /*#__PURE__*/__webpack_require__(/*! ./internal/_makeFlat */ "./node_modules/ramda/src/internal/_makeFlat.js");

var _xchain = /*#__PURE__*/__webpack_require__(/*! ./internal/_xchain */ "./node_modules/ramda/src/internal/_xchain.js");

var map = /*#__PURE__*/__webpack_require__(/*! ./map */ "./node_modules/ramda/src/map.js");
/**
 * `chain` maps a function over a list and concatenates the results. `chain`
 * is also known as `flatMap` in some libraries.
 *
 * Dispatches to the `chain` method of the second argument, if present,
 * according to the [FantasyLand Chain spec](https://github.com/fantasyland/fantasy-land#chain).
 *
 * If second argument is a function, `chain(f, g)(x)` is equivalent to `f(g(x), x)`.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category List
 * @sig Chain m => (a -> m b) -> m a -> m b
 * @param {Function} fn The function to map with
 * @param {Array} list The list to map over
 * @return {Array} The result of flat-mapping `list` with `fn`
 * @example
 *
 *      const duplicate = n => [n, n];
 *      R.chain(duplicate, [1, 2, 3]); //=> [1, 1, 2, 2, 3, 3]
 *
 *      R.chain(R.append, R.head)([1, 2, 3]); //=> [1, 2, 3, 1]
 */


var chain = /*#__PURE__*/_curry2( /*#__PURE__*/_dispatchable(['fantasy-land/chain', 'chain'], _xchain, function chain(fn, monad) {
  if (typeof monad === 'function') {
    return function (x) {
      return fn(monad(x))(x);
    };
  }

  return _makeFlat(false)(map(fn, monad));
}));

module.exports = chain;

/***/ }),

/***/ "./node_modules/ramda/src/clamp.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/src/clamp.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry3 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry3 */ "./node_modules/ramda/src/internal/_curry3.js");
/**
 * Restricts a number to be within a range.
 *
 * Also works for other ordered types such as Strings and Dates.
 *
 * @func
 * @memberOf R
 * @since v0.20.0
 * @category Relation
 * @sig Ord a => a -> a -> a -> a
 * @param {Number} minimum The lower limit of the clamp (inclusive)
 * @param {Number} maximum The upper limit of the clamp (inclusive)
 * @param {Number} value Value to be clamped
 * @return {Number} Returns `minimum` when `val < minimum`, `maximum` when `val > maximum`, returns `val` otherwise
 * @example
 *
 *      R.clamp(1, 10, -5) // => 1
 *      R.clamp(1, 10, 15) // => 10
 *      R.clamp(1, 10, 4)  // => 4
 */


var clamp = /*#__PURE__*/_curry3(function clamp(min, max, value) {
  if (min > max) {
    throw new Error('min must not be greater than max in clamp(min, max, value)');
  }

  return value < min ? min : value > max ? max : value;
});

module.exports = clamp;

/***/ }),

/***/ "./node_modules/ramda/src/clone.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/src/clone.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _clone = /*#__PURE__*/__webpack_require__(/*! ./internal/_clone */ "./node_modules/ramda/src/internal/_clone.js");

var _curry1 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry1 */ "./node_modules/ramda/src/internal/_curry1.js");
/**
 * Creates a deep copy of the value which may contain (nested) `Array`s and
 * `Object`s, `Number`s, `String`s, `Boolean`s and `Date`s. `Function`s are
 * assigned by reference rather than copied
 *
 * Dispatches to a `clone` method if present.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig {*} -> {*}
 * @param {*} value The object or array to clone
 * @return {*} A deeply cloned copy of `val`
 * @example
 *
 *      const objects = [{}, {}, {}];
 *      const objectsClone = R.clone(objects);
 *      objects === objectsClone; //=> false
 *      objects[0] === objectsClone[0]; //=> false
 */


var clone = /*#__PURE__*/_curry1(function clone(value) {
  return value != null && typeof value.clone === 'function' ? value.clone() : _clone(value, [], [], true);
});

module.exports = clone;

/***/ }),

/***/ "./node_modules/ramda/src/comparator.js":
/*!**********************************************!*\
  !*** ./node_modules/ramda/src/comparator.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry1 */ "./node_modules/ramda/src/internal/_curry1.js");
/**
 * Makes a comparator function out of a function that reports whether the first
 * element is less than the second.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig ((a, b) -> Boolean) -> ((a, b) -> Number)
 * @param {Function} pred A predicate function of arity two which will return `true` if the first argument
 * is less than the second, `false` otherwise
 * @return {Function} A Function :: a -> b -> Int that returns `-1` if a < b, `1` if b < a, otherwise `0`
 * @example
 *
 *      const byAge = R.comparator((a, b) => a.age < b.age);
 *      const people = [
 *        { name: 'Emma', age: 70 },
 *        { name: 'Peter', age: 78 },
 *        { name: 'Mikhail', age: 62 },
 *      ];
 *      const peopleByIncreasingAge = R.sort(byAge, people);
 *        //=> [{ name: 'Mikhail', age: 62 },{ name: 'Emma', age: 70 }, { name: 'Peter', age: 78 }]
 */


var comparator = /*#__PURE__*/_curry1(function comparator(pred) {
  return function (a, b) {
    return pred(a, b) ? -1 : pred(b, a) ? 1 : 0;
  };
});

module.exports = comparator;

/***/ }),

/***/ "./node_modules/ramda/src/complement.js":
/*!**********************************************!*\
  !*** ./node_modules/ramda/src/complement.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var lift = /*#__PURE__*/__webpack_require__(/*! ./lift */ "./node_modules/ramda/src/lift.js");

var not = /*#__PURE__*/__webpack_require__(/*! ./not */ "./node_modules/ramda/src/not.js");
/**
 * Takes a function `f` and returns a function `g` such that if called with the same arguments
 * when `f` returns a "truthy" value, `g` returns `false` and when `f` returns a "falsy" value `g` returns `true`.
 *
 * `R.complement` may be applied to any functor
 *
 * @func
 * @memberOf R
 * @since v0.12.0
 * @category Logic
 * @sig (*... -> *) -> (*... -> Boolean)
 * @param {Function} f
 * @return {Function}
 * @see R.not
 * @example
 *
 *      const isNotNil = R.complement(R.isNil);
 *      isNil(null); //=> true
 *      isNotNil(null); //=> false
 *      isNil(7); //=> false
 *      isNotNil(7); //=> true
 */


var complement = /*#__PURE__*/lift(not);
module.exports = complement;

/***/ }),

/***/ "./node_modules/ramda/src/compose.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/src/compose.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var pipe = /*#__PURE__*/__webpack_require__(/*! ./pipe */ "./node_modules/ramda/src/pipe.js");

var reverse = /*#__PURE__*/__webpack_require__(/*! ./reverse */ "./node_modules/ramda/src/reverse.js");
/**
 * Performs right-to-left function composition. The last argument may have
 * any arity; the remaining arguments must be unary.
 *
 * **Note:** The result of compose is not automatically curried.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig ((y -> z), (x -> y), ..., (o -> p), ((a, b, ..., n) -> o)) -> ((a, b, ..., n) -> z)
 * @param {...Function} ...functions The functions to compose
 * @return {Function}
 * @see R.pipe
 * @example
 *
 *      const classyGreeting = (firstName, lastName) => "The name's " + lastName + ", " + firstName + " " + lastName
 *      const yellGreeting = R.compose(R.toUpper, classyGreeting);
 *      yellGreeting('James', 'Bond'); //=> "THE NAME'S BOND, JAMES BOND"
 *
 *      R.compose(Math.abs, R.add(1), R.multiply(2))(-4) //=> 7
 *
 * @symb R.compose(f, g, h)(a, b) = f(g(h(a, b)))
 */


function compose() {
  if (arguments.length === 0) {
    throw new Error('compose requires at least one argument');
  }

  return pipe.apply(this, reverse(arguments));
}

module.exports = compose;

/***/ }),

/***/ "./node_modules/ramda/src/composeK.js":
/*!********************************************!*\
  !*** ./node_modules/ramda/src/composeK.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var chain = /*#__PURE__*/__webpack_require__(/*! ./chain */ "./node_modules/ramda/src/chain.js");

var compose = /*#__PURE__*/__webpack_require__(/*! ./compose */ "./node_modules/ramda/src/compose.js");

var map = /*#__PURE__*/__webpack_require__(/*! ./map */ "./node_modules/ramda/src/map.js");
/**
 * Returns the right-to-left Kleisli composition of the provided functions,
 * each of which must return a value of a type supported by [`chain`](#chain).
 *
 * `R.composeK(h, g, f)` is equivalent to `R.compose(R.chain(h), R.chain(g), f)`.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category Function
 * @sig Chain m => ((y -> m z), (x -> m y), ..., (a -> m b)) -> (a -> m z)
 * @param {...Function} ...functions The functions to compose
 * @return {Function}
 * @see R.pipeK
 * @deprecated since v0.26.0
 * @example
 *
 *       //  get :: String -> Object -> Maybe *
 *       const get = R.curry((propName, obj) => Maybe(obj[propName]))
 *
 *       //  getStateCode :: Maybe String -> Maybe String
 *       const getStateCode = R.composeK(
 *         R.compose(Maybe.of, R.toUpper),
 *         get('state'),
 *         get('address'),
 *         get('user'),
 *       );
 *       getStateCode({"user":{"address":{"state":"ny"}}}); //=> Maybe.Just("NY")
 *       getStateCode({}); //=> Maybe.Nothing()
 * @symb R.composeK(f, g, h)(a) = R.chain(f, R.chain(g, h(a)))
 */


function composeK() {
  if (arguments.length === 0) {
    throw new Error('composeK requires at least one argument');
  }

  var init = Array.prototype.slice.call(arguments);
  var last = init.pop();
  return compose(compose.apply(this, map(chain, init)), last);
}

module.exports = composeK;

/***/ }),

/***/ "./node_modules/ramda/src/composeP.js":
/*!********************************************!*\
  !*** ./node_modules/ramda/src/composeP.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var pipeP = /*#__PURE__*/__webpack_require__(/*! ./pipeP */ "./node_modules/ramda/src/pipeP.js");

var reverse = /*#__PURE__*/__webpack_require__(/*! ./reverse */ "./node_modules/ramda/src/reverse.js");
/**
 * Performs right-to-left composition of one or more Promise-returning
 * functions. The last arguments may have any arity; the remaining
 * arguments must be unary.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category Function
 * @sig ((y -> Promise z), (x -> Promise y), ..., (a -> Promise b)) -> (a -> Promise z)
 * @param {...Function} functions The functions to compose
 * @return {Function}
 * @see R.pipeP
 * @deprecated since v0.26.0
 * @example
 *
 *      const db = {
 *        users: {
 *          JOE: {
 *            name: 'Joe',
 *            followers: ['STEVE', 'SUZY']
 *          }
 *        }
 *      }
 *
 *      // We'll pretend to do a db lookup which returns a promise
 *      const lookupUser = (userId) => Promise.resolve(db.users[userId])
 *      const lookupFollowers = (user) => Promise.resolve(user.followers)
 *      lookupUser('JOE').then(lookupFollowers)
 *
 *      //  followersForUser :: String -> Promise [UserId]
 *      const followersForUser = R.composeP(lookupFollowers, lookupUser);
 *      followersForUser('JOE').then(followers => console.log('Followers:', followers))
 *      // Followers: ["STEVE","SUZY"]
 */


function composeP() {
  if (arguments.length === 0) {
    throw new Error('composeP requires at least one argument');
  }

  return pipeP.apply(this, reverse(arguments));
}

module.exports = composeP;

/***/ }),

/***/ "./node_modules/ramda/src/composeWith.js":
/*!***********************************************!*\
  !*** ./node_modules/ramda/src/composeWith.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");

var pipeWith = /*#__PURE__*/__webpack_require__(/*! ./pipeWith */ "./node_modules/ramda/src/pipeWith.js");

var reverse = /*#__PURE__*/__webpack_require__(/*! ./reverse */ "./node_modules/ramda/src/reverse.js");
/**
 * Performs right-to-left function composition using transforming function. The last argument may have
 * any arity; the remaining arguments must be unary.
 *
 * **Note:** The result of compose is not automatically curried. Transforming function is not used on the
 * last argument.
 *
 * @func
 * @memberOf R
 * @since v0.26.0
 * @category Function
 * @sig ((* -> *), [(y -> z), (x -> y), ..., (o -> p), ((a, b, ..., n) -> o)]) -> ((a, b, ..., n) -> z)
 * @param {...Function} ...functions The functions to compose
 * @return {Function}
 * @see R.compose, R.pipeWith
 * @example
 *
 *      const composeWhileNotNil = R.composeWith((f, res) => R.isNil(res) ? res : f(res));
 *
 *      composeWhileNotNil([R.inc, R.prop('age')])({age: 1}) //=> 2
 *      composeWhileNotNil([R.inc, R.prop('age')])({}) //=> undefined
 *
 * @symb R.composeWith(f)([g, h, i])(...args) = f(g, f(h, i(...args)))
 */


var composeWith = /*#__PURE__*/_curry2(function composeWith(xf, list) {
  return pipeWith.apply(this, [xf, reverse(list)]);
});

module.exports = composeWith;

/***/ }),

/***/ "./node_modules/ramda/src/concat.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/src/concat.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");

var _isArray = /*#__PURE__*/__webpack_require__(/*! ./internal/_isArray */ "./node_modules/ramda/src/internal/_isArray.js");

var _isFunction = /*#__PURE__*/__webpack_require__(/*! ./internal/_isFunction */ "./node_modules/ramda/src/internal/_isFunction.js");

var _isString = /*#__PURE__*/__webpack_require__(/*! ./internal/_isString */ "./node_modules/ramda/src/internal/_isString.js");

var toString = /*#__PURE__*/__webpack_require__(/*! ./toString */ "./node_modules/ramda/src/toString.js");
/**
 * Returns the result of concatenating the given lists or strings.
 *
 * Note: `R.concat` expects both arguments to be of the same type,
 * unlike the native `Array.prototype.concat` method. It will throw
 * an error if you `concat` an Array with a non-Array value.
 *
 * Dispatches to the `concat` method of the first argument, if present.
 * Can also concatenate two members of a [fantasy-land
 * compatible semigroup](https://github.com/fantasyland/fantasy-land#semigroup).
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [a] -> [a]
 * @sig String -> String -> String
 * @param {Array|String} firstList The first list
 * @param {Array|String} secondList The second list
 * @return {Array|String} A list consisting of the elements of `firstList` followed by the elements of
 * `secondList`.
 *
 * @example
 *
 *      R.concat('ABC', 'DEF'); // 'ABCDEF'
 *      R.concat([4, 5, 6], [1, 2, 3]); //=> [4, 5, 6, 1, 2, 3]
 *      R.concat([], []); //=> []
 */


var concat = /*#__PURE__*/_curry2(function concat(a, b) {
  if (_isArray(a)) {
    if (_isArray(b)) {
      return a.concat(b);
    }

    throw new TypeError(toString(b) + ' is not an array');
  }

  if (_isString(a)) {
    if (_isString(b)) {
      return a + b;
    }

    throw new TypeError(toString(b) + ' is not a string');
  }

  if (a != null && _isFunction(a['fantasy-land/concat'])) {
    return a['fantasy-land/concat'](b);
  }

  if (a != null && _isFunction(a.concat)) {
    return a.concat(b);
  }

  throw new TypeError(toString(a) + ' does not have a method named "concat" or "fantasy-land/concat"');
});

module.exports = concat;

/***/ }),

/***/ "./node_modules/ramda/src/cond.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/src/cond.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _arity = /*#__PURE__*/__webpack_require__(/*! ./internal/_arity */ "./node_modules/ramda/src/internal/_arity.js");

var _curry1 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry1 */ "./node_modules/ramda/src/internal/_curry1.js");

var map = /*#__PURE__*/__webpack_require__(/*! ./map */ "./node_modules/ramda/src/map.js");

var max = /*#__PURE__*/__webpack_require__(/*! ./max */ "./node_modules/ramda/src/max.js");

var reduce = /*#__PURE__*/__webpack_require__(/*! ./reduce */ "./node_modules/ramda/src/reduce.js");
/**
 * Returns a function, `fn`, which encapsulates `if/else, if/else, ...` logic.
 * `R.cond` takes a list of [predicate, transformer] pairs. All of the arguments
 * to `fn` are applied to each of the predicates in turn until one returns a
 * "truthy" value, at which point `fn` returns the result of applying its
 * arguments to the corresponding transformer. If none of the predicates
 * matches, `fn` returns undefined.
 *
 * @func
 * @memberOf R
 * @since v0.6.0
 * @category Logic
 * @sig [[(*... -> Boolean),(*... -> *)]] -> (*... -> *)
 * @param {Array} pairs A list of [predicate, transformer]
 * @return {Function}
 * @see R.ifElse, R.unless, R.when
 * @example
 *
 *      const fn = R.cond([
 *        [R.equals(0),   R.always('water freezes at 0°C')],
 *        [R.equals(100), R.always('water boils at 100°C')],
 *        [R.T,           temp => 'nothing special happens at ' + temp + '°C']
 *      ]);
 *      fn(0); //=> 'water freezes at 0°C'
 *      fn(50); //=> 'nothing special happens at 50°C'
 *      fn(100); //=> 'water boils at 100°C'
 */


var cond = /*#__PURE__*/_curry1(function cond(pairs) {
  var arity = reduce(max, 0, map(function (pair) {
    return pair[0].length;
  }, pairs));
  return _arity(arity, function () {
    var idx = 0;

    while (idx < pairs.length) {
      if (pairs[idx][0].apply(this, arguments)) {
        return pairs[idx][1].apply(this, arguments);
      }

      idx += 1;
    }
  });
});

module.exports = cond;

/***/ }),

/***/ "./node_modules/ramda/src/construct.js":
/*!*********************************************!*\
  !*** ./node_modules/ramda/src/construct.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry1 */ "./node_modules/ramda/src/internal/_curry1.js");

var constructN = /*#__PURE__*/__webpack_require__(/*! ./constructN */ "./node_modules/ramda/src/constructN.js");
/**
 * Wraps a constructor function inside a curried function that can be called
 * with the same arguments and returns the same type.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig (* -> {*}) -> (* -> {*})
 * @param {Function} fn The constructor function to wrap.
 * @return {Function} A wrapped, curried constructor function.
 * @see R.invoker
 * @example
 *
 *      // Constructor function
 *      function Animal(kind) {
 *        this.kind = kind;
 *      };
 *      Animal.prototype.sighting = function() {
 *        return "It's a " + this.kind + "!";
 *      }
 *
 *      const AnimalConstructor = R.construct(Animal)
 *
 *      // Notice we no longer need the 'new' keyword:
 *      AnimalConstructor('Pig'); //=> {"kind": "Pig", "sighting": function (){...}};
 *
 *      const animalTypes = ["Lion", "Tiger", "Bear"];
 *      const animalSighting = R.invoker(0, 'sighting');
 *      const sightNewAnimal = R.compose(animalSighting, AnimalConstructor);
 *      R.map(sightNewAnimal, animalTypes); //=> ["It's a Lion!", "It's a Tiger!", "It's a Bear!"]
 */


var construct = /*#__PURE__*/_curry1(function construct(Fn) {
  return constructN(Fn.length, Fn);
});

module.exports = construct;

/***/ }),

/***/ "./node_modules/ramda/src/constructN.js":
/*!**********************************************!*\
  !*** ./node_modules/ramda/src/constructN.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");

var curry = /*#__PURE__*/__webpack_require__(/*! ./curry */ "./node_modules/ramda/src/curry.js");

var nAry = /*#__PURE__*/__webpack_require__(/*! ./nAry */ "./node_modules/ramda/src/nAry.js");
/**
 * Wraps a constructor function inside a curried function that can be called
 * with the same arguments and returns the same type. The arity of the function
 * returned is specified to allow using variadic constructor functions.
 *
 * @func
 * @memberOf R
 * @since v0.4.0
 * @category Function
 * @sig Number -> (* -> {*}) -> (* -> {*})
 * @param {Number} n The arity of the constructor function.
 * @param {Function} Fn The constructor function to wrap.
 * @return {Function} A wrapped, curried constructor function.
 * @example
 *
 *      // Variadic Constructor function
 *      function Salad() {
 *        this.ingredients = arguments;
 *      }
 *
 *      Salad.prototype.recipe = function() {
 *        const instructions = R.map(ingredient => 'Add a dollop of ' + ingredient, this.ingredients);
 *        return R.join('\n', instructions);
 *      };
 *
 *      const ThreeLayerSalad = R.constructN(3, Salad);
 *
 *      // Notice we no longer need the 'new' keyword, and the constructor is curried for 3 arguments.
 *      const salad = ThreeLayerSalad('Mayonnaise')('Potato Chips')('Ketchup');
 *
 *      console.log(salad.recipe());
 *      // Add a dollop of Mayonnaise
 *      // Add a dollop of Potato Chips
 *      // Add a dollop of Ketchup
 */


var constructN = /*#__PURE__*/_curry2(function constructN(n, Fn) {
  if (n > 10) {
    throw new Error('Constructor with greater than ten arguments');
  }

  if (n === 0) {
    return function () {
      return new Fn();
    };
  }

  return curry(nAry(n, function ($0, $1, $2, $3, $4, $5, $6, $7, $8, $9) {
    switch (arguments.length) {
      case 1:
        return new Fn($0);

      case 2:
        return new Fn($0, $1);

      case 3:
        return new Fn($0, $1, $2);

      case 4:
        return new Fn($0, $1, $2, $3);

      case 5:
        return new Fn($0, $1, $2, $3, $4);

      case 6:
        return new Fn($0, $1, $2, $3, $4, $5);

      case 7:
        return new Fn($0, $1, $2, $3, $4, $5, $6);

      case 8:
        return new Fn($0, $1, $2, $3, $4, $5, $6, $7);

      case 9:
        return new Fn($0, $1, $2, $3, $4, $5, $6, $7, $8);

      case 10:
        return new Fn($0, $1, $2, $3, $4, $5, $6, $7, $8, $9);
    }
  }));
});

module.exports = constructN;

/***/ }),

/***/ "./node_modules/ramda/src/contains.js":
/*!********************************************!*\
  !*** ./node_modules/ramda/src/contains.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _includes = /*#__PURE__*/__webpack_require__(/*! ./internal/_includes */ "./node_modules/ramda/src/internal/_includes.js");

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");
/**
 * Returns `true` if the specified value is equal, in [`R.equals`](#equals)
 * terms, to at least one element of the given list; `false` otherwise.
 * Works also with strings.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig a -> [a] -> Boolean
 * @param {Object} a The item to compare against.
 * @param {Array} list The array to consider.
 * @return {Boolean} `true` if an equivalent item is in the list, `false` otherwise.
 * @see R.includes
 * @deprecated since v0.26.0
 * @example
 *
 *      R.contains(3, [1, 2, 3]); //=> true
 *      R.contains(4, [1, 2, 3]); //=> false
 *      R.contains({ name: 'Fred' }, [{ name: 'Fred' }]); //=> true
 *      R.contains([42], [[42]]); //=> true
 *      R.contains('ba', 'banana'); //=>true
 */


var contains = /*#__PURE__*/_curry2(_includes);

module.exports = contains;

/***/ }),

/***/ "./node_modules/ramda/src/converge.js":
/*!********************************************!*\
  !*** ./node_modules/ramda/src/converge.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");

var _map = /*#__PURE__*/__webpack_require__(/*! ./internal/_map */ "./node_modules/ramda/src/internal/_map.js");

var curryN = /*#__PURE__*/__webpack_require__(/*! ./curryN */ "./node_modules/ramda/src/curryN.js");

var max = /*#__PURE__*/__webpack_require__(/*! ./max */ "./node_modules/ramda/src/max.js");

var pluck = /*#__PURE__*/__webpack_require__(/*! ./pluck */ "./node_modules/ramda/src/pluck.js");

var reduce = /*#__PURE__*/__webpack_require__(/*! ./reduce */ "./node_modules/ramda/src/reduce.js");
/**
 * Accepts a converging function and a list of branching functions and returns
 * a new function. The arity of the new function is the same as the arity of
 * the longest branching function. When invoked, this new function is applied
 * to some arguments, and each branching function is applied to those same
 * arguments. The results of each branching function are passed as arguments
 * to the converging function to produce the return value.
 *
 * @func
 * @memberOf R
 * @since v0.4.2
 * @category Function
 * @sig ((x1, x2, ...) -> z) -> [((a, b, ...) -> x1), ((a, b, ...) -> x2), ...] -> (a -> b -> ... -> z)
 * @param {Function} after A function. `after` will be invoked with the return values of
 *        `fn1` and `fn2` as its arguments.
 * @param {Array} functions A list of functions.
 * @return {Function} A new function.
 * @see R.useWith
 * @example
 *
 *      const average = R.converge(R.divide, [R.sum, R.length])
 *      average([1, 2, 3, 4, 5, 6, 7]) //=> 4
 *
 *      const strangeConcat = R.converge(R.concat, [R.toUpper, R.toLower])
 *      strangeConcat("Yodel") //=> "YODELyodel"
 *
 * @symb R.converge(f, [g, h])(a, b) = f(g(a, b), h(a, b))
 */


var converge = /*#__PURE__*/_curry2(function converge(after, fns) {
  return curryN(reduce(max, 0, pluck('length', fns)), function () {
    var args = arguments;
    var context = this;
    return after.apply(context, _map(function (fn) {
      return fn.apply(context, args);
    }, fns));
  });
});

module.exports = converge;

/***/ }),

/***/ "./node_modules/ramda/src/countBy.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/src/countBy.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var reduceBy = /*#__PURE__*/__webpack_require__(/*! ./reduceBy */ "./node_modules/ramda/src/reduceBy.js");
/**
 * Counts the elements of a list according to how many match each value of a
 * key generated by the supplied function. Returns an object mapping the keys
 * produced by `fn` to the number of occurrences in the list. Note that all
 * keys are coerced to strings because of how JavaScript objects work.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig (a -> String) -> [a] -> {*}
 * @param {Function} fn The function used to map values to keys.
 * @param {Array} list The list to count elements from.
 * @return {Object} An object mapping keys to number of occurrences in the list.
 * @example
 *
 *      const numbers = [1.0, 1.1, 1.2, 2.0, 3.0, 2.2];
 *      R.countBy(Math.floor)(numbers);    //=> {'1': 3, '2': 2, '3': 1}
 *
 *      const letters = ['a', 'b', 'A', 'a', 'B', 'c'];
 *      R.countBy(R.toLower)(letters);   //=> {'a': 3, 'b': 2, 'c': 1}
 */


var countBy = /*#__PURE__*/reduceBy(function (acc, elem) {
  return acc + 1;
}, 0);
module.exports = countBy;

/***/ }),

/***/ "./node_modules/ramda/src/curry.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/src/curry.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry1 */ "./node_modules/ramda/src/internal/_curry1.js");

var curryN = /*#__PURE__*/__webpack_require__(/*! ./curryN */ "./node_modules/ramda/src/curryN.js");
/**
 * Returns a curried equivalent of the provided function. The curried function
 * has two unusual capabilities. First, its arguments needn't be provided one
 * at a time. If `f` is a ternary function and `g` is `R.curry(f)`, the
 * following are equivalent:
 *
 *   - `g(1)(2)(3)`
 *   - `g(1)(2, 3)`
 *   - `g(1, 2)(3)`
 *   - `g(1, 2, 3)`
 *
 * Secondly, the special placeholder value [`R.__`](#__) may be used to specify
 * "gaps", allowing partial application of any combination of arguments,
 * regardless of their positions. If `g` is as above and `_` is [`R.__`](#__),
 * the following are equivalent:
 *
 *   - `g(1, 2, 3)`
 *   - `g(_, 2, 3)(1)`
 *   - `g(_, _, 3)(1)(2)`
 *   - `g(_, _, 3)(1, 2)`
 *   - `g(_, 2)(1)(3)`
 *   - `g(_, 2)(1, 3)`
 *   - `g(_, 2)(_, 3)(1)`
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig (* -> a) -> (* -> a)
 * @param {Function} fn The function to curry.
 * @return {Function} A new, curried function.
 * @see R.curryN, R.partial
 * @example
 *
 *      const addFourNumbers = (a, b, c, d) => a + b + c + d;
 *
 *      const curriedAddFourNumbers = R.curry(addFourNumbers);
 *      const f = curriedAddFourNumbers(1, 2);
 *      const g = f(3);
 *      g(4); //=> 10
 */


var curry = /*#__PURE__*/_curry1(function curry(fn) {
  return curryN(fn.length, fn);
});

module.exports = curry;

/***/ }),

/***/ "./node_modules/ramda/src/curryN.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/src/curryN.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _arity = /*#__PURE__*/__webpack_require__(/*! ./internal/_arity */ "./node_modules/ramda/src/internal/_arity.js");

var _curry1 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry1 */ "./node_modules/ramda/src/internal/_curry1.js");

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");

var _curryN = /*#__PURE__*/__webpack_require__(/*! ./internal/_curryN */ "./node_modules/ramda/src/internal/_curryN.js");
/**
 * Returns a curried equivalent of the provided function, with the specified
 * arity. The curried function has two unusual capabilities. First, its
 * arguments needn't be provided one at a time. If `g` is `R.curryN(3, f)`, the
 * following are equivalent:
 *
 *   - `g(1)(2)(3)`
 *   - `g(1)(2, 3)`
 *   - `g(1, 2)(3)`
 *   - `g(1, 2, 3)`
 *
 * Secondly, the special placeholder value [`R.__`](#__) may be used to specify
 * "gaps", allowing partial application of any combination of arguments,
 * regardless of their positions. If `g` is as above and `_` is [`R.__`](#__),
 * the following are equivalent:
 *
 *   - `g(1, 2, 3)`
 *   - `g(_, 2, 3)(1)`
 *   - `g(_, _, 3)(1)(2)`
 *   - `g(_, _, 3)(1, 2)`
 *   - `g(_, 2)(1)(3)`
 *   - `g(_, 2)(1, 3)`
 *   - `g(_, 2)(_, 3)(1)`
 *
 * @func
 * @memberOf R
 * @since v0.5.0
 * @category Function
 * @sig Number -> (* -> a) -> (* -> a)
 * @param {Number} length The arity for the returned function.
 * @param {Function} fn The function to curry.
 * @return {Function} A new, curried function.
 * @see R.curry
 * @example
 *
 *      const sumArgs = (...args) => R.sum(args);
 *
 *      const curriedAddFourNumbers = R.curryN(4, sumArgs);
 *      const f = curriedAddFourNumbers(1, 2);
 *      const g = f(3);
 *      g(4); //=> 10
 */


var curryN = /*#__PURE__*/_curry2(function curryN(length, fn) {
  if (length === 1) {
    return _curry1(fn);
  }

  return _arity(length, _curryN(length, [], fn));
});

module.exports = curryN;

/***/ }),

/***/ "./node_modules/ramda/src/dec.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/src/dec.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var add = /*#__PURE__*/__webpack_require__(/*! ./add */ "./node_modules/ramda/src/add.js");
/**
 * Decrements its argument.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Math
 * @sig Number -> Number
 * @param {Number} n
 * @return {Number} n - 1
 * @see R.inc
 * @example
 *
 *      R.dec(42); //=> 41
 */


var dec = /*#__PURE__*/add(-1);
module.exports = dec;

/***/ }),

/***/ "./node_modules/ramda/src/defaultTo.js":
/*!*********************************************!*\
  !*** ./node_modules/ramda/src/defaultTo.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");
/**
 * Returns the second argument if it is not `null`, `undefined` or `NaN`;
 * otherwise the first argument is returned.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category Logic
 * @sig a -> b -> a | b
 * @param {a} default The default value.
 * @param {b} val `val` will be returned instead of `default` unless `val` is `null`, `undefined` or `NaN`.
 * @return {*} The second value if it is not `null`, `undefined` or `NaN`, otherwise the default value
 * @example
 *
 *      const defaultTo42 = R.defaultTo(42);
 *
 *      defaultTo42(null);  //=> 42
 *      defaultTo42(undefined);  //=> 42
 *      defaultTo42(false);  //=> false
 *      defaultTo42('Ramda');  //=> 'Ramda'
 *      // parseInt('string') results in NaN
 *      defaultTo42(parseInt('string')); //=> 42
 */


var defaultTo = /*#__PURE__*/_curry2(function defaultTo(d, v) {
  return v == null || v !== v ? d : v;
});

module.exports = defaultTo;

/***/ }),

/***/ "./node_modules/ramda/src/descend.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/src/descend.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry3 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry3 */ "./node_modules/ramda/src/internal/_curry3.js");
/**
 * Makes a descending comparator function out of a function that returns a value
 * that can be compared with `<` and `>`.
 *
 * @func
 * @memberOf R
 * @since v0.23.0
 * @category Function
 * @sig Ord b => (a -> b) -> a -> a -> Number
 * @param {Function} fn A function of arity one that returns a value that can be compared
 * @param {*} a The first item to be compared.
 * @param {*} b The second item to be compared.
 * @return {Number} `-1` if fn(a) > fn(b), `1` if fn(b) > fn(a), otherwise `0`
 * @see R.ascend
 * @example
 *
 *      const byAge = R.descend(R.prop('age'));
 *      const people = [
 *        { name: 'Emma', age: 70 },
 *        { name: 'Peter', age: 78 },
 *        { name: 'Mikhail', age: 62 },
 *      ];
 *      const peopleByOldestFirst = R.sort(byAge, people);
 *        //=> [{ name: 'Peter', age: 78 }, { name: 'Emma', age: 70 }, { name: 'Mikhail', age: 62 }]
 */


var descend = /*#__PURE__*/_curry3(function descend(fn, a, b) {
  var aa = fn(a);
  var bb = fn(b);
  return aa > bb ? -1 : aa < bb ? 1 : 0;
});

module.exports = descend;

/***/ }),

/***/ "./node_modules/ramda/src/difference.js":
/*!**********************************************!*\
  !*** ./node_modules/ramda/src/difference.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");

var _Set = /*#__PURE__*/__webpack_require__(/*! ./internal/_Set */ "./node_modules/ramda/src/internal/_Set.js");
/**
 * Finds the set (i.e. no duplicates) of all elements in the first list not
 * contained in the second list. Objects and Arrays are compared in terms of
 * value equality, not reference equality.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig [*] -> [*] -> [*]
 * @param {Array} list1 The first list.
 * @param {Array} list2 The second list.
 * @return {Array} The elements in `list1` that are not in `list2`.
 * @see R.differenceWith, R.symmetricDifference, R.symmetricDifferenceWith, R.without
 * @example
 *
 *      R.difference([1,2,3,4], [7,6,5,4,3]); //=> [1,2]
 *      R.difference([7,6,5,4,3], [1,2,3,4]); //=> [7,6,5]
 *      R.difference([{a: 1}, {b: 2}], [{a: 1}, {c: 3}]) //=> [{b: 2}]
 */


var difference = /*#__PURE__*/_curry2(function difference(first, second) {
  var out = [];
  var idx = 0;
  var firstLen = first.length;
  var secondLen = second.length;
  var toFilterOut = new _Set();

  for (var i = 0; i < secondLen; i += 1) {
    toFilterOut.add(second[i]);
  }

  while (idx < firstLen) {
    if (toFilterOut.add(first[idx])) {
      out[out.length] = first[idx];
    }

    idx += 1;
  }

  return out;
});

module.exports = difference;

/***/ }),

/***/ "./node_modules/ramda/src/differenceWith.js":
/*!**************************************************!*\
  !*** ./node_modules/ramda/src/differenceWith.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _includesWith = /*#__PURE__*/__webpack_require__(/*! ./internal/_includesWith */ "./node_modules/ramda/src/internal/_includesWith.js");

var _curry3 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry3 */ "./node_modules/ramda/src/internal/_curry3.js");
/**
 * Finds the set (i.e. no duplicates) of all elements in the first list not
 * contained in the second list. Duplication is determined according to the
 * value returned by applying the supplied predicate to two list elements.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig ((a, a) -> Boolean) -> [a] -> [a] -> [a]
 * @param {Function} pred A predicate used to test whether two items are equal.
 * @param {Array} list1 The first list.
 * @param {Array} list2 The second list.
 * @return {Array} The elements in `list1` that are not in `list2`.
 * @see R.difference, R.symmetricDifference, R.symmetricDifferenceWith
 * @example
 *
 *      const cmp = (x, y) => x.a === y.a;
 *      const l1 = [{a: 1}, {a: 2}, {a: 3}];
 *      const l2 = [{a: 3}, {a: 4}];
 *      R.differenceWith(cmp, l1, l2); //=> [{a: 1}, {a: 2}]
 */


var differenceWith = /*#__PURE__*/_curry3(function differenceWith(pred, first, second) {
  var out = [];
  var idx = 0;
  var firstLen = first.length;

  while (idx < firstLen) {
    if (!_includesWith(pred, first[idx], second) && !_includesWith(pred, first[idx], out)) {
      out.push(first[idx]);
    }

    idx += 1;
  }

  return out;
});

module.exports = differenceWith;

/***/ }),

/***/ "./node_modules/ramda/src/dissoc.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/src/dissoc.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");
/**
 * Returns a new object that does not contain a `prop` property.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category Object
 * @sig String -> {k: v} -> {k: v}
 * @param {String} prop The name of the property to dissociate
 * @param {Object} obj The object to clone
 * @return {Object} A new object equivalent to the original but without the specified property
 * @see R.assoc, R.omit
 * @example
 *
 *      R.dissoc('b', {a: 1, b: 2, c: 3}); //=> {a: 1, c: 3}
 */


var dissoc = /*#__PURE__*/_curry2(function dissoc(prop, obj) {
  var result = {};

  for (var p in obj) {
    result[p] = obj[p];
  }

  delete result[prop];
  return result;
});

module.exports = dissoc;

/***/ }),

/***/ "./node_modules/ramda/src/dissocPath.js":
/*!**********************************************!*\
  !*** ./node_modules/ramda/src/dissocPath.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");

var _isInteger = /*#__PURE__*/__webpack_require__(/*! ./internal/_isInteger */ "./node_modules/ramda/src/internal/_isInteger.js");

var _isArray = /*#__PURE__*/__webpack_require__(/*! ./internal/_isArray */ "./node_modules/ramda/src/internal/_isArray.js");

var assoc = /*#__PURE__*/__webpack_require__(/*! ./assoc */ "./node_modules/ramda/src/assoc.js");

var dissoc = /*#__PURE__*/__webpack_require__(/*! ./dissoc */ "./node_modules/ramda/src/dissoc.js");

var remove = /*#__PURE__*/__webpack_require__(/*! ./remove */ "./node_modules/ramda/src/remove.js");

var update = /*#__PURE__*/__webpack_require__(/*! ./update */ "./node_modules/ramda/src/update.js");
/**
 * Makes a shallow clone of an object, omitting the property at the given path.
 * Note that this copies and flattens prototype properties onto the new object
 * as well. All non-primitive properties are copied by reference.
 *
 * @func
 * @memberOf R
 * @since v0.11.0
 * @category Object
 * @typedefn Idx = String | Int
 * @sig [Idx] -> {k: v} -> {k: v}
 * @param {Array} path The path to the value to omit
 * @param {Object} obj The object to clone
 * @return {Object} A new object without the property at path
 * @see R.assocPath
 * @example
 *
 *      R.dissocPath(['a', 'b', 'c'], {a: {b: {c: 42}}}); //=> {a: {b: {}}}
 */


var dissocPath = /*#__PURE__*/_curry2(function dissocPath(path, obj) {
  switch (path.length) {
    case 0:
      return obj;

    case 1:
      return _isInteger(path[0]) && _isArray(obj) ? remove(path[0], 1, obj) : dissoc(path[0], obj);

    default:
      var head = path[0];
      var tail = Array.prototype.slice.call(path, 1);

      if (obj[head] == null) {
        return obj;
      } else if (_isInteger(head) && _isArray(obj)) {
        return update(head, dissocPath(tail, obj[head]), obj);
      } else {
        return assoc(head, dissocPath(tail, obj[head]), obj);
      }

  }
});

module.exports = dissocPath;

/***/ }),

/***/ "./node_modules/ramda/src/divide.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/src/divide.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");
/**
 * Divides two numbers. Equivalent to `a / b`.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Math
 * @sig Number -> Number -> Number
 * @param {Number} a The first value.
 * @param {Number} b The second value.
 * @return {Number} The result of `a / b`.
 * @see R.multiply
 * @example
 *
 *      R.divide(71, 100); //=> 0.71
 *
 *      const half = R.divide(R.__, 2);
 *      half(42); //=> 21
 *
 *      const reciprocal = R.divide(1);
 *      reciprocal(4);   //=> 0.25
 */


var divide = /*#__PURE__*/_curry2(function divide(a, b) {
  return a / b;
});

module.exports = divide;

/***/ }),

/***/ "./node_modules/ramda/src/drop.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/src/drop.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");

var _dispatchable = /*#__PURE__*/__webpack_require__(/*! ./internal/_dispatchable */ "./node_modules/ramda/src/internal/_dispatchable.js");

var _xdrop = /*#__PURE__*/__webpack_require__(/*! ./internal/_xdrop */ "./node_modules/ramda/src/internal/_xdrop.js");

var slice = /*#__PURE__*/__webpack_require__(/*! ./slice */ "./node_modules/ramda/src/slice.js");
/**
 * Returns all but the first `n` elements of the given list, string, or
 * transducer/transformer (or object with a `drop` method).
 *
 * Dispatches to the `drop` method of the second argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Number -> [a] -> [a]
 * @sig Number -> String -> String
 * @param {Number} n
 * @param {*} list
 * @return {*} A copy of list without the first `n` elements
 * @see R.take, R.transduce, R.dropLast, R.dropWhile
 * @example
 *
 *      R.drop(1, ['foo', 'bar', 'baz']); //=> ['bar', 'baz']
 *      R.drop(2, ['foo', 'bar', 'baz']); //=> ['baz']
 *      R.drop(3, ['foo', 'bar', 'baz']); //=> []
 *      R.drop(4, ['foo', 'bar', 'baz']); //=> []
 *      R.drop(3, 'ramda');               //=> 'da'
 */


var drop = /*#__PURE__*/_curry2( /*#__PURE__*/_dispatchable(['drop'], _xdrop, function drop(n, xs) {
  return slice(Math.max(0, n), Infinity, xs);
}));

module.exports = drop;

/***/ }),

/***/ "./node_modules/ramda/src/dropLast.js":
/*!********************************************!*\
  !*** ./node_modules/ramda/src/dropLast.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");

var _dispatchable = /*#__PURE__*/__webpack_require__(/*! ./internal/_dispatchable */ "./node_modules/ramda/src/internal/_dispatchable.js");

var _dropLast = /*#__PURE__*/__webpack_require__(/*! ./internal/_dropLast */ "./node_modules/ramda/src/internal/_dropLast.js");

var _xdropLast = /*#__PURE__*/__webpack_require__(/*! ./internal/_xdropLast */ "./node_modules/ramda/src/internal/_xdropLast.js");
/**
 * Returns a list containing all but the last `n` elements of the given `list`.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category List
 * @sig Number -> [a] -> [a]
 * @sig Number -> String -> String
 * @param {Number} n The number of elements of `list` to skip.
 * @param {Array} list The list of elements to consider.
 * @return {Array} A copy of the list with only the first `list.length - n` elements
 * @see R.takeLast, R.drop, R.dropWhile, R.dropLastWhile
 * @example
 *
 *      R.dropLast(1, ['foo', 'bar', 'baz']); //=> ['foo', 'bar']
 *      R.dropLast(2, ['foo', 'bar', 'baz']); //=> ['foo']
 *      R.dropLast(3, ['foo', 'bar', 'baz']); //=> []
 *      R.dropLast(4, ['foo', 'bar', 'baz']); //=> []
 *      R.dropLast(3, 'ramda');               //=> 'ra'
 */


var dropLast = /*#__PURE__*/_curry2( /*#__PURE__*/_dispatchable([], _xdropLast, _dropLast));

module.exports = dropLast;

/***/ }),

/***/ "./node_modules/ramda/src/dropLastWhile.js":
/*!*************************************************!*\
  !*** ./node_modules/ramda/src/dropLastWhile.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");

var _dispatchable = /*#__PURE__*/__webpack_require__(/*! ./internal/_dispatchable */ "./node_modules/ramda/src/internal/_dispatchable.js");

var _dropLastWhile = /*#__PURE__*/__webpack_require__(/*! ./internal/_dropLastWhile */ "./node_modules/ramda/src/internal/_dropLastWhile.js");

var _xdropLastWhile = /*#__PURE__*/__webpack_require__(/*! ./internal/_xdropLastWhile */ "./node_modules/ramda/src/internal/_xdropLastWhile.js");
/**
 * Returns a new list excluding all the tailing elements of a given list which
 * satisfy the supplied predicate function. It passes each value from the right
 * to the supplied predicate function, skipping elements until the predicate
 * function returns a `falsy` value. The predicate function is applied to one argument:
 * *(value)*.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> [a]
 * @sig (a -> Boolean) -> String -> String
 * @param {Function} predicate The function to be called on each element
 * @param {Array} xs The collection to iterate over.
 * @return {Array} A new array without any trailing elements that return `falsy` values from the `predicate`.
 * @see R.takeLastWhile, R.addIndex, R.drop, R.dropWhile
 * @example
 *
 *      const lteThree = x => x <= 3;
 *
 *      R.dropLastWhile(lteThree, [1, 2, 3, 4, 3, 2, 1]); //=> [1, 2, 3, 4]
 *
 *      R.dropLastWhile(x => x !== 'd' , 'Ramda'); //=> 'Ramd'
 */


var dropLastWhile = /*#__PURE__*/_curry2( /*#__PURE__*/_dispatchable([], _xdropLastWhile, _dropLastWhile));

module.exports = dropLastWhile;

/***/ }),

/***/ "./node_modules/ramda/src/dropRepeats.js":
/*!***********************************************!*\
  !*** ./node_modules/ramda/src/dropRepeats.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry1 */ "./node_modules/ramda/src/internal/_curry1.js");

var _dispatchable = /*#__PURE__*/__webpack_require__(/*! ./internal/_dispatchable */ "./node_modules/ramda/src/internal/_dispatchable.js");

var _xdropRepeatsWith = /*#__PURE__*/__webpack_require__(/*! ./internal/_xdropRepeatsWith */ "./node_modules/ramda/src/internal/_xdropRepeatsWith.js");

var dropRepeatsWith = /*#__PURE__*/__webpack_require__(/*! ./dropRepeatsWith */ "./node_modules/ramda/src/dropRepeatsWith.js");

var equals = /*#__PURE__*/__webpack_require__(/*! ./equals */ "./node_modules/ramda/src/equals.js");
/**
 * Returns a new list without any consecutively repeating elements.
 * [`R.equals`](#equals) is used to determine equality.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category List
 * @sig [a] -> [a]
 * @param {Array} list The array to consider.
 * @return {Array} `list` without repeating elements.
 * @see R.transduce
 * @example
 *
 *     R.dropRepeats([1, 1, 1, 2, 3, 4, 4, 2, 2]); //=> [1, 2, 3, 4, 2]
 */


var dropRepeats = /*#__PURE__*/_curry1( /*#__PURE__*/_dispatchable([], /*#__PURE__*/_xdropRepeatsWith(equals), /*#__PURE__*/dropRepeatsWith(equals)));

module.exports = dropRepeats;

/***/ }),

/***/ "./node_modules/ramda/src/dropRepeatsWith.js":
/*!***************************************************!*\
  !*** ./node_modules/ramda/src/dropRepeatsWith.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");

var _dispatchable = /*#__PURE__*/__webpack_require__(/*! ./internal/_dispatchable */ "./node_modules/ramda/src/internal/_dispatchable.js");

var _xdropRepeatsWith = /*#__PURE__*/__webpack_require__(/*! ./internal/_xdropRepeatsWith */ "./node_modules/ramda/src/internal/_xdropRepeatsWith.js");

var last = /*#__PURE__*/__webpack_require__(/*! ./last */ "./node_modules/ramda/src/last.js");
/**
 * Returns a new list without any consecutively repeating elements. Equality is
 * determined by applying the supplied predicate to each pair of consecutive elements. The
 * first element in a series of equal elements will be preserved.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category List
 * @sig ((a, a) -> Boolean) -> [a] -> [a]
 * @param {Function} pred A predicate used to test whether two items are equal.
 * @param {Array} list The array to consider.
 * @return {Array} `list` without repeating elements.
 * @see R.transduce
 * @example
 *
 *      const l = [1, -1, 1, 3, 4, -4, -4, -5, 5, 3, 3];
 *      R.dropRepeatsWith(R.eqBy(Math.abs), l); //=> [1, 3, 4, -5, 3]
 */


var dropRepeatsWith = /*#__PURE__*/_curry2( /*#__PURE__*/_dispatchable([], _xdropRepeatsWith, function dropRepeatsWith(pred, list) {
  var result = [];
  var idx = 1;
  var len = list.length;

  if (len !== 0) {
    result[0] = list[0];

    while (idx < len) {
      if (!pred(last(result), list[idx])) {
        result[result.length] = list[idx];
      }

      idx += 1;
    }
  }

  return result;
}));

module.exports = dropRepeatsWith;

/***/ }),

/***/ "./node_modules/ramda/src/dropWhile.js":
/*!*********************************************!*\
  !*** ./node_modules/ramda/src/dropWhile.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");

var _dispatchable = /*#__PURE__*/__webpack_require__(/*! ./internal/_dispatchable */ "./node_modules/ramda/src/internal/_dispatchable.js");

var _xdropWhile = /*#__PURE__*/__webpack_require__(/*! ./internal/_xdropWhile */ "./node_modules/ramda/src/internal/_xdropWhile.js");

var slice = /*#__PURE__*/__webpack_require__(/*! ./slice */ "./node_modules/ramda/src/slice.js");
/**
 * Returns a new list excluding the leading elements of a given list which
 * satisfy the supplied predicate function. It passes each value to the supplied
 * predicate function, skipping elements while the predicate function returns
 * `true`. The predicate function is applied to one argument: *(value)*.
 *
 * Dispatches to the `dropWhile` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> [a]
 * @sig (a -> Boolean) -> String -> String
 * @param {Function} fn The function called per iteration.
 * @param {Array} xs The collection to iterate over.
 * @return {Array} A new array.
 * @see R.takeWhile, R.transduce, R.addIndex
 * @example
 *
 *      const lteTwo = x => x <= 2;
 *
 *      R.dropWhile(lteTwo, [1, 2, 3, 4, 3, 2, 1]); //=> [3, 4, 3, 2, 1]
 *
 *      R.dropWhile(x => x !== 'd' , 'Ramda'); //=> 'da'
 */


var dropWhile = /*#__PURE__*/_curry2( /*#__PURE__*/_dispatchable(['dropWhile'], _xdropWhile, function dropWhile(pred, xs) {
  var idx = 0;
  var len = xs.length;

  while (idx < len && pred(xs[idx])) {
    idx += 1;
  }

  return slice(idx, Infinity, xs);
}));

module.exports = dropWhile;

/***/ }),

/***/ "./node_modules/ramda/src/either.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/src/either.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");

var _isFunction = /*#__PURE__*/__webpack_require__(/*! ./internal/_isFunction */ "./node_modules/ramda/src/internal/_isFunction.js");

var lift = /*#__PURE__*/__webpack_require__(/*! ./lift */ "./node_modules/ramda/src/lift.js");

var or = /*#__PURE__*/__webpack_require__(/*! ./or */ "./node_modules/ramda/src/or.js");
/**
 * A function wrapping calls to the two functions in an `||` operation,
 * returning the result of the first function if it is truth-y and the result
 * of the second function otherwise. Note that this is short-circuited,
 * meaning that the second function will not be invoked if the first returns a
 * truth-y value.
 *
 * In addition to functions, `R.either` also accepts any fantasy-land compatible
 * applicative functor.
 *
 * @func
 * @memberOf R
 * @since v0.12.0
 * @category Logic
 * @sig (*... -> Boolean) -> (*... -> Boolean) -> (*... -> Boolean)
 * @param {Function} f a predicate
 * @param {Function} g another predicate
 * @return {Function} a function that applies its arguments to `f` and `g` and `||`s their outputs together.
 * @see R.or
 * @example
 *
 *      const gt10 = x => x > 10;
 *      const even = x => x % 2 === 0;
 *      const f = R.either(gt10, even);
 *      f(101); //=> true
 *      f(8); //=> true
 *
 *      R.either(Maybe.Just(false), Maybe.Just(55)); // => Maybe.Just(55)
 *      R.either([false, false, 'a'], [11]) // => [11, 11, "a"]
 */


var either = /*#__PURE__*/_curry2(function either(f, g) {
  return _isFunction(f) ? function _either() {
    return f.apply(this, arguments) || g.apply(this, arguments);
  } : lift(or)(f, g);
});

module.exports = either;

/***/ }),

/***/ "./node_modules/ramda/src/empty.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/src/empty.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry1 */ "./node_modules/ramda/src/internal/_curry1.js");

var _isArguments = /*#__PURE__*/__webpack_require__(/*! ./internal/_isArguments */ "./node_modules/ramda/src/internal/_isArguments.js");

var _isArray = /*#__PURE__*/__webpack_require__(/*! ./internal/_isArray */ "./node_modules/ramda/src/internal/_isArray.js");

var _isObject = /*#__PURE__*/__webpack_require__(/*! ./internal/_isObject */ "./node_modules/ramda/src/internal/_isObject.js");

var _isString = /*#__PURE__*/__webpack_require__(/*! ./internal/_isString */ "./node_modules/ramda/src/internal/_isString.js");
/**
 * Returns the empty value of its argument's type. Ramda defines the empty
 * value of Array (`[]`), Object (`{}`), String (`''`), and Arguments. Other
 * types are supported if they define `<Type>.empty`,
 * `<Type>.prototype.empty` or implement the
 * [FantasyLand Monoid spec](https://github.com/fantasyland/fantasy-land#monoid).
 *
 * Dispatches to the `empty` method of the first argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category Function
 * @sig a -> a
 * @param {*} x
 * @return {*}
 * @example
 *
 *      R.empty(Just(42));      //=> Nothing()
 *      R.empty([1, 2, 3]);     //=> []
 *      R.empty('unicorns');    //=> ''
 *      R.empty({x: 1, y: 2});  //=> {}
 */


var empty = /*#__PURE__*/_curry1(function empty(x) {
  return x != null && typeof x['fantasy-land/empty'] === 'function' ? x['fantasy-land/empty']() : x != null && x.constructor != null && typeof x.constructor['fantasy-land/empty'] === 'function' ? x.constructor['fantasy-land/empty']() : x != null && typeof x.empty === 'function' ? x.empty() : x != null && x.constructor != null && typeof x.constructor.empty === 'function' ? x.constructor.empty() : _isArray(x) ? [] : _isString(x) ? '' : _isObject(x) ? {} : _isArguments(x) ? function () {
    return arguments;
  }() : void 0 // else
  ;
});

module.exports = empty;

/***/ }),

/***/ "./node_modules/ramda/src/endsWith.js":
/*!********************************************!*\
  !*** ./node_modules/ramda/src/endsWith.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");

var equals = /*#__PURE__*/__webpack_require__(/*! ./equals */ "./node_modules/ramda/src/equals.js");

var takeLast = /*#__PURE__*/__webpack_require__(/*! ./takeLast */ "./node_modules/ramda/src/takeLast.js");
/**
 * Checks if a list ends with the provided sublist.
 *
 * Similarly, checks if a string ends with the provided substring.
 *
 * @func
 * @memberOf R
 * @since v0.24.0
 * @category List
 * @sig [a] -> [a] -> Boolean
 * @sig String -> String -> Boolean
 * @param {*} suffix
 * @param {*} list
 * @return {Boolean}
 * @see R.startsWith
 * @example
 *
 *      R.endsWith('c', 'abc')                //=> true
 *      R.endsWith('b', 'abc')                //=> false
 *      R.endsWith(['c'], ['a', 'b', 'c'])    //=> true
 *      R.endsWith(['b'], ['a', 'b', 'c'])    //=> false
 */


var endsWith = /*#__PURE__*/_curry2(function (suffix, list) {
  return equals(takeLast(suffix.length, list), suffix);
});

module.exports = endsWith;

/***/ }),

/***/ "./node_modules/ramda/src/eqBy.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/src/eqBy.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry3 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry3 */ "./node_modules/ramda/src/internal/_curry3.js");

var equals = /*#__PURE__*/__webpack_require__(/*! ./equals */ "./node_modules/ramda/src/equals.js");
/**
 * Takes a function and two values in its domain and returns `true` if the
 * values map to the same value in the codomain; `false` otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.18.0
 * @category Relation
 * @sig (a -> b) -> a -> a -> Boolean
 * @param {Function} f
 * @param {*} x
 * @param {*} y
 * @return {Boolean}
 * @example
 *
 *      R.eqBy(Math.abs, 5, -5); //=> true
 */


var eqBy = /*#__PURE__*/_curry3(function eqBy(f, x, y) {
  return equals(f(x), f(y));
});

module.exports = eqBy;

/***/ }),

/***/ "./node_modules/ramda/src/eqProps.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/src/eqProps.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry3 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry3 */ "./node_modules/ramda/src/internal/_curry3.js");

var equals = /*#__PURE__*/__webpack_require__(/*! ./equals */ "./node_modules/ramda/src/equals.js");
/**
 * Reports whether two objects have the same value, in [`R.equals`](#equals)
 * terms, for the specified property. Useful as a curried predicate.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig k -> {k: v} -> {k: v} -> Boolean
 * @param {String} prop The name of the property to compare
 * @param {Object} obj1
 * @param {Object} obj2
 * @return {Boolean}
 *
 * @example
 *
 *      const o1 = { a: 1, b: 2, c: 3, d: 4 };
 *      const o2 = { a: 10, b: 20, c: 3, d: 40 };
 *      R.eqProps('a', o1, o2); //=> false
 *      R.eqProps('c', o1, o2); //=> true
 */


var eqProps = /*#__PURE__*/_curry3(function eqProps(prop, obj1, obj2) {
  return equals(obj1[prop], obj2[prop]);
});

module.exports = eqProps;

/***/ }),

/***/ "./node_modules/ramda/src/equals.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/src/equals.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");

var _equals = /*#__PURE__*/__webpack_require__(/*! ./internal/_equals */ "./node_modules/ramda/src/internal/_equals.js");
/**
 * Returns `true` if its arguments are equivalent, `false` otherwise. Handles
 * cyclical data structures.
 *
 * Dispatches symmetrically to the `equals` methods of both arguments, if
 * present.
 *
 * @func
 * @memberOf R
 * @since v0.15.0
 * @category Relation
 * @sig a -> b -> Boolean
 * @param {*} a
 * @param {*} b
 * @return {Boolean}
 * @example
 *
 *      R.equals(1, 1); //=> true
 *      R.equals(1, '1'); //=> false
 *      R.equals([1, 2, 3], [1, 2, 3]); //=> true
 *
 *      const a = {}; a.v = a;
 *      const b = {}; b.v = b;
 *      R.equals(a, b); //=> true
 */


var equals = /*#__PURE__*/_curry2(function equals(a, b) {
  return _equals(a, b, [], []);
});

module.exports = equals;

/***/ }),

/***/ "./node_modules/ramda/src/evolve.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/src/evolve.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");
/**
 * Creates a new object by recursively evolving a shallow copy of `object`,
 * according to the `transformation` functions. All non-primitive properties
 * are copied by reference.
 *
 * A `transformation` function will not be invoked if its corresponding key
 * does not exist in the evolved object.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Object
 * @sig {k: (v -> v)} -> {k: v} -> {k: v}
 * @param {Object} transformations The object specifying transformation functions to apply
 *        to the object.
 * @param {Object} object The object to be transformed.
 * @return {Object} The transformed object.
 * @example
 *
 *      const tomato = {firstName: '  Tomato ', data: {elapsed: 100, remaining: 1400}, id:123};
 *      const transformations = {
 *        firstName: R.trim,
 *        lastName: R.trim, // Will not get invoked.
 *        data: {elapsed: R.add(1), remaining: R.add(-1)}
 *      };
 *      R.evolve(transformations, tomato); //=> {firstName: 'Tomato', data: {elapsed: 101, remaining: 1399}, id:123}
 */


var evolve = /*#__PURE__*/_curry2(function evolve(transformations, object) {
  var result = object instanceof Array ? [] : {};
  var transformation, key, type;

  for (key in object) {
    transformation = transformations[key];
    type = typeof transformation;
    result[key] = type === 'function' ? transformation(object[key]) : transformation && type === 'object' ? evolve(transformation, object[key]) : object[key];
  }

  return result;
});

module.exports = evolve;

/***/ }),

/***/ "./node_modules/ramda/src/filter.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/src/filter.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");

var _dispatchable = /*#__PURE__*/__webpack_require__(/*! ./internal/_dispatchable */ "./node_modules/ramda/src/internal/_dispatchable.js");

var _filter = /*#__PURE__*/__webpack_require__(/*! ./internal/_filter */ "./node_modules/ramda/src/internal/_filter.js");

var _isObject = /*#__PURE__*/__webpack_require__(/*! ./internal/_isObject */ "./node_modules/ramda/src/internal/_isObject.js");

var _reduce = /*#__PURE__*/__webpack_require__(/*! ./internal/_reduce */ "./node_modules/ramda/src/internal/_reduce.js");

var _xfilter = /*#__PURE__*/__webpack_require__(/*! ./internal/_xfilter */ "./node_modules/ramda/src/internal/_xfilter.js");

var keys = /*#__PURE__*/__webpack_require__(/*! ./keys */ "./node_modules/ramda/src/keys.js");
/**
 * Takes a predicate and a `Filterable`, and returns a new filterable of the
 * same type containing the members of the given filterable which satisfy the
 * given predicate. Filterable objects include plain objects or any object
 * that has a filter method such as `Array`.
 *
 * Dispatches to the `filter` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Filterable f => (a -> Boolean) -> f a -> f a
 * @param {Function} pred
 * @param {Array} filterable
 * @return {Array} Filterable
 * @see R.reject, R.transduce, R.addIndex
 * @example
 *
 *      const isEven = n => n % 2 === 0;
 *
 *      R.filter(isEven, [1, 2, 3, 4]); //=> [2, 4]
 *
 *      R.filter(isEven, {a: 1, b: 2, c: 3, d: 4}); //=> {b: 2, d: 4}
 */


var filter = /*#__PURE__*/_curry2( /*#__PURE__*/_dispatchable(['filter'], _xfilter, function (pred, filterable) {
  return _isObject(filterable) ? _reduce(function (acc, key) {
    if (pred(filterable[key])) {
      acc[key] = filterable[key];
    }

    return acc;
  }, {}, keys(filterable)) : // else
  _filter(pred, filterable);
}));

module.exports = filter;

/***/ }),

/***/ "./node_modules/ramda/src/find.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/src/find.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");

var _dispatchable = /*#__PURE__*/__webpack_require__(/*! ./internal/_dispatchable */ "./node_modules/ramda/src/internal/_dispatchable.js");

var _xfind = /*#__PURE__*/__webpack_require__(/*! ./internal/_xfind */ "./node_modules/ramda/src/internal/_xfind.js");
/**
 * Returns the first element of the list which matches the predicate, or
 * `undefined` if no element matches.
 *
 * Dispatches to the `find` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> a | undefined
 * @param {Function} fn The predicate function used to determine if the element is the
 *        desired one.
 * @param {Array} list The array to consider.
 * @return {Object} The element found, or `undefined`.
 * @see R.transduce
 * @example
 *
 *      const xs = [{a: 1}, {a: 2}, {a: 3}];
 *      R.find(R.propEq('a', 2))(xs); //=> {a: 2}
 *      R.find(R.propEq('a', 4))(xs); //=> undefined
 */


var find = /*#__PURE__*/_curry2( /*#__PURE__*/_dispatchable(['find'], _xfind, function find(fn, list) {
  var idx = 0;
  var len = list.length;

  while (idx < len) {
    if (fn(list[idx])) {
      return list[idx];
    }

    idx += 1;
  }
}));

module.exports = find;

/***/ }),

/***/ "./node_modules/ramda/src/findIndex.js":
/*!*********************************************!*\
  !*** ./node_modules/ramda/src/findIndex.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");

var _dispatchable = /*#__PURE__*/__webpack_require__(/*! ./internal/_dispatchable */ "./node_modules/ramda/src/internal/_dispatchable.js");

var _xfindIndex = /*#__PURE__*/__webpack_require__(/*! ./internal/_xfindIndex */ "./node_modules/ramda/src/internal/_xfindIndex.js");
/**
 * Returns the index of the first element of the list which matches the
 * predicate, or `-1` if no element matches.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.1
 * @category List
 * @sig (a -> Boolean) -> [a] -> Number
 * @param {Function} fn The predicate function used to determine if the element is the
 * desired one.
 * @param {Array} list The array to consider.
 * @return {Number} The index of the element found, or `-1`.
 * @see R.transduce
 * @example
 *
 *      const xs = [{a: 1}, {a: 2}, {a: 3}];
 *      R.findIndex(R.propEq('a', 2))(xs); //=> 1
 *      R.findIndex(R.propEq('a', 4))(xs); //=> -1
 */


var findIndex = /*#__PURE__*/_curry2( /*#__PURE__*/_dispatchable([], _xfindIndex, function findIndex(fn, list) {
  var idx = 0;
  var len = list.length;

  while (idx < len) {
    if (fn(list[idx])) {
      return idx;
    }

    idx += 1;
  }

  return -1;
}));

module.exports = findIndex;

/***/ }),

/***/ "./node_modules/ramda/src/findLast.js":
/*!********************************************!*\
  !*** ./node_modules/ramda/src/findLast.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");

var _dispatchable = /*#__PURE__*/__webpack_require__(/*! ./internal/_dispatchable */ "./node_modules/ramda/src/internal/_dispatchable.js");

var _xfindLast = /*#__PURE__*/__webpack_require__(/*! ./internal/_xfindLast */ "./node_modules/ramda/src/internal/_xfindLast.js");
/**
 * Returns the last element of the list which matches the predicate, or
 * `undefined` if no element matches.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.1
 * @category List
 * @sig (a -> Boolean) -> [a] -> a | undefined
 * @param {Function} fn The predicate function used to determine if the element is the
 * desired one.
 * @param {Array} list The array to consider.
 * @return {Object} The element found, or `undefined`.
 * @see R.transduce
 * @example
 *
 *      const xs = [{a: 1, b: 0}, {a:1, b: 1}];
 *      R.findLast(R.propEq('a', 1))(xs); //=> {a: 1, b: 1}
 *      R.findLast(R.propEq('a', 4))(xs); //=> undefined
 */


var findLast = /*#__PURE__*/_curry2( /*#__PURE__*/_dispatchable([], _xfindLast, function findLast(fn, list) {
  var idx = list.length - 1;

  while (idx >= 0) {
    if (fn(list[idx])) {
      return list[idx];
    }

    idx -= 1;
  }
}));

module.exports = findLast;

/***/ }),

/***/ "./node_modules/ramda/src/findLastIndex.js":
/*!*************************************************!*\
  !*** ./node_modules/ramda/src/findLastIndex.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");

var _dispatchable = /*#__PURE__*/__webpack_require__(/*! ./internal/_dispatchable */ "./node_modules/ramda/src/internal/_dispatchable.js");

var _xfindLastIndex = /*#__PURE__*/__webpack_require__(/*! ./internal/_xfindLastIndex */ "./node_modules/ramda/src/internal/_xfindLastIndex.js");
/**
 * Returns the index of the last element of the list which matches the
 * predicate, or `-1` if no element matches.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.1
 * @category List
 * @sig (a -> Boolean) -> [a] -> Number
 * @param {Function} fn The predicate function used to determine if the element is the
 * desired one.
 * @param {Array} list The array to consider.
 * @return {Number} The index of the element found, or `-1`.
 * @see R.transduce
 * @example
 *
 *      const xs = [{a: 1, b: 0}, {a:1, b: 1}];
 *      R.findLastIndex(R.propEq('a', 1))(xs); //=> 1
 *      R.findLastIndex(R.propEq('a', 4))(xs); //=> -1
 */


var findLastIndex = /*#__PURE__*/_curry2( /*#__PURE__*/_dispatchable([], _xfindLastIndex, function findLastIndex(fn, list) {
  var idx = list.length - 1;

  while (idx >= 0) {
    if (fn(list[idx])) {
      return idx;
    }

    idx -= 1;
  }

  return -1;
}));

module.exports = findLastIndex;

/***/ }),

/***/ "./node_modules/ramda/src/flatten.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/src/flatten.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry1 */ "./node_modules/ramda/src/internal/_curry1.js");

var _makeFlat = /*#__PURE__*/__webpack_require__(/*! ./internal/_makeFlat */ "./node_modules/ramda/src/internal/_makeFlat.js");
/**
 * Returns a new list by pulling every item out of it (and all its sub-arrays)
 * and putting them in a new array, depth-first.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [b]
 * @param {Array} list The array to consider.
 * @return {Array} The flattened list.
 * @see R.unnest
 * @example
 *
 *      R.flatten([1, 2, [3, 4], 5, [6, [7, 8, [9, [10, 11], 12]]]]);
 *      //=> [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
 */


var flatten = /*#__PURE__*/_curry1( /*#__PURE__*/_makeFlat(true));

module.exports = flatten;

/***/ }),

/***/ "./node_modules/ramda/src/flip.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/src/flip.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry1 */ "./node_modules/ramda/src/internal/_curry1.js");

var curryN = /*#__PURE__*/__webpack_require__(/*! ./curryN */ "./node_modules/ramda/src/curryN.js");
/**
 * Returns a new function much like the supplied one, except that the first two
 * arguments' order is reversed.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig ((a, b, c, ...) -> z) -> (b -> a -> c -> ... -> z)
 * @param {Function} fn The function to invoke with its first two parameters reversed.
 * @return {*} The result of invoking `fn` with its first two parameters' order reversed.
 * @example
 *
 *      const mergeThree = (a, b, c) => [].concat(a, b, c);
 *
 *      mergeThree(1, 2, 3); //=> [1, 2, 3]
 *
 *      R.flip(mergeThree)(1, 2, 3); //=> [2, 1, 3]
 * @symb R.flip(f)(a, b, c) = f(b, a, c)
 */


var flip = /*#__PURE__*/_curry1(function flip(fn) {
  return curryN(fn.length, function (a, b) {
    var args = Array.prototype.slice.call(arguments, 0);
    args[0] = b;
    args[1] = a;
    return fn.apply(this, args);
  });
});

module.exports = flip;

/***/ }),

/***/ "./node_modules/ramda/src/forEach.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/src/forEach.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _checkForMethod = /*#__PURE__*/__webpack_require__(/*! ./internal/_checkForMethod */ "./node_modules/ramda/src/internal/_checkForMethod.js");

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");
/**
 * Iterate over an input `list`, calling a provided function `fn` for each
 * element in the list.
 *
 * `fn` receives one argument: *(value)*.
 *
 * Note: `R.forEach` does not skip deleted or unassigned indices (sparse
 * arrays), unlike the native `Array.prototype.forEach` method. For more
 * details on this behavior, see:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach#Description
 *
 * Also note that, unlike `Array.prototype.forEach`, Ramda's `forEach` returns
 * the original array. In some libraries this function is named `each`.
 *
 * Dispatches to the `forEach` method of the second argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.1.1
 * @category List
 * @sig (a -> *) -> [a] -> [a]
 * @param {Function} fn The function to invoke. Receives one argument, `value`.
 * @param {Array} list The list to iterate over.
 * @return {Array} The original list.
 * @see R.addIndex
 * @example
 *
 *      const printXPlusFive = x => console.log(x + 5);
 *      R.forEach(printXPlusFive, [1, 2, 3]); //=> [1, 2, 3]
 *      // logs 6
 *      // logs 7
 *      // logs 8
 * @symb R.forEach(f, [a, b, c]) = [a, b, c]
 */


var forEach = /*#__PURE__*/_curry2( /*#__PURE__*/_checkForMethod('forEach', function forEach(fn, list) {
  var len = list.length;
  var idx = 0;

  while (idx < len) {
    fn(list[idx]);
    idx += 1;
  }

  return list;
}));

module.exports = forEach;

/***/ }),

/***/ "./node_modules/ramda/src/forEachObjIndexed.js":
/*!*****************************************************!*\
  !*** ./node_modules/ramda/src/forEachObjIndexed.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");

var keys = /*#__PURE__*/__webpack_require__(/*! ./keys */ "./node_modules/ramda/src/keys.js");
/**
 * Iterate over an input `object`, calling a provided function `fn` for each
 * key and value in the object.
 *
 * `fn` receives three argument: *(value, key, obj)*.
 *
 * @func
 * @memberOf R
 * @since v0.23.0
 * @category Object
 * @sig ((a, String, StrMap a) -> Any) -> StrMap a -> StrMap a
 * @param {Function} fn The function to invoke. Receives three argument, `value`, `key`, `obj`.
 * @param {Object} obj The object to iterate over.
 * @return {Object} The original object.
 * @example
 *
 *      const printKeyConcatValue = (value, key) => console.log(key + ':' + value);
 *      R.forEachObjIndexed(printKeyConcatValue, {x: 1, y: 2}); //=> {x: 1, y: 2}
 *      // logs x:1
 *      // logs y:2
 * @symb R.forEachObjIndexed(f, {x: a, y: b}) = {x: a, y: b}
 */


var forEachObjIndexed = /*#__PURE__*/_curry2(function forEachObjIndexed(fn, obj) {
  var keyList = keys(obj);
  var idx = 0;

  while (idx < keyList.length) {
    var key = keyList[idx];
    fn(obj[key], key, obj);
    idx += 1;
  }

  return obj;
});

module.exports = forEachObjIndexed;

/***/ }),

/***/ "./node_modules/ramda/src/fromPairs.js":
/*!*********************************************!*\
  !*** ./node_modules/ramda/src/fromPairs.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry1 */ "./node_modules/ramda/src/internal/_curry1.js");
/**
 * Creates a new object from a list key-value pairs. If a key appears in
 * multiple pairs, the rightmost pair is included in the object.
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category List
 * @sig [[k,v]] -> {k: v}
 * @param {Array} pairs An array of two-element arrays that will be the keys and values of the output object.
 * @return {Object} The object made by pairing up `keys` and `values`.
 * @see R.toPairs, R.pair
 * @example
 *
 *      R.fromPairs([['a', 1], ['b', 2], ['c', 3]]); //=> {a: 1, b: 2, c: 3}
 */


var fromPairs = /*#__PURE__*/_curry1(function fromPairs(pairs) {
  var result = {};
  var idx = 0;

  while (idx < pairs.length) {
    result[pairs[idx][0]] = pairs[idx][1];
    idx += 1;
  }

  return result;
});

module.exports = fromPairs;

/***/ }),

/***/ "./node_modules/ramda/src/groupBy.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/src/groupBy.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _checkForMethod = /*#__PURE__*/__webpack_require__(/*! ./internal/_checkForMethod */ "./node_modules/ramda/src/internal/_checkForMethod.js");

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");

var reduceBy = /*#__PURE__*/__webpack_require__(/*! ./reduceBy */ "./node_modules/ramda/src/reduceBy.js");
/**
 * Splits a list into sub-lists stored in an object, based on the result of
 * calling a String-returning function on each element, and grouping the
 * results according to values returned.
 *
 * Dispatches to the `groupBy` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig (a -> String) -> [a] -> {String: [a]}
 * @param {Function} fn Function :: a -> String
 * @param {Array} list The array to group
 * @return {Object} An object with the output of `fn` for keys, mapped to arrays of elements
 *         that produced that key when passed to `fn`.
 * @see R.reduceBy, R.transduce
 * @example
 *
 *      const byGrade = R.groupBy(function(student) {
 *        const score = student.score;
 *        return score < 65 ? 'F' :
 *               score < 70 ? 'D' :
 *               score < 80 ? 'C' :
 *               score < 90 ? 'B' : 'A';
 *      });
 *      const students = [{name: 'Abby', score: 84},
 *                      {name: 'Eddy', score: 58},
 *                      // ...
 *                      {name: 'Jack', score: 69}];
 *      byGrade(students);
 *      // {
 *      //   'A': [{name: 'Dianne', score: 99}],
 *      //   'B': [{name: 'Abby', score: 84}]
 *      //   // ...,
 *      //   'F': [{name: 'Eddy', score: 58}]
 *      // }
 */


var groupBy = /*#__PURE__*/_curry2( /*#__PURE__*/_checkForMethod('groupBy', /*#__PURE__*/reduceBy(function (acc, item) {
  if (acc == null) {
    acc = [];
  }

  acc.push(item);
  return acc;
}, null)));

module.exports = groupBy;

/***/ }),

/***/ "./node_modules/ramda/src/groupWith.js":
/*!*********************************************!*\
  !*** ./node_modules/ramda/src/groupWith.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");
/**
 * Takes a list and returns a list of lists where each sublist's elements are
 * all satisfied pairwise comparison according to the provided function.
 * Only adjacent elements are passed to the comparison function.
 *
 * @func
 * @memberOf R
 * @since v0.21.0
 * @category List
 * @sig ((a, a) → Boolean) → [a] → [[a]]
 * @param {Function} fn Function for determining whether two given (adjacent)
 *        elements should be in the same group
 * @param {Array} list The array to group. Also accepts a string, which will be
 *        treated as a list of characters.
 * @return {List} A list that contains sublists of elements,
 *         whose concatenations are equal to the original list.
 * @example
 *
 * R.groupWith(R.equals, [0, 1, 1, 2, 3, 5, 8, 13, 21])
 * //=> [[0], [1, 1], [2], [3], [5], [8], [13], [21]]
 *
 * R.groupWith((a, b) => a + 1 === b, [0, 1, 1, 2, 3, 5, 8, 13, 21])
 * //=> [[0, 1], [1, 2, 3], [5], [8], [13], [21]]
 *
 * R.groupWith((a, b) => a % 2 === b % 2, [0, 1, 1, 2, 3, 5, 8, 13, 21])
 * //=> [[0], [1, 1], [2], [3, 5], [8], [13, 21]]
 *
 * R.groupWith(R.eqBy(isVowel), 'aestiou')
 * //=> ['ae', 'st', 'iou']
 */


var groupWith = /*#__PURE__*/_curry2(function (fn, list) {
  var res = [];
  var idx = 0;
  var len = list.length;

  while (idx < len) {
    var nextidx = idx + 1;

    while (nextidx < len && fn(list[nextidx - 1], list[nextidx])) {
      nextidx += 1;
    }

    res.push(list.slice(idx, nextidx));
    idx = nextidx;
  }

  return res;
});

module.exports = groupWith;

/***/ }),

/***/ "./node_modules/ramda/src/gt.js":
/*!**************************************!*\
  !*** ./node_modules/ramda/src/gt.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");
/**
 * Returns `true` if the first argument is greater than the second; `false`
 * otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig Ord a => a -> a -> Boolean
 * @param {*} a
 * @param {*} b
 * @return {Boolean}
 * @see R.lt
 * @example
 *
 *      R.gt(2, 1); //=> true
 *      R.gt(2, 2); //=> false
 *      R.gt(2, 3); //=> false
 *      R.gt('a', 'z'); //=> false
 *      R.gt('z', 'a'); //=> true
 */


var gt = /*#__PURE__*/_curry2(function gt(a, b) {
  return a > b;
});

module.exports = gt;

/***/ }),

/***/ "./node_modules/ramda/src/gte.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/src/gte.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");
/**
 * Returns `true` if the first argument is greater than or equal to the second;
 * `false` otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig Ord a => a -> a -> Boolean
 * @param {Number} a
 * @param {Number} b
 * @return {Boolean}
 * @see R.lte
 * @example
 *
 *      R.gte(2, 1); //=> true
 *      R.gte(2, 2); //=> true
 *      R.gte(2, 3); //=> false
 *      R.gte('a', 'z'); //=> false
 *      R.gte('z', 'a'); //=> true
 */


var gte = /*#__PURE__*/_curry2(function gte(a, b) {
  return a >= b;
});

module.exports = gte;

/***/ }),

/***/ "./node_modules/ramda/src/has.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/src/has.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");

var hasPath = /*#__PURE__*/__webpack_require__(/*! ./hasPath */ "./node_modules/ramda/src/hasPath.js");
/**
 * Returns whether or not an object has an own property with the specified name
 *
 * @func
 * @memberOf R
 * @since v0.7.0
 * @category Object
 * @sig s -> {s: x} -> Boolean
 * @param {String} prop The name of the property to check for.
 * @param {Object} obj The object to query.
 * @return {Boolean} Whether the property exists.
 * @example
 *
 *      const hasName = R.has('name');
 *      hasName({name: 'alice'});   //=> true
 *      hasName({name: 'bob'});     //=> true
 *      hasName({});                //=> false
 *
 *      const point = {x: 0, y: 0};
 *      const pointHas = R.has(R.__, point);
 *      pointHas('x');  //=> true
 *      pointHas('y');  //=> true
 *      pointHas('z');  //=> false
 */


var has = /*#__PURE__*/_curry2(function has(prop, obj) {
  return hasPath([prop], obj);
});

module.exports = has;

/***/ }),

/***/ "./node_modules/ramda/src/hasIn.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/src/hasIn.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");
/**
 * Returns whether or not an object or its prototype chain has a property with
 * the specified name
 *
 * @func
 * @memberOf R
 * @since v0.7.0
 * @category Object
 * @sig s -> {s: x} -> Boolean
 * @param {String} prop The name of the property to check for.
 * @param {Object} obj The object to query.
 * @return {Boolean} Whether the property exists.
 * @example
 *
 *      function Rectangle(width, height) {
 *        this.width = width;
 *        this.height = height;
 *      }
 *      Rectangle.prototype.area = function() {
 *        return this.width * this.height;
 *      };
 *
 *      const square = new Rectangle(2, 2);
 *      R.hasIn('width', square);  //=> true
 *      R.hasIn('area', square);  //=> true
 */


var hasIn = /*#__PURE__*/_curry2(function hasIn(prop, obj) {
  return prop in obj;
});

module.exports = hasIn;

/***/ }),

/***/ "./node_modules/ramda/src/hasPath.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/src/hasPath.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");

var _has = /*#__PURE__*/__webpack_require__(/*! ./internal/_has */ "./node_modules/ramda/src/internal/_has.js");

var isNil = /*#__PURE__*/__webpack_require__(/*! ./isNil */ "./node_modules/ramda/src/isNil.js");
/**
 * Returns whether or not a path exists in an object. Only the object's
 * own properties are checked.
 *
 * @func
 * @memberOf R
 * @since v0.26.0
 * @category Object
 * @typedefn Idx = String | Int
 * @sig [Idx] -> {a} -> Boolean
 * @param {Array} path The path to use.
 * @param {Object} obj The object to check the path in.
 * @return {Boolean} Whether the path exists.
 * @see R.has
 * @example
 *
 *      R.hasPath(['a', 'b'], {a: {b: 2}});         // => true
 *      R.hasPath(['a', 'b'], {a: {b: undefined}}); // => true
 *      R.hasPath(['a', 'b'], {a: {c: 2}});         // => false
 *      R.hasPath(['a', 'b'], {});                  // => false
 */


var hasPath = /*#__PURE__*/_curry2(function hasPath(_path, obj) {
  if (_path.length === 0 || isNil(obj)) {
    return false;
  }

  var val = obj;
  var idx = 0;

  while (idx < _path.length) {
    if (!isNil(val) && _has(_path[idx], val)) {
      val = val[_path[idx]];
      idx += 1;
    } else {
      return false;
    }
  }

  return true;
});

module.exports = hasPath;

/***/ }),

/***/ "./node_modules/ramda/src/head.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/src/head.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var nth = /*#__PURE__*/__webpack_require__(/*! ./nth */ "./node_modules/ramda/src/nth.js");
/**
 * Returns the first element of the given list or string. In some libraries
 * this function is named `first`.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> a | Undefined
 * @sig String -> String
 * @param {Array|String} list
 * @return {*}
 * @see R.tail, R.init, R.last
 * @example
 *
 *      R.head(['fi', 'fo', 'fum']); //=> 'fi'
 *      R.head([]); //=> undefined
 *
 *      R.head('abc'); //=> 'a'
 *      R.head(''); //=> ''
 */


var head = /*#__PURE__*/nth(0);
module.exports = head;

/***/ }),

/***/ "./node_modules/ramda/src/identical.js":
/*!*********************************************!*\
  !*** ./node_modules/ramda/src/identical.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _objectIs = /*#__PURE__*/__webpack_require__(/*! ./internal/_objectIs */ "./node_modules/ramda/src/internal/_objectIs.js");

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");
/**
 * Returns true if its arguments are identical, false otherwise. Values are
 * identical if they reference the same memory. `NaN` is identical to `NaN`;
 * `0` and `-0` are not identical.
 *
 * Note this is merely a curried version of ES6 `Object.is`.
 *
 * @func
 * @memberOf R
 * @since v0.15.0
 * @category Relation
 * @sig a -> a -> Boolean
 * @param {*} a
 * @param {*} b
 * @return {Boolean}
 * @example
 *
 *      const o = {};
 *      R.identical(o, o); //=> true
 *      R.identical(1, 1); //=> true
 *      R.identical(1, '1'); //=> false
 *      R.identical([], []); //=> false
 *      R.identical(0, -0); //=> false
 *      R.identical(NaN, NaN); //=> true
 */


var identical = /*#__PURE__*/_curry2(_objectIs);

module.exports = identical;

/***/ }),

/***/ "./node_modules/ramda/src/identity.js":
/*!********************************************!*\
  !*** ./node_modules/ramda/src/identity.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry1 */ "./node_modules/ramda/src/internal/_curry1.js");

var _identity = /*#__PURE__*/__webpack_require__(/*! ./internal/_identity */ "./node_modules/ramda/src/internal/_identity.js");
/**
 * A function that does nothing but return the parameter supplied to it. Good
 * as a default or placeholder function.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig a -> a
 * @param {*} x The value to return.
 * @return {*} The input value, `x`.
 * @example
 *
 *      R.identity(1); //=> 1
 *
 *      const obj = {};
 *      R.identity(obj) === obj; //=> true
 * @symb R.identity(a) = a
 */


var identity = /*#__PURE__*/_curry1(_identity);

module.exports = identity;

/***/ }),

/***/ "./node_modules/ramda/src/ifElse.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/src/ifElse.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry3 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry3 */ "./node_modules/ramda/src/internal/_curry3.js");

var curryN = /*#__PURE__*/__webpack_require__(/*! ./curryN */ "./node_modules/ramda/src/curryN.js");
/**
 * Creates a function that will process either the `onTrue` or the `onFalse`
 * function depending upon the result of the `condition` predicate.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Logic
 * @sig (*... -> Boolean) -> (*... -> *) -> (*... -> *) -> (*... -> *)
 * @param {Function} condition A predicate function
 * @param {Function} onTrue A function to invoke when the `condition` evaluates to a truthy value.
 * @param {Function} onFalse A function to invoke when the `condition` evaluates to a falsy value.
 * @return {Function} A new function that will process either the `onTrue` or the `onFalse`
 *                    function depending upon the result of the `condition` predicate.
 * @see R.unless, R.when, R.cond
 * @example
 *
 *      const incCount = R.ifElse(
 *        R.has('count'),
 *        R.over(R.lensProp('count'), R.inc),
 *        R.assoc('count', 1)
 *      );
 *      incCount({});           //=> { count: 1 }
 *      incCount({ count: 1 }); //=> { count: 2 }
 */


var ifElse = /*#__PURE__*/_curry3(function ifElse(condition, onTrue, onFalse) {
  return curryN(Math.max(condition.length, onTrue.length, onFalse.length), function _ifElse() {
    return condition.apply(this, arguments) ? onTrue.apply(this, arguments) : onFalse.apply(this, arguments);
  });
});

module.exports = ifElse;

/***/ }),

/***/ "./node_modules/ramda/src/inc.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/src/inc.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var add = /*#__PURE__*/__webpack_require__(/*! ./add */ "./node_modules/ramda/src/add.js");
/**
 * Increments its argument.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Math
 * @sig Number -> Number
 * @param {Number} n
 * @return {Number} n + 1
 * @see R.dec
 * @example
 *
 *      R.inc(42); //=> 43
 */


var inc = /*#__PURE__*/add(1);
module.exports = inc;

/***/ }),

/***/ "./node_modules/ramda/src/includes.js":
/*!********************************************!*\
  !*** ./node_modules/ramda/src/includes.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _includes = /*#__PURE__*/__webpack_require__(/*! ./internal/_includes */ "./node_modules/ramda/src/internal/_includes.js");

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");
/**
 * Returns `true` if the specified value is equal, in [`R.equals`](#equals)
 * terms, to at least one element of the given list; `false` otherwise.
 * Works also with strings.
 *
 * @func
 * @memberOf R
 * @since v0.26.0
 * @category List
 * @sig a -> [a] -> Boolean
 * @param {Object} a The item to compare against.
 * @param {Array} list The array to consider.
 * @return {Boolean} `true` if an equivalent item is in the list, `false` otherwise.
 * @see R.any
 * @example
 *
 *      R.includes(3, [1, 2, 3]); //=> true
 *      R.includes(4, [1, 2, 3]); //=> false
 *      R.includes({ name: 'Fred' }, [{ name: 'Fred' }]); //=> true
 *      R.includes([42], [[42]]); //=> true
 *      R.includes('ba', 'banana'); //=>true
 */


var includes = /*#__PURE__*/_curry2(_includes);

module.exports = includes;

/***/ }),

/***/ "./node_modules/ramda/src/index.mjs":
/*!******************************************!*\
  !*** ./node_modules/ramda/src/index.mjs ***!
  \******************************************/
/*! exports provided: F, T, __, add, addIndex, adjust, all, allPass, always, and, any, anyPass, ap, aperture, append, apply, applySpec, applyTo, ascend, assoc, assocPath, binary, bind, both, call, chain, clamp, clone, comparator, complement, compose, composeK, composeP, composeWith, concat, cond, construct, constructN, contains, converge, countBy, curry, curryN, dec, defaultTo, descend, difference, differenceWith, dissoc, dissocPath, divide, drop, dropLast, dropLastWhile, dropRepeats, dropRepeatsWith, dropWhile, either, empty, endsWith, eqBy, eqProps, equals, evolve, filter, find, findIndex, findLast, findLastIndex, flatten, flip, forEach, forEachObjIndexed, fromPairs, groupBy, groupWith, gt, gte, has, hasIn, hasPath, head, identical, identity, ifElse, inc, includes, indexBy, indexOf, init, innerJoin, insert, insertAll, intersection, intersperse, into, invert, invertObj, invoker, is, isEmpty, isNil, join, juxt, keys, keysIn, last, lastIndexOf, length, lens, lensIndex, lensPath, lensProp, lift, liftN, lt, lte, map, mapAccum, mapAccumRight, mapObjIndexed, match, mathMod, max, maxBy, mean, median, memoizeWith, merge, mergeAll, mergeDeepLeft, mergeDeepRight, mergeDeepWith, mergeDeepWithKey, mergeLeft, mergeRight, mergeWith, mergeWithKey, min, minBy, modulo, move, multiply, nAry, negate, none, not, nth, nthArg, o, objOf, of, omit, once, or, otherwise, over, pair, partial, partialRight, partition, path, paths, pathEq, pathOr, pathSatisfies, pick, pickAll, pickBy, pipe, pipeK, pipeP, pipeWith, pluck, prepend, product, project, prop, propEq, propIs, propOr, propSatisfies, props, range, reduce, reduceBy, reduceRight, reduceWhile, reduced, reject, remove, repeat, replace, reverse, scan, sequence, set, slice, sort, sortBy, sortWith, split, splitAt, splitEvery, splitWhen, startsWith, subtract, sum, symmetricDifference, symmetricDifferenceWith, tail, take, takeLast, takeLastWhile, takeWhile, tap, test, andThen, times, toLower, toPairs, toPairsIn, toString, toUpper, transduce, transpose, traverse, trim, tryCatch, type, unapply, unary, uncurryN, unfold, union, unionWith, uniq, uniqBy, uniqWith, unless, unnest, until, update, useWith, values, valuesIn, view, when, where, whereEq, without, xor, xprod, zip, zipObj, zipWith, thunkify */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _F_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./F.js */ "./node_modules/ramda/src/F.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "F", function() { return _F_js__WEBPACK_IMPORTED_MODULE_0__; });
/* harmony import */ var _T_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./T.js */ "./node_modules/ramda/src/T.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "T", function() { return _T_js__WEBPACK_IMPORTED_MODULE_1__; });
/* harmony import */ var _js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./__.js */ "./node_modules/ramda/src/__.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "__", function() { return _js__WEBPACK_IMPORTED_MODULE_2__; });
/* harmony import */ var _add_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./add.js */ "./node_modules/ramda/src/add.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "add", function() { return _add_js__WEBPACK_IMPORTED_MODULE_3__; });
/* harmony import */ var _addIndex_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./addIndex.js */ "./node_modules/ramda/src/addIndex.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "addIndex", function() { return _addIndex_js__WEBPACK_IMPORTED_MODULE_4__; });
/* harmony import */ var _adjust_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./adjust.js */ "./node_modules/ramda/src/adjust.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "adjust", function() { return _adjust_js__WEBPACK_IMPORTED_MODULE_5__; });
/* harmony import */ var _all_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./all.js */ "./node_modules/ramda/src/all.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "all", function() { return _all_js__WEBPACK_IMPORTED_MODULE_6__; });
/* harmony import */ var _allPass_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./allPass.js */ "./node_modules/ramda/src/allPass.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "allPass", function() { return _allPass_js__WEBPACK_IMPORTED_MODULE_7__; });
/* harmony import */ var _always_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./always.js */ "./node_modules/ramda/src/always.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "always", function() { return _always_js__WEBPACK_IMPORTED_MODULE_8__; });
/* harmony import */ var _and_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./and.js */ "./node_modules/ramda/src/and.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "and", function() { return _and_js__WEBPACK_IMPORTED_MODULE_9__; });
/* harmony import */ var _any_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./any.js */ "./node_modules/ramda/src/any.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "any", function() { return _any_js__WEBPACK_IMPORTED_MODULE_10__; });
/* harmony import */ var _anyPass_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./anyPass.js */ "./node_modules/ramda/src/anyPass.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "anyPass", function() { return _anyPass_js__WEBPACK_IMPORTED_MODULE_11__; });
/* harmony import */ var _ap_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./ap.js */ "./node_modules/ramda/src/ap.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "ap", function() { return _ap_js__WEBPACK_IMPORTED_MODULE_12__; });
/* harmony import */ var _aperture_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./aperture.js */ "./node_modules/ramda/src/aperture.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "aperture", function() { return _aperture_js__WEBPACK_IMPORTED_MODULE_13__; });
/* harmony import */ var _append_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./append.js */ "./node_modules/ramda/src/append.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "append", function() { return _append_js__WEBPACK_IMPORTED_MODULE_14__; });
/* harmony import */ var _apply_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./apply.js */ "./node_modules/ramda/src/apply.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "apply", function() { return _apply_js__WEBPACK_IMPORTED_MODULE_15__; });
/* harmony import */ var _applySpec_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./applySpec.js */ "./node_modules/ramda/src/applySpec.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "applySpec", function() { return _applySpec_js__WEBPACK_IMPORTED_MODULE_16__; });
/* harmony import */ var _applyTo_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./applyTo.js */ "./node_modules/ramda/src/applyTo.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "applyTo", function() { return _applyTo_js__WEBPACK_IMPORTED_MODULE_17__; });
/* harmony import */ var _ascend_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./ascend.js */ "./node_modules/ramda/src/ascend.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "ascend", function() { return _ascend_js__WEBPACK_IMPORTED_MODULE_18__; });
/* harmony import */ var _assoc_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./assoc.js */ "./node_modules/ramda/src/assoc.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "assoc", function() { return _assoc_js__WEBPACK_IMPORTED_MODULE_19__; });
/* harmony import */ var _assocPath_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./assocPath.js */ "./node_modules/ramda/src/assocPath.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "assocPath", function() { return _assocPath_js__WEBPACK_IMPORTED_MODULE_20__; });
/* harmony import */ var _binary_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./binary.js */ "./node_modules/ramda/src/binary.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "binary", function() { return _binary_js__WEBPACK_IMPORTED_MODULE_21__; });
/* harmony import */ var _bind_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./bind.js */ "./node_modules/ramda/src/bind.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "bind", function() { return _bind_js__WEBPACK_IMPORTED_MODULE_22__; });
/* harmony import */ var _both_js__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./both.js */ "./node_modules/ramda/src/both.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "both", function() { return _both_js__WEBPACK_IMPORTED_MODULE_23__; });
/* harmony import */ var _call_js__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./call.js */ "./node_modules/ramda/src/call.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "call", function() { return _call_js__WEBPACK_IMPORTED_MODULE_24__; });
/* harmony import */ var _chain_js__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./chain.js */ "./node_modules/ramda/src/chain.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "chain", function() { return _chain_js__WEBPACK_IMPORTED_MODULE_25__; });
/* harmony import */ var _clamp_js__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./clamp.js */ "./node_modules/ramda/src/clamp.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "clamp", function() { return _clamp_js__WEBPACK_IMPORTED_MODULE_26__; });
/* harmony import */ var _clone_js__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./clone.js */ "./node_modules/ramda/src/clone.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "clone", function() { return _clone_js__WEBPACK_IMPORTED_MODULE_27__; });
/* harmony import */ var _comparator_js__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./comparator.js */ "./node_modules/ramda/src/comparator.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "comparator", function() { return _comparator_js__WEBPACK_IMPORTED_MODULE_28__; });
/* harmony import */ var _complement_js__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./complement.js */ "./node_modules/ramda/src/complement.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "complement", function() { return _complement_js__WEBPACK_IMPORTED_MODULE_29__; });
/* harmony import */ var _compose_js__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./compose.js */ "./node_modules/ramda/src/compose.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "compose", function() { return _compose_js__WEBPACK_IMPORTED_MODULE_30__; });
/* harmony import */ var _composeK_js__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./composeK.js */ "./node_modules/ramda/src/composeK.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "composeK", function() { return _composeK_js__WEBPACK_IMPORTED_MODULE_31__; });
/* harmony import */ var _composeP_js__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./composeP.js */ "./node_modules/ramda/src/composeP.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "composeP", function() { return _composeP_js__WEBPACK_IMPORTED_MODULE_32__; });
/* harmony import */ var _composeWith_js__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./composeWith.js */ "./node_modules/ramda/src/composeWith.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "composeWith", function() { return _composeWith_js__WEBPACK_IMPORTED_MODULE_33__; });
/* harmony import */ var _concat_js__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./concat.js */ "./node_modules/ramda/src/concat.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "concat", function() { return _concat_js__WEBPACK_IMPORTED_MODULE_34__; });
/* harmony import */ var _cond_js__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./cond.js */ "./node_modules/ramda/src/cond.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "cond", function() { return _cond_js__WEBPACK_IMPORTED_MODULE_35__; });
/* harmony import */ var _construct_js__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./construct.js */ "./node_modules/ramda/src/construct.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "construct", function() { return _construct_js__WEBPACK_IMPORTED_MODULE_36__; });
/* harmony import */ var _constructN_js__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ./constructN.js */ "./node_modules/ramda/src/constructN.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "constructN", function() { return _constructN_js__WEBPACK_IMPORTED_MODULE_37__; });
/* harmony import */ var _contains_js__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ./contains.js */ "./node_modules/ramda/src/contains.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "contains", function() { return _contains_js__WEBPACK_IMPORTED_MODULE_38__; });
/* harmony import */ var _converge_js__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! ./converge.js */ "./node_modules/ramda/src/converge.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "converge", function() { return _converge_js__WEBPACK_IMPORTED_MODULE_39__; });
/* harmony import */ var _countBy_js__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! ./countBy.js */ "./node_modules/ramda/src/countBy.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "countBy", function() { return _countBy_js__WEBPACK_IMPORTED_MODULE_40__; });
/* harmony import */ var _curry_js__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! ./curry.js */ "./node_modules/ramda/src/curry.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "curry", function() { return _curry_js__WEBPACK_IMPORTED_MODULE_41__; });
/* harmony import */ var _curryN_js__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! ./curryN.js */ "./node_modules/ramda/src/curryN.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "curryN", function() { return _curryN_js__WEBPACK_IMPORTED_MODULE_42__; });
/* harmony import */ var _dec_js__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! ./dec.js */ "./node_modules/ramda/src/dec.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "dec", function() { return _dec_js__WEBPACK_IMPORTED_MODULE_43__; });
/* harmony import */ var _defaultTo_js__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! ./defaultTo.js */ "./node_modules/ramda/src/defaultTo.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "defaultTo", function() { return _defaultTo_js__WEBPACK_IMPORTED_MODULE_44__; });
/* harmony import */ var _descend_js__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(/*! ./descend.js */ "./node_modules/ramda/src/descend.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "descend", function() { return _descend_js__WEBPACK_IMPORTED_MODULE_45__; });
/* harmony import */ var _difference_js__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(/*! ./difference.js */ "./node_modules/ramda/src/difference.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "difference", function() { return _difference_js__WEBPACK_IMPORTED_MODULE_46__; });
/* harmony import */ var _differenceWith_js__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(/*! ./differenceWith.js */ "./node_modules/ramda/src/differenceWith.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "differenceWith", function() { return _differenceWith_js__WEBPACK_IMPORTED_MODULE_47__; });
/* harmony import */ var _dissoc_js__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__(/*! ./dissoc.js */ "./node_modules/ramda/src/dissoc.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "dissoc", function() { return _dissoc_js__WEBPACK_IMPORTED_MODULE_48__; });
/* harmony import */ var _dissocPath_js__WEBPACK_IMPORTED_MODULE_49__ = __webpack_require__(/*! ./dissocPath.js */ "./node_modules/ramda/src/dissocPath.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "dissocPath", function() { return _dissocPath_js__WEBPACK_IMPORTED_MODULE_49__; });
/* harmony import */ var _divide_js__WEBPACK_IMPORTED_MODULE_50__ = __webpack_require__(/*! ./divide.js */ "./node_modules/ramda/src/divide.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "divide", function() { return _divide_js__WEBPACK_IMPORTED_MODULE_50__; });
/* harmony import */ var _drop_js__WEBPACK_IMPORTED_MODULE_51__ = __webpack_require__(/*! ./drop.js */ "./node_modules/ramda/src/drop.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "drop", function() { return _drop_js__WEBPACK_IMPORTED_MODULE_51__; });
/* harmony import */ var _dropLast_js__WEBPACK_IMPORTED_MODULE_52__ = __webpack_require__(/*! ./dropLast.js */ "./node_modules/ramda/src/dropLast.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "dropLast", function() { return _dropLast_js__WEBPACK_IMPORTED_MODULE_52__; });
/* harmony import */ var _dropLastWhile_js__WEBPACK_IMPORTED_MODULE_53__ = __webpack_require__(/*! ./dropLastWhile.js */ "./node_modules/ramda/src/dropLastWhile.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "dropLastWhile", function() { return _dropLastWhile_js__WEBPACK_IMPORTED_MODULE_53__; });
/* harmony import */ var _dropRepeats_js__WEBPACK_IMPORTED_MODULE_54__ = __webpack_require__(/*! ./dropRepeats.js */ "./node_modules/ramda/src/dropRepeats.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "dropRepeats", function() { return _dropRepeats_js__WEBPACK_IMPORTED_MODULE_54__; });
/* harmony import */ var _dropRepeatsWith_js__WEBPACK_IMPORTED_MODULE_55__ = __webpack_require__(/*! ./dropRepeatsWith.js */ "./node_modules/ramda/src/dropRepeatsWith.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "dropRepeatsWith", function() { return _dropRepeatsWith_js__WEBPACK_IMPORTED_MODULE_55__; });
/* harmony import */ var _dropWhile_js__WEBPACK_IMPORTED_MODULE_56__ = __webpack_require__(/*! ./dropWhile.js */ "./node_modules/ramda/src/dropWhile.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "dropWhile", function() { return _dropWhile_js__WEBPACK_IMPORTED_MODULE_56__; });
/* harmony import */ var _either_js__WEBPACK_IMPORTED_MODULE_57__ = __webpack_require__(/*! ./either.js */ "./node_modules/ramda/src/either.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "either", function() { return _either_js__WEBPACK_IMPORTED_MODULE_57__; });
/* harmony import */ var _empty_js__WEBPACK_IMPORTED_MODULE_58__ = __webpack_require__(/*! ./empty.js */ "./node_modules/ramda/src/empty.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "empty", function() { return _empty_js__WEBPACK_IMPORTED_MODULE_58__; });
/* harmony import */ var _endsWith_js__WEBPACK_IMPORTED_MODULE_59__ = __webpack_require__(/*! ./endsWith.js */ "./node_modules/ramda/src/endsWith.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "endsWith", function() { return _endsWith_js__WEBPACK_IMPORTED_MODULE_59__; });
/* harmony import */ var _eqBy_js__WEBPACK_IMPORTED_MODULE_60__ = __webpack_require__(/*! ./eqBy.js */ "./node_modules/ramda/src/eqBy.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "eqBy", function() { return _eqBy_js__WEBPACK_IMPORTED_MODULE_60__; });
/* harmony import */ var _eqProps_js__WEBPACK_IMPORTED_MODULE_61__ = __webpack_require__(/*! ./eqProps.js */ "./node_modules/ramda/src/eqProps.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "eqProps", function() { return _eqProps_js__WEBPACK_IMPORTED_MODULE_61__; });
/* harmony import */ var _equals_js__WEBPACK_IMPORTED_MODULE_62__ = __webpack_require__(/*! ./equals.js */ "./node_modules/ramda/src/equals.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "equals", function() { return _equals_js__WEBPACK_IMPORTED_MODULE_62__; });
/* harmony import */ var _evolve_js__WEBPACK_IMPORTED_MODULE_63__ = __webpack_require__(/*! ./evolve.js */ "./node_modules/ramda/src/evolve.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "evolve", function() { return _evolve_js__WEBPACK_IMPORTED_MODULE_63__; });
/* harmony import */ var _filter_js__WEBPACK_IMPORTED_MODULE_64__ = __webpack_require__(/*! ./filter.js */ "./node_modules/ramda/src/filter.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "filter", function() { return _filter_js__WEBPACK_IMPORTED_MODULE_64__; });
/* harmony import */ var _find_js__WEBPACK_IMPORTED_MODULE_65__ = __webpack_require__(/*! ./find.js */ "./node_modules/ramda/src/find.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "find", function() { return _find_js__WEBPACK_IMPORTED_MODULE_65__; });
/* harmony import */ var _findIndex_js__WEBPACK_IMPORTED_MODULE_66__ = __webpack_require__(/*! ./findIndex.js */ "./node_modules/ramda/src/findIndex.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "findIndex", function() { return _findIndex_js__WEBPACK_IMPORTED_MODULE_66__; });
/* harmony import */ var _findLast_js__WEBPACK_IMPORTED_MODULE_67__ = __webpack_require__(/*! ./findLast.js */ "./node_modules/ramda/src/findLast.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "findLast", function() { return _findLast_js__WEBPACK_IMPORTED_MODULE_67__; });
/* harmony import */ var _findLastIndex_js__WEBPACK_IMPORTED_MODULE_68__ = __webpack_require__(/*! ./findLastIndex.js */ "./node_modules/ramda/src/findLastIndex.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "findLastIndex", function() { return _findLastIndex_js__WEBPACK_IMPORTED_MODULE_68__; });
/* harmony import */ var _flatten_js__WEBPACK_IMPORTED_MODULE_69__ = __webpack_require__(/*! ./flatten.js */ "./node_modules/ramda/src/flatten.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "flatten", function() { return _flatten_js__WEBPACK_IMPORTED_MODULE_69__; });
/* harmony import */ var _flip_js__WEBPACK_IMPORTED_MODULE_70__ = __webpack_require__(/*! ./flip.js */ "./node_modules/ramda/src/flip.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "flip", function() { return _flip_js__WEBPACK_IMPORTED_MODULE_70__; });
/* harmony import */ var _forEach_js__WEBPACK_IMPORTED_MODULE_71__ = __webpack_require__(/*! ./forEach.js */ "./node_modules/ramda/src/forEach.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "forEach", function() { return _forEach_js__WEBPACK_IMPORTED_MODULE_71__; });
/* harmony import */ var _forEachObjIndexed_js__WEBPACK_IMPORTED_MODULE_72__ = __webpack_require__(/*! ./forEachObjIndexed.js */ "./node_modules/ramda/src/forEachObjIndexed.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "forEachObjIndexed", function() { return _forEachObjIndexed_js__WEBPACK_IMPORTED_MODULE_72__; });
/* harmony import */ var _fromPairs_js__WEBPACK_IMPORTED_MODULE_73__ = __webpack_require__(/*! ./fromPairs.js */ "./node_modules/ramda/src/fromPairs.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "fromPairs", function() { return _fromPairs_js__WEBPACK_IMPORTED_MODULE_73__; });
/* harmony import */ var _groupBy_js__WEBPACK_IMPORTED_MODULE_74__ = __webpack_require__(/*! ./groupBy.js */ "./node_modules/ramda/src/groupBy.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "groupBy", function() { return _groupBy_js__WEBPACK_IMPORTED_MODULE_74__; });
/* harmony import */ var _groupWith_js__WEBPACK_IMPORTED_MODULE_75__ = __webpack_require__(/*! ./groupWith.js */ "./node_modules/ramda/src/groupWith.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "groupWith", function() { return _groupWith_js__WEBPACK_IMPORTED_MODULE_75__; });
/* harmony import */ var _gt_js__WEBPACK_IMPORTED_MODULE_76__ = __webpack_require__(/*! ./gt.js */ "./node_modules/ramda/src/gt.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "gt", function() { return _gt_js__WEBPACK_IMPORTED_MODULE_76__; });
/* harmony import */ var _gte_js__WEBPACK_IMPORTED_MODULE_77__ = __webpack_require__(/*! ./gte.js */ "./node_modules/ramda/src/gte.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "gte", function() { return _gte_js__WEBPACK_IMPORTED_MODULE_77__; });
/* harmony import */ var _has_js__WEBPACK_IMPORTED_MODULE_78__ = __webpack_require__(/*! ./has.js */ "./node_modules/ramda/src/has.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "has", function() { return _has_js__WEBPACK_IMPORTED_MODULE_78__; });
/* harmony import */ var _hasIn_js__WEBPACK_IMPORTED_MODULE_79__ = __webpack_require__(/*! ./hasIn.js */ "./node_modules/ramda/src/hasIn.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "hasIn", function() { return _hasIn_js__WEBPACK_IMPORTED_MODULE_79__; });
/* harmony import */ var _hasPath_js__WEBPACK_IMPORTED_MODULE_80__ = __webpack_require__(/*! ./hasPath.js */ "./node_modules/ramda/src/hasPath.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "hasPath", function() { return _hasPath_js__WEBPACK_IMPORTED_MODULE_80__; });
/* harmony import */ var _head_js__WEBPACK_IMPORTED_MODULE_81__ = __webpack_require__(/*! ./head.js */ "./node_modules/ramda/src/head.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "head", function() { return _head_js__WEBPACK_IMPORTED_MODULE_81__; });
/* harmony import */ var _identical_js__WEBPACK_IMPORTED_MODULE_82__ = __webpack_require__(/*! ./identical.js */ "./node_modules/ramda/src/identical.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "identical", function() { return _identical_js__WEBPACK_IMPORTED_MODULE_82__; });
/* harmony import */ var _identity_js__WEBPACK_IMPORTED_MODULE_83__ = __webpack_require__(/*! ./identity.js */ "./node_modules/ramda/src/identity.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "identity", function() { return _identity_js__WEBPACK_IMPORTED_MODULE_83__; });
/* harmony import */ var _ifElse_js__WEBPACK_IMPORTED_MODULE_84__ = __webpack_require__(/*! ./ifElse.js */ "./node_modules/ramda/src/ifElse.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "ifElse", function() { return _ifElse_js__WEBPACK_IMPORTED_MODULE_84__; });
/* harmony import */ var _inc_js__WEBPACK_IMPORTED_MODULE_85__ = __webpack_require__(/*! ./inc.js */ "./node_modules/ramda/src/inc.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "inc", function() { return _inc_js__WEBPACK_IMPORTED_MODULE_85__; });
/* harmony import */ var _includes_js__WEBPACK_IMPORTED_MODULE_86__ = __webpack_require__(/*! ./includes.js */ "./node_modules/ramda/src/includes.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "includes", function() { return _includes_js__WEBPACK_IMPORTED_MODULE_86__; });
/* harmony import */ var _indexBy_js__WEBPACK_IMPORTED_MODULE_87__ = __webpack_require__(/*! ./indexBy.js */ "./node_modules/ramda/src/indexBy.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "indexBy", function() { return _indexBy_js__WEBPACK_IMPORTED_MODULE_87__; });
/* harmony import */ var _indexOf_js__WEBPACK_IMPORTED_MODULE_88__ = __webpack_require__(/*! ./indexOf.js */ "./node_modules/ramda/src/indexOf.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "indexOf", function() { return _indexOf_js__WEBPACK_IMPORTED_MODULE_88__; });
/* harmony import */ var _init_js__WEBPACK_IMPORTED_MODULE_89__ = __webpack_require__(/*! ./init.js */ "./node_modules/ramda/src/init.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "init", function() { return _init_js__WEBPACK_IMPORTED_MODULE_89__; });
/* harmony import */ var _innerJoin_js__WEBPACK_IMPORTED_MODULE_90__ = __webpack_require__(/*! ./innerJoin.js */ "./node_modules/ramda/src/innerJoin.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "innerJoin", function() { return _innerJoin_js__WEBPACK_IMPORTED_MODULE_90__; });
/* harmony import */ var _insert_js__WEBPACK_IMPORTED_MODULE_91__ = __webpack_require__(/*! ./insert.js */ "./node_modules/ramda/src/insert.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "insert", function() { return _insert_js__WEBPACK_IMPORTED_MODULE_91__; });
/* harmony import */ var _insertAll_js__WEBPACK_IMPORTED_MODULE_92__ = __webpack_require__(/*! ./insertAll.js */ "./node_modules/ramda/src/insertAll.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "insertAll", function() { return _insertAll_js__WEBPACK_IMPORTED_MODULE_92__; });
/* harmony import */ var _intersection_js__WEBPACK_IMPORTED_MODULE_93__ = __webpack_require__(/*! ./intersection.js */ "./node_modules/ramda/src/intersection.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "intersection", function() { return _intersection_js__WEBPACK_IMPORTED_MODULE_93__; });
/* harmony import */ var _intersperse_js__WEBPACK_IMPORTED_MODULE_94__ = __webpack_require__(/*! ./intersperse.js */ "./node_modules/ramda/src/intersperse.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "intersperse", function() { return _intersperse_js__WEBPACK_IMPORTED_MODULE_94__; });
/* harmony import */ var _into_js__WEBPACK_IMPORTED_MODULE_95__ = __webpack_require__(/*! ./into.js */ "./node_modules/ramda/src/into.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "into", function() { return _into_js__WEBPACK_IMPORTED_MODULE_95__; });
/* harmony import */ var _invert_js__WEBPACK_IMPORTED_MODULE_96__ = __webpack_require__(/*! ./invert.js */ "./node_modules/ramda/src/invert.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "invert", function() { return _invert_js__WEBPACK_IMPORTED_MODULE_96__; });
/* harmony import */ var _invertObj_js__WEBPACK_IMPORTED_MODULE_97__ = __webpack_require__(/*! ./invertObj.js */ "./node_modules/ramda/src/invertObj.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "invertObj", function() { return _invertObj_js__WEBPACK_IMPORTED_MODULE_97__; });
/* harmony import */ var _invoker_js__WEBPACK_IMPORTED_MODULE_98__ = __webpack_require__(/*! ./invoker.js */ "./node_modules/ramda/src/invoker.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "invoker", function() { return _invoker_js__WEBPACK_IMPORTED_MODULE_98__; });
/* harmony import */ var _is_js__WEBPACK_IMPORTED_MODULE_99__ = __webpack_require__(/*! ./is.js */ "./node_modules/ramda/src/is.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "is", function() { return _is_js__WEBPACK_IMPORTED_MODULE_99__; });
/* harmony import */ var _isEmpty_js__WEBPACK_IMPORTED_MODULE_100__ = __webpack_require__(/*! ./isEmpty.js */ "./node_modules/ramda/src/isEmpty.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "isEmpty", function() { return _isEmpty_js__WEBPACK_IMPORTED_MODULE_100__; });
/* harmony import */ var _isNil_js__WEBPACK_IMPORTED_MODULE_101__ = __webpack_require__(/*! ./isNil.js */ "./node_modules/ramda/src/isNil.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "isNil", function() { return _isNil_js__WEBPACK_IMPORTED_MODULE_101__; });
/* harmony import */ var _join_js__WEBPACK_IMPORTED_MODULE_102__ = __webpack_require__(/*! ./join.js */ "./node_modules/ramda/src/join.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "join", function() { return _join_js__WEBPACK_IMPORTED_MODULE_102__; });
/* harmony import */ var _juxt_js__WEBPACK_IMPORTED_MODULE_103__ = __webpack_require__(/*! ./juxt.js */ "./node_modules/ramda/src/juxt.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "juxt", function() { return _juxt_js__WEBPACK_IMPORTED_MODULE_103__; });
/* harmony import */ var _keys_js__WEBPACK_IMPORTED_MODULE_104__ = __webpack_require__(/*! ./keys.js */ "./node_modules/ramda/src/keys.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "keys", function() { return _keys_js__WEBPACK_IMPORTED_MODULE_104__; });
/* harmony import */ var _keysIn_js__WEBPACK_IMPORTED_MODULE_105__ = __webpack_require__(/*! ./keysIn.js */ "./node_modules/ramda/src/keysIn.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "keysIn", function() { return _keysIn_js__WEBPACK_IMPORTED_MODULE_105__; });
/* harmony import */ var _last_js__WEBPACK_IMPORTED_MODULE_106__ = __webpack_require__(/*! ./last.js */ "./node_modules/ramda/src/last.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "last", function() { return _last_js__WEBPACK_IMPORTED_MODULE_106__; });
/* harmony import */ var _lastIndexOf_js__WEBPACK_IMPORTED_MODULE_107__ = __webpack_require__(/*! ./lastIndexOf.js */ "./node_modules/ramda/src/lastIndexOf.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "lastIndexOf", function() { return _lastIndexOf_js__WEBPACK_IMPORTED_MODULE_107__; });
/* harmony import */ var _length_js__WEBPACK_IMPORTED_MODULE_108__ = __webpack_require__(/*! ./length.js */ "./node_modules/ramda/src/length.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "length", function() { return _length_js__WEBPACK_IMPORTED_MODULE_108__; });
/* harmony import */ var _lens_js__WEBPACK_IMPORTED_MODULE_109__ = __webpack_require__(/*! ./lens.js */ "./node_modules/ramda/src/lens.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "lens", function() { return _lens_js__WEBPACK_IMPORTED_MODULE_109__; });
/* harmony import */ var _lensIndex_js__WEBPACK_IMPORTED_MODULE_110__ = __webpack_require__(/*! ./lensIndex.js */ "./node_modules/ramda/src/lensIndex.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "lensIndex", function() { return _lensIndex_js__WEBPACK_IMPORTED_MODULE_110__; });
/* harmony import */ var _lensPath_js__WEBPACK_IMPORTED_MODULE_111__ = __webpack_require__(/*! ./lensPath.js */ "./node_modules/ramda/src/lensPath.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "lensPath", function() { return _lensPath_js__WEBPACK_IMPORTED_MODULE_111__; });
/* harmony import */ var _lensProp_js__WEBPACK_IMPORTED_MODULE_112__ = __webpack_require__(/*! ./lensProp.js */ "./node_modules/ramda/src/lensProp.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "lensProp", function() { return _lensProp_js__WEBPACK_IMPORTED_MODULE_112__; });
/* harmony import */ var _lift_js__WEBPACK_IMPORTED_MODULE_113__ = __webpack_require__(/*! ./lift.js */ "./node_modules/ramda/src/lift.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "lift", function() { return _lift_js__WEBPACK_IMPORTED_MODULE_113__; });
/* harmony import */ var _liftN_js__WEBPACK_IMPORTED_MODULE_114__ = __webpack_require__(/*! ./liftN.js */ "./node_modules/ramda/src/liftN.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "liftN", function() { return _liftN_js__WEBPACK_IMPORTED_MODULE_114__; });
/* harmony import */ var _lt_js__WEBPACK_IMPORTED_MODULE_115__ = __webpack_require__(/*! ./lt.js */ "./node_modules/ramda/src/lt.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "lt", function() { return _lt_js__WEBPACK_IMPORTED_MODULE_115__; });
/* harmony import */ var _lte_js__WEBPACK_IMPORTED_MODULE_116__ = __webpack_require__(/*! ./lte.js */ "./node_modules/ramda/src/lte.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "lte", function() { return _lte_js__WEBPACK_IMPORTED_MODULE_116__; });
/* harmony import */ var _map_js__WEBPACK_IMPORTED_MODULE_117__ = __webpack_require__(/*! ./map.js */ "./node_modules/ramda/src/map.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "map", function() { return _map_js__WEBPACK_IMPORTED_MODULE_117__; });
/* harmony import */ var _mapAccum_js__WEBPACK_IMPORTED_MODULE_118__ = __webpack_require__(/*! ./mapAccum.js */ "./node_modules/ramda/src/mapAccum.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "mapAccum", function() { return _mapAccum_js__WEBPACK_IMPORTED_MODULE_118__; });
/* harmony import */ var _mapAccumRight_js__WEBPACK_IMPORTED_MODULE_119__ = __webpack_require__(/*! ./mapAccumRight.js */ "./node_modules/ramda/src/mapAccumRight.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "mapAccumRight", function() { return _mapAccumRight_js__WEBPACK_IMPORTED_MODULE_119__; });
/* harmony import */ var _mapObjIndexed_js__WEBPACK_IMPORTED_MODULE_120__ = __webpack_require__(/*! ./mapObjIndexed.js */ "./node_modules/ramda/src/mapObjIndexed.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "mapObjIndexed", function() { return _mapObjIndexed_js__WEBPACK_IMPORTED_MODULE_120__; });
/* harmony import */ var _match_js__WEBPACK_IMPORTED_MODULE_121__ = __webpack_require__(/*! ./match.js */ "./node_modules/ramda/src/match.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "match", function() { return _match_js__WEBPACK_IMPORTED_MODULE_121__; });
/* harmony import */ var _mathMod_js__WEBPACK_IMPORTED_MODULE_122__ = __webpack_require__(/*! ./mathMod.js */ "./node_modules/ramda/src/mathMod.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "mathMod", function() { return _mathMod_js__WEBPACK_IMPORTED_MODULE_122__; });
/* harmony import */ var _max_js__WEBPACK_IMPORTED_MODULE_123__ = __webpack_require__(/*! ./max.js */ "./node_modules/ramda/src/max.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "max", function() { return _max_js__WEBPACK_IMPORTED_MODULE_123__; });
/* harmony import */ var _maxBy_js__WEBPACK_IMPORTED_MODULE_124__ = __webpack_require__(/*! ./maxBy.js */ "./node_modules/ramda/src/maxBy.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "maxBy", function() { return _maxBy_js__WEBPACK_IMPORTED_MODULE_124__; });
/* harmony import */ var _mean_js__WEBPACK_IMPORTED_MODULE_125__ = __webpack_require__(/*! ./mean.js */ "./node_modules/ramda/src/mean.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "mean", function() { return _mean_js__WEBPACK_IMPORTED_MODULE_125__; });
/* harmony import */ var _median_js__WEBPACK_IMPORTED_MODULE_126__ = __webpack_require__(/*! ./median.js */ "./node_modules/ramda/src/median.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "median", function() { return _median_js__WEBPACK_IMPORTED_MODULE_126__; });
/* harmony import */ var _memoizeWith_js__WEBPACK_IMPORTED_MODULE_127__ = __webpack_require__(/*! ./memoizeWith.js */ "./node_modules/ramda/src/memoizeWith.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "memoizeWith", function() { return _memoizeWith_js__WEBPACK_IMPORTED_MODULE_127__; });
/* harmony import */ var _merge_js__WEBPACK_IMPORTED_MODULE_128__ = __webpack_require__(/*! ./merge.js */ "./node_modules/ramda/src/merge.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "merge", function() { return _merge_js__WEBPACK_IMPORTED_MODULE_128__; });
/* harmony import */ var _mergeAll_js__WEBPACK_IMPORTED_MODULE_129__ = __webpack_require__(/*! ./mergeAll.js */ "./node_modules/ramda/src/mergeAll.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "mergeAll", function() { return _mergeAll_js__WEBPACK_IMPORTED_MODULE_129__; });
/* harmony import */ var _mergeDeepLeft_js__WEBPACK_IMPORTED_MODULE_130__ = __webpack_require__(/*! ./mergeDeepLeft.js */ "./node_modules/ramda/src/mergeDeepLeft.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "mergeDeepLeft", function() { return _mergeDeepLeft_js__WEBPACK_IMPORTED_MODULE_130__; });
/* harmony import */ var _mergeDeepRight_js__WEBPACK_IMPORTED_MODULE_131__ = __webpack_require__(/*! ./mergeDeepRight.js */ "./node_modules/ramda/src/mergeDeepRight.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "mergeDeepRight", function() { return _mergeDeepRight_js__WEBPACK_IMPORTED_MODULE_131__; });
/* harmony import */ var _mergeDeepWith_js__WEBPACK_IMPORTED_MODULE_132__ = __webpack_require__(/*! ./mergeDeepWith.js */ "./node_modules/ramda/src/mergeDeepWith.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "mergeDeepWith", function() { return _mergeDeepWith_js__WEBPACK_IMPORTED_MODULE_132__; });
/* harmony import */ var _mergeDeepWithKey_js__WEBPACK_IMPORTED_MODULE_133__ = __webpack_require__(/*! ./mergeDeepWithKey.js */ "./node_modules/ramda/src/mergeDeepWithKey.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "mergeDeepWithKey", function() { return _mergeDeepWithKey_js__WEBPACK_IMPORTED_MODULE_133__; });
/* harmony import */ var _mergeLeft_js__WEBPACK_IMPORTED_MODULE_134__ = __webpack_require__(/*! ./mergeLeft.js */ "./node_modules/ramda/src/mergeLeft.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "mergeLeft", function() { return _mergeLeft_js__WEBPACK_IMPORTED_MODULE_134__; });
/* harmony import */ var _mergeRight_js__WEBPACK_IMPORTED_MODULE_135__ = __webpack_require__(/*! ./mergeRight.js */ "./node_modules/ramda/src/mergeRight.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "mergeRight", function() { return _mergeRight_js__WEBPACK_IMPORTED_MODULE_135__; });
/* harmony import */ var _mergeWith_js__WEBPACK_IMPORTED_MODULE_136__ = __webpack_require__(/*! ./mergeWith.js */ "./node_modules/ramda/src/mergeWith.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "mergeWith", function() { return _mergeWith_js__WEBPACK_IMPORTED_MODULE_136__; });
/* harmony import */ var _mergeWithKey_js__WEBPACK_IMPORTED_MODULE_137__ = __webpack_require__(/*! ./mergeWithKey.js */ "./node_modules/ramda/src/mergeWithKey.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "mergeWithKey", function() { return _mergeWithKey_js__WEBPACK_IMPORTED_MODULE_137__; });
/* harmony import */ var _min_js__WEBPACK_IMPORTED_MODULE_138__ = __webpack_require__(/*! ./min.js */ "./node_modules/ramda/src/min.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "min", function() { return _min_js__WEBPACK_IMPORTED_MODULE_138__; });
/* harmony import */ var _minBy_js__WEBPACK_IMPORTED_MODULE_139__ = __webpack_require__(/*! ./minBy.js */ "./node_modules/ramda/src/minBy.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "minBy", function() { return _minBy_js__WEBPACK_IMPORTED_MODULE_139__; });
/* harmony import */ var _modulo_js__WEBPACK_IMPORTED_MODULE_140__ = __webpack_require__(/*! ./modulo.js */ "./node_modules/ramda/src/modulo.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "modulo", function() { return _modulo_js__WEBPACK_IMPORTED_MODULE_140__; });
/* harmony import */ var _move_js__WEBPACK_IMPORTED_MODULE_141__ = __webpack_require__(/*! ./move.js */ "./node_modules/ramda/src/move.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "move", function() { return _move_js__WEBPACK_IMPORTED_MODULE_141__; });
/* harmony import */ var _multiply_js__WEBPACK_IMPORTED_MODULE_142__ = __webpack_require__(/*! ./multiply.js */ "./node_modules/ramda/src/multiply.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "multiply", function() { return _multiply_js__WEBPACK_IMPORTED_MODULE_142__; });
/* harmony import */ var _nAry_js__WEBPACK_IMPORTED_MODULE_143__ = __webpack_require__(/*! ./nAry.js */ "./node_modules/ramda/src/nAry.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "nAry", function() { return _nAry_js__WEBPACK_IMPORTED_MODULE_143__; });
/* harmony import */ var _negate_js__WEBPACK_IMPORTED_MODULE_144__ = __webpack_require__(/*! ./negate.js */ "./node_modules/ramda/src/negate.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "negate", function() { return _negate_js__WEBPACK_IMPORTED_MODULE_144__; });
/* harmony import */ var _none_js__WEBPACK_IMPORTED_MODULE_145__ = __webpack_require__(/*! ./none.js */ "./node_modules/ramda/src/none.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "none", function() { return _none_js__WEBPACK_IMPORTED_MODULE_145__; });
/* harmony import */ var _not_js__WEBPACK_IMPORTED_MODULE_146__ = __webpack_require__(/*! ./not.js */ "./node_modules/ramda/src/not.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "not", function() { return _not_js__WEBPACK_IMPORTED_MODULE_146__; });
/* harmony import */ var _nth_js__WEBPACK_IMPORTED_MODULE_147__ = __webpack_require__(/*! ./nth.js */ "./node_modules/ramda/src/nth.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "nth", function() { return _nth_js__WEBPACK_IMPORTED_MODULE_147__; });
/* harmony import */ var _nthArg_js__WEBPACK_IMPORTED_MODULE_148__ = __webpack_require__(/*! ./nthArg.js */ "./node_modules/ramda/src/nthArg.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "nthArg", function() { return _nthArg_js__WEBPACK_IMPORTED_MODULE_148__; });
/* harmony import */ var _o_js__WEBPACK_IMPORTED_MODULE_149__ = __webpack_require__(/*! ./o.js */ "./node_modules/ramda/src/o.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "o", function() { return _o_js__WEBPACK_IMPORTED_MODULE_149__; });
/* harmony import */ var _objOf_js__WEBPACK_IMPORTED_MODULE_150__ = __webpack_require__(/*! ./objOf.js */ "./node_modules/ramda/src/objOf.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "objOf", function() { return _objOf_js__WEBPACK_IMPORTED_MODULE_150__; });
/* harmony import */ var _of_js__WEBPACK_IMPORTED_MODULE_151__ = __webpack_require__(/*! ./of.js */ "./node_modules/ramda/src/of.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "of", function() { return _of_js__WEBPACK_IMPORTED_MODULE_151__; });
/* harmony import */ var _omit_js__WEBPACK_IMPORTED_MODULE_152__ = __webpack_require__(/*! ./omit.js */ "./node_modules/ramda/src/omit.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "omit", function() { return _omit_js__WEBPACK_IMPORTED_MODULE_152__; });
/* harmony import */ var _once_js__WEBPACK_IMPORTED_MODULE_153__ = __webpack_require__(/*! ./once.js */ "./node_modules/ramda/src/once.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "once", function() { return _once_js__WEBPACK_IMPORTED_MODULE_153__; });
/* harmony import */ var _or_js__WEBPACK_IMPORTED_MODULE_154__ = __webpack_require__(/*! ./or.js */ "./node_modules/ramda/src/or.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "or", function() { return _or_js__WEBPACK_IMPORTED_MODULE_154__; });
/* harmony import */ var _otherwise_js__WEBPACK_IMPORTED_MODULE_155__ = __webpack_require__(/*! ./otherwise.js */ "./node_modules/ramda/src/otherwise.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "otherwise", function() { return _otherwise_js__WEBPACK_IMPORTED_MODULE_155__; });
/* harmony import */ var _over_js__WEBPACK_IMPORTED_MODULE_156__ = __webpack_require__(/*! ./over.js */ "./node_modules/ramda/src/over.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "over", function() { return _over_js__WEBPACK_IMPORTED_MODULE_156__; });
/* harmony import */ var _pair_js__WEBPACK_IMPORTED_MODULE_157__ = __webpack_require__(/*! ./pair.js */ "./node_modules/ramda/src/pair.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "pair", function() { return _pair_js__WEBPACK_IMPORTED_MODULE_157__; });
/* harmony import */ var _partial_js__WEBPACK_IMPORTED_MODULE_158__ = __webpack_require__(/*! ./partial.js */ "./node_modules/ramda/src/partial.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "partial", function() { return _partial_js__WEBPACK_IMPORTED_MODULE_158__; });
/* harmony import */ var _partialRight_js__WEBPACK_IMPORTED_MODULE_159__ = __webpack_require__(/*! ./partialRight.js */ "./node_modules/ramda/src/partialRight.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "partialRight", function() { return _partialRight_js__WEBPACK_IMPORTED_MODULE_159__; });
/* harmony import */ var _partition_js__WEBPACK_IMPORTED_MODULE_160__ = __webpack_require__(/*! ./partition.js */ "./node_modules/ramda/src/partition.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "partition", function() { return _partition_js__WEBPACK_IMPORTED_MODULE_160__; });
/* harmony import */ var _path_js__WEBPACK_IMPORTED_MODULE_161__ = __webpack_require__(/*! ./path.js */ "./node_modules/ramda/src/path.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "path", function() { return _path_js__WEBPACK_IMPORTED_MODULE_161__; });
/* harmony import */ var _paths_js__WEBPACK_IMPORTED_MODULE_162__ = __webpack_require__(/*! ./paths.js */ "./node_modules/ramda/src/paths.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "paths", function() { return _paths_js__WEBPACK_IMPORTED_MODULE_162__; });
/* harmony import */ var _pathEq_js__WEBPACK_IMPORTED_MODULE_163__ = __webpack_require__(/*! ./pathEq.js */ "./node_modules/ramda/src/pathEq.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "pathEq", function() { return _pathEq_js__WEBPACK_IMPORTED_MODULE_163__; });
/* harmony import */ var _pathOr_js__WEBPACK_IMPORTED_MODULE_164__ = __webpack_require__(/*! ./pathOr.js */ "./node_modules/ramda/src/pathOr.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "pathOr", function() { return _pathOr_js__WEBPACK_IMPORTED_MODULE_164__; });
/* harmony import */ var _pathSatisfies_js__WEBPACK_IMPORTED_MODULE_165__ = __webpack_require__(/*! ./pathSatisfies.js */ "./node_modules/ramda/src/pathSatisfies.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "pathSatisfies", function() { return _pathSatisfies_js__WEBPACK_IMPORTED_MODULE_165__; });
/* harmony import */ var _pick_js__WEBPACK_IMPORTED_MODULE_166__ = __webpack_require__(/*! ./pick.js */ "./node_modules/ramda/src/pick.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "pick", function() { return _pick_js__WEBPACK_IMPORTED_MODULE_166__; });
/* harmony import */ var _pickAll_js__WEBPACK_IMPORTED_MODULE_167__ = __webpack_require__(/*! ./pickAll.js */ "./node_modules/ramda/src/pickAll.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "pickAll", function() { return _pickAll_js__WEBPACK_IMPORTED_MODULE_167__; });
/* harmony import */ var _pickBy_js__WEBPACK_IMPORTED_MODULE_168__ = __webpack_require__(/*! ./pickBy.js */ "./node_modules/ramda/src/pickBy.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "pickBy", function() { return _pickBy_js__WEBPACK_IMPORTED_MODULE_168__; });
/* harmony import */ var _pipe_js__WEBPACK_IMPORTED_MODULE_169__ = __webpack_require__(/*! ./pipe.js */ "./node_modules/ramda/src/pipe.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "pipe", function() { return _pipe_js__WEBPACK_IMPORTED_MODULE_169__; });
/* harmony import */ var _pipeK_js__WEBPACK_IMPORTED_MODULE_170__ = __webpack_require__(/*! ./pipeK.js */ "./node_modules/ramda/src/pipeK.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "pipeK", function() { return _pipeK_js__WEBPACK_IMPORTED_MODULE_170__; });
/* harmony import */ var _pipeP_js__WEBPACK_IMPORTED_MODULE_171__ = __webpack_require__(/*! ./pipeP.js */ "./node_modules/ramda/src/pipeP.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "pipeP", function() { return _pipeP_js__WEBPACK_IMPORTED_MODULE_171__; });
/* harmony import */ var _pipeWith_js__WEBPACK_IMPORTED_MODULE_172__ = __webpack_require__(/*! ./pipeWith.js */ "./node_modules/ramda/src/pipeWith.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "pipeWith", function() { return _pipeWith_js__WEBPACK_IMPORTED_MODULE_172__; });
/* harmony import */ var _pluck_js__WEBPACK_IMPORTED_MODULE_173__ = __webpack_require__(/*! ./pluck.js */ "./node_modules/ramda/src/pluck.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "pluck", function() { return _pluck_js__WEBPACK_IMPORTED_MODULE_173__; });
/* harmony import */ var _prepend_js__WEBPACK_IMPORTED_MODULE_174__ = __webpack_require__(/*! ./prepend.js */ "./node_modules/ramda/src/prepend.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "prepend", function() { return _prepend_js__WEBPACK_IMPORTED_MODULE_174__; });
/* harmony import */ var _product_js__WEBPACK_IMPORTED_MODULE_175__ = __webpack_require__(/*! ./product.js */ "./node_modules/ramda/src/product.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "product", function() { return _product_js__WEBPACK_IMPORTED_MODULE_175__; });
/* harmony import */ var _project_js__WEBPACK_IMPORTED_MODULE_176__ = __webpack_require__(/*! ./project.js */ "./node_modules/ramda/src/project.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "project", function() { return _project_js__WEBPACK_IMPORTED_MODULE_176__; });
/* harmony import */ var _prop_js__WEBPACK_IMPORTED_MODULE_177__ = __webpack_require__(/*! ./prop.js */ "./node_modules/ramda/src/prop.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "prop", function() { return _prop_js__WEBPACK_IMPORTED_MODULE_177__; });
/* harmony import */ var _propEq_js__WEBPACK_IMPORTED_MODULE_178__ = __webpack_require__(/*! ./propEq.js */ "./node_modules/ramda/src/propEq.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "propEq", function() { return _propEq_js__WEBPACK_IMPORTED_MODULE_178__; });
/* harmony import */ var _propIs_js__WEBPACK_IMPORTED_MODULE_179__ = __webpack_require__(/*! ./propIs.js */ "./node_modules/ramda/src/propIs.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "propIs", function() { return _propIs_js__WEBPACK_IMPORTED_MODULE_179__; });
/* harmony import */ var _propOr_js__WEBPACK_IMPORTED_MODULE_180__ = __webpack_require__(/*! ./propOr.js */ "./node_modules/ramda/src/propOr.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "propOr", function() { return _propOr_js__WEBPACK_IMPORTED_MODULE_180__; });
/* harmony import */ var _propSatisfies_js__WEBPACK_IMPORTED_MODULE_181__ = __webpack_require__(/*! ./propSatisfies.js */ "./node_modules/ramda/src/propSatisfies.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "propSatisfies", function() { return _propSatisfies_js__WEBPACK_IMPORTED_MODULE_181__; });
/* harmony import */ var _props_js__WEBPACK_IMPORTED_MODULE_182__ = __webpack_require__(/*! ./props.js */ "./node_modules/ramda/src/props.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "props", function() { return _props_js__WEBPACK_IMPORTED_MODULE_182__; });
/* harmony import */ var _range_js__WEBPACK_IMPORTED_MODULE_183__ = __webpack_require__(/*! ./range.js */ "./node_modules/ramda/src/range.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "range", function() { return _range_js__WEBPACK_IMPORTED_MODULE_183__; });
/* harmony import */ var _reduce_js__WEBPACK_IMPORTED_MODULE_184__ = __webpack_require__(/*! ./reduce.js */ "./node_modules/ramda/src/reduce.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "reduce", function() { return _reduce_js__WEBPACK_IMPORTED_MODULE_184__; });
/* harmony import */ var _reduceBy_js__WEBPACK_IMPORTED_MODULE_185__ = __webpack_require__(/*! ./reduceBy.js */ "./node_modules/ramda/src/reduceBy.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "reduceBy", function() { return _reduceBy_js__WEBPACK_IMPORTED_MODULE_185__; });
/* harmony import */ var _reduceRight_js__WEBPACK_IMPORTED_MODULE_186__ = __webpack_require__(/*! ./reduceRight.js */ "./node_modules/ramda/src/reduceRight.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "reduceRight", function() { return _reduceRight_js__WEBPACK_IMPORTED_MODULE_186__; });
/* harmony import */ var _reduceWhile_js__WEBPACK_IMPORTED_MODULE_187__ = __webpack_require__(/*! ./reduceWhile.js */ "./node_modules/ramda/src/reduceWhile.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "reduceWhile", function() { return _reduceWhile_js__WEBPACK_IMPORTED_MODULE_187__; });
/* harmony import */ var _reduced_js__WEBPACK_IMPORTED_MODULE_188__ = __webpack_require__(/*! ./reduced.js */ "./node_modules/ramda/src/reduced.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "reduced", function() { return _reduced_js__WEBPACK_IMPORTED_MODULE_188__; });
/* harmony import */ var _reject_js__WEBPACK_IMPORTED_MODULE_189__ = __webpack_require__(/*! ./reject.js */ "./node_modules/ramda/src/reject.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "reject", function() { return _reject_js__WEBPACK_IMPORTED_MODULE_189__; });
/* harmony import */ var _remove_js__WEBPACK_IMPORTED_MODULE_190__ = __webpack_require__(/*! ./remove.js */ "./node_modules/ramda/src/remove.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "remove", function() { return _remove_js__WEBPACK_IMPORTED_MODULE_190__; });
/* harmony import */ var _repeat_js__WEBPACK_IMPORTED_MODULE_191__ = __webpack_require__(/*! ./repeat.js */ "./node_modules/ramda/src/repeat.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "repeat", function() { return _repeat_js__WEBPACK_IMPORTED_MODULE_191__; });
/* harmony import */ var _replace_js__WEBPACK_IMPORTED_MODULE_192__ = __webpack_require__(/*! ./replace.js */ "./node_modules/ramda/src/replace.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "replace", function() { return _replace_js__WEBPACK_IMPORTED_MODULE_192__; });
/* harmony import */ var _reverse_js__WEBPACK_IMPORTED_MODULE_193__ = __webpack_require__(/*! ./reverse.js */ "./node_modules/ramda/src/reverse.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "reverse", function() { return _reverse_js__WEBPACK_IMPORTED_MODULE_193__; });
/* harmony import */ var _scan_js__WEBPACK_IMPORTED_MODULE_194__ = __webpack_require__(/*! ./scan.js */ "./node_modules/ramda/src/scan.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "scan", function() { return _scan_js__WEBPACK_IMPORTED_MODULE_194__; });
/* harmony import */ var _sequence_js__WEBPACK_IMPORTED_MODULE_195__ = __webpack_require__(/*! ./sequence.js */ "./node_modules/ramda/src/sequence.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "sequence", function() { return _sequence_js__WEBPACK_IMPORTED_MODULE_195__; });
/* harmony import */ var _set_js__WEBPACK_IMPORTED_MODULE_196__ = __webpack_require__(/*! ./set.js */ "./node_modules/ramda/src/set.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "set", function() { return _set_js__WEBPACK_IMPORTED_MODULE_196__; });
/* harmony import */ var _slice_js__WEBPACK_IMPORTED_MODULE_197__ = __webpack_require__(/*! ./slice.js */ "./node_modules/ramda/src/slice.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "slice", function() { return _slice_js__WEBPACK_IMPORTED_MODULE_197__; });
/* harmony import */ var _sort_js__WEBPACK_IMPORTED_MODULE_198__ = __webpack_require__(/*! ./sort.js */ "./node_modules/ramda/src/sort.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "sort", function() { return _sort_js__WEBPACK_IMPORTED_MODULE_198__; });
/* harmony import */ var _sortBy_js__WEBPACK_IMPORTED_MODULE_199__ = __webpack_require__(/*! ./sortBy.js */ "./node_modules/ramda/src/sortBy.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "sortBy", function() { return _sortBy_js__WEBPACK_IMPORTED_MODULE_199__; });
/* harmony import */ var _sortWith_js__WEBPACK_IMPORTED_MODULE_200__ = __webpack_require__(/*! ./sortWith.js */ "./node_modules/ramda/src/sortWith.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "sortWith", function() { return _sortWith_js__WEBPACK_IMPORTED_MODULE_200__; });
/* harmony import */ var _split_js__WEBPACK_IMPORTED_MODULE_201__ = __webpack_require__(/*! ./split.js */ "./node_modules/ramda/src/split.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "split", function() { return _split_js__WEBPACK_IMPORTED_MODULE_201__; });
/* harmony import */ var _splitAt_js__WEBPACK_IMPORTED_MODULE_202__ = __webpack_require__(/*! ./splitAt.js */ "./node_modules/ramda/src/splitAt.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "splitAt", function() { return _splitAt_js__WEBPACK_IMPORTED_MODULE_202__; });
/* harmony import */ var _splitEvery_js__WEBPACK_IMPORTED_MODULE_203__ = __webpack_require__(/*! ./splitEvery.js */ "./node_modules/ramda/src/splitEvery.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "splitEvery", function() { return _splitEvery_js__WEBPACK_IMPORTED_MODULE_203__; });
/* harmony import */ var _splitWhen_js__WEBPACK_IMPORTED_MODULE_204__ = __webpack_require__(/*! ./splitWhen.js */ "./node_modules/ramda/src/splitWhen.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "splitWhen", function() { return _splitWhen_js__WEBPACK_IMPORTED_MODULE_204__; });
/* harmony import */ var _startsWith_js__WEBPACK_IMPORTED_MODULE_205__ = __webpack_require__(/*! ./startsWith.js */ "./node_modules/ramda/src/startsWith.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "startsWith", function() { return _startsWith_js__WEBPACK_IMPORTED_MODULE_205__; });
/* harmony import */ var _subtract_js__WEBPACK_IMPORTED_MODULE_206__ = __webpack_require__(/*! ./subtract.js */ "./node_modules/ramda/src/subtract.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "subtract", function() { return _subtract_js__WEBPACK_IMPORTED_MODULE_206__; });
/* harmony import */ var _sum_js__WEBPACK_IMPORTED_MODULE_207__ = __webpack_require__(/*! ./sum.js */ "./node_modules/ramda/src/sum.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "sum", function() { return _sum_js__WEBPACK_IMPORTED_MODULE_207__; });
/* harmony import */ var _symmetricDifference_js__WEBPACK_IMPORTED_MODULE_208__ = __webpack_require__(/*! ./symmetricDifference.js */ "./node_modules/ramda/src/symmetricDifference.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "symmetricDifference", function() { return _symmetricDifference_js__WEBPACK_IMPORTED_MODULE_208__; });
/* harmony import */ var _symmetricDifferenceWith_js__WEBPACK_IMPORTED_MODULE_209__ = __webpack_require__(/*! ./symmetricDifferenceWith.js */ "./node_modules/ramda/src/symmetricDifferenceWith.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "symmetricDifferenceWith", function() { return _symmetricDifferenceWith_js__WEBPACK_IMPORTED_MODULE_209__; });
/* harmony import */ var _tail_js__WEBPACK_IMPORTED_MODULE_210__ = __webpack_require__(/*! ./tail.js */ "./node_modules/ramda/src/tail.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "tail", function() { return _tail_js__WEBPACK_IMPORTED_MODULE_210__; });
/* harmony import */ var _take_js__WEBPACK_IMPORTED_MODULE_211__ = __webpack_require__(/*! ./take.js */ "./node_modules/ramda/src/take.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "take", function() { return _take_js__WEBPACK_IMPORTED_MODULE_211__; });
/* harmony import */ var _takeLast_js__WEBPACK_IMPORTED_MODULE_212__ = __webpack_require__(/*! ./takeLast.js */ "./node_modules/ramda/src/takeLast.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "takeLast", function() { return _takeLast_js__WEBPACK_IMPORTED_MODULE_212__; });
/* harmony import */ var _takeLastWhile_js__WEBPACK_IMPORTED_MODULE_213__ = __webpack_require__(/*! ./takeLastWhile.js */ "./node_modules/ramda/src/takeLastWhile.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "takeLastWhile", function() { return _takeLastWhile_js__WEBPACK_IMPORTED_MODULE_213__; });
/* harmony import */ var _takeWhile_js__WEBPACK_IMPORTED_MODULE_214__ = __webpack_require__(/*! ./takeWhile.js */ "./node_modules/ramda/src/takeWhile.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "takeWhile", function() { return _takeWhile_js__WEBPACK_IMPORTED_MODULE_214__; });
/* harmony import */ var _tap_js__WEBPACK_IMPORTED_MODULE_215__ = __webpack_require__(/*! ./tap.js */ "./node_modules/ramda/src/tap.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "tap", function() { return _tap_js__WEBPACK_IMPORTED_MODULE_215__; });
/* harmony import */ var _test_js__WEBPACK_IMPORTED_MODULE_216__ = __webpack_require__(/*! ./test.js */ "./node_modules/ramda/src/test.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "test", function() { return _test_js__WEBPACK_IMPORTED_MODULE_216__; });
/* harmony import */ var _andThen_js__WEBPACK_IMPORTED_MODULE_217__ = __webpack_require__(/*! ./andThen.js */ "./node_modules/ramda/src/andThen.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "andThen", function() { return _andThen_js__WEBPACK_IMPORTED_MODULE_217__; });
/* harmony import */ var _times_js__WEBPACK_IMPORTED_MODULE_218__ = __webpack_require__(/*! ./times.js */ "./node_modules/ramda/src/times.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "times", function() { return _times_js__WEBPACK_IMPORTED_MODULE_218__; });
/* harmony import */ var _toLower_js__WEBPACK_IMPORTED_MODULE_219__ = __webpack_require__(/*! ./toLower.js */ "./node_modules/ramda/src/toLower.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "toLower", function() { return _toLower_js__WEBPACK_IMPORTED_MODULE_219__; });
/* harmony import */ var _toPairs_js__WEBPACK_IMPORTED_MODULE_220__ = __webpack_require__(/*! ./toPairs.js */ "./node_modules/ramda/src/toPairs.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "toPairs", function() { return _toPairs_js__WEBPACK_IMPORTED_MODULE_220__; });
/* harmony import */ var _toPairsIn_js__WEBPACK_IMPORTED_MODULE_221__ = __webpack_require__(/*! ./toPairsIn.js */ "./node_modules/ramda/src/toPairsIn.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "toPairsIn", function() { return _toPairsIn_js__WEBPACK_IMPORTED_MODULE_221__; });
/* harmony import */ var _toString_js__WEBPACK_IMPORTED_MODULE_222__ = __webpack_require__(/*! ./toString.js */ "./node_modules/ramda/src/toString.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "toString", function() { return _toString_js__WEBPACK_IMPORTED_MODULE_222__; });
/* harmony import */ var _toUpper_js__WEBPACK_IMPORTED_MODULE_223__ = __webpack_require__(/*! ./toUpper.js */ "./node_modules/ramda/src/toUpper.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "toUpper", function() { return _toUpper_js__WEBPACK_IMPORTED_MODULE_223__; });
/* harmony import */ var _transduce_js__WEBPACK_IMPORTED_MODULE_224__ = __webpack_require__(/*! ./transduce.js */ "./node_modules/ramda/src/transduce.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "transduce", function() { return _transduce_js__WEBPACK_IMPORTED_MODULE_224__; });
/* harmony import */ var _transpose_js__WEBPACK_IMPORTED_MODULE_225__ = __webpack_require__(/*! ./transpose.js */ "./node_modules/ramda/src/transpose.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "transpose", function() { return _transpose_js__WEBPACK_IMPORTED_MODULE_225__; });
/* harmony import */ var _traverse_js__WEBPACK_IMPORTED_MODULE_226__ = __webpack_require__(/*! ./traverse.js */ "./node_modules/ramda/src/traverse.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "traverse", function() { return _traverse_js__WEBPACK_IMPORTED_MODULE_226__; });
/* harmony import */ var _trim_js__WEBPACK_IMPORTED_MODULE_227__ = __webpack_require__(/*! ./trim.js */ "./node_modules/ramda/src/trim.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "trim", function() { return _trim_js__WEBPACK_IMPORTED_MODULE_227__; });
/* harmony import */ var _tryCatch_js__WEBPACK_IMPORTED_MODULE_228__ = __webpack_require__(/*! ./tryCatch.js */ "./node_modules/ramda/src/tryCatch.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "tryCatch", function() { return _tryCatch_js__WEBPACK_IMPORTED_MODULE_228__; });
/* harmony import */ var _type_js__WEBPACK_IMPORTED_MODULE_229__ = __webpack_require__(/*! ./type.js */ "./node_modules/ramda/src/type.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "type", function() { return _type_js__WEBPACK_IMPORTED_MODULE_229__; });
/* harmony import */ var _unapply_js__WEBPACK_IMPORTED_MODULE_230__ = __webpack_require__(/*! ./unapply.js */ "./node_modules/ramda/src/unapply.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "unapply", function() { return _unapply_js__WEBPACK_IMPORTED_MODULE_230__; });
/* harmony import */ var _unary_js__WEBPACK_IMPORTED_MODULE_231__ = __webpack_require__(/*! ./unary.js */ "./node_modules/ramda/src/unary.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "unary", function() { return _unary_js__WEBPACK_IMPORTED_MODULE_231__; });
/* harmony import */ var _uncurryN_js__WEBPACK_IMPORTED_MODULE_232__ = __webpack_require__(/*! ./uncurryN.js */ "./node_modules/ramda/src/uncurryN.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "uncurryN", function() { return _uncurryN_js__WEBPACK_IMPORTED_MODULE_232__; });
/* harmony import */ var _unfold_js__WEBPACK_IMPORTED_MODULE_233__ = __webpack_require__(/*! ./unfold.js */ "./node_modules/ramda/src/unfold.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "unfold", function() { return _unfold_js__WEBPACK_IMPORTED_MODULE_233__; });
/* harmony import */ var _union_js__WEBPACK_IMPORTED_MODULE_234__ = __webpack_require__(/*! ./union.js */ "./node_modules/ramda/src/union.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "union", function() { return _union_js__WEBPACK_IMPORTED_MODULE_234__; });
/* harmony import */ var _unionWith_js__WEBPACK_IMPORTED_MODULE_235__ = __webpack_require__(/*! ./unionWith.js */ "./node_modules/ramda/src/unionWith.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "unionWith", function() { return _unionWith_js__WEBPACK_IMPORTED_MODULE_235__; });
/* harmony import */ var _uniq_js__WEBPACK_IMPORTED_MODULE_236__ = __webpack_require__(/*! ./uniq.js */ "./node_modules/ramda/src/uniq.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "uniq", function() { return _uniq_js__WEBPACK_IMPORTED_MODULE_236__; });
/* harmony import */ var _uniqBy_js__WEBPACK_IMPORTED_MODULE_237__ = __webpack_require__(/*! ./uniqBy.js */ "./node_modules/ramda/src/uniqBy.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "uniqBy", function() { return _uniqBy_js__WEBPACK_IMPORTED_MODULE_237__; });
/* harmony import */ var _uniqWith_js__WEBPACK_IMPORTED_MODULE_238__ = __webpack_require__(/*! ./uniqWith.js */ "./node_modules/ramda/src/uniqWith.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "uniqWith", function() { return _uniqWith_js__WEBPACK_IMPORTED_MODULE_238__; });
/* harmony import */ var _unless_js__WEBPACK_IMPORTED_MODULE_239__ = __webpack_require__(/*! ./unless.js */ "./node_modules/ramda/src/unless.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "unless", function() { return _unless_js__WEBPACK_IMPORTED_MODULE_239__; });
/* harmony import */ var _unnest_js__WEBPACK_IMPORTED_MODULE_240__ = __webpack_require__(/*! ./unnest.js */ "./node_modules/ramda/src/unnest.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "unnest", function() { return _unnest_js__WEBPACK_IMPORTED_MODULE_240__; });
/* harmony import */ var _until_js__WEBPACK_IMPORTED_MODULE_241__ = __webpack_require__(/*! ./until.js */ "./node_modules/ramda/src/until.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "until", function() { return _until_js__WEBPACK_IMPORTED_MODULE_241__; });
/* harmony import */ var _update_js__WEBPACK_IMPORTED_MODULE_242__ = __webpack_require__(/*! ./update.js */ "./node_modules/ramda/src/update.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "update", function() { return _update_js__WEBPACK_IMPORTED_MODULE_242__; });
/* harmony import */ var _useWith_js__WEBPACK_IMPORTED_MODULE_243__ = __webpack_require__(/*! ./useWith.js */ "./node_modules/ramda/src/useWith.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "useWith", function() { return _useWith_js__WEBPACK_IMPORTED_MODULE_243__; });
/* harmony import */ var _values_js__WEBPACK_IMPORTED_MODULE_244__ = __webpack_require__(/*! ./values.js */ "./node_modules/ramda/src/values.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "values", function() { return _values_js__WEBPACK_IMPORTED_MODULE_244__; });
/* harmony import */ var _valuesIn_js__WEBPACK_IMPORTED_MODULE_245__ = __webpack_require__(/*! ./valuesIn.js */ "./node_modules/ramda/src/valuesIn.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "valuesIn", function() { return _valuesIn_js__WEBPACK_IMPORTED_MODULE_245__; });
/* harmony import */ var _view_js__WEBPACK_IMPORTED_MODULE_246__ = __webpack_require__(/*! ./view.js */ "./node_modules/ramda/src/view.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "view", function() { return _view_js__WEBPACK_IMPORTED_MODULE_246__; });
/* harmony import */ var _when_js__WEBPACK_IMPORTED_MODULE_247__ = __webpack_require__(/*! ./when.js */ "./node_modules/ramda/src/when.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "when", function() { return _when_js__WEBPACK_IMPORTED_MODULE_247__; });
/* harmony import */ var _where_js__WEBPACK_IMPORTED_MODULE_248__ = __webpack_require__(/*! ./where.js */ "./node_modules/ramda/src/where.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "where", function() { return _where_js__WEBPACK_IMPORTED_MODULE_248__; });
/* harmony import */ var _whereEq_js__WEBPACK_IMPORTED_MODULE_249__ = __webpack_require__(/*! ./whereEq.js */ "./node_modules/ramda/src/whereEq.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "whereEq", function() { return _whereEq_js__WEBPACK_IMPORTED_MODULE_249__; });
/* harmony import */ var _without_js__WEBPACK_IMPORTED_MODULE_250__ = __webpack_require__(/*! ./without.js */ "./node_modules/ramda/src/without.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "without", function() { return _without_js__WEBPACK_IMPORTED_MODULE_250__; });
/* harmony import */ var _xor_js__WEBPACK_IMPORTED_MODULE_251__ = __webpack_require__(/*! ./xor.js */ "./node_modules/ramda/src/xor.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "xor", function() { return _xor_js__WEBPACK_IMPORTED_MODULE_251__; });
/* harmony import */ var _xprod_js__WEBPACK_IMPORTED_MODULE_252__ = __webpack_require__(/*! ./xprod.js */ "./node_modules/ramda/src/xprod.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "xprod", function() { return _xprod_js__WEBPACK_IMPORTED_MODULE_252__; });
/* harmony import */ var _zip_js__WEBPACK_IMPORTED_MODULE_253__ = __webpack_require__(/*! ./zip.js */ "./node_modules/ramda/src/zip.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "zip", function() { return _zip_js__WEBPACK_IMPORTED_MODULE_253__; });
/* harmony import */ var _zipObj_js__WEBPACK_IMPORTED_MODULE_254__ = __webpack_require__(/*! ./zipObj.js */ "./node_modules/ramda/src/zipObj.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "zipObj", function() { return _zipObj_js__WEBPACK_IMPORTED_MODULE_254__; });
/* harmony import */ var _zipWith_js__WEBPACK_IMPORTED_MODULE_255__ = __webpack_require__(/*! ./zipWith.js */ "./node_modules/ramda/src/zipWith.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "zipWith", function() { return _zipWith_js__WEBPACK_IMPORTED_MODULE_255__; });
/* harmony import */ var _thunkify_js__WEBPACK_IMPORTED_MODULE_256__ = __webpack_require__(/*! ./thunkify.js */ "./node_modules/ramda/src/thunkify.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "thunkify", function() { return _thunkify_js__WEBPACK_IMPORTED_MODULE_256__; });


































































































































































































































































/***/ }),

/***/ "./node_modules/ramda/src/indexBy.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/src/indexBy.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var reduceBy = /*#__PURE__*/__webpack_require__(/*! ./reduceBy */ "./node_modules/ramda/src/reduceBy.js");
/**
 * Given a function that generates a key, turns a list of objects into an
 * object indexing the objects by the given key. Note that if multiple
 * objects generate the same value for the indexing key only the last value
 * will be included in the generated object.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category List
 * @sig (a -> String) -> [{k: v}] -> {k: {k: v}}
 * @param {Function} fn Function :: a -> String
 * @param {Array} array The array of objects to index
 * @return {Object} An object indexing each array element by the given property.
 * @example
 *
 *      const list = [{id: 'xyz', title: 'A'}, {id: 'abc', title: 'B'}];
 *      R.indexBy(R.prop('id'), list);
 *      //=> {abc: {id: 'abc', title: 'B'}, xyz: {id: 'xyz', title: 'A'}}
 */


var indexBy = /*#__PURE__*/reduceBy(function (acc, elem) {
  return elem;
}, null);
module.exports = indexBy;

/***/ }),

/***/ "./node_modules/ramda/src/indexOf.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/src/indexOf.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");

var _indexOf = /*#__PURE__*/__webpack_require__(/*! ./internal/_indexOf */ "./node_modules/ramda/src/internal/_indexOf.js");

var _isArray = /*#__PURE__*/__webpack_require__(/*! ./internal/_isArray */ "./node_modules/ramda/src/internal/_isArray.js");
/**
 * Returns the position of the first occurrence of an item in an array, or -1
 * if the item is not included in the array. [`R.equals`](#equals) is used to
 * determine equality.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig a -> [a] -> Number
 * @param {*} target The item to find.
 * @param {Array} xs The array to search in.
 * @return {Number} the index of the target, or -1 if the target is not found.
 * @see R.lastIndexOf
 * @example
 *
 *      R.indexOf(3, [1,2,3,4]); //=> 2
 *      R.indexOf(10, [1,2,3,4]); //=> -1
 */


var indexOf = /*#__PURE__*/_curry2(function indexOf(target, xs) {
  return typeof xs.indexOf === 'function' && !_isArray(xs) ? xs.indexOf(target) : _indexOf(xs, target, 0);
});

module.exports = indexOf;

/***/ }),

/***/ "./node_modules/ramda/src/init.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/src/init.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var slice = /*#__PURE__*/__webpack_require__(/*! ./slice */ "./node_modules/ramda/src/slice.js");
/**
 * Returns all but the last element of the given list or string.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category List
 * @sig [a] -> [a]
 * @sig String -> String
 * @param {*} list
 * @return {*}
 * @see R.last, R.head, R.tail
 * @example
 *
 *      R.init([1, 2, 3]);  //=> [1, 2]
 *      R.init([1, 2]);     //=> [1]
 *      R.init([1]);        //=> []
 *      R.init([]);         //=> []
 *
 *      R.init('abc');  //=> 'ab'
 *      R.init('ab');   //=> 'a'
 *      R.init('a');    //=> ''
 *      R.init('');     //=> ''
 */


var init = /*#__PURE__*/slice(0, -1);
module.exports = init;

/***/ }),

/***/ "./node_modules/ramda/src/innerJoin.js":
/*!*********************************************!*\
  !*** ./node_modules/ramda/src/innerJoin.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _includesWith = /*#__PURE__*/__webpack_require__(/*! ./internal/_includesWith */ "./node_modules/ramda/src/internal/_includesWith.js");

var _curry3 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry3 */ "./node_modules/ramda/src/internal/_curry3.js");

var _filter = /*#__PURE__*/__webpack_require__(/*! ./internal/_filter */ "./node_modules/ramda/src/internal/_filter.js");
/**
 * Takes a predicate `pred`, a list `xs`, and a list `ys`, and returns a list
 * `xs'` comprising each of the elements of `xs` which is equal to one or more
 * elements of `ys` according to `pred`.
 *
 * `pred` must be a binary function expecting an element from each list.
 *
 * `xs`, `ys`, and `xs'` are treated as sets, semantically, so ordering should
 * not be significant, but since `xs'` is ordered the implementation guarantees
 * that its values are in the same order as they appear in `xs`. Duplicates are
 * not removed, so `xs'` may contain duplicates if `xs` contains duplicates.
 *
 * @func
 * @memberOf R
 * @since v0.24.0
 * @category Relation
 * @sig ((a, b) -> Boolean) -> [a] -> [b] -> [a]
 * @param {Function} pred
 * @param {Array} xs
 * @param {Array} ys
 * @return {Array}
 * @see R.intersection
 * @example
 *
 *      R.innerJoin(
 *        (record, id) => record.id === id,
 *        [{id: 824, name: 'Richie Furay'},
 *         {id: 956, name: 'Dewey Martin'},
 *         {id: 313, name: 'Bruce Palmer'},
 *         {id: 456, name: 'Stephen Stills'},
 *         {id: 177, name: 'Neil Young'}],
 *        [177, 456, 999]
 *      );
 *      //=> [{id: 456, name: 'Stephen Stills'}, {id: 177, name: 'Neil Young'}]
 */


var innerJoin = /*#__PURE__*/_curry3(function innerJoin(pred, xs, ys) {
  return _filter(function (x) {
    return _includesWith(pred, x, ys);
  }, xs);
});

module.exports = innerJoin;

/***/ }),

/***/ "./node_modules/ramda/src/insert.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/src/insert.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry3 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry3 */ "./node_modules/ramda/src/internal/_curry3.js");
/**
 * Inserts the supplied element into the list, at the specified `index`. _Note that

 * this is not destructive_: it returns a copy of the list with the changes.
 * <small>No lists have been harmed in the application of this function.</small>
 *
 * @func
 * @memberOf R
 * @since v0.2.2
 * @category List
 * @sig Number -> a -> [a] -> [a]
 * @param {Number} index The position to insert the element
 * @param {*} elt The element to insert into the Array
 * @param {Array} list The list to insert into
 * @return {Array} A new Array with `elt` inserted at `index`.
 * @example
 *
 *      R.insert(2, 'x', [1,2,3,4]); //=> [1,2,'x',3,4]
 */


var insert = /*#__PURE__*/_curry3(function insert(idx, elt, list) {
  idx = idx < list.length && idx >= 0 ? idx : list.length;
  var result = Array.prototype.slice.call(list, 0);
  result.splice(idx, 0, elt);
  return result;
});

module.exports = insert;

/***/ }),

/***/ "./node_modules/ramda/src/insertAll.js":
/*!*********************************************!*\
  !*** ./node_modules/ramda/src/insertAll.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry3 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry3 */ "./node_modules/ramda/src/internal/_curry3.js");
/**
 * Inserts the sub-list into the list, at the specified `index`. _Note that this is not
 * destructive_: it returns a copy of the list with the changes.
 * <small>No lists have been harmed in the application of this function.</small>
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category List
 * @sig Number -> [a] -> [a] -> [a]
 * @param {Number} index The position to insert the sub-list
 * @param {Array} elts The sub-list to insert into the Array
 * @param {Array} list The list to insert the sub-list into
 * @return {Array} A new Array with `elts` inserted starting at `index`.
 * @example
 *
 *      R.insertAll(2, ['x','y','z'], [1,2,3,4]); //=> [1,2,'x','y','z',3,4]
 */


var insertAll = /*#__PURE__*/_curry3(function insertAll(idx, elts, list) {
  idx = idx < list.length && idx >= 0 ? idx : list.length;
  return [].concat(Array.prototype.slice.call(list, 0, idx), elts, Array.prototype.slice.call(list, idx));
});

module.exports = insertAll;

/***/ }),

/***/ "./node_modules/ramda/src/internal/_Set.js":
/*!*************************************************!*\
  !*** ./node_modules/ramda/src/internal/_Set.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _includes = /*#__PURE__*/__webpack_require__(/*! ./_includes */ "./node_modules/ramda/src/internal/_includes.js");

var _Set = /*#__PURE__*/function () {
  function _Set() {
    /* globals Set */
    this._nativeSet = typeof Set === 'function' ? new Set() : null;
    this._items = {};
  } // until we figure out why jsdoc chokes on this
  // @param item The item to add to the Set
  // @returns {boolean} true if the item did not exist prior, otherwise false
  //


  _Set.prototype.add = function (item) {
    return !hasOrAdd(item, true, this);
  }; //
  // @param item The item to check for existence in the Set
  // @returns {boolean} true if the item exists in the Set, otherwise false
  //


  _Set.prototype.has = function (item) {
    return hasOrAdd(item, false, this);
  }; //
  // Combines the logic for checking whether an item is a member of the set and
  // for adding a new item to the set.
  //
  // @param item       The item to check or add to the Set instance.
  // @param shouldAdd  If true, the item will be added to the set if it doesn't
  //                   already exist.
  // @param set        The set instance to check or add to.
  // @return {boolean} true if the item already existed, otherwise false.
  //


  return _Set;
}();

function hasOrAdd(item, shouldAdd, set) {
  var type = typeof item;
  var prevSize, newSize;

  switch (type) {
    case 'string':
    case 'number':
      // distinguish between +0 and -0
      if (item === 0 && 1 / item === -Infinity) {
        if (set._items['-0']) {
          return true;
        } else {
          if (shouldAdd) {
            set._items['-0'] = true;
          }

          return false;
        }
      } // these types can all utilise the native Set


      if (set._nativeSet !== null) {
        if (shouldAdd) {
          prevSize = set._nativeSet.size;

          set._nativeSet.add(item);

          newSize = set._nativeSet.size;
          return newSize === prevSize;
        } else {
          return set._nativeSet.has(item);
        }
      } else {
        if (!(type in set._items)) {
          if (shouldAdd) {
            set._items[type] = {};
            set._items[type][item] = true;
          }

          return false;
        } else if (item in set._items[type]) {
          return true;
        } else {
          if (shouldAdd) {
            set._items[type][item] = true;
          }

          return false;
        }
      }

    case 'boolean':
      // set._items['boolean'] holds a two element array
      // representing [ falseExists, trueExists ]
      if (type in set._items) {
        var bIdx = item ? 1 : 0;

        if (set._items[type][bIdx]) {
          return true;
        } else {
          if (shouldAdd) {
            set._items[type][bIdx] = true;
          }

          return false;
        }
      } else {
        if (shouldAdd) {
          set._items[type] = item ? [false, true] : [true, false];
        }

        return false;
      }

    case 'function':
      // compare functions for reference equality
      if (set._nativeSet !== null) {
        if (shouldAdd) {
          prevSize = set._nativeSet.size;

          set._nativeSet.add(item);

          newSize = set._nativeSet.size;
          return newSize === prevSize;
        } else {
          return set._nativeSet.has(item);
        }
      } else {
        if (!(type in set._items)) {
          if (shouldAdd) {
            set._items[type] = [item];
          }

          return false;
        }

        if (!_includes(item, set._items[type])) {
          if (shouldAdd) {
            set._items[type].push(item);
          }

          return false;
        }

        return true;
      }

    case 'undefined':
      if (set._items[type]) {
        return true;
      } else {
        if (shouldAdd) {
          set._items[type] = true;
        }

        return false;
      }

    case 'object':
      if (item === null) {
        if (!set._items['null']) {
          if (shouldAdd) {
            set._items['null'] = true;
          }

          return false;
        }

        return true;
      }

    /* falls through */

    default:
      // reduce the search size of heterogeneous sets by creating buckets
      // for each type.
      type = Object.prototype.toString.call(item);

      if (!(type in set._items)) {
        if (shouldAdd) {
          set._items[type] = [item];
        }

        return false;
      } // scan through all previously applied items


      if (!_includes(item, set._items[type])) {
        if (shouldAdd) {
          set._items[type].push(item);
        }

        return false;
      }

      return true;
  }
} // A simple Set type that honours R.equals semantics


module.exports = _Set;

/***/ }),

/***/ "./node_modules/ramda/src/internal/_aperture.js":
/*!******************************************************!*\
  !*** ./node_modules/ramda/src/internal/_aperture.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _aperture(n, list) {
  var idx = 0;
  var limit = list.length - (n - 1);
  var acc = new Array(limit >= 0 ? limit : 0);

  while (idx < limit) {
    acc[idx] = Array.prototype.slice.call(list, idx, idx + n);
    idx += 1;
  }

  return acc;
}

module.exports = _aperture;

/***/ }),

/***/ "./node_modules/ramda/src/internal/_arity.js":
/*!***************************************************!*\
  !*** ./node_modules/ramda/src/internal/_arity.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _arity(n, fn) {
  /* eslint-disable no-unused-vars */
  switch (n) {
    case 0:
      return function () {
        return fn.apply(this, arguments);
      };

    case 1:
      return function (a0) {
        return fn.apply(this, arguments);
      };

    case 2:
      return function (a0, a1) {
        return fn.apply(this, arguments);
      };

    case 3:
      return function (a0, a1, a2) {
        return fn.apply(this, arguments);
      };

    case 4:
      return function (a0, a1, a2, a3) {
        return fn.apply(this, arguments);
      };

    case 5:
      return function (a0, a1, a2, a3, a4) {
        return fn.apply(this, arguments);
      };

    case 6:
      return function (a0, a1, a2, a3, a4, a5) {
        return fn.apply(this, arguments);
      };

    case 7:
      return function (a0, a1, a2, a3, a4, a5, a6) {
        return fn.apply(this, arguments);
      };

    case 8:
      return function (a0, a1, a2, a3, a4, a5, a6, a7) {
        return fn.apply(this, arguments);
      };

    case 9:
      return function (a0, a1, a2, a3, a4, a5, a6, a7, a8) {
        return fn.apply(this, arguments);
      };

    case 10:
      return function (a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
        return fn.apply(this, arguments);
      };

    default:
      throw new Error('First argument to _arity must be a non-negative integer no greater than ten');
  }
}

module.exports = _arity;

/***/ }),

/***/ "./node_modules/ramda/src/internal/_arrayFromIterator.js":
/*!***************************************************************!*\
  !*** ./node_modules/ramda/src/internal/_arrayFromIterator.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _arrayFromIterator(iter) {
  var list = [];
  var next;

  while (!(next = iter.next()).done) {
    list.push(next.value);
  }

  return list;
}

module.exports = _arrayFromIterator;

/***/ }),

/***/ "./node_modules/ramda/src/internal/_assertPromise.js":
/*!***********************************************************!*\
  !*** ./node_modules/ramda/src/internal/_assertPromise.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _isFunction = /*#__PURE__*/__webpack_require__(/*! ./_isFunction */ "./node_modules/ramda/src/internal/_isFunction.js");

var _toString = /*#__PURE__*/__webpack_require__(/*! ./_toString */ "./node_modules/ramda/src/internal/_toString.js");

function _assertPromise(name, p) {
  if (p == null || !_isFunction(p.then)) {
    throw new TypeError('`' + name + '` expected a Promise, received ' + _toString(p, []));
  }
}

module.exports = _assertPromise;

/***/ }),

/***/ "./node_modules/ramda/src/internal/_checkForMethod.js":
/*!************************************************************!*\
  !*** ./node_modules/ramda/src/internal/_checkForMethod.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _isArray = /*#__PURE__*/__webpack_require__(/*! ./_isArray */ "./node_modules/ramda/src/internal/_isArray.js");
/**
 * This checks whether a function has a [methodname] function. If it isn't an
 * array it will execute that function otherwise it will default to the ramda
 * implementation.
 *
 * @private
 * @param {Function} fn ramda implemtation
 * @param {String} methodname property to check for a custom implementation
 * @return {Object} Whatever the return value of the method is.
 */


function _checkForMethod(methodname, fn) {
  return function () {
    var length = arguments.length;

    if (length === 0) {
      return fn();
    }

    var obj = arguments[length - 1];
    return _isArray(obj) || typeof obj[methodname] !== 'function' ? fn.apply(this, arguments) : obj[methodname].apply(obj, Array.prototype.slice.call(arguments, 0, length - 1));
  };
}

module.exports = _checkForMethod;

/***/ }),

/***/ "./node_modules/ramda/src/internal/_clone.js":
/*!***************************************************!*\
  !*** ./node_modules/ramda/src/internal/_clone.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _cloneRegExp = /*#__PURE__*/__webpack_require__(/*! ./_cloneRegExp */ "./node_modules/ramda/src/internal/_cloneRegExp.js");

var type = /*#__PURE__*/__webpack_require__(/*! ../type */ "./node_modules/ramda/src/type.js");
/**
 * Copies an object.
 *
 * @private
 * @param {*} value The value to be copied
 * @param {Array} refFrom Array containing the source references
 * @param {Array} refTo Array containing the copied source references
 * @param {Boolean} deep Whether or not to perform deep cloning.
 * @return {*} The copied value.
 */


function _clone(value, refFrom, refTo, deep) {
  var copy = function copy(copiedValue) {
    var len = refFrom.length;
    var idx = 0;

    while (idx < len) {
      if (value === refFrom[idx]) {
        return refTo[idx];
      }

      idx += 1;
    }

    refFrom[idx + 1] = value;
    refTo[idx + 1] = copiedValue;

    for (var key in value) {
      copiedValue[key] = deep ? _clone(value[key], refFrom, refTo, true) : value[key];
    }

    return copiedValue;
  };

  switch (type(value)) {
    case 'Object':
      return copy({});

    case 'Array':
      return copy([]);

    case 'Date':
      return new Date(value.valueOf());

    case 'RegExp':
      return _cloneRegExp(value);

    default:
      return value;
  }
}

module.exports = _clone;

/***/ }),

/***/ "./node_modules/ramda/src/internal/_cloneRegExp.js":
/*!*********************************************************!*\
  !*** ./node_modules/ramda/src/internal/_cloneRegExp.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _cloneRegExp(pattern) {
  return new RegExp(pattern.source, (pattern.global ? 'g' : '') + (pattern.ignoreCase ? 'i' : '') + (pattern.multiline ? 'm' : '') + (pattern.sticky ? 'y' : '') + (pattern.unicode ? 'u' : ''));
}

module.exports = _cloneRegExp;

/***/ }),

/***/ "./node_modules/ramda/src/internal/_complement.js":
/*!********************************************************!*\
  !*** ./node_modules/ramda/src/internal/_complement.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _complement(f) {
  return function () {
    return !f.apply(this, arguments);
  };
}

module.exports = _complement;

/***/ }),

/***/ "./node_modules/ramda/src/internal/_concat.js":
/*!****************************************************!*\
  !*** ./node_modules/ramda/src/internal/_concat.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Private `concat` function to merge two array-like objects.
 *
 * @private
 * @param {Array|Arguments} [set1=[]] An array-like object.
 * @param {Array|Arguments} [set2=[]] An array-like object.
 * @return {Array} A new, merged array.
 * @example
 *
 *      _concat([4, 5, 6], [1, 2, 3]); //=> [4, 5, 6, 1, 2, 3]
 */
function _concat(set1, set2) {
  set1 = set1 || [];
  set2 = set2 || [];
  var idx;
  var len1 = set1.length;
  var len2 = set2.length;
  var result = [];
  idx = 0;

  while (idx < len1) {
    result[result.length] = set1[idx];
    idx += 1;
  }

  idx = 0;

  while (idx < len2) {
    result[result.length] = set2[idx];
    idx += 1;
  }

  return result;
}

module.exports = _concat;

/***/ }),

/***/ "./node_modules/ramda/src/internal/_createPartialApplicator.js":
/*!*********************************************************************!*\
  !*** ./node_modules/ramda/src/internal/_createPartialApplicator.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _arity = /*#__PURE__*/__webpack_require__(/*! ./_arity */ "./node_modules/ramda/src/internal/_arity.js");

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");

function _createPartialApplicator(concat) {
  return _curry2(function (fn, args) {
    return _arity(Math.max(0, fn.length - args.length), function () {
      return fn.apply(this, concat(args, arguments));
    });
  });
}

module.exports = _createPartialApplicator;

/***/ }),

/***/ "./node_modules/ramda/src/internal/_curry1.js":
/*!****************************************************!*\
  !*** ./node_modules/ramda/src/internal/_curry1.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _isPlaceholder = /*#__PURE__*/__webpack_require__(/*! ./_isPlaceholder */ "./node_modules/ramda/src/internal/_isPlaceholder.js");
/**
 * Optimized internal one-arity curry function.
 *
 * @private
 * @category Function
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */


function _curry1(fn) {
  return function f1(a) {
    if (arguments.length === 0 || _isPlaceholder(a)) {
      return f1;
    } else {
      return fn.apply(this, arguments);
    }
  };
}

module.exports = _curry1;

/***/ }),

/***/ "./node_modules/ramda/src/internal/_curry2.js":
/*!****************************************************!*\
  !*** ./node_modules/ramda/src/internal/_curry2.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = /*#__PURE__*/__webpack_require__(/*! ./_curry1 */ "./node_modules/ramda/src/internal/_curry1.js");

var _isPlaceholder = /*#__PURE__*/__webpack_require__(/*! ./_isPlaceholder */ "./node_modules/ramda/src/internal/_isPlaceholder.js");
/**
 * Optimized internal two-arity curry function.
 *
 * @private
 * @category Function
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */


function _curry2(fn) {
  return function f2(a, b) {
    switch (arguments.length) {
      case 0:
        return f2;

      case 1:
        return _isPlaceholder(a) ? f2 : _curry1(function (_b) {
          return fn(a, _b);
        });

      default:
        return _isPlaceholder(a) && _isPlaceholder(b) ? f2 : _isPlaceholder(a) ? _curry1(function (_a) {
          return fn(_a, b);
        }) : _isPlaceholder(b) ? _curry1(function (_b) {
          return fn(a, _b);
        }) : fn(a, b);
    }
  };
}

module.exports = _curry2;

/***/ }),

/***/ "./node_modules/ramda/src/internal/_curry3.js":
/*!****************************************************!*\
  !*** ./node_modules/ramda/src/internal/_curry3.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = /*#__PURE__*/__webpack_require__(/*! ./_curry1 */ "./node_modules/ramda/src/internal/_curry1.js");

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");

var _isPlaceholder = /*#__PURE__*/__webpack_require__(/*! ./_isPlaceholder */ "./node_modules/ramda/src/internal/_isPlaceholder.js");
/**
 * Optimized internal three-arity curry function.
 *
 * @private
 * @category Function
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */


function _curry3(fn) {
  return function f3(a, b, c) {
    switch (arguments.length) {
      case 0:
        return f3;

      case 1:
        return _isPlaceholder(a) ? f3 : _curry2(function (_b, _c) {
          return fn(a, _b, _c);
        });

      case 2:
        return _isPlaceholder(a) && _isPlaceholder(b) ? f3 : _isPlaceholder(a) ? _curry2(function (_a, _c) {
          return fn(_a, b, _c);
        }) : _isPlaceholder(b) ? _curry2(function (_b, _c) {
          return fn(a, _b, _c);
        }) : _curry1(function (_c) {
          return fn(a, b, _c);
        });

      default:
        return _isPlaceholder(a) && _isPlaceholder(b) && _isPlaceholder(c) ? f3 : _isPlaceholder(a) && _isPlaceholder(b) ? _curry2(function (_a, _b) {
          return fn(_a, _b, c);
        }) : _isPlaceholder(a) && _isPlaceholder(c) ? _curry2(function (_a, _c) {
          return fn(_a, b, _c);
        }) : _isPlaceholder(b) && _isPlaceholder(c) ? _curry2(function (_b, _c) {
          return fn(a, _b, _c);
        }) : _isPlaceholder(a) ? _curry1(function (_a) {
          return fn(_a, b, c);
        }) : _isPlaceholder(b) ? _curry1(function (_b) {
          return fn(a, _b, c);
        }) : _isPlaceholder(c) ? _curry1(function (_c) {
          return fn(a, b, _c);
        }) : fn(a, b, c);
    }
  };
}

module.exports = _curry3;

/***/ }),

/***/ "./node_modules/ramda/src/internal/_curryN.js":
/*!****************************************************!*\
  !*** ./node_modules/ramda/src/internal/_curryN.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _arity = /*#__PURE__*/__webpack_require__(/*! ./_arity */ "./node_modules/ramda/src/internal/_arity.js");

var _isPlaceholder = /*#__PURE__*/__webpack_require__(/*! ./_isPlaceholder */ "./node_modules/ramda/src/internal/_isPlaceholder.js");
/**
 * Internal curryN function.
 *
 * @private
 * @category Function
 * @param {Number} length The arity of the curried function.
 * @param {Array} received An array of arguments received thus far.
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */


function _curryN(length, received, fn) {
  return function () {
    var combined = [];
    var argsIdx = 0;
    var left = length;
    var combinedIdx = 0;

    while (combinedIdx < received.length || argsIdx < arguments.length) {
      var result;

      if (combinedIdx < received.length && (!_isPlaceholder(received[combinedIdx]) || argsIdx >= arguments.length)) {
        result = received[combinedIdx];
      } else {
        result = arguments[argsIdx];
        argsIdx += 1;
      }

      combined[combinedIdx] = result;

      if (!_isPlaceholder(result)) {
        left -= 1;
      }

      combinedIdx += 1;
    }

    return left <= 0 ? fn.apply(this, combined) : _arity(left, _curryN(length, combined, fn));
  };
}

module.exports = _curryN;

/***/ }),

/***/ "./node_modules/ramda/src/internal/_dispatchable.js":
/*!**********************************************************!*\
  !*** ./node_modules/ramda/src/internal/_dispatchable.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _isArray = /*#__PURE__*/__webpack_require__(/*! ./_isArray */ "./node_modules/ramda/src/internal/_isArray.js");

var _isTransformer = /*#__PURE__*/__webpack_require__(/*! ./_isTransformer */ "./node_modules/ramda/src/internal/_isTransformer.js");
/**
 * Returns a function that dispatches with different strategies based on the
 * object in list position (last argument). If it is an array, executes [fn].
 * Otherwise, if it has a function with one of the given method names, it will
 * execute that function (functor case). Otherwise, if it is a transformer,
 * uses transducer [xf] to return a new transformer (transducer case).
 * Otherwise, it will default to executing [fn].
 *
 * @private
 * @param {Array} methodNames properties to check for a custom implementation
 * @param {Function} xf transducer to initialize if object is transformer
 * @param {Function} fn default ramda implementation
 * @return {Function} A function that dispatches on object in list position
 */


function _dispatchable(methodNames, xf, fn) {
  return function () {
    if (arguments.length === 0) {
      return fn();
    }

    var args = Array.prototype.slice.call(arguments, 0);
    var obj = args.pop();

    if (!_isArray(obj)) {
      var idx = 0;

      while (idx < methodNames.length) {
        if (typeof obj[methodNames[idx]] === 'function') {
          return obj[methodNames[idx]].apply(obj, args);
        }

        idx += 1;
      }

      if (_isTransformer(obj)) {
        var transducer = xf.apply(null, args);
        return transducer(obj);
      }
    }

    return fn.apply(this, arguments);
  };
}

module.exports = _dispatchable;

/***/ }),

/***/ "./node_modules/ramda/src/internal/_dropLast.js":
/*!******************************************************!*\
  !*** ./node_modules/ramda/src/internal/_dropLast.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var take = /*#__PURE__*/__webpack_require__(/*! ../take */ "./node_modules/ramda/src/take.js");

function dropLast(n, xs) {
  return take(n < xs.length ? xs.length - n : 0, xs);
}

module.exports = dropLast;

/***/ }),

/***/ "./node_modules/ramda/src/internal/_dropLastWhile.js":
/*!***********************************************************!*\
  !*** ./node_modules/ramda/src/internal/_dropLastWhile.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var slice = /*#__PURE__*/__webpack_require__(/*! ../slice */ "./node_modules/ramda/src/slice.js");

function dropLastWhile(pred, xs) {
  var idx = xs.length - 1;

  while (idx >= 0 && pred(xs[idx])) {
    idx -= 1;
  }

  return slice(0, idx + 1, xs);
}

module.exports = dropLastWhile;

/***/ }),

/***/ "./node_modules/ramda/src/internal/_equals.js":
/*!****************************************************!*\
  !*** ./node_modules/ramda/src/internal/_equals.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _arrayFromIterator = /*#__PURE__*/__webpack_require__(/*! ./_arrayFromIterator */ "./node_modules/ramda/src/internal/_arrayFromIterator.js");

var _includesWith = /*#__PURE__*/__webpack_require__(/*! ./_includesWith */ "./node_modules/ramda/src/internal/_includesWith.js");

var _functionName = /*#__PURE__*/__webpack_require__(/*! ./_functionName */ "./node_modules/ramda/src/internal/_functionName.js");

var _has = /*#__PURE__*/__webpack_require__(/*! ./_has */ "./node_modules/ramda/src/internal/_has.js");

var _objectIs = /*#__PURE__*/__webpack_require__(/*! ./_objectIs */ "./node_modules/ramda/src/internal/_objectIs.js");

var keys = /*#__PURE__*/__webpack_require__(/*! ../keys */ "./node_modules/ramda/src/keys.js");

var type = /*#__PURE__*/__webpack_require__(/*! ../type */ "./node_modules/ramda/src/type.js");
/**
 * private _uniqContentEquals function.
 * That function is checking equality of 2 iterator contents with 2 assumptions
 * - iterators lengths are the same
 * - iterators values are unique
 *
 * false-positive result will be returned for comparision of, e.g.
 * - [1,2,3] and [1,2,3,4]
 * - [1,1,1] and [1,2,3]
 * */


function _uniqContentEquals(aIterator, bIterator, stackA, stackB) {
  var a = _arrayFromIterator(aIterator);

  var b = _arrayFromIterator(bIterator);

  function eq(_a, _b) {
    return _equals(_a, _b, stackA.slice(), stackB.slice());
  } // if *a* array contains any element that is not included in *b*


  return !_includesWith(function (b, aItem) {
    return !_includesWith(eq, aItem, b);
  }, b, a);
}

function _equals(a, b, stackA, stackB) {
  if (_objectIs(a, b)) {
    return true;
  }

  var typeA = type(a);

  if (typeA !== type(b)) {
    return false;
  }

  if (a == null || b == null) {
    return false;
  }

  if (typeof a['fantasy-land/equals'] === 'function' || typeof b['fantasy-land/equals'] === 'function') {
    return typeof a['fantasy-land/equals'] === 'function' && a['fantasy-land/equals'](b) && typeof b['fantasy-land/equals'] === 'function' && b['fantasy-land/equals'](a);
  }

  if (typeof a.equals === 'function' || typeof b.equals === 'function') {
    return typeof a.equals === 'function' && a.equals(b) && typeof b.equals === 'function' && b.equals(a);
  }

  switch (typeA) {
    case 'Arguments':
    case 'Array':
    case 'Object':
      if (typeof a.constructor === 'function' && _functionName(a.constructor) === 'Promise') {
        return a === b;
      }

      break;

    case 'Boolean':
    case 'Number':
    case 'String':
      if (!(typeof a === typeof b && _objectIs(a.valueOf(), b.valueOf()))) {
        return false;
      }

      break;

    case 'Date':
      if (!_objectIs(a.valueOf(), b.valueOf())) {
        return false;
      }

      break;

    case 'Error':
      return a.name === b.name && a.message === b.message;

    case 'RegExp':
      if (!(a.source === b.source && a.global === b.global && a.ignoreCase === b.ignoreCase && a.multiline === b.multiline && a.sticky === b.sticky && a.unicode === b.unicode)) {
        return false;
      }

      break;
  }

  var idx = stackA.length - 1;

  while (idx >= 0) {
    if (stackA[idx] === a) {
      return stackB[idx] === b;
    }

    idx -= 1;
  }

  switch (typeA) {
    case 'Map':
      if (a.size !== b.size) {
        return false;
      }

      return _uniqContentEquals(a.entries(), b.entries(), stackA.concat([a]), stackB.concat([b]));

    case 'Set':
      if (a.size !== b.size) {
        return false;
      }

      return _uniqContentEquals(a.values(), b.values(), stackA.concat([a]), stackB.concat([b]));

    case 'Arguments':
    case 'Array':
    case 'Object':
    case 'Boolean':
    case 'Number':
    case 'String':
    case 'Date':
    case 'Error':
    case 'RegExp':
    case 'Int8Array':
    case 'Uint8Array':
    case 'Uint8ClampedArray':
    case 'Int16Array':
    case 'Uint16Array':
    case 'Int32Array':
    case 'Uint32Array':
    case 'Float32Array':
    case 'Float64Array':
    case 'ArrayBuffer':
      break;

    default:
      // Values of other types are only equal if identical.
      return false;
  }

  var keysA = keys(a);

  if (keysA.length !== keys(b).length) {
    return false;
  }

  var extendedStackA = stackA.concat([a]);
  var extendedStackB = stackB.concat([b]);
  idx = keysA.length - 1;

  while (idx >= 0) {
    var key = keysA[idx];

    if (!(_has(key, b) && _equals(b[key], a[key], extendedStackA, extendedStackB))) {
      return false;
    }

    idx -= 1;
  }

  return true;
}

module.exports = _equals;

/***/ }),

/***/ "./node_modules/ramda/src/internal/_filter.js":
/*!****************************************************!*\
  !*** ./node_modules/ramda/src/internal/_filter.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _filter(fn, list) {
  var idx = 0;
  var len = list.length;
  var result = [];

  while (idx < len) {
    if (fn(list[idx])) {
      result[result.length] = list[idx];
    }

    idx += 1;
  }

  return result;
}

module.exports = _filter;

/***/ }),

/***/ "./node_modules/ramda/src/internal/_flatCat.js":
/*!*****************************************************!*\
  !*** ./node_modules/ramda/src/internal/_flatCat.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _forceReduced = /*#__PURE__*/__webpack_require__(/*! ./_forceReduced */ "./node_modules/ramda/src/internal/_forceReduced.js");

var _isArrayLike = /*#__PURE__*/__webpack_require__(/*! ./_isArrayLike */ "./node_modules/ramda/src/internal/_isArrayLike.js");

var _reduce = /*#__PURE__*/__webpack_require__(/*! ./_reduce */ "./node_modules/ramda/src/internal/_reduce.js");

var _xfBase = /*#__PURE__*/__webpack_require__(/*! ./_xfBase */ "./node_modules/ramda/src/internal/_xfBase.js");

var preservingReduced = function (xf) {
  return {
    '@@transducer/init': _xfBase.init,
    '@@transducer/result': function (result) {
      return xf['@@transducer/result'](result);
    },
    '@@transducer/step': function (result, input) {
      var ret = xf['@@transducer/step'](result, input);
      return ret['@@transducer/reduced'] ? _forceReduced(ret) : ret;
    }
  };
};

var _flatCat = function _xcat(xf) {
  var rxf = preservingReduced(xf);
  return {
    '@@transducer/init': _xfBase.init,
    '@@transducer/result': function (result) {
      return rxf['@@transducer/result'](result);
    },
    '@@transducer/step': function (result, input) {
      return !_isArrayLike(input) ? _reduce(rxf, result, [input]) : _reduce(rxf, result, input);
    }
  };
};

module.exports = _flatCat;

/***/ }),

/***/ "./node_modules/ramda/src/internal/_forceReduced.js":
/*!**********************************************************!*\
  !*** ./node_modules/ramda/src/internal/_forceReduced.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _forceReduced(x) {
  return {
    '@@transducer/value': x,
    '@@transducer/reduced': true
  };
}

module.exports = _forceReduced;

/***/ }),

/***/ "./node_modules/ramda/src/internal/_functionName.js":
/*!**********************************************************!*\
  !*** ./node_modules/ramda/src/internal/_functionName.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _functionName(f) {
  // String(x => x) evaluates to "x => x", so the pattern may not match.
  var match = String(f).match(/^function (\w*)/);
  return match == null ? '' : match[1];
}

module.exports = _functionName;

/***/ }),

/***/ "./node_modules/ramda/src/internal/_has.js":
/*!*************************************************!*\
  !*** ./node_modules/ramda/src/internal/_has.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _has(prop, obj) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = _has;

/***/ }),

/***/ "./node_modules/ramda/src/internal/_identity.js":
/*!******************************************************!*\
  !*** ./node_modules/ramda/src/internal/_identity.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _identity(x) {
  return x;
}

module.exports = _identity;

/***/ }),

/***/ "./node_modules/ramda/src/internal/_includes.js":
/*!******************************************************!*\
  !*** ./node_modules/ramda/src/internal/_includes.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _indexOf = /*#__PURE__*/__webpack_require__(/*! ./_indexOf */ "./node_modules/ramda/src/internal/_indexOf.js");

function _includes(a, list) {
  return _indexOf(list, a, 0) >= 0;
}

module.exports = _includes;

/***/ }),

/***/ "./node_modules/ramda/src/internal/_includesWith.js":
/*!**********************************************************!*\
  !*** ./node_modules/ramda/src/internal/_includesWith.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _includesWith(pred, x, list) {
  var idx = 0;
  var len = list.length;

  while (idx < len) {
    if (pred(x, list[idx])) {
      return true;
    }

    idx += 1;
  }

  return false;
}

module.exports = _includesWith;

/***/ }),

/***/ "./node_modules/ramda/src/internal/_indexOf.js":
/*!*****************************************************!*\
  !*** ./node_modules/ramda/src/internal/_indexOf.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var equals = /*#__PURE__*/__webpack_require__(/*! ../equals */ "./node_modules/ramda/src/equals.js");

function _indexOf(list, a, idx) {
  var inf, item; // Array.prototype.indexOf doesn't exist below IE9

  if (typeof list.indexOf === 'function') {
    switch (typeof a) {
      case 'number':
        if (a === 0) {
          // manually crawl the list to distinguish between +0 and -0
          inf = 1 / a;

          while (idx < list.length) {
            item = list[idx];

            if (item === 0 && 1 / item === inf) {
              return idx;
            }

            idx += 1;
          }

          return -1;
        } else if (a !== a) {
          // NaN
          while (idx < list.length) {
            item = list[idx];

            if (typeof item === 'number' && item !== item) {
              return idx;
            }

            idx += 1;
          }

          return -1;
        } // non-zero numbers can utilise Set


        return list.indexOf(a, idx);
      // all these types can utilise Set

      case 'string':
      case 'boolean':
      case 'function':
      case 'undefined':
        return list.indexOf(a, idx);

      case 'object':
        if (a === null) {
          // null can utilise Set
          return list.indexOf(a, idx);
        }

    }
  } // anything else not covered above, defer to R.equals


  while (idx < list.length) {
    if (equals(list[idx], a)) {
      return idx;
    }

    idx += 1;
  }

  return -1;
}

module.exports = _indexOf;

/***/ }),

/***/ "./node_modules/ramda/src/internal/_isArguments.js":
/*!*********************************************************!*\
  !*** ./node_modules/ramda/src/internal/_isArguments.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _has = /*#__PURE__*/__webpack_require__(/*! ./_has */ "./node_modules/ramda/src/internal/_has.js");

var toString = Object.prototype.toString;

var _isArguments = /*#__PURE__*/function () {
  return toString.call(arguments) === '[object Arguments]' ? function _isArguments(x) {
    return toString.call(x) === '[object Arguments]';
  } : function _isArguments(x) {
    return _has('callee', x);
  };
}();

module.exports = _isArguments;

/***/ }),

/***/ "./node_modules/ramda/src/internal/_isArray.js":
/*!*****************************************************!*\
  !*** ./node_modules/ramda/src/internal/_isArray.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Tests whether or not an object is an array.
 *
 * @private
 * @param {*} val The object to test.
 * @return {Boolean} `true` if `val` is an array, `false` otherwise.
 * @example
 *
 *      _isArray([]); //=> true
 *      _isArray(null); //=> false
 *      _isArray({}); //=> false
 */
module.exports = Array.isArray || function _isArray(val) {
  return val != null && val.length >= 0 && Object.prototype.toString.call(val) === '[object Array]';
};

/***/ }),

/***/ "./node_modules/ramda/src/internal/_isArrayLike.js":
/*!*********************************************************!*\
  !*** ./node_modules/ramda/src/internal/_isArrayLike.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = /*#__PURE__*/__webpack_require__(/*! ./_curry1 */ "./node_modules/ramda/src/internal/_curry1.js");

var _isArray = /*#__PURE__*/__webpack_require__(/*! ./_isArray */ "./node_modules/ramda/src/internal/_isArray.js");

var _isString = /*#__PURE__*/__webpack_require__(/*! ./_isString */ "./node_modules/ramda/src/internal/_isString.js");
/**
 * Tests whether or not an object is similar to an array.
 *
 * @private
 * @category Type
 * @category List
 * @sig * -> Boolean
 * @param {*} x The object to test.
 * @return {Boolean} `true` if `x` has a numeric length property and extreme indices defined; `false` otherwise.
 * @example
 *
 *      _isArrayLike([]); //=> true
 *      _isArrayLike(true); //=> false
 *      _isArrayLike({}); //=> false
 *      _isArrayLike({length: 10}); //=> false
 *      _isArrayLike({0: 'zero', 9: 'nine', length: 10}); //=> true
 */


var _isArrayLike = /*#__PURE__*/_curry1(function isArrayLike(x) {
  if (_isArray(x)) {
    return true;
  }

  if (!x) {
    return false;
  }

  if (typeof x !== 'object') {
    return false;
  }

  if (_isString(x)) {
    return false;
  }

  if (x.nodeType === 1) {
    return !!x.length;
  }

  if (x.length === 0) {
    return true;
  }

  if (x.length > 0) {
    return x.hasOwnProperty(0) && x.hasOwnProperty(x.length - 1);
  }

  return false;
});

module.exports = _isArrayLike;

/***/ }),

/***/ "./node_modules/ramda/src/internal/_isFunction.js":
/*!********************************************************!*\
  !*** ./node_modules/ramda/src/internal/_isFunction.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _isFunction(x) {
  var type = Object.prototype.toString.call(x);
  return type === '[object Function]' || type === '[object AsyncFunction]' || type === '[object GeneratorFunction]' || type === '[object AsyncGeneratorFunction]';
}

module.exports = _isFunction;

/***/ }),

/***/ "./node_modules/ramda/src/internal/_isInteger.js":
/*!*******************************************************!*\
  !*** ./node_modules/ramda/src/internal/_isInteger.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Determine if the passed argument is an integer.
 *
 * @private
 * @param {*} n
 * @category Type
 * @return {Boolean}
 */
module.exports = Number.isInteger || function _isInteger(n) {
  return n << 0 === n;
};

/***/ }),

/***/ "./node_modules/ramda/src/internal/_isNumber.js":
/*!******************************************************!*\
  !*** ./node_modules/ramda/src/internal/_isNumber.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _isNumber(x) {
  return Object.prototype.toString.call(x) === '[object Number]';
}

module.exports = _isNumber;

/***/ }),

/***/ "./node_modules/ramda/src/internal/_isObject.js":
/*!******************************************************!*\
  !*** ./node_modules/ramda/src/internal/_isObject.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _isObject(x) {
  return Object.prototype.toString.call(x) === '[object Object]';
}

module.exports = _isObject;

/***/ }),

/***/ "./node_modules/ramda/src/internal/_isPlaceholder.js":
/*!***********************************************************!*\
  !*** ./node_modules/ramda/src/internal/_isPlaceholder.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _isPlaceholder(a) {
  return a != null && typeof a === 'object' && a['@@functional/placeholder'] === true;
}

module.exports = _isPlaceholder;

/***/ }),

/***/ "./node_modules/ramda/src/internal/_isRegExp.js":
/*!******************************************************!*\
  !*** ./node_modules/ramda/src/internal/_isRegExp.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _isRegExp(x) {
  return Object.prototype.toString.call(x) === '[object RegExp]';
}

module.exports = _isRegExp;

/***/ }),

/***/ "./node_modules/ramda/src/internal/_isString.js":
/*!******************************************************!*\
  !*** ./node_modules/ramda/src/internal/_isString.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _isString(x) {
  return Object.prototype.toString.call(x) === '[object String]';
}

module.exports = _isString;

/***/ }),

/***/ "./node_modules/ramda/src/internal/_isTransformer.js":
/*!***********************************************************!*\
  !*** ./node_modules/ramda/src/internal/_isTransformer.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _isTransformer(obj) {
  return obj != null && typeof obj['@@transducer/step'] === 'function';
}

module.exports = _isTransformer;

/***/ }),

/***/ "./node_modules/ramda/src/internal/_makeFlat.js":
/*!******************************************************!*\
  !*** ./node_modules/ramda/src/internal/_makeFlat.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _isArrayLike = /*#__PURE__*/__webpack_require__(/*! ./_isArrayLike */ "./node_modules/ramda/src/internal/_isArrayLike.js");
/**
 * `_makeFlat` is a helper function that returns a one-level or fully recursive
 * function based on the flag passed in.
 *
 * @private
 */


function _makeFlat(recursive) {
  return function flatt(list) {
    var value, jlen, j;
    var result = [];
    var idx = 0;
    var ilen = list.length;

    while (idx < ilen) {
      if (_isArrayLike(list[idx])) {
        value = recursive ? flatt(list[idx]) : list[idx];
        j = 0;
        jlen = value.length;

        while (j < jlen) {
          result[result.length] = value[j];
          j += 1;
        }
      } else {
        result[result.length] = list[idx];
      }

      idx += 1;
    }

    return result;
  };
}

module.exports = _makeFlat;

/***/ }),

/***/ "./node_modules/ramda/src/internal/_map.js":
/*!*************************************************!*\
  !*** ./node_modules/ramda/src/internal/_map.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _map(fn, functor) {
  var idx = 0;
  var len = functor.length;
  var result = Array(len);

  while (idx < len) {
    result[idx] = fn(functor[idx]);
    idx += 1;
  }

  return result;
}

module.exports = _map;

/***/ }),

/***/ "./node_modules/ramda/src/internal/_objectAssign.js":
/*!**********************************************************!*\
  !*** ./node_modules/ramda/src/internal/_objectAssign.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _has = /*#__PURE__*/__webpack_require__(/*! ./_has */ "./node_modules/ramda/src/internal/_has.js"); // Based on https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign


function _objectAssign(target) {
  if (target == null) {
    throw new TypeError('Cannot convert undefined or null to object');
  }

  var output = Object(target);
  var idx = 1;
  var length = arguments.length;

  while (idx < length) {
    var source = arguments[idx];

    if (source != null) {
      for (var nextKey in source) {
        if (_has(nextKey, source)) {
          output[nextKey] = source[nextKey];
        }
      }
    }

    idx += 1;
  }

  return output;
}

module.exports = typeof Object.assign === 'function' ? Object.assign : _objectAssign;

/***/ }),

/***/ "./node_modules/ramda/src/internal/_objectIs.js":
/*!******************************************************!*\
  !*** ./node_modules/ramda/src/internal/_objectIs.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Based on https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
function _objectIs(a, b) {
  // SameValue algorithm
  if (a === b) {
    // Steps 1-5, 7-10
    // Steps 6.b-6.e: +0 != -0
    return a !== 0 || 1 / a === 1 / b;
  } else {
    // Step 6.a: NaN == NaN
    return a !== a && b !== b;
  }
}

module.exports = typeof Object.is === 'function' ? Object.is : _objectIs;

/***/ }),

/***/ "./node_modules/ramda/src/internal/_of.js":
/*!************************************************!*\
  !*** ./node_modules/ramda/src/internal/_of.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _of(x) {
  return [x];
}

module.exports = _of;

/***/ }),

/***/ "./node_modules/ramda/src/internal/_pipe.js":
/*!**************************************************!*\
  !*** ./node_modules/ramda/src/internal/_pipe.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _pipe(f, g) {
  return function () {
    return g.call(this, f.apply(this, arguments));
  };
}

module.exports = _pipe;

/***/ }),

/***/ "./node_modules/ramda/src/internal/_pipeP.js":
/*!***************************************************!*\
  !*** ./node_modules/ramda/src/internal/_pipeP.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _pipeP(f, g) {
  return function () {
    var ctx = this;
    return f.apply(ctx, arguments).then(function (x) {
      return g.call(ctx, x);
    });
  };
}

module.exports = _pipeP;

/***/ }),

/***/ "./node_modules/ramda/src/internal/_quote.js":
/*!***************************************************!*\
  !*** ./node_modules/ramda/src/internal/_quote.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _quote(s) {
  var escaped = s.replace(/\\/g, '\\\\').replace(/[\b]/g, '\\b') // \b matches word boundary; [\b] matches backspace
  .replace(/\f/g, '\\f').replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/\t/g, '\\t').replace(/\v/g, '\\v').replace(/\0/g, '\\0');
  return '"' + escaped.replace(/"/g, '\\"') + '"';
}

module.exports = _quote;

/***/ }),

/***/ "./node_modules/ramda/src/internal/_reduce.js":
/*!****************************************************!*\
  !*** ./node_modules/ramda/src/internal/_reduce.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _isArrayLike = /*#__PURE__*/__webpack_require__(/*! ./_isArrayLike */ "./node_modules/ramda/src/internal/_isArrayLike.js");

var _xwrap = /*#__PURE__*/__webpack_require__(/*! ./_xwrap */ "./node_modules/ramda/src/internal/_xwrap.js");

var bind = /*#__PURE__*/__webpack_require__(/*! ../bind */ "./node_modules/ramda/src/bind.js");

function _arrayReduce(xf, acc, list) {
  var idx = 0;
  var len = list.length;

  while (idx < len) {
    acc = xf['@@transducer/step'](acc, list[idx]);

    if (acc && acc['@@transducer/reduced']) {
      acc = acc['@@transducer/value'];
      break;
    }

    idx += 1;
  }

  return xf['@@transducer/result'](acc);
}

function _iterableReduce(xf, acc, iter) {
  var step = iter.next();

  while (!step.done) {
    acc = xf['@@transducer/step'](acc, step.value);

    if (acc && acc['@@transducer/reduced']) {
      acc = acc['@@transducer/value'];
      break;
    }

    step = iter.next();
  }

  return xf['@@transducer/result'](acc);
}

function _methodReduce(xf, acc, obj, methodName) {
  return xf['@@transducer/result'](obj[methodName](bind(xf['@@transducer/step'], xf), acc));
}

var symIterator = typeof Symbol !== 'undefined' ? Symbol.iterator : '@@iterator';

function _reduce(fn, acc, list) {
  if (typeof fn === 'function') {
    fn = _xwrap(fn);
  }

  if (_isArrayLike(list)) {
    return _arrayReduce(fn, acc, list);
  }

  if (typeof list['fantasy-land/reduce'] === 'function') {
    return _methodReduce(fn, acc, list, 'fantasy-land/reduce');
  }

  if (list[symIterator] != null) {
    return _iterableReduce(fn, acc, list[symIterator]());
  }

  if (typeof list.next === 'function') {
    return _iterableReduce(fn, acc, list);
  }

  if (typeof list.reduce === 'function') {
    return _methodReduce(fn, acc, list, 'reduce');
  }

  throw new TypeError('reduce: list must be array or iterable');
}

module.exports = _reduce;

/***/ }),

/***/ "./node_modules/ramda/src/internal/_reduced.js":
/*!*****************************************************!*\
  !*** ./node_modules/ramda/src/internal/_reduced.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _reduced(x) {
  return x && x['@@transducer/reduced'] ? x : {
    '@@transducer/value': x,
    '@@transducer/reduced': true
  };
}

module.exports = _reduced;

/***/ }),

/***/ "./node_modules/ramda/src/internal/_stepCat.js":
/*!*****************************************************!*\
  !*** ./node_modules/ramda/src/internal/_stepCat.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _objectAssign = /*#__PURE__*/__webpack_require__(/*! ./_objectAssign */ "./node_modules/ramda/src/internal/_objectAssign.js");

var _identity = /*#__PURE__*/__webpack_require__(/*! ./_identity */ "./node_modules/ramda/src/internal/_identity.js");

var _isArrayLike = /*#__PURE__*/__webpack_require__(/*! ./_isArrayLike */ "./node_modules/ramda/src/internal/_isArrayLike.js");

var _isTransformer = /*#__PURE__*/__webpack_require__(/*! ./_isTransformer */ "./node_modules/ramda/src/internal/_isTransformer.js");

var objOf = /*#__PURE__*/__webpack_require__(/*! ../objOf */ "./node_modules/ramda/src/objOf.js");

var _stepCatArray = {
  '@@transducer/init': Array,
  '@@transducer/step': function (xs, x) {
    xs.push(x);
    return xs;
  },
  '@@transducer/result': _identity
};
var _stepCatString = {
  '@@transducer/init': String,
  '@@transducer/step': function (a, b) {
    return a + b;
  },
  '@@transducer/result': _identity
};
var _stepCatObject = {
  '@@transducer/init': Object,
  '@@transducer/step': function (result, input) {
    return _objectAssign(result, _isArrayLike(input) ? objOf(input[0], input[1]) : input);
  },
  '@@transducer/result': _identity
};

function _stepCat(obj) {
  if (_isTransformer(obj)) {
    return obj;
  }

  if (_isArrayLike(obj)) {
    return _stepCatArray;
  }

  if (typeof obj === 'string') {
    return _stepCatString;
  }

  if (typeof obj === 'object') {
    return _stepCatObject;
  }

  throw new Error('Cannot create transformer for ' + obj);
}

module.exports = _stepCat;

/***/ }),

/***/ "./node_modules/ramda/src/internal/_toISOString.js":
/*!*********************************************************!*\
  !*** ./node_modules/ramda/src/internal/_toISOString.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Polyfill from <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString>.
 */
var pad = function pad(n) {
  return (n < 10 ? '0' : '') + n;
};

var _toISOString = typeof Date.prototype.toISOString === 'function' ? function _toISOString(d) {
  return d.toISOString();
} : function _toISOString(d) {
  return d.getUTCFullYear() + '-' + pad(d.getUTCMonth() + 1) + '-' + pad(d.getUTCDate()) + 'T' + pad(d.getUTCHours()) + ':' + pad(d.getUTCMinutes()) + ':' + pad(d.getUTCSeconds()) + '.' + (d.getUTCMilliseconds() / 1000).toFixed(3).slice(2, 5) + 'Z';
};

module.exports = _toISOString;

/***/ }),

/***/ "./node_modules/ramda/src/internal/_toString.js":
/*!******************************************************!*\
  !*** ./node_modules/ramda/src/internal/_toString.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _includes = /*#__PURE__*/__webpack_require__(/*! ./_includes */ "./node_modules/ramda/src/internal/_includes.js");

var _map = /*#__PURE__*/__webpack_require__(/*! ./_map */ "./node_modules/ramda/src/internal/_map.js");

var _quote = /*#__PURE__*/__webpack_require__(/*! ./_quote */ "./node_modules/ramda/src/internal/_quote.js");

var _toISOString = /*#__PURE__*/__webpack_require__(/*! ./_toISOString */ "./node_modules/ramda/src/internal/_toISOString.js");

var keys = /*#__PURE__*/__webpack_require__(/*! ../keys */ "./node_modules/ramda/src/keys.js");

var reject = /*#__PURE__*/__webpack_require__(/*! ../reject */ "./node_modules/ramda/src/reject.js");

function _toString(x, seen) {
  var recur = function recur(y) {
    var xs = seen.concat([x]);
    return _includes(y, xs) ? '<Circular>' : _toString(y, xs);
  }; //  mapPairs :: (Object, [String]) -> [String]


  var mapPairs = function (obj, keys) {
    return _map(function (k) {
      return _quote(k) + ': ' + recur(obj[k]);
    }, keys.slice().sort());
  };

  switch (Object.prototype.toString.call(x)) {
    case '[object Arguments]':
      return '(function() { return arguments; }(' + _map(recur, x).join(', ') + '))';

    case '[object Array]':
      return '[' + _map(recur, x).concat(mapPairs(x, reject(function (k) {
        return /^\d+$/.test(k);
      }, keys(x)))).join(', ') + ']';

    case '[object Boolean]':
      return typeof x === 'object' ? 'new Boolean(' + recur(x.valueOf()) + ')' : x.toString();

    case '[object Date]':
      return 'new Date(' + (isNaN(x.valueOf()) ? recur(NaN) : _quote(_toISOString(x))) + ')';

    case '[object Null]':
      return 'null';

    case '[object Number]':
      return typeof x === 'object' ? 'new Number(' + recur(x.valueOf()) + ')' : 1 / x === -Infinity ? '-0' : x.toString(10);

    case '[object String]':
      return typeof x === 'object' ? 'new String(' + recur(x.valueOf()) + ')' : _quote(x);

    case '[object Undefined]':
      return 'undefined';

    default:
      if (typeof x.toString === 'function') {
        var repr = x.toString();

        if (repr !== '[object Object]') {
          return repr;
        }
      }

      return '{' + mapPairs(x, keys(x)).join(', ') + '}';
  }
}

module.exports = _toString;

/***/ }),

/***/ "./node_modules/ramda/src/internal/_xall.js":
/*!**************************************************!*\
  !*** ./node_modules/ramda/src/internal/_xall.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");

var _reduced = /*#__PURE__*/__webpack_require__(/*! ./_reduced */ "./node_modules/ramda/src/internal/_reduced.js");

var _xfBase = /*#__PURE__*/__webpack_require__(/*! ./_xfBase */ "./node_modules/ramda/src/internal/_xfBase.js");

var XAll = /*#__PURE__*/function () {
  function XAll(f, xf) {
    this.xf = xf;
    this.f = f;
    this.all = true;
  }

  XAll.prototype['@@transducer/init'] = _xfBase.init;

  XAll.prototype['@@transducer/result'] = function (result) {
    if (this.all) {
      result = this.xf['@@transducer/step'](result, true);
    }

    return this.xf['@@transducer/result'](result);
  };

  XAll.prototype['@@transducer/step'] = function (result, input) {
    if (!this.f(input)) {
      this.all = false;
      result = _reduced(this.xf['@@transducer/step'](result, false));
    }

    return result;
  };

  return XAll;
}();

var _xall = /*#__PURE__*/_curry2(function _xall(f, xf) {
  return new XAll(f, xf);
});

module.exports = _xall;

/***/ }),

/***/ "./node_modules/ramda/src/internal/_xany.js":
/*!**************************************************!*\
  !*** ./node_modules/ramda/src/internal/_xany.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");

var _reduced = /*#__PURE__*/__webpack_require__(/*! ./_reduced */ "./node_modules/ramda/src/internal/_reduced.js");

var _xfBase = /*#__PURE__*/__webpack_require__(/*! ./_xfBase */ "./node_modules/ramda/src/internal/_xfBase.js");

var XAny = /*#__PURE__*/function () {
  function XAny(f, xf) {
    this.xf = xf;
    this.f = f;
    this.any = false;
  }

  XAny.prototype['@@transducer/init'] = _xfBase.init;

  XAny.prototype['@@transducer/result'] = function (result) {
    if (!this.any) {
      result = this.xf['@@transducer/step'](result, false);
    }

    return this.xf['@@transducer/result'](result);
  };

  XAny.prototype['@@transducer/step'] = function (result, input) {
    if (this.f(input)) {
      this.any = true;
      result = _reduced(this.xf['@@transducer/step'](result, true));
    }

    return result;
  };

  return XAny;
}();

var _xany = /*#__PURE__*/_curry2(function _xany(f, xf) {
  return new XAny(f, xf);
});

module.exports = _xany;

/***/ }),

/***/ "./node_modules/ramda/src/internal/_xaperture.js":
/*!*******************************************************!*\
  !*** ./node_modules/ramda/src/internal/_xaperture.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _concat = /*#__PURE__*/__webpack_require__(/*! ./_concat */ "./node_modules/ramda/src/internal/_concat.js");

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");

var _xfBase = /*#__PURE__*/__webpack_require__(/*! ./_xfBase */ "./node_modules/ramda/src/internal/_xfBase.js");

var XAperture = /*#__PURE__*/function () {
  function XAperture(n, xf) {
    this.xf = xf;
    this.pos = 0;
    this.full = false;
    this.acc = new Array(n);
  }

  XAperture.prototype['@@transducer/init'] = _xfBase.init;

  XAperture.prototype['@@transducer/result'] = function (result) {
    this.acc = null;
    return this.xf['@@transducer/result'](result);
  };

  XAperture.prototype['@@transducer/step'] = function (result, input) {
    this.store(input);
    return this.full ? this.xf['@@transducer/step'](result, this.getCopy()) : result;
  };

  XAperture.prototype.store = function (input) {
    this.acc[this.pos] = input;
    this.pos += 1;

    if (this.pos === this.acc.length) {
      this.pos = 0;
      this.full = true;
    }
  };

  XAperture.prototype.getCopy = function () {
    return _concat(Array.prototype.slice.call(this.acc, this.pos), Array.prototype.slice.call(this.acc, 0, this.pos));
  };

  return XAperture;
}();

var _xaperture = /*#__PURE__*/_curry2(function _xaperture(n, xf) {
  return new XAperture(n, xf);
});

module.exports = _xaperture;

/***/ }),

/***/ "./node_modules/ramda/src/internal/_xchain.js":
/*!****************************************************!*\
  !*** ./node_modules/ramda/src/internal/_xchain.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");

var _flatCat = /*#__PURE__*/__webpack_require__(/*! ./_flatCat */ "./node_modules/ramda/src/internal/_flatCat.js");

var map = /*#__PURE__*/__webpack_require__(/*! ../map */ "./node_modules/ramda/src/map.js");

var _xchain = /*#__PURE__*/_curry2(function _xchain(f, xf) {
  return map(f, _flatCat(xf));
});

module.exports = _xchain;

/***/ }),

/***/ "./node_modules/ramda/src/internal/_xdrop.js":
/*!***************************************************!*\
  !*** ./node_modules/ramda/src/internal/_xdrop.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");

var _xfBase = /*#__PURE__*/__webpack_require__(/*! ./_xfBase */ "./node_modules/ramda/src/internal/_xfBase.js");

var XDrop = /*#__PURE__*/function () {
  function XDrop(n, xf) {
    this.xf = xf;
    this.n = n;
  }

  XDrop.prototype['@@transducer/init'] = _xfBase.init;
  XDrop.prototype['@@transducer/result'] = _xfBase.result;

  XDrop.prototype['@@transducer/step'] = function (result, input) {
    if (this.n > 0) {
      this.n -= 1;
      return result;
    }

    return this.xf['@@transducer/step'](result, input);
  };

  return XDrop;
}();

var _xdrop = /*#__PURE__*/_curry2(function _xdrop(n, xf) {
  return new XDrop(n, xf);
});

module.exports = _xdrop;

/***/ }),

/***/ "./node_modules/ramda/src/internal/_xdropLast.js":
/*!*******************************************************!*\
  !*** ./node_modules/ramda/src/internal/_xdropLast.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");

var _xfBase = /*#__PURE__*/__webpack_require__(/*! ./_xfBase */ "./node_modules/ramda/src/internal/_xfBase.js");

var XDropLast = /*#__PURE__*/function () {
  function XDropLast(n, xf) {
    this.xf = xf;
    this.pos = 0;
    this.full = false;
    this.acc = new Array(n);
  }

  XDropLast.prototype['@@transducer/init'] = _xfBase.init;

  XDropLast.prototype['@@transducer/result'] = function (result) {
    this.acc = null;
    return this.xf['@@transducer/result'](result);
  };

  XDropLast.prototype['@@transducer/step'] = function (result, input) {
    if (this.full) {
      result = this.xf['@@transducer/step'](result, this.acc[this.pos]);
    }

    this.store(input);
    return result;
  };

  XDropLast.prototype.store = function (input) {
    this.acc[this.pos] = input;
    this.pos += 1;

    if (this.pos === this.acc.length) {
      this.pos = 0;
      this.full = true;
    }
  };

  return XDropLast;
}();

var _xdropLast = /*#__PURE__*/_curry2(function _xdropLast(n, xf) {
  return new XDropLast(n, xf);
});

module.exports = _xdropLast;

/***/ }),

/***/ "./node_modules/ramda/src/internal/_xdropLastWhile.js":
/*!************************************************************!*\
  !*** ./node_modules/ramda/src/internal/_xdropLastWhile.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");

var _reduce = /*#__PURE__*/__webpack_require__(/*! ./_reduce */ "./node_modules/ramda/src/internal/_reduce.js");

var _xfBase = /*#__PURE__*/__webpack_require__(/*! ./_xfBase */ "./node_modules/ramda/src/internal/_xfBase.js");

var XDropLastWhile = /*#__PURE__*/function () {
  function XDropLastWhile(fn, xf) {
    this.f = fn;
    this.retained = [];
    this.xf = xf;
  }

  XDropLastWhile.prototype['@@transducer/init'] = _xfBase.init;

  XDropLastWhile.prototype['@@transducer/result'] = function (result) {
    this.retained = null;
    return this.xf['@@transducer/result'](result);
  };

  XDropLastWhile.prototype['@@transducer/step'] = function (result, input) {
    return this.f(input) ? this.retain(result, input) : this.flush(result, input);
  };

  XDropLastWhile.prototype.flush = function (result, input) {
    result = _reduce(this.xf['@@transducer/step'], result, this.retained);
    this.retained = [];
    return this.xf['@@transducer/step'](result, input);
  };

  XDropLastWhile.prototype.retain = function (result, input) {
    this.retained.push(input);
    return result;
  };

  return XDropLastWhile;
}();

var _xdropLastWhile = /*#__PURE__*/_curry2(function _xdropLastWhile(fn, xf) {
  return new XDropLastWhile(fn, xf);
});

module.exports = _xdropLastWhile;

/***/ }),

/***/ "./node_modules/ramda/src/internal/_xdropRepeatsWith.js":
/*!**************************************************************!*\
  !*** ./node_modules/ramda/src/internal/_xdropRepeatsWith.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");

var _xfBase = /*#__PURE__*/__webpack_require__(/*! ./_xfBase */ "./node_modules/ramda/src/internal/_xfBase.js");

var XDropRepeatsWith = /*#__PURE__*/function () {
  function XDropRepeatsWith(pred, xf) {
    this.xf = xf;
    this.pred = pred;
    this.lastValue = undefined;
    this.seenFirstValue = false;
  }

  XDropRepeatsWith.prototype['@@transducer/init'] = _xfBase.init;
  XDropRepeatsWith.prototype['@@transducer/result'] = _xfBase.result;

  XDropRepeatsWith.prototype['@@transducer/step'] = function (result, input) {
    var sameAsLast = false;

    if (!this.seenFirstValue) {
      this.seenFirstValue = true;
    } else if (this.pred(this.lastValue, input)) {
      sameAsLast = true;
    }

    this.lastValue = input;
    return sameAsLast ? result : this.xf['@@transducer/step'](result, input);
  };

  return XDropRepeatsWith;
}();

var _xdropRepeatsWith = /*#__PURE__*/_curry2(function _xdropRepeatsWith(pred, xf) {
  return new XDropRepeatsWith(pred, xf);
});

module.exports = _xdropRepeatsWith;

/***/ }),

/***/ "./node_modules/ramda/src/internal/_xdropWhile.js":
/*!********************************************************!*\
  !*** ./node_modules/ramda/src/internal/_xdropWhile.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");

var _xfBase = /*#__PURE__*/__webpack_require__(/*! ./_xfBase */ "./node_modules/ramda/src/internal/_xfBase.js");

var XDropWhile = /*#__PURE__*/function () {
  function XDropWhile(f, xf) {
    this.xf = xf;
    this.f = f;
  }

  XDropWhile.prototype['@@transducer/init'] = _xfBase.init;
  XDropWhile.prototype['@@transducer/result'] = _xfBase.result;

  XDropWhile.prototype['@@transducer/step'] = function (result, input) {
    if (this.f) {
      if (this.f(input)) {
        return result;
      }

      this.f = null;
    }

    return this.xf['@@transducer/step'](result, input);
  };

  return XDropWhile;
}();

var _xdropWhile = /*#__PURE__*/_curry2(function _xdropWhile(f, xf) {
  return new XDropWhile(f, xf);
});

module.exports = _xdropWhile;

/***/ }),

/***/ "./node_modules/ramda/src/internal/_xfBase.js":
/*!****************************************************!*\
  !*** ./node_modules/ramda/src/internal/_xfBase.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  init: function () {
    return this.xf['@@transducer/init']();
  },
  result: function (result) {
    return this.xf['@@transducer/result'](result);
  }
};

/***/ }),

/***/ "./node_modules/ramda/src/internal/_xfilter.js":
/*!*****************************************************!*\
  !*** ./node_modules/ramda/src/internal/_xfilter.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");

var _xfBase = /*#__PURE__*/__webpack_require__(/*! ./_xfBase */ "./node_modules/ramda/src/internal/_xfBase.js");

var XFilter = /*#__PURE__*/function () {
  function XFilter(f, xf) {
    this.xf = xf;
    this.f = f;
  }

  XFilter.prototype['@@transducer/init'] = _xfBase.init;
  XFilter.prototype['@@transducer/result'] = _xfBase.result;

  XFilter.prototype['@@transducer/step'] = function (result, input) {
    return this.f(input) ? this.xf['@@transducer/step'](result, input) : result;
  };

  return XFilter;
}();

var _xfilter = /*#__PURE__*/_curry2(function _xfilter(f, xf) {
  return new XFilter(f, xf);
});

module.exports = _xfilter;

/***/ }),

/***/ "./node_modules/ramda/src/internal/_xfind.js":
/*!***************************************************!*\
  !*** ./node_modules/ramda/src/internal/_xfind.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");

var _reduced = /*#__PURE__*/__webpack_require__(/*! ./_reduced */ "./node_modules/ramda/src/internal/_reduced.js");

var _xfBase = /*#__PURE__*/__webpack_require__(/*! ./_xfBase */ "./node_modules/ramda/src/internal/_xfBase.js");

var XFind = /*#__PURE__*/function () {
  function XFind(f, xf) {
    this.xf = xf;
    this.f = f;
    this.found = false;
  }

  XFind.prototype['@@transducer/init'] = _xfBase.init;

  XFind.prototype['@@transducer/result'] = function (result) {
    if (!this.found) {
      result = this.xf['@@transducer/step'](result, void 0);
    }

    return this.xf['@@transducer/result'](result);
  };

  XFind.prototype['@@transducer/step'] = function (result, input) {
    if (this.f(input)) {
      this.found = true;
      result = _reduced(this.xf['@@transducer/step'](result, input));
    }

    return result;
  };

  return XFind;
}();

var _xfind = /*#__PURE__*/_curry2(function _xfind(f, xf) {
  return new XFind(f, xf);
});

module.exports = _xfind;

/***/ }),

/***/ "./node_modules/ramda/src/internal/_xfindIndex.js":
/*!********************************************************!*\
  !*** ./node_modules/ramda/src/internal/_xfindIndex.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");

var _reduced = /*#__PURE__*/__webpack_require__(/*! ./_reduced */ "./node_modules/ramda/src/internal/_reduced.js");

var _xfBase = /*#__PURE__*/__webpack_require__(/*! ./_xfBase */ "./node_modules/ramda/src/internal/_xfBase.js");

var XFindIndex = /*#__PURE__*/function () {
  function XFindIndex(f, xf) {
    this.xf = xf;
    this.f = f;
    this.idx = -1;
    this.found = false;
  }

  XFindIndex.prototype['@@transducer/init'] = _xfBase.init;

  XFindIndex.prototype['@@transducer/result'] = function (result) {
    if (!this.found) {
      result = this.xf['@@transducer/step'](result, -1);
    }

    return this.xf['@@transducer/result'](result);
  };

  XFindIndex.prototype['@@transducer/step'] = function (result, input) {
    this.idx += 1;

    if (this.f(input)) {
      this.found = true;
      result = _reduced(this.xf['@@transducer/step'](result, this.idx));
    }

    return result;
  };

  return XFindIndex;
}();

var _xfindIndex = /*#__PURE__*/_curry2(function _xfindIndex(f, xf) {
  return new XFindIndex(f, xf);
});

module.exports = _xfindIndex;

/***/ }),

/***/ "./node_modules/ramda/src/internal/_xfindLast.js":
/*!*******************************************************!*\
  !*** ./node_modules/ramda/src/internal/_xfindLast.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");

var _xfBase = /*#__PURE__*/__webpack_require__(/*! ./_xfBase */ "./node_modules/ramda/src/internal/_xfBase.js");

var XFindLast = /*#__PURE__*/function () {
  function XFindLast(f, xf) {
    this.xf = xf;
    this.f = f;
  }

  XFindLast.prototype['@@transducer/init'] = _xfBase.init;

  XFindLast.prototype['@@transducer/result'] = function (result) {
    return this.xf['@@transducer/result'](this.xf['@@transducer/step'](result, this.last));
  };

  XFindLast.prototype['@@transducer/step'] = function (result, input) {
    if (this.f(input)) {
      this.last = input;
    }

    return result;
  };

  return XFindLast;
}();

var _xfindLast = /*#__PURE__*/_curry2(function _xfindLast(f, xf) {
  return new XFindLast(f, xf);
});

module.exports = _xfindLast;

/***/ }),

/***/ "./node_modules/ramda/src/internal/_xfindLastIndex.js":
/*!************************************************************!*\
  !*** ./node_modules/ramda/src/internal/_xfindLastIndex.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");

var _xfBase = /*#__PURE__*/__webpack_require__(/*! ./_xfBase */ "./node_modules/ramda/src/internal/_xfBase.js");

var XFindLastIndex = /*#__PURE__*/function () {
  function XFindLastIndex(f, xf) {
    this.xf = xf;
    this.f = f;
    this.idx = -1;
    this.lastIdx = -1;
  }

  XFindLastIndex.prototype['@@transducer/init'] = _xfBase.init;

  XFindLastIndex.prototype['@@transducer/result'] = function (result) {
    return this.xf['@@transducer/result'](this.xf['@@transducer/step'](result, this.lastIdx));
  };

  XFindLastIndex.prototype['@@transducer/step'] = function (result, input) {
    this.idx += 1;

    if (this.f(input)) {
      this.lastIdx = this.idx;
    }

    return result;
  };

  return XFindLastIndex;
}();

var _xfindLastIndex = /*#__PURE__*/_curry2(function _xfindLastIndex(f, xf) {
  return new XFindLastIndex(f, xf);
});

module.exports = _xfindLastIndex;

/***/ }),

/***/ "./node_modules/ramda/src/internal/_xmap.js":
/*!**************************************************!*\
  !*** ./node_modules/ramda/src/internal/_xmap.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");

var _xfBase = /*#__PURE__*/__webpack_require__(/*! ./_xfBase */ "./node_modules/ramda/src/internal/_xfBase.js");

var XMap = /*#__PURE__*/function () {
  function XMap(f, xf) {
    this.xf = xf;
    this.f = f;
  }

  XMap.prototype['@@transducer/init'] = _xfBase.init;
  XMap.prototype['@@transducer/result'] = _xfBase.result;

  XMap.prototype['@@transducer/step'] = function (result, input) {
    return this.xf['@@transducer/step'](result, this.f(input));
  };

  return XMap;
}();

var _xmap = /*#__PURE__*/_curry2(function _xmap(f, xf) {
  return new XMap(f, xf);
});

module.exports = _xmap;

/***/ }),

/***/ "./node_modules/ramda/src/internal/_xreduceBy.js":
/*!*******************************************************!*\
  !*** ./node_modules/ramda/src/internal/_xreduceBy.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curryN = /*#__PURE__*/__webpack_require__(/*! ./_curryN */ "./node_modules/ramda/src/internal/_curryN.js");

var _has = /*#__PURE__*/__webpack_require__(/*! ./_has */ "./node_modules/ramda/src/internal/_has.js");

var _xfBase = /*#__PURE__*/__webpack_require__(/*! ./_xfBase */ "./node_modules/ramda/src/internal/_xfBase.js");

var XReduceBy = /*#__PURE__*/function () {
  function XReduceBy(valueFn, valueAcc, keyFn, xf) {
    this.valueFn = valueFn;
    this.valueAcc = valueAcc;
    this.keyFn = keyFn;
    this.xf = xf;
    this.inputs = {};
  }

  XReduceBy.prototype['@@transducer/init'] = _xfBase.init;

  XReduceBy.prototype['@@transducer/result'] = function (result) {
    var key;

    for (key in this.inputs) {
      if (_has(key, this.inputs)) {
        result = this.xf['@@transducer/step'](result, this.inputs[key]);

        if (result['@@transducer/reduced']) {
          result = result['@@transducer/value'];
          break;
        }
      }
    }

    this.inputs = null;
    return this.xf['@@transducer/result'](result);
  };

  XReduceBy.prototype['@@transducer/step'] = function (result, input) {
    var key = this.keyFn(input);
    this.inputs[key] = this.inputs[key] || [key, this.valueAcc];
    this.inputs[key][1] = this.valueFn(this.inputs[key][1], input);
    return result;
  };

  return XReduceBy;
}();

var _xreduceBy = /*#__PURE__*/_curryN(4, [], function _xreduceBy(valueFn, valueAcc, keyFn, xf) {
  return new XReduceBy(valueFn, valueAcc, keyFn, xf);
});

module.exports = _xreduceBy;

/***/ }),

/***/ "./node_modules/ramda/src/internal/_xtake.js":
/*!***************************************************!*\
  !*** ./node_modules/ramda/src/internal/_xtake.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");

var _reduced = /*#__PURE__*/__webpack_require__(/*! ./_reduced */ "./node_modules/ramda/src/internal/_reduced.js");

var _xfBase = /*#__PURE__*/__webpack_require__(/*! ./_xfBase */ "./node_modules/ramda/src/internal/_xfBase.js");

var XTake = /*#__PURE__*/function () {
  function XTake(n, xf) {
    this.xf = xf;
    this.n = n;
    this.i = 0;
  }

  XTake.prototype['@@transducer/init'] = _xfBase.init;
  XTake.prototype['@@transducer/result'] = _xfBase.result;

  XTake.prototype['@@transducer/step'] = function (result, input) {
    this.i += 1;
    var ret = this.n === 0 ? result : this.xf['@@transducer/step'](result, input);
    return this.n >= 0 && this.i >= this.n ? _reduced(ret) : ret;
  };

  return XTake;
}();

var _xtake = /*#__PURE__*/_curry2(function _xtake(n, xf) {
  return new XTake(n, xf);
});

module.exports = _xtake;

/***/ }),

/***/ "./node_modules/ramda/src/internal/_xtakeWhile.js":
/*!********************************************************!*\
  !*** ./node_modules/ramda/src/internal/_xtakeWhile.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");

var _reduced = /*#__PURE__*/__webpack_require__(/*! ./_reduced */ "./node_modules/ramda/src/internal/_reduced.js");

var _xfBase = /*#__PURE__*/__webpack_require__(/*! ./_xfBase */ "./node_modules/ramda/src/internal/_xfBase.js");

var XTakeWhile = /*#__PURE__*/function () {
  function XTakeWhile(f, xf) {
    this.xf = xf;
    this.f = f;
  }

  XTakeWhile.prototype['@@transducer/init'] = _xfBase.init;
  XTakeWhile.prototype['@@transducer/result'] = _xfBase.result;

  XTakeWhile.prototype['@@transducer/step'] = function (result, input) {
    return this.f(input) ? this.xf['@@transducer/step'](result, input) : _reduced(result);
  };

  return XTakeWhile;
}();

var _xtakeWhile = /*#__PURE__*/_curry2(function _xtakeWhile(f, xf) {
  return new XTakeWhile(f, xf);
});

module.exports = _xtakeWhile;

/***/ }),

/***/ "./node_modules/ramda/src/internal/_xtap.js":
/*!**************************************************!*\
  !*** ./node_modules/ramda/src/internal/_xtap.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");

var _xfBase = /*#__PURE__*/__webpack_require__(/*! ./_xfBase */ "./node_modules/ramda/src/internal/_xfBase.js");

var XTap = /*#__PURE__*/function () {
  function XTap(f, xf) {
    this.xf = xf;
    this.f = f;
  }

  XTap.prototype['@@transducer/init'] = _xfBase.init;
  XTap.prototype['@@transducer/result'] = _xfBase.result;

  XTap.prototype['@@transducer/step'] = function (result, input) {
    this.f(input);
    return this.xf['@@transducer/step'](result, input);
  };

  return XTap;
}();

var _xtap = /*#__PURE__*/_curry2(function _xtap(f, xf) {
  return new XTap(f, xf);
});

module.exports = _xtap;

/***/ }),

/***/ "./node_modules/ramda/src/internal/_xwrap.js":
/*!***************************************************!*\
  !*** ./node_modules/ramda/src/internal/_xwrap.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var XWrap = /*#__PURE__*/function () {
  function XWrap(fn) {
    this.f = fn;
  }

  XWrap.prototype['@@transducer/init'] = function () {
    throw new Error('init not implemented on XWrap');
  };

  XWrap.prototype['@@transducer/result'] = function (acc) {
    return acc;
  };

  XWrap.prototype['@@transducer/step'] = function (acc, x) {
    return this.f(acc, x);
  };

  return XWrap;
}();

function _xwrap(fn) {
  return new XWrap(fn);
}

module.exports = _xwrap;

/***/ }),

/***/ "./node_modules/ramda/src/intersection.js":
/*!************************************************!*\
  !*** ./node_modules/ramda/src/intersection.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _includes = /*#__PURE__*/__webpack_require__(/*! ./internal/_includes */ "./node_modules/ramda/src/internal/_includes.js");

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");

var _filter = /*#__PURE__*/__webpack_require__(/*! ./internal/_filter */ "./node_modules/ramda/src/internal/_filter.js");

var flip = /*#__PURE__*/__webpack_require__(/*! ./flip */ "./node_modules/ramda/src/flip.js");

var uniq = /*#__PURE__*/__webpack_require__(/*! ./uniq */ "./node_modules/ramda/src/uniq.js");
/**
 * Combines two lists into a set (i.e. no duplicates) composed of those
 * elements common to both lists.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig [*] -> [*] -> [*]
 * @param {Array} list1 The first list.
 * @param {Array} list2 The second list.
 * @return {Array} The list of elements found in both `list1` and `list2`.
 * @see R.innerJoin
 * @example
 *
 *      R.intersection([1,2,3,4], [7,6,5,4,3]); //=> [4, 3]
 */


var intersection = /*#__PURE__*/_curry2(function intersection(list1, list2) {
  var lookupList, filteredList;

  if (list1.length > list2.length) {
    lookupList = list1;
    filteredList = list2;
  } else {
    lookupList = list2;
    filteredList = list1;
  }

  return uniq(_filter(flip(_includes)(lookupList), filteredList));
});

module.exports = intersection;

/***/ }),

/***/ "./node_modules/ramda/src/intersperse.js":
/*!***********************************************!*\
  !*** ./node_modules/ramda/src/intersperse.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _checkForMethod = /*#__PURE__*/__webpack_require__(/*! ./internal/_checkForMethod */ "./node_modules/ramda/src/internal/_checkForMethod.js");

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");
/**
 * Creates a new list with the separator interposed between elements.
 *
 * Dispatches to the `intersperse` method of the second argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category List
 * @sig a -> [a] -> [a]
 * @param {*} separator The element to add to the list.
 * @param {Array} list The list to be interposed.
 * @return {Array} The new list.
 * @example
 *
 *      R.intersperse('a', ['b', 'n', 'n', 's']); //=> ['b', 'a', 'n', 'a', 'n', 'a', 's']
 */


var intersperse = /*#__PURE__*/_curry2( /*#__PURE__*/_checkForMethod('intersperse', function intersperse(separator, list) {
  var out = [];
  var idx = 0;
  var length = list.length;

  while (idx < length) {
    if (idx === length - 1) {
      out.push(list[idx]);
    } else {
      out.push(list[idx], separator);
    }

    idx += 1;
  }

  return out;
}));

module.exports = intersperse;

/***/ }),

/***/ "./node_modules/ramda/src/into.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/src/into.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _clone = /*#__PURE__*/__webpack_require__(/*! ./internal/_clone */ "./node_modules/ramda/src/internal/_clone.js");

var _curry3 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry3 */ "./node_modules/ramda/src/internal/_curry3.js");

var _isTransformer = /*#__PURE__*/__webpack_require__(/*! ./internal/_isTransformer */ "./node_modules/ramda/src/internal/_isTransformer.js");

var _reduce = /*#__PURE__*/__webpack_require__(/*! ./internal/_reduce */ "./node_modules/ramda/src/internal/_reduce.js");

var _stepCat = /*#__PURE__*/__webpack_require__(/*! ./internal/_stepCat */ "./node_modules/ramda/src/internal/_stepCat.js");
/**
 * Transforms the items of the list with the transducer and appends the
 * transformed items to the accumulator using an appropriate iterator function
 * based on the accumulator type.
 *
 * The accumulator can be an array, string, object or a transformer. Iterated
 * items will be appended to arrays and concatenated to strings. Objects will
 * be merged directly or 2-item arrays will be merged as key, value pairs.
 *
 * The accumulator can also be a transformer object that provides a 2-arity
 * reducing iterator function, step, 0-arity initial value function, init, and
 * 1-arity result extraction function result. The step function is used as the
 * iterator function in reduce. The result function is used to convert the
 * final accumulator into the return type and in most cases is R.identity. The
 * init function is used to provide the initial accumulator.
 *
 * The iteration is performed with [`R.reduce`](#reduce) after initializing the
 * transducer.
 *
 * @func
 * @memberOf R
 * @since v0.12.0
 * @category List
 * @sig a -> (b -> b) -> [c] -> a
 * @param {*} acc The initial accumulator value.
 * @param {Function} xf The transducer function. Receives a transformer and returns a transformer.
 * @param {Array} list The list to iterate over.
 * @return {*} The final, accumulated value.
 * @see R.transduce
 * @example
 *
 *      const numbers = [1, 2, 3, 4];
 *      const transducer = R.compose(R.map(R.add(1)), R.take(2));
 *
 *      R.into([], transducer, numbers); //=> [2, 3]
 *
 *      const intoArray = R.into([]);
 *      intoArray(transducer, numbers); //=> [2, 3]
 */


var into = /*#__PURE__*/_curry3(function into(acc, xf, list) {
  return _isTransformer(acc) ? _reduce(xf(acc), acc['@@transducer/init'](), list) : _reduce(xf(_stepCat(acc)), _clone(acc, [], [], false), list);
});

module.exports = into;

/***/ }),

/***/ "./node_modules/ramda/src/invert.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/src/invert.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry1 */ "./node_modules/ramda/src/internal/_curry1.js");

var _has = /*#__PURE__*/__webpack_require__(/*! ./internal/_has */ "./node_modules/ramda/src/internal/_has.js");

var keys = /*#__PURE__*/__webpack_require__(/*! ./keys */ "./node_modules/ramda/src/keys.js");
/**
 * Same as [`R.invertObj`](#invertObj), however this accounts for objects with
 * duplicate values by putting the values into an array.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Object
 * @sig {s: x} -> {x: [ s, ... ]}
 * @param {Object} obj The object or array to invert
 * @return {Object} out A new object with keys in an array.
 * @see R.invertObj
 * @example
 *
 *      const raceResultsByFirstName = {
 *        first: 'alice',
 *        second: 'jake',
 *        third: 'alice',
 *      };
 *      R.invert(raceResultsByFirstName);
 *      //=> { 'alice': ['first', 'third'], 'jake':['second'] }
 */


var invert = /*#__PURE__*/_curry1(function invert(obj) {
  var props = keys(obj);
  var len = props.length;
  var idx = 0;
  var out = {};

  while (idx < len) {
    var key = props[idx];
    var val = obj[key];
    var list = _has(val, out) ? out[val] : out[val] = [];
    list[list.length] = key;
    idx += 1;
  }

  return out;
});

module.exports = invert;

/***/ }),

/***/ "./node_modules/ramda/src/invertObj.js":
/*!*********************************************!*\
  !*** ./node_modules/ramda/src/invertObj.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry1 */ "./node_modules/ramda/src/internal/_curry1.js");

var keys = /*#__PURE__*/__webpack_require__(/*! ./keys */ "./node_modules/ramda/src/keys.js");
/**
 * Returns a new object with the keys of the given object as values, and the
 * values of the given object, which are coerced to strings, as keys. Note
 * that the last key found is preferred when handling the same value.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Object
 * @sig {s: x} -> {x: s}
 * @param {Object} obj The object or array to invert
 * @return {Object} out A new object
 * @see R.invert
 * @example
 *
 *      const raceResults = {
 *        first: 'alice',
 *        second: 'jake'
 *      };
 *      R.invertObj(raceResults);
 *      //=> { 'alice': 'first', 'jake':'second' }
 *
 *      // Alternatively:
 *      const raceResults = ['alice', 'jake'];
 *      R.invertObj(raceResults);
 *      //=> { 'alice': '0', 'jake':'1' }
 */


var invertObj = /*#__PURE__*/_curry1(function invertObj(obj) {
  var props = keys(obj);
  var len = props.length;
  var idx = 0;
  var out = {};

  while (idx < len) {
    var key = props[idx];
    out[obj[key]] = key;
    idx += 1;
  }

  return out;
});

module.exports = invertObj;

/***/ }),

/***/ "./node_modules/ramda/src/invoker.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/src/invoker.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");

var _isFunction = /*#__PURE__*/__webpack_require__(/*! ./internal/_isFunction */ "./node_modules/ramda/src/internal/_isFunction.js");

var curryN = /*#__PURE__*/__webpack_require__(/*! ./curryN */ "./node_modules/ramda/src/curryN.js");

var toString = /*#__PURE__*/__webpack_require__(/*! ./toString */ "./node_modules/ramda/src/toString.js");
/**
 * Turns a named method with a specified arity into a function that can be
 * called directly supplied with arguments and a target object.
 *
 * The returned function is curried and accepts `arity + 1` parameters where
 * the final parameter is the target object.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig Number -> String -> (a -> b -> ... -> n -> Object -> *)
 * @param {Number} arity Number of arguments the returned function should take
 *        before the target object.
 * @param {String} method Name of any of the target object's methods to call.
 * @return {Function} A new curried function.
 * @see R.construct
 * @example
 *
 *      const sliceFrom = R.invoker(1, 'slice');
 *      sliceFrom(6, 'abcdefghijklm'); //=> 'ghijklm'
 *      const sliceFrom6 = R.invoker(2, 'slice')(6);
 *      sliceFrom6(8, 'abcdefghijklm'); //=> 'gh'
 *
 *      const dog = {
 *        speak: async () => 'Woof!'
 *      };
 *      const speak = R.invoker(0, 'speak');
 *      speak(dog).then(console.log) //~> 'Woof!'
 *
 * @symb R.invoker(0, 'method')(o) = o['method']()
 * @symb R.invoker(1, 'method')(a, o) = o['method'](a)
 * @symb R.invoker(2, 'method')(a, b, o) = o['method'](a, b)
 */


var invoker = /*#__PURE__*/_curry2(function invoker(arity, method) {
  return curryN(arity + 1, function () {
    var target = arguments[arity];

    if (target != null && _isFunction(target[method])) {
      return target[method].apply(target, Array.prototype.slice.call(arguments, 0, arity));
    }

    throw new TypeError(toString(target) + ' does not have a method named "' + method + '"');
  });
});

module.exports = invoker;

/***/ }),

/***/ "./node_modules/ramda/src/is.js":
/*!**************************************!*\
  !*** ./node_modules/ramda/src/is.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");
/**
 * See if an object (`val`) is an instance of the supplied constructor. This
 * function will check up the inheritance chain, if any.
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category Type
 * @sig (* -> {*}) -> a -> Boolean
 * @param {Object} ctor A constructor
 * @param {*} val The value to test
 * @return {Boolean}
 * @example
 *
 *      R.is(Object, {}); //=> true
 *      R.is(Number, 1); //=> true
 *      R.is(Object, 1); //=> false
 *      R.is(String, 's'); //=> true
 *      R.is(String, new String('')); //=> true
 *      R.is(Object, new String('')); //=> true
 *      R.is(Object, 's'); //=> false
 *      R.is(Number, {}); //=> false
 */


var is = /*#__PURE__*/_curry2(function is(Ctor, val) {
  return val != null && val.constructor === Ctor || val instanceof Ctor;
});

module.exports = is;

/***/ }),

/***/ "./node_modules/ramda/src/isEmpty.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/src/isEmpty.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry1 */ "./node_modules/ramda/src/internal/_curry1.js");

var empty = /*#__PURE__*/__webpack_require__(/*! ./empty */ "./node_modules/ramda/src/empty.js");

var equals = /*#__PURE__*/__webpack_require__(/*! ./equals */ "./node_modules/ramda/src/equals.js");
/**
 * Returns `true` if the given value is its type's empty value; `false`
 * otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Logic
 * @sig a -> Boolean
 * @param {*} x
 * @return {Boolean}
 * @see R.empty
 * @example
 *
 *      R.isEmpty([1, 2, 3]);   //=> false
 *      R.isEmpty([]);          //=> true
 *      R.isEmpty('');          //=> true
 *      R.isEmpty(null);        //=> false
 *      R.isEmpty({});          //=> true
 *      R.isEmpty({length: 0}); //=> false
 */


var isEmpty = /*#__PURE__*/_curry1(function isEmpty(x) {
  return x != null && equals(x, empty(x));
});

module.exports = isEmpty;

/***/ }),

/***/ "./node_modules/ramda/src/isNil.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/src/isNil.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry1 */ "./node_modules/ramda/src/internal/_curry1.js");
/**
 * Checks if the input value is `null` or `undefined`.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Type
 * @sig * -> Boolean
 * @param {*} x The value to test.
 * @return {Boolean} `true` if `x` is `undefined` or `null`, otherwise `false`.
 * @example
 *
 *      R.isNil(null); //=> true
 *      R.isNil(undefined); //=> true
 *      R.isNil(0); //=> false
 *      R.isNil([]); //=> false
 */


var isNil = /*#__PURE__*/_curry1(function isNil(x) {
  return x == null;
});

module.exports = isNil;

/***/ }),

/***/ "./node_modules/ramda/src/join.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/src/join.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var invoker = /*#__PURE__*/__webpack_require__(/*! ./invoker */ "./node_modules/ramda/src/invoker.js");
/**
 * Returns a string made by inserting the `separator` between each element and
 * concatenating all the elements into a single string.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig String -> [a] -> String
 * @param {Number|String} separator The string used to separate the elements.
 * @param {Array} xs The elements to join into a string.
 * @return {String} str The string made by concatenating `xs` with `separator`.
 * @see R.split
 * @example
 *
 *      const spacer = R.join(' ');
 *      spacer(['a', 2, 3.4]);   //=> 'a 2 3.4'
 *      R.join('|', [1, 2, 3]);    //=> '1|2|3'
 */


var join = /*#__PURE__*/invoker(1, 'join');
module.exports = join;

/***/ }),

/***/ "./node_modules/ramda/src/juxt.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/src/juxt.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry1 */ "./node_modules/ramda/src/internal/_curry1.js");

var converge = /*#__PURE__*/__webpack_require__(/*! ./converge */ "./node_modules/ramda/src/converge.js");
/**
 * juxt applies a list of functions to a list of values.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category Function
 * @sig [(a, b, ..., m) -> n] -> ((a, b, ..., m) -> [n])
 * @param {Array} fns An array of functions
 * @return {Function} A function that returns a list of values after applying each of the original `fns` to its parameters.
 * @see R.applySpec
 * @example
 *
 *      const getRange = R.juxt([Math.min, Math.max]);
 *      getRange(3, 4, 9, -3); //=> [-3, 9]
 * @symb R.juxt([f, g, h])(a, b) = [f(a, b), g(a, b), h(a, b)]
 */


var juxt = /*#__PURE__*/_curry1(function juxt(fns) {
  return converge(function () {
    return Array.prototype.slice.call(arguments, 0);
  }, fns);
});

module.exports = juxt;

/***/ }),

/***/ "./node_modules/ramda/src/keys.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/src/keys.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry1 */ "./node_modules/ramda/src/internal/_curry1.js");

var _has = /*#__PURE__*/__webpack_require__(/*! ./internal/_has */ "./node_modules/ramda/src/internal/_has.js");

var _isArguments = /*#__PURE__*/__webpack_require__(/*! ./internal/_isArguments */ "./node_modules/ramda/src/internal/_isArguments.js"); // cover IE < 9 keys issues


var hasEnumBug = ! /*#__PURE__*/{
  toString: null
}.propertyIsEnumerable('toString');
var nonEnumerableProps = ['constructor', 'valueOf', 'isPrototypeOf', 'toString', 'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString']; // Safari bug

var hasArgsEnumBug = /*#__PURE__*/function () {
  'use strict';

  return arguments.propertyIsEnumerable('length');
}();

var contains = function contains(list, item) {
  var idx = 0;

  while (idx < list.length) {
    if (list[idx] === item) {
      return true;
    }

    idx += 1;
  }

  return false;
};
/**
 * Returns a list containing the names of all the enumerable own properties of
 * the supplied object.
 * Note that the order of the output array is not guaranteed to be consistent
 * across different JS platforms.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig {k: v} -> [k]
 * @param {Object} obj The object to extract properties from
 * @return {Array} An array of the object's own properties.
 * @see R.keysIn, R.values
 * @example
 *
 *      R.keys({a: 1, b: 2, c: 3}); //=> ['a', 'b', 'c']
 */


var keys = typeof Object.keys === 'function' && !hasArgsEnumBug ? /*#__PURE__*/_curry1(function keys(obj) {
  return Object(obj) !== obj ? [] : Object.keys(obj);
}) : /*#__PURE__*/_curry1(function keys(obj) {
  if (Object(obj) !== obj) {
    return [];
  }

  var prop, nIdx;
  var ks = [];

  var checkArgsLength = hasArgsEnumBug && _isArguments(obj);

  for (prop in obj) {
    if (_has(prop, obj) && (!checkArgsLength || prop !== 'length')) {
      ks[ks.length] = prop;
    }
  }

  if (hasEnumBug) {
    nIdx = nonEnumerableProps.length - 1;

    while (nIdx >= 0) {
      prop = nonEnumerableProps[nIdx];

      if (_has(prop, obj) && !contains(ks, prop)) {
        ks[ks.length] = prop;
      }

      nIdx -= 1;
    }
  }

  return ks;
});
module.exports = keys;

/***/ }),

/***/ "./node_modules/ramda/src/keysIn.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/src/keysIn.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry1 */ "./node_modules/ramda/src/internal/_curry1.js");
/**
 * Returns a list containing the names of all the properties of the supplied
 * object, including prototype properties.
 * Note that the order of the output array is not guaranteed to be consistent
 * across different JS platforms.
 *
 * @func
 * @memberOf R
 * @since v0.2.0
 * @category Object
 * @sig {k: v} -> [k]
 * @param {Object} obj The object to extract properties from
 * @return {Array} An array of the object's own and prototype properties.
 * @see R.keys, R.valuesIn
 * @example
 *
 *      const F = function() { this.x = 'X'; };
 *      F.prototype.y = 'Y';
 *      const f = new F();
 *      R.keysIn(f); //=> ['x', 'y']
 */


var keysIn = /*#__PURE__*/_curry1(function keysIn(obj) {
  var prop;
  var ks = [];

  for (prop in obj) {
    ks[ks.length] = prop;
  }

  return ks;
});

module.exports = keysIn;

/***/ }),

/***/ "./node_modules/ramda/src/last.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/src/last.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var nth = /*#__PURE__*/__webpack_require__(/*! ./nth */ "./node_modules/ramda/src/nth.js");
/**
 * Returns the last element of the given list or string.
 *
 * @func
 * @memberOf R
 * @since v0.1.4
 * @category List
 * @sig [a] -> a | Undefined
 * @sig String -> String
 * @param {*} list
 * @return {*}
 * @see R.init, R.head, R.tail
 * @example
 *
 *      R.last(['fi', 'fo', 'fum']); //=> 'fum'
 *      R.last([]); //=> undefined
 *
 *      R.last('abc'); //=> 'c'
 *      R.last(''); //=> ''
 */


var last = /*#__PURE__*/nth(-1);
module.exports = last;

/***/ }),

/***/ "./node_modules/ramda/src/lastIndexOf.js":
/*!***********************************************!*\
  !*** ./node_modules/ramda/src/lastIndexOf.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");

var _isArray = /*#__PURE__*/__webpack_require__(/*! ./internal/_isArray */ "./node_modules/ramda/src/internal/_isArray.js");

var equals = /*#__PURE__*/__webpack_require__(/*! ./equals */ "./node_modules/ramda/src/equals.js");
/**
 * Returns the position of the last occurrence of an item in an array, or -1 if
 * the item is not included in the array. [`R.equals`](#equals) is used to
 * determine equality.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig a -> [a] -> Number
 * @param {*} target The item to find.
 * @param {Array} xs The array to search in.
 * @return {Number} the index of the target, or -1 if the target is not found.
 * @see R.indexOf
 * @example
 *
 *      R.lastIndexOf(3, [-1,3,3,0,1,2,3,4]); //=> 6
 *      R.lastIndexOf(10, [1,2,3,4]); //=> -1
 */


var lastIndexOf = /*#__PURE__*/_curry2(function lastIndexOf(target, xs) {
  if (typeof xs.lastIndexOf === 'function' && !_isArray(xs)) {
    return xs.lastIndexOf(target);
  } else {
    var idx = xs.length - 1;

    while (idx >= 0) {
      if (equals(xs[idx], target)) {
        return idx;
      }

      idx -= 1;
    }

    return -1;
  }
});

module.exports = lastIndexOf;

/***/ }),

/***/ "./node_modules/ramda/src/length.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/src/length.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry1 */ "./node_modules/ramda/src/internal/_curry1.js");

var _isNumber = /*#__PURE__*/__webpack_require__(/*! ./internal/_isNumber */ "./node_modules/ramda/src/internal/_isNumber.js");
/**
 * Returns the number of elements in the array by returning `list.length`.
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category List
 * @sig [a] -> Number
 * @param {Array} list The array to inspect.
 * @return {Number} The length of the array.
 * @example
 *
 *      R.length([]); //=> 0
 *      R.length([1, 2, 3]); //=> 3
 */


var length = /*#__PURE__*/_curry1(function length(list) {
  return list != null && _isNumber(list.length) ? list.length : NaN;
});

module.exports = length;

/***/ }),

/***/ "./node_modules/ramda/src/lens.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/src/lens.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");

var map = /*#__PURE__*/__webpack_require__(/*! ./map */ "./node_modules/ramda/src/map.js");
/**
 * Returns a lens for the given getter and setter functions. The getter "gets"
 * the value of the focus; the setter "sets" the value of the focus. The setter
 * should not mutate the data structure.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Object
 * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
 * @sig (s -> a) -> ((a, s) -> s) -> Lens s a
 * @param {Function} getter
 * @param {Function} setter
 * @return {Lens}
 * @see R.view, R.set, R.over, R.lensIndex, R.lensProp
 * @example
 *
 *      const xLens = R.lens(R.prop('x'), R.assoc('x'));
 *
 *      R.view(xLens, {x: 1, y: 2});            //=> 1
 *      R.set(xLens, 4, {x: 1, y: 2});          //=> {x: 4, y: 2}
 *      R.over(xLens, R.negate, {x: 1, y: 2});  //=> {x: -1, y: 2}
 */


var lens = /*#__PURE__*/_curry2(function lens(getter, setter) {
  return function (toFunctorFn) {
    return function (target) {
      return map(function (focus) {
        return setter(focus, target);
      }, toFunctorFn(getter(target)));
    };
  };
});

module.exports = lens;

/***/ }),

/***/ "./node_modules/ramda/src/lensIndex.js":
/*!*********************************************!*\
  !*** ./node_modules/ramda/src/lensIndex.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry1 */ "./node_modules/ramda/src/internal/_curry1.js");

var lens = /*#__PURE__*/__webpack_require__(/*! ./lens */ "./node_modules/ramda/src/lens.js");

var nth = /*#__PURE__*/__webpack_require__(/*! ./nth */ "./node_modules/ramda/src/nth.js");

var update = /*#__PURE__*/__webpack_require__(/*! ./update */ "./node_modules/ramda/src/update.js");
/**
 * Returns a lens whose focus is the specified index.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category Object
 * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
 * @sig Number -> Lens s a
 * @param {Number} n
 * @return {Lens}
 * @see R.view, R.set, R.over, R.nth
 * @example
 *
 *      const headLens = R.lensIndex(0);
 *
 *      R.view(headLens, ['a', 'b', 'c']);            //=> 'a'
 *      R.set(headLens, 'x', ['a', 'b', 'c']);        //=> ['x', 'b', 'c']
 *      R.over(headLens, R.toUpper, ['a', 'b', 'c']); //=> ['A', 'b', 'c']
 */


var lensIndex = /*#__PURE__*/_curry1(function lensIndex(n) {
  return lens(nth(n), update(n));
});

module.exports = lensIndex;

/***/ }),

/***/ "./node_modules/ramda/src/lensPath.js":
/*!********************************************!*\
  !*** ./node_modules/ramda/src/lensPath.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry1 */ "./node_modules/ramda/src/internal/_curry1.js");

var assocPath = /*#__PURE__*/__webpack_require__(/*! ./assocPath */ "./node_modules/ramda/src/assocPath.js");

var lens = /*#__PURE__*/__webpack_require__(/*! ./lens */ "./node_modules/ramda/src/lens.js");

var path = /*#__PURE__*/__webpack_require__(/*! ./path */ "./node_modules/ramda/src/path.js");
/**
 * Returns a lens whose focus is the specified path.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category Object
 * @typedefn Idx = String | Int
 * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
 * @sig [Idx] -> Lens s a
 * @param {Array} path The path to use.
 * @return {Lens}
 * @see R.view, R.set, R.over
 * @example
 *
 *      const xHeadYLens = R.lensPath(['x', 0, 'y']);
 *
 *      R.view(xHeadYLens, {x: [{y: 2, z: 3}, {y: 4, z: 5}]});
 *      //=> 2
 *      R.set(xHeadYLens, 1, {x: [{y: 2, z: 3}, {y: 4, z: 5}]});
 *      //=> {x: [{y: 1, z: 3}, {y: 4, z: 5}]}
 *      R.over(xHeadYLens, R.negate, {x: [{y: 2, z: 3}, {y: 4, z: 5}]});
 *      //=> {x: [{y: -2, z: 3}, {y: 4, z: 5}]}
 */


var lensPath = /*#__PURE__*/_curry1(function lensPath(p) {
  return lens(path(p), assocPath(p));
});

module.exports = lensPath;

/***/ }),

/***/ "./node_modules/ramda/src/lensProp.js":
/*!********************************************!*\
  !*** ./node_modules/ramda/src/lensProp.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry1 */ "./node_modules/ramda/src/internal/_curry1.js");

var assoc = /*#__PURE__*/__webpack_require__(/*! ./assoc */ "./node_modules/ramda/src/assoc.js");

var lens = /*#__PURE__*/__webpack_require__(/*! ./lens */ "./node_modules/ramda/src/lens.js");

var prop = /*#__PURE__*/__webpack_require__(/*! ./prop */ "./node_modules/ramda/src/prop.js");
/**
 * Returns a lens whose focus is the specified property.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category Object
 * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
 * @sig String -> Lens s a
 * @param {String} k
 * @return {Lens}
 * @see R.view, R.set, R.over
 * @example
 *
 *      const xLens = R.lensProp('x');
 *
 *      R.view(xLens, {x: 1, y: 2});            //=> 1
 *      R.set(xLens, 4, {x: 1, y: 2});          //=> {x: 4, y: 2}
 *      R.over(xLens, R.negate, {x: 1, y: 2});  //=> {x: -1, y: 2}
 */


var lensProp = /*#__PURE__*/_curry1(function lensProp(k) {
  return lens(prop(k), assoc(k));
});

module.exports = lensProp;

/***/ }),

/***/ "./node_modules/ramda/src/lift.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/src/lift.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry1 */ "./node_modules/ramda/src/internal/_curry1.js");

var liftN = /*#__PURE__*/__webpack_require__(/*! ./liftN */ "./node_modules/ramda/src/liftN.js");
/**
 * "lifts" a function of arity > 1 so that it may "map over" a list, Function or other
 * object that satisfies the [FantasyLand Apply spec](https://github.com/fantasyland/fantasy-land#apply).
 *
 * @func
 * @memberOf R
 * @since v0.7.0
 * @category Function
 * @sig (*... -> *) -> ([*]... -> [*])
 * @param {Function} fn The function to lift into higher context
 * @return {Function} The lifted function.
 * @see R.liftN
 * @example
 *
 *      const madd3 = R.lift((a, b, c) => a + b + c);
 *
 *      madd3([1,2,3], [1,2,3], [1]); //=> [3, 4, 5, 4, 5, 6, 5, 6, 7]
 *
 *      const madd5 = R.lift((a, b, c, d, e) => a + b + c + d + e);
 *
 *      madd5([1,2], [3], [4, 5], [6], [7, 8]); //=> [21, 22, 22, 23, 22, 23, 23, 24]
 */


var lift = /*#__PURE__*/_curry1(function lift(fn) {
  return liftN(fn.length, fn);
});

module.exports = lift;

/***/ }),

/***/ "./node_modules/ramda/src/liftN.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/src/liftN.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");

var _reduce = /*#__PURE__*/__webpack_require__(/*! ./internal/_reduce */ "./node_modules/ramda/src/internal/_reduce.js");

var ap = /*#__PURE__*/__webpack_require__(/*! ./ap */ "./node_modules/ramda/src/ap.js");

var curryN = /*#__PURE__*/__webpack_require__(/*! ./curryN */ "./node_modules/ramda/src/curryN.js");

var map = /*#__PURE__*/__webpack_require__(/*! ./map */ "./node_modules/ramda/src/map.js");
/**
 * "lifts" a function to be the specified arity, so that it may "map over" that
 * many lists, Functions or other objects that satisfy the [FantasyLand Apply spec](https://github.com/fantasyland/fantasy-land#apply).
 *
 * @func
 * @memberOf R
 * @since v0.7.0
 * @category Function
 * @sig Number -> (*... -> *) -> ([*]... -> [*])
 * @param {Function} fn The function to lift into higher context
 * @return {Function} The lifted function.
 * @see R.lift, R.ap
 * @example
 *
 *      const madd3 = R.liftN(3, (...args) => R.sum(args));
 *      madd3([1,2,3], [1,2,3], [1]); //=> [3, 4, 5, 4, 5, 6, 5, 6, 7]
 */


var liftN = /*#__PURE__*/_curry2(function liftN(arity, fn) {
  var lifted = curryN(arity, fn);
  return curryN(arity, function () {
    return _reduce(ap, map(lifted, arguments[0]), Array.prototype.slice.call(arguments, 1));
  });
});

module.exports = liftN;

/***/ }),

/***/ "./node_modules/ramda/src/lt.js":
/*!**************************************!*\
  !*** ./node_modules/ramda/src/lt.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");
/**
 * Returns `true` if the first argument is less than the second; `false`
 * otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig Ord a => a -> a -> Boolean
 * @param {*} a
 * @param {*} b
 * @return {Boolean}
 * @see R.gt
 * @example
 *
 *      R.lt(2, 1); //=> false
 *      R.lt(2, 2); //=> false
 *      R.lt(2, 3); //=> true
 *      R.lt('a', 'z'); //=> true
 *      R.lt('z', 'a'); //=> false
 */


var lt = /*#__PURE__*/_curry2(function lt(a, b) {
  return a < b;
});

module.exports = lt;

/***/ }),

/***/ "./node_modules/ramda/src/lte.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/src/lte.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");
/**
 * Returns `true` if the first argument is less than or equal to the second;
 * `false` otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig Ord a => a -> a -> Boolean
 * @param {Number} a
 * @param {Number} b
 * @return {Boolean}
 * @see R.gte
 * @example
 *
 *      R.lte(2, 1); //=> false
 *      R.lte(2, 2); //=> true
 *      R.lte(2, 3); //=> true
 *      R.lte('a', 'z'); //=> true
 *      R.lte('z', 'a'); //=> false
 */


var lte = /*#__PURE__*/_curry2(function lte(a, b) {
  return a <= b;
});

module.exports = lte;

/***/ }),

/***/ "./node_modules/ramda/src/map.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/src/map.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");

var _dispatchable = /*#__PURE__*/__webpack_require__(/*! ./internal/_dispatchable */ "./node_modules/ramda/src/internal/_dispatchable.js");

var _map = /*#__PURE__*/__webpack_require__(/*! ./internal/_map */ "./node_modules/ramda/src/internal/_map.js");

var _reduce = /*#__PURE__*/__webpack_require__(/*! ./internal/_reduce */ "./node_modules/ramda/src/internal/_reduce.js");

var _xmap = /*#__PURE__*/__webpack_require__(/*! ./internal/_xmap */ "./node_modules/ramda/src/internal/_xmap.js");

var curryN = /*#__PURE__*/__webpack_require__(/*! ./curryN */ "./node_modules/ramda/src/curryN.js");

var keys = /*#__PURE__*/__webpack_require__(/*! ./keys */ "./node_modules/ramda/src/keys.js");
/**
 * Takes a function and
 * a [functor](https://github.com/fantasyland/fantasy-land#functor),
 * applies the function to each of the functor's values, and returns
 * a functor of the same shape.
 *
 * Ramda provides suitable `map` implementations for `Array` and `Object`,
 * so this function may be applied to `[1, 2, 3]` or `{x: 1, y: 2, z: 3}`.
 *
 * Dispatches to the `map` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * Also treats functions as functors and will compose them together.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Functor f => (a -> b) -> f a -> f b
 * @param {Function} fn The function to be called on every element of the input `list`.
 * @param {Array} list The list to be iterated over.
 * @return {Array} The new list.
 * @see R.transduce, R.addIndex
 * @example
 *
 *      const double = x => x * 2;
 *
 *      R.map(double, [1, 2, 3]); //=> [2, 4, 6]
 *
 *      R.map(double, {x: 1, y: 2, z: 3}); //=> {x: 2, y: 4, z: 6}
 * @symb R.map(f, [a, b]) = [f(a), f(b)]
 * @symb R.map(f, { x: a, y: b }) = { x: f(a), y: f(b) }
 * @symb R.map(f, functor_o) = functor_o.map(f)
 */


var map = /*#__PURE__*/_curry2( /*#__PURE__*/_dispatchable(['fantasy-land/map', 'map'], _xmap, function map(fn, functor) {
  switch (Object.prototype.toString.call(functor)) {
    case '[object Function]':
      return curryN(functor.length, function () {
        return fn.call(this, functor.apply(this, arguments));
      });

    case '[object Object]':
      return _reduce(function (acc, key) {
        acc[key] = fn(functor[key]);
        return acc;
      }, {}, keys(functor));

    default:
      return _map(fn, functor);
  }
}));

module.exports = map;

/***/ }),

/***/ "./node_modules/ramda/src/mapAccum.js":
/*!********************************************!*\
  !*** ./node_modules/ramda/src/mapAccum.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry3 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry3 */ "./node_modules/ramda/src/internal/_curry3.js");
/**
 * The `mapAccum` function behaves like a combination of map and reduce; it
 * applies a function to each element of a list, passing an accumulating
 * parameter from left to right, and returning a final value of this
 * accumulator together with the new list.
 *
 * The iterator function receives two arguments, *acc* and *value*, and should
 * return a tuple *[acc, value]*.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category List
 * @sig ((acc, x) -> (acc, y)) -> acc -> [x] -> (acc, [y])
 * @param {Function} fn The function to be called on every element of the input `list`.
 * @param {*} acc The accumulator value.
 * @param {Array} list The list to iterate over.
 * @return {*} The final, accumulated value.
 * @see R.scan, R.addIndex, R.mapAccumRight
 * @example
 *
 *      const digits = ['1', '2', '3', '4'];
 *      const appender = (a, b) => [a + b, a + b];
 *
 *      R.mapAccum(appender, 0, digits); //=> ['01234', ['01', '012', '0123', '01234']]
 * @symb R.mapAccum(f, a, [b, c, d]) = [
 *   f(f(f(a, b)[0], c)[0], d)[0],
 *   [
 *     f(a, b)[1],
 *     f(f(a, b)[0], c)[1],
 *     f(f(f(a, b)[0], c)[0], d)[1]
 *   ]
 * ]
 */


var mapAccum = /*#__PURE__*/_curry3(function mapAccum(fn, acc, list) {
  var idx = 0;
  var len = list.length;
  var result = [];
  var tuple = [acc];

  while (idx < len) {
    tuple = fn(tuple[0], list[idx]);
    result[idx] = tuple[1];
    idx += 1;
  }

  return [tuple[0], result];
});

module.exports = mapAccum;

/***/ }),

/***/ "./node_modules/ramda/src/mapAccumRight.js":
/*!*************************************************!*\
  !*** ./node_modules/ramda/src/mapAccumRight.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry3 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry3 */ "./node_modules/ramda/src/internal/_curry3.js");
/**
 * The `mapAccumRight` function behaves like a combination of map and reduce; it
 * applies a function to each element of a list, passing an accumulating
 * parameter from right to left, and returning a final value of this
 * accumulator together with the new list.
 *
 * Similar to [`mapAccum`](#mapAccum), except moves through the input list from
 * the right to the left.
 *
 * The iterator function receives two arguments, *acc* and *value*, and should
 * return a tuple *[acc, value]*.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category List
 * @sig ((acc, x) -> (acc, y)) -> acc -> [x] -> (acc, [y])
 * @param {Function} fn The function to be called on every element of the input `list`.
 * @param {*} acc The accumulator value.
 * @param {Array} list The list to iterate over.
 * @return {*} The final, accumulated value.
 * @see R.addIndex, R.mapAccum
 * @example
 *
 *      const digits = ['1', '2', '3', '4'];
 *      const appender = (a, b) => [b + a, b + a];
 *
 *      R.mapAccumRight(appender, 5, digits); //=> ['12345', ['12345', '2345', '345', '45']]
 * @symb R.mapAccumRight(f, a, [b, c, d]) = [
 *   f(f(f(a, d)[0], c)[0], b)[0],
 *   [
 *     f(a, d)[1],
 *     f(f(a, d)[0], c)[1],
 *     f(f(f(a, d)[0], c)[0], b)[1]
 *   ]
 * ]
 */


var mapAccumRight = /*#__PURE__*/_curry3(function mapAccumRight(fn, acc, list) {
  var idx = list.length - 1;
  var result = [];
  var tuple = [acc];

  while (idx >= 0) {
    tuple = fn(tuple[0], list[idx]);
    result[idx] = tuple[1];
    idx -= 1;
  }

  return [tuple[0], result];
});

module.exports = mapAccumRight;

/***/ }),

/***/ "./node_modules/ramda/src/mapObjIndexed.js":
/*!*************************************************!*\
  !*** ./node_modules/ramda/src/mapObjIndexed.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");

var _reduce = /*#__PURE__*/__webpack_require__(/*! ./internal/_reduce */ "./node_modules/ramda/src/internal/_reduce.js");

var keys = /*#__PURE__*/__webpack_require__(/*! ./keys */ "./node_modules/ramda/src/keys.js");
/**
 * An Object-specific version of [`map`](#map). The function is applied to three
 * arguments: *(value, key, obj)*. If only the value is significant, use
 * [`map`](#map) instead.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Object
 * @sig ((*, String, Object) -> *) -> Object -> Object
 * @param {Function} fn
 * @param {Object} obj
 * @return {Object}
 * @see R.map
 * @example
 *
 *      const xyz = { x: 1, y: 2, z: 3 };
 *      const prependKeyAndDouble = (num, key, obj) => key + (num * 2);
 *
 *      R.mapObjIndexed(prependKeyAndDouble, xyz); //=> { x: 'x2', y: 'y4', z: 'z6' }
 */


var mapObjIndexed = /*#__PURE__*/_curry2(function mapObjIndexed(fn, obj) {
  return _reduce(function (acc, key) {
    acc[key] = fn(obj[key], key, obj);
    return acc;
  }, {}, keys(obj));
});

module.exports = mapObjIndexed;

/***/ }),

/***/ "./node_modules/ramda/src/match.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/src/match.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");
/**
 * Tests a regular expression against a String. Note that this function will
 * return an empty array when there are no matches. This differs from
 * [`String.prototype.match`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match)
 * which returns `null` when there are no matches.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category String
 * @sig RegExp -> String -> [String | Undefined]
 * @param {RegExp} rx A regular expression.
 * @param {String} str The string to match against
 * @return {Array} The list of matches or empty array.
 * @see R.test
 * @example
 *
 *      R.match(/([a-z]a)/g, 'bananas'); //=> ['ba', 'na', 'na']
 *      R.match(/a/, 'b'); //=> []
 *      R.match(/a/, null); //=> TypeError: null does not have a method named "match"
 */


var match = /*#__PURE__*/_curry2(function match(rx, str) {
  return str.match(rx) || [];
});

module.exports = match;

/***/ }),

/***/ "./node_modules/ramda/src/mathMod.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/src/mathMod.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");

var _isInteger = /*#__PURE__*/__webpack_require__(/*! ./internal/_isInteger */ "./node_modules/ramda/src/internal/_isInteger.js");
/**
 * `mathMod` behaves like the modulo operator should mathematically, unlike the
 * `%` operator (and by extension, [`R.modulo`](#modulo)). So while
 * `-17 % 5` is `-2`, `mathMod(-17, 5)` is `3`. `mathMod` requires Integer
 * arguments, and returns NaN when the modulus is zero or negative.
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category Math
 * @sig Number -> Number -> Number
 * @param {Number} m The dividend.
 * @param {Number} p the modulus.
 * @return {Number} The result of `b mod a`.
 * @see R.modulo
 * @example
 *
 *      R.mathMod(-17, 5);  //=> 3
 *      R.mathMod(17, 5);   //=> 2
 *      R.mathMod(17, -5);  //=> NaN
 *      R.mathMod(17, 0);   //=> NaN
 *      R.mathMod(17.2, 5); //=> NaN
 *      R.mathMod(17, 5.3); //=> NaN
 *
 *      const clock = R.mathMod(R.__, 12);
 *      clock(15); //=> 3
 *      clock(24); //=> 0
 *
 *      const seventeenMod = R.mathMod(17);
 *      seventeenMod(3);  //=> 2
 *      seventeenMod(4);  //=> 1
 *      seventeenMod(10); //=> 7
 */


var mathMod = /*#__PURE__*/_curry2(function mathMod(m, p) {
  if (!_isInteger(m)) {
    return NaN;
  }

  if (!_isInteger(p) || p < 1) {
    return NaN;
  }

  return (m % p + p) % p;
});

module.exports = mathMod;

/***/ }),

/***/ "./node_modules/ramda/src/max.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/src/max.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");
/**
 * Returns the larger of its two arguments.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig Ord a => a -> a -> a
 * @param {*} a
 * @param {*} b
 * @return {*}
 * @see R.maxBy, R.min
 * @example
 *
 *      R.max(789, 123); //=> 789
 *      R.max('a', 'b'); //=> 'b'
 */


var max = /*#__PURE__*/_curry2(function max(a, b) {
  return b > a ? b : a;
});

module.exports = max;

/***/ }),

/***/ "./node_modules/ramda/src/maxBy.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/src/maxBy.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry3 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry3 */ "./node_modules/ramda/src/internal/_curry3.js");
/**
 * Takes a function and two values, and returns whichever value produces the
 * larger result when passed to the provided function.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Relation
 * @sig Ord b => (a -> b) -> a -> a -> a
 * @param {Function} f
 * @param {*} a
 * @param {*} b
 * @return {*}
 * @see R.max, R.minBy
 * @example
 *
 *      //  square :: Number -> Number
 *      const square = n => n * n;
 *
 *      R.maxBy(square, -3, 2); //=> -3
 *
 *      R.reduce(R.maxBy(square), 0, [3, -5, 4, 1, -2]); //=> -5
 *      R.reduce(R.maxBy(square), 0, []); //=> 0
 */


var maxBy = /*#__PURE__*/_curry3(function maxBy(f, a, b) {
  return f(b) > f(a) ? b : a;
});

module.exports = maxBy;

/***/ }),

/***/ "./node_modules/ramda/src/mean.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/src/mean.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry1 */ "./node_modules/ramda/src/internal/_curry1.js");

var sum = /*#__PURE__*/__webpack_require__(/*! ./sum */ "./node_modules/ramda/src/sum.js");
/**
 * Returns the mean of the given list of numbers.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category Math
 * @sig [Number] -> Number
 * @param {Array} list
 * @return {Number}
 * @see R.median
 * @example
 *
 *      R.mean([2, 7, 9]); //=> 6
 *      R.mean([]); //=> NaN
 */


var mean = /*#__PURE__*/_curry1(function mean(list) {
  return sum(list) / list.length;
});

module.exports = mean;

/***/ }),

/***/ "./node_modules/ramda/src/median.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/src/median.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry1 */ "./node_modules/ramda/src/internal/_curry1.js");

var mean = /*#__PURE__*/__webpack_require__(/*! ./mean */ "./node_modules/ramda/src/mean.js");
/**
 * Returns the median of the given list of numbers.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category Math
 * @sig [Number] -> Number
 * @param {Array} list
 * @return {Number}
 * @see R.mean
 * @example
 *
 *      R.median([2, 9, 7]); //=> 7
 *      R.median([7, 2, 10, 9]); //=> 8
 *      R.median([]); //=> NaN
 */


var median = /*#__PURE__*/_curry1(function median(list) {
  var len = list.length;

  if (len === 0) {
    return NaN;
  }

  var width = 2 - len % 2;
  var idx = (len - width) / 2;
  return mean(Array.prototype.slice.call(list, 0).sort(function (a, b) {
    return a < b ? -1 : a > b ? 1 : 0;
  }).slice(idx, idx + width));
});

module.exports = median;

/***/ }),

/***/ "./node_modules/ramda/src/memoizeWith.js":
/*!***********************************************!*\
  !*** ./node_modules/ramda/src/memoizeWith.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _arity = /*#__PURE__*/__webpack_require__(/*! ./internal/_arity */ "./node_modules/ramda/src/internal/_arity.js");

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");

var _has = /*#__PURE__*/__webpack_require__(/*! ./internal/_has */ "./node_modules/ramda/src/internal/_has.js");
/**
 * Creates a new function that, when invoked, caches the result of calling `fn`
 * for a given argument set and returns the result. Subsequent calls to the
 * memoized `fn` with the same argument set will not result in an additional
 * call to `fn`; instead, the cached result for that set of arguments will be
 * returned.
 *
 *
 * @func
 * @memberOf R
 * @since v0.24.0
 * @category Function
 * @sig (*... -> String) -> (*... -> a) -> (*... -> a)
 * @param {Function} fn The function to generate the cache key.
 * @param {Function} fn The function to memoize.
 * @return {Function} Memoized version of `fn`.
 * @example
 *
 *      let count = 0;
 *      const factorial = R.memoizeWith(R.identity, n => {
 *        count += 1;
 *        return R.product(R.range(1, n + 1));
 *      });
 *      factorial(5); //=> 120
 *      factorial(5); //=> 120
 *      factorial(5); //=> 120
 *      count; //=> 1
 */


var memoizeWith = /*#__PURE__*/_curry2(function memoizeWith(mFn, fn) {
  var cache = {};
  return _arity(fn.length, function () {
    var key = mFn.apply(this, arguments);

    if (!_has(key, cache)) {
      cache[key] = fn.apply(this, arguments);
    }

    return cache[key];
  });
});

module.exports = memoizeWith;

/***/ }),

/***/ "./node_modules/ramda/src/merge.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/src/merge.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _objectAssign = /*#__PURE__*/__webpack_require__(/*! ./internal/_objectAssign */ "./node_modules/ramda/src/internal/_objectAssign.js");

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");
/**
 * Create a new object with the own properties of the first object merged with
 * the own properties of the second object. If a key exists in both objects,
 * the value from the second object will be used.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig {k: v} -> {k: v} -> {k: v}
 * @param {Object} l
 * @param {Object} r
 * @return {Object}
 * @see R.mergeRight, R.mergeDeepRight, R.mergeWith, R.mergeWithKey
 * @deprecated since v0.26.0
 * @example
 *
 *      R.merge({ 'name': 'fred', 'age': 10 }, { 'age': 40 });
 *      //=> { 'name': 'fred', 'age': 40 }
 *
 *      const withDefaults = R.merge({x: 0, y: 0});
 *      withDefaults({y: 2}); //=> {x: 0, y: 2}
 * @symb R.merge(a, b) = {...a, ...b}
 */


var merge = /*#__PURE__*/_curry2(function merge(l, r) {
  return _objectAssign({}, l, r);
});

module.exports = merge;

/***/ }),

/***/ "./node_modules/ramda/src/mergeAll.js":
/*!********************************************!*\
  !*** ./node_modules/ramda/src/mergeAll.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _objectAssign = /*#__PURE__*/__webpack_require__(/*! ./internal/_objectAssign */ "./node_modules/ramda/src/internal/_objectAssign.js");

var _curry1 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry1 */ "./node_modules/ramda/src/internal/_curry1.js");
/**
 * Merges a list of objects together into one object.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category List
 * @sig [{k: v}] -> {k: v}
 * @param {Array} list An array of objects
 * @return {Object} A merged object.
 * @see R.reduce
 * @example
 *
 *      R.mergeAll([{foo:1},{bar:2},{baz:3}]); //=> {foo:1,bar:2,baz:3}
 *      R.mergeAll([{foo:1},{foo:2},{bar:2}]); //=> {foo:2,bar:2}
 * @symb R.mergeAll([{ x: 1 }, { y: 2 }, { z: 3 }]) = { x: 1, y: 2, z: 3 }
 */


var mergeAll = /*#__PURE__*/_curry1(function mergeAll(list) {
  return _objectAssign.apply(null, [{}].concat(list));
});

module.exports = mergeAll;

/***/ }),

/***/ "./node_modules/ramda/src/mergeDeepLeft.js":
/*!*************************************************!*\
  !*** ./node_modules/ramda/src/mergeDeepLeft.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");

var mergeDeepWithKey = /*#__PURE__*/__webpack_require__(/*! ./mergeDeepWithKey */ "./node_modules/ramda/src/mergeDeepWithKey.js");
/**
 * Creates a new object with the own properties of the first object merged with
 * the own properties of the second object. If a key exists in both objects:
 * - and both values are objects, the two values will be recursively merged
 * - otherwise the value from the first object will be used.
 *
 * @func
 * @memberOf R
 * @since v0.24.0
 * @category Object
 * @sig {a} -> {a} -> {a}
 * @param {Object} lObj
 * @param {Object} rObj
 * @return {Object}
 * @see R.merge, R.mergeDeepRight, R.mergeDeepWith, R.mergeDeepWithKey
 * @example
 *
 *      R.mergeDeepLeft({ name: 'fred', age: 10, contact: { email: 'moo@example.com' }},
 *                      { age: 40, contact: { email: 'baa@example.com' }});
 *      //=> { name: 'fred', age: 10, contact: { email: 'moo@example.com' }}
 */


var mergeDeepLeft = /*#__PURE__*/_curry2(function mergeDeepLeft(lObj, rObj) {
  return mergeDeepWithKey(function (k, lVal, rVal) {
    return lVal;
  }, lObj, rObj);
});

module.exports = mergeDeepLeft;

/***/ }),

/***/ "./node_modules/ramda/src/mergeDeepRight.js":
/*!**************************************************!*\
  !*** ./node_modules/ramda/src/mergeDeepRight.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");

var mergeDeepWithKey = /*#__PURE__*/__webpack_require__(/*! ./mergeDeepWithKey */ "./node_modules/ramda/src/mergeDeepWithKey.js");
/**
 * Creates a new object with the own properties of the first object merged with
 * the own properties of the second object. If a key exists in both objects:
 * - and both values are objects, the two values will be recursively merged
 * - otherwise the value from the second object will be used.
 *
 * @func
 * @memberOf R
 * @since v0.24.0
 * @category Object
 * @sig {a} -> {a} -> {a}
 * @param {Object} lObj
 * @param {Object} rObj
 * @return {Object}
 * @see R.merge, R.mergeDeepLeft, R.mergeDeepWith, R.mergeDeepWithKey
 * @example
 *
 *      R.mergeDeepRight({ name: 'fred', age: 10, contact: { email: 'moo@example.com' }},
 *                       { age: 40, contact: { email: 'baa@example.com' }});
 *      //=> { name: 'fred', age: 40, contact: { email: 'baa@example.com' }}
 */


var mergeDeepRight = /*#__PURE__*/_curry2(function mergeDeepRight(lObj, rObj) {
  return mergeDeepWithKey(function (k, lVal, rVal) {
    return rVal;
  }, lObj, rObj);
});

module.exports = mergeDeepRight;

/***/ }),

/***/ "./node_modules/ramda/src/mergeDeepWith.js":
/*!*************************************************!*\
  !*** ./node_modules/ramda/src/mergeDeepWith.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry3 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry3 */ "./node_modules/ramda/src/internal/_curry3.js");

var mergeDeepWithKey = /*#__PURE__*/__webpack_require__(/*! ./mergeDeepWithKey */ "./node_modules/ramda/src/mergeDeepWithKey.js");
/**
 * Creates a new object with the own properties of the two provided objects.
 * If a key exists in both objects:
 * - and both associated values are also objects then the values will be
 *   recursively merged.
 * - otherwise the provided function is applied to associated values using the
 *   resulting value as the new value associated with the key.
 * If a key only exists in one object, the value will be associated with the key
 * of the resulting object.
 *
 * @func
 * @memberOf R
 * @since v0.24.0
 * @category Object
 * @sig ((a, a) -> a) -> {a} -> {a} -> {a}
 * @param {Function} fn
 * @param {Object} lObj
 * @param {Object} rObj
 * @return {Object}
 * @see R.mergeWith, R.mergeDeepWithKey
 * @example
 *
 *      R.mergeDeepWith(R.concat,
 *                      { a: true, c: { values: [10, 20] }},
 *                      { b: true, c: { values: [15, 35] }});
 *      //=> { a: true, b: true, c: { values: [10, 20, 15, 35] }}
 */


var mergeDeepWith = /*#__PURE__*/_curry3(function mergeDeepWith(fn, lObj, rObj) {
  return mergeDeepWithKey(function (k, lVal, rVal) {
    return fn(lVal, rVal);
  }, lObj, rObj);
});

module.exports = mergeDeepWith;

/***/ }),

/***/ "./node_modules/ramda/src/mergeDeepWithKey.js":
/*!****************************************************!*\
  !*** ./node_modules/ramda/src/mergeDeepWithKey.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry3 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry3 */ "./node_modules/ramda/src/internal/_curry3.js");

var _isObject = /*#__PURE__*/__webpack_require__(/*! ./internal/_isObject */ "./node_modules/ramda/src/internal/_isObject.js");

var mergeWithKey = /*#__PURE__*/__webpack_require__(/*! ./mergeWithKey */ "./node_modules/ramda/src/mergeWithKey.js");
/**
 * Creates a new object with the own properties of the two provided objects.
 * If a key exists in both objects:
 * - and both associated values are also objects then the values will be
 *   recursively merged.
 * - otherwise the provided function is applied to the key and associated values
 *   using the resulting value as the new value associated with the key.
 * If a key only exists in one object, the value will be associated with the key
 * of the resulting object.
 *
 * @func
 * @memberOf R
 * @since v0.24.0
 * @category Object
 * @sig ((String, a, a) -> a) -> {a} -> {a} -> {a}
 * @param {Function} fn
 * @param {Object} lObj
 * @param {Object} rObj
 * @return {Object}
 * @see R.mergeWithKey, R.mergeDeepWith
 * @example
 *
 *      let concatValues = (k, l, r) => k == 'values' ? R.concat(l, r) : r
 *      R.mergeDeepWithKey(concatValues,
 *                         { a: true, c: { thing: 'foo', values: [10, 20] }},
 *                         { b: true, c: { thing: 'bar', values: [15, 35] }});
 *      //=> { a: true, b: true, c: { thing: 'bar', values: [10, 20, 15, 35] }}
 */


var mergeDeepWithKey = /*#__PURE__*/_curry3(function mergeDeepWithKey(fn, lObj, rObj) {
  return mergeWithKey(function (k, lVal, rVal) {
    if (_isObject(lVal) && _isObject(rVal)) {
      return mergeDeepWithKey(fn, lVal, rVal);
    } else {
      return fn(k, lVal, rVal);
    }
  }, lObj, rObj);
});

module.exports = mergeDeepWithKey;

/***/ }),

/***/ "./node_modules/ramda/src/mergeLeft.js":
/*!*********************************************!*\
  !*** ./node_modules/ramda/src/mergeLeft.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _objectAssign = /*#__PURE__*/__webpack_require__(/*! ./internal/_objectAssign */ "./node_modules/ramda/src/internal/_objectAssign.js");

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");
/**
 * Create a new object with the own properties of the first object merged with
 * the own properties of the second object. If a key exists in both objects,
 * the value from the first object will be used.
 *
 * @func
 * @memberOf R
 * @since v0.26.0
 * @category Object
 * @sig {k: v} -> {k: v} -> {k: v}
 * @param {Object} l
 * @param {Object} r
 * @return {Object}
 * @see R.mergeRight, R.mergeDeepLeft, R.mergeWith, R.mergeWithKey
 * @example
 *
 *      R.mergeLeft({ 'age': 40 }, { 'name': 'fred', 'age': 10 });
 *      //=> { 'name': 'fred', 'age': 40 }
 *
 *      const resetToDefault = R.mergeLeft({x: 0});
 *      resetToDefault({x: 5, y: 2}); //=> {x: 0, y: 2}
 * @symb R.mergeLeft(a, b) = {...b, ...a}
 */


var mergeLeft = /*#__PURE__*/_curry2(function mergeLeft(l, r) {
  return _objectAssign({}, r, l);
});

module.exports = mergeLeft;

/***/ }),

/***/ "./node_modules/ramda/src/mergeRight.js":
/*!**********************************************!*\
  !*** ./node_modules/ramda/src/mergeRight.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _objectAssign = /*#__PURE__*/__webpack_require__(/*! ./internal/_objectAssign */ "./node_modules/ramda/src/internal/_objectAssign.js");

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");
/**
 * Create a new object with the own properties of the first object merged with
 * the own properties of the second object. If a key exists in both objects,
 * the value from the second object will be used.
 *
 * @func
 * @memberOf R
 * @since v0.26.0
 * @category Object
 * @sig {k: v} -> {k: v} -> {k: v}
 * @param {Object} l
 * @param {Object} r
 * @return {Object}
 * @see R.mergeLeft, R.mergeDeepRight, R.mergeWith, R.mergeWithKey
 * @example
 *
 *      R.mergeRight({ 'name': 'fred', 'age': 10 }, { 'age': 40 });
 *      //=> { 'name': 'fred', 'age': 40 }
 *
 *      const withDefaults = R.mergeRight({x: 0, y: 0});
 *      withDefaults({y: 2}); //=> {x: 0, y: 2}
 * @symb R.mergeRight(a, b) = {...a, ...b}
 */


var mergeRight = /*#__PURE__*/_curry2(function mergeRight(l, r) {
  return _objectAssign({}, l, r);
});

module.exports = mergeRight;

/***/ }),

/***/ "./node_modules/ramda/src/mergeWith.js":
/*!*********************************************!*\
  !*** ./node_modules/ramda/src/mergeWith.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry3 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry3 */ "./node_modules/ramda/src/internal/_curry3.js");

var mergeWithKey = /*#__PURE__*/__webpack_require__(/*! ./mergeWithKey */ "./node_modules/ramda/src/mergeWithKey.js");
/**
 * Creates a new object with the own properties of the two provided objects. If
 * a key exists in both objects, the provided function is applied to the values
 * associated with the key in each object, with the result being used as the
 * value associated with the key in the returned object.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category Object
 * @sig ((a, a) -> a) -> {a} -> {a} -> {a}
 * @param {Function} fn
 * @param {Object} l
 * @param {Object} r
 * @return {Object}
 * @see R.mergeDeepWith, R.merge, R.mergeWithKey
 * @example
 *
 *      R.mergeWith(R.concat,
 *                  { a: true, values: [10, 20] },
 *                  { b: true, values: [15, 35] });
 *      //=> { a: true, b: true, values: [10, 20, 15, 35] }
 */


var mergeWith = /*#__PURE__*/_curry3(function mergeWith(fn, l, r) {
  return mergeWithKey(function (_, _l, _r) {
    return fn(_l, _r);
  }, l, r);
});

module.exports = mergeWith;

/***/ }),

/***/ "./node_modules/ramda/src/mergeWithKey.js":
/*!************************************************!*\
  !*** ./node_modules/ramda/src/mergeWithKey.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry3 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry3 */ "./node_modules/ramda/src/internal/_curry3.js");

var _has = /*#__PURE__*/__webpack_require__(/*! ./internal/_has */ "./node_modules/ramda/src/internal/_has.js");
/**
 * Creates a new object with the own properties of the two provided objects. If
 * a key exists in both objects, the provided function is applied to the key
 * and the values associated with the key in each object, with the result being
 * used as the value associated with the key in the returned object.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category Object
 * @sig ((String, a, a) -> a) -> {a} -> {a} -> {a}
 * @param {Function} fn
 * @param {Object} l
 * @param {Object} r
 * @return {Object}
 * @see R.mergeDeepWithKey, R.merge, R.mergeWith
 * @example
 *
 *      let concatValues = (k, l, r) => k == 'values' ? R.concat(l, r) : r
 *      R.mergeWithKey(concatValues,
 *                     { a: true, thing: 'foo', values: [10, 20] },
 *                     { b: true, thing: 'bar', values: [15, 35] });
 *      //=> { a: true, b: true, thing: 'bar', values: [10, 20, 15, 35] }
 * @symb R.mergeWithKey(f, { x: 1, y: 2 }, { y: 5, z: 3 }) = { x: 1, y: f('y', 2, 5), z: 3 }
 */


var mergeWithKey = /*#__PURE__*/_curry3(function mergeWithKey(fn, l, r) {
  var result = {};
  var k;

  for (k in l) {
    if (_has(k, l)) {
      result[k] = _has(k, r) ? fn(k, l[k], r[k]) : l[k];
    }
  }

  for (k in r) {
    if (_has(k, r) && !_has(k, result)) {
      result[k] = r[k];
    }
  }

  return result;
});

module.exports = mergeWithKey;

/***/ }),

/***/ "./node_modules/ramda/src/min.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/src/min.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");
/**
 * Returns the smaller of its two arguments.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig Ord a => a -> a -> a
 * @param {*} a
 * @param {*} b
 * @return {*}
 * @see R.minBy, R.max
 * @example
 *
 *      R.min(789, 123); //=> 123
 *      R.min('a', 'b'); //=> 'a'
 */


var min = /*#__PURE__*/_curry2(function min(a, b) {
  return b < a ? b : a;
});

module.exports = min;

/***/ }),

/***/ "./node_modules/ramda/src/minBy.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/src/minBy.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry3 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry3 */ "./node_modules/ramda/src/internal/_curry3.js");
/**
 * Takes a function and two values, and returns whichever value produces the
 * smaller result when passed to the provided function.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Relation
 * @sig Ord b => (a -> b) -> a -> a -> a
 * @param {Function} f
 * @param {*} a
 * @param {*} b
 * @return {*}
 * @see R.min, R.maxBy
 * @example
 *
 *      //  square :: Number -> Number
 *      const square = n => n * n;
 *
 *      R.minBy(square, -3, 2); //=> 2
 *
 *      R.reduce(R.minBy(square), Infinity, [3, -5, 4, 1, -2]); //=> 1
 *      R.reduce(R.minBy(square), Infinity, []); //=> Infinity
 */


var minBy = /*#__PURE__*/_curry3(function minBy(f, a, b) {
  return f(b) < f(a) ? b : a;
});

module.exports = minBy;

/***/ }),

/***/ "./node_modules/ramda/src/modulo.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/src/modulo.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");
/**
 * Divides the first parameter by the second and returns the remainder. Note
 * that this function preserves the JavaScript-style behavior for modulo. For
 * mathematical modulo see [`mathMod`](#mathMod).
 *
 * @func
 * @memberOf R
 * @since v0.1.1
 * @category Math
 * @sig Number -> Number -> Number
 * @param {Number} a The value to the divide.
 * @param {Number} b The pseudo-modulus
 * @return {Number} The result of `b % a`.
 * @see R.mathMod
 * @example
 *
 *      R.modulo(17, 3); //=> 2
 *      // JS behavior:
 *      R.modulo(-17, 3); //=> -2
 *      R.modulo(17, -3); //=> 2
 *
 *      const isOdd = R.modulo(R.__, 2);
 *      isOdd(42); //=> 0
 *      isOdd(21); //=> 1
 */


var modulo = /*#__PURE__*/_curry2(function modulo(a, b) {
  return a % b;
});

module.exports = modulo;

/***/ }),

/***/ "./node_modules/ramda/src/move.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/src/move.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry3 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry3 */ "./node_modules/ramda/src/internal/_curry3.js");
/**
 * Move an item, at index `from`, to index `to`, in a list of elements.
 * A new list will be created containing the new elements order.
 *
 * @func
 * @memberOf R
 * @since v0.27.1
 * @category List
 * @sig Number -> Number -> [a] -> [a]
 * @param {Number} from The source index
 * @param {Number} to The destination index
 * @param {Array} list The list which will serve to realise the move
 * @return {Array} The new list reordered
 * @example
 *
 *      R.move(0, 2, ['a', 'b', 'c', 'd', 'e', 'f']); //=> ['b', 'c', 'a', 'd', 'e', 'f']
 *      R.move(-1, 0, ['a', 'b', 'c', 'd', 'e', 'f']); //=> ['f', 'a', 'b', 'c', 'd', 'e'] list rotation
 */


var move = /*#__PURE__*/_curry3(function (from, to, list) {
  var length = list.length;
  var result = list.slice();
  var positiveFrom = from < 0 ? length + from : from;
  var positiveTo = to < 0 ? length + to : to;
  var item = result.splice(positiveFrom, 1);
  return positiveFrom < 0 || positiveFrom >= list.length || positiveTo < 0 || positiveTo >= list.length ? list : [].concat(result.slice(0, positiveTo)).concat(item).concat(result.slice(positiveTo, list.length));
});

module.exports = move;

/***/ }),

/***/ "./node_modules/ramda/src/multiply.js":
/*!********************************************!*\
  !*** ./node_modules/ramda/src/multiply.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");
/**
 * Multiplies two numbers. Equivalent to `a * b` but curried.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Math
 * @sig Number -> Number -> Number
 * @param {Number} a The first value.
 * @param {Number} b The second value.
 * @return {Number} The result of `a * b`.
 * @see R.divide
 * @example
 *
 *      const double = R.multiply(2);
 *      const triple = R.multiply(3);
 *      double(3);       //=>  6
 *      triple(4);       //=> 12
 *      R.multiply(2, 5);  //=> 10
 */


var multiply = /*#__PURE__*/_curry2(function multiply(a, b) {
  return a * b;
});

module.exports = multiply;

/***/ }),

/***/ "./node_modules/ramda/src/nAry.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/src/nAry.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");
/**
 * Wraps a function of any arity (including nullary) in a function that accepts
 * exactly `n` parameters. Any extraneous parameters will not be passed to the
 * supplied function.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig Number -> (* -> a) -> (* -> a)
 * @param {Number} n The desired arity of the new function.
 * @param {Function} fn The function to wrap.
 * @return {Function} A new function wrapping `fn`. The new function is guaranteed to be of
 *         arity `n`.
 * @see R.binary, R.unary
 * @example
 *
 *      const takesTwoArgs = (a, b) => [a, b];
 *
 *      takesTwoArgs.length; //=> 2
 *      takesTwoArgs(1, 2); //=> [1, 2]
 *
 *      const takesOneArg = R.nAry(1, takesTwoArgs);
 *      takesOneArg.length; //=> 1
 *      // Only `n` arguments are passed to the wrapped function
 *      takesOneArg(1, 2); //=> [1, undefined]
 * @symb R.nAry(0, f)(a, b) = f()
 * @symb R.nAry(1, f)(a, b) = f(a)
 * @symb R.nAry(2, f)(a, b) = f(a, b)
 */


var nAry = /*#__PURE__*/_curry2(function nAry(n, fn) {
  switch (n) {
    case 0:
      return function () {
        return fn.call(this);
      };

    case 1:
      return function (a0) {
        return fn.call(this, a0);
      };

    case 2:
      return function (a0, a1) {
        return fn.call(this, a0, a1);
      };

    case 3:
      return function (a0, a1, a2) {
        return fn.call(this, a0, a1, a2);
      };

    case 4:
      return function (a0, a1, a2, a3) {
        return fn.call(this, a0, a1, a2, a3);
      };

    case 5:
      return function (a0, a1, a2, a3, a4) {
        return fn.call(this, a0, a1, a2, a3, a4);
      };

    case 6:
      return function (a0, a1, a2, a3, a4, a5) {
        return fn.call(this, a0, a1, a2, a3, a4, a5);
      };

    case 7:
      return function (a0, a1, a2, a3, a4, a5, a6) {
        return fn.call(this, a0, a1, a2, a3, a4, a5, a6);
      };

    case 8:
      return function (a0, a1, a2, a3, a4, a5, a6, a7) {
        return fn.call(this, a0, a1, a2, a3, a4, a5, a6, a7);
      };

    case 9:
      return function (a0, a1, a2, a3, a4, a5, a6, a7, a8) {
        return fn.call(this, a0, a1, a2, a3, a4, a5, a6, a7, a8);
      };

    case 10:
      return function (a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
        return fn.call(this, a0, a1, a2, a3, a4, a5, a6, a7, a8, a9);
      };

    default:
      throw new Error('First argument to nAry must be a non-negative integer no greater than ten');
  }
});

module.exports = nAry;

/***/ }),

/***/ "./node_modules/ramda/src/negate.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/src/negate.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry1 */ "./node_modules/ramda/src/internal/_curry1.js");
/**
 * Negates its argument.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Math
 * @sig Number -> Number
 * @param {Number} n
 * @return {Number}
 * @example
 *
 *      R.negate(42); //=> -42
 */


var negate = /*#__PURE__*/_curry1(function negate(n) {
  return -n;
});

module.exports = negate;

/***/ }),

/***/ "./node_modules/ramda/src/none.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/src/none.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _complement = /*#__PURE__*/__webpack_require__(/*! ./internal/_complement */ "./node_modules/ramda/src/internal/_complement.js");

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");

var all = /*#__PURE__*/__webpack_require__(/*! ./all */ "./node_modules/ramda/src/all.js");
/**
 * Returns `true` if no elements of the list match the predicate, `false`
 * otherwise.
 *
 * Dispatches to the `all` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.12.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> Boolean
 * @param {Function} fn The predicate function.
 * @param {Array} list The array to consider.
 * @return {Boolean} `true` if the predicate is not satisfied by every element, `false` otherwise.
 * @see R.all, R.any
 * @example
 *
 *      const isEven = n => n % 2 === 0;
 *      const isOdd = n => n % 2 === 1;
 *
 *      R.none(isEven, [1, 3, 5, 7, 9, 11]); //=> true
 *      R.none(isOdd, [1, 3, 5, 7, 8, 11]); //=> false
 */


var none = /*#__PURE__*/_curry2(function none(fn, input) {
  return all(_complement(fn), input);
});

module.exports = none;

/***/ }),

/***/ "./node_modules/ramda/src/not.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/src/not.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry1 */ "./node_modules/ramda/src/internal/_curry1.js");
/**
 * A function that returns the `!` of its argument. It will return `true` when
 * passed false-y value, and `false` when passed a truth-y one.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Logic
 * @sig * -> Boolean
 * @param {*} a any value
 * @return {Boolean} the logical inverse of passed argument.
 * @see R.complement
 * @example
 *
 *      R.not(true); //=> false
 *      R.not(false); //=> true
 *      R.not(0); //=> true
 *      R.not(1); //=> false
 */


var not = /*#__PURE__*/_curry1(function not(a) {
  return !a;
});

module.exports = not;

/***/ }),

/***/ "./node_modules/ramda/src/nth.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/src/nth.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");

var _isString = /*#__PURE__*/__webpack_require__(/*! ./internal/_isString */ "./node_modules/ramda/src/internal/_isString.js");
/**
 * Returns the nth element of the given list or string. If n is negative the
 * element at index length + n is returned.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Number -> [a] -> a | Undefined
 * @sig Number -> String -> String
 * @param {Number} offset
 * @param {*} list
 * @return {*}
 * @example
 *
 *      const list = ['foo', 'bar', 'baz', 'quux'];
 *      R.nth(1, list); //=> 'bar'
 *      R.nth(-1, list); //=> 'quux'
 *      R.nth(-99, list); //=> undefined
 *
 *      R.nth(2, 'abc'); //=> 'c'
 *      R.nth(3, 'abc'); //=> ''
 * @symb R.nth(-1, [a, b, c]) = c
 * @symb R.nth(0, [a, b, c]) = a
 * @symb R.nth(1, [a, b, c]) = b
 */


var nth = /*#__PURE__*/_curry2(function nth(offset, list) {
  var idx = offset < 0 ? list.length + offset : offset;
  return _isString(list) ? list.charAt(idx) : list[idx];
});

module.exports = nth;

/***/ }),

/***/ "./node_modules/ramda/src/nthArg.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/src/nthArg.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry1 */ "./node_modules/ramda/src/internal/_curry1.js");

var curryN = /*#__PURE__*/__webpack_require__(/*! ./curryN */ "./node_modules/ramda/src/curryN.js");

var nth = /*#__PURE__*/__webpack_require__(/*! ./nth */ "./node_modules/ramda/src/nth.js");
/**
 * Returns a function which returns its nth argument.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Function
 * @sig Number -> *... -> *
 * @param {Number} n
 * @return {Function}
 * @example
 *
 *      R.nthArg(1)('a', 'b', 'c'); //=> 'b'
 *      R.nthArg(-1)('a', 'b', 'c'); //=> 'c'
 * @symb R.nthArg(-1)(a, b, c) = c
 * @symb R.nthArg(0)(a, b, c) = a
 * @symb R.nthArg(1)(a, b, c) = b
 */


var nthArg = /*#__PURE__*/_curry1(function nthArg(n) {
  var arity = n < 0 ? 1 : n + 1;
  return curryN(arity, function () {
    return nth(n, arguments);
  });
});

module.exports = nthArg;

/***/ }),

/***/ "./node_modules/ramda/src/o.js":
/*!*************************************!*\
  !*** ./node_modules/ramda/src/o.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry3 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry3 */ "./node_modules/ramda/src/internal/_curry3.js");
/**
 * `o` is a curried composition function that returns a unary function.
 * Like [`compose`](#compose), `o` performs right-to-left function composition.
 * Unlike [`compose`](#compose), the rightmost function passed to `o` will be
 * invoked with only one argument. Also, unlike [`compose`](#compose), `o` is
 * limited to accepting only 2 unary functions. The name o was chosen because
 * of its similarity to the mathematical composition operator ∘.
 *
 * @func
 * @memberOf R
 * @since v0.24.0
 * @category Function
 * @sig (b -> c) -> (a -> b) -> a -> c
 * @param {Function} f
 * @param {Function} g
 * @return {Function}
 * @see R.compose, R.pipe
 * @example
 *
 *      const classyGreeting = name => "The name's " + name.last + ", " + name.first + " " + name.last
 *      const yellGreeting = R.o(R.toUpper, classyGreeting);
 *      yellGreeting({first: 'James', last: 'Bond'}); //=> "THE NAME'S BOND, JAMES BOND"
 *
 *      R.o(R.multiply(10), R.add(10))(-4) //=> 60
 *
 * @symb R.o(f, g, x) = f(g(x))
 */


var o = /*#__PURE__*/_curry3(function o(f, g, x) {
  return f(g(x));
});

module.exports = o;

/***/ }),

/***/ "./node_modules/ramda/src/objOf.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/src/objOf.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");
/**
 * Creates an object containing a single key:value pair.
 *
 * @func
 * @memberOf R
 * @since v0.18.0
 * @category Object
 * @sig String -> a -> {String:a}
 * @param {String} key
 * @param {*} val
 * @return {Object}
 * @see R.pair
 * @example
 *
 *      const matchPhrases = R.compose(
 *        R.objOf('must'),
 *        R.map(R.objOf('match_phrase'))
 *      );
 *      matchPhrases(['foo', 'bar', 'baz']); //=> {must: [{match_phrase: 'foo'}, {match_phrase: 'bar'}, {match_phrase: 'baz'}]}
 */


var objOf = /*#__PURE__*/_curry2(function objOf(key, val) {
  var obj = {};
  obj[key] = val;
  return obj;
});

module.exports = objOf;

/***/ }),

/***/ "./node_modules/ramda/src/of.js":
/*!**************************************!*\
  !*** ./node_modules/ramda/src/of.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry1 */ "./node_modules/ramda/src/internal/_curry1.js");

var _of = /*#__PURE__*/__webpack_require__(/*! ./internal/_of */ "./node_modules/ramda/src/internal/_of.js");
/**
 * Returns a singleton array containing the value provided.
 *
 * Note this `of` is different from the ES6 `of`; See
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/of
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category Function
 * @sig a -> [a]
 * @param {*} x any value
 * @return {Array} An array wrapping `x`.
 * @example
 *
 *      R.of(null); //=> [null]
 *      R.of([42]); //=> [[42]]
 */


var of = /*#__PURE__*/_curry1(_of);

module.exports = of;

/***/ }),

/***/ "./node_modules/ramda/src/omit.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/src/omit.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");
/**
 * Returns a partial copy of an object omitting the keys specified.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig [String] -> {String: *} -> {String: *}
 * @param {Array} names an array of String property names to omit from the new object
 * @param {Object} obj The object to copy from
 * @return {Object} A new object with properties from `names` not on it.
 * @see R.pick
 * @example
 *
 *      R.omit(['a', 'd'], {a: 1, b: 2, c: 3, d: 4}); //=> {b: 2, c: 3}
 */


var omit = /*#__PURE__*/_curry2(function omit(names, obj) {
  var result = {};
  var index = {};
  var idx = 0;
  var len = names.length;

  while (idx < len) {
    index[names[idx]] = 1;
    idx += 1;
  }

  for (var prop in obj) {
    if (!index.hasOwnProperty(prop)) {
      result[prop] = obj[prop];
    }
  }

  return result;
});

module.exports = omit;

/***/ }),

/***/ "./node_modules/ramda/src/once.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/src/once.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _arity = /*#__PURE__*/__webpack_require__(/*! ./internal/_arity */ "./node_modules/ramda/src/internal/_arity.js");

var _curry1 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry1 */ "./node_modules/ramda/src/internal/_curry1.js");
/**
 * Accepts a function `fn` and returns a function that guards invocation of
 * `fn` such that `fn` can only ever be called once, no matter how many times
 * the returned function is invoked. The first value calculated is returned in
 * subsequent invocations.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig (a... -> b) -> (a... -> b)
 * @param {Function} fn The function to wrap in a call-only-once wrapper.
 * @return {Function} The wrapped function.
 * @example
 *
 *      const addOneOnce = R.once(x => x + 1);
 *      addOneOnce(10); //=> 11
 *      addOneOnce(addOneOnce(50)); //=> 11
 */


var once = /*#__PURE__*/_curry1(function once(fn) {
  var called = false;
  var result;
  return _arity(fn.length, function () {
    if (called) {
      return result;
    }

    called = true;
    result = fn.apply(this, arguments);
    return result;
  });
});

module.exports = once;

/***/ }),

/***/ "./node_modules/ramda/src/or.js":
/*!**************************************!*\
  !*** ./node_modules/ramda/src/or.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");
/**
 * Returns `true` if one or both of its arguments are `true`. Returns `false`
 * if both arguments are `false`.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Logic
 * @sig a -> b -> a | b
 * @param {Any} a
 * @param {Any} b
 * @return {Any} the first argument if truthy, otherwise the second argument.
 * @see R.either, R.xor
 * @example
 *
 *      R.or(true, true); //=> true
 *      R.or(true, false); //=> true
 *      R.or(false, true); //=> true
 *      R.or(false, false); //=> false
 */


var or = /*#__PURE__*/_curry2(function or(a, b) {
  return a || b;
});

module.exports = or;

/***/ }),

/***/ "./node_modules/ramda/src/otherwise.js":
/*!*********************************************!*\
  !*** ./node_modules/ramda/src/otherwise.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");

var _assertPromise = /*#__PURE__*/__webpack_require__(/*! ./internal/_assertPromise */ "./node_modules/ramda/src/internal/_assertPromise.js");
/**
 * Returns the result of applying the onFailure function to the value inside
 * a failed promise. This is useful for handling rejected promises
 * inside function compositions.
 *
 * @func
 * @memberOf R
 * @since v0.26.0
 * @category Function
 * @sig (e -> b) -> (Promise e a) -> (Promise e b)
 * @sig (e -> (Promise f b)) -> (Promise e a) -> (Promise f b)
 * @param {Function} onFailure The function to apply. Can return a value or a promise of a value.
 * @param {Promise} p
 * @return {Promise} The result of calling `p.then(null, onFailure)`
 * @see R.then
 * @example
 *
 *      var failedFetch = (id) => Promise.reject('bad ID');
 *      var useDefault = () => ({ firstName: 'Bob', lastName: 'Loblaw' })
 *
 *      //recoverFromFailure :: String -> Promise ({firstName, lastName})
 *      var recoverFromFailure = R.pipe(
 *        failedFetch,
 *        R.otherwise(useDefault),
 *        R.then(R.pick(['firstName', 'lastName'])),
 *      );
 *      recoverFromFailure(12345).then(console.log)
 */


var otherwise = /*#__PURE__*/_curry2(function otherwise(f, p) {
  _assertPromise('otherwise', p);

  return p.then(null, f);
});

module.exports = otherwise;

/***/ }),

/***/ "./node_modules/ramda/src/over.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/src/over.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry3 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry3 */ "./node_modules/ramda/src/internal/_curry3.js"); // `Identity` is a functor that holds a single value, where `map` simply
// transforms the held value with the provided function.


var Identity = function (x) {
  return {
    value: x,
    map: function (f) {
      return Identity(f(x));
    }
  };
};
/**
 * Returns the result of "setting" the portion of the given data structure
 * focused by the given lens to the result of applying the given function to
 * the focused value.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category Object
 * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
 * @sig Lens s a -> (a -> a) -> s -> s
 * @param {Lens} lens
 * @param {*} v
 * @param {*} x
 * @return {*}
 * @see R.prop, R.lensIndex, R.lensProp
 * @example
 *
 *      const headLens = R.lensIndex(0);
 *
 *      R.over(headLens, R.toUpper, ['foo', 'bar', 'baz']); //=> ['FOO', 'bar', 'baz']
 */


var over = /*#__PURE__*/_curry3(function over(lens, f, x) {
  // The value returned by the getter function is first transformed with `f`,
  // then set as the value of an `Identity`. This is then mapped over with the
  // setter function of the lens.
  return lens(function (y) {
    return Identity(f(y));
  })(x).value;
});

module.exports = over;

/***/ }),

/***/ "./node_modules/ramda/src/pair.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/src/pair.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");
/**
 * Takes two arguments, `fst` and `snd`, and returns `[fst, snd]`.
 *
 * @func
 * @memberOf R
 * @since v0.18.0
 * @category List
 * @sig a -> b -> (a,b)
 * @param {*} fst
 * @param {*} snd
 * @return {Array}
 * @see R.objOf, R.of
 * @example
 *
 *      R.pair('foo', 'bar'); //=> ['foo', 'bar']
 */


var pair = /*#__PURE__*/_curry2(function pair(fst, snd) {
  return [fst, snd];
});

module.exports = pair;

/***/ }),

/***/ "./node_modules/ramda/src/partial.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/src/partial.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _concat = /*#__PURE__*/__webpack_require__(/*! ./internal/_concat */ "./node_modules/ramda/src/internal/_concat.js");

var _createPartialApplicator = /*#__PURE__*/__webpack_require__(/*! ./internal/_createPartialApplicator */ "./node_modules/ramda/src/internal/_createPartialApplicator.js");
/**
 * Takes a function `f` and a list of arguments, and returns a function `g`.
 * When applied, `g` returns the result of applying `f` to the arguments
 * provided initially followed by the arguments provided to `g`.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category Function
 * @sig ((a, b, c, ..., n) -> x) -> [a, b, c, ...] -> ((d, e, f, ..., n) -> x)
 * @param {Function} f
 * @param {Array} args
 * @return {Function}
 * @see R.partialRight, R.curry
 * @example
 *
 *      const multiply2 = (a, b) => a * b;
 *      const double = R.partial(multiply2, [2]);
 *      double(2); //=> 4
 *
 *      const greet = (salutation, title, firstName, lastName) =>
 *        salutation + ', ' + title + ' ' + firstName + ' ' + lastName + '!';
 *
 *      const sayHello = R.partial(greet, ['Hello']);
 *      const sayHelloToMs = R.partial(sayHello, ['Ms.']);
 *      sayHelloToMs('Jane', 'Jones'); //=> 'Hello, Ms. Jane Jones!'
 * @symb R.partial(f, [a, b])(c, d) = f(a, b, c, d)
 */


var partial = /*#__PURE__*/_createPartialApplicator(_concat);

module.exports = partial;

/***/ }),

/***/ "./node_modules/ramda/src/partialRight.js":
/*!************************************************!*\
  !*** ./node_modules/ramda/src/partialRight.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _concat = /*#__PURE__*/__webpack_require__(/*! ./internal/_concat */ "./node_modules/ramda/src/internal/_concat.js");

var _createPartialApplicator = /*#__PURE__*/__webpack_require__(/*! ./internal/_createPartialApplicator */ "./node_modules/ramda/src/internal/_createPartialApplicator.js");

var flip = /*#__PURE__*/__webpack_require__(/*! ./flip */ "./node_modules/ramda/src/flip.js");
/**
 * Takes a function `f` and a list of arguments, and returns a function `g`.
 * When applied, `g` returns the result of applying `f` to the arguments
 * provided to `g` followed by the arguments provided initially.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category Function
 * @sig ((a, b, c, ..., n) -> x) -> [d, e, f, ..., n] -> ((a, b, c, ...) -> x)
 * @param {Function} f
 * @param {Array} args
 * @return {Function}
 * @see R.partial
 * @example
 *
 *      const greet = (salutation, title, firstName, lastName) =>
 *        salutation + ', ' + title + ' ' + firstName + ' ' + lastName + '!';
 *
 *      const greetMsJaneJones = R.partialRight(greet, ['Ms.', 'Jane', 'Jones']);
 *
 *      greetMsJaneJones('Hello'); //=> 'Hello, Ms. Jane Jones!'
 * @symb R.partialRight(f, [a, b])(c, d) = f(c, d, a, b)
 */


var partialRight = /*#__PURE__*/_createPartialApplicator( /*#__PURE__*/flip(_concat));

module.exports = partialRight;

/***/ }),

/***/ "./node_modules/ramda/src/partition.js":
/*!*********************************************!*\
  !*** ./node_modules/ramda/src/partition.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var filter = /*#__PURE__*/__webpack_require__(/*! ./filter */ "./node_modules/ramda/src/filter.js");

var juxt = /*#__PURE__*/__webpack_require__(/*! ./juxt */ "./node_modules/ramda/src/juxt.js");

var reject = /*#__PURE__*/__webpack_require__(/*! ./reject */ "./node_modules/ramda/src/reject.js");
/**
 * Takes a predicate and a list or other `Filterable` object and returns the
 * pair of filterable objects of the same type of elements which do and do not
 * satisfy, the predicate, respectively. Filterable objects include plain objects or any object
 * that has a filter method such as `Array`.
 *
 * @func
 * @memberOf R
 * @since v0.1.4
 * @category List
 * @sig Filterable f => (a -> Boolean) -> f a -> [f a, f a]
 * @param {Function} pred A predicate to determine which side the element belongs to.
 * @param {Array} filterable the list (or other filterable) to partition.
 * @return {Array} An array, containing first the subset of elements that satisfy the
 *         predicate, and second the subset of elements that do not satisfy.
 * @see R.filter, R.reject
 * @example
 *
 *      R.partition(R.includes('s'), ['sss', 'ttt', 'foo', 'bars']);
 *      // => [ [ 'sss', 'bars' ],  [ 'ttt', 'foo' ] ]
 *
 *      R.partition(R.includes('s'), { a: 'sss', b: 'ttt', foo: 'bars' });
 *      // => [ { a: 'sss', foo: 'bars' }, { b: 'ttt' }  ]
 */


var partition = /*#__PURE__*/juxt([filter, reject]);
module.exports = partition;

/***/ }),

/***/ "./node_modules/ramda/src/path.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/src/path.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");

var paths = /*#__PURE__*/__webpack_require__(/*! ./paths */ "./node_modules/ramda/src/paths.js");
/**
 * Retrieve the value at a given path.
 *
 * @func
 * @memberOf R
 * @since v0.2.0
 * @category Object
 * @typedefn Idx = String | Int
 * @sig [Idx] -> {a} -> a | Undefined
 * @param {Array} path The path to use.
 * @param {Object} obj The object to retrieve the nested property from.
 * @return {*} The data at `path`.
 * @see R.prop, R.nth
 * @example
 *
 *      R.path(['a', 'b'], {a: {b: 2}}); //=> 2
 *      R.path(['a', 'b'], {c: {b: 2}}); //=> undefined
 *      R.path(['a', 'b', 0], {a: {b: [1, 2, 3]}}); //=> 1
 *      R.path(['a', 'b', -2], {a: {b: [1, 2, 3]}}); //=> 2
 */


var path = /*#__PURE__*/_curry2(function path(pathAr, obj) {
  return paths([pathAr], obj)[0];
});

module.exports = path;

/***/ }),

/***/ "./node_modules/ramda/src/pathEq.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/src/pathEq.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry3 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry3 */ "./node_modules/ramda/src/internal/_curry3.js");

var equals = /*#__PURE__*/__webpack_require__(/*! ./equals */ "./node_modules/ramda/src/equals.js");

var path = /*#__PURE__*/__webpack_require__(/*! ./path */ "./node_modules/ramda/src/path.js");
/**
 * Determines whether a nested path on an object has a specific value, in
 * [`R.equals`](#equals) terms. Most likely used to filter a list.
 *
 * @func
 * @memberOf R
 * @since v0.7.0
 * @category Relation
 * @typedefn Idx = String | Int
 * @sig [Idx] -> a -> {a} -> Boolean
 * @param {Array} path The path of the nested property to use
 * @param {*} val The value to compare the nested property with
 * @param {Object} obj The object to check the nested property in
 * @return {Boolean} `true` if the value equals the nested object property,
 *         `false` otherwise.
 * @example
 *
 *      const user1 = { address: { zipCode: 90210 } };
 *      const user2 = { address: { zipCode: 55555 } };
 *      const user3 = { name: 'Bob' };
 *      const users = [ user1, user2, user3 ];
 *      const isFamous = R.pathEq(['address', 'zipCode'], 90210);
 *      R.filter(isFamous, users); //=> [ user1 ]
 */


var pathEq = /*#__PURE__*/_curry3(function pathEq(_path, val, obj) {
  return equals(path(_path, obj), val);
});

module.exports = pathEq;

/***/ }),

/***/ "./node_modules/ramda/src/pathOr.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/src/pathOr.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry3 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry3 */ "./node_modules/ramda/src/internal/_curry3.js");

var defaultTo = /*#__PURE__*/__webpack_require__(/*! ./defaultTo */ "./node_modules/ramda/src/defaultTo.js");

var path = /*#__PURE__*/__webpack_require__(/*! ./path */ "./node_modules/ramda/src/path.js");
/**
 * If the given, non-null object has a value at the given path, returns the
 * value at that path. Otherwise returns the provided default value.
 *
 * @func
 * @memberOf R
 * @since v0.18.0
 * @category Object
 * @typedefn Idx = String | Int
 * @sig a -> [Idx] -> {a} -> a
 * @param {*} d The default value.
 * @param {Array} p The path to use.
 * @param {Object} obj The object to retrieve the nested property from.
 * @return {*} The data at `path` of the supplied object or the default value.
 * @example
 *
 *      R.pathOr('N/A', ['a', 'b'], {a: {b: 2}}); //=> 2
 *      R.pathOr('N/A', ['a', 'b'], {c: {b: 2}}); //=> "N/A"
 */


var pathOr = /*#__PURE__*/_curry3(function pathOr(d, p, obj) {
  return defaultTo(d, path(p, obj));
});

module.exports = pathOr;

/***/ }),

/***/ "./node_modules/ramda/src/pathSatisfies.js":
/*!*************************************************!*\
  !*** ./node_modules/ramda/src/pathSatisfies.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry3 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry3 */ "./node_modules/ramda/src/internal/_curry3.js");

var path = /*#__PURE__*/__webpack_require__(/*! ./path */ "./node_modules/ramda/src/path.js");
/**
 * Returns `true` if the specified object property at given path satisfies the
 * given predicate; `false` otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category Logic
 * @typedefn Idx = String | Int
 * @sig (a -> Boolean) -> [Idx] -> {a} -> Boolean
 * @param {Function} pred
 * @param {Array} propPath
 * @param {*} obj
 * @return {Boolean}
 * @see R.propSatisfies, R.path
 * @example
 *
 *      R.pathSatisfies(y => y > 0, ['x', 'y'], {x: {y: 2}}); //=> true
 *      R.pathSatisfies(R.is(Object), [], {x: {y: 2}}); //=> true
 */


var pathSatisfies = /*#__PURE__*/_curry3(function pathSatisfies(pred, propPath, obj) {
  return pred(path(propPath, obj));
});

module.exports = pathSatisfies;

/***/ }),

/***/ "./node_modules/ramda/src/paths.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/src/paths.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");

var _isInteger = /*#__PURE__*/__webpack_require__(/*! ./internal/_isInteger */ "./node_modules/ramda/src/internal/_isInteger.js");

var nth = /*#__PURE__*/__webpack_require__(/*! ./nth */ "./node_modules/ramda/src/nth.js");
/**
 * Retrieves the values at given paths of an object.
 *
 * @func
 * @memberOf R
 * @since v0.27.1
 * @category Object
 * @typedefn Idx = [String | Int]
 * @sig [Idx] -> {a} -> [a | Undefined]
 * @param {Array} pathsArray The array of paths to be fetched.
 * @param {Object} obj The object to retrieve the nested properties from.
 * @return {Array} A list consisting of values at paths specified by "pathsArray".
 * @see R.path
 * @example
 *
 *      R.paths([['a', 'b'], ['p', 0, 'q']], {a: {b: 2}, p: [{q: 3}]}); //=> [2, 3]
 *      R.paths([['a', 'b'], ['p', 'r']], {a: {b: 2}, p: [{q: 3}]}); //=> [2, undefined]
 */


var paths = /*#__PURE__*/_curry2(function paths(pathsArray, obj) {
  return pathsArray.map(function (paths) {
    var val = obj;
    var idx = 0;
    var p;

    while (idx < paths.length) {
      if (val == null) {
        return;
      }

      p = paths[idx];
      val = _isInteger(p) ? nth(p, val) : val[p];
      idx += 1;
    }

    return val;
  });
});

module.exports = paths;

/***/ }),

/***/ "./node_modules/ramda/src/pick.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/src/pick.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");
/**
 * Returns a partial copy of an object containing only the keys specified. If
 * the key does not exist, the property is ignored.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig [k] -> {k: v} -> {k: v}
 * @param {Array} names an array of String property names to copy onto a new object
 * @param {Object} obj The object to copy from
 * @return {Object} A new object with only properties from `names` on it.
 * @see R.omit, R.props
 * @example
 *
 *      R.pick(['a', 'd'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1, d: 4}
 *      R.pick(['a', 'e', 'f'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1}
 */


var pick = /*#__PURE__*/_curry2(function pick(names, obj) {
  var result = {};
  var idx = 0;

  while (idx < names.length) {
    if (names[idx] in obj) {
      result[names[idx]] = obj[names[idx]];
    }

    idx += 1;
  }

  return result;
});

module.exports = pick;

/***/ }),

/***/ "./node_modules/ramda/src/pickAll.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/src/pickAll.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");
/**
 * Similar to `pick` except that this one includes a `key: undefined` pair for
 * properties that don't exist.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig [k] -> {k: v} -> {k: v}
 * @param {Array} names an array of String property names to copy onto a new object
 * @param {Object} obj The object to copy from
 * @return {Object} A new object with only properties from `names` on it.
 * @see R.pick
 * @example
 *
 *      R.pickAll(['a', 'd'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1, d: 4}
 *      R.pickAll(['a', 'e', 'f'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1, e: undefined, f: undefined}
 */


var pickAll = /*#__PURE__*/_curry2(function pickAll(names, obj) {
  var result = {};
  var idx = 0;
  var len = names.length;

  while (idx < len) {
    var name = names[idx];
    result[name] = obj[name];
    idx += 1;
  }

  return result;
});

module.exports = pickAll;

/***/ }),

/***/ "./node_modules/ramda/src/pickBy.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/src/pickBy.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");
/**
 * Returns a partial copy of an object containing only the keys that satisfy
 * the supplied predicate.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Object
 * @sig ((v, k) -> Boolean) -> {k: v} -> {k: v}
 * @param {Function} pred A predicate to determine whether or not a key
 *        should be included on the output object.
 * @param {Object} obj The object to copy from
 * @return {Object} A new object with only properties that satisfy `pred`
 *         on it.
 * @see R.pick, R.filter
 * @example
 *
 *      const isUpperCase = (val, key) => key.toUpperCase() === key;
 *      R.pickBy(isUpperCase, {a: 1, b: 2, A: 3, B: 4}); //=> {A: 3, B: 4}
 */


var pickBy = /*#__PURE__*/_curry2(function pickBy(test, obj) {
  var result = {};

  for (var prop in obj) {
    if (test(obj[prop], prop, obj)) {
      result[prop] = obj[prop];
    }
  }

  return result;
});

module.exports = pickBy;

/***/ }),

/***/ "./node_modules/ramda/src/pipe.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/src/pipe.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _arity = /*#__PURE__*/__webpack_require__(/*! ./internal/_arity */ "./node_modules/ramda/src/internal/_arity.js");

var _pipe = /*#__PURE__*/__webpack_require__(/*! ./internal/_pipe */ "./node_modules/ramda/src/internal/_pipe.js");

var reduce = /*#__PURE__*/__webpack_require__(/*! ./reduce */ "./node_modules/ramda/src/reduce.js");

var tail = /*#__PURE__*/__webpack_require__(/*! ./tail */ "./node_modules/ramda/src/tail.js");
/**
 * Performs left-to-right function composition. The first argument may have
 * any arity; the remaining arguments must be unary.
 *
 * In some libraries this function is named `sequence`.
 *
 * **Note:** The result of pipe is not automatically curried.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig (((a, b, ..., n) -> o), (o -> p), ..., (x -> y), (y -> z)) -> ((a, b, ..., n) -> z)
 * @param {...Function} functions
 * @return {Function}
 * @see R.compose
 * @example
 *
 *      const f = R.pipe(Math.pow, R.negate, R.inc);
 *
 *      f(3, 4); // -(3^4) + 1
 * @symb R.pipe(f, g, h)(a, b) = h(g(f(a, b)))
 */


function pipe() {
  if (arguments.length === 0) {
    throw new Error('pipe requires at least one argument');
  }

  return _arity(arguments[0].length, reduce(_pipe, arguments[0], tail(arguments)));
}

module.exports = pipe;

/***/ }),

/***/ "./node_modules/ramda/src/pipeK.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/src/pipeK.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var composeK = /*#__PURE__*/__webpack_require__(/*! ./composeK */ "./node_modules/ramda/src/composeK.js");

var reverse = /*#__PURE__*/__webpack_require__(/*! ./reverse */ "./node_modules/ramda/src/reverse.js");
/**
 * Returns the left-to-right Kleisli composition of the provided functions,
 * each of which must return a value of a type supported by [`chain`](#chain).
 *
 * `R.pipeK(f, g, h)` is equivalent to `R.pipe(f, R.chain(g), R.chain(h))`.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category Function
 * @sig Chain m => ((a -> m b), (b -> m c), ..., (y -> m z)) -> (a -> m z)
 * @param {...Function}
 * @return {Function}
 * @see R.composeK
 * @deprecated since v0.26.0
 * @example
 *
 *      //  parseJson :: String -> Maybe *
 *      //  get :: String -> Object -> Maybe *
 *
 *      //  getStateCode :: Maybe String -> Maybe String
 *      const getStateCode = R.pipeK(
 *        parseJson,
 *        get('user'),
 *        get('address'),
 *        get('state'),
 *        R.compose(Maybe.of, R.toUpper)
 *      );
 *
 *      getStateCode('{"user":{"address":{"state":"ny"}}}');
 *      //=> Just('NY')
 *      getStateCode('[Invalid JSON]');
 *      //=> Nothing()
 * @symb R.pipeK(f, g, h)(a) = R.chain(h, R.chain(g, f(a)))
 */


function pipeK() {
  if (arguments.length === 0) {
    throw new Error('pipeK requires at least one argument');
  }

  return composeK.apply(this, reverse(arguments));
}

module.exports = pipeK;

/***/ }),

/***/ "./node_modules/ramda/src/pipeP.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/src/pipeP.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _arity = /*#__PURE__*/__webpack_require__(/*! ./internal/_arity */ "./node_modules/ramda/src/internal/_arity.js");

var _pipeP = /*#__PURE__*/__webpack_require__(/*! ./internal/_pipeP */ "./node_modules/ramda/src/internal/_pipeP.js");

var reduce = /*#__PURE__*/__webpack_require__(/*! ./reduce */ "./node_modules/ramda/src/reduce.js");

var tail = /*#__PURE__*/__webpack_require__(/*! ./tail */ "./node_modules/ramda/src/tail.js");
/**
 * Performs left-to-right composition of one or more Promise-returning
 * functions. The first argument may have any arity; the remaining arguments
 * must be unary.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category Function
 * @sig ((a -> Promise b), (b -> Promise c), ..., (y -> Promise z)) -> (a -> Promise z)
 * @param {...Function} functions
 * @return {Function}
 * @see R.composeP
 * @deprecated since v0.26.0
 * @example
 *
 *      //  followersForUser :: String -> Promise [User]
 *      const followersForUser = R.pipeP(db.getUserById, db.getFollowers);
 */


function pipeP() {
  if (arguments.length === 0) {
    throw new Error('pipeP requires at least one argument');
  }

  return _arity(arguments[0].length, reduce(_pipeP, arguments[0], tail(arguments)));
}

module.exports = pipeP;

/***/ }),

/***/ "./node_modules/ramda/src/pipeWith.js":
/*!********************************************!*\
  !*** ./node_modules/ramda/src/pipeWith.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _arity = /*#__PURE__*/__webpack_require__(/*! ./internal/_arity */ "./node_modules/ramda/src/internal/_arity.js");

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");

var head = /*#__PURE__*/__webpack_require__(/*! ./head */ "./node_modules/ramda/src/head.js");

var _reduce = /*#__PURE__*/__webpack_require__(/*! ./internal/_reduce */ "./node_modules/ramda/src/internal/_reduce.js");

var tail = /*#__PURE__*/__webpack_require__(/*! ./tail */ "./node_modules/ramda/src/tail.js");

var identity = /*#__PURE__*/__webpack_require__(/*! ./identity */ "./node_modules/ramda/src/identity.js");
/**
 * Performs left-to-right function composition using transforming function. The first argument may have
 * any arity; the remaining arguments must be unary.
 *
 * **Note:** The result of pipeWith is not automatically curried. Transforming function is not used on the
 * first argument.
 *
 * @func
 * @memberOf R
 * @since v0.26.0
 * @category Function
 * @sig ((* -> *), [((a, b, ..., n) -> o), (o -> p), ..., (x -> y), (y -> z)]) -> ((a, b, ..., n) -> z)
 * @param {...Function} functions
 * @return {Function}
 * @see R.composeWith, R.pipe
 * @example
 *
 *      const pipeWhileNotNil = R.pipeWith((f, res) => R.isNil(res) ? res : f(res));
 *      const f = pipeWhileNotNil([Math.pow, R.negate, R.inc])
 *
 *      f(3, 4); // -(3^4) + 1
 * @symb R.pipeWith(f)([g, h, i])(...args) = f(i, f(h, g(...args)))
 */


var pipeWith = /*#__PURE__*/_curry2(function pipeWith(xf, list) {
  if (list.length <= 0) {
    return identity;
  }

  var headList = head(list);
  var tailList = tail(list);
  return _arity(headList.length, function () {
    return _reduce(function (result, f) {
      return xf.call(this, f, result);
    }, headList.apply(this, arguments), tailList);
  });
});

module.exports = pipeWith;

/***/ }),

/***/ "./node_modules/ramda/src/pluck.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/src/pluck.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");

var map = /*#__PURE__*/__webpack_require__(/*! ./map */ "./node_modules/ramda/src/map.js");

var prop = /*#__PURE__*/__webpack_require__(/*! ./prop */ "./node_modules/ramda/src/prop.js");
/**
 * Returns a new list by plucking the same named property off all objects in
 * the list supplied.
 *
 * `pluck` will work on
 * any [functor](https://github.com/fantasyland/fantasy-land#functor) in
 * addition to arrays, as it is equivalent to `R.map(R.prop(k), f)`.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Functor f => k -> f {k: v} -> f v
 * @param {Number|String} key The key name to pluck off of each object.
 * @param {Array} f The array or functor to consider.
 * @return {Array} The list of values for the given key.
 * @see R.props
 * @example
 *
 *      var getAges = R.pluck('age');
 *      getAges([{name: 'fred', age: 29}, {name: 'wilma', age: 27}]); //=> [29, 27]
 *
 *      R.pluck(0, [[1, 2], [3, 4]]);               //=> [1, 3]
 *      R.pluck('val', {a: {val: 3}, b: {val: 5}}); //=> {a: 3, b: 5}
 * @symb R.pluck('x', [{x: 1, y: 2}, {x: 3, y: 4}, {x: 5, y: 6}]) = [1, 3, 5]
 * @symb R.pluck(0, [[1, 2], [3, 4], [5, 6]]) = [1, 3, 5]
 */


var pluck = /*#__PURE__*/_curry2(function pluck(p, list) {
  return map(prop(p), list);
});

module.exports = pluck;

/***/ }),

/***/ "./node_modules/ramda/src/prepend.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/src/prepend.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _concat = /*#__PURE__*/__webpack_require__(/*! ./internal/_concat */ "./node_modules/ramda/src/internal/_concat.js");

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");
/**
 * Returns a new list with the given element at the front, followed by the
 * contents of the list.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig a -> [a] -> [a]
 * @param {*} el The item to add to the head of the output list.
 * @param {Array} list The array to add to the tail of the output list.
 * @return {Array} A new array.
 * @see R.append
 * @example
 *
 *      R.prepend('fee', ['fi', 'fo', 'fum']); //=> ['fee', 'fi', 'fo', 'fum']
 */


var prepend = /*#__PURE__*/_curry2(function prepend(el, list) {
  return _concat([el], list);
});

module.exports = prepend;

/***/ }),

/***/ "./node_modules/ramda/src/product.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/src/product.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var multiply = /*#__PURE__*/__webpack_require__(/*! ./multiply */ "./node_modules/ramda/src/multiply.js");

var reduce = /*#__PURE__*/__webpack_require__(/*! ./reduce */ "./node_modules/ramda/src/reduce.js");
/**
 * Multiplies together all the elements of a list.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Math
 * @sig [Number] -> Number
 * @param {Array} list An array of numbers
 * @return {Number} The product of all the numbers in the list.
 * @see R.reduce
 * @example
 *
 *      R.product([2,4,6,8,100,1]); //=> 38400
 */


var product = /*#__PURE__*/reduce(multiply, 1);
module.exports = product;

/***/ }),

/***/ "./node_modules/ramda/src/project.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/src/project.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _map = /*#__PURE__*/__webpack_require__(/*! ./internal/_map */ "./node_modules/ramda/src/internal/_map.js");

var identity = /*#__PURE__*/__webpack_require__(/*! ./identity */ "./node_modules/ramda/src/identity.js");

var pickAll = /*#__PURE__*/__webpack_require__(/*! ./pickAll */ "./node_modules/ramda/src/pickAll.js");

var useWith = /*#__PURE__*/__webpack_require__(/*! ./useWith */ "./node_modules/ramda/src/useWith.js");
/**
 * Reasonable analog to SQL `select` statement.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @category Relation
 * @sig [k] -> [{k: v}] -> [{k: v}]
 * @param {Array} props The property names to project
 * @param {Array} objs The objects to query
 * @return {Array} An array of objects with just the `props` properties.
 * @example
 *
 *      const abby = {name: 'Abby', age: 7, hair: 'blond', grade: 2};
 *      const fred = {name: 'Fred', age: 12, hair: 'brown', grade: 7};
 *      const kids = [abby, fred];
 *      R.project(['name', 'grade'], kids); //=> [{name: 'Abby', grade: 2}, {name: 'Fred', grade: 7}]
 */


var project = /*#__PURE__*/useWith(_map, [pickAll, identity]); // passing `identity` gives correct arity

module.exports = project;

/***/ }),

/***/ "./node_modules/ramda/src/prop.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/src/prop.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");

var path = /*#__PURE__*/__webpack_require__(/*! ./path */ "./node_modules/ramda/src/path.js");
/**
 * Returns a function that when supplied an object returns the indicated
 * property of that object, if it exists.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @typedefn Idx = String | Int
 * @sig Idx -> {s: a} -> a | Undefined
 * @param {String|Number} p The property name or array index
 * @param {Object} obj The object to query
 * @return {*} The value at `obj.p`.
 * @see R.path, R.nth
 * @example
 *
 *      R.prop('x', {x: 100}); //=> 100
 *      R.prop('x', {}); //=> undefined
 *      R.prop(0, [100]); //=> 100
 *      R.compose(R.inc, R.prop('x'))({ x: 3 }) //=> 4
 */


var prop = /*#__PURE__*/_curry2(function prop(p, obj) {
  return path([p], obj);
});

module.exports = prop;

/***/ }),

/***/ "./node_modules/ramda/src/propEq.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/src/propEq.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry3 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry3 */ "./node_modules/ramda/src/internal/_curry3.js");

var equals = /*#__PURE__*/__webpack_require__(/*! ./equals */ "./node_modules/ramda/src/equals.js");
/**
 * Returns `true` if the specified object property is equal, in
 * [`R.equals`](#equals) terms, to the given value; `false` otherwise.
 * You can test multiple properties with [`R.whereEq`](#whereEq).
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig String -> a -> Object -> Boolean
 * @param {String} name
 * @param {*} val
 * @param {*} obj
 * @return {Boolean}
 * @see R.whereEq, R.propSatisfies, R.equals
 * @example
 *
 *      const abby = {name: 'Abby', age: 7, hair: 'blond'};
 *      const fred = {name: 'Fred', age: 12, hair: 'brown'};
 *      const rusty = {name: 'Rusty', age: 10, hair: 'brown'};
 *      const alois = {name: 'Alois', age: 15, disposition: 'surly'};
 *      const kids = [abby, fred, rusty, alois];
 *      const hasBrownHair = R.propEq('hair', 'brown');
 *      R.filter(hasBrownHair, kids); //=> [fred, rusty]
 */


var propEq = /*#__PURE__*/_curry3(function propEq(name, val, obj) {
  return equals(val, obj[name]);
});

module.exports = propEq;

/***/ }),

/***/ "./node_modules/ramda/src/propIs.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/src/propIs.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry3 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry3 */ "./node_modules/ramda/src/internal/_curry3.js");

var is = /*#__PURE__*/__webpack_require__(/*! ./is */ "./node_modules/ramda/src/is.js");
/**
 * Returns `true` if the specified object property is of the given type;
 * `false` otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category Type
 * @sig Type -> String -> Object -> Boolean
 * @param {Function} type
 * @param {String} name
 * @param {*} obj
 * @return {Boolean}
 * @see R.is, R.propSatisfies
 * @example
 *
 *      R.propIs(Number, 'x', {x: 1, y: 2});  //=> true
 *      R.propIs(Number, 'x', {x: 'foo'});    //=> false
 *      R.propIs(Number, 'x', {});            //=> false
 */


var propIs = /*#__PURE__*/_curry3(function propIs(type, name, obj) {
  return is(type, obj[name]);
});

module.exports = propIs;

/***/ }),

/***/ "./node_modules/ramda/src/propOr.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/src/propOr.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry3 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry3 */ "./node_modules/ramda/src/internal/_curry3.js");

var pathOr = /*#__PURE__*/__webpack_require__(/*! ./pathOr */ "./node_modules/ramda/src/pathOr.js");
/**
 * If the given, non-null object has an own property with the specified name,
 * returns the value of that property. Otherwise returns the provided default
 * value.
 *
 * @func
 * @memberOf R
 * @since v0.6.0
 * @category Object
 * @sig a -> String -> Object -> a
 * @param {*} val The default value.
 * @param {String} p The name of the property to return.
 * @param {Object} obj The object to query.
 * @return {*} The value of given property of the supplied object or the default value.
 * @example
 *
 *      const alice = {
 *        name: 'ALICE',
 *        age: 101
 *      };
 *      const favorite = R.prop('favoriteLibrary');
 *      const favoriteWithDefault = R.propOr('Ramda', 'favoriteLibrary');
 *
 *      favorite(alice);  //=> undefined
 *      favoriteWithDefault(alice);  //=> 'Ramda'
 */


var propOr = /*#__PURE__*/_curry3(function propOr(val, p, obj) {
  return pathOr(val, [p], obj);
});

module.exports = propOr;

/***/ }),

/***/ "./node_modules/ramda/src/propSatisfies.js":
/*!*************************************************!*\
  !*** ./node_modules/ramda/src/propSatisfies.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry3 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry3 */ "./node_modules/ramda/src/internal/_curry3.js");
/**
 * Returns `true` if the specified object property satisfies the given
 * predicate; `false` otherwise. You can test multiple properties with
 * [`R.where`](#where).
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category Logic
 * @sig (a -> Boolean) -> String -> {String: a} -> Boolean
 * @param {Function} pred
 * @param {String} name
 * @param {*} obj
 * @return {Boolean}
 * @see R.where, R.propEq, R.propIs
 * @example
 *
 *      R.propSatisfies(x => x > 0, 'x', {x: 1, y: 2}); //=> true
 */


var propSatisfies = /*#__PURE__*/_curry3(function propSatisfies(pred, name, obj) {
  return pred(obj[name]);
});

module.exports = propSatisfies;

/***/ }),

/***/ "./node_modules/ramda/src/props.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/src/props.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");

var path = /*#__PURE__*/__webpack_require__(/*! ./path */ "./node_modules/ramda/src/path.js");
/**
 * Acts as multiple `prop`: array of keys in, array of values out. Preserves
 * order.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig [k] -> {k: v} -> [v]
 * @param {Array} ps The property names to fetch
 * @param {Object} obj The object to query
 * @return {Array} The corresponding values or partially applied function.
 * @example
 *
 *      R.props(['x', 'y'], {x: 1, y: 2}); //=> [1, 2]
 *      R.props(['c', 'a', 'b'], {b: 2, a: 1}); //=> [undefined, 1, 2]
 *
 *      const fullName = R.compose(R.join(' '), R.props(['first', 'last']));
 *      fullName({last: 'Bullet-Tooth', age: 33, first: 'Tony'}); //=> 'Tony Bullet-Tooth'
 */


var props = /*#__PURE__*/_curry2(function props(ps, obj) {
  return ps.map(function (p) {
    return path([p], obj);
  });
});

module.exports = props;

/***/ }),

/***/ "./node_modules/ramda/src/range.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/src/range.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");

var _isNumber = /*#__PURE__*/__webpack_require__(/*! ./internal/_isNumber */ "./node_modules/ramda/src/internal/_isNumber.js");
/**
 * Returns a list of numbers from `from` (inclusive) to `to` (exclusive).
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Number -> Number -> [Number]
 * @param {Number} from The first number in the list.
 * @param {Number} to One more than the last number in the list.
 * @return {Array} The list of numbers in the set `[a, b)`.
 * @example
 *
 *      R.range(1, 5);    //=> [1, 2, 3, 4]
 *      R.range(50, 53);  //=> [50, 51, 52]
 */


var range = /*#__PURE__*/_curry2(function range(from, to) {
  if (!(_isNumber(from) && _isNumber(to))) {
    throw new TypeError('Both arguments to range must be numbers');
  }

  var result = [];
  var n = from;

  while (n < to) {
    result.push(n);
    n += 1;
  }

  return result;
});

module.exports = range;

/***/ }),

/***/ "./node_modules/ramda/src/reduce.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/src/reduce.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry3 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry3 */ "./node_modules/ramda/src/internal/_curry3.js");

var _reduce = /*#__PURE__*/__webpack_require__(/*! ./internal/_reduce */ "./node_modules/ramda/src/internal/_reduce.js");
/**
 * Returns a single item by iterating through the list, successively calling
 * the iterator function and passing it an accumulator value and the current
 * value from the array, and then passing the result to the next call.
 *
 * The iterator function receives two values: *(acc, value)*. It may use
 * [`R.reduced`](#reduced) to shortcut the iteration.
 *
 * The arguments' order of [`reduceRight`](#reduceRight)'s iterator function
 * is *(value, acc)*.
 *
 * Note: `R.reduce` does not skip deleted or unassigned indices (sparse
 * arrays), unlike the native `Array.prototype.reduce` method. For more details
 * on this behavior, see:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce#Description
 *
 * Dispatches to the `reduce` method of the third argument, if present. When
 * doing so, it is up to the user to handle the [`R.reduced`](#reduced)
 * shortcuting, as this is not implemented by `reduce`.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig ((a, b) -> a) -> a -> [b] -> a
 * @param {Function} fn The iterator function. Receives two values, the accumulator and the
 *        current element from the array.
 * @param {*} acc The accumulator value.
 * @param {Array} list The list to iterate over.
 * @return {*} The final, accumulated value.
 * @see R.reduced, R.addIndex, R.reduceRight
 * @example
 *
 *      R.reduce(R.subtract, 0, [1, 2, 3, 4]) // => ((((0 - 1) - 2) - 3) - 4) = -10
 *      //          -               -10
 *      //         / \              / \
 *      //        -   4           -6   4
 *      //       / \              / \
 *      //      -   3   ==>     -3   3
 *      //     / \              / \
 *      //    -   2           -1   2
 *      //   / \              / \
 *      //  0   1            0   1
 *
 * @symb R.reduce(f, a, [b, c, d]) = f(f(f(a, b), c), d)
 */


var reduce = /*#__PURE__*/_curry3(_reduce);

module.exports = reduce;

/***/ }),

/***/ "./node_modules/ramda/src/reduceBy.js":
/*!********************************************!*\
  !*** ./node_modules/ramda/src/reduceBy.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _clone = /*#__PURE__*/__webpack_require__(/*! ./internal/_clone */ "./node_modules/ramda/src/internal/_clone.js");

var _curryN = /*#__PURE__*/__webpack_require__(/*! ./internal/_curryN */ "./node_modules/ramda/src/internal/_curryN.js");

var _dispatchable = /*#__PURE__*/__webpack_require__(/*! ./internal/_dispatchable */ "./node_modules/ramda/src/internal/_dispatchable.js");

var _has = /*#__PURE__*/__webpack_require__(/*! ./internal/_has */ "./node_modules/ramda/src/internal/_has.js");

var _reduce = /*#__PURE__*/__webpack_require__(/*! ./internal/_reduce */ "./node_modules/ramda/src/internal/_reduce.js");

var _xreduceBy = /*#__PURE__*/__webpack_require__(/*! ./internal/_xreduceBy */ "./node_modules/ramda/src/internal/_xreduceBy.js");
/**
 * Groups the elements of the list according to the result of calling
 * the String-returning function `keyFn` on each element and reduces the elements
 * of each group to a single value via the reducer function `valueFn`.
 *
 * This function is basically a more general [`groupBy`](#groupBy) function.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.20.0
 * @category List
 * @sig ((a, b) -> a) -> a -> (b -> String) -> [b] -> {String: a}
 * @param {Function} valueFn The function that reduces the elements of each group to a single
 *        value. Receives two values, accumulator for a particular group and the current element.
 * @param {*} acc The (initial) accumulator value for each group.
 * @param {Function} keyFn The function that maps the list's element into a key.
 * @param {Array} list The array to group.
 * @return {Object} An object with the output of `keyFn` for keys, mapped to the output of
 *         `valueFn` for elements which produced that key when passed to `keyFn`.
 * @see R.groupBy, R.reduce
 * @example
 *
 *      const groupNames = (acc, {name}) => acc.concat(name)
 *      const toGrade = ({score}) =>
 *        score < 65 ? 'F' :
 *        score < 70 ? 'D' :
 *        score < 80 ? 'C' :
 *        score < 90 ? 'B' : 'A'
 *
 *      var students = [
 *        {name: 'Abby', score: 83},
 *        {name: 'Bart', score: 62},
 *        {name: 'Curt', score: 88},
 *        {name: 'Dora', score: 92},
 *      ]
 *
 *      reduceBy(groupNames, [], toGrade, students)
 *      //=> {"A": ["Dora"], "B": ["Abby", "Curt"], "F": ["Bart"]}
 */


var reduceBy = /*#__PURE__*/_curryN(4, [], /*#__PURE__*/_dispatchable([], _xreduceBy, function reduceBy(valueFn, valueAcc, keyFn, list) {
  return _reduce(function (acc, elt) {
    var key = keyFn(elt);
    acc[key] = valueFn(_has(key, acc) ? acc[key] : _clone(valueAcc, [], [], false), elt);
    return acc;
  }, {}, list);
}));

module.exports = reduceBy;

/***/ }),

/***/ "./node_modules/ramda/src/reduceRight.js":
/*!***********************************************!*\
  !*** ./node_modules/ramda/src/reduceRight.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry3 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry3 */ "./node_modules/ramda/src/internal/_curry3.js");
/**
 * Returns a single item by iterating through the list, successively calling
 * the iterator function and passing it an accumulator value and the current
 * value from the array, and then passing the result to the next call.
 *
 * Similar to [`reduce`](#reduce), except moves through the input list from the
 * right to the left.
 *
 * The iterator function receives two values: *(value, acc)*, while the arguments'
 * order of `reduce`'s iterator function is *(acc, value)*.
 *
 * Note: `R.reduceRight` does not skip deleted or unassigned indices (sparse
 * arrays), unlike the native `Array.prototype.reduceRight` method. For more details
 * on this behavior, see:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduceRight#Description
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig ((a, b) -> b) -> b -> [a] -> b
 * @param {Function} fn The iterator function. Receives two values, the current element from the array
 *        and the accumulator.
 * @param {*} acc The accumulator value.
 * @param {Array} list The list to iterate over.
 * @return {*} The final, accumulated value.
 * @see R.reduce, R.addIndex
 * @example
 *
 *      R.reduceRight(R.subtract, 0, [1, 2, 3, 4]) // => (1 - (2 - (3 - (4 - 0)))) = -2
 *      //    -               -2
 *      //   / \              / \
 *      //  1   -            1   3
 *      //     / \              / \
 *      //    2   -     ==>    2  -1
 *      //       / \              / \
 *      //      3   -            3   4
 *      //         / \              / \
 *      //        4   0            4   0
 *
 * @symb R.reduceRight(f, a, [b, c, d]) = f(b, f(c, f(d, a)))
 */


var reduceRight = /*#__PURE__*/_curry3(function reduceRight(fn, acc, list) {
  var idx = list.length - 1;

  while (idx >= 0) {
    acc = fn(list[idx], acc);
    idx -= 1;
  }

  return acc;
});

module.exports = reduceRight;

/***/ }),

/***/ "./node_modules/ramda/src/reduceWhile.js":
/*!***********************************************!*\
  !*** ./node_modules/ramda/src/reduceWhile.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curryN = /*#__PURE__*/__webpack_require__(/*! ./internal/_curryN */ "./node_modules/ramda/src/internal/_curryN.js");

var _reduce = /*#__PURE__*/__webpack_require__(/*! ./internal/_reduce */ "./node_modules/ramda/src/internal/_reduce.js");

var _reduced = /*#__PURE__*/__webpack_require__(/*! ./internal/_reduced */ "./node_modules/ramda/src/internal/_reduced.js");
/**
 * Like [`reduce`](#reduce), `reduceWhile` returns a single item by iterating
 * through the list, successively calling the iterator function. `reduceWhile`
 * also takes a predicate that is evaluated before each step. If the predicate
 * returns `false`, it "short-circuits" the iteration and returns the current
 * value of the accumulator.
 *
 * @func
 * @memberOf R
 * @since v0.22.0
 * @category List
 * @sig ((a, b) -> Boolean) -> ((a, b) -> a) -> a -> [b] -> a
 * @param {Function} pred The predicate. It is passed the accumulator and the
 *        current element.
 * @param {Function} fn The iterator function. Receives two values, the
 *        accumulator and the current element.
 * @param {*} a The accumulator value.
 * @param {Array} list The list to iterate over.
 * @return {*} The final, accumulated value.
 * @see R.reduce, R.reduced
 * @example
 *
 *      const isOdd = (acc, x) => x % 2 === 1;
 *      const xs = [1, 3, 5, 60, 777, 800];
 *      R.reduceWhile(isOdd, R.add, 0, xs); //=> 9
 *
 *      const ys = [2, 4, 6]
 *      R.reduceWhile(isOdd, R.add, 111, ys); //=> 111
 */


var reduceWhile = /*#__PURE__*/_curryN(4, [], function _reduceWhile(pred, fn, a, list) {
  return _reduce(function (acc, x) {
    return pred(acc, x) ? fn(acc, x) : _reduced(acc);
  }, a, list);
});

module.exports = reduceWhile;

/***/ }),

/***/ "./node_modules/ramda/src/reduced.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/src/reduced.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry1 */ "./node_modules/ramda/src/internal/_curry1.js");

var _reduced = /*#__PURE__*/__webpack_require__(/*! ./internal/_reduced */ "./node_modules/ramda/src/internal/_reduced.js");
/**
 * Returns a value wrapped to indicate that it is the final value of the reduce
 * and transduce functions. The returned value should be considered a black
 * box: the internal structure is not guaranteed to be stable.
 *
 * Note: this optimization is only available to the below functions:
 * - [`reduce`](#reduce)
 * - [`reduceWhile`](#reduceWhile)
 * - [`transduce`](#transduce)
 *
 * @func
 * @memberOf R
 * @since v0.15.0
 * @category List
 * @sig a -> *
 * @param {*} x The final value of the reduce.
 * @return {*} The wrapped value.
 * @see R.reduce, R.reduceWhile, R.transduce
 * @example
 *
 *     R.reduce(
 *       (acc, item) => item > 3 ? R.reduced(acc) : acc.concat(item),
 *       [],
 *       [1, 2, 3, 4, 5]) // [1, 2, 3]
 */


var reduced = /*#__PURE__*/_curry1(_reduced);

module.exports = reduced;

/***/ }),

/***/ "./node_modules/ramda/src/reject.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/src/reject.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _complement = /*#__PURE__*/__webpack_require__(/*! ./internal/_complement */ "./node_modules/ramda/src/internal/_complement.js");

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");

var filter = /*#__PURE__*/__webpack_require__(/*! ./filter */ "./node_modules/ramda/src/filter.js");
/**
 * The complement of [`filter`](#filter).
 *
 * Acts as a transducer if a transformer is given in list position. Filterable
 * objects include plain objects or any object that has a filter method such
 * as `Array`.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Filterable f => (a -> Boolean) -> f a -> f a
 * @param {Function} pred
 * @param {Array} filterable
 * @return {Array}
 * @see R.filter, R.transduce, R.addIndex
 * @example
 *
 *      const isOdd = (n) => n % 2 === 1;
 *
 *      R.reject(isOdd, [1, 2, 3, 4]); //=> [2, 4]
 *
 *      R.reject(isOdd, {a: 1, b: 2, c: 3, d: 4}); //=> {b: 2, d: 4}
 */


var reject = /*#__PURE__*/_curry2(function reject(pred, filterable) {
  return filter(_complement(pred), filterable);
});

module.exports = reject;

/***/ }),

/***/ "./node_modules/ramda/src/remove.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/src/remove.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry3 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry3 */ "./node_modules/ramda/src/internal/_curry3.js");
/**
 * Removes the sub-list of `list` starting at index `start` and containing
 * `count` elements. _Note that this is not destructive_: it returns a copy of
 * the list with the changes.
 * <small>No lists have been harmed in the application of this function.</small>
 *
 * @func
 * @memberOf R
 * @since v0.2.2
 * @category List
 * @sig Number -> Number -> [a] -> [a]
 * @param {Number} start The position to start removing elements
 * @param {Number} count The number of elements to remove
 * @param {Array} list The list to remove from
 * @return {Array} A new Array with `count` elements from `start` removed.
 * @see R.without
 * @example
 *
 *      R.remove(2, 3, [1,2,3,4,5,6,7,8]); //=> [1,2,6,7,8]
 */


var remove = /*#__PURE__*/_curry3(function remove(start, count, list) {
  var result = Array.prototype.slice.call(list, 0);
  result.splice(start, count);
  return result;
});

module.exports = remove;

/***/ }),

/***/ "./node_modules/ramda/src/repeat.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/src/repeat.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");

var always = /*#__PURE__*/__webpack_require__(/*! ./always */ "./node_modules/ramda/src/always.js");

var times = /*#__PURE__*/__webpack_require__(/*! ./times */ "./node_modules/ramda/src/times.js");
/**
 * Returns a fixed list of size `n` containing a specified identical value.
 *
 * @func
 * @memberOf R
 * @since v0.1.1
 * @category List
 * @sig a -> n -> [a]
 * @param {*} value The value to repeat.
 * @param {Number} n The desired size of the output list.
 * @return {Array} A new array containing `n` `value`s.
 * @see R.times
 * @example
 *
 *      R.repeat('hi', 5); //=> ['hi', 'hi', 'hi', 'hi', 'hi']
 *
 *      const obj = {};
 *      const repeatedObjs = R.repeat(obj, 5); //=> [{}, {}, {}, {}, {}]
 *      repeatedObjs[0] === repeatedObjs[1]; //=> true
 * @symb R.repeat(a, 0) = []
 * @symb R.repeat(a, 1) = [a]
 * @symb R.repeat(a, 2) = [a, a]
 */


var repeat = /*#__PURE__*/_curry2(function repeat(value, n) {
  return times(always(value), n);
});

module.exports = repeat;

/***/ }),

/***/ "./node_modules/ramda/src/replace.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/src/replace.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry3 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry3 */ "./node_modules/ramda/src/internal/_curry3.js");
/**
 * Replace a substring or regex match in a string with a replacement.
 *
 * The first two parameters correspond to the parameters of the
 * `String.prototype.replace()` function, so the second parameter can also be a
 * function.
 *
 * @func
 * @memberOf R
 * @since v0.7.0
 * @category String
 * @sig RegExp|String -> String -> String -> String
 * @param {RegExp|String} pattern A regular expression or a substring to match.
 * @param {String} replacement The string to replace the matches with.
 * @param {String} str The String to do the search and replacement in.
 * @return {String} The result.
 * @example
 *
 *      R.replace('foo', 'bar', 'foo foo foo'); //=> 'bar foo foo'
 *      R.replace(/foo/, 'bar', 'foo foo foo'); //=> 'bar foo foo'
 *
 *      // Use the "g" (global) flag to replace all occurrences:
 *      R.replace(/foo/g, 'bar', 'foo foo foo'); //=> 'bar bar bar'
 */


var replace = /*#__PURE__*/_curry3(function replace(regex, replacement, str) {
  return str.replace(regex, replacement);
});

module.exports = replace;

/***/ }),

/***/ "./node_modules/ramda/src/reverse.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/src/reverse.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry1 */ "./node_modules/ramda/src/internal/_curry1.js");

var _isString = /*#__PURE__*/__webpack_require__(/*! ./internal/_isString */ "./node_modules/ramda/src/internal/_isString.js");
/**
 * Returns a new list or string with the elements or characters in reverse
 * order.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [a]
 * @sig String -> String
 * @param {Array|String} list
 * @return {Array|String}
 * @example
 *
 *      R.reverse([1, 2, 3]);  //=> [3, 2, 1]
 *      R.reverse([1, 2]);     //=> [2, 1]
 *      R.reverse([1]);        //=> [1]
 *      R.reverse([]);         //=> []
 *
 *      R.reverse('abc');      //=> 'cba'
 *      R.reverse('ab');       //=> 'ba'
 *      R.reverse('a');        //=> 'a'
 *      R.reverse('');         //=> ''
 */


var reverse = /*#__PURE__*/_curry1(function reverse(list) {
  return _isString(list) ? list.split('').reverse().join('') : Array.prototype.slice.call(list, 0).reverse();
});

module.exports = reverse;

/***/ }),

/***/ "./node_modules/ramda/src/scan.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/src/scan.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry3 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry3 */ "./node_modules/ramda/src/internal/_curry3.js");
/**
 * Scan is similar to [`reduce`](#reduce), but returns a list of successively
 * reduced values from the left
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category List
 * @sig ((a, b) -> a) -> a -> [b] -> [a]
 * @param {Function} fn The iterator function. Receives two values, the accumulator and the
 *        current element from the array
 * @param {*} acc The accumulator value.
 * @param {Array} list The list to iterate over.
 * @return {Array} A list of all intermediately reduced values.
 * @see R.reduce, R.mapAccum
 * @example
 *
 *      const numbers = [1, 2, 3, 4];
 *      const factorials = R.scan(R.multiply, 1, numbers); //=> [1, 1, 2, 6, 24]
 * @symb R.scan(f, a, [b, c]) = [a, f(a, b), f(f(a, b), c)]
 */


var scan = /*#__PURE__*/_curry3(function scan(fn, acc, list) {
  var idx = 0;
  var len = list.length;
  var result = [acc];

  while (idx < len) {
    acc = fn(acc, list[idx]);
    result[idx + 1] = acc;
    idx += 1;
  }

  return result;
});

module.exports = scan;

/***/ }),

/***/ "./node_modules/ramda/src/sequence.js":
/*!********************************************!*\
  !*** ./node_modules/ramda/src/sequence.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");

var ap = /*#__PURE__*/__webpack_require__(/*! ./ap */ "./node_modules/ramda/src/ap.js");

var map = /*#__PURE__*/__webpack_require__(/*! ./map */ "./node_modules/ramda/src/map.js");

var prepend = /*#__PURE__*/__webpack_require__(/*! ./prepend */ "./node_modules/ramda/src/prepend.js");

var reduceRight = /*#__PURE__*/__webpack_require__(/*! ./reduceRight */ "./node_modules/ramda/src/reduceRight.js");
/**
 * Transforms a [Traversable](https://github.com/fantasyland/fantasy-land#traversable)
 * of [Applicative](https://github.com/fantasyland/fantasy-land#applicative) into an
 * Applicative of Traversable.
 *
 * Dispatches to the `sequence` method of the second argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category List
 * @sig (Applicative f, Traversable t) => (a -> f a) -> t (f a) -> f (t a)
 * @param {Function} of
 * @param {*} traversable
 * @return {*}
 * @see R.traverse
 * @example
 *
 *      R.sequence(Maybe.of, [Just(1), Just(2), Just(3)]);   //=> Just([1, 2, 3])
 *      R.sequence(Maybe.of, [Just(1), Just(2), Nothing()]); //=> Nothing()
 *
 *      R.sequence(R.of, Just([1, 2, 3])); //=> [Just(1), Just(2), Just(3)]
 *      R.sequence(R.of, Nothing());       //=> [Nothing()]
 */


var sequence = /*#__PURE__*/_curry2(function sequence(of, traversable) {
  return typeof traversable.sequence === 'function' ? traversable.sequence(of) : reduceRight(function (x, acc) {
    return ap(map(prepend, x), acc);
  }, of([]), traversable);
});

module.exports = sequence;

/***/ }),

/***/ "./node_modules/ramda/src/set.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/src/set.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry3 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry3 */ "./node_modules/ramda/src/internal/_curry3.js");

var always = /*#__PURE__*/__webpack_require__(/*! ./always */ "./node_modules/ramda/src/always.js");

var over = /*#__PURE__*/__webpack_require__(/*! ./over */ "./node_modules/ramda/src/over.js");
/**
 * Returns the result of "setting" the portion of the given data structure
 * focused by the given lens to the given value.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category Object
 * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
 * @sig Lens s a -> a -> s -> s
 * @param {Lens} lens
 * @param {*} v
 * @param {*} x
 * @return {*}
 * @see R.prop, R.lensIndex, R.lensProp
 * @example
 *
 *      const xLens = R.lensProp('x');
 *
 *      R.set(xLens, 4, {x: 1, y: 2});  //=> {x: 4, y: 2}
 *      R.set(xLens, 8, {x: 1, y: 2});  //=> {x: 8, y: 2}
 */


var set = /*#__PURE__*/_curry3(function set(lens, v, x) {
  return over(lens, always(v), x);
});

module.exports = set;

/***/ }),

/***/ "./node_modules/ramda/src/slice.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/src/slice.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _checkForMethod = /*#__PURE__*/__webpack_require__(/*! ./internal/_checkForMethod */ "./node_modules/ramda/src/internal/_checkForMethod.js");

var _curry3 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry3 */ "./node_modules/ramda/src/internal/_curry3.js");
/**
 * Returns the elements of the given list or string (or object with a `slice`
 * method) from `fromIndex` (inclusive) to `toIndex` (exclusive).
 *
 * Dispatches to the `slice` method of the third argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.1.4
 * @category List
 * @sig Number -> Number -> [a] -> [a]
 * @sig Number -> Number -> String -> String
 * @param {Number} fromIndex The start index (inclusive).
 * @param {Number} toIndex The end index (exclusive).
 * @param {*} list
 * @return {*}
 * @example
 *
 *      R.slice(1, 3, ['a', 'b', 'c', 'd']);        //=> ['b', 'c']
 *      R.slice(1, Infinity, ['a', 'b', 'c', 'd']); //=> ['b', 'c', 'd']
 *      R.slice(0, -1, ['a', 'b', 'c', 'd']);       //=> ['a', 'b', 'c']
 *      R.slice(-3, -1, ['a', 'b', 'c', 'd']);      //=> ['b', 'c']
 *      R.slice(0, 3, 'ramda');                     //=> 'ram'
 */


var slice = /*#__PURE__*/_curry3( /*#__PURE__*/_checkForMethod('slice', function slice(fromIndex, toIndex, list) {
  return Array.prototype.slice.call(list, fromIndex, toIndex);
}));

module.exports = slice;

/***/ }),

/***/ "./node_modules/ramda/src/sort.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/src/sort.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");
/**
 * Returns a copy of the list, sorted according to the comparator function,
 * which should accept two values at a time and return a negative number if the
 * first value is smaller, a positive number if it's larger, and zero if they
 * are equal. Please note that this is a **copy** of the list. It does not
 * modify the original.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig ((a, a) -> Number) -> [a] -> [a]
 * @param {Function} comparator A sorting function :: a -> b -> Int
 * @param {Array} list The list to sort
 * @return {Array} a new array with its elements sorted by the comparator function.
 * @example
 *
 *      const diff = function(a, b) { return a - b; };
 *      R.sort(diff, [4,2,7,5]); //=> [2, 4, 5, 7]
 */


var sort = /*#__PURE__*/_curry2(function sort(comparator, list) {
  return Array.prototype.slice.call(list, 0).sort(comparator);
});

module.exports = sort;

/***/ }),

/***/ "./node_modules/ramda/src/sortBy.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/src/sortBy.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");
/**
 * Sorts the list according to the supplied function.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig Ord b => (a -> b) -> [a] -> [a]
 * @param {Function} fn
 * @param {Array} list The list to sort.
 * @return {Array} A new list sorted by the keys generated by `fn`.
 * @example
 *
 *      const sortByFirstItem = R.sortBy(R.prop(0));
 *      const pairs = [[-1, 1], [-2, 2], [-3, 3]];
 *      sortByFirstItem(pairs); //=> [[-3, 3], [-2, 2], [-1, 1]]
 *
 *      const sortByNameCaseInsensitive = R.sortBy(R.compose(R.toLower, R.prop('name')));
 *      const alice = {
 *        name: 'ALICE',
 *        age: 101
 *      };
 *      const bob = {
 *        name: 'Bob',
 *        age: -10
 *      };
 *      const clara = {
 *        name: 'clara',
 *        age: 314.159
 *      };
 *      const people = [clara, bob, alice];
 *      sortByNameCaseInsensitive(people); //=> [alice, bob, clara]
 */


var sortBy = /*#__PURE__*/_curry2(function sortBy(fn, list) {
  return Array.prototype.slice.call(list, 0).sort(function (a, b) {
    var aa = fn(a);
    var bb = fn(b);
    return aa < bb ? -1 : aa > bb ? 1 : 0;
  });
});

module.exports = sortBy;

/***/ }),

/***/ "./node_modules/ramda/src/sortWith.js":
/*!********************************************!*\
  !*** ./node_modules/ramda/src/sortWith.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");
/**
 * Sorts a list according to a list of comparators.
 *
 * @func
 * @memberOf R
 * @since v0.23.0
 * @category Relation
 * @sig [(a, a) -> Number] -> [a] -> [a]
 * @param {Array} functions A list of comparator functions.
 * @param {Array} list The list to sort.
 * @return {Array} A new list sorted according to the comarator functions.
 * @example
 *
 *      const alice = {
 *        name: 'alice',
 *        age: 40
 *      };
 *      const bob = {
 *        name: 'bob',
 *        age: 30
 *      };
 *      const clara = {
 *        name: 'clara',
 *        age: 40
 *      };
 *      const people = [clara, bob, alice];
 *      const ageNameSort = R.sortWith([
 *        R.descend(R.prop('age')),
 *        R.ascend(R.prop('name'))
 *      ]);
 *      ageNameSort(people); //=> [alice, clara, bob]
 */


var sortWith = /*#__PURE__*/_curry2(function sortWith(fns, list) {
  return Array.prototype.slice.call(list, 0).sort(function (a, b) {
    var result = 0;
    var i = 0;

    while (result === 0 && i < fns.length) {
      result = fns[i](a, b);
      i += 1;
    }

    return result;
  });
});

module.exports = sortWith;

/***/ }),

/***/ "./node_modules/ramda/src/split.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/src/split.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var invoker = /*#__PURE__*/__webpack_require__(/*! ./invoker */ "./node_modules/ramda/src/invoker.js");
/**
 * Splits a string into an array of strings based on the given
 * separator.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category String
 * @sig (String | RegExp) -> String -> [String]
 * @param {String|RegExp} sep The pattern.
 * @param {String} str The string to separate into an array.
 * @return {Array} The array of strings from `str` separated by `sep`.
 * @see R.join
 * @example
 *
 *      const pathComponents = R.split('/');
 *      R.tail(pathComponents('/usr/local/bin/node')); //=> ['usr', 'local', 'bin', 'node']
 *
 *      R.split('.', 'a.b.c.xyz.d'); //=> ['a', 'b', 'c', 'xyz', 'd']
 */


var split = /*#__PURE__*/invoker(1, 'split');
module.exports = split;

/***/ }),

/***/ "./node_modules/ramda/src/splitAt.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/src/splitAt.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");

var length = /*#__PURE__*/__webpack_require__(/*! ./length */ "./node_modules/ramda/src/length.js");

var slice = /*#__PURE__*/__webpack_require__(/*! ./slice */ "./node_modules/ramda/src/slice.js");
/**
 * Splits a given list or string at a given index.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category List
 * @sig Number -> [a] -> [[a], [a]]
 * @sig Number -> String -> [String, String]
 * @param {Number} index The index where the array/string is split.
 * @param {Array|String} array The array/string to be split.
 * @return {Array}
 * @example
 *
 *      R.splitAt(1, [1, 2, 3]);          //=> [[1], [2, 3]]
 *      R.splitAt(5, 'hello world');      //=> ['hello', ' world']
 *      R.splitAt(-1, 'foobar');          //=> ['fooba', 'r']
 */


var splitAt = /*#__PURE__*/_curry2(function splitAt(index, array) {
  return [slice(0, index, array), slice(index, length(array), array)];
});

module.exports = splitAt;

/***/ }),

/***/ "./node_modules/ramda/src/splitEvery.js":
/*!**********************************************!*\
  !*** ./node_modules/ramda/src/splitEvery.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");

var slice = /*#__PURE__*/__webpack_require__(/*! ./slice */ "./node_modules/ramda/src/slice.js");
/**
 * Splits a collection into slices of the specified length.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category List
 * @sig Number -> [a] -> [[a]]
 * @sig Number -> String -> [String]
 * @param {Number} n
 * @param {Array} list
 * @return {Array}
 * @example
 *
 *      R.splitEvery(3, [1, 2, 3, 4, 5, 6, 7]); //=> [[1, 2, 3], [4, 5, 6], [7]]
 *      R.splitEvery(3, 'foobarbaz'); //=> ['foo', 'bar', 'baz']
 */


var splitEvery = /*#__PURE__*/_curry2(function splitEvery(n, list) {
  if (n <= 0) {
    throw new Error('First argument to splitEvery must be a positive integer');
  }

  var result = [];
  var idx = 0;

  while (idx < list.length) {
    result.push(slice(idx, idx += n, list));
  }

  return result;
});

module.exports = splitEvery;

/***/ }),

/***/ "./node_modules/ramda/src/splitWhen.js":
/*!*********************************************!*\
  !*** ./node_modules/ramda/src/splitWhen.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");
/**
 * Takes a list and a predicate and returns a pair of lists with the following properties:
 *
 *  - the result of concatenating the two output lists is equivalent to the input list;
 *  - none of the elements of the first output list satisfies the predicate; and
 *  - if the second output list is non-empty, its first element satisfies the predicate.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> [[a], [a]]
 * @param {Function} pred The predicate that determines where the array is split.
 * @param {Array} list The array to be split.
 * @return {Array}
 * @example
 *
 *      R.splitWhen(R.equals(2), [1, 2, 3, 1, 2, 3]);   //=> [[1], [2, 3, 1, 2, 3]]
 */


var splitWhen = /*#__PURE__*/_curry2(function splitWhen(pred, list) {
  var idx = 0;
  var len = list.length;
  var prefix = [];

  while (idx < len && !pred(list[idx])) {
    prefix.push(list[idx]);
    idx += 1;
  }

  return [prefix, Array.prototype.slice.call(list, idx)];
});

module.exports = splitWhen;

/***/ }),

/***/ "./node_modules/ramda/src/startsWith.js":
/*!**********************************************!*\
  !*** ./node_modules/ramda/src/startsWith.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");

var equals = /*#__PURE__*/__webpack_require__(/*! ./equals */ "./node_modules/ramda/src/equals.js");

var take = /*#__PURE__*/__webpack_require__(/*! ./take */ "./node_modules/ramda/src/take.js");
/**
 * Checks if a list starts with the provided sublist.
 *
 * Similarly, checks if a string starts with the provided substring.
 *
 * @func
 * @memberOf R
 * @since v0.24.0
 * @category List
 * @sig [a] -> [a] -> Boolean
 * @sig String -> String -> Boolean
 * @param {*} prefix
 * @param {*} list
 * @return {Boolean}
 * @see R.endsWith
 * @example
 *
 *      R.startsWith('a', 'abc')                //=> true
 *      R.startsWith('b', 'abc')                //=> false
 *      R.startsWith(['a'], ['a', 'b', 'c'])    //=> true
 *      R.startsWith(['b'], ['a', 'b', 'c'])    //=> false
 */


var startsWith = /*#__PURE__*/_curry2(function (prefix, list) {
  return equals(take(prefix.length, list), prefix);
});

module.exports = startsWith;

/***/ }),

/***/ "./node_modules/ramda/src/subtract.js":
/*!********************************************!*\
  !*** ./node_modules/ramda/src/subtract.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");
/**
 * Subtracts its second argument from its first argument.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Math
 * @sig Number -> Number -> Number
 * @param {Number} a The first value.
 * @param {Number} b The second value.
 * @return {Number} The result of `a - b`.
 * @see R.add
 * @example
 *
 *      R.subtract(10, 8); //=> 2
 *
 *      const minus5 = R.subtract(R.__, 5);
 *      minus5(17); //=> 12
 *
 *      const complementaryAngle = R.subtract(90);
 *      complementaryAngle(30); //=> 60
 *      complementaryAngle(72); //=> 18
 */


var subtract = /*#__PURE__*/_curry2(function subtract(a, b) {
  return Number(a) - Number(b);
});

module.exports = subtract;

/***/ }),

/***/ "./node_modules/ramda/src/sum.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/src/sum.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var add = /*#__PURE__*/__webpack_require__(/*! ./add */ "./node_modules/ramda/src/add.js");

var reduce = /*#__PURE__*/__webpack_require__(/*! ./reduce */ "./node_modules/ramda/src/reduce.js");
/**
 * Adds together all the elements of a list.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Math
 * @sig [Number] -> Number
 * @param {Array} list An array of numbers
 * @return {Number} The sum of all the numbers in the list.
 * @see R.reduce
 * @example
 *
 *      R.sum([2,4,6,8,100,1]); //=> 121
 */


var sum = /*#__PURE__*/reduce(add, 0);
module.exports = sum;

/***/ }),

/***/ "./node_modules/ramda/src/symmetricDifference.js":
/*!*******************************************************!*\
  !*** ./node_modules/ramda/src/symmetricDifference.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");

var concat = /*#__PURE__*/__webpack_require__(/*! ./concat */ "./node_modules/ramda/src/concat.js");

var difference = /*#__PURE__*/__webpack_require__(/*! ./difference */ "./node_modules/ramda/src/difference.js");
/**
 * Finds the set (i.e. no duplicates) of all elements contained in the first or
 * second list, but not both.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category Relation
 * @sig [*] -> [*] -> [*]
 * @param {Array} list1 The first list.
 * @param {Array} list2 The second list.
 * @return {Array} The elements in `list1` or `list2`, but not both.
 * @see R.symmetricDifferenceWith, R.difference, R.differenceWith
 * @example
 *
 *      R.symmetricDifference([1,2,3,4], [7,6,5,4,3]); //=> [1,2,7,6,5]
 *      R.symmetricDifference([7,6,5,4,3], [1,2,3,4]); //=> [7,6,5,1,2]
 */


var symmetricDifference = /*#__PURE__*/_curry2(function symmetricDifference(list1, list2) {
  return concat(difference(list1, list2), difference(list2, list1));
});

module.exports = symmetricDifference;

/***/ }),

/***/ "./node_modules/ramda/src/symmetricDifferenceWith.js":
/*!***********************************************************!*\
  !*** ./node_modules/ramda/src/symmetricDifferenceWith.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry3 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry3 */ "./node_modules/ramda/src/internal/_curry3.js");

var concat = /*#__PURE__*/__webpack_require__(/*! ./concat */ "./node_modules/ramda/src/concat.js");

var differenceWith = /*#__PURE__*/__webpack_require__(/*! ./differenceWith */ "./node_modules/ramda/src/differenceWith.js");
/**
 * Finds the set (i.e. no duplicates) of all elements contained in the first or
 * second list, but not both. Duplication is determined according to the value
 * returned by applying the supplied predicate to two list elements.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category Relation
 * @sig ((a, a) -> Boolean) -> [a] -> [a] -> [a]
 * @param {Function} pred A predicate used to test whether two items are equal.
 * @param {Array} list1 The first list.
 * @param {Array} list2 The second list.
 * @return {Array} The elements in `list1` or `list2`, but not both.
 * @see R.symmetricDifference, R.difference, R.differenceWith
 * @example
 *
 *      const eqA = R.eqBy(R.prop('a'));
 *      const l1 = [{a: 1}, {a: 2}, {a: 3}, {a: 4}];
 *      const l2 = [{a: 3}, {a: 4}, {a: 5}, {a: 6}];
 *      R.symmetricDifferenceWith(eqA, l1, l2); //=> [{a: 1}, {a: 2}, {a: 5}, {a: 6}]
 */


var symmetricDifferenceWith = /*#__PURE__*/_curry3(function symmetricDifferenceWith(pred, list1, list2) {
  return concat(differenceWith(pred, list1, list2), differenceWith(pred, list2, list1));
});

module.exports = symmetricDifferenceWith;

/***/ }),

/***/ "./node_modules/ramda/src/tail.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/src/tail.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _checkForMethod = /*#__PURE__*/__webpack_require__(/*! ./internal/_checkForMethod */ "./node_modules/ramda/src/internal/_checkForMethod.js");

var _curry1 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry1 */ "./node_modules/ramda/src/internal/_curry1.js");

var slice = /*#__PURE__*/__webpack_require__(/*! ./slice */ "./node_modules/ramda/src/slice.js");
/**
 * Returns all but the first element of the given list or string (or object
 * with a `tail` method).
 *
 * Dispatches to the `slice` method of the first argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [a]
 * @sig String -> String
 * @param {*} list
 * @return {*}
 * @see R.head, R.init, R.last
 * @example
 *
 *      R.tail([1, 2, 3]);  //=> [2, 3]
 *      R.tail([1, 2]);     //=> [2]
 *      R.tail([1]);        //=> []
 *      R.tail([]);         //=> []
 *
 *      R.tail('abc');  //=> 'bc'
 *      R.tail('ab');   //=> 'b'
 *      R.tail('a');    //=> ''
 *      R.tail('');     //=> ''
 */


var tail = /*#__PURE__*/_curry1( /*#__PURE__*/_checkForMethod('tail', /*#__PURE__*/slice(1, Infinity)));

module.exports = tail;

/***/ }),

/***/ "./node_modules/ramda/src/take.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/src/take.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");

var _dispatchable = /*#__PURE__*/__webpack_require__(/*! ./internal/_dispatchable */ "./node_modules/ramda/src/internal/_dispatchable.js");

var _xtake = /*#__PURE__*/__webpack_require__(/*! ./internal/_xtake */ "./node_modules/ramda/src/internal/_xtake.js");

var slice = /*#__PURE__*/__webpack_require__(/*! ./slice */ "./node_modules/ramda/src/slice.js");
/**
 * Returns the first `n` elements of the given list, string, or
 * transducer/transformer (or object with a `take` method).
 *
 * Dispatches to the `take` method of the second argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Number -> [a] -> [a]
 * @sig Number -> String -> String
 * @param {Number} n
 * @param {*} list
 * @return {*}
 * @see R.drop
 * @example
 *
 *      R.take(1, ['foo', 'bar', 'baz']); //=> ['foo']
 *      R.take(2, ['foo', 'bar', 'baz']); //=> ['foo', 'bar']
 *      R.take(3, ['foo', 'bar', 'baz']); //=> ['foo', 'bar', 'baz']
 *      R.take(4, ['foo', 'bar', 'baz']); //=> ['foo', 'bar', 'baz']
 *      R.take(3, 'ramda');               //=> 'ram'
 *
 *      const personnel = [
 *        'Dave Brubeck',
 *        'Paul Desmond',
 *        'Eugene Wright',
 *        'Joe Morello',
 *        'Gerry Mulligan',
 *        'Bob Bates',
 *        'Joe Dodge',
 *        'Ron Crotty'
 *      ];
 *
 *      const takeFive = R.take(5);
 *      takeFive(personnel);
 *      //=> ['Dave Brubeck', 'Paul Desmond', 'Eugene Wright', 'Joe Morello', 'Gerry Mulligan']
 * @symb R.take(-1, [a, b]) = [a, b]
 * @symb R.take(0, [a, b]) = []
 * @symb R.take(1, [a, b]) = [a]
 * @symb R.take(2, [a, b]) = [a, b]
 */


var take = /*#__PURE__*/_curry2( /*#__PURE__*/_dispatchable(['take'], _xtake, function take(n, xs) {
  return slice(0, n < 0 ? Infinity : n, xs);
}));

module.exports = take;

/***/ }),

/***/ "./node_modules/ramda/src/takeLast.js":
/*!********************************************!*\
  !*** ./node_modules/ramda/src/takeLast.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");

var drop = /*#__PURE__*/__webpack_require__(/*! ./drop */ "./node_modules/ramda/src/drop.js");
/**
 * Returns a new list containing the last `n` elements of the given list.
 * If `n > list.length`, returns a list of `list.length` elements.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category List
 * @sig Number -> [a] -> [a]
 * @sig Number -> String -> String
 * @param {Number} n The number of elements to return.
 * @param {Array} xs The collection to consider.
 * @return {Array}
 * @see R.dropLast
 * @example
 *
 *      R.takeLast(1, ['foo', 'bar', 'baz']); //=> ['baz']
 *      R.takeLast(2, ['foo', 'bar', 'baz']); //=> ['bar', 'baz']
 *      R.takeLast(3, ['foo', 'bar', 'baz']); //=> ['foo', 'bar', 'baz']
 *      R.takeLast(4, ['foo', 'bar', 'baz']); //=> ['foo', 'bar', 'baz']
 *      R.takeLast(3, 'ramda');               //=> 'mda'
 */


var takeLast = /*#__PURE__*/_curry2(function takeLast(n, xs) {
  return drop(n >= 0 ? xs.length - n : 0, xs);
});

module.exports = takeLast;

/***/ }),

/***/ "./node_modules/ramda/src/takeLastWhile.js":
/*!*************************************************!*\
  !*** ./node_modules/ramda/src/takeLastWhile.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");

var slice = /*#__PURE__*/__webpack_require__(/*! ./slice */ "./node_modules/ramda/src/slice.js");
/**
 * Returns a new list containing the last `n` elements of a given list, passing
 * each value to the supplied predicate function, and terminating when the
 * predicate function returns `false`. Excludes the element that caused the
 * predicate function to fail. The predicate function is passed one argument:
 * *(value)*.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> [a]
 * @sig (a -> Boolean) -> String -> String
 * @param {Function} fn The function called per iteration.
 * @param {Array} xs The collection to iterate over.
 * @return {Array} A new array.
 * @see R.dropLastWhile, R.addIndex
 * @example
 *
 *      const isNotOne = x => x !== 1;
 *
 *      R.takeLastWhile(isNotOne, [1, 2, 3, 4]); //=> [2, 3, 4]
 *
 *      R.takeLastWhile(x => x !== 'R' , 'Ramda'); //=> 'amda'
 */


var takeLastWhile = /*#__PURE__*/_curry2(function takeLastWhile(fn, xs) {
  var idx = xs.length - 1;

  while (idx >= 0 && fn(xs[idx])) {
    idx -= 1;
  }

  return slice(idx + 1, Infinity, xs);
});

module.exports = takeLastWhile;

/***/ }),

/***/ "./node_modules/ramda/src/takeWhile.js":
/*!*********************************************!*\
  !*** ./node_modules/ramda/src/takeWhile.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");

var _dispatchable = /*#__PURE__*/__webpack_require__(/*! ./internal/_dispatchable */ "./node_modules/ramda/src/internal/_dispatchable.js");

var _xtakeWhile = /*#__PURE__*/__webpack_require__(/*! ./internal/_xtakeWhile */ "./node_modules/ramda/src/internal/_xtakeWhile.js");

var slice = /*#__PURE__*/__webpack_require__(/*! ./slice */ "./node_modules/ramda/src/slice.js");
/**
 * Returns a new list containing the first `n` elements of a given list,
 * passing each value to the supplied predicate function, and terminating when
 * the predicate function returns `false`. Excludes the element that caused the
 * predicate function to fail. The predicate function is passed one argument:
 * *(value)*.
 *
 * Dispatches to the `takeWhile` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> [a]
 * @sig (a -> Boolean) -> String -> String
 * @param {Function} fn The function called per iteration.
 * @param {Array} xs The collection to iterate over.
 * @return {Array} A new array.
 * @see R.dropWhile, R.transduce, R.addIndex
 * @example
 *
 *      const isNotFour = x => x !== 4;
 *
 *      R.takeWhile(isNotFour, [1, 2, 3, 4, 3, 2, 1]); //=> [1, 2, 3]
 *
 *      R.takeWhile(x => x !== 'd' , 'Ramda'); //=> 'Ram'
 */


var takeWhile = /*#__PURE__*/_curry2( /*#__PURE__*/_dispatchable(['takeWhile'], _xtakeWhile, function takeWhile(fn, xs) {
  var idx = 0;
  var len = xs.length;

  while (idx < len && fn(xs[idx])) {
    idx += 1;
  }

  return slice(0, idx, xs);
}));

module.exports = takeWhile;

/***/ }),

/***/ "./node_modules/ramda/src/tap.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/src/tap.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");

var _dispatchable = /*#__PURE__*/__webpack_require__(/*! ./internal/_dispatchable */ "./node_modules/ramda/src/internal/_dispatchable.js");

var _xtap = /*#__PURE__*/__webpack_require__(/*! ./internal/_xtap */ "./node_modules/ramda/src/internal/_xtap.js");
/**
 * Runs the given function with the supplied object, then returns the object.
 *
 * Acts as a transducer if a transformer is given as second parameter.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig (a -> *) -> a -> a
 * @param {Function} fn The function to call with `x`. The return value of `fn` will be thrown away.
 * @param {*} x
 * @return {*} `x`.
 * @example
 *
 *      const sayX = x => console.log('x is ' + x);
 *      R.tap(sayX, 100); //=> 100
 *      // logs 'x is 100'
 * @symb R.tap(f, a) = a
 */


var tap = /*#__PURE__*/_curry2( /*#__PURE__*/_dispatchable([], _xtap, function tap(fn, x) {
  fn(x);
  return x;
}));

module.exports = tap;

/***/ }),

/***/ "./node_modules/ramda/src/test.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/src/test.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _cloneRegExp = /*#__PURE__*/__webpack_require__(/*! ./internal/_cloneRegExp */ "./node_modules/ramda/src/internal/_cloneRegExp.js");

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");

var _isRegExp = /*#__PURE__*/__webpack_require__(/*! ./internal/_isRegExp */ "./node_modules/ramda/src/internal/_isRegExp.js");

var toString = /*#__PURE__*/__webpack_require__(/*! ./toString */ "./node_modules/ramda/src/toString.js");
/**
 * Determines whether a given string matches a given regular expression.
 *
 * @func
 * @memberOf R
 * @since v0.12.0
 * @category String
 * @sig RegExp -> String -> Boolean
 * @param {RegExp} pattern
 * @param {String} str
 * @return {Boolean}
 * @see R.match
 * @example
 *
 *      R.test(/^x/, 'xyz'); //=> true
 *      R.test(/^y/, 'xyz'); //=> false
 */


var test = /*#__PURE__*/_curry2(function test(pattern, str) {
  if (!_isRegExp(pattern)) {
    throw new TypeError('‘test’ requires a value of type RegExp as its first argument; received ' + toString(pattern));
  }

  return _cloneRegExp(pattern).test(str);
});

module.exports = test;

/***/ }),

/***/ "./node_modules/ramda/src/thunkify.js":
/*!********************************************!*\
  !*** ./node_modules/ramda/src/thunkify.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var curryN = /*#__PURE__*/__webpack_require__(/*! ./curryN */ "./node_modules/ramda/src/curryN.js");

var _curry1 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry1 */ "./node_modules/ramda/src/internal/_curry1.js");
/**
 * Creates a thunk out of a function. A thunk delays a calculation until
 * its result is needed, providing lazy evaluation of arguments.
 *
 * @func
 * @memberOf R
 * @since v0.26.0
 * @category Function
 * @sig ((a, b, ..., j) -> k) -> (a, b, ..., j) -> (() -> k)
 * @param {Function} fn A function to wrap in a thunk
 * @return {Function} Expects arguments for `fn` and returns a new function
 *  that, when called, applies those arguments to `fn`.
 * @see R.partial, R.partialRight
 * @example
 *
 *      R.thunkify(R.identity)(42)(); //=> 42
 *      R.thunkify((a, b) => a + b)(25, 17)(); //=> 42
 */


var thunkify = /*#__PURE__*/_curry1(function thunkify(fn) {
  return curryN(fn.length, function createThunk() {
    var fnArgs = arguments;
    return function invokeThunk() {
      return fn.apply(this, fnArgs);
    };
  });
});

module.exports = thunkify;

/***/ }),

/***/ "./node_modules/ramda/src/times.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/src/times.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");
/**
 * Calls an input function `n` times, returning an array containing the results
 * of those function calls.
 *
 * `fn` is passed one argument: The current value of `n`, which begins at `0`
 * and is gradually incremented to `n - 1`.
 *
 * @func
 * @memberOf R
 * @since v0.2.3
 * @category List
 * @sig (Number -> a) -> Number -> [a]
 * @param {Function} fn The function to invoke. Passed one argument, the current value of `n`.
 * @param {Number} n A value between `0` and `n - 1`. Increments after each function call.
 * @return {Array} An array containing the return values of all calls to `fn`.
 * @see R.repeat
 * @example
 *
 *      R.times(R.identity, 5); //=> [0, 1, 2, 3, 4]
 * @symb R.times(f, 0) = []
 * @symb R.times(f, 1) = [f(0)]
 * @symb R.times(f, 2) = [f(0), f(1)]
 */


var times = /*#__PURE__*/_curry2(function times(fn, n) {
  var len = Number(n);
  var idx = 0;
  var list;

  if (len < 0 || isNaN(len)) {
    throw new RangeError('n must be a non-negative number');
  }

  list = new Array(len);

  while (idx < len) {
    list[idx] = fn(idx);
    idx += 1;
  }

  return list;
});

module.exports = times;

/***/ }),

/***/ "./node_modules/ramda/src/toLower.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/src/toLower.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var invoker = /*#__PURE__*/__webpack_require__(/*! ./invoker */ "./node_modules/ramda/src/invoker.js");
/**
 * The lower case version of a string.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category String
 * @sig String -> String
 * @param {String} str The string to lower case.
 * @return {String} The lower case version of `str`.
 * @see R.toUpper
 * @example
 *
 *      R.toLower('XYZ'); //=> 'xyz'
 */


var toLower = /*#__PURE__*/invoker(0, 'toLowerCase');
module.exports = toLower;

/***/ }),

/***/ "./node_modules/ramda/src/toPairs.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/src/toPairs.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry1 */ "./node_modules/ramda/src/internal/_curry1.js");

var _has = /*#__PURE__*/__webpack_require__(/*! ./internal/_has */ "./node_modules/ramda/src/internal/_has.js");
/**
 * Converts an object into an array of key, value arrays. Only the object's
 * own properties are used.
 * Note that the order of the output array is not guaranteed to be consistent
 * across different JS platforms.
 *
 * @func
 * @memberOf R
 * @since v0.4.0
 * @category Object
 * @sig {String: *} -> [[String,*]]
 * @param {Object} obj The object to extract from
 * @return {Array} An array of key, value arrays from the object's own properties.
 * @see R.fromPairs
 * @example
 *
 *      R.toPairs({a: 1, b: 2, c: 3}); //=> [['a', 1], ['b', 2], ['c', 3]]
 */


var toPairs = /*#__PURE__*/_curry1(function toPairs(obj) {
  var pairs = [];

  for (var prop in obj) {
    if (_has(prop, obj)) {
      pairs[pairs.length] = [prop, obj[prop]];
    }
  }

  return pairs;
});

module.exports = toPairs;

/***/ }),

/***/ "./node_modules/ramda/src/toPairsIn.js":
/*!*********************************************!*\
  !*** ./node_modules/ramda/src/toPairsIn.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry1 */ "./node_modules/ramda/src/internal/_curry1.js");
/**
 * Converts an object into an array of key, value arrays. The object's own
 * properties and prototype properties are used. Note that the order of the
 * output array is not guaranteed to be consistent across different JS
 * platforms.
 *
 * @func
 * @memberOf R
 * @since v0.4.0
 * @category Object
 * @sig {String: *} -> [[String,*]]
 * @param {Object} obj The object to extract from
 * @return {Array} An array of key, value arrays from the object's own
 *         and prototype properties.
 * @example
 *
 *      const F = function() { this.x = 'X'; };
 *      F.prototype.y = 'Y';
 *      const f = new F();
 *      R.toPairsIn(f); //=> [['x','X'], ['y','Y']]
 */


var toPairsIn = /*#__PURE__*/_curry1(function toPairsIn(obj) {
  var pairs = [];

  for (var prop in obj) {
    pairs[pairs.length] = [prop, obj[prop]];
  }

  return pairs;
});

module.exports = toPairsIn;

/***/ }),

/***/ "./node_modules/ramda/src/toString.js":
/*!********************************************!*\
  !*** ./node_modules/ramda/src/toString.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry1 */ "./node_modules/ramda/src/internal/_curry1.js");

var _toString = /*#__PURE__*/__webpack_require__(/*! ./internal/_toString */ "./node_modules/ramda/src/internal/_toString.js");
/**
 * Returns the string representation of the given value. `eval`'ing the output
 * should result in a value equivalent to the input value. Many of the built-in
 * `toString` methods do not satisfy this requirement.
 *
 * If the given value is an `[object Object]` with a `toString` method other
 * than `Object.prototype.toString`, this method is invoked with no arguments
 * to produce the return value. This means user-defined constructor functions
 * can provide a suitable `toString` method. For example:
 *
 *     function Point(x, y) {
 *       this.x = x;
 *       this.y = y;
 *     }
 *
 *     Point.prototype.toString = function() {
 *       return 'new Point(' + this.x + ', ' + this.y + ')';
 *     };
 *
 *     R.toString(new Point(1, 2)); //=> 'new Point(1, 2)'
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category String
 * @sig * -> String
 * @param {*} val
 * @return {String}
 * @example
 *
 *      R.toString(42); //=> '42'
 *      R.toString('abc'); //=> '"abc"'
 *      R.toString([1, 2, 3]); //=> '[1, 2, 3]'
 *      R.toString({foo: 1, bar: 2, baz: 3}); //=> '{"bar": 2, "baz": 3, "foo": 1}'
 *      R.toString(new Date('2001-02-03T04:05:06Z')); //=> 'new Date("2001-02-03T04:05:06.000Z")'
 */


var toString = /*#__PURE__*/_curry1(function toString(val) {
  return _toString(val, []);
});

module.exports = toString;

/***/ }),

/***/ "./node_modules/ramda/src/toUpper.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/src/toUpper.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var invoker = /*#__PURE__*/__webpack_require__(/*! ./invoker */ "./node_modules/ramda/src/invoker.js");
/**
 * The upper case version of a string.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category String
 * @sig String -> String
 * @param {String} str The string to upper case.
 * @return {String} The upper case version of `str`.
 * @see R.toLower
 * @example
 *
 *      R.toUpper('abc'); //=> 'ABC'
 */


var toUpper = /*#__PURE__*/invoker(0, 'toUpperCase');
module.exports = toUpper;

/***/ }),

/***/ "./node_modules/ramda/src/transduce.js":
/*!*********************************************!*\
  !*** ./node_modules/ramda/src/transduce.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _reduce = /*#__PURE__*/__webpack_require__(/*! ./internal/_reduce */ "./node_modules/ramda/src/internal/_reduce.js");

var _xwrap = /*#__PURE__*/__webpack_require__(/*! ./internal/_xwrap */ "./node_modules/ramda/src/internal/_xwrap.js");

var curryN = /*#__PURE__*/__webpack_require__(/*! ./curryN */ "./node_modules/ramda/src/curryN.js");
/**
 * Initializes a transducer using supplied iterator function. Returns a single
 * item by iterating through the list, successively calling the transformed
 * iterator function and passing it an accumulator value and the current value
 * from the array, and then passing the result to the next call.
 *
 * The iterator function receives two values: *(acc, value)*. It will be
 * wrapped as a transformer to initialize the transducer. A transformer can be
 * passed directly in place of an iterator function. In both cases, iteration
 * may be stopped early with the [`R.reduced`](#reduced) function.
 *
 * A transducer is a function that accepts a transformer and returns a
 * transformer and can be composed directly.
 *
 * A transformer is an an object that provides a 2-arity reducing iterator
 * function, step, 0-arity initial value function, init, and 1-arity result
 * extraction function, result. The step function is used as the iterator
 * function in reduce. The result function is used to convert the final
 * accumulator into the return type and in most cases is
 * [`R.identity`](#identity). The init function can be used to provide an
 * initial accumulator, but is ignored by transduce.
 *
 * The iteration is performed with [`R.reduce`](#reduce) after initializing the transducer.
 *
 * @func
 * @memberOf R
 * @since v0.12.0
 * @category List
 * @sig (c -> c) -> ((a, b) -> a) -> a -> [b] -> a
 * @param {Function} xf The transducer function. Receives a transformer and returns a transformer.
 * @param {Function} fn The iterator function. Receives two values, the accumulator and the
 *        current element from the array. Wrapped as transformer, if necessary, and used to
 *        initialize the transducer
 * @param {*} acc The initial accumulator value.
 * @param {Array} list The list to iterate over.
 * @return {*} The final, accumulated value.
 * @see R.reduce, R.reduced, R.into
 * @example
 *
 *      const numbers = [1, 2, 3, 4];
 *      const transducer = R.compose(R.map(R.add(1)), R.take(2));
 *      R.transduce(transducer, R.flip(R.append), [], numbers); //=> [2, 3]
 *
 *      const isOdd = (x) => x % 2 === 1;
 *      const firstOddTransducer = R.compose(R.filter(isOdd), R.take(1));
 *      R.transduce(firstOddTransducer, R.flip(R.append), [], R.range(0, 100)); //=> [1]
 */


var transduce = /*#__PURE__*/curryN(4, function transduce(xf, fn, acc, list) {
  return _reduce(xf(typeof fn === 'function' ? _xwrap(fn) : fn), acc, list);
});
module.exports = transduce;

/***/ }),

/***/ "./node_modules/ramda/src/transpose.js":
/*!*********************************************!*\
  !*** ./node_modules/ramda/src/transpose.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry1 */ "./node_modules/ramda/src/internal/_curry1.js");
/**
 * Transposes the rows and columns of a 2D list.
 * When passed a list of `n` lists of length `x`,
 * returns a list of `x` lists of length `n`.
 *
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category List
 * @sig [[a]] -> [[a]]
 * @param {Array} list A 2D list
 * @return {Array} A 2D list
 * @example
 *
 *      R.transpose([[1, 'a'], [2, 'b'], [3, 'c']]) //=> [[1, 2, 3], ['a', 'b', 'c']]
 *      R.transpose([[1, 2, 3], ['a', 'b', 'c']]) //=> [[1, 'a'], [2, 'b'], [3, 'c']]
 *
 *      // If some of the rows are shorter than the following rows, their elements are skipped:
 *      R.transpose([[10, 11], [20], [], [30, 31, 32]]) //=> [[10, 20, 30], [11, 31], [32]]
 * @symb R.transpose([[a], [b], [c]]) = [a, b, c]
 * @symb R.transpose([[a, b], [c, d]]) = [[a, c], [b, d]]
 * @symb R.transpose([[a, b], [c]]) = [[a, c], [b]]
 */


var transpose = /*#__PURE__*/_curry1(function transpose(outerlist) {
  var i = 0;
  var result = [];

  while (i < outerlist.length) {
    var innerlist = outerlist[i];
    var j = 0;

    while (j < innerlist.length) {
      if (typeof result[j] === 'undefined') {
        result[j] = [];
      }

      result[j].push(innerlist[j]);
      j += 1;
    }

    i += 1;
  }

  return result;
});

module.exports = transpose;

/***/ }),

/***/ "./node_modules/ramda/src/traverse.js":
/*!********************************************!*\
  !*** ./node_modules/ramda/src/traverse.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry3 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry3 */ "./node_modules/ramda/src/internal/_curry3.js");

var map = /*#__PURE__*/__webpack_require__(/*! ./map */ "./node_modules/ramda/src/map.js");

var sequence = /*#__PURE__*/__webpack_require__(/*! ./sequence */ "./node_modules/ramda/src/sequence.js");
/**
 * Maps an [Applicative](https://github.com/fantasyland/fantasy-land#applicative)-returning
 * function over a [Traversable](https://github.com/fantasyland/fantasy-land#traversable),
 * then uses [`sequence`](#sequence) to transform the resulting Traversable of Applicative
 * into an Applicative of Traversable.
 *
 * Dispatches to the `traverse` method of the third argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category List
 * @sig (Applicative f, Traversable t) => (a -> f a) -> (a -> f b) -> t a -> f (t b)
 * @param {Function} of
 * @param {Function} f
 * @param {*} traversable
 * @return {*}
 * @see R.sequence
 * @example
 *
 *      // Returns `Maybe.Nothing` if the given divisor is `0`
 *      const safeDiv = n => d => d === 0 ? Maybe.Nothing() : Maybe.Just(n / d)
 *
 *      R.traverse(Maybe.of, safeDiv(10), [2, 4, 5]); //=> Maybe.Just([5, 2.5, 2])
 *      R.traverse(Maybe.of, safeDiv(10), [2, 0, 5]); //=> Maybe.Nothing
 */


var traverse = /*#__PURE__*/_curry3(function traverse(of, f, traversable) {
  return typeof traversable['fantasy-land/traverse'] === 'function' ? traversable['fantasy-land/traverse'](f, of) : sequence(of, map(f, traversable));
});

module.exports = traverse;

/***/ }),

/***/ "./node_modules/ramda/src/trim.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/src/trim.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry1 */ "./node_modules/ramda/src/internal/_curry1.js");

var ws = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' + '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028' + '\u2029\uFEFF';
var zeroWidth = '\u200b';
var hasProtoTrim = typeof String.prototype.trim === 'function';
/**
 * Removes (strips) whitespace from both ends of the string.
 *
 * @func
 * @memberOf R
 * @since v0.6.0
 * @category String
 * @sig String -> String
 * @param {String} str The string to trim.
 * @return {String} Trimmed version of `str`.
 * @example
 *
 *      R.trim('   xyz  '); //=> 'xyz'
 *      R.map(R.trim, R.split(',', 'x, y, z')); //=> ['x', 'y', 'z']
 */

var trim = !hasProtoTrim || /*#__PURE__*/ws.trim() || ! /*#__PURE__*/zeroWidth.trim() ? /*#__PURE__*/_curry1(function trim(str) {
  var beginRx = new RegExp('^[' + ws + '][' + ws + ']*');
  var endRx = new RegExp('[' + ws + '][' + ws + ']*$');
  return str.replace(beginRx, '').replace(endRx, '');
}) : /*#__PURE__*/_curry1(function trim(str) {
  return str.trim();
});
module.exports = trim;

/***/ }),

/***/ "./node_modules/ramda/src/tryCatch.js":
/*!********************************************!*\
  !*** ./node_modules/ramda/src/tryCatch.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _arity = /*#__PURE__*/__webpack_require__(/*! ./internal/_arity */ "./node_modules/ramda/src/internal/_arity.js");

var _concat = /*#__PURE__*/__webpack_require__(/*! ./internal/_concat */ "./node_modules/ramda/src/internal/_concat.js");

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");
/**
 * `tryCatch` takes two functions, a `tryer` and a `catcher`. The returned
 * function evaluates the `tryer`; if it does not throw, it simply returns the
 * result. If the `tryer` *does* throw, the returned function evaluates the
 * `catcher` function and returns its result. Note that for effective
 * composition with this function, both the `tryer` and `catcher` functions
 * must return the same type of results.
 *
 * @func
 * @memberOf R
 * @since v0.20.0
 * @category Function
 * @sig (...x -> a) -> ((e, ...x) -> a) -> (...x -> a)
 * @param {Function} tryer The function that may throw.
 * @param {Function} catcher The function that will be evaluated if `tryer` throws.
 * @return {Function} A new function that will catch exceptions and send then to the catcher.
 * @example
 *
 *      R.tryCatch(R.prop('x'), R.F)({x: true}); //=> true
 *      R.tryCatch(() => { throw 'foo'}, R.always('catched'))('bar') // => 'catched'
 *      R.tryCatch(R.times(R.identity), R.always([]))('s') // => []
 *      R.tryCatch(() => { throw 'this is not a valid value'}, (err, value)=>({error : err,  value }))('bar') // => {'error': 'this is not a valid value', 'value': 'bar'}
 */


var tryCatch = /*#__PURE__*/_curry2(function _tryCatch(tryer, catcher) {
  return _arity(tryer.length, function () {
    try {
      return tryer.apply(this, arguments);
    } catch (e) {
      return catcher.apply(this, _concat([e], arguments));
    }
  });
});

module.exports = tryCatch;

/***/ }),

/***/ "./node_modules/ramda/src/type.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/src/type.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry1 */ "./node_modules/ramda/src/internal/_curry1.js");
/**
 * Gives a single-word string description of the (native) type of a value,
 * returning such answers as 'Object', 'Number', 'Array', or 'Null'. Does not
 * attempt to distinguish user Object types any further, reporting them all as
 * 'Object'.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Type
 * @sig (* -> {*}) -> String
 * @param {*} val The value to test
 * @return {String}
 * @example
 *
 *      R.type({}); //=> "Object"
 *      R.type(1); //=> "Number"
 *      R.type(false); //=> "Boolean"
 *      R.type('s'); //=> "String"
 *      R.type(null); //=> "Null"
 *      R.type([]); //=> "Array"
 *      R.type(/[A-z]/); //=> "RegExp"
 *      R.type(() => {}); //=> "Function"
 *      R.type(undefined); //=> "Undefined"
 */


var type = /*#__PURE__*/_curry1(function type(val) {
  return val === null ? 'Null' : val === undefined ? 'Undefined' : Object.prototype.toString.call(val).slice(8, -1);
});

module.exports = type;

/***/ }),

/***/ "./node_modules/ramda/src/unapply.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/src/unapply.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry1 */ "./node_modules/ramda/src/internal/_curry1.js");
/**
 * Takes a function `fn`, which takes a single array argument, and returns a
 * function which:
 *
 *   - takes any number of positional arguments;
 *   - passes these arguments to `fn` as an array; and
 *   - returns the result.
 *
 * In other words, `R.unapply` derives a variadic function from a function which
 * takes an array. `R.unapply` is the inverse of [`R.apply`](#apply).
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Function
 * @sig ([*...] -> a) -> (*... -> a)
 * @param {Function} fn
 * @return {Function}
 * @see R.apply
 * @example
 *
 *      R.unapply(JSON.stringify)(1, 2, 3); //=> '[1,2,3]'
 * @symb R.unapply(f)(a, b) = f([a, b])
 */


var unapply = /*#__PURE__*/_curry1(function unapply(fn) {
  return function () {
    return fn(Array.prototype.slice.call(arguments, 0));
  };
});

module.exports = unapply;

/***/ }),

/***/ "./node_modules/ramda/src/unary.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/src/unary.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry1 */ "./node_modules/ramda/src/internal/_curry1.js");

var nAry = /*#__PURE__*/__webpack_require__(/*! ./nAry */ "./node_modules/ramda/src/nAry.js");
/**
 * Wraps a function of any arity (including nullary) in a function that accepts
 * exactly 1 parameter. Any extraneous parameters will not be passed to the
 * supplied function.
 *
 * @func
 * @memberOf R
 * @since v0.2.0
 * @category Function
 * @sig (* -> b) -> (a -> b)
 * @param {Function} fn The function to wrap.
 * @return {Function} A new function wrapping `fn`. The new function is guaranteed to be of
 *         arity 1.
 * @see R.binary, R.nAry
 * @example
 *
 *      const takesTwoArgs = function(a, b) {
 *        return [a, b];
 *      };
 *      takesTwoArgs.length; //=> 2
 *      takesTwoArgs(1, 2); //=> [1, 2]
 *
 *      const takesOneArg = R.unary(takesTwoArgs);
 *      takesOneArg.length; //=> 1
 *      // Only 1 argument is passed to the wrapped function
 *      takesOneArg(1, 2); //=> [1, undefined]
 * @symb R.unary(f)(a, b, c) = f(a)
 */


var unary = /*#__PURE__*/_curry1(function unary(fn) {
  return nAry(1, fn);
});

module.exports = unary;

/***/ }),

/***/ "./node_modules/ramda/src/uncurryN.js":
/*!********************************************!*\
  !*** ./node_modules/ramda/src/uncurryN.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");

var curryN = /*#__PURE__*/__webpack_require__(/*! ./curryN */ "./node_modules/ramda/src/curryN.js");
/**
 * Returns a function of arity `n` from a (manually) curried function.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category Function
 * @sig Number -> (a -> b) -> (a -> c)
 * @param {Number} length The arity for the returned function.
 * @param {Function} fn The function to uncurry.
 * @return {Function} A new function.
 * @see R.curry
 * @example
 *
 *      const addFour = a => b => c => d => a + b + c + d;
 *
 *      const uncurriedAddFour = R.uncurryN(4, addFour);
 *      uncurriedAddFour(1, 2, 3, 4); //=> 10
 */


var uncurryN = /*#__PURE__*/_curry2(function uncurryN(depth, fn) {
  return curryN(depth, function () {
    var currentDepth = 1;
    var value = fn;
    var idx = 0;
    var endIdx;

    while (currentDepth <= depth && typeof value === 'function') {
      endIdx = currentDepth === depth ? arguments.length : idx + value.length;
      value = value.apply(this, Array.prototype.slice.call(arguments, idx, endIdx));
      currentDepth += 1;
      idx = endIdx;
    }

    return value;
  });
});

module.exports = uncurryN;

/***/ }),

/***/ "./node_modules/ramda/src/unfold.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/src/unfold.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");
/**
 * Builds a list from a seed value. Accepts an iterator function, which returns
 * either false to stop iteration or an array of length 2 containing the value
 * to add to the resulting list and the seed to be used in the next call to the
 * iterator function.
 *
 * The iterator function receives one argument: *(seed)*.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category List
 * @sig (a -> [b]) -> * -> [b]
 * @param {Function} fn The iterator function. receives one argument, `seed`, and returns
 *        either false to quit iteration or an array of length two to proceed. The element
 *        at index 0 of this array will be added to the resulting array, and the element
 *        at index 1 will be passed to the next call to `fn`.
 * @param {*} seed The seed value.
 * @return {Array} The final list.
 * @example
 *
 *      const f = n => n > 50 ? false : [-n, n + 10];
 *      R.unfold(f, 10); //=> [-10, -20, -30, -40, -50]
 * @symb R.unfold(f, x) = [f(x)[0], f(f(x)[1])[0], f(f(f(x)[1])[1])[0], ...]
 */


var unfold = /*#__PURE__*/_curry2(function unfold(fn, seed) {
  var pair = fn(seed);
  var result = [];

  while (pair && pair.length) {
    result[result.length] = pair[0];
    pair = fn(pair[1]);
  }

  return result;
});

module.exports = unfold;

/***/ }),

/***/ "./node_modules/ramda/src/union.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/src/union.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _concat = /*#__PURE__*/__webpack_require__(/*! ./internal/_concat */ "./node_modules/ramda/src/internal/_concat.js");

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");

var compose = /*#__PURE__*/__webpack_require__(/*! ./compose */ "./node_modules/ramda/src/compose.js");

var uniq = /*#__PURE__*/__webpack_require__(/*! ./uniq */ "./node_modules/ramda/src/uniq.js");
/**
 * Combines two lists into a set (i.e. no duplicates) composed of the elements
 * of each list.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig [*] -> [*] -> [*]
 * @param {Array} as The first list.
 * @param {Array} bs The second list.
 * @return {Array} The first and second lists concatenated, with
 *         duplicates removed.
 * @example
 *
 *      R.union([1, 2, 3], [2, 3, 4]); //=> [1, 2, 3, 4]
 */


var union = /*#__PURE__*/_curry2( /*#__PURE__*/compose(uniq, _concat));

module.exports = union;

/***/ }),

/***/ "./node_modules/ramda/src/unionWith.js":
/*!*********************************************!*\
  !*** ./node_modules/ramda/src/unionWith.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _concat = /*#__PURE__*/__webpack_require__(/*! ./internal/_concat */ "./node_modules/ramda/src/internal/_concat.js");

var _curry3 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry3 */ "./node_modules/ramda/src/internal/_curry3.js");

var uniqWith = /*#__PURE__*/__webpack_require__(/*! ./uniqWith */ "./node_modules/ramda/src/uniqWith.js");
/**
 * Combines two lists into a set (i.e. no duplicates) composed of the elements
 * of each list. Duplication is determined according to the value returned by
 * applying the supplied predicate to two list elements.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig ((a, a) -> Boolean) -> [*] -> [*] -> [*]
 * @param {Function} pred A predicate used to test whether two items are equal.
 * @param {Array} list1 The first list.
 * @param {Array} list2 The second list.
 * @return {Array} The first and second lists concatenated, with
 *         duplicates removed.
 * @see R.union
 * @example
 *
 *      const l1 = [{a: 1}, {a: 2}];
 *      const l2 = [{a: 1}, {a: 4}];
 *      R.unionWith(R.eqBy(R.prop('a')), l1, l2); //=> [{a: 1}, {a: 2}, {a: 4}]
 */


var unionWith = /*#__PURE__*/_curry3(function unionWith(pred, list1, list2) {
  return uniqWith(pred, _concat(list1, list2));
});

module.exports = unionWith;

/***/ }),

/***/ "./node_modules/ramda/src/uniq.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/src/uniq.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var identity = /*#__PURE__*/__webpack_require__(/*! ./identity */ "./node_modules/ramda/src/identity.js");

var uniqBy = /*#__PURE__*/__webpack_require__(/*! ./uniqBy */ "./node_modules/ramda/src/uniqBy.js");
/**
 * Returns a new list containing only one copy of each element in the original
 * list. [`R.equals`](#equals) is used to determine equality.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [a]
 * @param {Array} list The array to consider.
 * @return {Array} The list of unique items.
 * @example
 *
 *      R.uniq([1, 1, 2, 1]); //=> [1, 2]
 *      R.uniq([1, '1']);     //=> [1, '1']
 *      R.uniq([[42], [42]]); //=> [[42]]
 */


var uniq = /*#__PURE__*/uniqBy(identity);
module.exports = uniq;

/***/ }),

/***/ "./node_modules/ramda/src/uniqBy.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/src/uniqBy.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _Set = /*#__PURE__*/__webpack_require__(/*! ./internal/_Set */ "./node_modules/ramda/src/internal/_Set.js");

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");
/**
 * Returns a new list containing only one copy of each element in the original
 * list, based upon the value returned by applying the supplied function to
 * each list element. Prefers the first item if the supplied function produces
 * the same value on two items. [`R.equals`](#equals) is used for comparison.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category List
 * @sig (a -> b) -> [a] -> [a]
 * @param {Function} fn A function used to produce a value to use during comparisons.
 * @param {Array} list The array to consider.
 * @return {Array} The list of unique items.
 * @example
 *
 *      R.uniqBy(Math.abs, [-1, -5, 2, 10, 1, 2]); //=> [-1, -5, 2, 10]
 */


var uniqBy = /*#__PURE__*/_curry2(function uniqBy(fn, list) {
  var set = new _Set();
  var result = [];
  var idx = 0;
  var appliedItem, item;

  while (idx < list.length) {
    item = list[idx];
    appliedItem = fn(item);

    if (set.add(appliedItem)) {
      result.push(item);
    }

    idx += 1;
  }

  return result;
});

module.exports = uniqBy;

/***/ }),

/***/ "./node_modules/ramda/src/uniqWith.js":
/*!********************************************!*\
  !*** ./node_modules/ramda/src/uniqWith.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _includesWith = /*#__PURE__*/__webpack_require__(/*! ./internal/_includesWith */ "./node_modules/ramda/src/internal/_includesWith.js");

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");
/**
 * Returns a new list containing only one copy of each element in the original
 * list, based upon the value returned by applying the supplied predicate to
 * two list elements. Prefers the first item if two items compare equal based
 * on the predicate.
 *
 * @func
 * @memberOf R
 * @since v0.2.0
 * @category List
 * @sig ((a, a) -> Boolean) -> [a] -> [a]
 * @param {Function} pred A predicate used to test whether two items are equal.
 * @param {Array} list The array to consider.
 * @return {Array} The list of unique items.
 * @example
 *
 *      const strEq = R.eqBy(String);
 *      R.uniqWith(strEq)([1, '1', 2, 1]); //=> [1, 2]
 *      R.uniqWith(strEq)([{}, {}]);       //=> [{}]
 *      R.uniqWith(strEq)([1, '1', 1]);    //=> [1]
 *      R.uniqWith(strEq)(['1', 1, 1]);    //=> ['1']
 */


var uniqWith = /*#__PURE__*/_curry2(function uniqWith(pred, list) {
  var idx = 0;
  var len = list.length;
  var result = [];
  var item;

  while (idx < len) {
    item = list[idx];

    if (!_includesWith(pred, item, result)) {
      result[result.length] = item;
    }

    idx += 1;
  }

  return result;
});

module.exports = uniqWith;

/***/ }),

/***/ "./node_modules/ramda/src/unless.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/src/unless.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry3 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry3 */ "./node_modules/ramda/src/internal/_curry3.js");
/**
 * Tests the final argument by passing it to the given predicate function. If
 * the predicate is not satisfied, the function will return the result of
 * calling the `whenFalseFn` function with the same argument. If the predicate
 * is satisfied, the argument is returned as is.
 *
 * @func
 * @memberOf R
 * @since v0.18.0
 * @category Logic
 * @sig (a -> Boolean) -> (a -> a) -> a -> a
 * @param {Function} pred        A predicate function
 * @param {Function} whenFalseFn A function to invoke when the `pred` evaluates
 *                               to a falsy value.
 * @param {*}        x           An object to test with the `pred` function and
 *                               pass to `whenFalseFn` if necessary.
 * @return {*} Either `x` or the result of applying `x` to `whenFalseFn`.
 * @see R.ifElse, R.when, R.cond
 * @example
 *
 *      let safeInc = R.unless(R.isNil, R.inc);
 *      safeInc(null); //=> null
 *      safeInc(1); //=> 2
 */


var unless = /*#__PURE__*/_curry3(function unless(pred, whenFalseFn, x) {
  return pred(x) ? x : whenFalseFn(x);
});

module.exports = unless;

/***/ }),

/***/ "./node_modules/ramda/src/unnest.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/src/unnest.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _identity = /*#__PURE__*/__webpack_require__(/*! ./internal/_identity */ "./node_modules/ramda/src/internal/_identity.js");

var chain = /*#__PURE__*/__webpack_require__(/*! ./chain */ "./node_modules/ramda/src/chain.js");
/**
 * Shorthand for `R.chain(R.identity)`, which removes one level of nesting from
 * any [Chain](https://github.com/fantasyland/fantasy-land#chain).
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category List
 * @sig Chain c => c (c a) -> c a
 * @param {*} list
 * @return {*}
 * @see R.flatten, R.chain
 * @example
 *
 *      R.unnest([1, [2], [[3]]]); //=> [1, 2, [3]]
 *      R.unnest([[1, 2], [3, 4], [5, 6]]); //=> [1, 2, 3, 4, 5, 6]
 */


var unnest = /*#__PURE__*/chain(_identity);
module.exports = unnest;

/***/ }),

/***/ "./node_modules/ramda/src/until.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/src/until.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry3 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry3 */ "./node_modules/ramda/src/internal/_curry3.js");
/**
 * Takes a predicate, a transformation function, and an initial value,
 * and returns a value of the same type as the initial value.
 * It does so by applying the transformation until the predicate is satisfied,
 * at which point it returns the satisfactory value.
 *
 * @func
 * @memberOf R
 * @since v0.20.0
 * @category Logic
 * @sig (a -> Boolean) -> (a -> a) -> a -> a
 * @param {Function} pred A predicate function
 * @param {Function} fn The iterator function
 * @param {*} init Initial value
 * @return {*} Final value that satisfies predicate
 * @example
 *
 *      R.until(R.gt(R.__, 100), R.multiply(2))(1) // => 128
 */


var until = /*#__PURE__*/_curry3(function until(pred, fn, init) {
  var val = init;

  while (!pred(val)) {
    val = fn(val);
  }

  return val;
});

module.exports = until;

/***/ }),

/***/ "./node_modules/ramda/src/update.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/src/update.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry3 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry3 */ "./node_modules/ramda/src/internal/_curry3.js");

var adjust = /*#__PURE__*/__webpack_require__(/*! ./adjust */ "./node_modules/ramda/src/adjust.js");

var always = /*#__PURE__*/__webpack_require__(/*! ./always */ "./node_modules/ramda/src/always.js");
/**
 * Returns a new copy of the array with the element at the provided index
 * replaced with the given value.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category List
 * @sig Number -> a -> [a] -> [a]
 * @param {Number} idx The index to update.
 * @param {*} x The value to exist at the given index of the returned array.
 * @param {Array|Arguments} list The source array-like object to be updated.
 * @return {Array} A copy of `list` with the value at index `idx` replaced with `x`.
 * @see R.adjust
 * @example
 *
 *      R.update(1, '_', ['a', 'b', 'c']);      //=> ['a', '_', 'c']
 *      R.update(-1, '_', ['a', 'b', 'c']);     //=> ['a', 'b', '_']
 * @symb R.update(-1, a, [b, c]) = [b, a]
 * @symb R.update(0, a, [b, c]) = [a, c]
 * @symb R.update(1, a, [b, c]) = [b, a]
 */


var update = /*#__PURE__*/_curry3(function update(idx, x, list) {
  return adjust(idx, always(x), list);
});

module.exports = update;

/***/ }),

/***/ "./node_modules/ramda/src/useWith.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/src/useWith.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");

var curryN = /*#__PURE__*/__webpack_require__(/*! ./curryN */ "./node_modules/ramda/src/curryN.js");
/**
 * Accepts a function `fn` and a list of transformer functions and returns a
 * new curried function. When the new function is invoked, it calls the
 * function `fn` with parameters consisting of the result of calling each
 * supplied handler on successive arguments to the new function.
 *
 * If more arguments are passed to the returned function than transformer
 * functions, those arguments are passed directly to `fn` as additional
 * parameters. If you expect additional arguments that don't need to be
 * transformed, although you can ignore them, it's best to pass an identity
 * function so that the new function reports the correct arity.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig ((x1, x2, ...) -> z) -> [(a -> x1), (b -> x2), ...] -> (a -> b -> ... -> z)
 * @param {Function} fn The function to wrap.
 * @param {Array} transformers A list of transformer functions
 * @return {Function} The wrapped function.
 * @see R.converge
 * @example
 *
 *      R.useWith(Math.pow, [R.identity, R.identity])(3, 4); //=> 81
 *      R.useWith(Math.pow, [R.identity, R.identity])(3)(4); //=> 81
 *      R.useWith(Math.pow, [R.dec, R.inc])(3, 4); //=> 32
 *      R.useWith(Math.pow, [R.dec, R.inc])(3)(4); //=> 32
 * @symb R.useWith(f, [g, h])(a, b) = f(g(a), h(b))
 */


var useWith = /*#__PURE__*/_curry2(function useWith(fn, transformers) {
  return curryN(transformers.length, function () {
    var args = [];
    var idx = 0;

    while (idx < transformers.length) {
      args.push(transformers[idx].call(this, arguments[idx]));
      idx += 1;
    }

    return fn.apply(this, args.concat(Array.prototype.slice.call(arguments, transformers.length)));
  });
});

module.exports = useWith;

/***/ }),

/***/ "./node_modules/ramda/src/values.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/src/values.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry1 */ "./node_modules/ramda/src/internal/_curry1.js");

var keys = /*#__PURE__*/__webpack_require__(/*! ./keys */ "./node_modules/ramda/src/keys.js");
/**
 * Returns a list of all the enumerable own properties of the supplied object.
 * Note that the order of the output array is not guaranteed across different
 * JS platforms.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig {k: v} -> [v]
 * @param {Object} obj The object to extract values from
 * @return {Array} An array of the values of the object's own properties.
 * @see R.valuesIn, R.keys
 * @example
 *
 *      R.values({a: 1, b: 2, c: 3}); //=> [1, 2, 3]
 */


var values = /*#__PURE__*/_curry1(function values(obj) {
  var props = keys(obj);
  var len = props.length;
  var vals = [];
  var idx = 0;

  while (idx < len) {
    vals[idx] = obj[props[idx]];
    idx += 1;
  }

  return vals;
});

module.exports = values;

/***/ }),

/***/ "./node_modules/ramda/src/valuesIn.js":
/*!********************************************!*\
  !*** ./node_modules/ramda/src/valuesIn.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry1 */ "./node_modules/ramda/src/internal/_curry1.js");
/**
 * Returns a list of all the properties, including prototype properties, of the
 * supplied object.
 * Note that the order of the output array is not guaranteed to be consistent
 * across different JS platforms.
 *
 * @func
 * @memberOf R
 * @since v0.2.0
 * @category Object
 * @sig {k: v} -> [v]
 * @param {Object} obj The object to extract values from
 * @return {Array} An array of the values of the object's own and prototype properties.
 * @see R.values, R.keysIn
 * @example
 *
 *      const F = function() { this.x = 'X'; };
 *      F.prototype.y = 'Y';
 *      const f = new F();
 *      R.valuesIn(f); //=> ['X', 'Y']
 */


var valuesIn = /*#__PURE__*/_curry1(function valuesIn(obj) {
  var prop;
  var vs = [];

  for (prop in obj) {
    vs[vs.length] = obj[prop];
  }

  return vs;
});

module.exports = valuesIn;

/***/ }),

/***/ "./node_modules/ramda/src/view.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/src/view.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js"); // `Const` is a functor that effectively ignores the function given to `map`.


var Const = function (x) {
  return {
    value: x,
    'fantasy-land/map': function () {
      return this;
    }
  };
};
/**
 * Returns a "view" of the given data structure, determined by the given lens.
 * The lens's focus determines which portion of the data structure is visible.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category Object
 * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
 * @sig Lens s a -> s -> a
 * @param {Lens} lens
 * @param {*} x
 * @return {*}
 * @see R.prop, R.lensIndex, R.lensProp
 * @example
 *
 *      const xLens = R.lensProp('x');
 *
 *      R.view(xLens, {x: 1, y: 2});  //=> 1
 *      R.view(xLens, {x: 4, y: 2});  //=> 4
 */


var view = /*#__PURE__*/_curry2(function view(lens, x) {
  // Using `Const` effectively ignores the setter function of the `lens`,
  // leaving the value returned by the getter function unmodified.
  return lens(Const)(x).value;
});

module.exports = view;

/***/ }),

/***/ "./node_modules/ramda/src/when.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/src/when.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry3 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry3 */ "./node_modules/ramda/src/internal/_curry3.js");
/**
 * Tests the final argument by passing it to the given predicate function. If
 * the predicate is satisfied, the function will return the result of calling
 * the `whenTrueFn` function with the same argument. If the predicate is not
 * satisfied, the argument is returned as is.
 *
 * @func
 * @memberOf R
 * @since v0.18.0
 * @category Logic
 * @sig (a -> Boolean) -> (a -> a) -> a -> a
 * @param {Function} pred       A predicate function
 * @param {Function} whenTrueFn A function to invoke when the `condition`
 *                              evaluates to a truthy value.
 * @param {*}        x          An object to test with the `pred` function and
 *                              pass to `whenTrueFn` if necessary.
 * @return {*} Either `x` or the result of applying `x` to `whenTrueFn`.
 * @see R.ifElse, R.unless, R.cond
 * @example
 *
 *      // truncate :: String -> String
 *      const truncate = R.when(
 *        R.propSatisfies(R.gt(R.__, 10), 'length'),
 *        R.pipe(R.take(10), R.append('…'), R.join(''))
 *      );
 *      truncate('12345');         //=> '12345'
 *      truncate('0123456789ABC'); //=> '0123456789…'
 */


var when = /*#__PURE__*/_curry3(function when(pred, whenTrueFn, x) {
  return pred(x) ? whenTrueFn(x) : x;
});

module.exports = when;

/***/ }),

/***/ "./node_modules/ramda/src/where.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/src/where.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");

var _has = /*#__PURE__*/__webpack_require__(/*! ./internal/_has */ "./node_modules/ramda/src/internal/_has.js");
/**
 * Takes a spec object and a test object; returns true if the test satisfies
 * the spec. Each of the spec's own properties must be a predicate function.
 * Each predicate is applied to the value of the corresponding property of the
 * test object. `where` returns true if all the predicates return true, false
 * otherwise.
 *
 * `where` is well suited to declaratively expressing constraints for other
 * functions such as [`filter`](#filter) and [`find`](#find).
 *
 * @func
 * @memberOf R
 * @since v0.1.1
 * @category Object
 * @sig {String: (* -> Boolean)} -> {String: *} -> Boolean
 * @param {Object} spec
 * @param {Object} testObj
 * @return {Boolean}
 * @see R.propSatisfies, R.whereEq
 * @example
 *
 *      // pred :: Object -> Boolean
 *      const pred = R.where({
 *        a: R.equals('foo'),
 *        b: R.complement(R.equals('bar')),
 *        x: R.gt(R.__, 10),
 *        y: R.lt(R.__, 20)
 *      });
 *
 *      pred({a: 'foo', b: 'xxx', x: 11, y: 19}); //=> true
 *      pred({a: 'xxx', b: 'xxx', x: 11, y: 19}); //=> false
 *      pred({a: 'foo', b: 'bar', x: 11, y: 19}); //=> false
 *      pred({a: 'foo', b: 'xxx', x: 10, y: 19}); //=> false
 *      pred({a: 'foo', b: 'xxx', x: 11, y: 20}); //=> false
 */


var where = /*#__PURE__*/_curry2(function where(spec, testObj) {
  for (var prop in spec) {
    if (_has(prop, spec) && !spec[prop](testObj[prop])) {
      return false;
    }
  }

  return true;
});

module.exports = where;

/***/ }),

/***/ "./node_modules/ramda/src/whereEq.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/src/whereEq.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");

var equals = /*#__PURE__*/__webpack_require__(/*! ./equals */ "./node_modules/ramda/src/equals.js");

var map = /*#__PURE__*/__webpack_require__(/*! ./map */ "./node_modules/ramda/src/map.js");

var where = /*#__PURE__*/__webpack_require__(/*! ./where */ "./node_modules/ramda/src/where.js");
/**
 * Takes a spec object and a test object; returns true if the test satisfies
 * the spec, false otherwise. An object satisfies the spec if, for each of the
 * spec's own properties, accessing that property of the object gives the same
 * value (in [`R.equals`](#equals) terms) as accessing that property of the
 * spec.
 *
 * `whereEq` is a specialization of [`where`](#where).
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category Object
 * @sig {String: *} -> {String: *} -> Boolean
 * @param {Object} spec
 * @param {Object} testObj
 * @return {Boolean}
 * @see R.propEq, R.where
 * @example
 *
 *      // pred :: Object -> Boolean
 *      const pred = R.whereEq({a: 1, b: 2});
 *
 *      pred({a: 1});              //=> false
 *      pred({a: 1, b: 2});        //=> true
 *      pred({a: 1, b: 2, c: 3});  //=> true
 *      pred({a: 1, b: 1});        //=> false
 */


var whereEq = /*#__PURE__*/_curry2(function whereEq(spec, testObj) {
  return where(map(equals, spec), testObj);
});

module.exports = whereEq;

/***/ }),

/***/ "./node_modules/ramda/src/without.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/src/without.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _includes = /*#__PURE__*/__webpack_require__(/*! ./internal/_includes */ "./node_modules/ramda/src/internal/_includes.js");

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");

var flip = /*#__PURE__*/__webpack_require__(/*! ./flip */ "./node_modules/ramda/src/flip.js");

var reject = /*#__PURE__*/__webpack_require__(/*! ./reject */ "./node_modules/ramda/src/reject.js");
/**
 * Returns a new list without values in the first argument.
 * [`R.equals`](#equals) is used to determine equality.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category List
 * @sig [a] -> [a] -> [a]
 * @param {Array} list1 The values to be removed from `list2`.
 * @param {Array} list2 The array to remove values from.
 * @return {Array} The new array without values in `list1`.
 * @see R.transduce, R.difference, R.remove
 * @example
 *
 *      R.without([1, 2], [1, 2, 1, 3, 4]); //=> [3, 4]
 */


var without = /*#__PURE__*/_curry2(function (xs, list) {
  return reject(flip(_includes)(xs), list);
});

module.exports = without;

/***/ }),

/***/ "./node_modules/ramda/src/xor.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/src/xor.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");
/**
 * Exclusive disjunction logical operation.
 * Returns `true` if one of the arguments is truthy and the other is falsy.
 * Otherwise, it returns `false`.
 *
 * @func
 * @memberOf R
 * @since v0.27.1
 * @category Logic
 * @sig a -> b -> Boolean
 * @param {Any} a
 * @param {Any} b
 * @return {Boolean} true if one of the arguments is truthy and the other is falsy
 * @see R.or, R.and
 * @example
 *
 *      R.xor(true, true); //=> false
 *      R.xor(true, false); //=> true
 *      R.xor(false, true); //=> true
 *      R.xor(false, false); //=> false
 */


var xor = /*#__PURE__*/_curry2(function xor(a, b) {
  return Boolean(!a ^ !b);
});

module.exports = xor;

/***/ }),

/***/ "./node_modules/ramda/src/xprod.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/src/xprod.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");
/**
 * Creates a new list out of the two supplied by creating each possible pair
 * from the lists.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [b] -> [[a,b]]
 * @param {Array} as The first list.
 * @param {Array} bs The second list.
 * @return {Array} The list made by combining each possible pair from
 *         `as` and `bs` into pairs (`[a, b]`).
 * @example
 *
 *      R.xprod([1, 2], ['a', 'b']); //=> [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]
 * @symb R.xprod([a, b], [c, d]) = [[a, c], [a, d], [b, c], [b, d]]
 */


var xprod = /*#__PURE__*/_curry2(function xprod(a, b) {
  // = xprodWith(prepend); (takes about 3 times as long...)
  var idx = 0;
  var ilen = a.length;
  var j;
  var jlen = b.length;
  var result = [];

  while (idx < ilen) {
    j = 0;

    while (j < jlen) {
      result[result.length] = [a[idx], b[j]];
      j += 1;
    }

    idx += 1;
  }

  return result;
});

module.exports = xprod;

/***/ }),

/***/ "./node_modules/ramda/src/zip.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/src/zip.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");
/**
 * Creates a new list out of the two supplied by pairing up equally-positioned
 * items from both lists. The returned list is truncated to the length of the
 * shorter of the two input lists.
 * Note: `zip` is equivalent to `zipWith(function(a, b) { return [a, b] })`.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [b] -> [[a,b]]
 * @param {Array} list1 The first array to consider.
 * @param {Array} list2 The second array to consider.
 * @return {Array} The list made by pairing up same-indexed elements of `list1` and `list2`.
 * @example
 *
 *      R.zip([1, 2, 3], ['a', 'b', 'c']); //=> [[1, 'a'], [2, 'b'], [3, 'c']]
 * @symb R.zip([a, b, c], [d, e, f]) = [[a, d], [b, e], [c, f]]
 */


var zip = /*#__PURE__*/_curry2(function zip(a, b) {
  var rv = [];
  var idx = 0;
  var len = Math.min(a.length, b.length);

  while (idx < len) {
    rv[idx] = [a[idx], b[idx]];
    idx += 1;
  }

  return rv;
});

module.exports = zip;

/***/ }),

/***/ "./node_modules/ramda/src/zipObj.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/src/zipObj.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");
/**
 * Creates a new object out of a list of keys and a list of values.
 * Key/value pairing is truncated to the length of the shorter of the two lists.
 * Note: `zipObj` is equivalent to `pipe(zip, fromPairs)`.
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category List
 * @sig [String] -> [*] -> {String: *}
 * @param {Array} keys The array that will be properties on the output object.
 * @param {Array} values The list of values on the output object.
 * @return {Object} The object made by pairing up same-indexed elements of `keys` and `values`.
 * @example
 *
 *      R.zipObj(['a', 'b', 'c'], [1, 2, 3]); //=> {a: 1, b: 2, c: 3}
 */


var zipObj = /*#__PURE__*/_curry2(function zipObj(keys, values) {
  var idx = 0;
  var len = Math.min(keys.length, values.length);
  var out = {};

  while (idx < len) {
    out[keys[idx]] = values[idx];
    idx += 1;
  }

  return out;
});

module.exports = zipObj;

/***/ }),

/***/ "./node_modules/ramda/src/zipWith.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/src/zipWith.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry3 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry3 */ "./node_modules/ramda/src/internal/_curry3.js");
/**
 * Creates a new list out of the two supplied by applying the function to each
 * equally-positioned pair in the lists. The returned list is truncated to the
 * length of the shorter of the two input lists.
 *
 * @function
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig ((a, b) -> c) -> [a] -> [b] -> [c]
 * @param {Function} fn The function used to combine the two elements into one value.
 * @param {Array} list1 The first array to consider.
 * @param {Array} list2 The second array to consider.
 * @return {Array} The list made by combining same-indexed elements of `list1` and `list2`
 *         using `fn`.
 * @example
 *
 *      const f = (x, y) => {
 *        // ...
 *      };
 *      R.zipWith(f, [1, 2, 3], ['a', 'b', 'c']);
 *      //=> [f(1, 'a'), f(2, 'b'), f(3, 'c')]
 * @symb R.zipWith(fn, [a, b, c], [d, e, f]) = [fn(a, d), fn(b, e), fn(c, f)]
 */


var zipWith = /*#__PURE__*/_curry3(function zipWith(fn, a, b) {
  var rv = [];
  var idx = 0;
  var len = Math.min(a.length, b.length);

  while (idx < len) {
    rv[idx] = fn(a[idx], b[idx]);
    idx += 1;
  }

  return rv;
});

module.exports = zipWith;

/***/ }),

/***/ "./node_modules/uuid/dist/index.js":
/*!*****************************************!*\
  !*** ./node_modules/uuid/dist/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "v1", {
  enumerable: true,
  get: function () {
    return _v.default;
  }
});
Object.defineProperty(exports, "v3", {
  enumerable: true,
  get: function () {
    return _v2.default;
  }
});
Object.defineProperty(exports, "v4", {
  enumerable: true,
  get: function () {
    return _v3.default;
  }
});
Object.defineProperty(exports, "v5", {
  enumerable: true,
  get: function () {
    return _v4.default;
  }
});
Object.defineProperty(exports, "NIL", {
  enumerable: true,
  get: function () {
    return _nil.default;
  }
});
Object.defineProperty(exports, "version", {
  enumerable: true,
  get: function () {
    return _version.default;
  }
});
Object.defineProperty(exports, "validate", {
  enumerable: true,
  get: function () {
    return _validate.default;
  }
});
Object.defineProperty(exports, "stringify", {
  enumerable: true,
  get: function () {
    return _stringify.default;
  }
});
Object.defineProperty(exports, "parse", {
  enumerable: true,
  get: function () {
    return _parse.default;
  }
});

var _v = _interopRequireDefault(__webpack_require__(/*! ./v1.js */ "./node_modules/uuid/dist/v1.js"));

var _v2 = _interopRequireDefault(__webpack_require__(/*! ./v3.js */ "./node_modules/uuid/dist/v3.js"));

var _v3 = _interopRequireDefault(__webpack_require__(/*! ./v4.js */ "./node_modules/uuid/dist/v4.js"));

var _v4 = _interopRequireDefault(__webpack_require__(/*! ./v5.js */ "./node_modules/uuid/dist/v5.js"));

var _nil = _interopRequireDefault(__webpack_require__(/*! ./nil.js */ "./node_modules/uuid/dist/nil.js"));

var _version = _interopRequireDefault(__webpack_require__(/*! ./version.js */ "./node_modules/uuid/dist/version.js"));

var _validate = _interopRequireDefault(__webpack_require__(/*! ./validate.js */ "./node_modules/uuid/dist/validate.js"));

var _stringify = _interopRequireDefault(__webpack_require__(/*! ./stringify.js */ "./node_modules/uuid/dist/stringify.js"));

var _parse = _interopRequireDefault(__webpack_require__(/*! ./parse.js */ "./node_modules/uuid/dist/parse.js"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

/***/ }),

/***/ "./node_modules/uuid/dist/md5-browser.js":
/*!***********************************************!*\
  !*** ./node_modules/uuid/dist/md5-browser.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * Browser-compatible JavaScript MD5
 *
 * Modification of JavaScript MD5
 * https://github.com/blueimp/JavaScript-MD5
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 *
 * Based on
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */

function md5(bytes) {
  if (typeof bytes === 'string') {
    const msg = unescape(encodeURIComponent(bytes)); // UTF8 escape

    bytes = new Uint8Array(msg.length);

    for (let i = 0; i < msg.length; ++i) {
      bytes[i] = msg.charCodeAt(i);
    }
  }

  return md5ToHexEncodedArray(wordsToMd5(bytesToWords(bytes), bytes.length * 8));
}
/*
 * Convert an array of little-endian words to an array of bytes
 */


function md5ToHexEncodedArray(input) {
  const output = [];
  const length32 = input.length * 32;
  const hexTab = '0123456789abcdef';

  for (let i = 0; i < length32; i += 8) {
    const x = input[i >> 5] >>> i % 32 & 0xff;
    const hex = parseInt(hexTab.charAt(x >>> 4 & 0x0f) + hexTab.charAt(x & 0x0f), 16);
    output.push(hex);
  }

  return output;
}
/**
 * Calculate output length with padding and bit length
 */


function getOutputLength(inputLength8) {
  return (inputLength8 + 64 >>> 9 << 4) + 14 + 1;
}
/*
 * Calculate the MD5 of an array of little-endian words, and a bit length.
 */


function wordsToMd5(x, len) {
  /* append padding */
  x[len >> 5] |= 0x80 << len % 32;
  x[getOutputLength(len) - 1] = len;
  let a = 1732584193;
  let b = -271733879;
  let c = -1732584194;
  let d = 271733878;

  for (let i = 0; i < x.length; i += 16) {
    const olda = a;
    const oldb = b;
    const oldc = c;
    const oldd = d;
    a = md5ff(a, b, c, d, x[i], 7, -680876936);
    d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);
    c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);
    b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
    a = md5ff(a, b, c, d, x[i + 4], 7, -176418897);
    d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
    c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
    b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);
    a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
    d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
    c = md5ff(c, d, a, b, x[i + 10], 17, -42063);
    b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
    a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
    d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);
    c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
    b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);
    a = md5gg(a, b, c, d, x[i + 1], 5, -165796510);
    d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
    c = md5gg(c, d, a, b, x[i + 11], 14, 643717713);
    b = md5gg(b, c, d, a, x[i], 20, -373897302);
    a = md5gg(a, b, c, d, x[i + 5], 5, -701558691);
    d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);
    c = md5gg(c, d, a, b, x[i + 15], 14, -660478335);
    b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);
    a = md5gg(a, b, c, d, x[i + 9], 5, 568446438);
    d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
    c = md5gg(c, d, a, b, x[i + 3], 14, -187363961);
    b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
    a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
    d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);
    c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
    b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);
    a = md5hh(a, b, c, d, x[i + 5], 4, -378558);
    d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
    c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
    b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);
    a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
    d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
    c = md5hh(c, d, a, b, x[i + 7], 16, -155497632);
    b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
    a = md5hh(a, b, c, d, x[i + 13], 4, 681279174);
    d = md5hh(d, a, b, c, x[i], 11, -358537222);
    c = md5hh(c, d, a, b, x[i + 3], 16, -722521979);
    b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);
    a = md5hh(a, b, c, d, x[i + 9], 4, -640364487);
    d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);
    c = md5hh(c, d, a, b, x[i + 15], 16, 530742520);
    b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);
    a = md5ii(a, b, c, d, x[i], 6, -198630844);
    d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
    c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
    b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);
    a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
    d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
    c = md5ii(c, d, a, b, x[i + 10], 15, -1051523);
    b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
    a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
    d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);
    c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
    b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
    a = md5ii(a, b, c, d, x[i + 4], 6, -145523070);
    d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
    c = md5ii(c, d, a, b, x[i + 2], 15, 718787259);
    b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);
    a = safeAdd(a, olda);
    b = safeAdd(b, oldb);
    c = safeAdd(c, oldc);
    d = safeAdd(d, oldd);
  }

  return [a, b, c, d];
}
/*
 * Convert an array bytes to an array of little-endian words
 * Characters >255 have their high-byte silently ignored.
 */


function bytesToWords(input) {
  if (input.length === 0) {
    return [];
  }

  const length8 = input.length * 8;
  const output = new Uint32Array(getOutputLength(length8));

  for (let i = 0; i < length8; i += 8) {
    output[i >> 5] |= (input[i / 8] & 0xff) << i % 32;
  }

  return output;
}
/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */


function safeAdd(x, y) {
  const lsw = (x & 0xffff) + (y & 0xffff);
  const msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return msw << 16 | lsw & 0xffff;
}
/*
 * Bitwise rotate a 32-bit number to the left.
 */


function bitRotateLeft(num, cnt) {
  return num << cnt | num >>> 32 - cnt;
}
/*
 * These functions implement the four basic operations the algorithm uses.
 */


function md5cmn(q, a, b, x, s, t) {
  return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
}

function md5ff(a, b, c, d, x, s, t) {
  return md5cmn(b & c | ~b & d, a, b, x, s, t);
}

function md5gg(a, b, c, d, x, s, t) {
  return md5cmn(b & d | c & ~d, a, b, x, s, t);
}

function md5hh(a, b, c, d, x, s, t) {
  return md5cmn(b ^ c ^ d, a, b, x, s, t);
}

function md5ii(a, b, c, d, x, s, t) {
  return md5cmn(c ^ (b | ~d), a, b, x, s, t);
}

var _default = md5;
exports.default = _default;

/***/ }),

/***/ "./node_modules/uuid/dist/nil.js":
/*!***************************************!*\
  !*** ./node_modules/uuid/dist/nil.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = '00000000-0000-0000-0000-000000000000';
exports.default = _default;

/***/ }),

/***/ "./node_modules/uuid/dist/parse.js":
/*!*****************************************!*\
  !*** ./node_modules/uuid/dist/parse.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _validate = _interopRequireDefault(__webpack_require__(/*! ./validate.js */ "./node_modules/uuid/dist/validate.js"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function parse(uuid) {
  if (!(0, _validate.default)(uuid)) {
    throw TypeError('Invalid UUID');
  }

  let v;
  const arr = new Uint8Array(16); // Parse ########-....-....-....-............

  arr[0] = (v = parseInt(uuid.slice(0, 8), 16)) >>> 24;
  arr[1] = v >>> 16 & 0xff;
  arr[2] = v >>> 8 & 0xff;
  arr[3] = v & 0xff; // Parse ........-####-....-....-............

  arr[4] = (v = parseInt(uuid.slice(9, 13), 16)) >>> 8;
  arr[5] = v & 0xff; // Parse ........-....-####-....-............

  arr[6] = (v = parseInt(uuid.slice(14, 18), 16)) >>> 8;
  arr[7] = v & 0xff; // Parse ........-....-....-####-............

  arr[8] = (v = parseInt(uuid.slice(19, 23), 16)) >>> 8;
  arr[9] = v & 0xff; // Parse ........-....-....-....-############
  // (Use "/" to avoid 32-bit truncation when bit-shifting high-order bytes)

  arr[10] = (v = parseInt(uuid.slice(24, 36), 16)) / 0x10000000000 & 0xff;
  arr[11] = v / 0x100000000 & 0xff;
  arr[12] = v >>> 24 & 0xff;
  arr[13] = v >>> 16 & 0xff;
  arr[14] = v >>> 8 & 0xff;
  arr[15] = v & 0xff;
  return arr;
}

var _default = parse;
exports.default = _default;

/***/ }),

/***/ "./node_modules/uuid/dist/regex.js":
/*!*****************************************!*\
  !*** ./node_modules/uuid/dist/regex.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
exports.default = _default;

/***/ }),

/***/ "./node_modules/uuid/dist/rng-browser.js":
/*!***********************************************!*\
  !*** ./node_modules/uuid/dist/rng-browser.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = rng; // Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
// getRandomValues needs to be invoked in a context where "this" is a Crypto implementation. Also,
// find the complete implementation of crypto (msCrypto) on IE11.

const getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== 'undefined' && typeof msCrypto.getRandomValues === 'function' && msCrypto.getRandomValues.bind(msCrypto);
const rnds8 = new Uint8Array(16);

function rng() {
  if (!getRandomValues) {
    throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
  }

  return getRandomValues(rnds8);
}

/***/ }),

/***/ "./node_modules/uuid/dist/sha1-browser.js":
/*!************************************************!*\
  !*** ./node_modules/uuid/dist/sha1-browser.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0; // Adapted from Chris Veness' SHA1 code at
// http://www.movable-type.co.uk/scripts/sha1.html

function f(s, x, y, z) {
  switch (s) {
    case 0:
      return x & y ^ ~x & z;

    case 1:
      return x ^ y ^ z;

    case 2:
      return x & y ^ x & z ^ y & z;

    case 3:
      return x ^ y ^ z;
  }
}

function ROTL(x, n) {
  return x << n | x >>> 32 - n;
}

function sha1(bytes) {
  const K = [0x5a827999, 0x6ed9eba1, 0x8f1bbcdc, 0xca62c1d6];
  const H = [0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0];

  if (typeof bytes === 'string') {
    const msg = unescape(encodeURIComponent(bytes)); // UTF8 escape

    bytes = [];

    for (let i = 0; i < msg.length; ++i) {
      bytes.push(msg.charCodeAt(i));
    }
  } else if (!Array.isArray(bytes)) {
    // Convert Array-like to Array
    bytes = Array.prototype.slice.call(bytes);
  }

  bytes.push(0x80);
  const l = bytes.length / 4 + 2;
  const N = Math.ceil(l / 16);
  const M = new Array(N);

  for (let i = 0; i < N; ++i) {
    const arr = new Uint32Array(16);

    for (let j = 0; j < 16; ++j) {
      arr[j] = bytes[i * 64 + j * 4] << 24 | bytes[i * 64 + j * 4 + 1] << 16 | bytes[i * 64 + j * 4 + 2] << 8 | bytes[i * 64 + j * 4 + 3];
    }

    M[i] = arr;
  }

  M[N - 1][14] = (bytes.length - 1) * 8 / Math.pow(2, 32);
  M[N - 1][14] = Math.floor(M[N - 1][14]);
  M[N - 1][15] = (bytes.length - 1) * 8 & 0xffffffff;

  for (let i = 0; i < N; ++i) {
    const W = new Uint32Array(80);

    for (let t = 0; t < 16; ++t) {
      W[t] = M[i][t];
    }

    for (let t = 16; t < 80; ++t) {
      W[t] = ROTL(W[t - 3] ^ W[t - 8] ^ W[t - 14] ^ W[t - 16], 1);
    }

    let a = H[0];
    let b = H[1];
    let c = H[2];
    let d = H[3];
    let e = H[4];

    for (let t = 0; t < 80; ++t) {
      const s = Math.floor(t / 20);
      const T = ROTL(a, 5) + f(s, b, c, d) + e + K[s] + W[t] >>> 0;
      e = d;
      d = c;
      c = ROTL(b, 30) >>> 0;
      b = a;
      a = T;
    }

    H[0] = H[0] + a >>> 0;
    H[1] = H[1] + b >>> 0;
    H[2] = H[2] + c >>> 0;
    H[3] = H[3] + d >>> 0;
    H[4] = H[4] + e >>> 0;
  }

  return [H[0] >> 24 & 0xff, H[0] >> 16 & 0xff, H[0] >> 8 & 0xff, H[0] & 0xff, H[1] >> 24 & 0xff, H[1] >> 16 & 0xff, H[1] >> 8 & 0xff, H[1] & 0xff, H[2] >> 24 & 0xff, H[2] >> 16 & 0xff, H[2] >> 8 & 0xff, H[2] & 0xff, H[3] >> 24 & 0xff, H[3] >> 16 & 0xff, H[3] >> 8 & 0xff, H[3] & 0xff, H[4] >> 24 & 0xff, H[4] >> 16 & 0xff, H[4] >> 8 & 0xff, H[4] & 0xff];
}

var _default = sha1;
exports.default = _default;

/***/ }),

/***/ "./node_modules/uuid/dist/stringify.js":
/*!*********************************************!*\
  !*** ./node_modules/uuid/dist/stringify.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _validate = _interopRequireDefault(__webpack_require__(/*! ./validate.js */ "./node_modules/uuid/dist/validate.js"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */


const byteToHex = [];

for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).substr(1));
}

function stringify(arr, offset = 0) {
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  const uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase(); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!(0, _validate.default)(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

var _default = stringify;
exports.default = _default;

/***/ }),

/***/ "./node_modules/uuid/dist/v1.js":
/*!**************************************!*\
  !*** ./node_modules/uuid/dist/v1.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _rng = _interopRequireDefault(__webpack_require__(/*! ./rng.js */ "./node_modules/uuid/dist/rng-browser.js"));

var _stringify = _interopRequireDefault(__webpack_require__(/*! ./stringify.js */ "./node_modules/uuid/dist/stringify.js"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
} // **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html


let _nodeId;

let _clockseq; // Previous uuid creation time


let _lastMSecs = 0;
let _lastNSecs = 0; // See https://github.com/uuidjs/uuid for API details

function v1(options, buf, offset) {
  let i = buf && offset || 0;
  const b = buf || new Array(16);
  options = options || {};
  let node = options.node || _nodeId;
  let clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq; // node and clockseq need to be initialized to random values if they're not
  // specified.  We do this lazily to minimize issues related to insufficient
  // system entropy.  See #189

  if (node == null || clockseq == null) {
    const seedBytes = options.random || (options.rng || _rng.default)();

    if (node == null) {
      // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
      node = _nodeId = [seedBytes[0] | 0x01, seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]];
    }

    if (clockseq == null) {
      // Per 4.2.2, randomize (14 bit) clockseq
      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
    }
  } // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.


  let msecs = options.msecs !== undefined ? options.msecs : Date.now(); // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock

  let nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1; // Time since last uuid creation (in msecs)

  const dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 10000; // Per 4.2.1.2, Bump clockseq on clock regression

  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  } // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval


  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  } // Per 4.2.1.2 Throw error if too many uuids are requested


  if (nsecs >= 10000) {
    throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq; // Per 4.1.4 - Convert from unix epoch to Gregorian epoch

  msecs += 12219292800000; // `time_low`

  const tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff; // `time_mid`

  const tmh = msecs / 0x100000000 * 10000 & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff; // `time_high_and_version`

  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version

  b[i++] = tmh >>> 16 & 0xff; // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)

  b[i++] = clockseq >>> 8 | 0x80; // `clock_seq_low`

  b[i++] = clockseq & 0xff; // `node`

  for (let n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }

  return buf || (0, _stringify.default)(b);
}

var _default = v1;
exports.default = _default;

/***/ }),

/***/ "./node_modules/uuid/dist/v3.js":
/*!**************************************!*\
  !*** ./node_modules/uuid/dist/v3.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _v = _interopRequireDefault(__webpack_require__(/*! ./v35.js */ "./node_modules/uuid/dist/v35.js"));

var _md = _interopRequireDefault(__webpack_require__(/*! ./md5.js */ "./node_modules/uuid/dist/md5-browser.js"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

const v3 = (0, _v.default)('v3', 0x30, _md.default);
var _default = v3;
exports.default = _default;

/***/ }),

/***/ "./node_modules/uuid/dist/v35.js":
/*!***************************************!*\
  !*** ./node_modules/uuid/dist/v35.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.URL = exports.DNS = void 0;

var _stringify = _interopRequireDefault(__webpack_require__(/*! ./stringify.js */ "./node_modules/uuid/dist/stringify.js"));

var _parse = _interopRequireDefault(__webpack_require__(/*! ./parse.js */ "./node_modules/uuid/dist/parse.js"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function stringToBytes(str) {
  str = unescape(encodeURIComponent(str)); // UTF8 escape

  const bytes = [];

  for (let i = 0; i < str.length; ++i) {
    bytes.push(str.charCodeAt(i));
  }

  return bytes;
}

const DNS = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
exports.DNS = DNS;
const URL = '6ba7b811-9dad-11d1-80b4-00c04fd430c8';
exports.URL = URL;

function _default(name, version, hashfunc) {
  function generateUUID(value, namespace, buf, offset) {
    if (typeof value === 'string') {
      value = stringToBytes(value);
    }

    if (typeof namespace === 'string') {
      namespace = (0, _parse.default)(namespace);
    }

    if (namespace.length !== 16) {
      throw TypeError('Namespace must be array-like (16 iterable integer values, 0-255)');
    } // Compute hash of namespace and value, Per 4.3
    // Future: Use spread syntax when supported on all platforms, e.g. `bytes =
    // hashfunc([...namespace, ... value])`


    let bytes = new Uint8Array(16 + value.length);
    bytes.set(namespace);
    bytes.set(value, namespace.length);
    bytes = hashfunc(bytes);
    bytes[6] = bytes[6] & 0x0f | version;
    bytes[8] = bytes[8] & 0x3f | 0x80;

    if (buf) {
      offset = offset || 0;

      for (let i = 0; i < 16; ++i) {
        buf[offset + i] = bytes[i];
      }

      return buf;
    }

    return (0, _stringify.default)(bytes);
  } // Function#name is not settable on some platforms (#270)


  try {
    generateUUID.name = name; // eslint-disable-next-line no-empty
  } catch (err) {} // For CommonJS default export support


  generateUUID.DNS = DNS;
  generateUUID.URL = URL;
  return generateUUID;
}

/***/ }),

/***/ "./node_modules/uuid/dist/v4.js":
/*!**************************************!*\
  !*** ./node_modules/uuid/dist/v4.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _rng = _interopRequireDefault(__webpack_require__(/*! ./rng.js */ "./node_modules/uuid/dist/rng-browser.js"));

var _stringify = _interopRequireDefault(__webpack_require__(/*! ./stringify.js */ "./node_modules/uuid/dist/stringify.js"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function v4(options, buf, offset) {
  options = options || {};

  const rnds = options.random || (options.rng || _rng.default)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`


  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return (0, _stringify.default)(rnds);
}

var _default = v4;
exports.default = _default;

/***/ }),

/***/ "./node_modules/uuid/dist/v5.js":
/*!**************************************!*\
  !*** ./node_modules/uuid/dist/v5.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _v = _interopRequireDefault(__webpack_require__(/*! ./v35.js */ "./node_modules/uuid/dist/v35.js"));

var _sha = _interopRequireDefault(__webpack_require__(/*! ./sha1.js */ "./node_modules/uuid/dist/sha1-browser.js"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

const v5 = (0, _v.default)('v5', 0x50, _sha.default);
var _default = v5;
exports.default = _default;

/***/ }),

/***/ "./node_modules/uuid/dist/validate.js":
/*!********************************************!*\
  !*** ./node_modules/uuid/dist/validate.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regex = _interopRequireDefault(__webpack_require__(/*! ./regex.js */ "./node_modules/uuid/dist/regex.js"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function validate(uuid) {
  return typeof uuid === 'string' && _regex.default.test(uuid);
}

var _default = validate;
exports.default = _default;

/***/ }),

/***/ "./node_modules/uuid/dist/version.js":
/*!*******************************************!*\
  !*** ./node_modules/uuid/dist/version.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _validate = _interopRequireDefault(__webpack_require__(/*! ./validate.js */ "./node_modules/uuid/dist/validate.js"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function version(uuid) {
  if (!(0, _validate.default)(uuid)) {
    throw TypeError('Invalid UUID');
  }

  return parseInt(uuid.substr(14, 1), 16);
}

var _default = version;
exports.default = _default;

/***/ }),

/***/ "./packages/registry/src/entityActionsMenu/EntityActionsMenuRegistry.ts":
/*!******************************************************************************!*\
  !*** ./packages/registry/src/entityActionsMenu/EntityActionsMenuRegistry.ts ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _subscription__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../subscription */ "./packages/registry/src/subscription/index.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./packages/registry/src/entityActionsMenu/constants.ts");


/**
 * D: Domain name e.g. "eventEditor"
 * ET: Entity Type: The current entity type e.g. "datetime", "ticket"
 * EP: Element Props: The props of the component that's registerd by the consumer
 */

class EntityActionsMenuRegistry extends _subscription__WEBPACK_IMPORTED_MODULE_0__["UIRegistry"] {
  constructor({
    domain,
    entityType
  }) {
    super({
      domain,
      service: _constants__WEBPACK_IMPORTED_MODULE_1__["serviceName"],
      path: [entityType]
    });
  }

}

/* harmony default export */ __webpack_exports__["default"] = (EntityActionsMenuRegistry);

/***/ }),

/***/ "./packages/registry/src/entityActionsMenu/EntityActionsSubscription.ts":
/*!******************************************************************************!*\
  !*** ./packages/registry/src/entityActionsMenu/EntityActionsSubscription.ts ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _subscription__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../subscription */ "./packages/registry/src/subscription/index.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants */ "./packages/registry/src/entityActionsMenu/constants.ts");




/**
 * D: Domain name e.g. "eventEditor"
 */
class EntityActionsSubscription {
  constructor(domain) {
    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(this, "subscriptionManager", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(this, "subscribe", (...args) => this.subscriptionManager.subscribe(...args));

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(this, "getSubscriptions", args => {
      return Object(_subscription__WEBPACK_IMPORTED_MODULE_1__["filterSubscriptionsByOption"])(this.subscriptionManager.getSubscriptions, 'entityType', args === null || args === void 0 ? void 0 : args.entityType);
    });

    this.subscriptionManager = new _subscription__WEBPACK_IMPORTED_MODULE_1__["SubscriptionManager"]({
      domain,
      service: _constants__WEBPACK_IMPORTED_MODULE_2__["serviceName"]
    });
  }

}

/* harmony default export */ __webpack_exports__["default"] = (EntityActionsSubscription);

/***/ }),

/***/ "./packages/registry/src/entityActionsMenu/constants.ts":
/*!**************************************************************!*\
  !*** ./packages/registry/src/entityActionsMenu/constants.ts ***!
  \**************************************************************/
/*! exports provided: serviceName */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "serviceName", function() { return serviceName; });
const serviceName = 'entityActions';

/***/ }),

/***/ "./packages/registry/src/entityActionsMenu/index.ts":
/*!**********************************************************!*\
  !*** ./packages/registry/src/entityActionsMenu/index.ts ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _EntityActionsSubscription__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EntityActionsSubscription */ "./packages/registry/src/entityActionsMenu/EntityActionsSubscription.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EntityActionsSubscription", function() { return _EntityActionsSubscription__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _EntityActionsMenuRegistry__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EntityActionsMenuRegistry */ "./packages/registry/src/entityActionsMenu/EntityActionsMenuRegistry.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EntityActionsMenuRegistry", function() { return _EntityActionsMenuRegistry__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./types */ "./packages/registry/src/entityActionsMenu/types.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _types__WEBPACK_IMPORTED_MODULE_2__) if(["default","EntityActionsSubscription","EntityActionsMenuRegistry"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _types__WEBPACK_IMPORTED_MODULE_2__[key]; }) }(__WEBPACK_IMPORT_KEY__));




/***/ }),

/***/ "./packages/registry/src/entityActionsMenu/types.ts":
/*!**********************************************************!*\
  !*** ./packages/registry/src/entityActionsMenu/types.ts ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./packages/registry/src/entityCardDetails/EntityCardDetailsRegistry.ts":
/*!******************************************************************************!*\
  !*** ./packages/registry/src/entityCardDetails/EntityCardDetailsRegistry.ts ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _subscription__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../subscription */ "./packages/registry/src/subscription/index.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./packages/registry/src/entityCardDetails/constants.ts");


/**
 * D: Domain name e.g. "eventEditor"
 * ET: Entity Type: The current entity type e.g. "datetime", "ticket"
 * EP: Element Props: The props of the component that's registerd by the consumer
 */

class EntityCardDetailsRegistry extends _subscription__WEBPACK_IMPORTED_MODULE_0__["UIRegistry"] {
  constructor({
    domain,
    entityType
  }) {
    super({
      domain,
      service: _constants__WEBPACK_IMPORTED_MODULE_1__["serviceName"],
      path: [entityType]
    });
  }

}

/* harmony default export */ __webpack_exports__["default"] = (EntityCardDetailsRegistry);

/***/ }),

/***/ "./packages/registry/src/entityCardDetails/EntityCardDetailsSubscription.ts":
/*!**********************************************************************************!*\
  !*** ./packages/registry/src/entityCardDetails/EntityCardDetailsSubscription.ts ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _subscription__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../subscription */ "./packages/registry/src/subscription/index.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants */ "./packages/registry/src/entityCardDetails/constants.ts");




/**
 * D: Domain name e.g. "eventEditor"
 */
class EntityCardDetailsSubscription {
  constructor(domain) {
    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(this, "subscriptionManager", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(this, "subscribe", (...args) => this.subscriptionManager.subscribe(...args));

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(this, "getSubscriptions", args => {
      return Object(_subscription__WEBPACK_IMPORTED_MODULE_1__["filterSubscriptionsByOption"])(this.subscriptionManager.getSubscriptions, 'entityType', args === null || args === void 0 ? void 0 : args.entityType);
    });

    this.subscriptionManager = new _subscription__WEBPACK_IMPORTED_MODULE_1__["SubscriptionManager"]({
      domain,
      service: _constants__WEBPACK_IMPORTED_MODULE_2__["serviceName"]
    });
  }

}

/* harmony default export */ __webpack_exports__["default"] = (EntityCardDetailsSubscription);

/***/ }),

/***/ "./packages/registry/src/entityCardDetails/constants.ts":
/*!**************************************************************!*\
  !*** ./packages/registry/src/entityCardDetails/constants.ts ***!
  \**************************************************************/
/*! exports provided: serviceName */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "serviceName", function() { return serviceName; });
const serviceName = 'entityCardDetails';

/***/ }),

/***/ "./packages/registry/src/entityCardDetails/index.ts":
/*!**********************************************************!*\
  !*** ./packages/registry/src/entityCardDetails/index.ts ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _EntityCardDetailsSubscription__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EntityCardDetailsSubscription */ "./packages/registry/src/entityCardDetails/EntityCardDetailsSubscription.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EntityCardDetailsSubscription", function() { return _EntityCardDetailsSubscription__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _EntityCardDetailsRegistry__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EntityCardDetailsRegistry */ "./packages/registry/src/entityCardDetails/EntityCardDetailsRegistry.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EntityCardDetailsRegistry", function() { return _EntityCardDetailsRegistry__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./types */ "./packages/registry/src/entityCardDetails/types.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _types__WEBPACK_IMPORTED_MODULE_2__) if(["default","EntityCardDetailsSubscription","EntityCardDetailsRegistry"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _types__WEBPACK_IMPORTED_MODULE_2__[key]; }) }(__WEBPACK_IMPORT_KEY__));




/***/ }),

/***/ "./packages/registry/src/entityCardDetails/types.ts":
/*!**********************************************************!*\
  !*** ./packages/registry/src/entityCardDetails/types.ts ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./packages/registry/src/entityTable/EntityTableFilters.ts":
/*!*****************************************************************!*\
  !*** ./packages/registry/src/entityTable/EntityTableFilters.ts ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ramda */ "./node_modules/ramda/src/index.mjs");
/* harmony import */ var invariant__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! invariant */ "./node_modules/invariant/invariant.js");
/* harmony import */ var invariant__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(invariant__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _subscription__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../subscription */ "./packages/registry/src/subscription/index.ts");





/**
 * D: Domain name e.g. "eventEditor"
 * L: List name name e.g. "dates-list", "tickets-list"
 * FS: Filter State (manager): The filter state instance for the current entity list
 */
class EntityTableFilters {
  constructor(domain, entityListId) {
    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(this, "subscriptionManager", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(this, "entityListId", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(this, "registerCallback", ({
      callback,
      listId,
      priority,
      type
    }) => {
      invariant__WEBPACK_IMPORTED_MODULE_2___default()(listId, 'No `listId` provided');
      return this.subscriptionManager.subscribe(callback, {
        listId,
        priority,
        type
      });
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(this, "getCallbacks", ({
      listId = this.entityListId,
      type
    }) => {
      invariant__WEBPACK_IMPORTED_MODULE_2___default()(listId, 'No `listId` provided');
      const allSubscriptions = this.subscriptionManager.getSubscriptions();
      const isForList = Object(ramda__WEBPACK_IMPORTED_MODULE_1__["pathEq"])(['options', 'listId'], listId);
      const isOfType = Object(ramda__WEBPACK_IMPORTED_MODULE_1__["pathEq"])(['options', 'type'], type);
      const isOfTypeAndForList = Object(ramda__WEBPACK_IMPORTED_MODULE_1__["allPass"])([isForList, isOfType]);
      return Object(ramda__WEBPACK_IMPORTED_MODULE_1__["filter"])(isOfTypeAndForList, allSubscriptions);
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(this, "getFilters", (listId = this.entityListId) => {
      return this.getCallbacks({
        listId,
        type: 'filter'
      });
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(this, "registerFilter", (callback, priority = 10, listId = this.entityListId) => {
      return this.registerCallback({
        callback,
        listId,
        priority,
        type: 'filter'
      });
    });

    this.subscriptionManager = new _subscription__WEBPACK_IMPORTED_MODULE_3__["SubscriptionManager"]({
      domain,
      service: 'entityTableFilter'
    });
    this.entityListId = entityListId;
  }

}

/* harmony default export */ __webpack_exports__["default"] = (EntityTableFilters);

/***/ }),

/***/ "./packages/registry/src/entityTable/index.ts":
/*!****************************************************!*\
  !*** ./packages/registry/src/entityTable/index.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _EntityTableFilters__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EntityTableFilters */ "./packages/registry/src/entityTable/EntityTableFilters.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EntityTableFilters", function() { return _EntityTableFilters__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./types */ "./packages/registry/src/entityTable/types.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _types__WEBPACK_IMPORTED_MODULE_1__) if(["default","EntityTableFilters"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _types__WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));



/***/ }),

/***/ "./packages/registry/src/entityTable/types.ts":
/*!****************************************************!*\
  !*** ./packages/registry/src/entityTable/types.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./packages/registry/src/filterBar/FilterBarService.ts":
/*!*************************************************************!*\
  !*** ./packages/registry/src/filterBar/FilterBarService.ts ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ramda */ "./node_modules/ramda/src/index.mjs");
/* harmony import */ var invariant__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! invariant */ "./node_modules/invariant/invariant.js");
/* harmony import */ var invariant__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(invariant__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _subscription__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../subscription */ "./packages/registry/src/subscription/index.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./types */ "./packages/registry/src/filterBar/types.ts");






/**
 * D: Domain name e.g. "eventEditor"
 * L: List name name e.g. "dates-list", "tickets-list"
 * E: Entity: The current entity e.g. "Datetime", "Ticket"
 * FS: Filter State (manager): The filter state instance for the current entity list
 */
class FilterBarService {
  constructor(domain, entityListId) {
    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(this, "subscriptionManager", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(this, "entityListId", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(this, "registerCallback", ({
      callback,
      listId,
      priority,
      type
    }) => {
      invariant__WEBPACK_IMPORTED_MODULE_2___default()(listId, 'No `listId` provided');
      return this.subscriptionManager.subscribe(callback, {
        listId,
        priority,
        type
      });
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(this, "getCallbacks", ({
      listId = this.entityListId,
      type
    }) => {
      invariant__WEBPACK_IMPORTED_MODULE_2___default()(listId, 'No `listId` provided');
      const allSubscriptions = this.subscriptionManager.getSubscriptions();
      const isForList = Object(ramda__WEBPACK_IMPORTED_MODULE_1__["pathEq"])(['options', 'listId'], listId);
      const isOfType = Object(ramda__WEBPACK_IMPORTED_MODULE_1__["pathEq"])(['options', 'type'], type);
      const isOfTypeAndForList = Object(ramda__WEBPACK_IMPORTED_MODULE_1__["allPass"])([isForList, isOfType]);
      return Object(ramda__WEBPACK_IMPORTED_MODULE_1__["filter"])(isOfTypeAndForList, allSubscriptions);
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(this, "getFilters", (listId = this.entityListId) => {
      return this.getCallbacks({
        listId,
        type: 'filter'
      });
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(this, "getSorters", (listId = this.entityListId) => {
      return this.getCallbacks({
        listId,
        type: 'sort'
      });
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(this, "getSearches", (listId = this.entityListId) => {
      return this.getCallbacks({
        listId,
        type: 'search'
      });
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(this, "registerFilter", (callback, priority = 10, listId = this.entityListId) => {
      return this.registerCallback({
        callback,
        listId,
        priority,
        type: 'filter'
      });
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(this, "registerSorter", (callback, priority = 10, listId = this.entityListId) => {
      return this.registerCallback({
        callback,
        listId,
        priority,
        type: 'sort'
      });
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(this, "registerSearch", (callback, priority = 10, listId = this.entityListId) => {
      return this.registerCallback({
        callback,
        listId,
        priority,
        type: 'search'
      });
    });

    this.subscriptionManager = new _subscription__WEBPACK_IMPORTED_MODULE_3__["SubscriptionManager"]({
      domain,
      service: _types__WEBPACK_IMPORTED_MODULE_4__["FilterBarServiceType"].FILTER
    });
    this.entityListId = entityListId;
  }

}

/* harmony default export */ __webpack_exports__["default"] = (FilterBarService);

/***/ }),

/***/ "./packages/registry/src/filterBar/FilterBarUIRegistry.ts":
/*!****************************************************************!*\
  !*** ./packages/registry/src/filterBar/FilterBarUIRegistry.ts ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _subscription__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../subscription */ "./packages/registry/src/subscription/index.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./types */ "./packages/registry/src/filterBar/types.ts");



/**
 * D: Domain name e.g. "eventEditor"
 * L: List name name e.g. "dates-list", "tickets-list"
 * FS: Filter State (manager): The filter state instance for the current entity list
 */
class FilterBarUIRegistry extends _subscription__WEBPACK_IMPORTED_MODULE_0__["UIRegistry"] {
  constructor({
    domain,
    listId
  }) {
    super({
      domain,
      service: _types__WEBPACK_IMPORTED_MODULE_1__["FilterBarServiceType"].UI,
      path: [listId]
    });
  }

}

/* harmony default export */ __webpack_exports__["default"] = (FilterBarUIRegistry);

/***/ }),

/***/ "./packages/registry/src/filterBar/FilterBarUISubscription.ts":
/*!********************************************************************!*\
  !*** ./packages/registry/src/filterBar/FilterBarUISubscription.ts ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _subscription__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../subscription */ "./packages/registry/src/subscription/index.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./types */ "./packages/registry/src/filterBar/types.ts");




/**
 * D: Domain name e.g. "eventEditor"
 */
class FilterBarUISubscription {
  constructor(domain) {
    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(this, "subscriptionManager", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(this, "subscribe", (...args) => this.subscriptionManager.subscribe(...args));

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(this, "getSubscriptions", args => {
      return Object(_subscription__WEBPACK_IMPORTED_MODULE_1__["filterSubscriptionsByOption"])(this.subscriptionManager.getSubscriptions, 'listId', args === null || args === void 0 ? void 0 : args.listId);
    });

    this.subscriptionManager = new _subscription__WEBPACK_IMPORTED_MODULE_1__["SubscriptionManager"]({
      domain,
      service: _types__WEBPACK_IMPORTED_MODULE_2__["FilterBarServiceType"].UI
    });
  }

}

/* harmony default export */ __webpack_exports__["default"] = (FilterBarUISubscription);

/***/ }),

/***/ "./packages/registry/src/filterBar/index.ts":
/*!**************************************************!*\
  !*** ./packages/registry/src/filterBar/index.ts ***!
  \**************************************************/
/*! exports provided: FilterBarUISubscription, FilterBarService, FilterBarUIRegistry, useFilterBarUIElements, FilterBarServiceType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _FilterBarUISubscription__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FilterBarUISubscription */ "./packages/registry/src/filterBar/FilterBarUISubscription.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FilterBarUISubscription", function() { return _FilterBarUISubscription__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _FilterBarService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FilterBarService */ "./packages/registry/src/filterBar/FilterBarService.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FilterBarService", function() { return _FilterBarService__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _FilterBarUIRegistry__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./FilterBarUIRegistry */ "./packages/registry/src/filterBar/FilterBarUIRegistry.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FilterBarUIRegistry", function() { return _FilterBarUIRegistry__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _useFilterBarUIElements__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./useFilterBarUIElements */ "./packages/registry/src/filterBar/useFilterBarUIElements.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useFilterBarUIElements", function() { return _useFilterBarUIElements__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./types */ "./packages/registry/src/filterBar/types.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FilterBarServiceType", function() { return _types__WEBPACK_IMPORTED_MODULE_4__["FilterBarServiceType"]; });







/***/ }),

/***/ "./packages/registry/src/filterBar/types.ts":
/*!**************************************************!*\
  !*** ./packages/registry/src/filterBar/types.ts ***!
  \**************************************************/
/*! exports provided: FilterBarServiceType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FilterBarServiceType", function() { return FilterBarServiceType; });
let FilterBarServiceType;

(function (FilterBarServiceType) {
  FilterBarServiceType["UI"] = "entityListFilterBarUI";
  FilterBarServiceType["FILTER"] = "entityListFilterBarFilter";
})(FilterBarServiceType || (FilterBarServiceType = {}));

/***/ }),

/***/ "./packages/registry/src/filterBar/useFilterBarUIElements.ts":
/*!*******************************************************************!*\
  !*** ./packages/registry/src/filterBar/useFilterBarUIElements.ts ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ */ "./packages/registry/src/filterBar/index.ts");



const useFilterBarUIElements = ({
  domain,
  listId,
  filterState
}) => {
  const registry = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => new ___WEBPACK_IMPORTED_MODULE_1__["FilterBarUIRegistry"]({
    domain,
    listId
  }), [domain, listId]);
  const {
    getSubscriptions
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => new ___WEBPACK_IMPORTED_MODULE_1__["FilterBarUISubscription"](domain), [domain]);
  const {
    generateElements
  } = registry; // get all subscriptions for the service

  const subscriptions = getSubscriptions({
    listId
  }); // invoke all the subscription callbacks
  // to let them register their UI elements

  Object.values(subscriptions).forEach(({
    callback
  }) => {
    callback({
      listId,
      registry
    });
  });
  const keys = Object.keys(subscriptions).join(':'); // eslint-disable-next-line react-hooks/exhaustive-deps

  return Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => generateElements({
    filterState
  }), [keys]);
};

/* harmony default export */ __webpack_exports__["default"] = (useFilterBarUIElements);

/***/ }),

/***/ "./packages/registry/src/index.ts":
/*!****************************************!*\
  !*** ./packages/registry/src/index.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _entityActionsMenu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./entityActionsMenu */ "./packages/registry/src/entityActionsMenu/index.ts");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _entityActionsMenu__WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _entityActionsMenu__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _entityCardDetails__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./entityCardDetails */ "./packages/registry/src/entityCardDetails/index.ts");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _entityCardDetails__WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _entityCardDetails__WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _entityTable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./entityTable */ "./packages/registry/src/entityTable/index.ts");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _entityTable__WEBPACK_IMPORTED_MODULE_2__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _entityTable__WEBPACK_IMPORTED_MODULE_2__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _filterBar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./filterBar */ "./packages/registry/src/filterBar/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FilterBarUISubscription", function() { return _filterBar__WEBPACK_IMPORTED_MODULE_3__["FilterBarUISubscription"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FilterBarService", function() { return _filterBar__WEBPACK_IMPORTED_MODULE_3__["FilterBarService"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FilterBarUIRegistry", function() { return _filterBar__WEBPACK_IMPORTED_MODULE_3__["FilterBarUIRegistry"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useFilterBarUIElements", function() { return _filterBar__WEBPACK_IMPORTED_MODULE_3__["useFilterBarUIElements"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FilterBarServiceType", function() { return _filterBar__WEBPACK_IMPORTED_MODULE_3__["FilterBarServiceType"]; });

/* harmony import */ var _modals__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modals */ "./packages/registry/src/modals/index.ts");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _modals__WEBPACK_IMPORTED_MODULE_4__) if(["default","FilterBarUISubscription","FilterBarService","FilterBarUIRegistry","useFilterBarUIElements","FilterBarServiceType"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _modals__WEBPACK_IMPORTED_MODULE_4__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _newEntityOptions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./newEntityOptions */ "./packages/registry/src/newEntityOptions/index.ts");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _newEntityOptions__WEBPACK_IMPORTED_MODULE_5__) if(["default","FilterBarUISubscription","FilterBarService","FilterBarUIRegistry","useFilterBarUIElements","FilterBarServiceType"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _newEntityOptions__WEBPACK_IMPORTED_MODULE_5__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _subscription__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./subscription */ "./packages/registry/src/subscription/index.ts");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _subscription__WEBPACK_IMPORTED_MODULE_6__) if(["default","FilterBarUISubscription","FilterBarService","FilterBarUIRegistry","useFilterBarUIElements","FilterBarServiceType"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _subscription__WEBPACK_IMPORTED_MODULE_6__[key]; }) }(__WEBPACK_IMPORT_KEY__));








/***/ }),

/***/ "./packages/registry/src/modals/ModalRegistry.ts":
/*!*******************************************************!*\
  !*** ./packages/registry/src/modals/ModalRegistry.ts ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _subscription__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../subscription */ "./packages/registry/src/subscription/index.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants */ "./packages/registry/src/modals/constants.ts");



/**
 * D: Domain name e.g. "eventEditor"
 * MT: Modal Type: The current modal type e.g. "rem", "editTicket"
 * EP: Element Props: The props of the component that's registerd by the consumer
 */

class ModalRegistry extends _subscription__WEBPACK_IMPORTED_MODULE_1__["UIRegistry"] {
  constructor({
    domain,
    modalType,
    path
  }) {
    super({
      domain,
      service: _constants__WEBPACK_IMPORTED_MODULE_2__["serviceName"],
      path: path || modalType && [modalType]
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(this, "registerContainer", (modalName, container) => {
      this.registerElement(modalName, container);
    });
  }

}

/* harmony default export */ __webpack_exports__["default"] = (ModalRegistry);

/***/ }),

/***/ "./packages/registry/src/modals/ModalSubscription.ts":
/*!***********************************************************!*\
  !*** ./packages/registry/src/modals/ModalSubscription.ts ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _subscription__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../subscription */ "./packages/registry/src/subscription/index.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants */ "./packages/registry/src/modals/constants.ts");




/**
 * D: Domain name e.g. "eventEditor"
 */
class ModalSubscription {
  constructor(domain) {
    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(this, "subscriptionManager", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(this, "subscribe", (...args) => this.subscriptionManager.subscribe(...args));

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(this, "getSubscriptions", args => {
      return Object(_subscription__WEBPACK_IMPORTED_MODULE_1__["filterSubscriptionsByOption"])(this.subscriptionManager.getSubscriptions, 'modalType', args === null || args === void 0 ? void 0 : args.modalType);
    });

    this.subscriptionManager = new _subscription__WEBPACK_IMPORTED_MODULE_1__["SubscriptionManager"]({
      domain,
      service: _constants__WEBPACK_IMPORTED_MODULE_2__["serviceName"]
    });
  }

}

/* harmony default export */ __webpack_exports__["default"] = (ModalSubscription);

/***/ }),

/***/ "./packages/registry/src/modals/constants.ts":
/*!***************************************************!*\
  !*** ./packages/registry/src/modals/constants.ts ***!
  \***************************************************/
/*! exports provided: serviceName */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "serviceName", function() { return serviceName; });
const serviceName = 'modal';

/***/ }),

/***/ "./packages/registry/src/modals/context/GlobalModalProvider.tsx":
/*!**********************************************************************!*\
  !*** ./packages/registry/src/modals/context/GlobalModalProvider.tsx ***!
  \**********************************************************************/
/*! exports provided: GlobalModalContext, GlobalModalProvider, GlobalModalConsumer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GlobalModalContext", function() { return GlobalModalContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GlobalModalProvider", function() { return GlobalModalProvider; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GlobalModalConsumer", function() { return GlobalModalConsumer; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _useGlobalModalManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./useGlobalModalManager */ "./packages/registry/src/modals/context/useGlobalModalManager.ts");


const GlobalModalContext = /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["createContext"])(null);
const {
  Provider,
  Consumer: GlobalModalConsumer
} = GlobalModalContext;

const GlobalModalProvider = ({
  children
}) => {
  const value = Object(_useGlobalModalManager__WEBPACK_IMPORTED_MODULE_1__["default"])();
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Provider, {
    value: value
  }, children);
};



/***/ }),

/***/ "./packages/registry/src/modals/context/index.ts":
/*!*******************************************************!*\
  !*** ./packages/registry/src/modals/context/index.ts ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _useGlobalModal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./useGlobalModal */ "./packages/registry/src/modals/context/useGlobalModal.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useGlobalModal", function() { return _useGlobalModal__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _GlobalModalProvider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GlobalModalProvider */ "./packages/registry/src/modals/context/GlobalModalProvider.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GlobalModalContext", function() { return _GlobalModalProvider__WEBPACK_IMPORTED_MODULE_1__["GlobalModalContext"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GlobalModalProvider", function() { return _GlobalModalProvider__WEBPACK_IMPORTED_MODULE_1__["GlobalModalProvider"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GlobalModalConsumer", function() { return _GlobalModalProvider__WEBPACK_IMPORTED_MODULE_1__["GlobalModalConsumer"]; });

/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./types */ "./packages/registry/src/modals/context/types.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _types__WEBPACK_IMPORTED_MODULE_2__) if(["default","useGlobalModal","GlobalModalContext","GlobalModalProvider","GlobalModalConsumer"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _types__WEBPACK_IMPORTED_MODULE_2__[key]; }) }(__WEBPACK_IMPORT_KEY__));




/***/ }),

/***/ "./packages/registry/src/modals/context/reducer.ts":
/*!*********************************************************!*\
  !*** ./packages/registry/src/modals/context/reducer.ts ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ramda */ "./node_modules/ramda/src/index.mjs");


const reducer = (prevState, action) => {
  const {
    data,
    type,
    modalName
  } = action;

  switch (type) {
    case 'OPEN_MODAL':
      return Object(ramda__WEBPACK_IMPORTED_MODULE_0__["assocPath"])([modalName, 'isOpen'], true, prevState);

    case 'CLOSE_MODAL':
      return Object(ramda__WEBPACK_IMPORTED_MODULE_0__["assocPath"])([modalName, 'isOpen'], false, prevState);

    case 'SET_MODAL_DATA':
      return Object(ramda__WEBPACK_IMPORTED_MODULE_0__["assocPath"])([modalName, 'data'], data, prevState);

    default:
      throw new Error('Unexpected action');
  }
};

/* harmony default export */ __webpack_exports__["default"] = (reducer);

/***/ }),

/***/ "./packages/registry/src/modals/context/types.ts":
/*!*******************************************************!*\
  !*** ./packages/registry/src/modals/context/types.ts ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./packages/registry/src/modals/context/useGlobalModal.ts":
/*!****************************************************************!*\
  !*** ./packages/registry/src/modals/context/useGlobalModal.ts ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _useGlobalModalContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./useGlobalModalContext */ "./packages/registry/src/modals/context/useGlobalModalContext.ts");



const useGlobalModal = name => {
  const modalContext = Object(_useGlobalModalContext__WEBPACK_IMPORTED_MODULE_1__["default"])();
  const {
    closeModal,
    getModalData,
    isModalOpen,
    openModal,
    openModalWithData,
    setModalData
  } = modalContext;
  const close = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(() => closeModal(name), [closeModal, name]);
  const getData = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(() => getModalData(name), [getModalData, name]);
  const isOpen = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => isModalOpen(name), [name, isModalOpen]);
  const open = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(() => openModal(name), [name, openModal]);
  const openWithData = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(data => openModalWithData(name, data), [name, openModalWithData]);
  const setData = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(data => setModalData(name, data), [name, setModalData]);
  return Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => ({
    close,
    getData,
    isOpen,
    open,
    openWithData,
    setData
  }), [close, getData, isOpen, open, openWithData, setData]);
};

/* harmony default export */ __webpack_exports__["default"] = (useGlobalModal);

/***/ }),

/***/ "./packages/registry/src/modals/context/useGlobalModalContext.ts":
/*!***********************************************************************!*\
  !*** ./packages/registry/src/modals/context/useGlobalModalContext.ts ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _GlobalModalProvider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GlobalModalProvider */ "./packages/registry/src/modals/context/GlobalModalProvider.tsx");



const useGlobalModalContext = () => {
  return Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_GlobalModalProvider__WEBPACK_IMPORTED_MODULE_1__["GlobalModalContext"]);
};

/* harmony default export */ __webpack_exports__["default"] = (useGlobalModalContext);

/***/ }),

/***/ "./packages/registry/src/modals/context/useGlobalModalManager.ts":
/*!***********************************************************************!*\
  !*** ./packages/registry/src/modals/context/useGlobalModalManager.ts ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _reducer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./reducer */ "./packages/registry/src/modals/context/reducer.ts");


const INITIAL_STATE = {};

const useGlobalModalManager = () => {
  const [state, dispatch] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useReducer"])(_reducer__WEBPACK_IMPORTED_MODULE_1__["default"], INITIAL_STATE);
  const closeModal = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(modalName => {
    document.body.classList.remove('ee-modal-open');
    dispatch({
      type: 'CLOSE_MODAL',
      modalName
    });
  }, []);
  const stateStr = JSON.stringify(state);
  const getData = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(() => {
    return state;
  }, // eslint-disable-next-line react-hooks/exhaustive-deps
  [stateStr]);
  const getModalData = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(modalName => {
    var _state$modalName;

    return ((_state$modalName = state[modalName]) === null || _state$modalName === void 0 ? void 0 : _state$modalName.data) || {};
  }, // eslint-disable-next-line react-hooks/exhaustive-deps
  [stateStr]);
  const isModalOpen = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(modalName => {
    var _state$modalName2;

    return Boolean((_state$modalName2 = state[modalName]) === null || _state$modalName2 === void 0 ? void 0 : _state$modalName2.isOpen);
  }, // eslint-disable-next-line react-hooks/exhaustive-deps
  [stateStr]);
  const openModal = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(modalName => {
    dispatch({
      type: 'OPEN_MODAL',
      modalName
    });
    document.body.classList.add('ee-modal-open');
  }, []);
  const openModalWithData = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])((modalName, data) => {
    dispatch({
      type: 'SET_MODAL_DATA',
      modalName,
      data
    });
    dispatch({
      type: 'OPEN_MODAL',
      modalName
    });
    document.body.classList.add('ee-modal-open');
  }, []);
  const setModalData = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])((modalName, data) => {
    dispatch({
      type: 'SET_MODAL_DATA',
      modalName,
      data
    });
  }, []);
  return Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => ({
    closeModal,
    getData,
    getModalData,
    isModalOpen,
    openModal,
    openModalWithData,
    setModalData
  }), [closeModal, getData, getModalData, isModalOpen, openModal, openModalWithData, setModalData]);
};

/* harmony default export */ __webpack_exports__["default"] = (useGlobalModalManager);

/***/ }),

/***/ "./packages/registry/src/modals/index.ts":
/*!***********************************************!*\
  !*** ./packages/registry/src/modals/index.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ModalRegistry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ModalRegistry */ "./packages/registry/src/modals/ModalRegistry.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ModalRegistry", function() { return _ModalRegistry__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _ModalSubscription__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ModalSubscription */ "./packages/registry/src/modals/ModalSubscription.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ModalSubscription", function() { return _ModalSubscription__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./context */ "./packages/registry/src/modals/context/index.ts");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _context__WEBPACK_IMPORTED_MODULE_2__) if(["default","ModalRegistry","ModalSubscription"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _context__WEBPACK_IMPORTED_MODULE_2__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./types */ "./packages/registry/src/modals/types.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _types__WEBPACK_IMPORTED_MODULE_3__) if(["default","ModalRegistry","ModalSubscription"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _types__WEBPACK_IMPORTED_MODULE_3__[key]; }) }(__WEBPACK_IMPORT_KEY__));





/***/ }),

/***/ "./packages/registry/src/modals/types.ts":
/*!***********************************************!*\
  !*** ./packages/registry/src/modals/types.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./packages/registry/src/newEntityOptions/NewEntityOptionsRegistry.ts":
/*!****************************************************************************!*\
  !*** ./packages/registry/src/newEntityOptions/NewEntityOptionsRegistry.ts ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _subscription__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../subscription */ "./packages/registry/src/subscription/index.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./packages/registry/src/newEntityOptions/constants.ts");


/**
 * D: Domain name e.g. "eventEditor"
 * ET: Entity Type: The current entity type e.g. "datetime", "ticket"
 * EP: Element Props: The props of the component that's registerd by the consumer
 */

class NewEntityOptionsRegistry extends _subscription__WEBPACK_IMPORTED_MODULE_0__["UIRegistry"] {
  constructor({
    domain,
    entityType,
    path
  }) {
    super({
      domain,
      service: _constants__WEBPACK_IMPORTED_MODULE_1__["serviceName"],
      path: path || entityType && [entityType]
    });
  }

}

/* harmony default export */ __webpack_exports__["default"] = (NewEntityOptionsRegistry);

/***/ }),

/***/ "./packages/registry/src/newEntityOptions/NewEntitySubscription.ts":
/*!*************************************************************************!*\
  !*** ./packages/registry/src/newEntityOptions/NewEntitySubscription.ts ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _subscription__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../subscription */ "./packages/registry/src/subscription/index.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants */ "./packages/registry/src/newEntityOptions/constants.ts");




/**
 * D: Domain name e.g. "eventEditor"
 */
class NewEntitySubscription {
  constructor(domain) {
    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(this, "subscriptionManager", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(this, "subscribe", (...args) => this.subscriptionManager.subscribe(...args));

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(this, "getSubscriptions", args => {
      return Object(_subscription__WEBPACK_IMPORTED_MODULE_1__["filterSubscriptionsByOption"])(this.subscriptionManager.getSubscriptions, 'entityType', args === null || args === void 0 ? void 0 : args.entityType);
    });

    this.subscriptionManager = new _subscription__WEBPACK_IMPORTED_MODULE_1__["SubscriptionManager"]({
      domain,
      service: _constants__WEBPACK_IMPORTED_MODULE_2__["serviceName"]
    });
  }

}

/* harmony default export */ __webpack_exports__["default"] = (NewEntitySubscription);

/***/ }),

/***/ "./packages/registry/src/newEntityOptions/constants.ts":
/*!*************************************************************!*\
  !*** ./packages/registry/src/newEntityOptions/constants.ts ***!
  \*************************************************************/
/*! exports provided: serviceName */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "serviceName", function() { return serviceName; });
const serviceName = 'newEntityOptions';

/***/ }),

/***/ "./packages/registry/src/newEntityOptions/index.ts":
/*!*********************************************************!*\
  !*** ./packages/registry/src/newEntityOptions/index.ts ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _NewEntityOptionsRegistry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NewEntityOptionsRegistry */ "./packages/registry/src/newEntityOptions/NewEntityOptionsRegistry.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NewEntityOptionsRegistry", function() { return _NewEntityOptionsRegistry__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _NewEntitySubscription__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NewEntitySubscription */ "./packages/registry/src/newEntityOptions/NewEntitySubscription.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NewEntitySubscription", function() { return _NewEntitySubscription__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./types */ "./packages/registry/src/newEntityOptions/types.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _types__WEBPACK_IMPORTED_MODULE_2__) if(["default","NewEntityOptionsRegistry","NewEntitySubscription"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _types__WEBPACK_IMPORTED_MODULE_2__[key]; }) }(__WEBPACK_IMPORT_KEY__));




/***/ }),

/***/ "./packages/registry/src/newEntityOptions/types.ts":
/*!*********************************************************!*\
  !*** ./packages/registry/src/newEntityOptions/types.ts ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./packages/registry/src/subscription/SubscriptionManager.ts":
/*!*******************************************************************!*\
  !*** ./packages/registry/src/subscription/SubscriptionManager.ts ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ramda */ "./node_modules/ramda/src/index.mjs");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/index.js");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(uuid__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var invariant__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! invariant */ "./node_modules/invariant/invariant.js");
/* harmony import */ var invariant__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(invariant__WEBPACK_IMPORTED_MODULE_3__);





/**
 * D: Domain name e.g. "eventEditor"
 * S: Name of the service provided by the domain e.g. "entityActions"
 * SR: Custom Service Registry structure created by the consumer which may contain additional properties/ methods
 */
class SubscriptionManager {
  constructor(_options) {
    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(this, "options", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(this, "subscribe", (callback, options) => {
      invariant__WEBPACK_IMPORTED_MODULE_3___default()(typeof callback === 'function', 'subscribe `callback` must be a function');
      const subscriptionId = Object(uuid__WEBPACK_IMPORTED_MODULE_2__["v4"])();
      this.updateSubscription({
        id: subscriptionId,
        callback,
        options,
        action: 'add'
      }); // to unsubscribe

      return () => {
        this.updateSubscription({
          id: subscriptionId,
          action: 'remove'
        });
      };
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(this, "getSubscriptions", () => {
      return this.getServiceRegistryItem('subscriptions', {});
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(this, "getServiceRegistryItem", (key, defaultValue) => {
      return Object(ramda__WEBPACK_IMPORTED_MODULE_1__["pathOr"])(defaultValue, [this.options.domain, this.options.service, key], SubscriptionManager.subscriptionRegistry);
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(this, "addToServiceRegistry", (key, value) => {
      this.updateServiceRegistry(key, value);
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(this, "updateSubscription", ({
      id,
      callback,
      options,
      action
    }) => {
      const subscriptions = this.getSubscriptions();
      const newSubscriptions = action === 'add' ? { ...subscriptions,
        [id]: {
          callback,
          options
        }
      } : Object(ramda__WEBPACK_IMPORTED_MODULE_1__["omit"])([id], subscriptions);
      this.updateServiceRegistry('subscriptions', newSubscriptions);
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(this, "updateServiceRegistry", (key, value) => {
      SubscriptionManager.subscriptionRegistry = Object(ramda__WEBPACK_IMPORTED_MODULE_1__["assocPath"])([this.options.domain, this.options.service, key], value, SubscriptionManager.subscriptionRegistry);
    });

    this.options = _options;
  }

}

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(SubscriptionManager, "subscriptionRegistry", {});

/* harmony default export */ __webpack_exports__["default"] = (SubscriptionManager);

/***/ }),

/***/ "./packages/registry/src/subscription/UIRegistry.tsx":
/*!***********************************************************!*\
  !*** ./packages/registry/src/subscription/UIRegistry.tsx ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/extends.js");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ramda */ "./node_modules/ramda/src/index.mjs");





/**
 * EP: Element Props: The props of the component that's registerd by the consumer
 * D: Domain name e.g. "eventEditor"
 * S: Name of the service provided by the domain e.g. "entityActions"
 */
class UIRegistry {
  constructor(options) {
    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(this, "options", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(this, "pathToElements", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(this, "pathToElementsStr", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(this, "registeredElements", {});

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(this, "getRegistrationKey", (elementKey, priority) => {
      return `${this.pathToElementsStr}:${elementKey}:${priority}`;
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(this, "updateRegisteredElements", (registrationKey, action) => {
      this.registeredElements = action === 'add' ? Object(ramda__WEBPACK_IMPORTED_MODULE_3__["assocPath"])([registrationKey], true, this.registeredElements) : Object(ramda__WEBPACK_IMPORTED_MODULE_3__["dissocPath"])([registrationKey], this.registeredElements);
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(this, "registerElement", (key, component, priority = 10) => {
      const registrationKey = this.getRegistrationKey(key, priority);

      if (!(registrationKey in this.registeredElements)) {
        // Add the element to registered elements
        this.updateRegisteredElements(registrationKey, 'add'); // Add the element(may be JSX) to the registry

        UIRegistry.elementRegistry = Object(ramda__WEBPACK_IMPORTED_MODULE_3__["assocPath"])([...this.pathToElements, priority, key], component, UIRegistry.elementRegistry);
      }
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(this, "unRegisterElement", (key, priority = 10) => {
      const registrationKey = this.getRegistrationKey(key, priority);

      if (registrationKey in this.registeredElements) {
        // Remove the element from registered elements
        this.updateRegisteredElements(registrationKey, 'remove');
      } // Remove the element from registry


      UIRegistry.elementRegistry = Object(ramda__WEBPACK_IMPORTED_MODULE_3__["dissocPath"])([...this.pathToElements, priority, key], UIRegistry.elementRegistry);
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(this, "getElements", () => {
      /**
       * This list is of this shape:
       * [
       *     9: {
       *         datetimesToShow: () => null,
       *     },
       *     10: {
       *         sortBy: () => null,
       *     },
       * ]
       */
      const elementsWithPriority = Object(ramda__WEBPACK_IMPORTED_MODULE_3__["pathOr"])([], this.pathToElements, UIRegistry.elementRegistry);
      return Object.assign({}, ...elementsWithPriority);
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(this, "generateElements", props => {
      const elements = Object.entries(this.getElements());
      const total = elements.length;
      return elements.map(([itemKey, Component], i) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(Component, _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({
        key: itemKey + i,
        totalCount: total
      }, props)));
    });

    this.options = options;
    this.pathToElements = [this.options.domain, this.options.service, ...(this.options.path || [])];
    this.pathToElementsStr = this.pathToElements.join(':');
  }

}

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(UIRegistry, "elementRegistry", {});

/* harmony default export */ __webpack_exports__["default"] = (UIRegistry);

/***/ }),

/***/ "./packages/registry/src/subscription/index.ts":
/*!*****************************************************!*\
  !*** ./packages/registry/src/subscription/index.ts ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SubscriptionManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SubscriptionManager */ "./packages/registry/src/subscription/SubscriptionManager.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SubscriptionManager", function() { return _SubscriptionManager__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _UIRegistry__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UIRegistry */ "./packages/registry/src/subscription/UIRegistry.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UIRegistry", function() { return _UIRegistry__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./types */ "./packages/registry/src/subscription/types.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _types__WEBPACK_IMPORTED_MODULE_2__) if(["default","SubscriptionManager","UIRegistry"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _types__WEBPACK_IMPORTED_MODULE_2__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils */ "./packages/registry/src/subscription/utils.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "filterSubscriptionsByOption", function() { return _utils__WEBPACK_IMPORTED_MODULE_3__["filterSubscriptionsByOption"]; });






/***/ }),

/***/ "./packages/registry/src/subscription/types.ts":
/*!*****************************************************!*\
  !*** ./packages/registry/src/subscription/types.ts ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./packages/registry/src/subscription/utils.ts":
/*!*****************************************************!*\
  !*** ./packages/registry/src/subscription/utils.ts ***!
  \*****************************************************/
/*! exports provided: filterSubscriptionsByOption */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "filterSubscriptionsByOption", function() { return filterSubscriptionsByOption; });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ramda */ "./node_modules/ramda/src/index.mjs");

const filterSubscriptionsByOption = (getSubscriptions, option, value) => {
  const isOptionEqual = Object(ramda__WEBPACK_IMPORTED_MODULE_0__["pathEq"])(['options', option], value);
  return value ? Object(ramda__WEBPACK_IMPORTED_MODULE_0__["filter"])(isOptionEqual, getSubscriptions()) : getSubscriptions();
};

/***/ }),

/***/ 12:
/*!**********************************************!*\
  !*** multi ./packages/registry/src/index.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /var/www/dev.test/wp-content/plugins/barista/packages/registry/src/index.ts */"./packages/registry/src/index.ts");


/***/ }),

/***/ "react":
/*!*********************************!*\
  !*** external {"this":"React"} ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = this["React"]; }());

/***/ })

/******/ });
//# sourceMappingURL=registry.bundle.js.map