this["eventespresso"] = this["eventespresso"] || {}; this["eventespresso"]["wpPluginsPage"] =
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
/******/ 			var chunkId = "wpPluginsPage";
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
/******/ 	return hotCreateRequire(24)(__webpack_require__.s = 24);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./domains/wpPluginsPage/src/exitSurvey/ExitSurvey.tsx":
/*!*************************************************************!*\
  !*** ./domains/wpPluginsPage/src/exitSurvey/ExitSurvey.tsx ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Popup__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Popup */ "./domains/wpPluginsPage/src/exitSurvey/Popup.tsx");
/* harmony import */ var _ExitSurveyModal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ExitSurveyModal */ "./domains/wpPluginsPage/src/exitSurvey/ExitSurveyModal.tsx");
/* harmony import */ var _chakra_ui_hooks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @chakra-ui/hooks */ "./node_modules/@chakra-ui/hooks/dist/cjs/index.js");
/* harmony import */ var _chakra_ui_hooks__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_chakra_ui_hooks__WEBPACK_IMPORTED_MODULE_3__);





const ExitSurvey = ({
  deactivationUrl
}) => {
  const {
    isOpen,
    onClose,
    onOpen
  } = Object(_chakra_ui_hooks__WEBPACK_IMPORTED_MODULE_3__["useDisclosure"])();
  const deactivatePlugin = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(() => {
    window.location.href = deactivationUrl;
  }, [deactivationUrl]);
  const onSubmit = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(() => {
    // close modal
    onClose(); // deactivate the plugin

    deactivatePlugin();
  }, [deactivatePlugin, onClose]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Popup__WEBPACK_IMPORTED_MODULE_1__["default"], {
    onOk: onOpen,
    onSkip: deactivatePlugin
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ExitSurveyModal__WEBPACK_IMPORTED_MODULE_2__["default"], {
    isOpen: isOpen,
    onSubmit: onSubmit
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (ExitSurvey);

/***/ }),

/***/ "./domains/wpPluginsPage/src/exitSurvey/ExitSurveyContent.tsx":
/*!********************************************************************!*\
  !*** ./domains/wpPluginsPage/src/exitSurvey/ExitSurveyContent.tsx ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _typeform_embed__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @typeform/embed */ "./node_modules/@typeform/embed/build/lib.pure.js");
/* harmony import */ var _typeform_embed__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_typeform_embed__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./styles.scss */ "./domains/wpPluginsPage/src/exitSurvey/styles.scss");
var _window, _window$eventEspresso, _window$eventEspresso2;




const info = (_window = window) === null || _window === void 0 ? void 0 : (_window$eventEspresso = _window.eventEspressoData) === null || _window$eventEspresso === void 0 ? void 0 : (_window$eventEspresso2 = _window$eventEspresso.wpPluginsPage) === null || _window$eventEspresso2 === void 0 ? void 0 : _window$eventEspresso2.eeExitSurveyInfo;

const ExitSurveyContent = ({
  onSubmit
}) => {
  const typeFormEl = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])();
  const typeFormUrl = info === null || info === void 0 ? void 0 : info.typeFormUrl;
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    _typeform_embed__WEBPACK_IMPORTED_MODULE_1__["makeWidget"](typeFormEl.current, typeFormUrl, {
      onSubmit: function () {
        onSubmit();
      },
      hideScrollbars: true
    });
  }, [onSubmit, typeFormUrl]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    ref: typeFormEl
  });
};

/* harmony default export */ __webpack_exports__["default"] = (ExitSurveyContent);

/***/ }),

/***/ "./domains/wpPluginsPage/src/exitSurvey/ExitSurveyModal.tsx":
/*!******************************************************************!*\
  !*** ./domains/wpPluginsPage/src/exitSurvey/ExitSurveyModal.tsx ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ExitSurveyContent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ExitSurveyContent */ "./domains/wpPluginsPage/src/exitSurvey/ExitSurveyContent.tsx");
/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./styles.scss */ "./domains/wpPluginsPage/src/exitSurvey/styles.scss");





const ExitSurveyModal = ({
  onSubmit,
  isOpen
}) => {
  return isOpen && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__["Modal"], {
    className: "ee-exit-modal__body",
    isDismissible: false,
    onRequestClose: onSubmit,
    overlayClassName: "ee-exit-modal__overlay",
    shouldCloseOnClickOutside: false,
    shouldCloseOnEsc: false,
    title: null
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ExitSurveyContent__WEBPACK_IMPORTED_MODULE_2__["default"], {
    onSubmit: onSubmit
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (ExitSurveyModal);

/***/ }),

/***/ "./domains/wpPluginsPage/src/exitSurvey/Popup.tsx":
/*!********************************************************!*\
  !*** ./domains/wpPluginsPage/src/exitSurvey/Popup.tsx ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _chakra_ui_hooks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @chakra-ui/hooks */ "./node_modules/@chakra-ui/hooks/dist/cjs/index.js");
/* harmony import */ var _chakra_ui_hooks__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_chakra_ui_hooks__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @eventespresso/i18n */ "@eventespresso/i18n");
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_3__);





const Popup = ({
  onOk,
  onSkip
}) => {
  const {
    isOpen,
    onClose
  } = Object(_chakra_ui_hooks__WEBPACK_IMPORTED_MODULE_2__["useDisclosure"])({
    defaultIsOpen: true
  });
  const onOkHandler = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(() => {
    if (typeof onOk === 'function') {
      onOk();
    }

    onClose();
  }, [onOk, onClose]);
  const onSkipHandler = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(() => {
    if (typeof onSkip === 'function') {
      onSkip();
    }

    onClose();
  }, [onClose, onSkip]);

  const title = Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_3__["__"])('Do you have a moment to share why you are deactivating Event Espresso?');

  return isOpen && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__["Modal"], {
    isDismissible: false,
    onRequestClose: onClose,
    shouldCloseOnClickOutside: false,
    shouldCloseOnEsc: false,
    title: title
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    onClick: onSkipHandler
  }, Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_3__["__"])('Skip')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    isPrimary: true,
    onClick: onOkHandler
  }, Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_3__["__"])("Sure I'll help")));
};

/* harmony default export */ __webpack_exports__["default"] = (Popup);

/***/ }),

/***/ "./domains/wpPluginsPage/src/exitSurvey/index.tsx":
/*!********************************************************!*\
  !*** ./domains/wpPluginsPage/src/exitSurvey/index.tsx ***!
  \********************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ExitSurvey__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ExitSurvey */ "./domains/wpPluginsPage/src/exitSurvey/ExitSurvey.tsx");
/* harmony import */ var _packages_utils_src_dom_renderDomElement__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../packages/utils/src/dom/renderDomElement */ "./packages/utils/src/dom/renderDomElement.ts");
var _window, _window$eventEspresso, _window$eventEspresso2;



 // avoid loading whole services package


const info = (_window = window) === null || _window === void 0 ? void 0 : (_window$eventEspresso = _window.eventEspressoData) === null || _window$eventEspresso === void 0 ? void 0 : (_window$eventEspresso2 = _window$eventEspresso.wpPluginsPage) === null || _window$eventEspresso2 === void 0 ? void 0 : _window$eventEspresso2.eeExitSurveyInfo;
/**
 * Handler for deactivation trigger
 */

const handleDeactivationClick = (e, el) => {
  e.preventDefault();
  const url = jquery__WEBPACK_IMPORTED_MODULE_1___default()(el).attr('href');
  Object(_packages_utils_src_dom_renderDomElement__WEBPACK_IMPORTED_MODULE_3__["default"])({
    appendToTarget: false,
    domElementToRender: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ExitSurvey__WEBPACK_IMPORTED_MODULE_2__["default"], {
      deactivationUrl: url
    }),
    containerID: 'ee-exit-survey-modal',
    targetElementID: 'wpfooter'
  });
};
/**
 * EE caffeinated click capture but only if feature is active
 */


if (info === null || info === void 0 ? void 0 : info.isModalActive) {
  // register event handlers on document ready
  jquery__WEBPACK_IMPORTED_MODULE_1___default()(() => {
    jquery__WEBPACK_IMPORTED_MODULE_1___default()('tr[data-slug="event-espresso"]').on('click', 'span.deactivate > a', function (e) {
      e.preventDefault();
      handleDeactivationClick(e, this);
    });
    /**
     * EE decaf click capture.
     */

    jquery__WEBPACK_IMPORTED_MODULE_1___default()('tr[data-slug="event-espresso-decaf"]').on('click', 'span.deactivate > a', function (e) {
      handleDeactivationClick(e, this);
    });
  });
}

/***/ }),

/***/ "./domains/wpPluginsPage/src/exitSurvey/styles.scss":
/*!**********************************************************!*\
  !*** ./domains/wpPluginsPage/src/exitSurvey/styles.scss ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ref_6_oneOf_5_1_node_modules_postcss_loader_src_index_js_postcss_node_modules_resolve_url_loader_index_js_ref_6_oneOf_5_3_node_modules_sass_loader_dist_cjs_js_ref_6_oneOf_5_4_styles_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-5-1!../../../../node_modules/postcss-loader/src??postcss!../../../../node_modules/resolve-url-loader??ref--6-oneOf-5-3!../../../../node_modules/sass-loader/dist/cjs.js??ref--6-oneOf-5-4!./styles.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./node_modules/resolve-url-loader/index.js?!./node_modules/sass-loader/dist/cjs.js?!./domains/wpPluginsPage/src/exitSurvey/styles.scss");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_5_1_node_modules_postcss_loader_src_index_js_postcss_node_modules_resolve_url_loader_index_js_ref_6_oneOf_5_3_node_modules_sass_loader_dist_cjs_js_ref_6_oneOf_5_4_styles_scss__WEBPACK_IMPORTED_MODULE_1__["default"], options);


if (true) {
  if (!_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_5_1_node_modules_postcss_loader_src_index_js_postcss_node_modules_resolve_url_loader_index_js_ref_6_oneOf_5_3_node_modules_sass_loader_dist_cjs_js_ref_6_oneOf_5_4_styles_scss__WEBPACK_IMPORTED_MODULE_1__["default"].locals || module.hot.invalidate) {
    var isEqualLocals = function isEqualLocals(a, b, isNamedExport) {
  if (!a && b || a && !b) {
    return false;
  }

  var p;

  for (p in a) {
    if (isNamedExport && p === 'default') {
      // eslint-disable-next-line no-continue
      continue;
    }

    if (a[p] !== b[p]) {
      return false;
    }
  }

  for (p in b) {
    if (isNamedExport && p === 'default') {
      // eslint-disable-next-line no-continue
      continue;
    }

    if (!a[p]) {
      return false;
    }
  }

  return true;
};
    var oldLocals = _node_modules_css_loader_dist_cjs_js_ref_6_oneOf_5_1_node_modules_postcss_loader_src_index_js_postcss_node_modules_resolve_url_loader_index_js_ref_6_oneOf_5_3_node_modules_sass_loader_dist_cjs_js_ref_6_oneOf_5_4_styles_scss__WEBPACK_IMPORTED_MODULE_1__["default"].locals;

    module.hot.accept(
      /*! !../../../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-5-1!../../../../node_modules/postcss-loader/src??postcss!../../../../node_modules/resolve-url-loader??ref--6-oneOf-5-3!../../../../node_modules/sass-loader/dist/cjs.js??ref--6-oneOf-5-4!./styles.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./node_modules/resolve-url-loader/index.js?!./node_modules/sass-loader/dist/cjs.js?!./domains/wpPluginsPage/src/exitSurvey/styles.scss",
      function(__WEBPACK_OUTDATED_DEPENDENCIES__) { /* harmony import */ _node_modules_css_loader_dist_cjs_js_ref_6_oneOf_5_1_node_modules_postcss_loader_src_index_js_postcss_node_modules_resolve_url_loader_index_js_ref_6_oneOf_5_3_node_modules_sass_loader_dist_cjs_js_ref_6_oneOf_5_4_styles_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-5-1!../../../../node_modules/postcss-loader/src??postcss!../../../../node_modules/resolve-url-loader??ref--6-oneOf-5-3!../../../../node_modules/sass-loader/dist/cjs.js??ref--6-oneOf-5-4!./styles.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./node_modules/resolve-url-loader/index.js?!./node_modules/sass-loader/dist/cjs.js?!./domains/wpPluginsPage/src/exitSurvey/styles.scss");
(function () {
        if (!isEqualLocals(oldLocals, _node_modules_css_loader_dist_cjs_js_ref_6_oneOf_5_1_node_modules_postcss_loader_src_index_js_postcss_node_modules_resolve_url_loader_index_js_ref_6_oneOf_5_3_node_modules_sass_loader_dist_cjs_js_ref_6_oneOf_5_4_styles_scss__WEBPACK_IMPORTED_MODULE_1__["default"].locals, undefined)) {
                module.hot.invalidate();

                return;
              }

              oldLocals = _node_modules_css_loader_dist_cjs_js_ref_6_oneOf_5_1_node_modules_postcss_loader_src_index_js_postcss_node_modules_resolve_url_loader_index_js_ref_6_oneOf_5_3_node_modules_sass_loader_dist_cjs_js_ref_6_oneOf_5_4_styles_scss__WEBPACK_IMPORTED_MODULE_1__["default"].locals;

              update(_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_5_1_node_modules_postcss_loader_src_index_js_postcss_node_modules_resolve_url_loader_index_js_ref_6_oneOf_5_3_node_modules_sass_loader_dist_cjs_js_ref_6_oneOf_5_4_styles_scss__WEBPACK_IMPORTED_MODULE_1__["default"]);
      })(__WEBPACK_OUTDATED_DEPENDENCIES__); }.bind(this)
    )
  }

  module.hot.dispose(function() {
    update();
  });
}

/* harmony default export */ __webpack_exports__["default"] = (_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_5_1_node_modules_postcss_loader_src_index_js_postcss_node_modules_resolve_url_loader_index_js_ref_6_oneOf_5_3_node_modules_sass_loader_dist_cjs_js_ref_6_oneOf_5_4_styles_scss__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./domains/wpPluginsPage/src/index.ts":
/*!********************************************!*\
  !*** ./domains/wpPluginsPage/src/index.ts ***!
  \********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../types */ "./types/index.ts");
/* harmony import */ var _exitSurvey__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./exitSurvey */ "./domains/wpPluginsPage/src/exitSurvey/index.tsx");
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./style.css */ "./domains/wpPluginsPage/src/style.css");
 // import global types.




jquery__WEBPACK_IMPORTED_MODULE_0___default()(() => {
  if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('tr.ee-upsell-plugin-list-table').length > 0) {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('tr[data-slug="event-espresso"],tr[data-slug="event-espresso-decaf"]').addClass('update');
  }
});

/***/ }),

/***/ "./domains/wpPluginsPage/src/style.css":
/*!*********************************************!*\
  !*** ./domains/wpPluginsPage/src/style.css ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ref_6_oneOf_3_1_node_modules_postcss_loader_src_index_js_postcss_style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-3-1!../../../node_modules/postcss-loader/src??postcss!./style.css */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./domains/wpPluginsPage/src/style.css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_3_1_node_modules_postcss_loader_src_index_js_postcss_style_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);


if (true) {
  if (!_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_3_1_node_modules_postcss_loader_src_index_js_postcss_style_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || module.hot.invalidate) {
    var isEqualLocals = function isEqualLocals(a, b, isNamedExport) {
  if (!a && b || a && !b) {
    return false;
  }

  var p;

  for (p in a) {
    if (isNamedExport && p === 'default') {
      // eslint-disable-next-line no-continue
      continue;
    }

    if (a[p] !== b[p]) {
      return false;
    }
  }

  for (p in b) {
    if (isNamedExport && p === 'default') {
      // eslint-disable-next-line no-continue
      continue;
    }

    if (!a[p]) {
      return false;
    }
  }

  return true;
};
    var oldLocals = _node_modules_css_loader_dist_cjs_js_ref_6_oneOf_3_1_node_modules_postcss_loader_src_index_js_postcss_style_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals;

    module.hot.accept(
      /*! !../../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-3-1!../../../node_modules/postcss-loader/src??postcss!./style.css */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./domains/wpPluginsPage/src/style.css",
      function(__WEBPACK_OUTDATED_DEPENDENCIES__) { /* harmony import */ _node_modules_css_loader_dist_cjs_js_ref_6_oneOf_3_1_node_modules_postcss_loader_src_index_js_postcss_style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-3-1!../../../node_modules/postcss-loader/src??postcss!./style.css */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./domains/wpPluginsPage/src/style.css");
(function () {
        if (!isEqualLocals(oldLocals, _node_modules_css_loader_dist_cjs_js_ref_6_oneOf_3_1_node_modules_postcss_loader_src_index_js_postcss_style_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals, undefined)) {
                module.hot.invalidate();

                return;
              }

              oldLocals = _node_modules_css_loader_dist_cjs_js_ref_6_oneOf_3_1_node_modules_postcss_loader_src_index_js_postcss_style_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals;

              update(_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_3_1_node_modules_postcss_loader_src_index_js_postcss_style_css__WEBPACK_IMPORTED_MODULE_1__["default"]);
      })(__WEBPACK_OUTDATED_DEPENDENCIES__); }.bind(this)
    )
  }

  module.hot.dispose(function() {
    update();
  });
}

/* harmony default export */ __webpack_exports__["default"] = (_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_3_1_node_modules_postcss_loader_src_index_js_postcss_style_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./node_modules/@chakra-ui/hooks/dist/cjs/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/@chakra-ui/hooks/dist/cjs/index.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _useClipboard = __webpack_require__(/*! ./use-clipboard */ "./node_modules/@chakra-ui/hooks/dist/cjs/use-clipboard.js");

Object.keys(_useClipboard).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  exports[key] = _useClipboard[key];
});

var _useControllable = __webpack_require__(/*! ./use-controllable */ "./node_modules/@chakra-ui/hooks/dist/cjs/use-controllable.js");

Object.keys(_useControllable).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  exports[key] = _useControllable[key];
});

var _useDisclosure = __webpack_require__(/*! ./use-disclosure */ "./node_modules/@chakra-ui/hooks/dist/cjs/use-disclosure.js");

Object.keys(_useDisclosure).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  exports[key] = _useDisclosure[key];
});

var _useFocusEffect = __webpack_require__(/*! ./use-focus-effect */ "./node_modules/@chakra-ui/hooks/dist/cjs/use-focus-effect.js");

Object.keys(_useFocusEffect).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  exports[key] = _useFocusEffect[key];
});

var _useId = __webpack_require__(/*! ./use-id */ "./node_modules/@chakra-ui/hooks/dist/cjs/use-id.js");

Object.keys(_useId).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  exports[key] = _useId[key];
});

var _useInterval = __webpack_require__(/*! ./use-interval */ "./node_modules/@chakra-ui/hooks/dist/cjs/use-interval.js");

Object.keys(_useInterval).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  exports[key] = _useInterval[key];
});

var _useSafeLayoutEffect = __webpack_require__(/*! ./use-safe-layout-effect */ "./node_modules/@chakra-ui/hooks/dist/cjs/use-safe-layout-effect.js");

Object.keys(_useSafeLayoutEffect).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  exports[key] = _useSafeLayoutEffect[key];
});

var _useLockBodyScroll = __webpack_require__(/*! ./use-lock-body-scroll */ "./node_modules/@chakra-ui/hooks/dist/cjs/use-lock-body-scroll.js");

Object.keys(_useLockBodyScroll).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  exports[key] = _useLockBodyScroll[key];
});

var _useLogger = __webpack_require__(/*! ./use-logger */ "./node_modules/@chakra-ui/hooks/dist/cjs/use-logger.js");

Object.keys(_useLogger).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  exports[key] = _useLogger[key];
});

var _useMergeRefs = __webpack_require__(/*! ./use-merge-refs */ "./node_modules/@chakra-ui/hooks/dist/cjs/use-merge-refs.js");

Object.keys(_useMergeRefs).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  exports[key] = _useMergeRefs[key];
});

var _usePrevious = __webpack_require__(/*! ./use-previous */ "./node_modules/@chakra-ui/hooks/dist/cjs/use-previous.js");

Object.keys(_usePrevious).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  exports[key] = _usePrevious[key];
});

var _useShortcut = __webpack_require__(/*! ./use-shortcut */ "./node_modules/@chakra-ui/hooks/dist/cjs/use-shortcut.js");

Object.keys(_useShortcut).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  exports[key] = _useShortcut[key];
});

var _useUpdateEffect = __webpack_require__(/*! ./use-update-effect */ "./node_modules/@chakra-ui/hooks/dist/cjs/use-update-effect.js");

Object.keys(_useUpdateEffect).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  exports[key] = _useUpdateEffect[key];
});

var _useEventListener = __webpack_require__(/*! ./use-event-listener */ "./node_modules/@chakra-ui/hooks/dist/cjs/use-event-listener.js");

Object.keys(_useEventListener).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  exports[key] = _useEventListener[key];
});

var _useBoolean = __webpack_require__(/*! ./use-boolean */ "./node_modules/@chakra-ui/hooks/dist/cjs/use-boolean.js");

Object.keys(_useBoolean).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  exports[key] = _useBoolean[key];
});

var _useForceUpdate = __webpack_require__(/*! ./use-force-update */ "./node_modules/@chakra-ui/hooks/dist/cjs/use-force-update.js");

Object.keys(_useForceUpdate).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  exports[key] = _useForceUpdate[key];
});

var _useConst = __webpack_require__(/*! ./use-const */ "./node_modules/@chakra-ui/hooks/dist/cjs/use-const.js");

Object.keys(_useConst).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  exports[key] = _useConst[key];
});

var _useDimensions = __webpack_require__(/*! ./use-dimensions */ "./node_modules/@chakra-ui/hooks/dist/cjs/use-dimensions.js");

Object.keys(_useDimensions).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  exports[key] = _useDimensions[key];
});

var _useMediaQuery = __webpack_require__(/*! ./use-media-query */ "./node_modules/@chakra-ui/hooks/dist/cjs/use-media-query.js");

Object.keys(_useMediaQuery).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  exports[key] = _useMediaQuery[key];
});

var _useTimeout = __webpack_require__(/*! ./use-timeout */ "./node_modules/@chakra-ui/hooks/dist/cjs/use-timeout.js");

Object.keys(_useTimeout).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  exports[key] = _useTimeout[key];
});

var _useLatestRef = __webpack_require__(/*! ./use-latest-ref */ "./node_modules/@chakra-ui/hooks/dist/cjs/use-latest-ref.js");

Object.keys(_useLatestRef).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  exports[key] = _useLatestRef[key];
});

var _useEventCallback = __webpack_require__(/*! ./use-event-callback */ "./node_modules/@chakra-ui/hooks/dist/cjs/use-event-callback.js");

Object.keys(_useEventCallback).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  exports[key] = _useEventCallback[key];
});

/***/ }),

/***/ "./node_modules/@chakra-ui/hooks/dist/cjs/use-boolean.js":
/*!***************************************************************!*\
  !*** ./node_modules/@chakra-ui/hooks/dist/cjs/use-boolean.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.useBoolean = useBoolean;

var _react = __webpack_require__(/*! react */ "react");
/**
 * React hook to manage boolean (on - off) states
 *
 * @param initialState the initial boolean state value
 */


function useBoolean(initialState) {
  if (initialState === void 0) {
    initialState = false;
  }

  var _useState = (0, _react.useState)(initialState),
      value = _useState[0],
      setValue = _useState[1];

  var on = (0, _react.useCallback)(function () {
    setValue(true);
  }, []);
  var off = (0, _react.useCallback)(function () {
    setValue(false);
  }, []);
  var toggle = (0, _react.useCallback)(function () {
    setValue(function (prev) {
      return !prev;
    });
  }, []);
  return [value, {
    on: on,
    off: off,
    toggle: toggle
  }];
}

/***/ }),

/***/ "./node_modules/@chakra-ui/hooks/dist/cjs/use-clipboard.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@chakra-ui/hooks/dist/cjs/use-clipboard.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.useClipboard = useClipboard;

var React = _interopRequireWildcard(__webpack_require__(/*! react */ "react"));

var _copyToClipboard = _interopRequireDefault(__webpack_require__(/*! copy-to-clipboard */ "./node_modules/copy-to-clipboard/index.js"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();

  _getRequireWildcardCache = function _getRequireWildcardCache() {
    return cache;
  };

  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
    return {
      "default": obj
    };
  }

  var cache = _getRequireWildcardCache();

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }

  newObj["default"] = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
}
/**
 * React hook to copy content to clipboard
 *
 * @param text the text or value to copy
 * @param timeout delay (in ms) to switch back to initial state once copied.
 */


function useClipboard(text, timeout) {
  if (timeout === void 0) {
    timeout = 1500;
  }

  var _React$useState = React.useState(false),
      hasCopied = _React$useState[0],
      setHasCopied = _React$useState[1];

  var onCopy = React.useCallback(function () {
    var didCopy = (0, _copyToClipboard["default"])(text);
    setHasCopied(didCopy);
  }, [text]);
  React.useEffect(function () {
    if (hasCopied) {
      var id = setTimeout(function () {
        setHasCopied(false);
      }, timeout);
      return function () {
        return clearTimeout(id);
      };
    }
  }, [timeout, hasCopied]);
  return [hasCopied, onCopy];
}

/***/ }),

/***/ "./node_modules/@chakra-ui/hooks/dist/cjs/use-const.js":
/*!*************************************************************!*\
  !*** ./node_modules/@chakra-ui/hooks/dist/cjs/use-const.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.useConst = useConst;

var React = _interopRequireWildcard(__webpack_require__(/*! react */ "react"));

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();

  _getRequireWildcardCache = function _getRequireWildcardCache() {
    return cache;
  };

  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
    return {
      "default": obj
    };
  }

  var cache = _getRequireWildcardCache();

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }

  newObj["default"] = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
}
/**
 * React hook that returns a constant value.
 * It always returns the very first value passed to `initialState`,
 * even if it changes between re-renders.
 *
 * @param initialValue the initial value
 */


function useConst(initialValue) {
  var _React$useState = React.useState(initialValue),
      value = _React$useState[0];

  return value;
}

/***/ }),

/***/ "./node_modules/@chakra-ui/hooks/dist/cjs/use-controllable.js":
/*!********************************************************************!*\
  !*** ./node_modules/@chakra-ui/hooks/dist/cjs/use-controllable.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.useControllableProp = useControllableProp;
exports.useControllableState = useControllableState;

var _utils = __webpack_require__(/*! @chakra-ui/utils */ "./node_modules/@chakra-ui/utils/dist/cjs/index.js");

var React = _interopRequireWildcard(__webpack_require__(/*! react */ "react"));

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();

  _getRequireWildcardCache = function _getRequireWildcardCache() {
    return cache;
  };

  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
    return {
      "default": obj
    };
  }

  var cache = _getRequireWildcardCache();

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }

  newObj["default"] = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
}
/* eslint-disable react-hooks/exhaustive-deps */


function useControllableProp(prop, state) {
  var _React$useRef = React.useRef(prop !== undefined),
      isControlled = _React$useRef.current;

  var value = isControlled && typeof prop !== "undefined" ? prop : state;
  return [isControlled, value];
}

var defaultPropsMap = {
  value: "value",
  defaultValue: "defaultValue",
  onChange: "onChange"
};
/**
 * React hook for using controlling component state.
 * @param props
 */

function useControllableState(props) {
  var valueProp = props.value,
      defaultValue = props.defaultValue,
      onChange = props.onChange,
      _props$shouldUpdate = props.shouldUpdate,
      shouldUpdate = _props$shouldUpdate === void 0 ? function () {
    return true;
  } : _props$shouldUpdate,
      _props$name = props.name,
      name = _props$name === void 0 ? "Component" : _props$name,
      _props$propsMap = props.propsMap,
      propsMap = _props$propsMap === void 0 ? defaultPropsMap : _props$propsMap;

  var _React$useState = React.useState(defaultValue),
      valueState = _React$useState[0],
      setValue = _React$useState[1];

  var _React$useRef2 = React.useRef(valueProp !== undefined),
      isControlled = _React$useRef2.current; // don't switch from controlled to uncontrolled


  React.useEffect(function () {
    var nextIsControlled = valueProp !== undefined;
    var nextMode = nextIsControlled ? "a controlled" : "an uncontrolled";
    var mode = isControlled ? "a controlled" : "an uncontrolled";
    (0, _utils.warn)({
      condition: isControlled !== nextIsControlled,
      message: "Warning: " + name + " is changing from " + mode + " to " + nextMode + " component. " + "Components should not switch from controlled to uncontrolled (or vice versa). " + ("Use the '" + propsMap["value"] + "' with an '" + propsMap["onChange"] + "' handler. ") + ("If you want an uncontrolled component, remove the " + propsMap["value"] + " prop and use '" + propsMap["defaultValue"] + "' instead. \"") + "More info: https://fb.me/react-controlled-components"
    });
  }, [valueProp, isControlled, name]);

  var _React$useRef3 = React.useRef(defaultValue),
      _defaultValue = _React$useRef3.current;

  React.useEffect(function () {
    (0, _utils.warn)({
      condition: _defaultValue !== defaultValue,
      message: "Warning: A component is changing the default value of an uncontrolled " + name + " after being initialized. " + ("To suppress this warning opt to use a controlled " + name + ".")
    });
  }, [JSON.stringify(defaultValue)]);
  var value = isControlled ? valueProp : valueState;
  var updateValue = React.useCallback(function (next) {
    var nextValue = (0, _utils.runIfFn)(next, value);
    var shouldUpdateState = shouldUpdate(value, nextValue);
    if (!shouldUpdateState) return;

    if (!isControlled) {
      setValue(next);
    }

    onChange == null ? void 0 : onChange(nextValue);
  }, [onChange, shouldUpdate, isControlled, value]);
  return [value, updateValue];
}

/***/ }),

/***/ "./node_modules/@chakra-ui/hooks/dist/cjs/use-dimensions.js":
/*!******************************************************************!*\
  !*** ./node_modules/@chakra-ui/hooks/dist/cjs/use-dimensions.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.useDimensions = useDimensions;

var React = _interopRequireWildcard(__webpack_require__(/*! react */ "react"));

var _utils = __webpack_require__(/*! @chakra-ui/utils */ "./node_modules/@chakra-ui/utils/dist/cjs/index.js");

var _useSafeLayoutEffect = __webpack_require__(/*! ./use-safe-layout-effect */ "./node_modules/@chakra-ui/hooks/dist/cjs/use-safe-layout-effect.js");

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();

  _getRequireWildcardCache = function _getRequireWildcardCache() {
    return cache;
  };

  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
    return {
      "default": obj
    };
  }

  var cache = _getRequireWildcardCache();

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }

  newObj["default"] = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
}
/**
 * Reack hook to measure a component's dimensions
 *
 * @param ref ref of the component to measure
 * @param observe if `true`, resize and scroll observers will be turned on
 */


function useDimensions(ref, observe) {
  var _React$useState = React.useState(null),
      dimensions = _React$useState[0],
      setDimensions = _React$useState[1];

  var rafId = React.useRef();
  (0, _useSafeLayoutEffect.useSafeLayoutEffect)(function () {
    if (!ref.current) return;
    var node = ref.current;

    function measure() {
      rafId.current = requestAnimationFrame(function () {
        var boxModel = (0, _utils.getBox)(node);
        setDimensions(boxModel);
      });
    }

    measure();

    if (observe) {
      window.addEventListener("resize", measure);
      window.addEventListener("scroll", measure);
      return function () {
        if (rafId.current) {
          cancelAnimationFrame(rafId.current);
        }

        window.removeEventListener("resize", measure);
        window.removeEventListener("scroll", measure);
      };
    }

    return function () {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [ref, observe]);
  return dimensions;
}

/***/ }),

/***/ "./node_modules/@chakra-ui/hooks/dist/cjs/use-disclosure.js":
/*!******************************************************************!*\
  !*** ./node_modules/@chakra-ui/hooks/dist/cjs/use-disclosure.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.useDisclosure = useDisclosure;

var React = _interopRequireWildcard(__webpack_require__(/*! react */ "react"));

var _useControllable = __webpack_require__(/*! ./use-controllable */ "./node_modules/@chakra-ui/hooks/dist/cjs/use-controllable.js");

var _usePrevious = __webpack_require__(/*! ./use-previous */ "./node_modules/@chakra-ui/hooks/dist/cjs/use-previous.js");

var _useId = __webpack_require__(/*! ./use-id */ "./node_modules/@chakra-ui/hooks/dist/cjs/use-id.js");

var _utils = __webpack_require__(/*! @chakra-ui/utils */ "./node_modules/@chakra-ui/utils/dist/cjs/index.js");

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();

  _getRequireWildcardCache = function _getRequireWildcardCache() {
    return cache;
  };

  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
    return {
      "default": obj
    };
  }

  var cache = _getRequireWildcardCache();

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }

  newObj["default"] = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
}

function _extends() {
  _extends = Object.assign || function (target) {
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

function useDisclosure(props) {
  if (props === void 0) {
    props = {};
  }

  var _props = props,
      onCloseProp = _props.onClose,
      onOpenProp = _props.onOpen,
      isOpenProp = _props.isOpen,
      idProp = _props.id;

  var _React$useState = React.useState(props.defaultIsOpen || false),
      isOpenState = _React$useState[0],
      setIsOpen = _React$useState[1];

  var _useControllableProp = (0, _useControllable.useControllableProp)(isOpenProp, isOpenState),
      isControlled = _useControllableProp[0],
      isOpen = _useControllableProp[1];

  var prevIsOpen = (0, _usePrevious.usePrevious)(isOpen);
  var id = (0, _useId.useId)(idProp, "disclosure");
  var onClose = React.useCallback(function () {
    if (!isControlled) {
      setIsOpen(false);
    }

    onCloseProp == null ? void 0 : onCloseProp();
  }, [isControlled, onCloseProp]);
  var onOpen = React.useCallback(function () {
    if (!isControlled) {
      setIsOpen(true);
    }

    onOpenProp == null ? void 0 : onOpenProp();
  }, [isControlled, onOpenProp]);
  var onToggle = React.useCallback(function () {
    var action = isOpen ? onClose : onOpen;
    action();
  }, [isOpen, onOpen, onClose]);
  return {
    isOpen: !!isOpen,
    prevIsOpen: !!prevIsOpen,
    onOpen: onOpen,
    onClose: onClose,
    onToggle: onToggle,
    isControlled: isControlled,
    getButtonProps: function getButtonProps(props) {
      if (props === void 0) {
        props = {};
      }

      return _extends({}, props, {
        "aria-expanded": "true",
        "aria-controls": id,
        onClick: (0, _utils.callAllHandlers)(props.onClick, onToggle)
      });
    },
    getDisclosureProps: function getDisclosureProps(props) {
      if (props === void 0) {
        props = {};
      }

      return _extends({}, props, {
        hidden: !isOpen,
        id: id
      });
    }
  };
}

/***/ }),

/***/ "./node_modules/@chakra-ui/hooks/dist/cjs/use-event-callback.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@chakra-ui/hooks/dist/cjs/use-event-callback.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.useEventCallback = useEventCallback;

var React = _interopRequireWildcard(__webpack_require__(/*! react */ "react"));

var _useSafeLayoutEffect = __webpack_require__(/*! ./use-safe-layout-effect */ "./node_modules/@chakra-ui/hooks/dist/cjs/use-safe-layout-effect.js");

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();

  _getRequireWildcardCache = function _getRequireWildcardCache() {
    return cache;
  };

  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
    return {
      "default": obj
    };
  }

  var cache = _getRequireWildcardCache();

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }

  newObj["default"] = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
}
/**
 * React hook for performant `useCallbacks`
 *
 * @see https://github.com/facebook/react/issues/14099#issuecomment-440013892
 */


function useEventCallback(callback) {
  var ref = React.useRef(callback);
  (0, _useSafeLayoutEffect.useSafeLayoutEffect)(function () {
    ref.current = callback;
  });
  return React.useCallback(function (event) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return ref.current.apply(ref, [event].concat(args));
  }, []);
}

/***/ }),

/***/ "./node_modules/@chakra-ui/hooks/dist/cjs/use-event-listener.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@chakra-ui/hooks/dist/cjs/use-event-listener.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.useEventListener = useEventListener;

var React = _interopRequireWildcard(__webpack_require__(/*! react */ "react"));

var _utils = __webpack_require__(/*! @chakra-ui/utils */ "./node_modules/@chakra-ui/utils/dist/cjs/index.js");

var _useLatestRef = __webpack_require__(/*! ./use-latest-ref */ "./node_modules/@chakra-ui/hooks/dist/cjs/use-latest-ref.js");

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();

  _getRequireWildcardCache = function _getRequireWildcardCache() {
    return cache;
  };

  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
    return {
      "default": obj
    };
  }

  var cache = _getRequireWildcardCache();

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }

  newObj["default"] = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
}
/**
 * React hook to manage browser event listeners
 *
 * @param event the event name
 * @param handler the event handler function to execute
 * @param doc the dom environment to execute against (defaults to `document`)
 * @param options the event listener options
 */


function useEventListener(event, handler, doc, options) {
  if (doc === void 0) {
    doc = _utils.isBrowser ? document : null;
  }

  var savedHandler = (0, _useLatestRef.useLatestRef)(handler);
  React.useEffect(function () {
    if (!doc) return;

    var listener = function listener(event) {
      savedHandler.current(event);
    };

    doc.addEventListener(event, listener, options);
    return function () {
      doc.removeEventListener(event, listener, options);
    };
  }, [event, doc, options, savedHandler]);
  return function () {
    var _doc;

    (_doc = doc) == null ? void 0 : _doc.removeEventListener(event, savedHandler.current, options);
  };
}

/***/ }),

/***/ "./node_modules/@chakra-ui/hooks/dist/cjs/use-focus-effect.js":
/*!********************************************************************!*\
  !*** ./node_modules/@chakra-ui/hooks/dist/cjs/use-focus-effect.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.useFocusEffect = useFocusEffect;

var _utils = __webpack_require__(/*! @chakra-ui/utils */ "./node_modules/@chakra-ui/utils/dist/cjs/index.js");

var _useUpdateEffect = __webpack_require__(/*! ./use-update-effect */ "./node_modules/@chakra-ui/hooks/dist/cjs/use-update-effect.js");
/**
 * React hook to focus an element conditionally
 *
 * @param ref the ref of the element to focus
 * @param options focus management options
 */


function useFocusEffect(ref, options) {
  var shouldFocus = options.shouldFocus,
      preventScroll = options.preventScroll;
  (0, _useUpdateEffect.useUpdateEffect)(function () {
    var node = ref.current;
    if (!node || !shouldFocus) return;

    if (!(0, _utils.hasFocusWithin)(node)) {
      (0, _utils.ensureFocus)(node, {
        preventScroll: preventScroll
      });
    }
  }, [shouldFocus, ref, preventScroll]);
}

/***/ }),

/***/ "./node_modules/@chakra-ui/hooks/dist/cjs/use-force-update.js":
/*!********************************************************************!*\
  !*** ./node_modules/@chakra-ui/hooks/dist/cjs/use-force-update.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.useForceUpdate = useForceUpdate;

var React = _interopRequireWildcard(__webpack_require__(/*! react */ "react"));

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();

  _getRequireWildcardCache = function _getRequireWildcardCache() {
    return cache;
  };

  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
    return {
      "default": obj
    };
  }

  var cache = _getRequireWildcardCache();

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }

  newObj["default"] = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
}
/**
 * React hook for force a component to re-render
 */


function useForceUpdate() {
  var _React$useState = React.useState(0),
      count = _React$useState[0],
      setCount = _React$useState[1];

  var forceUpdate = React.useCallback(function () {
    return setCount(count + 1);
  }, [count]);
  return forceUpdate;
}

/***/ }),

/***/ "./node_modules/@chakra-ui/hooks/dist/cjs/use-id.js":
/*!**********************************************************!*\
  !*** ./node_modules/@chakra-ui/hooks/dist/cjs/use-id.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.useId = useId;
exports.useIds = useIds;

var _autoId = __webpack_require__(/*! @reach/auto-id */ "./node_modules/@chakra-ui/hooks/node_modules/@reach/auto-id/dist/index.js");

function generatePrefix(prefix, id) {
  return prefix + "-" + id;
}
/**
 * Reack hook to generate unique id
 *
 * @param idProp the external id passed from the user
 * @param prefix prefix to append before the id
 */


function useId(idProp, prefix) {
  var uuid = (0, _autoId.useId)();
  var id = idProp != null ? idProp : uuid;
  var result = prefix ? generatePrefix(prefix, id) : id;
  return result;
}
/**
 * Reack hook to generate ids for use in compound components
 *
 * @param idProp the external id passed from the user
 * @param prefixes array of prefixes to use
 *
 * @example
 *
 * ```js
 * const [buttonId, menuId] = useIds("52", "button", "menu")
 *
 * // buttonId will be `button-52`
 * // menuId will be `menu-52`
 * ```
 */


function useIds(idProp) {
  var id = useId(idProp);

  for (var _len = arguments.length, prefixes = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    prefixes[_key - 1] = arguments[_key];
  }

  var ids = prefixes.map(function (prefix) {
    return generatePrefix(prefix, id);
  });
  return ids;
}

/***/ }),

/***/ "./node_modules/@chakra-ui/hooks/dist/cjs/use-interval.js":
/*!****************************************************************!*\
  !*** ./node_modules/@chakra-ui/hooks/dist/cjs/use-interval.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.useInterval = useInterval;

var React = _interopRequireWildcard(__webpack_require__(/*! react */ "react"));

var _useLatestRef = __webpack_require__(/*! ./use-latest-ref */ "./node_modules/@chakra-ui/hooks/dist/cjs/use-latest-ref.js");

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();

  _getRequireWildcardCache = function _getRequireWildcardCache() {
    return cache;
  };

  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
    return {
      "default": obj
    };
  }

  var cache = _getRequireWildcardCache();

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }

  newObj["default"] = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
}
/**
 * React Hook that provides a declarative `setInterval`
 *
 * @param callback the callback to execute at interval
 * @param delay the `setInterval` delay (in ms)
 */


function useInterval(callback, delay) {
  var savedCallback = (0, _useLatestRef.useLatestRef)(callback);
  React.useEffect(function () {
    var tick = function tick() {
      savedCallback.current == null ? void 0 : savedCallback.current();
    };

    if (delay !== null) {
      var id = setInterval(tick, delay);
      return function () {
        return clearInterval(id);
      };
    }
  }, [delay, savedCallback]);
}

/***/ }),

/***/ "./node_modules/@chakra-ui/hooks/dist/cjs/use-latest-ref.js":
/*!******************************************************************!*\
  !*** ./node_modules/@chakra-ui/hooks/dist/cjs/use-latest-ref.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.useLatestRef = useLatestRef;

var React = _interopRequireWildcard(__webpack_require__(/*! react */ "react"));

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();

  _getRequireWildcardCache = function _getRequireWildcardCache() {
    return cache;
  };

  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
    return {
      "default": obj
    };
  }

  var cache = _getRequireWildcardCache();

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }

  newObj["default"] = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
}
/**
 * React hook to persist any value between renders,
 * but keeps it up-to-date if it changes.
 *
 * @param value the value or function to persist
 */


function useLatestRef(value) {
  var ref = React.useRef(value);
  React.useEffect(function () {
    ref.current = value;
  }, [value]);
  return ref;
}

/***/ }),

/***/ "./node_modules/@chakra-ui/hooks/dist/cjs/use-lock-body-scroll.js":
/*!************************************************************************!*\
  !*** ./node_modules/@chakra-ui/hooks/dist/cjs/use-lock-body-scroll.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.useLockBodyScroll = useLockBodyScroll;

var React = _interopRequireWildcard(__webpack_require__(/*! react */ "react"));

var _bodyScrollLock = __webpack_require__(/*! body-scroll-lock */ "./node_modules/body-scroll-lock/lib/bodyScrollLock.min.js");

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();

  _getRequireWildcardCache = function _getRequireWildcardCache() {
    return cache;
  };

  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
    return {
      "default": obj
    };
  }

  var cache = _getRequireWildcardCache();

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }

  newObj["default"] = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
}
/**
 * React hook to lock scrolling on the `body` element
 *
 * @param ref the target element to preserve after lock
 * @param shouldLock if `true`, scroll lock will be applied
 */


function useLockBodyScroll(ref, shouldLock) {
  React.useEffect(function () {
    var node = ref.current;
    if (!node || !shouldLock) return undefined;
    (0, _bodyScrollLock.disableBodyScroll)(node, {
      reserveScrollBarGap: true
    });
    return function () {
      return (0, _bodyScrollLock.enableBodyScroll)(node);
    };
  }, [ref, shouldLock]);
}

/***/ }),

/***/ "./node_modules/@chakra-ui/hooks/dist/cjs/use-logger.js":
/*!**************************************************************!*\
  !*** ./node_modules/@chakra-ui/hooks/dist/cjs/use-logger.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.useLogger = useLogger;

var React = _interopRequireWildcard(__webpack_require__(/*! react */ "react"));

var _useUpdateEffect = __webpack_require__(/*! ./use-update-effect */ "./node_modules/@chakra-ui/hooks/dist/cjs/use-update-effect.js");

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();

  _getRequireWildcardCache = function _getRequireWildcardCache() {
    return cache;
  };

  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
    return {
      "default": obj
    };
  }

  var cache = _getRequireWildcardCache();

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }

  newObj["default"] = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
}
/**
 * React hook to console-log a value when it mounts
 * and as it updates.
 *
 * @param label a label for the component
 * @param values parameters to log
 */


function useLogger(label) {
  for (var _len = arguments.length, values = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    values[_key - 1] = arguments[_key];
  }

  React.useEffect(function () {
    var _console;

    (_console = console).log.apply(_console, [label + " mounted:"].concat(values));

    return function () {
      console.log(label + " unmounted");
    }; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  (0, _useUpdateEffect.useUpdateEffect)(function () {
    var _console2;

    (_console2 = console).log.apply(_console2, [label + " updated:"].concat(values));
  });
}

/***/ }),

/***/ "./node_modules/@chakra-ui/hooks/dist/cjs/use-media-query.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@chakra-ui/hooks/dist/cjs/use-media-query.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.useMediaQuery = useMediaQuery;

var React = _interopRequireWildcard(__webpack_require__(/*! react */ "react"));

var _utils = __webpack_require__(/*! @chakra-ui/utils */ "./node_modules/@chakra-ui/utils/dist/cjs/index.js");

var _useSafeLayoutEffect = __webpack_require__(/*! ./use-safe-layout-effect */ "./node_modules/@chakra-ui/hooks/dist/cjs/use-safe-layout-effect.js");

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();

  _getRequireWildcardCache = function _getRequireWildcardCache() {
    return cache;
  };

  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
    return {
      "default": obj
    };
  }

  var cache = _getRequireWildcardCache();

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }

  newObj["default"] = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
}

var isSupported = function isSupported(api) {
  return _utils.isBrowser && api in window;
};
/**
 * React hook that tracks state of a CSS media query
 *
 * @param query the media query to match
 */


function useMediaQuery(query) {
  var _React$useState = React.useState(function () {
    if (!isSupported("matchMedia")) return false;
    return !!window.matchMedia(query).matches;
  }),
      matches = _React$useState[0],
      setMatches = _React$useState[1];

  (0, _useSafeLayoutEffect.useSafeLayoutEffect)(function () {
    if (!isSupported("matchMedia")) return;
    var mediaQueryList = window.matchMedia(query);

    var listener = function listener() {
      return setMatches(!!mediaQueryList.matches);
    };

    mediaQueryList.addListener(listener);
    listener();
    return function () {
      mediaQueryList.removeListener(listener);
    };
  }, [query]);
  return [matches, setMatches];
}

/***/ }),

/***/ "./node_modules/@chakra-ui/hooks/dist/cjs/use-merge-refs.js":
/*!******************************************************************!*\
  !*** ./node_modules/@chakra-ui/hooks/dist/cjs/use-merge-refs.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.assignRef = assignRef;
exports.useMergeRefs = useMergeRefs;

var React = _interopRequireWildcard(__webpack_require__(/*! react */ "react"));

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();

  _getRequireWildcardCache = function _getRequireWildcardCache() {
    return cache;
  };

  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
    return {
      "default": obj
    };
  }

  var cache = _getRequireWildcardCache();

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }

  newObj["default"] = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
}
/* eslint-disable react-hooks/exhaustive-deps */


function assignRef(ref, value) {
  if (ref == null) return;

  if (typeof ref === "function") {
    ref(value);
    return;
  }

  try {
    //@ts-ignore
    ref.current = value;
  } catch (error) {
    throw new Error("Cannot assign value '" + value + "' to ref '" + ref + "'");
  }
}
/**
 * React hook that merges react refs into a single memoized function
 *
 * @example
 * import React from "react";
 * import { useMergeRefs } from `@chakra-ui/hooks`;
 *
 * const Component = React.forwardRef((props, ref) => {
 *   const internalRef = React.useRef();
 *   return <div {...props} ref={useMergeRefs(internalRef, ref)} />;
 * });
 */


function useMergeRefs() {
  for (var _len = arguments.length, refs = new Array(_len), _key = 0; _key < _len; _key++) {
    refs[_key] = arguments[_key];
  }

  return React.useMemo(function () {
    if (refs.every(function (ref) {
      return ref == null;
    })) {
      return null;
    }

    return function (node) {
      refs.forEach(function (ref) {
        if (ref) assignRef(ref, node);
      });
    };
  }, refs);
}

/***/ }),

/***/ "./node_modules/@chakra-ui/hooks/dist/cjs/use-previous.js":
/*!****************************************************************!*\
  !*** ./node_modules/@chakra-ui/hooks/dist/cjs/use-previous.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.usePrevious = usePrevious;

var React = _interopRequireWildcard(__webpack_require__(/*! react */ "react"));

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();

  _getRequireWildcardCache = function _getRequireWildcardCache() {
    return cache;
  };

  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
    return {
      "default": obj
    };
  }

  var cache = _getRequireWildcardCache();

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }

  newObj["default"] = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
}
/**
 * React hook that tracks previous value
 *
 * @param value the value to track
 */


function usePrevious(value) {
  var valueRef = React.useRef();
  React.useEffect(function () {
    valueRef.current = value;
  }, [value]);
  return valueRef.current;
}

/***/ }),

/***/ "./node_modules/@chakra-ui/hooks/dist/cjs/use-safe-layout-effect.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@chakra-ui/hooks/dist/cjs/use-safe-layout-effect.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.useSafeLayoutEffect = void 0;

var React = _interopRequireWildcard(__webpack_require__(/*! react */ "react"));

var _utils = __webpack_require__(/*! @chakra-ui/utils */ "./node_modules/@chakra-ui/utils/dist/cjs/index.js");

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();

  _getRequireWildcardCache = function _getRequireWildcardCache() {
    return cache;
  };

  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
    return {
      "default": obj
    };
  }

  var cache = _getRequireWildcardCache();

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }

  newObj["default"] = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
}
/**
 * useSafeLayoutEffect enables us to safely call `useLayoutEffect` on the browser
 * (for SSR reasons)
 *
 * React currently throws a warning when using useLayoutEffect on the server.
 * To get around it, we can conditionally useEffect on the server (no-op) and
 * useLayoutEffect in the browser.
 *
 * @see https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85
 */


var useSafeLayoutEffect = _utils.isBrowser ? React.useLayoutEffect : React.useEffect;
exports.useSafeLayoutEffect = useSafeLayoutEffect;

/***/ }),

/***/ "./node_modules/@chakra-ui/hooks/dist/cjs/use-shortcut.js":
/*!****************************************************************!*\
  !*** ./node_modules/@chakra-ui/hooks/dist/cjs/use-shortcut.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.useShortcut = useShortcut;

var React = _interopRequireWildcard(__webpack_require__(/*! react */ "react"));

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();

  _getRequireWildcardCache = function _getRequireWildcardCache() {
    return cache;
  };

  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
    return {
      "default": obj
    };
  }

  var cache = _getRequireWildcardCache();

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }

  newObj["default"] = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
}
/**
 * Checks if the key pressed is a printable character
 * and can be used for shortcut navigation
 *
 * @param event the keyboard event
 */


function isPrintableCharacter(event) {
  var key = event.key;
  return key.length == 1 || key.length > 1 && /[^a-zA-Z0-9]/.test(key);
}
/**
 * React hook that provides an enhanced keydown handler,
 * that's used for key navigation within menus, select dropdowns.
 *
 * @param props the shortcut options
 */


function useShortcut(props) {
  if (props === void 0) {
    props = {};
  }

  var _props = props,
      _props$timeout = _props.timeout,
      timeout = _props$timeout === void 0 ? 300 : _props$timeout,
      _props$preventDefault = _props.preventDefault,
      preventDefault = _props$preventDefault === void 0 ? function () {
    return true;
  } : _props$preventDefault;

  var _React$useState = React.useState([]),
      keys = _React$useState[0],
      setKeys = _React$useState[1];

  var timeoutId = React.useRef();

  var flush = function flush() {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
      timeoutId.current = null;
    }
  };

  var clearKeysAfterDelay = function clearKeysAfterDelay() {
    flush();
    timeoutId.current = setTimeout(function () {
      setKeys([]);
      timeoutId.current = null;
    }, timeout);
  };

  React.useEffect(function () {
    return function () {
      return flush();
    };
  }, []);

  function onKeyDown(callback) {
    return function (event) {
      if (event.key === "Backspace") {
        var keysCopy = [].concat(keys);
        keysCopy.pop();
        setKeys(keysCopy);
        return;
      }

      if (isPrintableCharacter(event)) {
        var _keysCopy = keys.concat(event.key);

        if (preventDefault(event)) {
          event.preventDefault();
          event.stopPropagation();
        }

        setKeys(_keysCopy);
        callback(_keysCopy.join(""));
        clearKeysAfterDelay();
      }
    };
  }

  return onKeyDown;
}

/***/ }),

/***/ "./node_modules/@chakra-ui/hooks/dist/cjs/use-timeout.js":
/*!***************************************************************!*\
  !*** ./node_modules/@chakra-ui/hooks/dist/cjs/use-timeout.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.useTimeout = useTimeout;

var React = _interopRequireWildcard(__webpack_require__(/*! react */ "react"));

var _useLatestRef = __webpack_require__(/*! ./use-latest-ref */ "./node_modules/@chakra-ui/hooks/dist/cjs/use-latest-ref.js");

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();

  _getRequireWildcardCache = function _getRequireWildcardCache() {
    return cache;
  };

  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
    return {
      "default": obj
    };
  }

  var cache = _getRequireWildcardCache();

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }

  newObj["default"] = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
}
/**
 * React hook that provides a declarative `setTimeout`
 *
 * @param callback the callback to run after specified delay
 * @param delay the delay (in ms)
 */


function useTimeout(callback, delay) {
  var savedCallback = (0, _useLatestRef.useLatestRef)(callback);
  React.useEffect(function () {
    if (delay == null) return;
    var timeoutId = setTimeout(function () {
      savedCallback.current == null ? void 0 : savedCallback.current();
    }, delay);
    return function () {
      return clearTimeout(timeoutId);
    };
  }, [delay, savedCallback]);
}

/***/ }),

/***/ "./node_modules/@chakra-ui/hooks/dist/cjs/use-update-effect.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@chakra-ui/hooks/dist/cjs/use-update-effect.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.useUpdateEffect = void 0;

var React = _interopRequireWildcard(__webpack_require__(/*! react */ "react"));

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();

  _getRequireWildcardCache = function _getRequireWildcardCache() {
    return cache;
  };

  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
    return {
      "default": obj
    };
  }

  var cache = _getRequireWildcardCache();

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }

  newObj["default"] = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
}
/**
 * React effect hook that invokes only on update.
 * It doesn't invoke on mount
 */


var useUpdateEffect = function useUpdateEffect(effect, deps) {
  var mounted = React.useRef(false);
  React.useEffect(function () {
    if (mounted.current) {
      return effect();
    }

    mounted.current = true;
    return undefined; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return mounted.current;
};

exports.useUpdateEffect = useUpdateEffect;

/***/ }),

/***/ "./node_modules/@chakra-ui/hooks/node_modules/@reach/auto-id/dist/auto-id.cjs.development.js":
/*!***************************************************************************************************!*\
  !*** ./node_modules/@chakra-ui/hooks/node_modules/@reach/auto-id/dist/auto-id.cjs.development.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', {
  value: true
});

var react = __webpack_require__(/*! react */ "react");

var utils = __webpack_require__(/*! @reach/utils */ "./node_modules/@chakra-ui/hooks/node_modules/@reach/utils/dist/index.js");
/*
 * Welcome to @reach/auto-id!

 * Let's see if we can make sense of why this hook exists and its
 * implementation.
 *
 * Some background:
 *   1. Accessibiliy APIs rely heavily on element IDs
 *   2. Requiring developers to put IDs on every element in Reach UI is both
 *      cumbersome and error-prone
 *   3. With a component model, we can generate IDs for them!
 *
 * Solution 1: Generate random IDs.
 *
 * This works great as long as you don't server render your app. When React (in
 * the client) tries to reuse the markup from the server, the IDs won't match
 * and React will then recreate the entire DOM tree.
 *
 * Solution 2: Increment an integer
 *
 * This sounds great. Since we're rendering the exact same tree on the server
 * and client, we can increment a counter and get a deterministic result between
 * client and server. Also, JS integers can go up to nine-quadrillion. I'm
 * pretty sure the tab will be closed before an app never needs
 * 10 quadrillion IDs!
 *
 * Problem solved, right?
 *
 * Ah, but there's a catch! React's concurrent rendering makes this approach
 * non-deterministic. While the client and server will end up with the same
 * elements in the end, depending on suspense boundaries (and possibly some user
 * input during the initial render) the incrementing integers won't always match
 * up.
 *
 * Solution 3: Don't use IDs at all on the server; patch after first render.
 *
 * What we've done here is solution 2 with some tricks. With this approach, the
 * ID returned is an empty string on the first render. This way the server and
 * client have the same markup no matter how wild the concurrent rendering may
 * have gotten.
 *
 * After the render, we patch up the components with an incremented ID. This
 * causes a double render on any components with `useId`. Shouldn't be a problem
 * since the components using this hook should be small, and we're only updating
 * the ID attribute on the DOM, nothing big is happening.
 *
 * It doesn't have to be an incremented number, though--we could do generate
 * random strings instead, but incrementing a number is probably the cheapest
 * thing we can do.
 *
 * Additionally, we only do this patchup on the very first client render ever.
 * Any calls to `useId` that happen dynamically in the client will be
 * populated immediately with a value. So, we only get the double render after
 * server hydration and never again, SO BACK OFF ALRIGHT?
 */


var serverHandoffComplete = false;
var id = 0;

var genId = function genId() {
  return ++id;
};
/**
 * useId
 *
 * Autogenerate IDs to facilitate WAI-ARIA and server rendering.
 *
 * Note: The returned ID will initially be `null` and will update after a
 * component mounts. Users may need to supply their own ID if they need
 * consistent values for SSR.
 *
 * @see Docs https://reacttraining.com/reach-ui/auto-id
 */


var useId = function useId(idFromProps) {
  /*
   * If this instance isn't part of the initial render, we don't have to do the
   * double render/patch-up dance. We can just generate the ID and return it.
   */
  var initialId = idFromProps || (serverHandoffComplete ? genId() : null);

  var _useState = react.useState(initialId),
      id = _useState[0],
      setId = _useState[1];

  utils.useIsomorphicLayoutEffect(function () {
    if (id === null) {
      /*
       * Patch the ID after render. We do this in `useLayoutEffect` to avoid any
       * rendering flicker, though it'll make the first render slower (unlikely
       * to matter, but you're welcome to measure your app and let us know if
       * it's a problem).
       */
      setId(genId());
    } // eslint-disable-next-line react-hooks/exhaustive-deps

  }, []);
  react.useEffect(function () {
    if (serverHandoffComplete === false) {
      /*
       * Flag all future uses of `useId` to skip the update dance. This is in
       * `useEffect` because it goes after `useLayoutEffect`, ensuring we don't
       * accidentally bail out of the patch-up dance prematurely.
       */
      serverHandoffComplete = true;
    }
  }, []);
  return id != null ? String(id) : undefined;
};

exports.useId = useId;

/***/ }),

/***/ "./node_modules/@chakra-ui/hooks/node_modules/@reach/auto-id/dist/index.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/@chakra-ui/hooks/node_modules/@reach/auto-id/dist/index.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (false) {} else {
  module.exports = __webpack_require__(/*! ./auto-id.cjs.development.js */ "./node_modules/@chakra-ui/hooks/node_modules/@reach/auto-id/dist/auto-id.cjs.development.js");
}

/***/ }),

/***/ "./node_modules/@chakra-ui/hooks/node_modules/@reach/utils/dist/index.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@chakra-ui/hooks/node_modules/@reach/utils/dist/index.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (false) {} else {
  module.exports = __webpack_require__(/*! ./utils.cjs.development.js */ "./node_modules/@chakra-ui/hooks/node_modules/@reach/utils/dist/utils.cjs.development.js");
}

/***/ }),

/***/ "./node_modules/@chakra-ui/hooks/node_modules/@reach/utils/dist/utils.cjs.development.js":
/*!***********************************************************************************************!*\
  !*** ./node_modules/@chakra-ui/hooks/node_modules/@reach/utils/dist/utils.cjs.development.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, '__esModule', {
  value: true
});

var React = __webpack_require__(/*! react */ "react");

var warning = __webpack_require__(/*! warning */ "./node_modules/warning/warning.js");

function _interopDefaultLegacy(e) {
  return e && typeof e === 'object' && 'default' in e ? e : {
    'default': e
  };
}

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var warning__default = /*#__PURE__*/_interopDefaultLegacy(warning);
/* eslint-disable no-restricted-globals, eqeqeq  */

/**
 * React currently throws a warning when using useLayoutEffect on the server.
 * To get around it, we can conditionally useEffect on the server (no-op) and
 * useLayoutEffect in the browser. We occasionally need useLayoutEffect to
 * ensure we don't get a render flash for certain operations, but we may also
 * need affected components to render on the server. One example is when setting
 * a component's descendants to retrieve their index values.
 *
 * Important to note that using this hook as an escape hatch will break the
 * eslint dependency warnings unless you rename the import to `useLayoutEffect`.
 * Use sparingly only when the effect won't effect the rendered HTML to avoid
 * any server/client mismatch.
 *
 * If a useLayoutEffect is needed and the result would create a mismatch, it's
 * likely that the component in question shouldn't be rendered on the server at
 * all, so a better approach would be to lazily render those in a parent
 * component after client-side hydration.
 *
 * TODO: We are calling useLayoutEffect in a couple of places that will likely
 * cause some issues for SSR users, whether the warning shows or not. Audit and
 * fix these.
 *
 * https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85
 * https://github.com/reduxjs/react-redux/blob/master/src/utils/useIsomorphicLayoutEffect.js
 *
 * @param effect
 * @param deps
 */


var useIsomorphicLayoutEffect = /*#__PURE__*/canUseDOM() ? React__default['default'].useLayoutEffect : React__default['default'].useEffect;
var checkedPkgs = {};
/**
 * When in dev mode, checks that styles for a given @reach package are loaded.
 *
 * @param packageName Name of the package to check.
 * @example checkStyles("dialog") will check for styles for @reach/dialog
 */
// @ts-ignore

exports.checkStyles = noop;
{
  // In CJS files, "development" is stripped from our build, but we need
  // it to prevent style checks from clogging up user logs while testing.
  // This is a workaround until we can tweak the build a bit to accommodate.
  var _ref = typeof process !== "undefined" ? process : {
    env: {
      NODE_ENV: "development"
    }
  },
      env = _ref.env;

  exports.checkStyles = function checkStyles(packageName) {
    // only check once per package
    if (checkedPkgs[packageName]) return;
    checkedPkgs[packageName] = true;

    if (env.NODE_ENV !== "test" && parseInt(window.getComputedStyle(document.body).getPropertyValue("--reach-" + packageName), 10) !== 1) {
      console.warn("@reach/" + packageName + " styles not found. If you are using a bundler like webpack or parcel include this in the entry file of your app before any of your own styles:\n\n    import \"@reach/" + packageName + "/styles.css\";\n\n  Otherwise you'll need to include them some other way:\n\n    <link rel=\"stylesheet\" type=\"text/css\" href=\"node_modules/@reach/" + packageName + "/styles.css\" />\n\n  For more information visit https://ui.reach.tech/styling.\n  ");
    }
  };
}
/**
 * Ponyfill for the global object in some environments.
 *
 * @link https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
 */

var ponyfillGlobal = typeof window != "undefined" && window.Math == Math ? window : typeof self != "undefined" && self.Math == Math ? self :
/*#__PURE__*/
// eslint-disable-next-line no-new-func
Function("return this")();
/**
 * Passes or assigns an arbitrary value to a ref function or object.
 *
 * @param ref
 * @param value
 */

function assignRef(ref, value) {
  if (ref == null) return;

  if (isFunction(ref)) {
    ref(value);
  } else {
    try {
      ref.current = value;
    } catch (error) {
      throw new Error("Cannot assign value \"" + value + "\" to ref \"" + ref + "\"");
    }
  }
}
/**
 * Checks true|"true" vs false|"false"
 *
 * @param value
 */


function boolOrBoolString(value) {
  return value === "true" ? true : isBoolean(value) ? value : false;
}

function canUseDOM() {
  return !!(typeof window !== "undefined" && window.document && window.document.createElement);
}
/**
 * Type-safe clone element
 *
 * @param element
 * @param props
 * @param children
 */


function cloneValidElement(element, props) {
  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }

  return React.isValidElement(element) ? React.cloneElement.apply(void 0, [element, props].concat(children)) : element;
}

function createNamedContext(name, defaultValue) {
  var Ctx = React.createContext(defaultValue);
  Ctx.displayName = name;
  return Ctx;
}
/**
 * This is a hack for sure. The thing is, getting a component to intelligently
 * infer props based on a component or JSX string passed into an `as` prop is
 * kind of a huge pain. Getting it to work and satisfy the constraints of
 * `forwardRef` seems dang near impossible. To avoid needing to do this awkward
 * type song-and-dance every time we want to forward a ref into a component
 * that accepts an `as` prop, we abstract all of that mess to this function for
 * the time time being.
 */


function forwardRefWithAs(render) {
  return React__default['default'].forwardRef(render);
}

function memoWithAs(Component, propsAreEqual) {
  return React__default['default'].memo(Component, propsAreEqual);
}
/**
 * Get the size of the working document minus the scrollbar offset.
 *
 * @param element
 */


function getDocumentDimensions(element) {
  if (!canUseDOM()) return {
    width: 0,
    height: 0
  };
  var doc = element ? getOwnerDocument(element) : document;
  var win = element ? getOwnerWindow(element) : window;
  return {
    width: doc.documentElement.clientWidth || win.innerWidth,
    height: doc.documentElement.clientHeight || win.innerHeight
  };
}
/**
 * Get the scoll position of the global window object relative to a given node.
 *
 * @param element
 */


function getScrollPosition(element) {
  if (!canUseDOM()) return {
    scrollX: 0,
    scrollY: 0
  };
  var win = element ? getOwnerWindow(element) : window;
  return {
    scrollX: win.scrollX,
    scrollY: win.scrollY
  };
}
/**
 * Get a computed style value by property, backwards compatible with IE
 * @param element
 * @param styleProp
 */


function getElementComputedStyle(element, styleProp) {
  var y = null;
  var doc = getOwnerDocument(element);

  if (element.currentStyle) {
    y = element.currentStyle[styleProp];
  } else if (doc && doc.defaultView && isFunction(doc.defaultView.getComputedStyle)) {
    y = doc.defaultView.getComputedStyle(element, null).getPropertyValue(styleProp);
  }

  return y;
}
/**
 * Get an element's owner document. Useful when components are used in iframes
 * or other environments like dev tools.
 *
 * @param element
 */


function getOwnerDocument(element) {
  return element && element.ownerDocument ? element.ownerDocument : canUseDOM() ? document : null;
}

function getOwnerWindow(element) {
  var doc = element ? getOwnerDocument(element) : null;
  return doc ? doc.defaultView || window : null;
}
/**
 * Get the scrollbar offset distance.
 *
 * TODO: Remove in 1.0 (we used this in public examples)
 */


function getScrollbarOffset() {
  try {
    if (window.innerWidth > document.documentElement.clientWidth) {
      return window.innerWidth - document.documentElement.clientWidth;
    }
  } catch (err) {}

  return 0;
}
/**
 * Checks whether or not a value is a boolean.
 *
 * @param value
 */


function isBoolean(value) {
  return typeof value === "boolean";
}
/**
 * Checks whether or not a value is a function.
 *
 * @param value
 */


function isFunction(value) {
  return !!(value && {}.toString.call(value) == "[object Function]");
}
/**
 * Checks whether or not a value is a number.
 *
 * @param value
 */


function isNumber(value) {
  return typeof value === "number" && !isNaN(value);
}
/**
 * Detects right clicks
 *
 * @param nativeEvent
 */


function isRightClick(nativeEvent) {
  return nativeEvent.which === 3 || nativeEvent.button === 2;
}
/**
 * Checks whether or not a value is a string.
 *
 * @param value
 */


function isString(value) {
  return typeof value === "string";
}
/**
 * Joins strings to format IDs for compound components.
 *
 * @param args
 */


function makeId() {
  for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  return args.filter(function (val) {
    return val != null;
  }).join("--");
}
/**
 * No-op function.
 */


function noop() {}
/**
 * Convert our state strings for HTML data attributes.
 * No need for a fancy kebab-caser here, we know what our state strings are!
 *
 * @param state
 */


function stateToAttributeString(state) {
  return String(state).replace(/([\s_]+)/g, "-").toLowerCase();
}
/**
 * Check if a component is controlled or uncontrolled and return the correct
 * state value and setter accordingly. If the component state is controlled by
 * the app, the setter is a noop.
 *
 * @param controlledValue
 * @param defaultValue
 */


function useControlledState(controlledValue, defaultValue) {
  var controlledRef = React.useRef(controlledValue != null);

  var _useState = React.useState(defaultValue),
      valueState = _useState[0],
      setValue = _useState[1];

  var set = React.useCallback(function (n) {
    if (!controlledRef.current) {
      setValue(n);
    }
  }, []);
  return [controlledRef.current ? controlledValue : valueState, set];
}
/**
 * Logs a warning in dev mode when a component switches from controlled to
 * uncontrolled, or vice versa
 *
 * A single prop should typically be used to determine whether or not a
 * component is controlled or not.
 *
 * @param controlledValue
 * @param controlledPropName
 * @param componentName
 */


exports.useControlledSwitchWarning = noop;
{
  exports.useControlledSwitchWarning = function useControlledSwitchWarning(controlledValue, controlledPropName, componentName) {
    var controlledRef = React.useRef(controlledValue != null);
    var nameCache = React.useRef({
      componentName: componentName,
      controlledPropName: controlledPropName
    });
    React.useEffect(function () {
      nameCache.current = {
        componentName: componentName,
        controlledPropName: controlledPropName
      };
    }, [componentName, controlledPropName]);
    React.useEffect(function () {
      var wasControlled = controlledRef.current;
      var _nameCache$current = nameCache.current,
          componentName = _nameCache$current.componentName,
          controlledPropName = _nameCache$current.controlledPropName;
      var isControlled = controlledValue != null;

      if (wasControlled !== isControlled) {
        console.error("A component is changing an " + (wasControlled ? "" : "un") + "controlled `" + controlledPropName + "` state of " + componentName + " to be " + (wasControlled ? "un" : "") + "controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled " + componentName + " element for the lifetime of the component.\nMore info: https://fb.me/react-controlled-components");
      }
    }, [controlledValue]);
  };
}
exports.useCheckStyles = noop;
{
  exports.useCheckStyles = function useCheckStyles(pkg) {
    var name = React.useRef(pkg);
    React.useEffect(function () {
      return void (name.current = pkg);
    }, [pkg]);
    React.useEffect(function () {
      return exports.checkStyles(name.current);
    }, []);
  };
}
/**
 * React hook for creating a value exactly once.
 * @see https://github.com/Andarist/use-constant
 */

function useConstant(fn) {
  var ref = React__default['default'].useRef();

  if (!ref.current) {
    ref.current = {
      v: fn()
    };
  }

  return ref.current.v;
}
/**
 * @param callback
 */


function useEventCallback(callback) {
  var ref = React.useRef(callback);
  useIsomorphicLayoutEffect(function () {
    ref.current = callback;
  });
  return React.useCallback(function (event) {
    for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      args[_key3 - 1] = arguments[_key3];
    }

    return ref.current.apply(ref, [event].concat(args));
  }, []);
}
/**
 * @param callback
 */


function useCallbackProp(callback) {
  var ref = React.useRef(callback);
  React.useEffect(function () {
    ref.current = callback;
  });
  return React.useCallback(function () {
    return ref.current && ref.current.apply(ref, arguments);
  }, []);
}
/**
 * Adds a DOM event listener
 *
 * @param eventName
 * @param listener
 * @param element
 */


function useEventListener(eventName, listener, element) {
  if (element === void 0) {
    element = window;
  }

  var savedHandler = React.useRef(listener);
  React.useEffect(function () {
    savedHandler.current = listener;
  }, [listener]);
  React.useEffect(function () {
    var isSupported = element && element.addEventListener;

    if (!isSupported) {
      {
        console.warn("Event listener not supported on the element provided");
      }
      return;
    }

    function eventListener(event) {
      savedHandler.current(event);
    }

    element.addEventListener(eventName, eventListener);
    return function () {
      element.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]);
}
/**
 * Detect when focus changes in our document.
 *
 * @param handleChange
 * @param when
 * @param ownerDocument
 */


function useFocusChange(handleChange, when, ownerDocument) {
  if (handleChange === void 0) {
    handleChange = console.log;
  }

  if (when === void 0) {
    when = "focus";
  }

  if (ownerDocument === void 0) {
    ownerDocument = document;
  }

  var lastActiveElement = React.useRef(ownerDocument.activeElement);
  React.useEffect(function () {
    lastActiveElement.current = ownerDocument.activeElement;

    function onChange(event) {
      if (lastActiveElement.current !== ownerDocument.activeElement) {
        handleChange(ownerDocument.activeElement, lastActiveElement.current, event);
        lastActiveElement.current = ownerDocument.activeElement;
      }
    }

    ownerDocument.addEventListener(when, onChange, true);
    return function () {
      ownerDocument.removeEventListener(when, onChange);
    };
  }, [when, handleChange, ownerDocument]);
}
/**
 * Passes or assigns a value to multiple refs (typically a DOM node). Useful for
 * dealing with components that need an explicit ref for DOM calculations but
 * also forwards refs assigned by an app.
 *
 * @param refs Refs to fork
 */


function useForkedRef() {
  for (var _len4 = arguments.length, refs = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
    refs[_key4] = arguments[_key4];
  }

  return React.useMemo(function () {
    if (refs.every(function (ref) {
      return ref == null;
    })) {
      return null;
    }

    return function (node) {
      refs.forEach(function (ref) {
        assignRef(ref, node);
      });
    }; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [].concat(refs));
}
/**
 * Returns the previous value of a reference after a component update.
 *
 * @param value
 */


function usePrevious(value) {
  var ref = React.useRef(null);
  React.useEffect(function () {
    ref.current = value;
  }, [value]);
  return ref.current;
}
/**
 * Call an effect after a component update, skipping the initial mount.
 *
 * @param effect Effect to call
 * @param deps Effect dependency list
 */


function useUpdateEffect(effect, deps) {
  var mounted = React.useRef(false);
  React.useEffect(function () {
    if (mounted.current) {
      effect();
    } else {
      mounted.current = true;
    } // eslint-disable-next-line react-hooks/exhaustive-deps

  }, deps);
}
/**
 * Just a lil state logger
 *
 * @param state
 * @param DEBUG
 */


exports.useStateLogger = noop;
{
  exports.useStateLogger = function useStateLogger(state, DEBUG) {
    if (DEBUG === void 0) {
      DEBUG = false;
    }

    var debugRef = React.useRef(DEBUG);
    React.useEffect(function () {
      debugRef.current = DEBUG;
    }, [DEBUG]);
    React.useEffect(function () {
      if (debugRef.current) {
        console.group("State Updated");
        console.log("%c" + state, "font-weight: normal; font-size: 120%; font-style: italic;");
        console.groupEnd();
      }
    }, [state]);
  };
}
/**
 * Wraps a lib-defined event handler and a user-defined event handler, returning
 * a single handler that allows a user to prevent lib-defined handlers from
 * firing.
 *
 * @param theirHandler User-supplied event handler
 * @param ourHandler Library-supplied event handler
 */

function wrapEvent(theirHandler, ourHandler) {
  return function (event) {
    theirHandler && theirHandler(event);

    if (!event.defaultPrevented) {
      return ourHandler(event);
    }
  };
}

Object.defineProperty(exports, 'warning', {
  enumerable: true,
  get: function () {
    return warning__default['default'];
  }
});
exports.assignRef = assignRef;
exports.boolOrBoolString = boolOrBoolString;
exports.canUseDOM = canUseDOM;
exports.cloneValidElement = cloneValidElement;
exports.createNamedContext = createNamedContext;
exports.forwardRefWithAs = forwardRefWithAs;
exports.getDocumentDimensions = getDocumentDimensions;
exports.getElementComputedStyle = getElementComputedStyle;
exports.getOwnerDocument = getOwnerDocument;
exports.getOwnerWindow = getOwnerWindow;
exports.getScrollPosition = getScrollPosition;
exports.getScrollbarOffset = getScrollbarOffset;
exports.isBoolean = isBoolean;
exports.isFunction = isFunction;
exports.isNumber = isNumber;
exports.isRightClick = isRightClick;
exports.isString = isString;
exports.makeId = makeId;
exports.memoWithAs = memoWithAs;
exports.noop = noop;
exports.ponyfillGlobal = ponyfillGlobal;
exports.stateToAttributeString = stateToAttributeString;
exports.useCallbackProp = useCallbackProp;
exports.useConstant = useConstant;
exports.useControlledState = useControlledState;
exports.useEventCallback = useEventCallback;
exports.useEventListener = useEventListener;
exports.useFocusChange = useFocusChange;
exports.useForkedRef = useForkedRef;
exports.useIsomorphicLayoutEffect = useIsomorphicLayoutEffect;
exports.usePrevious = usePrevious;
exports.useUpdateEffect = useUpdateEffect;
exports.wrapEvent = wrapEvent;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/@chakra-ui/utils/dist/cjs/array.js":
/*!*********************************************************!*\
  !*** ./node_modules/@chakra-ui/utils/dist/cjs/array.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.getFirstItem = getFirstItem;
exports.getLastItem = getLastItem;
exports.getPrevItem = getPrevItem;
exports.getNextItem = getNextItem;
exports.removeIndex = removeIndex;
exports.addItem = addItem;
exports.removeItem = removeItem;
exports.getNextIndex = getNextIndex;
exports.getPrevIndex = getPrevIndex;
exports.chunk = chunk;
exports.getNextItemFromSearch = getNextItemFromSearch;

function getFirstItem(array) {
  return array != null && array.length ? array[0] : undefined;
}

function getLastItem(array) {
  var length = array == null ? 0 : array.length;
  return length ? array[length - 1] : undefined;
}

function getPrevItem(index, array, loop) {
  if (loop === void 0) {
    loop = true;
  }

  var prevIndex = getPrevIndex(index, array.length, loop);
  return array[prevIndex];
}

function getNextItem(index, array, loop) {
  if (loop === void 0) {
    loop = true;
  }

  var nextIndex = getNextIndex(index, array.length, 1, loop);
  return array[nextIndex];
}

function removeIndex(array, index) {
  return array.filter(function (_, idx) {
    return idx !== index;
  });
}

function addItem(array, item) {
  return [].concat(array, [item]);
}

function removeItem(array, item) {
  return array.filter(function (eachItem) {
    return eachItem !== item;
  });
}
/**
 * Get the next index based on the current index and step.
 *
 * @param currentIndex the current index
 * @param length the total length or count of items
 * @param step the number of steps
 * @param loop whether to circle back once `currentIndex` is at the start/end
 */


function getNextIndex(currentIndex, length, step, loop) {
  if (step === void 0) {
    step = 1;
  }

  if (loop === void 0) {
    loop = true;
  }

  var lastIndex = length - 1;

  if (currentIndex === -1) {
    return step > 0 ? 0 : lastIndex;
  }

  var nextIndex = currentIndex + step;

  if (nextIndex < 0) {
    return loop ? lastIndex : 0;
  }

  if (nextIndex >= length) {
    if (loop) return 0;
    return currentIndex > length ? length : currentIndex;
  }

  return nextIndex;
}
/**
 * Get's the previous index based on the current index.
 * Mostly used for keyboard navigation.
 *
 * @param index - the current index
 * @param count - the length or total count of items in the array
 * @param loop - whether we should circle back to the
 * first/last once `currentIndex` is at the start/end
 */


function getPrevIndex(currentIndex, count, loop) {
  if (loop === void 0) {
    loop = true;
  }

  return getNextIndex(currentIndex, count, -1, loop);
}
/**
 * Converts an array into smaller chunks or groups.
 *
 * @param array the array to chunk into group
 * @param size the length of each chunk
 */


function chunk(array, size) {
  return array.reduce(function (rows, currentValue, index) {
    if (index % size === 0) {
      rows.push([currentValue]);
    } else {
      rows[rows.length - 1].push(currentValue);
    }

    return rows;
  }, []);
}
/**
 * Gets the next item based on a search string
 *
 * @param items array of items
 * @param searchString the search string
 * @param itemToString resolves an item to string
 * @param currentItem the current selected item
 */


function getNextItemFromSearch(items, searchString, itemToString, currentItem) {
  if (!searchString) return null; // If current value doesn't exist, find the item that match the search string

  if (!currentItem) {
    var foundItem = items.find(function (item) {
      return itemToString(item).toLowerCase().startsWith(searchString.toLowerCase());
    });
    return foundItem || currentItem;
  } // Filter items for ones that match the search string (case insensitive)


  var searchResults = items.filter(function (item) {
    return itemToString(item).toLowerCase().startsWith(searchString.toLowerCase());
  }); // If there's a match, let's get the next item to select

  if (searchResults.length) {
    var nextIndex; // If the currentItem is in the available items, we move to the next available option

    if (searchResults.includes(currentItem)) {
      var currentIndex = searchResults.indexOf(currentItem);
      nextIndex = currentIndex + 1;

      if (nextIndex === searchResults.length) {
        nextIndex = 0;
      }

      return searchResults[nextIndex];
    } else {
      // Else, we pick the first item in the available items
      nextIndex = items.indexOf(searchResults[0]);
      return items[nextIndex];
    }
  } // a decent fallback to the currentItem


  return currentItem;
}

/***/ }),

/***/ "./node_modules/@chakra-ui/utils/dist/cjs/assertion.js":
/*!*************************************************************!*\
  !*** ./node_modules/@chakra-ui/utils/dist/cjs/assertion.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.isNumber = isNumber;
exports.isNumeric = isNumeric;
exports.isArray = isArray;
exports.isFunction = isFunction;
exports.isNotEmptyObject = isNotEmptyObject;
exports.isString = isString;
exports.isInputEvent = isInputEvent;
exports.__DEV__ = exports.isEmpty = exports.isNull = exports.isEmptyObject = exports.isObject = exports.isUndefined = exports.isDefined = exports.isEmptyArray = exports.isNotNumber = void 0; // Number assertions

function isNumber(value) {
  return typeof value === "number";
}

var isNotNumber = function isNotNumber(value) {
  return typeof value !== "number" || isNaN(value) || !isFinite(value);
};

exports.isNotNumber = isNotNumber;

function isNumeric(value) {
  return value != null && value - parseFloat(value) + 1 >= 0;
} // Array assertions


function isArray(value) {
  return Array.isArray(value);
}

var isEmptyArray = function isEmptyArray(value) {
  return isArray(value) && value.length === 0;
}; // Function assertions


exports.isEmptyArray = isEmptyArray;

function isFunction(value) {
  return typeof value === "function";
} // Generic assertions


var isDefined = function isDefined(value) {
  return typeof value !== "undefined" && value !== undefined;
};

exports.isDefined = isDefined;

var isUndefined = function isUndefined(value) {
  return typeof value === "undefined" || value === undefined;
}; // Object assertions


exports.isUndefined = isUndefined;

var isObject = function isObject(value) {
  var type = typeof value;
  return value != null && (type === "object" || type === "function") && !isArray(value);
};

exports.isObject = isObject;

var isEmptyObject = function isEmptyObject(value) {
  return isObject(value) && Object.keys(value).length === 0;
};

exports.isEmptyObject = isEmptyObject;

function isNotEmptyObject(value) {
  return value && !isEmptyObject(value);
}

var isNull = function isNull(value) {
  return value == null;
}; // String assertions


exports.isNull = isNull;

function isString(value) {
  return Object.prototype.toString.call(value) === "[object String]";
} // Event assertions


function isInputEvent(value) {
  return value && isObject(value) && isObject(value.target);
} // Empty assertions


var isEmpty = function isEmpty(value) {
  if (isArray(value)) return isEmptyArray(value);
  if (isObject(value)) return isEmptyObject(value);
  if (value == null || value === "") return true;
  return false;
};

exports.isEmpty = isEmpty;

var __DEV__ = "development" !== "production";

exports.__DEV__ = __DEV__;

/***/ }),

/***/ "./node_modules/@chakra-ui/utils/dist/cjs/dom-query.js":
/*!*************************************************************!*\
  !*** ./node_modules/@chakra-ui/utils/dist/cjs/dom-query.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.getAllFocusable = getAllFocusable;
exports.getFirstFocusable = getFirstFocusable;
exports.getAllTabbable = getAllTabbable;
exports.getFirstTabbableIn = getFirstTabbableIn;
exports.getLastTabbableIn = getLastTabbableIn;
exports.getNextTabbable = getNextTabbable;
exports.getPreviousTabbable = getPreviousTabbable;
exports.focusNextTabbable = focusNextTabbable;
exports.focusPreviousTabbable = focusPreviousTabbable;
exports.closest = closest;

var _tabbable = __webpack_require__(/*! ./tabbable */ "./node_modules/@chakra-ui/utils/dist/cjs/tabbable.js");

var selectors = ["input", "select", "textarea", "a[href]", "area[href]", "button", "[tabindex]", "audio[controls]", "video[controls]", "[contenteditable]:not([contenteditable=false])"];
var selector = selectors.join();

function getAllFocusable(container) {
  var allFocusable = Array.from(container.querySelectorAll(selector));
  allFocusable.unshift(container);
  return allFocusable.filter(_tabbable.isFocusable);
}

function getFirstFocusable(container) {
  var allFocusable = getAllFocusable(container);
  return allFocusable.length ? allFocusable[0] : null;
}

function getAllTabbable(container, fallbackToFocusable) {
  var allFocusable = Array.from(container.querySelectorAll(selector));
  var allTabbable = allFocusable.filter(_tabbable.isTabbable);

  if ((0, _tabbable.isTabbable)(container)) {
    allTabbable.unshift(container);
  }

  if (!allTabbable.length && fallbackToFocusable) {
    return allFocusable;
  }

  return allTabbable;
}

function getFirstTabbableIn(container, fallbackToFocusable) {
  var _getAllTabbable = getAllTabbable(container, fallbackToFocusable),
      first = _getAllTabbable[0];

  return first || null;
}

function getLastTabbableIn(container, fallbackToFocusable) {
  var allTabbable = getAllTabbable(container, fallbackToFocusable);
  return allTabbable[allTabbable.length - 1] || null;
}

function getNextTabbable(container, fallbackToFocusable) {
  var allFocusable = getAllFocusable(container);
  var index = allFocusable.indexOf(document.activeElement);
  var slice = allFocusable.slice(index + 1);
  return slice.find(_tabbable.isTabbable) || allFocusable.find(_tabbable.isTabbable) || (fallbackToFocusable ? slice[0] : null);
}

function getPreviousTabbable(container, fallbackToFocusable) {
  var allFocusable = getAllFocusable(container).reverse();
  var index = allFocusable.indexOf(document.activeElement);
  var slice = allFocusable.slice(index + 1);
  return slice.find(_tabbable.isTabbable) || allFocusable.find(_tabbable.isTabbable) || (fallbackToFocusable ? slice[0] : null);
}

function focusNextTabbable(container, fallbackToFocusable) {
  var nextTabbable = getNextTabbable(container, fallbackToFocusable);

  if (nextTabbable && (0, _tabbable.isHTMLElement)(nextTabbable)) {
    nextTabbable.focus();
  }
}

function focusPreviousTabbable(container, fallbackToFocusable) {
  var previousTabbable = getPreviousTabbable(container, fallbackToFocusable);

  if (previousTabbable && (0, _tabbable.isHTMLElement)(previousTabbable)) {
    previousTabbable.focus();
  }
}

function matches(element, selectors) {
  if ("matches" in element) return element.matches(selectors);
  if ("msMatchesSelector" in element) return element.msMatchesSelector(selectors);
  return element.webkitMatchesSelector(selectors);
}

function closest(element, selectors) {
  if ("closest" in element) return element.closest(selectors);

  do {
    if (matches(element, selectors)) return element;
    element = element.parentElement || element.parentNode;
  } while (element !== null && element.nodeType === 1);

  return null;
}

/***/ }),

/***/ "./node_modules/@chakra-ui/utils/dist/cjs/dom.js":
/*!*******************************************************!*\
  !*** ./node_modules/@chakra-ui/utils/dist/cjs/dom.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.normalizeEventKey = normalizeEventKey;
exports.cx = exports.getOwnerDocument = exports.ariaAttr = exports.dataAttr = exports.isBrowser = exports.getWindow = void 0;
var _window = undefined; // Note: Accessing "window" in IE11 is somewhat expensive, and calling "typeof window"
// hits a memory leak, whereas aliasing it and calling "typeof _window" does not.
// Caching the window value at the file scope lets us minimize the impact.

try {
  _window = window;
} catch (e) {
  /* no-op */
}
/**
 * Helper to get the window object. The helper will make sure to use a cached variable
 * of "window", to avoid overhead and memory leaks in IE11.
 */


var getWindow = function getWindow(node) {
  var _node$ownerDocument$d, _node$ownerDocument;

  return (_node$ownerDocument$d = node == null ? void 0 : (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) != null ? _node$ownerDocument$d : _window;
};
/**
 * Check if we can use the DOM. Useful for SSR purposes
 */


exports.getWindow = getWindow;

function checkIsBrowser() {
  var _window = getWindow();

  return Boolean(typeof _window !== "undefined" && _window.document && _window.document.createElement);
}

var isBrowser = checkIsBrowser();
/**
 * Get the normalized event key across all browsers
 * @param event keyboard event
 */

exports.isBrowser = isBrowser;

function normalizeEventKey(event) {
  var key = event.key,
      keyCode = event.keyCode;
  var isArrowKey = keyCode >= 37 && keyCode <= 40 && key.indexOf("Arrow") !== 0;
  return isArrowKey ? "Arrow" + key : key;
}

var dataAttr = function dataAttr(condition) {
  return condition ? "" : undefined;
};

exports.dataAttr = dataAttr;

var ariaAttr = function ariaAttr(condition) {
  return condition ? true : undefined;
};

exports.ariaAttr = ariaAttr;

var getOwnerDocument = function getOwnerDocument(node) {
  return (node == null ? void 0 : node.ownerDocument) || document;
};

exports.getOwnerDocument = getOwnerDocument;

var cx = function cx() {
  for (var _len = arguments.length, classNames = new Array(_len), _key = 0; _key < _len; _key++) {
    classNames[_key] = arguments[_key];
  }

  return classNames.filter(Boolean).join(" ");
};

exports.cx = cx;

/***/ }),

/***/ "./node_modules/@chakra-ui/utils/dist/cjs/function.js":
/*!************************************************************!*\
  !*** ./node_modules/@chakra-ui/utils/dist/cjs/function.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.runIfFn = runIfFn;
exports.callAllHandlers = callAllHandlers;
exports.once = once;
exports.noop = void 0;

var _assertion = __webpack_require__(/*! ./assertion */ "./node_modules/@chakra-ui/utils/dist/cjs/assertion.js");

var _memoizeOne = _interopRequireDefault(__webpack_require__(/*! memoize-one */ "./node_modules/memoize-one/dist/memoize-one.cjs.js"));

exports.memoizeOne = _memoizeOne["default"];

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

function runIfFn(valueOrFn) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return (0, _assertion.isFunction)(valueOrFn) ? valueOrFn.apply(void 0, args) : valueOrFn;
}

function callAllHandlers() {
  for (var _len2 = arguments.length, fns = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    fns[_key2] = arguments[_key2];
  }

  return function (event) {
    fns.some(function (fn) {
      fn && fn(event);
      return event && event.defaultPrevented;
    });
  };
}

function once(fn) {
  var result;
  return function () {
    if (fn) {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      result = fn.apply(this, args);
      fn = null;
    }

    return result;
  };
}

var noop = function noop() {};

exports.noop = noop;

/***/ }),

/***/ "./node_modules/@chakra-ui/utils/dist/cjs/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/@chakra-ui/utils/dist/cjs/index.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _function = __webpack_require__(/*! ./function */ "./node_modules/@chakra-ui/utils/dist/cjs/function.js");

Object.keys(_function).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  exports[key] = _function[key];
});

var _types = __webpack_require__(/*! ./types */ "./node_modules/@chakra-ui/utils/dist/cjs/types.js");

Object.keys(_types).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  exports[key] = _types[key];
});

var _dom = __webpack_require__(/*! ./dom */ "./node_modules/@chakra-ui/utils/dist/cjs/dom.js");

Object.keys(_dom).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  exports[key] = _dom[key];
});

var _array = __webpack_require__(/*! ./array */ "./node_modules/@chakra-ui/utils/dist/cjs/array.js");

Object.keys(_array).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  exports[key] = _array[key];
});

var _keydown = __webpack_require__(/*! ./keydown */ "./node_modules/@chakra-ui/utils/dist/cjs/keydown.js");

Object.keys(_keydown).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  exports[key] = _keydown[key];
});

var _object = __webpack_require__(/*! ./object */ "./node_modules/@chakra-ui/utils/dist/cjs/object.js");

Object.keys(_object).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  exports[key] = _object[key];
});

var _number = __webpack_require__(/*! ./number */ "./node_modules/@chakra-ui/utils/dist/cjs/number.js");

Object.keys(_number).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  exports[key] = _number[key];
});

var _domQuery = __webpack_require__(/*! ./dom-query */ "./node_modules/@chakra-ui/utils/dist/cjs/dom-query.js");

Object.keys(_domQuery).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  exports[key] = _domQuery[key];
});

var _tabbable = __webpack_require__(/*! ./tabbable */ "./node_modules/@chakra-ui/utils/dist/cjs/tabbable.js");

Object.keys(_tabbable).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  exports[key] = _tabbable[key];
});

var _assertion = __webpack_require__(/*! ./assertion */ "./node_modules/@chakra-ui/utils/dist/cjs/assertion.js");

Object.keys(_assertion).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  exports[key] = _assertion[key];
});

var _reactHelpers = __webpack_require__(/*! ./react-helpers */ "./node_modules/@chakra-ui/utils/dist/cjs/react-helpers.js");

Object.keys(_reactHelpers).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  exports[key] = _reactHelpers[key];
});

var _cssBoxModel = __webpack_require__(/*! css-box-model */ "./node_modules/css-box-model/dist/css-box-model.cjs.js");

Object.keys(_cssBoxModel).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  exports[key] = _cssBoxModel[key];
});

var _logger = __webpack_require__(/*! ./logger */ "./node_modules/@chakra-ui/utils/dist/cjs/logger.js");

Object.keys(_logger).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  exports[key] = _logger[key];
});

var _responsive = __webpack_require__(/*! ./responsive */ "./node_modules/@chakra-ui/utils/dist/cjs/responsive.js");

Object.keys(_responsive).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  exports[key] = _responsive[key];
});

/***/ }),

/***/ "./node_modules/@chakra-ui/utils/dist/cjs/keydown.js":
/*!***********************************************************!*\
  !*** ./node_modules/@chakra-ui/utils/dist/cjs/keydown.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.createOnKeyDown = createOnKeyDown;

var _function = __webpack_require__(/*! ./function */ "./node_modules/@chakra-ui/utils/dist/cjs/function.js");

var _dom = __webpack_require__(/*! ./dom */ "./node_modules/@chakra-ui/utils/dist/cjs/dom.js"); // Credit goes to Diego Haz for this one
// https://github.com/reakit/reakit/blob/master/packages/reakit-utils/src/createOnKeyDown.ts


function createOnKeyDown(options) {
  var keyMap = options.keyMap,
      onKey = options.onKey,
      stopPropagation = options.stopPropagation,
      onKeyDown = options.onKeyDown,
      _options$shouldKeyDow = options.shouldKeyDown,
      shouldKeyDown = _options$shouldKeyDow === void 0 ? function () {
    return true;
  } : _options$shouldKeyDow,
      _options$preventDefau = options.preventDefault,
      preventDefault = _options$preventDefau === void 0 ? true : _options$preventDefau;
  return function (event) {
    if (!keyMap) return;
    var finalKeyMap = (0, _function.runIfFn)(keyMap, event);
    var shouldPreventDefault = (0, _function.runIfFn)(preventDefault, event);
    var shouldStopPropagation = (0, _function.runIfFn)(stopPropagation, event);
    var eventKey = (0, _dom.normalizeEventKey)(event);

    if (eventKey in finalKeyMap) {
      var action = finalKeyMap[eventKey];

      if (typeof action === "function" && shouldKeyDown(event)) {
        if (shouldPreventDefault) event.preventDefault();
        if (shouldStopPropagation) event.stopPropagation();
        onKey == null ? void 0 : onKey(event);
        action(event);
        return;
      }
    }

    onKeyDown == null ? void 0 : onKeyDown(event);
  };
}

/***/ }),

/***/ "./node_modules/@chakra-ui/utils/dist/cjs/logger.js":
/*!**********************************************************!*\
  !*** ./node_modules/@chakra-ui/utils/dist/cjs/logger.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.warn = warn;
exports.error = error;

var _assertion = __webpack_require__(/*! ./assertion */ "./node_modules/@chakra-ui/utils/dist/cjs/assertion.js");

function warn(options) {
  if (options.condition && _assertion.__DEV__) {
    console.warn(options.message);
  }
}

function error(options) {
  if (options.condition && _assertion.__DEV__) {
    console.error(options.message);
  }
}

/***/ }),

/***/ "./node_modules/@chakra-ui/utils/dist/cjs/number.js":
/*!**********************************************************!*\
  !*** ./node_modules/@chakra-ui/utils/dist/cjs/number.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.toPrecision = toPrecision;
exports.countDecimalPlaces = countDecimalPlaces;
exports.valueToPercent = valueToPercent;
exports.percentToValue = percentToValue;
exports.roundValueToStep = roundValueToStep;
exports.clampValue = clampValue;
exports.maxSafeInteger = exports.minSafeInteger = void 0;

var _assertion = __webpack_require__(/*! ./assertion */ "./node_modules/@chakra-ui/utils/dist/cjs/assertion.js");

var _logger = __webpack_require__(/*! ./logger */ "./node_modules/@chakra-ui/utils/dist/cjs/logger.js");

var minSafeInteger = Number.MIN_SAFE_INTEGER || -9007199254740991;
exports.minSafeInteger = minSafeInteger;
var maxSafeInteger = Number.MAX_SAFE_INTEGER || 9007199254740991;
/**
 * Convert a value to number
 * @param value the value to convert
 */

exports.maxSafeInteger = maxSafeInteger;

function toNumber(value) {
  var num = parseFloat(value);
  return (0, _assertion.isNotNumber)(num) ? 0 : num;
}
/**
 * Converts a value to a specific precision (or decimal points).
 *
 * Returns a string representing a number in fixed-point notation.
 *
 * @param value the value to convert
 * @param precision the precision or decimal points
 */


function toPrecision(value, precision) {
  var nextValue = toNumber(value);
  var scaleFactor = Math.pow(10, precision != null ? precision : 10);
  nextValue = Math.round(nextValue * scaleFactor) / scaleFactor;
  return precision ? nextValue.toFixed(precision) : nextValue.toString();
}
/**
 * Counts the number of decimal places a number has
 *
 * @param value the decimal value to count
 */


function countDecimalPlaces(value) {
  if (!isFinite(value)) return 0;
  var e = 1;
  var p = 0;

  while (Math.round(value * e) / e !== value) {
    e *= 10;
    p++;
  }

  return p;
}
/**
 * Convert a value to percentage based on lower and upper bound values
 *
 * @param value the value in number
 * @param min the minimum value
 * @param max the maximum value
 */


function valueToPercent(value, min, max) {
  return (value - min) * 100 / (max - min);
}
/**
 * Calculate the value based on percentage, lower and upper bound values
 *
 * @param percent the percent value in decimals (e.g 0.6, 0.3)
 * @param min the minimum value
 * @param max the maximum value
 */


function percentToValue(percent, min, max) {
  return (max - min) * percent + min;
}
/**
 * Rounds a specific value to the next or previous step
 *
 * @param value the value to round
 * @param step the specified step
 */


function roundValueToStep(value, step) {
  var nextValue = Math.round(value / step) * step;
  var precision = countDecimalPlaces(step);
  return toPrecision(nextValue, precision);
}
/**
 * Clamps a value to ensure it stays within the min and max range.
 *
 * @param value the value to clamp
 * @param min the minimum value
 * @param max the maximum value
 */


function clampValue(value, min, max) {
  if (value == null) return value;
  (0, _logger.warn)({
    condition: max < min,
    message: "[Chakra UI] clamp: max cannot be less than min"
  });
  return Math.min(Math.max(value, min), max);
}

/***/ }),

/***/ "./node_modules/@chakra-ui/utils/dist/cjs/object.js":
/*!**********************************************************!*\
  !*** ./node_modules/@chakra-ui/utils/dist/cjs/object.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.omit = omit;
exports.pick = pick;
exports.split = split;
exports.get = get;
exports.getWithDefault = getWithDefault;
exports.filterUndefined = filterUndefined;
exports.objectKeys = void 0;

var _deepmerge = _interopRequireDefault(__webpack_require__(/*! deepmerge */ "./node_modules/deepmerge/dist/cjs.js"));

exports.merge = _deepmerge["default"];

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

function _extends() {
  _extends = Object.assign || function (target) {
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

function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it;

  if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;
      return function () {
        if (i >= o.length) return {
          done: true
        };
        return {
          done: false,
          value: o[i++]
        };
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  it = o[Symbol.iterator]();
  return it.next.bind(it);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function omit(object, keys) {
  var result = {};

  for (var key in object) {
    if (keys.includes(key)) continue;
    result[key] = object[key];
  }

  return result;
}

function pick(object, keys) {
  var result = {};

  for (var _iterator = _createForOfIteratorHelperLoose(keys), _step; !(_step = _iterator()).done;) {
    var key = _step.value;

    if (key in object) {
      result[key] = object[key];
    }
  }

  return result;
}

function split(object, keys) {
  var picked = {};
  var omitted = {};

  for (var key in object) {
    if (keys.includes(key)) {
      picked[key] = object[key];
    } else {
      omitted[key] = object[key];
    }
  }

  return [picked, omitted];
}
/**
 * Get value from a deeply nested object using a string path
 * @param obj - the object
 * @param path - the string path
 * @param def  - the fallback value
 */


function get(obj, path, fallback, index) {
  var _path$split, _path; //@ts-ignore


  path = (_path$split = (_path = path) == null ? void 0 : _path.split == null ? void 0 : _path.split(".")) != null ? _path$split : [path];

  for (index = 0; index < path.length; index++) {
    obj = obj ? obj[path[index]] : undefined;
  }

  return obj === undefined ? fallback : obj;
}
/**
 * Get value from deeply nested object, based on path
 * It returns the path value if not found in object
 *
 * @param path - the string path or value
 * @param scale - the string path or value
 */


function getWithDefault(path, scale) {
  return get(scale, path, path);
}

function filterUndefined(object) {
  var result = _extends({}, object);

  for (var item in result) {
    if (typeof result[item] === "undefined") {
      delete result[item];
    }
  }

  return result;
}

var objectKeys = function objectKeys(obj) {
  return Object.keys(obj);
};

exports.objectKeys = objectKeys;

/***/ }),

/***/ "./node_modules/@chakra-ui/utils/dist/cjs/react-helpers.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@chakra-ui/utils/dist/cjs/react-helpers.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.createContext = createContext;
exports.getValidChildren = getValidChildren;
exports.assignRef = assignRef;
exports.mergeRefs = mergeRefs;

var React = _interopRequireWildcard(__webpack_require__(/*! react */ "react"));

var _assertion = __webpack_require__(/*! ./assertion */ "./node_modules/@chakra-ui/utils/dist/cjs/assertion.js");

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();

  _getRequireWildcardCache = function _getRequireWildcardCache() {
    return cache;
  };

  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
    return {
      "default": obj
    };
  }

  var cache = _getRequireWildcardCache();

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }

  newObj["default"] = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
}
/**
 * Creates a named context, provider, and hook.
 *
 * @param options create context options
 */


function createContext(options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
      _options$strict = _options.strict,
      strict = _options$strict === void 0 ? true : _options$strict,
      _options$errorMessage = _options.errorMessage,
      errorMessage = _options$errorMessage === void 0 ? "useContext must be inside a Provider with a value" : _options$errorMessage,
      name = _options.name;
  var Context = /*#__PURE__*/React.createContext(undefined);
  Context.displayName = name;

  function useContext() {
    var context = React.useContext(Context);
    if (!context && strict) throw new Error(errorMessage);
    return context;
  }

  return [Context.Provider, useContext, Context];
}
/**
 * Gets only the valid children of a component,
 * and ignores any nullish or falsy child.
 *
 * @param children the children
 */


function getValidChildren(children) {
  return React.Children.toArray(children).filter(function (child) {
    return /*#__PURE__*/React.isValidElement(child);
  });
}
/**
 * Assigns a value to a ref function or object
 *
 * @param ref the ref to assign to
 * @param value the value
 */


function assignRef(ref, value) {
  if (ref == null) return;

  if ((0, _assertion.isFunction)(ref)) {
    ref(value);
    return;
  }

  try {
    //@ts-ignore
    ref.current = value;
  } catch (error) {
    throw new Error("Cannot assign value '" + value + "' to ref '" + ref + "'");
  }
}
/**
 * Combine multiple React refs into a single ref function.
 * This is used mostly when you need to allow consumers forward refs to
 * internal components
 *
 * @param refs refs to assign to value to
 */


function mergeRefs() {
  for (var _len = arguments.length, refs = new Array(_len), _key = 0; _key < _len; _key++) {
    refs[_key] = arguments[_key];
  }

  return function (value) {
    refs.forEach(function (ref) {
      return assignRef(ref, value);
    });
  };
}

/***/ }),

/***/ "./node_modules/@chakra-ui/utils/dist/cjs/responsive.js":
/*!**************************************************************!*\
  !*** ./node_modules/@chakra-ui/utils/dist/cjs/responsive.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.mapResponsive = mapResponsive;
exports.objectToArrayNotation = objectToArrayNotation;

var _assertion = __webpack_require__(/*! ./assertion */ "./node_modules/@chakra-ui/utils/dist/cjs/assertion.js");

var _object = __webpack_require__(/*! ./object */ "./node_modules/@chakra-ui/utils/dist/cjs/object.js");

var _array = __webpack_require__(/*! ./array */ "./node_modules/@chakra-ui/utils/dist/cjs/array.js");

function mapResponsive(prop, mapper) {
  if ((0, _assertion.isArray)(prop)) {
    return prop.map(function (item) {
      if (item === null) {
        return null;
      }

      return mapper(item);
    });
  }

  if ((0, _assertion.isObject)(prop)) {
    return (0, _object.objectKeys)(prop).reduce(function (result, key) {
      result[key] = mapper(prop[key]);
      return result;
    }, {});
  }

  if (prop != null) {
    return mapper(prop);
  }

  return null;
}

function objectToArrayNotation(obj) {
  var base = [["base", null], ["sm", null], ["md", null], ["lg", null]];
  var entries = (0, _object.merge)(base, Object.entries(obj));
  var mergedObj = Object.fromEntries(entries);
  var array = Object.values(mergedObj);
  var isNullBetweenValues = false;
  array.forEach(function (item, index) {
    var next = array[index + 1];

    if (item === null && next != null) {
      isNullBetweenValues = true;
    }
  });

  if (!isNullBetweenValues) {
    array = array.filter(function (item) {
      return item !== null;
    });
  }

  while ((0, _array.getLastItem)(array) === null) {
    array.pop();
  }

  return array;
}

/***/ }),

/***/ "./node_modules/@chakra-ui/utils/dist/cjs/tabbable.js":
/*!************************************************************!*\
  !*** ./node_modules/@chakra-ui/utils/dist/cjs/tabbable.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.isDisabled = isDisabled;
exports.hasFocusWithin = hasFocusWithin;
exports.isHTMLElement = isHTMLElement;
exports.isHidden = isHidden;
exports.isContentEditable = isContentEditable;
exports.isFocusable = isFocusable;
exports.ensureFocus = ensureFocus;
exports.isTabbable = isTabbable;
exports.hasNegativeTabIndex = exports.hasTabIndex = exports.hasDisplayNone = void 0; // Really great work done by Diego Haz on this one
// https://github.com/reakit/reakit/blob/master/packages/reakit-utils/src/tabbable.ts

var hasDisplayNone = function hasDisplayNone(element) {
  return window.getComputedStyle(element).display === "none";
};

exports.hasDisplayNone = hasDisplayNone;

var hasTabIndex = function hasTabIndex(element) {
  return element.hasAttribute("tabindex");
};

exports.hasTabIndex = hasTabIndex;

var hasNegativeTabIndex = function hasNegativeTabIndex(element) {
  return hasTabIndex(element) && element.tabIndex === -1;
};

exports.hasNegativeTabIndex = hasNegativeTabIndex;

function isDisabled(element) {
  return Boolean(element.getAttribute("disabled")) == true || Boolean(element.getAttribute("aria-disabled")) == true;
}

function hasFocusWithin(element) {
  if (!document.activeElement) return false;
  return element.contains(document.activeElement);
}

function isHTMLElement(element) {
  return element instanceof HTMLElement;
}

function isHidden(element) {
  if (element.parentElement && isHidden(element.parentElement)) return true;
  return element.hidden;
}

function isContentEditable(element) {
  var value = element.getAttribute("contenteditable");
  return value !== "false" && value != null;
}

function isFocusable(element) {
  if (!isHTMLElement(element) || isHidden(element) || isDisabled(element)) {
    return false;
  }

  var localName = element.localName;
  var focusableTags = ["input", "select", "textarea", "button"];
  if (focusableTags.indexOf(localName) >= 0) return true;
  var others = {
    a: function a() {
      return element.hasAttribute("href");
    },
    audio: function audio() {
      return element.hasAttribute("controls");
    },
    video: function video() {
      return element.hasAttribute("controls");
    }
  };

  if (localName in others) {
    return others[localName]();
  }

  if (isContentEditable(element)) return true;
  return hasTabIndex(element);
}

var isActiveElement = function isActiveElement(element) {
  return document.activeElement === element;
};

function ensureFocus(element, _temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      _ref$isActive = _ref.isActive,
      isActive = _ref$isActive === void 0 ? isActiveElement : _ref$isActive,
      preventScroll = _ref.preventScroll;

  if (isActive(element)) return -1;
  return requestAnimationFrame(function () {
    element.focus({
      preventScroll: preventScroll
    });
  });
}

function isTabbable(element) {
  return isHTMLElement(element) && isFocusable(element) && !hasNegativeTabIndex(element);
}

/***/ }),

/***/ "./node_modules/@chakra-ui/utils/dist/cjs/types.js":
/*!*********************************************************!*\
  !*** ./node_modules/@chakra-ui/utils/dist/cjs/types.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/***/ }),

/***/ "./node_modules/@typeform/embed/build/lib.pure.js":
/*!********************************************************!*\
  !*** ./node_modules/@typeform/embed/build/lib.pure.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!function (e, t) {
   true ? module.exports = t(__webpack_require__(/*! react */ "react"), __webpack_require__(/*! react-dom */ "react-dom")) : undefined;
}(this, function (n, r) {
  return a = {}, o.m = i = [function (e, t) {
    e.exports = n;
  }, function (e, t, n) {
    "use strict";

    n.d(t, "c", function () {
      return c;
    }), n.d(t, "b", function () {
      return u;
    }), n.d(t, "l", function () {
      return p;
    }), n.d(t, "a", function () {
      return d;
    }), n.d(t, "k", function () {
      return f;
    }), n.d(t, "e", function () {
      return h;
    }), n.d(t, "g", function () {
      return m;
    }), n.d(t, "d", function () {
      return b;
    }), n.d(t, "h", function () {
      return y;
    }), n.d(t, "i", function () {
      return g;
    }), n.d(t, "j", function () {
      return v;
    }), n.d(t, "f", function () {
      return w;
    });
    var r = n(14),
        l = n.n(r),
        o = n(8);

    function i(e) {
      return (i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
        return typeof e;
      } : function (e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
      })(e);
    }

    function a(e, t) {
      if (null == e) return {};

      var n,
          r = function (e, t) {
        if (null == e) return {};
        var n,
            r,
            o = {},
            i = Object.keys(e);

        for (r = 0; r < i.length; r++) n = i[r], 0 <= t.indexOf(n) || (o[n] = e[n]);

        return o;
      }(e, t);

      if (Object.getOwnPropertySymbols) for (var o = Object.getOwnPropertySymbols(e), i = 0; i < o.length; i++) n = o[i], 0 <= t.indexOf(n) || Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
      return r;
    }

    function s(e) {
      var t = function (e, t) {
        if ("object" !== i(e) || null === e) return e;
        var n = e[Symbol.toPrimitive];
        if (void 0 === n) return ("string" === t ? String : Number)(e);
        var r = n.call(e, t || "default");
        if ("object" !== i(r)) return r;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }(e, "string");

      return "symbol" === i(t) ? t : String(t);
    }

    var c = function (r, o) {
      return function (e) {
        var t, n;
        t = o, (n = e).detail && n.detail.embedId === t && r(e);
      };
    },
        u = function (e, t) {
      t.data.embedId === e && Object(o.a)(t);
    },
        p = function (e, t, n) {
      return d(n, (i = t, (o = e) in (r = {}) ? Object.defineProperty(r, o, {
        value: i,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }) : r[o] = i, r));
      var r, o, i;
    },
        d = function (e, t) {
      var n = [],
          r = l()(e, !0),
          o = r.query,
          i = r.origin,
          a = r.pathname,
          s = r.hash,
          c = a.replace(/\/$/, ""),
          u = Object.assign({}, o, t);
      return Object.keys(u).forEach(function (e) {
        n.push("".concat(encodeURIComponent(e), "=").concat(encodeURIComponent(u[e])));
      }), "".concat(i).concat(c, "?").concat(n.join("&")).concat(s);
    },
        f = function (r, o) {
      return Object.keys(o).reduce(function (e, t) {
        var n = o[t];
        return null != n && null != r[t] && !1 !== r[t] && (e[n] = r[t]), e;
      }, {});
    },
        h = function () {
      var e, t, n;
      document.querySelector && (t = "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0", (e = document.querySelector("meta[name=viewport]")) ? e.setAttribute("content", t) : ((n = document.createElement("meta")).content = t, n.name = "viewport", document.head.appendChild(n)));
    },
        m = function (e) {
      if (window.top !== window) return !1;
      var t = e.getBoundingClientRect(),
          n = .2 * t.height,
          r = window.innerWidth || document.documentElement.clientWidth,
          o = window.innerHeight || document.documentElement.clientHeight;
      return t.top >= -n && t.left >= -n && t.bottom <= o + n && t.right <= r + n;
    },
        b = function (r, o, i) {
      var a;
      return function () {
        for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];

        clearTimeout(a), a = setTimeout(function () {
          a = null, r.call.apply(r, [i].concat(t));
        }, o);
      };
    },
        y = function () {
      return null;
    },
        g = function (e, t) {
      t[e];
      return a(t, [e].map(s));
    },
        v = function (e) {
      var t = e.detail.url;

      try {
        var n = document.createElement("a");
        n.href = t, document.body.appendChild(n), n.click(), document.body.removeChild(n);
      } catch (e) {}
    },
        w = function (e) {
      return {
        response_id: e && e.detail ? e.detail.response_id : void 0
      };
    };
  }, function (e, t, n) {
    e.exports = n(23)();
  }, function (e, Ie, Re) {
    "use strict";

    (function (e) {
      Re.d(Ie, "a", function () {
        return Pe;
      }), Re.d(Ie, "b", function () {
        return ae;
      }), Re.d(Ie, "d", function () {
        return Ae;
      });
      var i = Re(9),
          E = Re(0),
          g = Re.n(E),
          y = (Re(18), Re(19)),
          a = Re(20),
          P = Re(12),
          t = Re(11),
          v = Re.n(t);

      function A() {
        return (A = Object.assign || function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];

            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }

          return e;
        }).apply(this, arguments);
      }

      var o = function (e, t) {
        for (var n = [e[0]], r = 0, o = t.length; r < o; r += 1) n.push(t[r], e[r + 1]);

        return n;
      },
          c = function (e) {
        return null !== e && "object" == typeof e && "[object Object]" === (e.toString ? e.toString() : Object.prototype.toString.call(e)) && !Object(i.typeOf)(e);
      },
          w = Object.freeze([]),
          I = Object.freeze({});

      function u(e) {
        return "function" == typeof e;
      }

      function O(e) {
        return e.displayName || e.name || "Component";
      }

      function k(e) {
        return e && "string" == typeof e.styledComponentId;
      }

      function s() {
        return Re.nc;
      }

      var p = void 0 !== e && (e.env.REACT_APP_SC_ATTR || e.env.SC_ATTR) || "data-styled",
          l = "data-styled-version",
          d = "5.1.1",
          f = "/*!sc*/\n",
          r = "undefined" != typeof window && "HTMLElement" in window,
          n = "boolean" == typeof SC_DISABLE_SPEEDY && SC_DISABLE_SPEEDY || void 0 !== e && (e.env.REACT_APP_SC_DISABLE_SPEEDY || e.env.SC_DISABLE_SPEEDY) || !1,
          h = {};

      function C(e) {
        for (var t = arguments.length, n = new Array(1 < t ? t - 1 : 0), r = 1; r < t; r++) n[r - 1] = arguments[r];

        throw new Error("An error occurred. See https://github.com/styled-components/styled-components/blob/master/packages/styled-components/src/utils/errors.md#" + e + " for more information." + (0 < n.length ? " Additional arguments: " + n.join(", ") : ""));
      }

      function m(e) {
        var t = document.head,
            n = e || t,
            r = document.createElement("style"),
            o = function (e) {
          for (var t = e.childNodes, n = t.length; 0 <= n; n--) {
            var r = t[n];
            if (r && 1 === r.nodeType && r.hasAttribute(p)) return r;
          }
        }(n),
            i = void 0 !== o ? o.nextSibling : null;

        r.setAttribute(p, "active"), r.setAttribute(l, d);
        var a = s();
        return a && r.setAttribute("nonce", a), n.insertBefore(r, i), r;
      }

      function b(e) {
        if (F.has(e)) return F.get(e);
        var t = M++;
        return F.set(e, t), D.set(t, e), t;
      }

      function S(e) {
        for (var t, n = e.getTag(), r = n.length, o = "", i = 0; i < r; i++) {
          var a,
              s,
              c,
              u,
              l = (t = i, D.get(t));
          void 0 !== l && (a = e.names.get(l), s = n.getGroup(i), void 0 !== a && 0 !== s.length && (c = p + ".g" + i + '[id="' + l + '"]', u = "", void 0 !== a && a.forEach(function (e) {
            0 < e.length && (u += e + ",");
          }), o += s + c + '{content:"' + u + '"}' + f));
        }

        return o;
      }

      function j(e, t) {
        for (var n, r, o = t.innerHTML.split(f), i = [], a = 0, s = o.length; a < s; a++) {
          var c,
              u,
              l,
              p = o[a].trim();
          p && ((c = p.match($)) ? (u = 0 | parseInt(c[1], 10), l = c[2], 0 != u && (n = l, M <= (r = u) && (M = r + 1), F.set(n, r), D.set(r, n), function (e, t, n) {
            for (var r, o = n.split(","), i = 0, a = o.length; i < a; i++) (r = o[i]) && e.registerName(t, r);
          }(e, l, c[3]), e.getTag().insertRules(u, i)), i.length = 0) : i.push(p));
        }
      }

      function x(e) {
        return H(B, e);
      }

      var R = function () {
        function e(e) {
          var t = this.element = m(e);
          t.appendChild(document.createTextNode("")), this.sheet = function (e) {
            if (e.sheet) return e.sheet;

            for (var t = document.styleSheets, n = 0, r = t.length; n < r; n++) {
              var o = t[n];
              if (o.ownerNode === e) return o;
            }

            C(17);
          }(t), this.length = 0;
        }

        var t = e.prototype;
        return t.insertRule = function (e, t) {
          try {
            return this.sheet.insertRule(t, e), this.length++, !0;
          } catch (e) {
            return !1;
          }
        }, t.deleteRule = function (e) {
          this.sheet.deleteRule(e), this.length--;
        }, t.getRule = function (e) {
          var t = this.sheet.cssRules[e];
          return void 0 !== t && "string" == typeof t.cssText ? t.cssText : "";
        }, e;
      }(),
          T = function () {
        function e(e) {
          var t = this.element = m(e);
          this.nodes = t.childNodes, this.length = 0;
        }

        var t = e.prototype;
        return t.insertRule = function (e, t) {
          if (e <= this.length && 0 <= e) {
            var n = document.createTextNode(t),
                r = this.nodes[e];
            return this.element.insertBefore(n, r || null), this.length++, !0;
          }

          return !1;
        }, t.deleteRule = function (e) {
          this.element.removeChild(this.nodes[e]), this.length--;
        }, t.getRule = function (e) {
          return e < this.length ? this.nodes[e].textContent : "";
        }, e;
      }(),
          _ = function () {
        function e(e) {
          this.rules = [], this.length = 0;
        }

        var t = e.prototype;
        return t.insertRule = function (e, t) {
          return e <= this.length && (this.rules.splice(e, 0, t), this.length++, !0);
        }, t.deleteRule = function (e) {
          this.rules.splice(e, 1), this.length--;
        }, t.getRule = function (e) {
          return e < this.length ? this.rules[e] : "";
        }, e;
      }(),
          L = function () {
        function e(e) {
          this.groupSizes = new Uint32Array(512), this.length = 512, this.tag = e;
        }

        var t = e.prototype;
        return t.indexOfGroup = function (e) {
          for (var t = 0, n = 0; n < e; n++) t += this.groupSizes[n];

          return t;
        }, t.insertRules = function (e, t) {
          if (e >= this.groupSizes.length) {
            for (var n = this.groupSizes, r = n.length, o = r; o <= e;) (o <<= 1) < 0 && C(16, "" + e);

            this.groupSizes = new Uint32Array(o), this.groupSizes.set(n), this.length = o;

            for (var i = r; i < o; i++) this.groupSizes[i] = 0;
          }

          for (var a = this.indexOfGroup(e + 1), s = 0, c = t.length; s < c; s++) this.tag.insertRule(a, t[s]) && (this.groupSizes[e]++, a++);
        }, t.clearGroup = function (e) {
          if (e < this.length) {
            var t = this.groupSizes[e],
                n = this.indexOfGroup(e),
                r = n + t;
            this.groupSizes[e] = 0;

            for (var o = n; o < r; o++) this.tag.deleteRule(n);
          }
        }, t.getGroup = function (e) {
          var t = "";
          if (e >= this.length || 0 === this.groupSizes[e]) return t;

          for (var n = this.groupSizes[e], r = this.indexOfGroup(e), o = r + n, i = r; i < o; i++) t += this.tag.getRule(i) + f;

          return t;
        }, e;
      }(),
          F = new Map(),
          D = new Map(),
          M = 1,
          N = "style[" + p + "][" + l + '="' + d + '"]',
          $ = new RegExp("^" + p + '\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)'),
          z = r,
          W = {
        isServer: !r,
        useCSSOMInjection: !n
      },
          q = function () {
        function t(e, t, n) {
          void 0 === e && (e = W), void 0 === t && (t = {}), this.options = A({}, W, {}, e), this.gs = t, this.names = new Map(n), !this.options.isServer && r && z && (z = !1, function (e) {
            for (var t = document.querySelectorAll(N), n = 0, r = t.length; n < r; n++) {
              var o = t[n];
              o && "active" !== o.getAttribute(p) && (j(e, o), o.parentNode && o.parentNode.removeChild(o));
            }
          }(this));
        }

        t.registerId = b;
        var e = t.prototype;
        return e.reconstructWithOptions = function (e) {
          return new t(A({}, this.options, {}, e), this.gs, this.names);
        }, e.allocateGSInstance = function (e) {
          return this.gs[e] = (this.gs[e] || 0) + 1;
        }, e.getTag = function () {
          return this.tag || (this.tag = (t = this.options, n = t.isServer, r = t.useCSSOMInjection, o = t.target, e = new (n ? _ : r ? R : T)(o), new L(e)));
          var e, t, n, r, o;
        }, e.hasNameForId = function (e, t) {
          return this.names.has(e) && this.names.get(e).has(t);
        }, e.registerName = function (e, t) {
          var n;
          b(e), this.names.has(e) ? this.names.get(e).add(t) : ((n = new Set()).add(t), this.names.set(e, n));
        }, e.insertRules = function (e, t, n) {
          this.registerName(e, t), this.getTag().insertRules(b(e), n);
        }, e.clearNames = function (e) {
          this.names.has(e) && this.names.get(e).clear();
        }, e.clearRules = function (e) {
          this.getTag().clearGroup(b(e)), this.clearNames(e);
        }, e.clearTag = function () {
          this.tag = void 0;
        }, e.toString = function () {
          return S(this);
        }, t;
      }(),
          B = 5381,
          H = function (e, t) {
        for (var n = t.length; n;) e = 33 * e ^ t.charCodeAt(--n);

        return e;
      };

      var U = /^\s*\/\/.*$/gm;

      function G(e) {
        var l,
            p,
            a,
            s,
            c,
            t = void 0 === e ? I : e,
            n = t.options,
            r = void 0 === n ? I : n,
            o = t.plugins,
            i = void 0 === o ? w : o,
            u = new y.a(r),
            d = [],
            f = (l = function (e) {
          d.push(e);
        }, p = "/*|*/", function (e, t, n, r, o, i, a, s, c, u) {
          switch (e) {
            case 1:
              if (0 === c && 64 === t.charCodeAt(0)) return l(t + ";"), "";
              break;

            case 2:
              if (0 === s) return t + p;
              break;

            case 3:
              switch (s) {
                case 102:
                case 112:
                  return l(n[0] + t), "";

                default:
                  return t + (0 === u ? p : "");
              }

            case -2:
              t.split("/*|*/}").forEach(h);
          }
        });

        function h(e) {
          if (e) try {
            l(e + "}");
          } catch (e) {}
        }

        function m(e, t, n) {
          return 0 < t && -1 !== n.slice(0, t).indexOf(s) && n.slice(t - s.length, t) !== s ? "." + a : e;
        }

        function b(e, t, n, r) {
          void 0 === r && (r = "&");
          var o = e.replace(U, ""),
              i = t && n ? n + " " + t + " { " + o + " }" : o;
          return a = r, s = t, c = new RegExp("\\" + s + "\\b", "g"), u(n || !t ? "" : t, i);
        }

        return u.use([].concat(i, [function (e, t, n) {
          2 === e && n.length && 0 < n[0].lastIndexOf(s) && (n[0] = n[0].replace(c, m));
        }, f, function (e) {
          if (-2 === e) {
            var t = d;
            return d = [], t;
          }
        }])), b.hash = i.length ? i.reduce(function (e, t) {
          return t.name || C(15), H(e, t.name);
        }, B).toString() : "", b;
      }

      var Y = g.a.createContext(),
          V = (Y.Consumer, g.a.createContext()),
          K = (V.Consumer, new q()),
          X = G();

      function Z() {
        return Object(E.useContext)(Y) || K;
      }

      function Q() {
        return Object(E.useContext)(V) || X;
      }

      var J = function () {
        function e(e, t) {
          var n = this;
          this.inject = function (e) {
            e.hasNameForId(n.id, n.name) || e.insertRules(n.id, n.name, X.apply(void 0, n.stringifyArgs));
          }, this.toString = function () {
            return C(12, String(n.name));
          }, this.name = e, this.id = "sc-keyframes-" + e, this.stringifyArgs = t;
        }

        return e.prototype.getName = function () {
          return this.name;
        }, e;
      }(),
          ee = /([A-Z])/g,
          te = /^ms-/;

      function ne(e) {
        return e.replace(ee, "-$1").toLowerCase().replace(te, "-ms-");
      }

      var re = function (e) {
        return null == e || !1 === e || "" === e;
      },
          oe = function r(o, e) {
        var i = [];
        return Object.keys(o).forEach(function (e) {
          if (!re(o[e])) {
            if (c(o[e])) return i.push.apply(i, r(o[e], e)), i;
            if (u(o[e])) return i.push(ne(e) + ":", o[e], ";"), i;
            i.push(ne(e) + ": " + (null == (n = o[t = e]) || "boolean" == typeof n || "" === n ? "" : "number" != typeof n || 0 === n || t in a.a ? String(n).trim() : n + "px") + ";");
          }

          var t, n;
          return i;
        }), e ? [e + " {"].concat(i, ["}"]) : i;
      };

      function ie(e, t, n) {
        if (Array.isArray(e)) {
          for (var r, o = [], i = 0, a = e.length; i < a; i += 1) "" !== (r = ie(e[i], t, n)) && (Array.isArray(r) ? o.push.apply(o, r) : o.push(r));

          return o;
        }

        return re(e) ? "" : k(e) ? "." + e.styledComponentId : u(e) ? "function" != typeof (s = e) || s.prototype && s.prototype.isReactComponent || !t ? e : ie(e(t), t, n) : e instanceof J ? n ? (e.inject(n), e.getName()) : e : c(e) ? oe(e) : e.toString();
        var s;
      }

      function ae(e) {
        for (var t = arguments.length, n = new Array(1 < t ? t - 1 : 0), r = 1; r < t; r++) n[r - 1] = arguments[r];

        return u(e) || c(e) ? ie(o(w, [e].concat(n))) : 0 === n.length && 1 === e.length && "string" == typeof e[0] ? e : ie(o(e, n));
      }

      var se = function (e) {
        return "function" == typeof e || "object" == typeof e && null !== e && !Array.isArray(e);
      },
          ce = function (e) {
        return "__proto__" !== e && "constructor" !== e && "prototype" !== e;
      };

      function ue(e) {
        for (var t = arguments.length, n = new Array(1 < t ? t - 1 : 0), r = 1; r < t; r++) n[r - 1] = arguments[r];

        for (var o, i, a, s, c = 0, u = n; c < u.length; c++) {
          var l = u[c];
          if (se(l)) for (var p in l) ce(p) && (o = e, i = l[p], s = o[a = p], se(i) && se(s) ? ue(s, i) : o[a] = i);
        }

        return e;
      }

      function le(e) {
        return String.fromCharCode(e + (25 < e ? 39 : 97));
      }

      var pe = /(a)(d)/gi;

      function de(e) {
        for (var t = "", n = Math.abs(e); 52 < n; n = n / 52 | 0) t = le(n % 52) + t;

        return (le(n % 52) + t).replace(pe, "$1-$2");
      }

      function fe(e) {
        for (var t = 0; t < e.length; t += 1) {
          var n = e[t];
          if (u(n) && !k(n)) return !1;
        }

        return !0;
      }

      var he = function () {
        function e(e, t) {
          this.rules = e, this.staticRulesId = "", this.isStatic = fe(e), this.componentId = t, this.baseHash = x(t), q.registerId(t);
        }

        return e.prototype.generateAndInjectStyles = function (e, t, n) {
          var r = this.componentId;

          if (this.isStatic && !n.hash) {
            if (this.staticRulesId && t.hasNameForId(r, this.staticRulesId)) return this.staticRulesId;
            var o,
                i = ie(this.rules, e, t).join(""),
                a = de(H(this.baseHash, i.length) >>> 0);
            return t.hasNameForId(r, a) || (o = n(i, "." + a, void 0, r), t.insertRules(r, a, o)), this.staticRulesId = a;
          }

          for (var s = this.rules.length, c = H(this.baseHash, n.hash), u = "", l = 0; l < s; l++) {
            var p,
                d,
                f = this.rules[l];
            "string" == typeof f ? u += f : (p = ie(f, e, t), d = Array.isArray(p) ? p.join("") : p, c = H(c, d + l), u += d);
          }

          var h,
              m = de(c >>> 0);
          return t.hasNameForId(r, m) || (h = n(u, "." + m, void 0, r), t.insertRules(r, m, h)), m;
        }, e;
      }(),
          me = (new Set(), function (e, t, n) {
        return void 0 === n && (n = I), e.theme !== n.theme && e.theme || t || n.theme;
      }),
          be = /[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,
          ye = /(^-|-$)/g;

      function ge(e) {
        return e.replace(be, "-").replace(ye, "");
      }

      function ve(e) {
        return "string" == typeof e && !0;
      }

      var we = function (e) {
        return de(x(e) >>> 0);
      };

      var Oe = g.a.createContext();
      Oe.Consumer;
      var ke = {};

      function Ce(e, t, n) {
        void 0 === e && (e = I);
        var i = A({}, t, {
          theme: e
        }),
            a = {};
        return n.forEach(function (e) {
          var t,
              n,
              r,
              o = e;

          for (t in u(o) && (o = o(i)), o) i[t] = a[t] = "className" === t ? (n = a[t], r = o[t], n && r ? n + " " + r : n || r) : o[t];
        }), [i, a];
      }

      function Se(e, t, n) {
        var r = e.attrs,
            o = e.componentStyle,
            i = e.defaultProps,
            a = e.foldedComponentIds,
            s = e.shouldForwardProp,
            c = e.styledComponentId,
            u = e.target;
        Object(E.useDebugValue)(c);
        var l,
            p,
            d,
            f,
            h,
            m,
            b = Ce(me(t, Object(E.useContext)(Oe), i) || I, t, r),
            y = b[0],
            g = b[1],
            v = (l = o, p = 0 < r.length, d = y, f = Z(), h = Q(), m = l.isStatic && !p ? l.generateAndInjectStyles(I, f, h) : l.generateAndInjectStyles(d, f, h), Object(E.useDebugValue)(m), m),
            w = n,
            O = g.$as || t.$as || g.as || t.as || u,
            k = ve(O),
            C = g !== t ? A({}, t, {}, g) : t,
            S = s || k && P.a,
            j = {};

        for (var x in C) "$" !== x[0] && "as" !== x && ("forwardedAs" === x ? j.as = C[x] : S && !S(x, P.a) || (j[x] = C[x]));

        return t.style && g.style !== t.style && (j.style = A({}, t.style, {}, g.style)), j.className = Array.prototype.concat(a, c, v !== c ? v : null, t.className, g.className).filter(Boolean).join(" "), j.ref = w, Object(E.createElement)(O, j);
      }

      function je(n, o, i) {
        var e,
            t = k(n),
            r = !ve(n),
            a = o.displayName,
            s = void 0 === a ? ve(e = n) ? "styled." + e : "Styled(" + O(e) + ")" : a,
            c = o.componentId,
            u = void 0 === c ? function (e, t) {
          var n = "string" != typeof e ? "sc" : ge(e);
          ke[n] = (ke[n] || 0) + 1;
          var r = n + "-" + we(n + ke[n]);
          return t ? t + "-" + r : r;
        }(o.displayName, o.parentComponentId) : c,
            l = o.attrs,
            p = void 0 === l ? w : l,
            d = o.displayName && o.componentId ? ge(o.displayName) + "-" + o.componentId : o.componentId || u,
            f = t && n.attrs ? Array.prototype.concat(n.attrs, p).filter(Boolean) : p,
            h = o.shouldForwardProp;
        t && n.shouldForwardProp && (h = h ? function (e, t) {
          return n.shouldForwardProp(e, t) && o.shouldForwardProp(e, t);
        } : n.shouldForwardProp);

        function m(e, t) {
          return Se(b, e, t);
        }

        var b,
            y = new he(t ? n.componentStyle.rules.concat(i) : i, d);
        return m.displayName = s, (b = g.a.forwardRef(m)).attrs = f, b.componentStyle = y, b.displayName = s, b.shouldForwardProp = h, b.foldedComponentIds = t ? Array.prototype.concat(n.foldedComponentIds, n.styledComponentId) : w, b.styledComponentId = d, b.target = t ? n.target : n, b.withComponent = function (e) {
          var t = o.componentId,
              n = function (e, t) {
            if (null == e) return {};

            for (var n, r = {}, o = Object.keys(e), i = 0; i < o.length; i++) n = o[i], 0 <= t.indexOf(n) || (r[n] = e[n]);

            return r;
          }(o, ["componentId"]),
              r = t && t + "-" + (ve(e) ? e : ge(O(e)));

          return je(e, A({}, n, {
            attrs: f,
            componentId: r
          }), i);
        }, Object.defineProperty(b, "defaultProps", {
          get: function () {
            return this._foldedDefaultProps;
          },
          set: function (e) {
            this._foldedDefaultProps = t ? ue({}, n.defaultProps, e) : e;
          }
        }), b.toString = function () {
          return "." + b.styledComponentId;
        }, r && v()(b, n, {
          attrs: !0,
          componentStyle: !0,
          displayName: !0,
          foldedComponentIds: !0,
          shouldForwardProp: !0,
          self: !0,
          styledComponentId: !0,
          target: !0,
          withComponent: !0
        }), b;
      }

      function xe(e) {
        return function t(n, r, o) {
          if (void 0 === o && (o = I), !Object(i.isValidElementType)(r)) return C(1, String(r));

          function e() {
            return n(r, o, ae.apply(void 0, arguments));
          }

          return e.withConfig = function (e) {
            return t(n, r, A({}, o, {}, e));
          }, e.attrs = function (e) {
            return t(n, r, A({}, o, {
              attrs: Array.prototype.concat(o.attrs, e).filter(Boolean)
            }));
          }, e;
        }(je, e);
      }

      ["a", "abbr", "address", "area", "article", "aside", "audio", "b", "base", "bdi", "bdo", "big", "blockquote", "body", "br", "button", "canvas", "caption", "cite", "code", "col", "colgroup", "data", "datalist", "dd", "del", "details", "dfn", "dialog", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "iframe", "img", "input", "ins", "kbd", "keygen", "label", "legend", "li", "link", "main", "map", "mark", "marquee", "menu", "menuitem", "meta", "meter", "nav", "noscript", "object", "ol", "optgroup", "option", "output", "p", "param", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "script", "section", "select", "small", "source", "span", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "track", "u", "ul", "var", "video", "wbr", "circle", "clipPath", "defs", "ellipse", "foreignObject", "g", "image", "line", "linearGradient", "marker", "mask", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "stop", "svg", "text", "tspan"].forEach(function (e) {
        xe[e] = xe(e);
      });

      var Ee = function () {
        function e(e, t) {
          this.rules = e, this.componentId = t, this.isStatic = fe(e);
        }

        var t = e.prototype;
        return t.createStyles = function (e, t, n, r) {
          var o = r(ie(this.rules, t, n).join(""), ""),
              i = this.componentId + e;
          n.insertRules(i, i, o);
        }, t.removeStyles = function (e, t) {
          t.clearRules(this.componentId + e);
        }, t.renderStyles = function (e, t, n, r) {
          q.registerId(this.componentId + e), this.removeStyles(e, n), this.createStyles(e, t, n, r);
        }, e;
      }();

      function Pe(e) {
        for (var t = arguments.length, n = new Array(1 < t ? t - 1 : 0), r = 1; r < t; r++) n[r - 1] = arguments[r];

        var o = ae.apply(void 0, [e].concat(n)),
            c = "sc-global-" + we(JSON.stringify(o)),
            u = new Ee(o, c);
        return g.a.memo(function e(t) {
          var n = Z(),
              r = Q(),
              o = Object(E.useContext)(Oe),
              i = Object(E.useRef)(null);
          null === i.current && (i.current = n.allocateGSInstance(c));
          var a,
              s = i.current;
          return u.isStatic ? u.renderStyles(s, h, n, r) : (a = A({}, t, {
            theme: me(t, o, e.defaultProps)
          }), u.renderStyles(s, a, n, r)), Object(E.useEffect)(function () {
            return function () {
              return u.removeStyles(s, n);
            };
          }, w), null;
        });
      }

      function Ae(e) {
        for (var t = arguments.length, n = new Array(1 < t ? t - 1 : 0), r = 1; r < t; r++) n[r - 1] = arguments[r];

        var o = ae.apply(void 0, [e].concat(n)).join(""),
            i = we(o);
        return new J(i, [o, i, "@keyframes"]);
      }

      Ie.c = xe;
    }).call(this, Re(25));
  }, function (e, t, n) {
    "use strict";

    n.d(t, "a", function () {
      return q;
    }), n.d(t, "e", function () {
      return B;
    }), n.d(t, "b", function () {
      return H;
    }), n.d(t, "c", function () {
      return U;
    }), n.d(t, "d", function () {
      return G;
    }), n.d(t, "g", function () {
      return Y;
    }), n.d(t, "f", function () {
      return V;
    });

    var i = n(0),
        m = n.n(i),
        a = n(5),
        r = n(2),
        o = n.n(r),
        s = n(17),
        b = n.n(s),
        c = n(3),
        y = "data:image/gif;base64,R0lGODlhEQARAIAAAODn7P///yH5BAEHAAEALAAAAAARABEAAAIqBIKpab3v3EMyVHWtWZluf0za0XFNKDJfCq5i5JpomdUxqKLQVmInqyoAADs=",
        g = n(1),
        v = n(6),
        u = function () {
      return (u = Object.assign || function (e) {
        for (var t, n = 1, r = arguments.length; n < r; n++) for (var o in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);

        return e;
      }).apply(this, arguments);
    },
        l = {
      lines: 12,
      length: 7,
      width: 5,
      radius: 10,
      scale: 1,
      corners: 1,
      color: "#000",
      fadeColor: "transparent",
      animation: "spinner-line-fade-default",
      rotate: 0,
      direction: 1,
      speed: 1,
      zIndex: 2e9,
      className: "spinner",
      top: "50%",
      left: "50%",
      shadow: "0 0 1px transparent",
      position: "absolute"
    },
        p = (d.prototype.spin = function (e) {
      return this.stop(), this.el = document.createElement("div"), this.el.className = this.opts.className, this.el.setAttribute("role", "progressbar"), f(this.el, {
        position: this.opts.position,
        width: 0,
        zIndex: this.opts.zIndex,
        left: this.opts.left,
        top: this.opts.top,
        transform: "scale(" + this.opts.scale + ")"
      }), e && e.insertBefore(this.el, e.firstChild || null), function (e, t) {
        var n = Math.round(t.corners * t.width * 500) / 1e3 + "px",
            r = "none";
        !0 === t.shadow ? r = "0 2px 4px #000" : "string" == typeof t.shadow && (r = t.shadow);

        for (var o = function (e) {
          for (var t = /^\s*([a-zA-Z]+\s+)?(-?\d+(\.\d+)?)([a-zA-Z]*)\s+(-?\d+(\.\d+)?)([a-zA-Z]*)(.*)$/, n = [], r = 0, o = e.split(","); r < o.length; r++) {
            var i,
                a,
                s,
                c,
                u = o[r].match(t);
            null !== u && (i = +u[2], a = +u[5], s = u[4], c = u[7], 0 != i || s || (s = c), 0 != a || c || (c = s), s === c && n.push({
              prefix: u[1] || "",
              x: i,
              y: a,
              xUnits: s,
              yUnits: c,
              end: u[8]
            }));
          }

          return n;
        }(r), i = 0; i < t.lines; i++) {
          var a = ~~(360 / t.lines * i + t.rotate),
              s = f(document.createElement("div"), {
            position: "absolute",
            top: -t.width / 2 + "px",
            width: t.length + t.width + "px",
            height: t.width + "px",
            background: h(t.fadeColor, i),
            borderRadius: n,
            transformOrigin: "left",
            transform: "rotate(" + a + "deg) translateX(" + t.radius + "px)"
          }),
              c = i * t.direction / t.lines / t.speed;
          c -= 1 / t.speed;
          var u = f(document.createElement("div"), {
            width: "100%",
            height: "100%",
            background: h(t.color, i),
            borderRadius: n,
            boxShadow: function (e, t) {
              for (var n = [], r = 0, o = e; r < o.length; r++) {
                var i = o[r],
                    a = function (e, t, n) {
                  var r = n * Math.PI / 180,
                      o = Math.sin(r),
                      i = Math.cos(r);
                  return [Math.round(1e3 * (e * i + t * o)) / 1e3, Math.round(1e3 * (-e * o + t * i)) / 1e3];
                }(i.x, i.y, t);

                n.push(i.prefix + a[0] + i.xUnits + " " + a[1] + i.yUnits + i.end);
              }

              return n.join(", ");
            }(o, a),
            animation: 1 / t.speed + "s linear " + c + "s infinite " + t.animation
          });
          s.appendChild(u), e.appendChild(s);
        }
      }(this.el, this.opts), this;
    }, d.prototype.stop = function () {
      return this.el && (("undefined" != typeof requestAnimationFrame ? cancelAnimationFrame : clearTimeout)(this.animateId), this.el.parentNode && this.el.parentNode.removeChild(this.el), this.el = void 0), this;
    }, d);

    function d(e) {
      void 0 === e && (e = {}), this.opts = u(u({}, l), e);
    }

    function f(e, t) {
      for (var n in t) e.style[n] = t[n];

      return e;
    }

    function h(e, t) {
      return "string" == typeof e ? e : e[t % e.length];
    }

    function w(e) {
      return (w = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
        return typeof e;
      } : function (e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
      })(e);
    }

    function O(t, e) {
      var n,
          r = Object.keys(t);
      return Object.getOwnPropertySymbols && (n = Object.getOwnPropertySymbols(t), e && (n = n.filter(function (e) {
        return Object.getOwnPropertyDescriptor(t, e).enumerable;
      })), r.push.apply(r, n)), r;
    }

    function k(o) {
      for (var e = 1; e < arguments.length; e++) {
        var i = null != arguments[e] ? arguments[e] : {};
        e % 2 ? O(Object(i), !0).forEach(function (e) {
          var t, n, r;
          t = o, r = i[n = e], n in t ? Object.defineProperty(t, n, {
            value: r,
            enumerable: !0,
            configurable: !0,
            writable: !0
          }) : t[n] = r;
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(o, Object.getOwnPropertyDescriptors(i)) : O(Object(i)).forEach(function (e) {
          Object.defineProperty(o, e, Object.getOwnPropertyDescriptor(i, e));
        });
      }

      return o;
    }

    function C(e, t) {
      for (var n = 0; n < t.length; n++) {
        var r = t[n];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
      }
    }

    function S(e, t) {
      return (S = Object.setPrototypeOf || function (e, t) {
        return e.__proto__ = t, e;
      })(e, t);
    }

    function j(i) {
      var a = function () {
        if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" == typeof Proxy) return !0;

        try {
          return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0;
        } catch (e) {
          return !1;
        }
      }();

      return function () {
        var e,
            t,
            n,
            r,
            o = E(i);
        return t = a ? (e = E(this).constructor, Reflect.construct(o, arguments, e)) : o.apply(this, arguments), n = this, !(r = t) || "object" !== w(r) && "function" != typeof r ? x(n) : r;
      };
    }

    function x(e) {
      if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return e;
    }

    function E(e) {
      return (E = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
        return e.__proto__ || Object.getPrototypeOf(e);
      })(e);
    }

    var P = {
      lines: 16,
      length: 3,
      width: 3,
      radius: 14,
      color: "#FFFFFF",
      speed: 2.1,
      trail: 60,
      shadow: !1,
      hwaccel: !1,
      top: "50%",
      left: "50%",
      position: "absolute",
      zIndex: 999
    },
        A = c.c.div.withConfig({
      displayName: "spinner__SpinnerWrapper",
      componentId: "c8kk4-0"
    })(["@keyframes spinner-line-fade-more{0%,100%{opacity:0;}1%{opacity:1;}}@keyframes spinner-line-fade-quick{0%,39%,100%{opacity:0.25;}40%{opacity:1;}}@keyframes spinner-line-fade-default{0%,100%{opacity:0.22;}1%{opacity:1;}}@keyframes spinner-line-shrink{0%,25%,100%{transform:scale(0.5);opacity:0.25;}26%{transform:scale(1);opacity:1;}}"]),
        I = function () {
      !function (e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
        e.prototype = Object.create(t && t.prototype, {
          constructor: {
            value: e,
            writable: !0,
            configurable: !0
          }
        }), t && S(e, t);
      }(o, i["Component"]);
      var e,
          t,
          n,
          r = j(o);

      function o(e) {
        var t;
        return function (e, t) {
          if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
        }(this, o), (t = r.call(this, e)).getRef = t.getRef.bind(x(t)), t;
      }

      return e = o, (t = [{
        key: "componentDidMount",
        value: function () {
          this.instantiateSpinner(this.props);
        }
      }, {
        key: "componentWillReceiveProps",
        value: function (e) {
          e.config.color !== this.props.config.color ? (this.spinner.stop(), this.instantiateSpinner(e)) : !0 !== e.stopped || this.props.stopped ? e.stopped || !0 !== this.props.stopped || this.spinner.spin(this.container) : this.spinner.stop();
        }
      }, {
        key: "componentWillUnmount",
        value: function () {
          this.spinner.stop();
        }
      }, {
        key: "getRef",
        value: function (e) {
          this.container = e;
        }
      }, {
        key: "instantiateSpinner",
        value: function (e) {
          this.spinner = new p(k(k({}, P), e.config)), e.stopped || this.spinner.spin(this.container);
        }
      }, {
        key: "render",
        value: function () {
          return m.a.createElement(A, {
            ref: this.getRef
          });
        }
      }]) && C(e.prototype, t), n && C(e, n), o;
    }();

    I.propTypes = {
      config: o.a.object,
      stopped: o.a.bool,
      className: o.a.string,
      style: o.a.object
    }, I.defaultProps = {
      config: P,
      className: "",
      style: {}
    };
    var R,
        T = I;

    function _(e) {
      return (_ = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
        return typeof e;
      } : function (e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
      })(e);
    }

    function L(t, e) {
      var n,
          r = Object.keys(t);
      return Object.getOwnPropertySymbols && (n = Object.getOwnPropertySymbols(t), e && (n = n.filter(function (e) {
        return Object.getOwnPropertyDescriptor(t, e).enumerable;
      })), r.push.apply(r, n)), r;
    }

    function F(t) {
      for (var e = 1; e < arguments.length; e++) {
        var n = null != arguments[e] ? arguments[e] : {};
        e % 2 ? L(Object(n), !0).forEach(function (e) {
          W(t, e, n[e]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : L(Object(n)).forEach(function (e) {
          Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e));
        });
      }

      return t;
    }

    function D(e, t) {
      for (var n = 0; n < t.length; n++) {
        var r = t[n];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
      }
    }

    function M(e, t) {
      return (M = Object.setPrototypeOf || function (e, t) {
        return e.__proto__ = t, e;
      })(e, t);
    }

    function N(i) {
      var a = function () {
        if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" == typeof Proxy) return !0;

        try {
          return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0;
        } catch (e) {
          return !1;
        }
      }();

      return function () {
        var e,
            t,
            n,
            r,
            o = z(i);
        return t = a ? (e = z(this).constructor, Reflect.construct(o, arguments, e)) : o.apply(this, arguments), n = this, !(r = t) || "object" !== _(r) && "function" != typeof r ? $(n) : r;
      };
    }

    function $(e) {
      if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return e;
    }

    function z(e) {
      return (z = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
        return e.__proto__ || Object.getPrototypeOf(e);
      })(e);
    }

    function W(e, t, n) {
      return t in e ? Object.defineProperty(e, t, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }) : e[t] = n, e;
    }

    var q = 5,
        B = "popup",
        H = "drawer_left",
        U = "drawer_right",
        G = "popover",
        Y = "side_panel",
        V = (W(R = {}, B, "popup-blank"), W(R, H, "popup-classic"), W(R, U, "popup-drawer"), W(R, G, "popup-popover"), W(R, Y, "popup-side-panel"), R),
        K = c.c.div.withConfig({
      displayName: "popup__BaseWrapper",
      componentId: "sc-10ta2p7-0"
    })(["visibility:", ";opacity:", ";position:", ";max-width:100%;z-index:10001;"], function (e) {
      return e.open ? "visible" : "hidden";
    }, function (e) {
      return e.open ? 1 : 0;
    }, function (e) {
      return e.isContained ? "absolute" : "fixed";
    }),
        X = c.c.div.withConfig({
      displayName: "popup__Overlay",
      componentId: "sc-10ta2p7-1"
    })(["visibility:", ";opacity:", ";transition:opacity 200ms ease,visibility 0s linear ", ";background:rgba(0,0,0,0.85);position:", ";overflow:", ";left:0;top:0;right:0;bottom:0;z-index:10001;min-height:100%;"], function (e) {
      return e.appearing ? "hidden" : "visible";
    }, function (e) {
      return e.appearing ? 0 : 1;
    }, function (e) {
      return e.appearing ? "200ms" : "0s";
    }, function (e) {
      return e.isContained ? "absolute" : "fixed";
    }, function (e) {
      return e.isContained ? "hidden" : "auto";
    }),
        Z = Object(c.c)(K).withConfig({
      displayName: "popup__popupWrapper",
      componentId: "sc-10ta2p7-2"
    })(["width:", ";height:", ";top:40px;left:40px;transition:all 300ms ease-out;"], function (e) {
      return e.isContained ? "calc(100% - 80px)" : "calc(100vw - 80px)";
    }, function (e) {
      return e.isContained ? "calc(100% - 80px)" : "calc(100vh - 80px)";
    }),
        Q = Object(c.c)(K).withConfig({
      displayName: "popup__drawerWrapper",
      componentId: "sc-10ta2p7-3"
    })(["transition:all 400ms ease-out;width:", "px;height:100%;top:0;"], function (e) {
      return e.width;
    }),
        J = Object(c.c)(Q).withConfig({
      displayName: "popup__drawerLeftWrapper",
      componentId: "sc-10ta2p7-4"
    })(["left:", "px;"], function (e) {
      return e.open ? 0 : -(e.width - 30);
    }),
        ee = Object(c.c)(Q).withConfig({
      displayName: "popup__drawerRightWrapper",
      componentId: "sc-10ta2p7-5"
    })(["right:", "px;"], function (e) {
      return e.open ? 0 : -(e.width - 30);
    }),
        te = Object(c.c)(K).withConfig({
      displayName: "popup__popoverWrapper",
      componentId: "sc-10ta2p7-6"
    })(["width:", "px;height:", "px;transition:all 300ms ease-out;bottom:96px;right:16px;border-radius:4px;overflow:hidden;box-shadow:rgba(0,0,0,0.08) 0px 2px 4px,rgba(0,0,0,0.06) 0px 2px 12px;"], function (e) {
      return e.width;
    }, function (e) {
      return e.height;
    }),
        ne = c.c.div.withConfig({
      displayName: "popup__sidePanelWrapper",
      componentId: "sc-10ta2p7-7"
    })(["width:", "px;height:", "px;box-shadow:rgba(0,0,0,", ") 0px 2px 4px,rgba(0,0,0,", ") 0px 2px 12px;transition:box-shadow 300ms ease-out;"], function (e) {
      return e.width;
    }, function (e) {
      return e.height;
    }, function (e) {
      return e.open ? "0.08" : "0";
    }, function (e) {
      return e.open ? "0.06" : "0";
    }),
        re = c.c.img.withConfig({
      displayName: "popup__BaseCloseImage",
      componentId: "sc-10ta2p7-8"
    })(["position:absolute;padding:8px;cursor:pointer;width:initial;max-width:initial;"]),
        oe = c.c.img.withConfig({
      displayName: "popup__IconCloseImage",
      componentId: "sc-10ta2p7-9"
    })(["padding:8px;vertical-align:middle;"]),
        ie = Object(c.c)(re).withConfig({
      displayName: "popup__closeImagePopup",
      componentId: "sc-10ta2p7-10"
    })(["top:-34px;right:-34px;"]),
        ae = Object(c.c)(re).withConfig({
      displayName: "popup__closeImageLeft",
      componentId: "sc-10ta2p7-11"
    })(["top:12px;right:-38px;@media screen and (max-width:800px){right:12px;}"]),
        se = Object(c.c)(re).withConfig({
      displayName: "popup__closeImageRight",
      componentId: "sc-10ta2p7-12"
    })(["top:12px;left:-38px;right:auto;@media screen and (max-width:800px){left:12px;}"]),
        ce = function () {
      !function (e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
        e.prototype = Object.create(t && t.prototype, {
          constructor: {
            value: e,
            writable: !0,
            configurable: !0
          }
        }), t && M(e, t);
      }(o, i["Component"]);
      var e,
          t,
          n,
          r = N(o);

      function o(e) {
        var t;
        return function (e, t) {
          if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
        }(this, o), (t = r.call(this, e)).state = {
          isLoading: !0,
          frameAnimate: !1,
          iframeLoaded: !1,
          popupAnimate: !0,
          transitionEnded: !1
        }, t.handleMessage = t.handleMessage.bind($(t)), t.handleKeyDown = Object(g.c)(t.handleKeyDown.bind($(t)), t.props.embedId), t.handleAutoClose = Object(g.c)(t.handleAutoClose.bind($(t)), t.props.embedId), t.handleClose = Object(g.c)(t.handleClose.bind($(t)), t.props.embedId), t.handleFormSubmit = Object(g.c)(t.handleFormSubmit.bind($(t)), t.props.embedId), t.handleIframeLoad = t.handleIframeLoad.bind($(t)), t.handleAnimateBeforeClose = t.handleAnimateBeforeClose.bind($(t)), t.handleTransitionEnd = t.handleTransitionEnd.bind($(t)), t.setWrapperRef = t.setWrapperRef.bind($(t)), t;
      }

      return e = o, (t = [{
        key: "componentDidMount",
        value: function () {
          var e = this;
          window.addEventListener("message", this.handleMessage), window.addEventListener("keydown", this.handleKeyDown), window.addEventListener("form-close", this.handleClose), window.addEventListener("form-submit", this.handleFormSubmit), window.addEventListener("embed-auto-close-popup", this.handleAutoClose), window.addEventListener("redirect-after-submit", g.j), window.addEventListener("thank-you-screen-redirect", g.j), window.tfClosePopup = this.handleClose, setTimeout(function () {
            e.setState({
              popupAnimate: !1
            });
          }, 100);
          this.updateIcon(m.a.createElement(T, {
            config: {
              scale: .6
            },
            stopped: this.state.iframeLoaded
          }));
        }
      }, {
        key: "componentWillUnmount",
        value: function () {
          window.removeEventListener("message", this.handleMessage), window.removeEventListener("keydown", this.handleKeyDown), window.removeEventListener("form-close", this.handleClose), window.removeEventListener("form-submit", this.handleFormSubmit), window.removeEventListener("embed-auto-close-popup", this.handleAutoClose), window.removeEventListener("redirect-after-submit", g.j), window.removeEventListener("thank-you-screen-redirect", g.j), delete window.tfClosePopup;
        }
      }, {
        key: "setWrapperRef",
        value: function (e) {
          this.wrapper = e;
        }
      }, {
        key: "getWrapperComponent",
        value: function (e) {
          return e === U ? ee : e === H ? J : e === G ? te : e === Y ? ne : Z;
        }
      }, {
        key: "getCloseImage",
        value: function (e) {
          return e === U ? se : e === H ? ae : ie;
        }
      }, {
        key: "updateIcon",
        value: function (e) {
          this.props.icon && (this.iconHTML || (this.iconHTML = this.props.icon.innerHTML), this.props.icon.innerHTML = "", e ? Object(a.render)(e, this.props.icon) : this.props.icon.innerHTML = this.iconHTML);
        }
      }, {
        key: "handleIframeLoad",
        value: function (e) {
          var t = this;
          this.setState({
            iframeLoaded: !0
          }, function () {
            setTimeout(function () {
              t.state.isLoading && (t.updateIcon(m.a.createElement(oe, {
                alt: "close-typeform",
                "data-qa": "popup-close-button",
                src: y
              })), t.handleSidePanelOpen(), t.setState({
                frameAnimate: !0,
                isLoading: !1
              }), e && e.contentWindow && e.contentWindow.focus());
            }, 500);
          });
        }
      }, {
        key: "handleAnimateBeforeClose",
        value: function () {
          var e = this;
          this.updateIcon(), this.handleSidePanelClose(), this.setState({
            frameAnimate: !1,
            popupAnimate: !1
          }, function () {
            setTimeout(function () {
              e.setState({
                popupAnimate: !0
              }, function () {
                setTimeout(e.props.onClose, 400);
              });
            }, 400);
          });
        }
      }, {
        key: "handleClose",
        value: function () {
          this.setState({
            isLoading: !1
          }), this.handleAnimateBeforeClose();
        }
      }, {
        key: "handleKeyDown",
        value: function (e) {
          "Escape" !== e.code && 27 !== e.which || this.handleAnimateBeforeClose();
        }
      }, {
        key: "handleMessage",
        value: function (e) {
          Object(g.b)(this.props.embedId, e);
        }
      }, {
        key: "handleAutoClose",
        value: function (e) {
          var t = this,
              n = e.detail.isProPlus || e.detail.canSetAutocloseDelay,
              r = this.props.options,
              o = r.isAutoCloseEnabled,
              i = r.autoClose;
          o && setTimeout(function () {
            t.handleAnimateBeforeClose();
          }, 1e3 * (n ? i : q));
        }
      }, {
        key: "handleTransitionEnd",
        value: function (e) {
          e.target === this.wrapper && this.setState({
            transitionEnded: this.state.frameAnimate
          });
        }
      }, {
        key: "handleFormSubmit",
        value: function (e) {
          this.props.options.onSubmit && this.props.options.onSubmit(Object(g.f)(e));
        }
      }, {
        key: "handleSidePanelOpen",
        value: function () {
          var e = this.props.options,
              t = e.mode,
              n = e.container,
              r = e.width,
              o = e.height;
          t === Y && (n.style.width = "".concat(r, "px"), n.style.height = "".concat(o, "px"));
        }
      }, {
        key: "handleSidePanelClose",
        value: function () {
          var e = this.props.options,
              t = e.mode,
              n = e.container;
          t === Y && (n.style.width = 0);
        }
      }, {
        key: "render",
        value: function () {
          var e = null,
              t = this.props,
              n = t.embedId,
              r = t.options,
              o = t.url,
              i = r.width,
              a = r.height,
              s = r.hideScrollbars,
              c = r.isContained,
              u = r.mode;
          s && (e = {
            width: "calc(100% + ".concat(b()(), "px)")
          }), u === B && (e = F(F({}, e), {}, {
            WebkitMaskImage: "-webkit-radial-gradient(circle, white, black)",
            WebkitTransform: "translateZ(0)"
          }));
          var l = Object(g.l)("typeform-embed-id", n, o),
              p = this.getWrapperComponent(u),
              d = this.getCloseImage(u),
              f = u === G || u === Y,
              h = m.a.createElement(p, {
            "data-qa": "popup-mode-".concat(u),
            height: a,
            innerRef: this.setWrapperRef,
            isContained: c,
            mode: u,
            onTransitionEnd: this.handleTransitionEnd,
            open: this.state.frameAnimate && !this.state.isLoading,
            width: i
          }, !f && this.state.iframeLoaded && m.a.createElement(d, {
            alt: "close-typeform",
            "data-qa": "popup-close-button",
            mode: u,
            onClick: this.handleAnimateBeforeClose,
            src: y
          }), m.a.createElement(v.a, {
            onLoad: this.handleIframeLoad,
            src: l,
            style: e
          }));
          return f ? h : m.a.createElement(X, {
            appearing: this.state.popupAnimate,
            isContained: c
          }, m.a.createElement(T, {
            stopped: this.state.iframeLoaded
          }), h);
        }
      }]) && D(e.prototype, t), n && D(e, n), o;
    }();

    ce.propTypes = {
      icon: o.a.func,
      embedId: o.a.string,
      height: o.a.number,
      onClose: o.a.func,
      options: o.a.object.isRequired,
      url: o.a.string.isRequired,
      width: o.a.number
    };
    t.h = ce;
  }, function (e, t) {
    e.exports = r;
  }, function (e, t, n) {
    "use strict";

    var i = n(0),
        a = n.n(i),
        r = n(2),
        o = n.n(r);

    function s(e) {
      return (s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
        return typeof e;
      } : function (e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
      })(e);
    }

    function c() {
      return (c = Object.assign || function (e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = arguments[t];

          for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
        }

        return e;
      }).apply(this, arguments);
    }

    function u(t, e) {
      var n,
          r = Object.keys(t);
      return Object.getOwnPropertySymbols && (n = Object.getOwnPropertySymbols(t), e && (n = n.filter(function (e) {
        return Object.getOwnPropertyDescriptor(t, e).enumerable;
      })), r.push.apply(r, n)), r;
    }

    function l(o) {
      for (var e = 1; e < arguments.length; e++) {
        var i = null != arguments[e] ? arguments[e] : {};
        e % 2 ? u(Object(i), !0).forEach(function (e) {
          var t, n, r;
          t = o, r = i[n = e], n in t ? Object.defineProperty(t, n, {
            value: r,
            enumerable: !0,
            configurable: !0,
            writable: !0
          }) : t[n] = r;
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(o, Object.getOwnPropertyDescriptors(i)) : u(Object(i)).forEach(function (e) {
          Object.defineProperty(o, e, Object.getOwnPropertyDescriptor(i, e));
        });
      }

      return o;
    }

    function p(e, t) {
      if (null == e) return {};

      var n,
          r = function (e, t) {
        if (null == e) return {};
        var n,
            r,
            o = {},
            i = Object.keys(e);

        for (r = 0; r < i.length; r++) n = i[r], 0 <= t.indexOf(n) || (o[n] = e[n]);

        return o;
      }(e, t);

      if (Object.getOwnPropertySymbols) for (var o = Object.getOwnPropertySymbols(e), i = 0; i < o.length; i++) n = o[i], 0 <= t.indexOf(n) || Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
      return r;
    }

    function d(e, t) {
      for (var n = 0; n < t.length; n++) {
        var r = t[n];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
      }
    }

    function f(e, t) {
      return (f = Object.setPrototypeOf || function (e, t) {
        return e.__proto__ = t, e;
      })(e, t);
    }

    function h(i) {
      var a = function () {
        if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" == typeof Proxy) return !0;

        try {
          return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0;
        } catch (e) {
          return !1;
        }
      }();

      return function () {
        var e,
            t,
            n,
            r,
            o = b(i);
        return t = a ? (e = b(this).constructor, Reflect.construct(o, arguments, e)) : o.apply(this, arguments), n = this, !(r = t) || "object" !== s(r) && "function" != typeof r ? m(n) : r;
      };
    }

    function m(e) {
      if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return e;
    }

    function b(e) {
      return (b = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
        return e.__proto__ || Object.getPrototypeOf(e);
      })(e);
    }

    var y = function () {
      !function (e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
        e.prototype = Object.create(t && t.prototype, {
          constructor: {
            value: e,
            writable: !0,
            configurable: !0
          }
        }), t && f(e, t);
      }(o, i["Component"]);
      var e,
          t,
          n,
          r = h(o);

      function o(e) {
        var t;
        return function (e, t) {
          if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
        }(this, o), (t = r.call(this, e)).iframeRef = null, t.handleLoad = t.handleLoad.bind(m(t)), t.getRef = t.getRef.bind(m(t)), t;
      }

      return e = o, (t = [{
        key: "shouldComponentUpdate",
        value: function (e) {
          return e.src !== this.props.src;
        }
      }, {
        key: "getRef",
        value: function (e) {
          this.iframeRef = e;
        }
      }, {
        key: "handleLoad",
        value: function () {
          this.props.onLoad && this.props.onLoad(this.iframeRef);
        }
      }, {
        key: "render",
        value: function () {
          var e = this.props,
              t = e.style,
              n = p(e, ["style"]);
          return a.a.createElement("iframe", c({}, n, {
            allow: "camera; microphone; autoplay; encrypted-media;",
            "data-qa": "iframe",
            frameBorder: "0",
            height: "100%",
            onLoad: this.handleLoad,
            ref: this.getRef,
            src: this.props.src,
            style: l({
              border: 0
            }, t),
            title: "typeform-embed",
            width: "100%"
          }));
        }
      }]) && d(e.prototype, t), n && d(e, n), o;
    }();

    y.propTypes = {
      src: o.a.string.isRequired,
      onLoad: o.a.func,
      style: o.a.object
    };
    t.a = y;
  }, function (e, t, n) {
    "use strict";

    n.r(t), n.d(t, "makePopup", function () {
      return q;
    }), n.d(t, "makeWidget", function () {
      return se;
    }), n.d(t, "makeFullScreen", function () {
      return fe;
    });
    var i = n(0),
        f = n.n(i),
        h = n(5),
        p = n.n(h),
        m = n(1);

    function r(t, e) {
      var n,
          r = Object.keys(t);
      return Object.getOwnPropertySymbols && (n = Object.getOwnPropertySymbols(t), e && (n = n.filter(function (e) {
        return Object.getOwnPropertyDescriptor(t, e).enumerable;
      })), r.push.apply(r, n)), r;
    }

    function o(o) {
      for (var e = 1; e < arguments.length; e++) {
        var i = null != arguments[e] ? arguments[e] : {};
        e % 2 ? r(Object(i), !0).forEach(function (e) {
          var t, n, r;
          t = o, r = i[n = e], n in t ? Object.defineProperty(t, n, {
            value: r,
            enumerable: !0,
            configurable: !0,
            writable: !0
          }) : t[n] = r;
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(o, Object.getOwnPropertyDescriptors(i)) : r(Object(i)).forEach(function (e) {
          Object.defineProperty(o, e, Object.getOwnPropertyDescriptor(i, e));
        });
      }

      return o;
    }

    var b = function (e, t) {
      var n = function (e) {
        var t = {};
        if ("" !== e && null !== e) for (var n = e.split("&"), r = 0; r < n.length; r++) {
          var o = n[r].split("=");
          t[o[0]] = decodeURIComponent(o[1]);
        }
        return t;
      }(window.location.search.substr(1)),
          r = o({}, t);

      return e.forEach(function (e) {
        e in t || (r[e] = n[e]);
      }), r;
    };

    function a() {
      return Math.random().toString(36).substr(2, 5);
    }

    function s(e) {
      var t = e.color,
          n = e.onClick,
          r = e.dataQa;
      return f.a.createElement(d, {
        "data-qa": r,
        onClick: n
      }, f.a.createElement(w, {
        backgroundColor: t
      }), f.a.createElement(O, {
        backgroundColor: t
      }));
    }

    var y = function (e) {
      return /mobile|tablet|android/i.test(e.toLowerCase());
    },
        g = n(4),
        c = n(2),
        u = n.n(c),
        l = n(3),
        d = l.c.div.withConfig({
      displayName: "close-icon__Root",
      componentId: "e8o6b5-0"
    })(["position:absolute;z-index:1001;top:0;right:0;font-size:20px;font-family:sans-serif;width:50px;height:50px;"]),
        v = Object(l.b)(["border-radius:0;display:block;height:2px;width:25px;position:absolute;right:6px;top:6px;"]),
        w = l.c.span.withConfig({
      displayName: "close-icon__ArrowLeft",
      componentId: "e8o6b5-1"
    })(["", " background-color:", ";transform:translate(0,13px) rotate3d(0,0,1,-135deg);"], v, function (e) {
      return e.backgroundColor;
    }),
        O = l.c.span.withConfig({
      displayName: "close-icon__ArrowRight",
      componentId: "e8o6b5-2"
    })(["", " background-color:", ";transform:translate(0,13px) rotate3d(0,0,1,-45deg);"], v, function (e) {
      return e.backgroundColor;
    });

    s.propTypes = {
      color: u.a.string,
      dataQa: u.a.string,
      onClick: u.a.func
    };
    var k = s,
        C = n(6);

    function S(e) {
      return (S = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
        return typeof e;
      } : function (e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
      })(e);
    }

    function j(e, t) {
      for (var n = 0; n < t.length; n++) {
        var r = t[n];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
      }
    }

    function x(e, t) {
      return (x = Object.setPrototypeOf || function (e, t) {
        return e.__proto__ = t, e;
      })(e, t);
    }

    function E(i) {
      var a = function () {
        if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" == typeof Proxy) return !0;

        try {
          return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0;
        } catch (e) {
          return !1;
        }
      }();

      return function () {
        var e,
            t,
            n,
            r,
            o = A(i);
        return t = a ? (e = A(this).constructor, Reflect.construct(o, arguments, e)) : o.apply(this, arguments), n = this, !(r = t) || "object" !== S(r) && "function" != typeof r ? P(n) : r;
      };
    }

    function P(e) {
      if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return e;
    }

    function A(e) {
      return (A = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
        return e.__proto__ || Object.getPrototypeOf(e);
      })(e);
    }

    function I() {
      var e = function (e, t) {
        t = t || e.slice(0);
        return Object.freeze(Object.defineProperties(e, {
          raw: {
            value: Object.freeze(t)
          }
        }));
      }(["\n  .__typeform-embed-mobile-modal-open {\n    overflow: hidden !important;\n    position: fixed !important;\n    top: 0 !important;\n    left: 0 !important;\n    right: 0 !important;\n    bottom: 0 !important;\n  }\n"]);

      return I = function () {
        return e;
      }, e;
    }

    var R = l.c.div.withConfig({
      displayName: "mobile-modal__Wrapper",
      componentId: "urpdwm-0"
    })(["visibility:", ";opacity:", ";background-color:", ";position:fixed !important;z-index:10001;left:0 !important;right:0 !important;top:0 !important;bottom:0 !important;overflow:hidden !important;height:100%;transition:all 400ms ease ", "s;"], function (e) {
      return e.open ? "visible" : "hidden";
    }, function (e) {
      return e.open ? 1 : 0;
    }, function (e) {
      return e.backgroundColor;
    }, function (e) {
      return e.openDelay;
    }),
        T = Object(l.a)(I()),
        _ = function () {
      !function (e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
        e.prototype = Object.create(t && t.prototype, {
          constructor: {
            value: e,
            writable: !0,
            configurable: !0
          }
        }), t && x(e, t);
      }(o, i["Component"]);
      var e,
          t,
          n,
          r = E(o);

      function o(e) {
        var t;
        return function (e, t) {
          if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
        }(this, o), (t = r.call(this, e)).state = {
          backgroundColor: e.backgroundColor,
          buttonColor: e.buttonColor
        }, t.handleMessage = t.handleMessage.bind(P(t)), t.handleAutoClose = Object(m.c)(t.handleAutoClose.bind(P(t)), t.props.embedId), t.handleFormSubmit = Object(m.c)(t.handleFormSubmit.bind(P(t)), t.props.embedId), t.handleFormTheme = Object(m.c)(t.handleFormTheme.bind(P(t)), t.props.embedId), t.handleClose = t.handleClose.bind(P(t)), t;
      }

      return e = o, (t = [{
        key: "componentDidMount",
        value: function () {
          window.addEventListener("message", this.handleMessage), window.addEventListener("embed-auto-close-popup", this.handleAutoClose), window.addEventListener("form-submit", this.handleFormSubmit), window.addEventListener("form-theme", this.handleFormTheme), window.addEventListener("redirect-after-submit", m.j), window.addEventListener("thank-you-screen-redirect", m.j), this.props.open && this.open();
        }
      }, {
        key: "componentDidUpdate",
        value: function (e) {
          !e.open && this.props.open && this.open(), e.backgroundColor === this.props.backgroundColor && e.buttonColor === this.props.buttonColor || this.setState({
            backgroundColor: this.props.backgroundColor,
            buttonColor: this.props.buttonColor
          });
        }
      }, {
        key: "componentWillUnmount",
        value: function () {
          window.removeEventListener("message", this.handleMessage), window.removeEventListener("embed-auto-close-popup", this.handleAutoClose), window.removeEventListener("form-submit", this.handleFormSubmit), window.removeEventListener("form-theme", this.handleFormTheme), window.removeEventListener("redirect-after-submit", m.j), window.removeEventListener("thank-you-screen-redirect", m.j), document.body.classList.remove("__typeform-embed-mobile-modal-open");
        }
      }, {
        key: "handleMessage",
        value: function (e) {
          Object(m.b)(this.props.embedId, e);
        }
      }, {
        key: "handleAutoClose",
        value: function (e) {
          var t = this,
              n = e.detail.isProPlus || e.detail.canSetAutocloseDelay,
              r = this.props,
              o = r.isAutoCloseEnabled,
              i = r.autoClose,
              a = void 0 === i ? g.a : i,
              s = 1e3 * (n ? a : g.a);
          o && setTimeout(function () {
            t.handleClose();
          }, s);
        }
      }, {
        key: "handleFormSubmit",
        value: function (e) {
          this.props.onSubmit && this.props.onSubmit(Object(m.f)(e));
        }
      }, {
        key: "handleFormTheme",
        value: function (e) {
          var t = (e.detail || {}).theme;
          this.setState({
            backgroundColor: t.backgroundColor,
            buttonColor: t.color
          });
        }
      }, {
        key: "open",
        value: function () {
          var e = this;
          setTimeout(function () {
            e.originalBodyScrollTop = window.document.body.scrollTop, document.body.classList.add("__typeform-embed-mobile-modal-open");
          }, 1e3 * this.props.openDelay + 500);
        }
      }, {
        key: "handleClose",
        value: function () {
          var e = this;
          document.body.classList.remove("__typeform-embed-mobile-modal-open"), setTimeout(function () {
            window.document.body.scrollTop = e.originalBodyScrollTop;
          }, 40), this.props.onClose && this.props.onClose();
        }
      }, {
        key: "render",
        value: function () {
          var e = this.props,
              t = e.embedId,
              n = e.url,
              r = e.open,
              o = this.state,
              i = o.backgroundColor,
              a = o.buttonColor,
              s = Object(m.l)("typeform-embed-id", t, n);
          return f.a.createElement(R, {
            backgroundColor: i,
            "data-qa": "mobile-modal",
            open: r,
            openDelay: this.props.openDelay
          }, f.a.createElement(T, null), r && f.a.createElement(C.a, {
            src: s
          }), f.a.createElement(k, {
            color: a,
            dataQa: "close-button-mobile",
            onClick: this.handleClose
          }));
        }
      }]) && j(e.prototype, t), n && j(e, n), o;
    }();

    _.propTypes = {
      url: u.a.string,
      open: u.a.bool,
      isAutoCloseEnabled: u.a.bool,
      backgroundColor: u.a.string,
      buttonColor: u.a.string,
      buttonText: u.a.string,
      onClose: u.a.func,
      onSubmit: u.a.func,
      autoClose: u.a.number,
      openDelay: u.a.number,
      embedId: u.a.string
    }, _.defaultProps = {
      open: !1,
      openDelay: 0,
      autoClose: null,
      backgroundColor: "transparent",
      buttonColor: "#FFF"
    };

    var L = _,
        F = function (t, n, e) {
      var r = 2 < arguments.length && void 0 !== e ? e : {};
      return function (e) {
        try {
          if (e.data.type !== t) return;
          r.includePayload ? n(e) : n();
        } catch (e) {}
      };
    },
        D = function (e, t, n) {
      switch (t) {
        case "load":
          e.open();
          break;

        case "exit":
          o = e, i = parseInt(n, 10), a = 0, document.addEventListener("mousemove", function e(t) {
            t.clientY < i && t.clientY < a ? (o.open(), document.removeEventListener("mousemove", e)) : a = t.clientY;
          });
          break;

        case "time":
          var r = parseInt(n, 10);
          setTimeout(function () {
            e.open();
          }, r);
          break;

        case "scroll":
          s = e, c = parseInt(n, 10), document.addEventListener("scroll", function e() {
            var t = window.pageYOffset || document.documentElement.scrollTop,
                n = document.documentElement.clientTop || 0,
                r = document.documentElement.scrollHeight,
                o = t - n,
                i = o / r * 100,
                a = o + window.innerHeight >= r;
            (c <= i || a) && (s.open(), document.removeEventListener("scroll", e));
          });
      }

      var s, c, o, i, a;
    };

    function M(t, e) {
      var n,
          r = Object.keys(t);
      return Object.getOwnPropertySymbols && (n = Object.getOwnPropertySymbols(t), e && (n = n.filter(function (e) {
        return Object.getOwnPropertyDescriptor(t, e).enumerable;
      })), r.push.apply(r, n)), r;
    }

    function N(o) {
      for (var e = 1; e < arguments.length; e++) {
        var i = null != arguments[e] ? arguments[e] : {};
        e % 2 ? M(Object(i), !0).forEach(function (e) {
          var t, n, r;
          t = o, r = i[n = e], n in t ? Object.defineProperty(t, n, {
            value: r,
            enumerable: !0,
            configurable: !0,
            writable: !0
          }) : t[n] = r;
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(o, Object.getOwnPropertyDescriptors(i)) : M(Object(i)).forEach(function (e) {
          Object.defineProperty(o, e, Object.getOwnPropertyDescriptor(i, e));
        });
      }

      return o;
    }

    var $ = function (e, t) {
      var n = t.mode === g.b || t.mode === g.c,
          r = t.width || t.drawerWidth || 800,
          o = t.width || 320,
          i = n ? r : o;
      return N({
        embedId: e,
        mode: g.e,
        embedType: g.f[t.mode] || g.f[g.e],
        isModalOpen: !1,
        autoClose: g.a,
        hideFooter: !1,
        hideHeaders: !1,
        hideScrollbars: !1,
        disableTracking: !1,
        transferableUrlParameters: t.transferableUrlParameters || [],
        onSubmit: m.h,
        open: null,
        openValue: null,
        width: i,
        height: 500,
        isAutoCloseEnabled: void 0 !== t.autoClose
      }, t);
    },
        z = {
      embedType: "typeform-embed",
      hideFooter: "embed-hide-footer",
      hideHeaders: "embed-hide-headers",
      disableTracking: "disable-tracking"
    },
        W = function (e, t) {
      var n = e.url,
          r = e.domNode,
          o = e.close,
          i = e.icon,
          a = t.autoClose,
          s = t.buttonText,
          c = t.embedId,
          u = t.isAutoCloseEnabled,
          l = t.onSubmit,
          p = Object(m.k)(t, z),
          p = b(t.transferableUrlParameters, p),
          d = Object(m.a)(n, p);
      !y(navigator.userAgent) && 1024 <= window.screen.width && 768 <= window.screen.height ? Object(h.render)(f.a.createElement(g.h, {
        embedId: c,
        icon: i,
        onClose: o,
        options: t,
        url: d
      }), r) : (Object(m.e)(), Object(h.render)(f.a.createElement(L, {
        autoClose: a,
        buttonText: s,
        embedId: c,
        isAutoCloseEnabled: u,
        onClose: o,
        onSubmit: l,
        open: !0,
        url: d
      }), r));
    };

    function q(s, e, t) {
      window.addEventListener("message", F("form-ready", e.onReady)), window.addEventListener("message", F("form-closed", e.onClose));
      var c = a(),
          u = $(c, e);
      if (!Number.isSafeInteger(u.width)) throw new Error("Whoops! You provided an invalid 'width' option: \"".concat(u.width, '". It must be a number.'));
      if (!Number.isSafeInteger(u.height)) throw new Error("Whoops! You provided an invalid 'height' option: \"".concat(u.height, '". It must be a number.'));
      var l = document.createElement("div");
      u.isContained = void 0 !== u.container, u.container = u.container || document.body, u.container.appendChild(l);
      var n = {
        element: t,
        open: function (e) {
          var t = e && e.currentTarget ? e.currentTarget : this.element,
              n = t && t.href ? t.href : s,
              r = t && t.querySelector("span.icon"),
              o = {
            domNode: l,
            icon: r,
            url: n,
            close: this.close.bind(this)
          },
              i = 0 < l.children.length,
              a = u.mode === g.d || u.mode === g.g;
          i && a ? "function" == typeof window.tfClosePopup && window.tfClosePopup(N(N({}, e), {}, {
            detail: {
              embedId: c
            }
          })) : W(o, u);
        },
        close: function () {
          window.postMessage({
            type: "form-closed",
            embedId: c
          }, "*"), Object(h.unmountComponentAtNode)(l);
        }
      };
      return !u.open && u.autoOpen && (u.open = "load"), D(n, u.open, u.openValue), n;
    }

    function B(e) {
      return (B = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
        return typeof e;
      } : function (e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
      })(e);
    }

    function H(e, t) {
      for (var n = 0; n < t.length; n++) {
        var r = t[n];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
      }
    }

    function U(e, t) {
      return (U = Object.setPrototypeOf || function (e, t) {
        return e.__proto__ = t, e;
      })(e, t);
    }

    function G(i) {
      var a = function () {
        if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" == typeof Proxy) return !0;

        try {
          return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0;
        } catch (e) {
          return !1;
        }
      }();

      return function () {
        var e,
            t,
            n,
            r,
            o = V(i);
        return t = a ? (e = V(this).constructor, Reflect.construct(o, arguments, e)) : o.apply(this, arguments), n = this, !(r = t) || "object" !== B(r) && "function" != typeof r ? Y(n) : r;
      };
    }

    function Y(e) {
      if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return e;
    }

    function V(e) {
      return (V = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
        return e.__proto__ || Object.getPrototypeOf(e);
      })(e);
    }

    var K = 200,
        X = l.c.div.withConfig({
      displayName: "widget__WidgetWrapper",
      componentId: "sc-1rxjz1n-0"
    })(["height:100%;position:relative;"]),
        Z = Object(l.d)(["10%{opacity:1;}25%{top:0;left:0;width:100%;height:100%;opacity:1;}70%{top:0;left:0;width:100%;height:100%;opacity:1;}100%{top:0;left:0;width:100%;height:100%;opacity:0;}"]),
        Q = Object(l.d)(["100%{opacity:0;}75%{opacity:1;}25%{opacity:1;}0%{opacity:0;}"]),
        J = l.c.div.withConfig({
      displayName: "widget__Placeholder",
      componentId: "sc-1rxjz1n-1"
    })(["position:fixed;top:", "px;left:", "px;height:", ";width:", ";animation:", " 1.5s ease;visibility:", ";background:", ";opacity:0;pointer-events:none;"], function (e) {
      return e.top;
    }, function (e) {
      return e.left;
    }, function (e) {
      return e.height ? "".concat(e.height, "px") : "100%";
    }, function (e) {
      return e.width ? "".concat(e.width, "px") : "100%";
    }, function (e) {
      return e.open ? Z : Q;
    }, function (e) {
      return e.visible ? "visible" : "hidden";
    }, function (e) {
      return e.backgroundColor;
    }),
        ee = l.c.div.withConfig({
      displayName: "widget__IframeWrapper",
      componentId: "sc-1rxjz1n-2"
    })(["height:100%;width:100%;overflow:hidden;background:", ";"], function (e) {
      return e.backgroundColor;
    }),
        te = function () {
      !function (e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
        e.prototype = Object.create(t && t.prototype, {
          constructor: {
            value: e,
            writable: !0,
            configurable: !0
          }
        }), t && U(e, t);
      }(o, i["Component"]);
      var e,
          t,
          n,
          r = G(o);

      function o(e) {
        var t;
        return function (e, t) {
          if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
        }(this, o), (t = r.call(this, e)).embedId = a(), t.mobileEmbedId = a(), t.wrapperRef = Object(i.createRef)(), t.fullScreenModalDiv = document.createElement("div"), t.state = {
          isFormReady: !1,
          isIframeFocused: !1,
          isFullscreen: !1,
          buttonColor: "black",
          backgroundColor: "transparent"
        }, t.handleMessage = t.handleMessage.bind(Y(t)), t.handleFormReady = Object(m.c)(t.handleFormReady.bind(Y(t)), t.embedId), t.handleFormSubmit = Object(m.c)(t.handleFormSubmit.bind(Y(t)), t.embedId), t.handleMobileFormSubmit = t.handleMobileFormSubmit.bind(Y(t)), t.handleFormTheme = Object(m.c)(t.handleFormTheme.bind(Y(t)), t.embedId), t.goFullScreen = Object(m.c)(t.goFullScreen.bind(Y(t)), t.embedId), t.focusIframe = t.focusIframe.bind(Y(t)), t.handleClose = t.handleClose.bind(Y(t)), t.reloadIframe = t.reloadIframe.bind(Y(t)), t.debouncedScroll = Object(m.d)(t.focusIframe, K, Y(t)), t.setIframeRef = t.setIframeRef.bind(Y(t)), t.sendFocusMessageToIframe = t.sendFocusMessageToIframe.bind(Y(t)), t;
      }

      return e = o, (t = [{
        key: "componentDidMount",
        value: function () {
          window.addEventListener("message", this.handleMessage), window.addEventListener("form-ready", this.handleFormReady), window.addEventListener("scroll", this.debouncedScroll), window.addEventListener("form-submit", this.handleFormSubmit), window.addEventListener("form-theme", this.handleFormTheme), window.addEventListener("welcome-screen-hidden", this.goFullScreen), window.addEventListener("redirect-after-submit", m.j), window.addEventListener("thank-you-screen-redirect", m.j), document.body.appendChild(this.fullScreenModalDiv);
        }
      }, {
        key: "componentWillUnmount",
        value: function () {
          window.removeEventListener("message", this.handleMessage), window.removeEventListener("form-ready", this.handleFormReady), window.removeEventListener("scroll", this.debouncedScroll), window.removeEventListener("form-submit", this.handleFormSubmit), window.removeEventListener("form-theme", this.handleFormTheme), window.removeEventListener("welcome-screen-hidden", this.goFullScreen), window.removeEventListener("redirect-after-submit", m.j), window.removeEventListener("thank-you-screen-redirect", m.j), document.body.removeChild(this.fullScreenModalDiv);
        }
      }, {
        key: "setIframeRef",
        value: function (e) {
          this.iframe = e;
        }
      }, {
        key: "goFullScreen",
        value: function () {
          this.props.enabledFullscreen && (this.setState({
            isFullscreen: !0
          }), setTimeout(this.reloadIframe, 3e3));
        }
      }, {
        key: "handleClose",
        value: function () {
          this.setState({
            isFullscreen: !1
          });
        }
      }, {
        key: "handleFormReady",
        value: function () {
          var e = this;
          this.setState({
            isFormReady: !0
          }, function () {
            e.focusIframe();
          });
        }
      }, {
        key: "handleFormTheme",
        value: function (e) {
          var t = (e.detail || {}).theme;
          this.setState({
            backgroundColor: t.backgroundColor,
            buttonColor: t.color
          });
        }
      }, {
        key: "handleMessage",
        value: function (e) {
          Object(m.b)(this.embedId, e);
        }
      }, {
        key: "handleFormSubmit",
        value: function (e) {
          this.props.options.onSubmit && this.props.options.onSubmit(Object(m.f)(e));
        }
      }, {
        key: "handleMobileFormSubmit",
        value: function (e) {
          this.props.options.onSubmit(e);
        }
      }, {
        key: "reloadIframe",
        value: function () {
          this.iframe.iframeRef.src;
        }
      }, {
        key: "focusIframe",
        value: function () {
          var e, t;
          this.props.enabledFullscreen || (e = this.iframe.iframeRef) && e.contentWindow && (t = Object(m.g)(e), this.state.isFormReady && !this.state.isIframeFocused && t && null != e.contentWindow && this.setState({
            isIframeFocused: !0
          }, this.sendFocusMessageToIframe));
        }
      }, {
        key: "sendFocusMessageToIframe",
        value: function () {
          var e = this.iframe.iframeRef;
          e && setTimeout(function () {
            return e.contentWindow.postMessage("embed-focus", "*");
          }, 100);
        }
      }, {
        key: "render",
        value: function () {
          var e = this.state,
              t = e.isFullscreen,
              n = e.backgroundColor,
              r = e.buttonColor,
              o = e.isFormReady,
              i = this.props,
              a = i.enabledFullscreen,
              s = i.url,
              c = this.iframe && this.iframe.iframeRef.getBoundingClientRect(),
              u = Object(m.l)("typeform-embed-id", this.embedId, s);
          a && (u = Object(m.l)("disable-tracking", "true", u));
          var l = Object(m.l)("typeform-welcome", "0", s);
          return f.a.createElement(X, {
            ref: this.wrapperRef
          }, f.a.createElement(ee, {
            backgroundColor: a ? n : "transparent"
          }, f.a.createElement(C.a, {
            frameBorder: "0",
            height: "100%",
            ref: this.setIframeRef,
            src: u,
            width: "100%"
          })), a && f.a.createElement(J, {
            backgroundColor: n,
            bottom: c && c.bottom,
            height: c && c.height,
            left: c && c.left,
            open: t,
            right: c && c.right,
            top: c && c.top,
            visible: o,
            width: c && c.width
          }), a && p.a.createPortal(f.a.createElement(L, {
            backgroundColor: n,
            buttonColor: r,
            embedId: this.mobileEmbedId,
            onClose: this.handleClose,
            onSubmit: this.handleMobileFormSubmit,
            open: t,
            openDelay: .3,
            url: l
          }), this.fullScreenModalDiv));
        }
      }]) && H(e.prototype, t), n && H(e, n), o;
    }();

    te.propTypes = {
      url: u.a.string,
      options: u.a.object.isRequired,
      enabledFullscreen: u.a.bool,
      embedId: u.a.string
    }, te.defaultProps = {
      options: {},
      enabledFullscreen: !1
    };
    var ne = te;

    function re(t, e) {
      var n,
          r = Object.keys(t);
      return Object.getOwnPropertySymbols && (n = Object.getOwnPropertySymbols(t), e && (n = n.filter(function (e) {
        return Object.getOwnPropertyDescriptor(t, e).enumerable;
      })), r.push.apply(r, n)), r;
    }

    function oe(o) {
      for (var e = 1; e < arguments.length; e++) {
        var i = null != arguments[e] ? arguments[e] : {};
        e % 2 ? re(Object(i), !0).forEach(function (e) {
          var t, n, r;
          t = o, r = i[n = e], n in t ? Object.defineProperty(t, n, {
            value: r,
            enumerable: !0,
            configurable: !0,
            writable: !0
          }) : t[n] = r;
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(o, Object.getOwnPropertyDescriptors(i)) : re(Object(i)).forEach(function (e) {
          Object.defineProperty(o, e, Object.getOwnPropertyDescriptor(i, e));
        });
      }

      return o;
    }

    var ie = {
      mode: "embed-widget",
      hideFooter: !1,
      hideHeaders: !1,
      hideScrollbars: !1,
      disableTracking: !1,
      transferableUrlParameters: [],
      onSubmit: m.h
    },
        ae = {
      mode: "typeform-embed",
      hideFooter: "embed-hide-footer",
      hideHeaders: "embed-hide-headers",
      opacity: "embed-opacity",
      disableTracking: "disable-tracking"
    };

    function se(e, t, n) {
      n = oe(oe({}, ie), n), window.addEventListener("message", F("form-ready", n.onReady));
      var r = y(navigator.userAgent),
          o = Object(m.k)(n, ae),
          o = b(n.transferableUrlParameters, o);
      r && (o = oe(oe({}, Object(m.i)("embed-opacity", o)), {}, {
        "add-placeholder-ws": !0
      }));
      var i = Object(m.a)(t, o);
      Object(h.render)(f.a.createElement(ne, {
        enabledFullscreen: r,
        options: n,
        url: i
      }), e);
    }

    var ce = n(8);

    function ue(t, e) {
      var n,
          r = Object.keys(t);
      return Object.getOwnPropertySymbols && (n = Object.getOwnPropertySymbols(t), e && (n = n.filter(function (e) {
        return Object.getOwnPropertyDescriptor(t, e).enumerable;
      })), r.push.apply(r, n)), r;
    }

    function le(o) {
      for (var e = 1; e < arguments.length; e++) {
        var i = null != arguments[e] ? arguments[e] : {};
        e % 2 ? ue(Object(i), !0).forEach(function (e) {
          var t, n, r;
          t = o, r = i[n = e], n in t ? Object.defineProperty(t, n, {
            value: r,
            enumerable: !0,
            configurable: !0,
            writable: !0
          }) : t[n] = r;
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(o, Object.getOwnPropertyDescriptors(i)) : ue(Object(i)).forEach(function (e) {
          Object.defineProperty(o, e, Object.getOwnPropertyDescriptor(i, e));
        });
      }

      return o;
    }

    var pe = {
      mode: "embed-fullpage",
      disableTracking: !1,
      onSubmit: m.h
    },
        de = {
      mode: "typeform-embed",
      disableTracking: "disable-tracking"
    };

    function fe(e, t, n) {
      n = le(le({}, pe), n), e.src = Object(m.a)(t, Object(m.k)(n, de)), e.focus();
      Object(m.e)(), e.onload = function () {
        e.contentWindow.focus();
      }, window.addEventListener("message", ce.a), window.addEventListener("form-submit", function (e) {
        n.onSubmit(Object(m.f)(e));
      }), window.addEventListener("redirect-after-submit", m.j), window.addEventListener("thank-you-screen-redirect", m.j);
    }
  }, function (e, t, n) {
    "use strict";

    function r(e) {
      var t = new RegExp("^(?:f|ht)tp(?:s)?://([^/]+)", "im"),
          n = e.origin.match(t);

      if (n && 1 < n.length) {
        var r = n[1].toString();
        return !!(/^localhost:/.test(window.location.host) ? /(\.typeform)\.(com|io)$|^localhost:/ : /(\.typeform)\.(com|io)$/).test(r);
      }
    }

    var o = n(10),
        i = n.n(o),
        a = n(15),
        s = n.n(a),
        c = n(16),
        u = n.n(c);

    t.a = function (e) {
      e = e.originalEvent || e, r(e) && (u()(e.data) ? window.location.href = e.data : s()(e.data) && e.data.hasOwnProperty("type") ? window.dispatchEvent(new i.a(e.data.type, {
        detail: e.data
      })) : window.dispatchEvent(new i.a(e.data)));
    };
  }, function (e, t, n) {
    "use strict";

    e.exports = n(26);
  }, function (n, e, t) {
    (function (e) {
      var t = e.CustomEvent;
      n.exports = function () {
        try {
          var e = new t("cat", {
            detail: {
              foo: "bar"
            }
          });
          return "cat" === e.type && "bar" === e.detail.foo;
        } catch (e) {}
      }() ? t : "undefined" != typeof document && "function" == typeof document.createEvent ? function (e, t) {
        var n = document.createEvent("CustomEvent");
        return t ? n.initCustomEvent(e, t.bubbles, t.cancelable, t.detail) : n.initCustomEvent(e, !1, !1, void 0), n;
      } : function (e, t) {
        var n = document.createEventObject();
        return n.type = e, t ? (n.bubbles = Boolean(t.bubbles), n.cancelable = Boolean(t.cancelable), n.detail = t.detail) : (n.bubbles = !1, n.cancelable = !1, n.detail = void 0), n;
      };
    }).call(this, t(13));
  }, function (e, t, n) {
    "use strict";

    var r = n(9),
        o = {
      childContextTypes: !0,
      contextType: !0,
      contextTypes: !0,
      defaultProps: !0,
      displayName: !0,
      getDefaultProps: !0,
      getDerivedStateFromError: !0,
      getDerivedStateFromProps: !0,
      mixins: !0,
      propTypes: !0,
      type: !0
    },
        p = {
      name: !0,
      length: !0,
      prototype: !0,
      caller: !0,
      callee: !0,
      arguments: !0,
      arity: !0
    },
        i = {
      $$typeof: !0,
      compare: !0,
      defaultProps: !0,
      displayName: !0,
      propTypes: !0,
      type: !0
    },
        a = {};

    function d(e) {
      return r.isMemo(e) ? i : a[e.$$typeof] || o;
    }

    a[r.ForwardRef] = {
      $$typeof: !0,
      render: !0,
      defaultProps: !0,
      displayName: !0,
      propTypes: !0
    }, a[r.Memo] = i;
    var f = Object.defineProperty,
        h = Object.getOwnPropertyNames,
        m = Object.getOwnPropertySymbols,
        b = Object.getOwnPropertyDescriptor,
        y = Object.getPrototypeOf,
        g = Object.prototype;

    e.exports = function e(t, n, r) {
      if ("string" != typeof n) {
        var o;
        !g || (o = y(n)) && o !== g && e(t, o, r);
        var i = h(n);
        m && (i = i.concat(m(n)));

        for (var a = d(t), s = d(n), c = 0; c < i.length; ++c) {
          var u = i[c];

          if (!(p[u] || r && r[u] || s && s[u] || a && a[u])) {
            var l = b(n, u);

            try {
              f(t, u, l);
            } catch (e) {}
          }
        }
      }

      return t;
    };
  }, function (e, t, n) {
    "use strict";

    var r = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|inert|itemProp|itemScope|itemType|itemID|itemRef|on|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/,
        o = function (t) {
      var n = {};
      return function (e) {
        return void 0 === n[e] && (n[e] = t(e)), n[e];
      };
    }(function (e) {
      return r.test(e) || 111 === e.charCodeAt(0) && 110 === e.charCodeAt(1) && e.charCodeAt(2) < 91;
    });

    t.a = o;
  }, function (e, t) {
    var n = function () {
      return this;
    }();

    try {
      n = n || new Function("return this")();
    } catch (e) {
      "object" == typeof window && (n = window);
    }

    e.exports = n;
  }, function (e, t, r) {
    "use strict";

    (function (a) {
      var f = r(21),
          h = r(22),
          s = /^[A-Za-z][A-Za-z0-9+-.]*:\/\//,
          n = /^([a-z][a-z0-9.+-]*:)?(\/\/)?([\S\s]*)/i,
          t = new RegExp("^[\\x09\\x0A\\x0B\\x0C\\x0D\\x20\\xA0\\u1680\\u180E\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200A\\u202F\\u205F\\u3000\\u2028\\u2029\\uFEFF]+");

      function m(e) {
        return (e || "").toString().replace(t, "");
      }

      var b = [["#", "hash"], ["?", "query"], function (e) {
        return e.replace("\\", "/");
      }, ["/", "pathname"], ["@", "auth", 1], [NaN, "host", void 0, 1, 1], [/:(\d+)$/, "port", void 0, 1], [NaN, "hostname", void 0, 1, 1]],
          c = {
        hash: 1,
        query: 1
      };

      function y(e) {
        var t,
            n = "undefined" != typeof window ? window : void 0 !== a ? a : "undefined" != typeof self ? self : {},
            r = n.location || {},
            o = {},
            i = typeof (e = e || r);
        if ("blob:" === e.protocol) o = new v(unescape(e.pathname), {});else if ("string" == i) for (t in o = new v(e, {}), c) delete o[t];else if ("object" == i) {
          for (t in e) t in c || (o[t] = e[t]);

          void 0 === o.slashes && (o.slashes = s.test(e.href));
        }
        return o;
      }

      function g(e) {
        e = m(e);
        var t = n.exec(e);
        return {
          protocol: t[1] ? t[1].toLowerCase() : "",
          slashes: !!t[2],
          rest: t[3]
        };
      }

      function v(e, t, n) {
        if (e = m(e), !(this instanceof v)) return new v(e, t, n);
        var r,
            o,
            i,
            a,
            s,
            c,
            u = b.slice(),
            l = typeof t,
            p = this,
            d = 0;

        for ("object" != l && "string" != l && (n = t, t = null), n && "function" != typeof n && (n = h.parse), t = y(t), r = !(o = g(e || "")).protocol && !o.slashes, p.slashes = o.slashes || r && t.slashes, p.protocol = o.protocol || t.protocol || "", e = o.rest, o.slashes || (u[3] = [/(.*)/, "pathname"]); d < u.length; d++) "function" != typeof (a = u[d]) ? (i = a[0], c = a[1], i != i ? p[c] = e : "string" == typeof i ? ~(s = e.indexOf(i)) && (e = "number" == typeof a[2] ? (p[c] = e.slice(0, s), e.slice(s + a[2])) : (p[c] = e.slice(s), e.slice(0, s))) : (s = i.exec(e)) && (p[c] = s[1], e = e.slice(0, s.index)), p[c] = p[c] || r && a[3] && t[c] || "", a[4] && (p[c] = p[c].toLowerCase())) : e = a(e);

        n && (p.query = n(p.query)), r && t.slashes && "/" !== p.pathname.charAt(0) && ("" !== p.pathname || "" !== t.pathname) && (p.pathname = function (e, t) {
          if ("" === e) return t;

          for (var n = (t || "/").split("/").slice(0, -1).concat(e.split("/")), r = n.length, o = n[r - 1], i = !1, a = 0; r--;) "." === n[r] ? n.splice(r, 1) : ".." === n[r] ? (n.splice(r, 1), a++) : a && (0 === r && (i = !0), n.splice(r, 1), a--);

          return i && n.unshift(""), "." !== o && ".." !== o || n.push(""), n.join("/");
        }(p.pathname, t.pathname)), f(p.port, p.protocol) || (p.host = p.hostname, p.port = ""), p.username = p.password = "", p.auth && (a = p.auth.split(":"), p.username = a[0] || "", p.password = a[1] || ""), p.origin = p.protocol && p.host && "file:" !== p.protocol ? p.protocol + "//" + p.host : "null", p.href = p.toString();
      }

      v.prototype = {
        set: function (e, t, n) {
          var r,
              o = this;

          switch (e) {
            case "query":
              "string" == typeof t && t.length && (t = (n || h.parse)(t)), o[e] = t;
              break;

            case "port":
              o[e] = t, f(t, o.protocol) ? t && (o.host = o.hostname + ":" + t) : (o.host = o.hostname, o[e] = "");
              break;

            case "hostname":
              o[e] = t, o.port && (t += ":" + o.port), o.host = t;
              break;

            case "host":
              o[e] = t, /:\d+$/.test(t) ? (t = t.split(":"), o.port = t.pop(), o.hostname = t.join(":")) : (o.hostname = t, o.port = "");
              break;

            case "protocol":
              o.protocol = t.toLowerCase(), o.slashes = !n;
              break;

            case "pathname":
            case "hash":
              t ? (r = "pathname" === e ? "/" : "#", o[e] = t.charAt(0) !== r ? r + t : t) : o[e] = t;
              break;

            default:
              o[e] = t;
          }

          for (var i = 0; i < b.length; i++) {
            var a = b[i];
            a[4] && (o[a[1]] = o[a[1]].toLowerCase());
          }

          return o.origin = o.protocol && o.host && "file:" !== o.protocol ? o.protocol + "//" + o.host : "null", o.href = o.toString(), o;
        },
        toString: function (e) {
          e && "function" == typeof e || (e = h.stringify);
          var t,
              n = this,
              r = n.protocol;
          r && ":" !== r.charAt(r.length - 1) && (r += ":");
          var o = r + (n.slashes ? "//" : "");
          return n.username && (o += n.username, n.password && (o += ":" + n.password), o += "@"), o += n.host + n.pathname, (t = "object" == typeof n.query ? e(n.query) : n.query) && (o += "?" !== t.charAt(0) ? "?" + t : t), n.hash && (o += n.hash), o;
        }
      }, v.extractProtocol = g, v.location = y, v.trimLeft = m, v.qs = h, e.exports = v;
    }).call(this, r(13));
  }, function (e, t, n) {
    "use strict";
    /*!
     * isobject <https://github.com/jonschlinkert/isobject>
     *
     * Copyright (c) 2014-2017, Jon Schlinkert.
     * Released under the MIT License.
     */

    e.exports = function (e) {
      return null != e && "object" == typeof e && !1 === Array.isArray(e);
    };
  }, function (e, t) {
    e.exports = function (e) {
      if ("string" != typeof e) return !1;
      var t = e.match(r);
      if (!t) return !1;
      var n = t[1];
      if (!n) return !1;
      if (o.test(n) || i.test(n)) return !0;
      return !1;
    };

    var r = /^(?:\w+:)?\/\/(\S+)$/,
        o = /^localhost[\:?\d]*(?:[^\:?\d]\S*)?$/,
        i = /^[^\s\.]+\.\S{2,}$/;
  }, function (t, n, e) {
    var o;
    (function () {
      "use strict";

      var r = null,
          e = function (e) {
        var t, n;
        return null == e && (e = !1), null == r || e ? "loading" === document.readyState ? null : (t = document.createElement("div"), n = document.createElement("div"), t.style.width = n.style.width = t.style.height = n.style.height = "100px", t.style.overflow = "scroll", n.style.overflow = "hidden", document.body.appendChild(t), document.body.appendChild(n), r = Math.abs(t.scrollHeight - n.scrollHeight), document.body.removeChild(t), document.body.removeChild(n), r) : r;
      };

      void 0 === (o = function () {
        return e;
      }.apply(n, [])) || (t.exports = o);
    }).call(this);
  }, function (e, t) {
    e.exports = function (e, t, n, r) {
      if (void 0 !== (u = n ? n.call(r, e, t) : void 0)) return !!u;
      if (e === t) return !0;
      if ("object" != typeof e || !e || "object" != typeof t || !t) return !1;
      var o = Object.keys(e),
          i = Object.keys(t);
      if (o.length !== i.length) return !1;

      for (var a = Object.prototype.hasOwnProperty.bind(t), s = 0; s < o.length; s++) {
        var c = o[s];
        if (!a(c)) return !1;
        var u,
            l = e[c],
            p = t[c];
        if (!1 === (u = n ? n.call(r, l, p, c) : void 0) || void 0 === u && l !== p) return !1;
      }

      return !0;
    };
  }, function (e, t, n) {
    "use strict";

    t.a = function (e) {
      function P(e, t, n) {
        var r = t.trim().split(p),
            o = (t = r).length,
            i = e.length;

        switch (i) {
          case 0:
          case 1:
            var a = 0;

            for (e = 0 === i ? "" : e[0] + " "; a < o; ++a) t[a] = u(e, t[a], n).trim();

            break;

          default:
            var s = a = 0;

            for (t = []; a < o; ++a) for (var c = 0; c < i; ++c) t[s++] = u(e[c] + " ", r[a], n).trim();

        }

        return t;
      }

      function u(e, t, n) {
        var r = t.charCodeAt(0);

        switch (r < 33 && (r = (t = t.trim()).charCodeAt(0)), r) {
          case 38:
            return t.replace(o, "$1" + e.trim());

          case 58:
            return e.trim() + t.replace(o, "$1" + e.trim());

          default:
            if (0 < +n && 0 < t.indexOf("\f")) return t.replace(o, (58 === e.charCodeAt(0) ? "" : "$1") + e.trim());
        }

        return e + t;
      }

      function A(e, t, n, r) {
        var o = e + ";",
            i = 2 * t + 3 * n + 4 * r;

        if (944 === i) {
          e = o.indexOf(":", 9) + 1;
          var a = o.substring(e, o.length - 1).trim(),
              a = o.substring(0, e).trim() + a + ";";
          return 1 === q || 2 === q && I(a, 1) ? "-webkit-" + a + a : a;
        }

        if (0 === q || 2 === q && !I(o, 1)) return o;

        switch (i) {
          case 1015:
            return 97 === o.charCodeAt(10) ? "-webkit-" + o + o : o;

          case 951:
            return 116 === o.charCodeAt(3) ? "-webkit-" + o + o : o;

          case 963:
            return 110 === o.charCodeAt(5) ? "-webkit-" + o + o : o;

          case 1009:
            if (100 !== o.charCodeAt(4)) break;

          case 969:
          case 942:
            return "-webkit-" + o + o;

          case 978:
            return "-webkit-" + o + "-moz-" + o + o;

          case 1019:
          case 983:
            return "-webkit-" + o + "-moz-" + o + "-ms-" + o + o;

          case 883:
            if (45 === o.charCodeAt(8)) return "-webkit-" + o + o;
            if (0 < o.indexOf("image-set(", 11)) return o.replace(b, "$1-webkit-$2") + o;
            break;

          case 932:
            if (45 === o.charCodeAt(4)) switch (o.charCodeAt(5)) {
              case 103:
                return "-webkit-box-" + o.replace("-grow", "") + "-webkit-" + o + "-ms-" + o.replace("grow", "positive") + o;

              case 115:
                return "-webkit-" + o + "-ms-" + o.replace("shrink", "negative") + o;

              case 98:
                return "-webkit-" + o + "-ms-" + o.replace("basis", "preferred-size") + o;
            }
            return "-webkit-" + o + "-ms-" + o + o;

          case 964:
            return "-webkit-" + o + "-ms-flex-" + o + o;

          case 1023:
            if (99 !== o.charCodeAt(8)) break;
            return "-webkit-box-pack" + (a = o.substring(o.indexOf(":", 15)).replace("flex-", "").replace("space-between", "justify")) + "-webkit-" + o + "-ms-flex-pack" + a + o;

          case 1005:
            return c.test(o) ? o.replace(s, ":-webkit-") + o.replace(s, ":-moz-") + o : o;

          case 1e3:
            switch (t = (a = o.substring(13).trim()).indexOf("-") + 1, a.charCodeAt(0) + a.charCodeAt(t)) {
              case 226:
                a = o.replace(d, "tb");
                break;

              case 232:
                a = o.replace(d, "tb-rl");
                break;

              case 220:
                a = o.replace(d, "lr");
                break;

              default:
                return o;
            }

            return "-webkit-" + o + "-ms-" + a + o;

          case 1017:
            if (-1 === o.indexOf("sticky", 9)) break;

          case 975:
            switch (t = (o = e).length - 10, i = (a = (33 === o.charCodeAt(t) ? o.substring(0, t) : o).substring(e.indexOf(":", 7) + 1).trim()).charCodeAt(0) + (0 | a.charCodeAt(7))) {
              case 203:
                if (a.charCodeAt(8) < 111) break;

              case 115:
                o = o.replace(a, "-webkit-" + a) + ";" + o;
                break;

              case 207:
              case 102:
                o = o.replace(a, "-webkit-" + (102 < i ? "inline-" : "") + "box") + ";" + o.replace(a, "-webkit-" + a) + ";" + o.replace(a, "-ms-" + a + "box") + ";" + o;
            }

            return o + ";";

          case 938:
            if (45 === o.charCodeAt(5)) switch (o.charCodeAt(6)) {
              case 105:
                return a = o.replace("-items", ""), "-webkit-" + o + "-webkit-box-" + a + "-ms-flex-" + a + o;

              case 115:
                return "-webkit-" + o + "-ms-flex-item-" + o.replace(h, "") + o;

              default:
                return "-webkit-" + o + "-ms-flex-line-pack" + o.replace("align-content", "").replace(h, "") + o;
            }
            break;

          case 973:
          case 989:
            if (45 !== o.charCodeAt(3) || 122 === o.charCodeAt(4)) break;

          case 931:
          case 953:
            if (!0 === m.test(e)) return 115 === (a = e.substring(e.indexOf(":") + 1)).charCodeAt(0) ? A(e.replace("stretch", "fill-available"), t, n, r).replace(":fill-available", ":stretch") : o.replace(a, "-webkit-" + a) + o.replace(a, "-moz-" + a.replace("fill-", "")) + o;
            break;

          case 962:
            if (o = "-webkit-" + o + (102 === o.charCodeAt(5) ? "-ms-" + o : "") + o, 211 === n + r && 105 === o.charCodeAt(13) && 0 < o.indexOf("transform", 10)) return o.substring(0, o.indexOf(";", 27) + 1).replace(l, "$1-webkit-$2") + o;
        }

        return o;
      }

      function I(e, t) {
        var n = e.indexOf(1 === t ? ":" : "{"),
            r = e.substring(0, 3 !== t ? n : 10),
            n = e.substring(n + 1, e.length - 1);
        return a(2 !== t ? r : r.replace(i, "$1"), n, t);
      }

      function R(e, t) {
        var n = A(t, t.charCodeAt(0), t.charCodeAt(1), t.charCodeAt(2));
        return n !== t + ";" ? n.replace(r, " or ($1)").substring(4) : "(" + t + ")";
      }

      function T(e, t, n, r, o, i, a, s, c, u) {
        for (var l, p = 0, d = t; p < H; ++p) switch (l = y[p].call(f, e, d, n, r, o, i, a, s, c, u)) {
          case void 0:
          case !1:
          case !0:
          case null:
            break;

          default:
            d = l;
        }

        if (d !== t) return d;
      }

      function t(e) {
        return void 0 !== (e = e.prefix) && (a = null, e ? "function" != typeof e ? q = 1 : (q = 2, a = e) : q = 0), t;
      }

      function f(e, t) {
        var n,
            r = e;
        r.charCodeAt(0) < 33 && (r = r.trim()), r = [r], 0 < H && void 0 !== (n = T(-1, t, r, r, z, $, 0, 0, 0, 0)) && "string" == typeof n && (t = n);

        var o = function e(t, n, r, o, i) {
          for (var a, s, c, u, l, p = 0, d = 0, f = 0, h = 0, m = 0, b = 0, y = c = a = 0, g = 0, v = 0, w = 0, O = 0, k = r.length, C = k - 1, S = "", j = "", x = "", E = ""; g < k;) {
            if (s = r.charCodeAt(g), g === C && 0 !== d + h + f + p && (0 !== d && (s = 47 === d ? 10 : 47), h = f = p = 0, k++, C++), 0 === d + h + f + p) {
              if (g === C && (0 < v && (S = S.replace(L, "")), 0 < S.trim().length)) {
                switch (s) {
                  case 32:
                  case 9:
                  case 59:
                  case 13:
                  case 10:
                    break;

                  default:
                    S += r.charAt(g);
                }

                s = 59;
              }

              switch (s) {
                case 123:
                  for (a = (S = S.trim()).charCodeAt(0), c = 1, O = ++g; g < k;) {
                    switch (s = r.charCodeAt(g)) {
                      case 123:
                        c++;
                        break;

                      case 125:
                        c--;
                        break;

                      case 47:
                        switch (s = r.charCodeAt(g + 1)) {
                          case 42:
                          case 47:
                            e: {
                              for (y = g + 1; y < C; ++y) switch (r.charCodeAt(y)) {
                                case 47:
                                  if (42 !== s || 42 !== r.charCodeAt(y - 1) || g + 2 === y) break;
                                  g = y + 1;
                                  break e;

                                case 10:
                                  if (47 === s) {
                                    g = y + 1;
                                    break e;
                                  }

                              }

                              g = y;
                            }

                        }

                        break;

                      case 91:
                        s++;

                      case 40:
                        s++;

                      case 34:
                      case 39:
                        for (; g++ < C && r.charCodeAt(g) !== s;);

                    }

                    if (0 === c) break;
                    g++;
                  }

                  switch (c = r.substring(O, g), 0 === a && (a = (S = S.replace(_, "").trim()).charCodeAt(0)), a) {
                    case 64:
                      switch (0 < v && (S = S.replace(L, "")), s = S.charCodeAt(1)) {
                        case 100:
                        case 109:
                        case 115:
                        case 45:
                          v = n;
                          break;

                        default:
                          v = B;
                      }

                      if (O = (c = e(n, v, c, s, i + 1)).length, 0 < H && (l = T(3, c, v = P(B, S, w), n, z, $, O, s, i, o), S = v.join(""), void 0 !== l && 0 === (O = (c = l.trim()).length) && (s = 0, c = "")), 0 < O) switch (s) {
                        case 115:
                          S = S.replace(N, R);

                        case 100:
                        case 109:
                        case 45:
                          c = S + "{" + c + "}";
                          break;

                        case 107:
                          c = (S = S.replace(F, "$1 $2")) + "{" + c + "}", c = 1 === q || 2 === q && I("@" + c, 3) ? "@-webkit-" + c + "@" + c : "@" + c;
                          break;

                        default:
                          c = S + c, 112 === o && (j += c, c = "");
                      } else c = "";
                      break;

                    default:
                      c = e(n, P(n, S, w), c, o, i + 1);
                  }

                  x += c, c = w = v = y = a = 0, S = "", s = r.charCodeAt(++g);
                  break;

                case 125:
                case 59:
                  if (1 < (O = (S = (0 < v ? S.replace(L, "") : S).trim()).length)) switch (0 === y && (a = S.charCodeAt(0), 45 === a || 96 < a && a < 123) && (O = (S = S.replace(" ", ":")).length), 0 < H && void 0 !== (l = T(1, S, n, t, z, $, j.length, o, i, o)) && 0 === (O = (S = l.trim()).length) && (S = "\0\0"), a = S.charCodeAt(0), s = S.charCodeAt(1), a) {
                    case 0:
                      break;

                    case 64:
                      if (105 === s || 99 === s) {
                        E += S + r.charAt(g);
                        break;
                      }

                    default:
                      58 !== S.charCodeAt(O - 1) && (j += A(S, a, s, S.charCodeAt(2)));
                  }
                  w = v = y = a = 0, S = "", s = r.charCodeAt(++g);
              }
            }

            switch (s) {
              case 13:
              case 10:
                47 === d ? d = 0 : 0 === 1 + a && 107 !== o && 0 < S.length && (v = 1, S += "\0"), 0 < H * U && T(0, S, n, t, z, $, j.length, o, i, o), $ = 1, z++;
                break;

              case 59:
              case 125:
                if (0 === d + h + f + p) {
                  $++;
                  break;
                }

              default:
                switch ($++, u = r.charAt(g), s) {
                  case 9:
                  case 32:
                    if (0 === h + p + d) switch (m) {
                      case 44:
                      case 58:
                      case 9:
                      case 32:
                        u = "";
                        break;

                      default:
                        32 !== s && (u = " ");
                    }
                    break;

                  case 0:
                    u = "\\0";
                    break;

                  case 12:
                    u = "\\f";
                    break;

                  case 11:
                    u = "\\v";
                    break;

                  case 38:
                    0 === h + d + p && (v = w = 1, u = "\f" + u);
                    break;

                  case 108:
                    if (0 === h + d + p + W && 0 < y) switch (g - y) {
                      case 2:
                        112 === m && 58 === r.charCodeAt(g - 3) && (W = m);

                      case 8:
                        111 === b && (W = b);
                    }
                    break;

                  case 58:
                    0 === h + d + p && (y = g);
                    break;

                  case 44:
                    0 === d + f + h + p && (v = 1, u += "\r");
                    break;

                  case 34:
                  case 39:
                    0 === d && (h = h === s ? 0 : 0 === h ? s : h);
                    break;

                  case 91:
                    0 === h + d + f && p++;
                    break;

                  case 93:
                    0 === h + d + f && p--;
                    break;

                  case 41:
                    0 === h + d + p && f--;
                    break;

                  case 40:
                    if (0 === h + d + p) {
                      if (0 === a) switch (2 * m + 3 * b) {
                        case 533:
                          break;

                        default:
                          a = 1;
                      }
                      f++;
                    }

                    break;

                  case 64:
                    0 === d + f + h + p + y + c && (c = 1);
                    break;

                  case 42:
                  case 47:
                    if (!(0 < h + p + f)) switch (d) {
                      case 0:
                        switch (2 * s + 3 * r.charCodeAt(g + 1)) {
                          case 235:
                            d = 47;
                            break;

                          case 220:
                            O = g, d = 42;
                        }

                        break;

                      case 42:
                        47 === s && 42 === m && O + 2 !== g && (33 === r.charCodeAt(O + 2) && (j += r.substring(O, g + 1)), u = "", d = 0);
                    }
                }

                0 === d && (S += u);
            }

            b = m, m = s, g++;
          }

          if (0 < (O = j.length)) {
            if (v = n, 0 < H && void 0 !== (l = T(2, j, v, t, z, $, O, o, i, o)) && 0 === (j = l).length) return E + j + x;

            if (j = v.join(",") + "{" + j + "}", 0 != q * W) {
              switch (2 !== q || I(j, 2) || (W = 0), W) {
                case 111:
                  j = j.replace(M, ":-moz-$1") + j;
                  break;

                case 112:
                  j = j.replace(D, "::-webkit-input-$1") + j.replace(D, "::-moz-$1") + j.replace(D, ":-ms-input-$1") + j;
              }

              W = 0;
            }
          }

          return E + j + x;
        }(B, r, t, 0, 0);

        return 0 < H && void 0 !== (n = T(-2, o, r, r, z, $, o.length, 0, 0, 0)) && (o = n), W = 0, $ = z = 1, o;
      }

      var _ = /^\0+/g,
          L = /[\0\r\f]/g,
          s = /: */g,
          c = /zoo|gra/,
          l = /([,: ])(transform)/g,
          p = /,\r+?/g,
          o = /([\t\r\n ])*\f?&/g,
          F = /@(k\w+)\s*(\S*)\s*/,
          D = /::(place)/g,
          M = /:(read-only)/g,
          d = /[svh]\w+-[tblr]{2}/,
          N = /\(\s*(.*)\s*\)/g,
          r = /([\s\S]*?);/g,
          h = /-self|flex-/g,
          i = /[^]*?(:[rp][el]a[\w-]+)[^]*/,
          m = /stretch|:\s*\w+\-(?:conte|avail)/,
          b = /([^-])(image-set\()/,
          $ = 1,
          z = 1,
          W = 0,
          q = 1,
          B = [],
          y = [],
          H = 0,
          a = null,
          U = 0;
      return f.use = function e(t) {
        switch (t) {
          case void 0:
          case null:
            H = y.length = 0;
            break;

          default:
            if ("function" == typeof t) y[H++] = t;else if ("object" == typeof t) for (var n = 0, r = t.length; n < r; ++n) e(t[n]);else U = 0 | !!t;
        }

        return e;
      }, f.set = t, void 0 !== e && t(e), f;
    };
  }, function (e, t, n) {
    "use strict";

    t.a = {
      animationIterationCount: 1,
      borderImageOutset: 1,
      borderImageSlice: 1,
      borderImageWidth: 1,
      boxFlex: 1,
      boxFlexGroup: 1,
      boxOrdinalGroup: 1,
      columnCount: 1,
      columns: 1,
      flex: 1,
      flexGrow: 1,
      flexPositive: 1,
      flexShrink: 1,
      flexNegative: 1,
      flexOrder: 1,
      gridRow: 1,
      gridRowEnd: 1,
      gridRowSpan: 1,
      gridRowStart: 1,
      gridColumn: 1,
      gridColumnEnd: 1,
      gridColumnSpan: 1,
      gridColumnStart: 1,
      msGridRow: 1,
      msGridRowSpan: 1,
      msGridColumn: 1,
      msGridColumnSpan: 1,
      fontWeight: 1,
      lineHeight: 1,
      opacity: 1,
      order: 1,
      orphans: 1,
      tabSize: 1,
      widows: 1,
      zIndex: 1,
      zoom: 1,
      WebkitLineClamp: 1,
      fillOpacity: 1,
      floodOpacity: 1,
      stopOpacity: 1,
      strokeDasharray: 1,
      strokeDashoffset: 1,
      strokeMiterlimit: 1,
      strokeOpacity: 1,
      strokeWidth: 1
    };
  }, function (e, t, n) {
    "use strict";

    e.exports = function (e, t) {
      if (t = t.split(":")[0], !(e = +e)) return !1;

      switch (t) {
        case "http":
        case "ws":
          return 80 !== e;

        case "https":
        case "wss":
          return 443 !== e;

        case "ftp":
          return 21 !== e;

        case "gopher":
          return 70 !== e;

        case "file":
          return !1;
      }

      return 0 !== e;
    };
  }, function (e, t, n) {
    "use strict";

    var i = Object.prototype.hasOwnProperty;

    function a(e) {
      try {
        return decodeURIComponent(e.replace(/\+/g, " "));
      } catch (e) {
        return null;
      }
    }

    t.stringify = function (e, t) {
      t = t || "";
      var n,
          r,
          o = [];

      for (r in "string" != typeof t && (t = "?"), e) if (i.call(e, r)) {
        if ((n = e[r]) || null != n && !isNaN(n) || (n = ""), r = encodeURIComponent(r), n = encodeURIComponent(n), null === r || null === n) continue;
        o.push(r + "=" + n);
      }

      return o.length ? t + o.join("&") : "";
    }, t.parse = function (e) {
      for (var t, n = /([^=?&]+)=?([^&]*)/g, r = {}; t = n.exec(e);) {
        var o = a(t[1]),
            i = a(t[2]);
        null === o || null === i || o in r || (r[o] = i);
      }

      return r;
    };
  }, function (e, t, n) {
    "use strict";

    var s = n(24);

    function r() {}

    function o() {}

    o.resetWarningCache = r, e.exports = function () {
      function e(e, t, n, r, o, i) {
        if (i !== s) {
          var a = new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");
          throw a.name = "Invariant Violation", a;
        }
      }

      function t() {
        return e;
      }

      var n = {
        array: e.isRequired = e,
        bool: e,
        func: e,
        number: e,
        object: e,
        string: e,
        symbol: e,
        any: e,
        arrayOf: t,
        element: e,
        elementType: e,
        instanceOf: t,
        node: e,
        objectOf: t,
        oneOf: t,
        oneOfType: t,
        shape: t,
        exact: t,
        checkPropTypes: o,
        resetWarningCache: r
      };
      return n.PropTypes = n;
    };
  }, function (e, t, n) {
    "use strict";

    e.exports = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  }, function (e, t) {
    var n,
        r,
        o = e.exports = {};

    function i() {
      throw new Error("setTimeout has not been defined");
    }

    function a() {
      throw new Error("clearTimeout has not been defined");
    }

    function s(t) {
      if (n === setTimeout) return setTimeout(t, 0);
      if ((n === i || !n) && setTimeout) return n = setTimeout, setTimeout(t, 0);

      try {
        return n(t, 0);
      } catch (e) {
        try {
          return n.call(null, t, 0);
        } catch (e) {
          return n.call(this, t, 0);
        }
      }
    }

    !function () {
      try {
        n = "function" == typeof setTimeout ? setTimeout : i;
      } catch (e) {
        n = i;
      }

      try {
        r = "function" == typeof clearTimeout ? clearTimeout : a;
      } catch (e) {
        r = a;
      }
    }();
    var c,
        u = [],
        l = !1,
        p = -1;

    function d() {
      l && c && (l = !1, c.length ? u = c.concat(u) : p = -1, u.length && f());
    }

    function f() {
      if (!l) {
        var e = s(d);
        l = !0;

        for (var t = u.length; t;) {
          for (c = u, u = []; ++p < t;) c && c[p].run();

          p = -1, t = u.length;
        }

        c = null, l = !1, function (t) {
          if (r === clearTimeout) return clearTimeout(t);
          if ((r === a || !r) && clearTimeout) return r = clearTimeout, clearTimeout(t);

          try {
            r(t);
          } catch (e) {
            try {
              return r.call(null, t);
            } catch (e) {
              return r.call(this, t);
            }
          }
        }(e);
      }
    }

    function h(e, t) {
      this.fun = e, this.array = t;
    }

    function m() {}

    o.nextTick = function (e) {
      var t = new Array(arguments.length - 1);
      if (1 < arguments.length) for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
      u.push(new h(e, t)), 1 !== u.length || l || s(f);
    }, h.prototype.run = function () {
      this.fun.apply(null, this.array);
    }, o.title = "browser", o.browser = !0, o.env = {}, o.argv = [], o.version = "", o.versions = {}, o.on = m, o.addListener = m, o.once = m, o.off = m, o.removeListener = m, o.removeAllListeners = m, o.emit = m, o.prependListener = m, o.prependOnceListener = m, o.listeners = function (e) {
      return [];
    }, o.binding = function (e) {
      throw new Error("process.binding is not supported");
    }, o.cwd = function () {
      return "/";
    }, o.chdir = function (e) {
      throw new Error("process.chdir is not supported");
    }, o.umask = function () {
      return 0;
    };
  }, function (e, t, n) {
    "use strict";
    /** @license React v16.13.1
     * react-is.production.min.js
     *
     * Copyright (c) Facebook, Inc. and its affiliates.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     */

    var r = "function" == typeof Symbol && Symbol.for,
        o = r ? Symbol.for("react.element") : 60103,
        i = r ? Symbol.for("react.portal") : 60106,
        a = r ? Symbol.for("react.fragment") : 60107,
        s = r ? Symbol.for("react.strict_mode") : 60108,
        c = r ? Symbol.for("react.profiler") : 60114,
        u = r ? Symbol.for("react.provider") : 60109,
        l = r ? Symbol.for("react.context") : 60110,
        p = r ? Symbol.for("react.async_mode") : 60111,
        d = r ? Symbol.for("react.concurrent_mode") : 60111,
        f = r ? Symbol.for("react.forward_ref") : 60112,
        h = r ? Symbol.for("react.suspense") : 60113,
        m = r ? Symbol.for("react.suspense_list") : 60120,
        b = r ? Symbol.for("react.memo") : 60115,
        y = r ? Symbol.for("react.lazy") : 60116,
        g = r ? Symbol.for("react.block") : 60121,
        v = r ? Symbol.for("react.fundamental") : 60117,
        w = r ? Symbol.for("react.responder") : 60118,
        O = r ? Symbol.for("react.scope") : 60119;

    function k(e) {
      if ("object" == typeof e && null !== e) {
        var t = e.$$typeof;

        switch (t) {
          case o:
            switch (e = e.type) {
              case p:
              case d:
              case a:
              case c:
              case s:
              case h:
                return e;

              default:
                switch (e = e && e.$$typeof) {
                  case l:
                  case f:
                  case y:
                  case b:
                  case u:
                    return e;

                  default:
                    return t;
                }

            }

          case i:
            return t;
        }
      }
    }

    function C(e) {
      return k(e) === d;
    }

    t.AsyncMode = p, t.ConcurrentMode = d, t.ContextConsumer = l, t.ContextProvider = u, t.Element = o, t.ForwardRef = f, t.Fragment = a, t.Lazy = y, t.Memo = b, t.Portal = i, t.Profiler = c, t.StrictMode = s, t.Suspense = h, t.isAsyncMode = function (e) {
      return C(e) || k(e) === p;
    }, t.isConcurrentMode = C, t.isContextConsumer = function (e) {
      return k(e) === l;
    }, t.isContextProvider = function (e) {
      return k(e) === u;
    }, t.isElement = function (e) {
      return "object" == typeof e && null !== e && e.$$typeof === o;
    }, t.isForwardRef = function (e) {
      return k(e) === f;
    }, t.isFragment = function (e) {
      return k(e) === a;
    }, t.isLazy = function (e) {
      return k(e) === y;
    }, t.isMemo = function (e) {
      return k(e) === b;
    }, t.isPortal = function (e) {
      return k(e) === i;
    }, t.isProfiler = function (e) {
      return k(e) === c;
    }, t.isStrictMode = function (e) {
      return k(e) === s;
    }, t.isSuspense = function (e) {
      return k(e) === h;
    }, t.isValidElementType = function (e) {
      return "string" == typeof e || "function" == typeof e || e === a || e === d || e === c || e === s || e === h || e === m || "object" == typeof e && null !== e && (e.$$typeof === y || e.$$typeof === b || e.$$typeof === u || e.$$typeof === l || e.$$typeof === f || e.$$typeof === v || e.$$typeof === w || e.$$typeof === O || e.$$typeof === g);
    }, t.typeOf = k;
  }], o.c = a, o.d = function (e, t, n) {
    o.o(e, t) || Object.defineProperty(e, t, {
      enumerable: !0,
      get: n
    });
  }, o.r = function (e) {
    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
      value: "Module"
    }), Object.defineProperty(e, "__esModule", {
      value: !0
    });
  }, o.t = function (t, e) {
    if (1 & e && (t = o(t)), 8 & e) return t;
    if (4 & e && "object" == typeof t && t && t.__esModule) return t;
    var n = Object.create(null);
    if (o.r(n), Object.defineProperty(n, "default", {
      enumerable: !0,
      value: t
    }), 2 & e && "string" != typeof t) for (var r in t) o.d(n, r, function (e) {
      return t[e];
    }.bind(null, r));
    return n;
  }, o.n = function (e) {
    var t = e && e.__esModule ? function () {
      return e.default;
    } : function () {
      return e;
    };
    return o.d(t, "a", t), t;
  }, o.o = function (e, t) {
    return Object.prototype.hasOwnProperty.call(e, t);
  }, o.p = "", o(o.s = 7);

  function o(e) {
    if (a[e]) return a[e].exports;
    var t = a[e] = {
      i: e,
      l: !1,
      exports: {}
    };
    return i[e].call(t.exports, t, t.exports, o), t.l = !0, t.exports;
  }

  var i, a;
});

/***/ }),

/***/ "./node_modules/body-scroll-lock/lib/bodyScrollLock.min.js":
/*!*****************************************************************!*\
  !*** ./node_modules/body-scroll-lock/lib/bodyScrollLock.min.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!function (e, o) {
  if (true) !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (o),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else { var t; }
}(this, function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: !0
  });
  var t = !1;

  if ("undefined" != typeof window) {
    var e = {
      get passive() {
        t = !0;
      }

    };
    window.addEventListener("testPassive", null, e), window.removeEventListener("testPassive", null, e);
  }

  function l(o) {
    return c.some(function (e) {
      return !(!e.options.allowTouchMove || !e.options.allowTouchMove(o));
    });
  }

  function d(e) {
    var o = e || window.event;
    return !!l(o.target) || 1 < o.touches.length || (o.preventDefault && o.preventDefault(), !1);
  }

  function n() {
    void 0 !== v && (document.body.style.paddingRight = v, v = void 0), void 0 !== s && (document.body.style.overflow = s, s = void 0);
  }

  var i = "undefined" != typeof window && window.navigator && window.navigator.platform && (/iP(ad|hone|od)/.test(window.navigator.platform) || "MacIntel" === window.navigator.platform && 1 < window.navigator.maxTouchPoints),
      c = [],
      a = !1,
      u = -1,
      s = void 0,
      v = void 0;
  exports.disableBodyScroll = function (r, e) {
    if (r) {
      if (!c.some(function (e) {
        return e.targetElement === r;
      })) {
        var o = {
          targetElement: r,
          options: e || {}
        };
        c = [].concat(function (e) {
          if (Array.isArray(e)) {
            for (var o = 0, t = Array(e.length); o < e.length; o++) t[o] = e[o];

            return t;
          }

          return Array.from(e);
        }(c), [o]), i ? (r.ontouchstart = function (e) {
          1 === e.targetTouches.length && (u = e.targetTouches[0].clientY);
        }, r.ontouchmove = function (e) {
          var o, t, n, i;
          1 === e.targetTouches.length && (t = r, i = (o = e).targetTouches[0].clientY - u, l(o.target) || (t && 0 === t.scrollTop && 0 < i || (n = t) && n.scrollHeight - n.scrollTop <= n.clientHeight && i < 0 ? d(o) : o.stopPropagation()));
        }, a || (document.addEventListener("touchmove", d, t ? {
          passive: !1
        } : void 0), a = !0)) : function (e) {
          if (void 0 === v) {
            var o = !!e && !0 === e.reserveScrollBarGap,
                t = window.innerWidth - document.documentElement.clientWidth;
            o && 0 < t && (v = document.body.style.paddingRight, document.body.style.paddingRight = t + "px");
          }

          void 0 === s && (s = document.body.style.overflow, document.body.style.overflow = "hidden");
        }(e);
      }
    } else console.error("disableBodyScroll unsuccessful - targetElement must be provided when calling disableBodyScroll on IOS devices.");
  }, exports.clearAllBodyScrollLocks = function () {
    i ? (c.forEach(function (e) {
      e.targetElement.ontouchstart = null, e.targetElement.ontouchmove = null;
    }), a && (document.removeEventListener("touchmove", d, t ? {
      passive: !1
    } : void 0), a = !1), u = -1) : n(), c = [];
  }, exports.enableBodyScroll = function (o) {
    o ? (c = c.filter(function (e) {
      return e.targetElement !== o;
    }), i ? (o.ontouchstart = null, o.ontouchmove = null, a && 0 === c.length && (document.removeEventListener("touchmove", d, t ? {
      passive: !1
    } : void 0), a = !1)) : c.length || n()) : console.error("enableBodyScroll unsuccessful - targetElement must be provided when calling enableBodyScroll on IOS devices.");
  };
});

/***/ }),

/***/ "./node_modules/copy-to-clipboard/index.js":
/*!*************************************************!*\
  !*** ./node_modules/copy-to-clipboard/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var deselectCurrent = __webpack_require__(/*! toggle-selection */ "./node_modules/toggle-selection/index.js");

var clipboardToIE11Formatting = {
  "text/plain": "Text",
  "text/html": "Url",
  "default": "Text"
};
var defaultMessage = "Copy to clipboard: #{key}, Enter";

function format(message) {
  var copyKey = (/mac os x/i.test(navigator.userAgent) ? "⌘" : "Ctrl") + "+C";
  return message.replace(/#{\s*key\s*}/g, copyKey);
}

function copy(text, options) {
  var debug,
      message,
      reselectPrevious,
      range,
      selection,
      mark,
      success = false;

  if (!options) {
    options = {};
  }

  debug = options.debug || false;

  try {
    reselectPrevious = deselectCurrent();
    range = document.createRange();
    selection = document.getSelection();
    mark = document.createElement("span");
    mark.textContent = text; // reset user styles for span element

    mark.style.all = "unset"; // prevents scrolling to the end of the page

    mark.style.position = "fixed";
    mark.style.top = 0;
    mark.style.clip = "rect(0, 0, 0, 0)"; // used to preserve spaces and line breaks

    mark.style.whiteSpace = "pre"; // do not inherit user-select (it may be `none`)

    mark.style.webkitUserSelect = "text";
    mark.style.MozUserSelect = "text";
    mark.style.msUserSelect = "text";
    mark.style.userSelect = "text";
    mark.addEventListener("copy", function (e) {
      e.stopPropagation();

      if (options.format) {
        e.preventDefault();

        if (typeof e.clipboardData === "undefined") {
          // IE 11
          debug && console.warn("unable to use e.clipboardData");
          debug && console.warn("trying IE specific stuff");
          window.clipboardData.clearData();
          var format = clipboardToIE11Formatting[options.format] || clipboardToIE11Formatting["default"];
          window.clipboardData.setData(format, text);
        } else {
          // all other browsers
          e.clipboardData.clearData();
          e.clipboardData.setData(options.format, text);
        }
      }

      if (options.onCopy) {
        e.preventDefault();
        options.onCopy(e.clipboardData);
      }
    });
    document.body.appendChild(mark);
    range.selectNodeContents(mark);
    selection.addRange(range);
    var successful = document.execCommand("copy");

    if (!successful) {
      throw new Error("copy command was unsuccessful");
    }

    success = true;
  } catch (err) {
    debug && console.error("unable to copy using execCommand: ", err);
    debug && console.warn("trying IE specific stuff");

    try {
      window.clipboardData.setData(options.format || "text", text);
      options.onCopy && options.onCopy(window.clipboardData);
      success = true;
    } catch (err) {
      debug && console.error("unable to copy using clipboardData: ", err);
      debug && console.error("falling back to prompt");
      message = format("message" in options ? options.message : defaultMessage);
      window.prompt(message, text);
    }
  } finally {
    if (selection) {
      if (typeof selection.removeRange == "function") {
        selection.removeRange(range);
      } else {
        selection.removeAllRanges();
      }
    }

    if (mark) {
      document.body.removeChild(mark);
    }

    reselectPrevious();
  }

  return success;
}

module.exports = copy;

/***/ }),

/***/ "./node_modules/css-box-model/dist/css-box-model.cjs.js":
/*!**************************************************************!*\
  !*** ./node_modules/css-box-model/dist/css-box-model.cjs.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopDefault(ex) {
  return ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex;
}

var invariant = _interopDefault(__webpack_require__(/*! tiny-invariant */ "./node_modules/tiny-invariant/dist/tiny-invariant.cjs.js"));

var getRect = function getRect(_ref) {
  var top = _ref.top,
      right = _ref.right,
      bottom = _ref.bottom,
      left = _ref.left;
  var width = right - left;
  var height = bottom - top;
  var rect = {
    top: top,
    right: right,
    bottom: bottom,
    left: left,
    width: width,
    height: height,
    x: left,
    y: top,
    center: {
      x: (right + left) / 2,
      y: (bottom + top) / 2
    }
  };
  return rect;
};

var expand = function expand(target, expandBy) {
  return {
    top: target.top - expandBy.top,
    left: target.left - expandBy.left,
    bottom: target.bottom + expandBy.bottom,
    right: target.right + expandBy.right
  };
};

var shrink = function shrink(target, shrinkBy) {
  return {
    top: target.top + shrinkBy.top,
    left: target.left + shrinkBy.left,
    bottom: target.bottom - shrinkBy.bottom,
    right: target.right - shrinkBy.right
  };
};

var shift = function shift(target, shiftBy) {
  return {
    top: target.top + shiftBy.y,
    left: target.left + shiftBy.x,
    bottom: target.bottom + shiftBy.y,
    right: target.right + shiftBy.x
  };
};

var noSpacing = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0
};

var createBox = function createBox(_ref2) {
  var borderBox = _ref2.borderBox,
      _ref2$margin = _ref2.margin,
      margin = _ref2$margin === void 0 ? noSpacing : _ref2$margin,
      _ref2$border = _ref2.border,
      border = _ref2$border === void 0 ? noSpacing : _ref2$border,
      _ref2$padding = _ref2.padding,
      padding = _ref2$padding === void 0 ? noSpacing : _ref2$padding;
  var marginBox = getRect(expand(borderBox, margin));
  var paddingBox = getRect(shrink(borderBox, border));
  var contentBox = getRect(shrink(paddingBox, padding));
  return {
    marginBox: marginBox,
    borderBox: getRect(borderBox),
    paddingBox: paddingBox,
    contentBox: contentBox,
    margin: margin,
    border: border,
    padding: padding
  };
};

var parse = function parse(raw) {
  var value = raw.slice(0, -2);
  var suffix = raw.slice(-2);

  if (suffix !== 'px') {
    return 0;
  }

  var result = Number(value);
  !!isNaN(result) ?  true ? invariant(false, "Could not parse value [raw: " + raw + ", without suffix: " + value + "]") : undefined : void 0;
  return result;
};

var getWindowScroll = function getWindowScroll() {
  return {
    x: window.pageXOffset,
    y: window.pageYOffset
  };
};

var offset = function offset(original, change) {
  var borderBox = original.borderBox,
      border = original.border,
      margin = original.margin,
      padding = original.padding;
  var shifted = shift(borderBox, change);
  return createBox({
    borderBox: shifted,
    border: border,
    margin: margin,
    padding: padding
  });
};

var withScroll = function withScroll(original, scroll) {
  if (scroll === void 0) {
    scroll = getWindowScroll();
  }

  return offset(original, scroll);
};

var calculateBox = function calculateBox(borderBox, styles) {
  var margin = {
    top: parse(styles.marginTop),
    right: parse(styles.marginRight),
    bottom: parse(styles.marginBottom),
    left: parse(styles.marginLeft)
  };
  var padding = {
    top: parse(styles.paddingTop),
    right: parse(styles.paddingRight),
    bottom: parse(styles.paddingBottom),
    left: parse(styles.paddingLeft)
  };
  var border = {
    top: parse(styles.borderTopWidth),
    right: parse(styles.borderRightWidth),
    bottom: parse(styles.borderBottomWidth),
    left: parse(styles.borderLeftWidth)
  };
  return createBox({
    borderBox: borderBox,
    margin: margin,
    padding: padding,
    border: border
  });
};

var getBox = function getBox(el) {
  var borderBox = el.getBoundingClientRect();
  var styles = window.getComputedStyle(el);
  return calculateBox(borderBox, styles);
};

exports.calculateBox = calculateBox;
exports.createBox = createBox;
exports.expand = expand;
exports.getBox = getBox;
exports.getRect = getRect;
exports.offset = offset;
exports.shrink = shrink;
exports.withScroll = withScroll;

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./domains/wpPluginsPage/src/style.css":
/*!************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-3-1!./node_modules/postcss-loader/src??postcss!./domains/wpPluginsPage/src/style.css ***!
  \************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.i, "/** styles for plugin upsells **/\n.ee-upsell-container {\n    padding: 20px;\n}\n\n.ee-upsell-inner-container {\n    float: left;\n    display: inline-block;\n    margin-right: 10px;\n}", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./node_modules/resolve-url-loader/index.js?!./node_modules/sass-loader/dist/cjs.js?!./domains/wpPluginsPage/src/exitSurvey/styles.scss":
/*!**************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-5-1!./node_modules/postcss-loader/src??postcss!./node_modules/resolve-url-loader??ref--6-oneOf-5-3!./node_modules/sass-loader/dist/cjs.js??ref--6-oneOf-5-4!./domains/wpPluginsPage/src/exitSurvey/styles.scss ***!
  \**************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.i, ".ee-exit-modal__body {\n  min-width: 50%;\n  min-height: 80%;\n}\n.ee-exit-modal__body iframe {\n  min-height: 40rem;\n}", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names

module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/deepmerge/dist/cjs.js":
/*!********************************************!*\
  !*** ./node_modules/deepmerge/dist/cjs.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isMergeableObject = function isMergeableObject(value) {
  return isNonNullObject(value) && !isSpecial(value);
};

function isNonNullObject(value) {
  return !!value && typeof value === 'object';
}

function isSpecial(value) {
  var stringValue = Object.prototype.toString.call(value);
  return stringValue === '[object RegExp]' || stringValue === '[object Date]' || isReactElement(value);
} // see https://github.com/facebook/react/blob/b5ac963fb791d1298e7f396236383bc955f916c1/src/isomorphic/classic/element/ReactElement.js#L21-L25


var canUseSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for('react.element') : 0xeac7;

function isReactElement(value) {
  return value.$$typeof === REACT_ELEMENT_TYPE;
}

function emptyTarget(val) {
  return Array.isArray(val) ? [] : {};
}

function cloneUnlessOtherwiseSpecified(value, options) {
  return options.clone !== false && options.isMergeableObject(value) ? deepmerge(emptyTarget(value), value, options) : value;
}

function defaultArrayMerge(target, source, options) {
  return target.concat(source).map(function (element) {
    return cloneUnlessOtherwiseSpecified(element, options);
  });
}

function getMergeFunction(key, options) {
  if (!options.customMerge) {
    return deepmerge;
  }

  var customMerge = options.customMerge(key);
  return typeof customMerge === 'function' ? customMerge : deepmerge;
}

function getEnumerableOwnPropertySymbols(target) {
  return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(target).filter(function (symbol) {
    return target.propertyIsEnumerable(symbol);
  }) : [];
}

function getKeys(target) {
  return Object.keys(target).concat(getEnumerableOwnPropertySymbols(target));
}

function propertyIsOnObject(object, property) {
  try {
    return property in object;
  } catch (_) {
    return false;
  }
} // Protects from prototype poisoning and unexpected merging up the prototype chain.


function propertyIsUnsafe(target, key) {
  return propertyIsOnObject(target, key) // Properties are safe to merge if they don't exist in the target yet,
  && !(Object.hasOwnProperty.call(target, key) // unsafe if they exist up the prototype chain,
  && Object.propertyIsEnumerable.call(target, key)); // and also unsafe if they're nonenumerable.
}

function mergeObject(target, source, options) {
  var destination = {};

  if (options.isMergeableObject(target)) {
    getKeys(target).forEach(function (key) {
      destination[key] = cloneUnlessOtherwiseSpecified(target[key], options);
    });
  }

  getKeys(source).forEach(function (key) {
    if (propertyIsUnsafe(target, key)) {
      return;
    }

    if (propertyIsOnObject(target, key) && options.isMergeableObject(source[key])) {
      destination[key] = getMergeFunction(key, options)(target[key], source[key], options);
    } else {
      destination[key] = cloneUnlessOtherwiseSpecified(source[key], options);
    }
  });
  return destination;
}

function deepmerge(target, source, options) {
  options = options || {};
  options.arrayMerge = options.arrayMerge || defaultArrayMerge;
  options.isMergeableObject = options.isMergeableObject || isMergeableObject; // cloneUnlessOtherwiseSpecified is added to `options` so that custom arrayMerge()
  // implementations can use it. The caller may not replace it.

  options.cloneUnlessOtherwiseSpecified = cloneUnlessOtherwiseSpecified;
  var sourceIsArray = Array.isArray(source);
  var targetIsArray = Array.isArray(target);
  var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;

  if (!sourceAndTargetTypesMatch) {
    return cloneUnlessOtherwiseSpecified(source, options);
  } else if (sourceIsArray) {
    return options.arrayMerge(target, source, options);
  } else {
    return mergeObject(target, source, options);
  }
}

deepmerge.all = function deepmergeAll(array, options) {
  if (!Array.isArray(array)) {
    throw new Error('first argument should be an array');
  }

  return array.reduce(function (prev, next) {
    return deepmerge(prev, next, options);
  }, {});
};

var deepmerge_1 = deepmerge;
module.exports = deepmerge_1;

/***/ }),

/***/ "./node_modules/memoize-one/dist/memoize-one.cjs.js":
/*!**********************************************************!*\
  !*** ./node_modules/memoize-one/dist/memoize-one.cjs.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function areInputsEqual(newInputs, lastInputs) {
  if (newInputs.length !== lastInputs.length) {
    return false;
  }

  for (var i = 0; i < newInputs.length; i++) {
    if (newInputs[i] !== lastInputs[i]) {
      return false;
    }
  }

  return true;
}

function memoizeOne(resultFn, isEqual) {
  if (isEqual === void 0) {
    isEqual = areInputsEqual;
  }

  var lastThis;
  var lastArgs = [];
  var lastResult;
  var calledOnce = false;

  function memoized() {
    var newArgs = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      newArgs[_i] = arguments[_i];
    }

    if (calledOnce && lastThis === this && isEqual(newArgs, lastArgs)) {
      return lastResult;
    }

    lastResult = resultFn.apply(this, newArgs);
    calledOnce = true;
    lastThis = this;
    lastArgs = newArgs;
    return lastResult;
  }

  return memoized;
}

module.exports = memoizeOne;

/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {}; // cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}

function defaultClearTimeout() {
  throw new Error('clearTimeout has not been defined');
}

(function () {
  try {
    if (typeof setTimeout === 'function') {
      cachedSetTimeout = setTimeout;
    } else {
      cachedSetTimeout = defaultSetTimout;
    }
  } catch (e) {
    cachedSetTimeout = defaultSetTimout;
  }

  try {
    if (typeof clearTimeout === 'function') {
      cachedClearTimeout = clearTimeout;
    } else {
      cachedClearTimeout = defaultClearTimeout;
    }
  } catch (e) {
    cachedClearTimeout = defaultClearTimeout;
  }
})();

function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    //normal enviroments in sane situations
    return setTimeout(fun, 0);
  } // if setTimeout wasn't available but was latter defined


  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}

function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  } // if clearTimeout wasn't available but was latter defined


  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
      return cachedClearTimeout.call(this, marker);
    }
  }
}

var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }

  draining = false;

  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }

  if (queue.length) {
    drainQueue();
  }
}

function drainQueue() {
  if (draining) {
    return;
  }

  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;

  while (len) {
    currentQueue = queue;
    queue = [];

    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }

    queueIndex = -1;
    len = queue.length;
  }

  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}

process.nextTick = function (fun) {
  var args = new Array(arguments.length - 1);

  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }

  queue.push(new Item(fun, args));

  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
}; // v8 likes predictible objects


function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}

Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues

process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
  return [];
};

process.binding = function (name) {
  throw new Error('process.binding is not supported');
};

process.cwd = function () {
  return '/';
};

process.chdir = function (dir) {
  throw new Error('process.chdir is not supported');
};

process.umask = function () {
  return 0;
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : undefined;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/tiny-invariant/dist/tiny-invariant.cjs.js":
/*!****************************************************************!*\
  !*** ./node_modules/tiny-invariant/dist/tiny-invariant.cjs.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var isProduction = "development" === 'production';
var prefix = 'Invariant failed';

function invariant(condition, message) {
  if (condition) {
    return;
  }

  if (isProduction) {
    throw new Error(prefix);
  }

  throw new Error(prefix + ": " + (message || ''));
}

exports.default = invariant;

/***/ }),

/***/ "./node_modules/toggle-selection/index.js":
/*!************************************************!*\
  !*** ./node_modules/toggle-selection/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function () {
  var selection = document.getSelection();

  if (!selection.rangeCount) {
    return function () {};
  }

  var active = document.activeElement;
  var ranges = [];

  for (var i = 0; i < selection.rangeCount; i++) {
    ranges.push(selection.getRangeAt(i));
  }

  switch (active.tagName.toUpperCase()) {
    // .toUpperCase handles XHTML
    case 'INPUT':
    case 'TEXTAREA':
      active.blur();
      break;

    default:
      active = null;
      break;
  }

  selection.removeAllRanges();
  return function () {
    selection.type === 'Caret' && selection.removeAllRanges();

    if (!selection.rangeCount) {
      ranges.forEach(function (range) {
        selection.addRange(range);
      });
    }

    active && active.focus();
  };
};

/***/ }),

/***/ "./node_modules/warning/warning.js":
/*!*****************************************!*\
  !*** ./node_modules/warning/warning.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var __DEV__ = "development" !== 'production';

var warning = function () {};

if (__DEV__) {
  var printWarning = function printWarning(format, args) {
    var len = arguments.length;
    args = new Array(len > 1 ? len - 1 : 0);

    for (var key = 1; key < len; key++) {
      args[key - 1] = arguments[key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });

    if (typeof console !== 'undefined') {
      console.error(message);
    }

    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  warning = function (condition, format, args) {
    var len = arguments.length;
    args = new Array(len > 2 ? len - 2 : 0);

    for (var key = 2; key < len; key++) {
      args[key - 2] = arguments[key];
    }

    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }

    if (!condition) {
      printWarning.apply(null, [format].concat(args));
    }
  };
}

module.exports = warning;

/***/ }),

/***/ "./packages/utils/src/dom/canUseDOM.ts":
/*!*********************************************!*\
  !*** ./packages/utils/src/dom/canUseDOM.ts ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
/* harmony default export */ __webpack_exports__["default"] = (canUseDOM);

/***/ }),

/***/ "./packages/utils/src/dom/renderDomElement.ts":
/*!****************************************************!*\
  !*** ./packages/utils/src/dom/renderDomElement.ts ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-dom */ "react-dom");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _canUseDOM__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./canUseDOM */ "./packages/utils/src/dom/canUseDOM.ts");



/**
 * utility for rendering a DOM element
 *
 * @param appendToTarget whether to render element after the targeted DOM element (will prepend if false)
 * @param containerID HTML ID of the container we'll render the DOM element into
 * @param containerClassName HTML class(es) of the container we'll render the DOM element into
 * @param createContainer whether to create the container if it does not already exist
 * @param domElementToRender the DOM element to be rendered
 * @param targetElementID the DOM element we'll attach the render container to
 * @param useDocumentBody whether to use the document.body as the targeted DOM element
 */
const renderDomElement = ({
  appendToTarget = true,
  containerID,
  containerClassName,
  createContainer = true,
  domElementToRender,
  targetElementID,
  useDocumentBody = true
}) => {
  // can't use the DOM if it doesn't exist! <taps forehead>
  if (!_canUseDOM__WEBPACK_IMPORTED_MODULE_1__["default"]) {
    return;
  } // first let's try to find what we are going to attach our container to


  let targetElement;
  targetElement = targetElementID ? document.getElementById(targetElementID) : null; // if element wasn't found but we can use the document.body

  if (targetElement === null && useDocumentBody && document.body !== null) {
    targetElement = document.body;
  } // can't use a DOM Element if it doesn't exist! <taps forehead>


  if (targetElement === null) {
    return;
  } // now let's see if the container already exists


  let container;
  container = containerID ? document.getElementById(containerID) : null; // if not but we should create it

  if (container === null && createContainer) {
    container = document.createElement('div');
    container.id = containerID;

    if (containerClassName) {
      container.className = containerClassName;
    }
  } // can't do anything if nothing exists! <taps forehead>


  if (container === null) {
    return;
  } // now add container before or after targeted DOM element


  if (appendToTarget) {
    targetElement.append(container);
  } else {
    targetElement.prepend(container);
  } // and render our new DOM element into it


  Object(react_dom__WEBPACK_IMPORTED_MODULE_0__["render"])(domElementToRender, container);
};

/* harmony default export */ __webpack_exports__["default"] = (renderDomElement);

/***/ }),

/***/ "./types/global.ts":
/*!*************************!*\
  !*** ./types/global.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./types/index.ts":
/*!************************!*\
  !*** ./types/index.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _global__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./global */ "./types/global.ts");
/* harmony import */ var _global__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_global__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _global__WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _global__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ 24:
/*!**************************************************!*\
  !*** multi ./domains/wpPluginsPage/src/index.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /var/www/dev.test/wp-content/plugins/barista/domains/wpPluginsPage/src/index.ts */"./domains/wpPluginsPage/src/index.ts");


/***/ }),

/***/ "@eventespresso/i18n":
/*!**************************************************!*\
  !*** external {"this":["eventespresso","i18n"]} ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = this["eventespresso"]["i18n"]; }());

/***/ }),

/***/ "@wordpress/components":
/*!*********************************************!*\
  !*** external {"this":["wp","components"]} ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = this["wp"]["components"]; }());

/***/ }),

/***/ "jquery":
/*!**********************************!*\
  !*** external {"this":"jQuery"} ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = this["jQuery"]; }());

/***/ }),

/***/ "react":
/*!*********************************!*\
  !*** external {"this":"React"} ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = this["React"]; }());

/***/ }),

/***/ "react-dom":
/*!************************************!*\
  !*** external {"this":"ReactDOM"} ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = this["ReactDOM"]; }());

/***/ })

/******/ });
//# sourceMappingURL=wpPluginsPage.bundle.js.map