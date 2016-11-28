/*!
 * Parsleyjs
 * Guillaume Potier - <guillaume@wisembly.com>
 * Version 2.0.0 - built Sat Apr 19 2014 17:31:23
 * MIT Licensed
 *
 */
 window.ParsleyConfig = {
	errorsWrapper: '<div class="parsley_error"></div>',
	errorTemplate: '<div></div>'
};
! function (a) {
	var b = {
			attr: function (a, b, c) {
				var d, e = {},
					f = new RegExp("^" + b, "i");
				if ("undefined" == typeof a || "undefined" == typeof a[0]) return {};
				for (var g in a[0].attributes)
					if (d = a[0].attributes[g], "undefined" != typeof d && null !== d && d.specified && f.test(d.name)) {
						if ("undefined" != typeof c && new RegExp(c + "$", "i").test(d.name)) return !0;
						e[this.camelize(d.name.replace(b, ""))] = this.deserializeValue(d.value)
					}
				return "undefined" == typeof c ? e : !1
			},
			setAttr: function (a, b, c, d) {
				a[0].setAttribute(this.dasherize(b + c), String(d))
			},
			get: function (a, b) {
				for (var c = 0, d = (b || "").split("."); this.isObject(a) || this.isArray(a);)
					if (a = a[d[c++]], c === d.length) return a;
				return void 0
			},
			hash: function (a) {
				return String(Math.random()).substring(2, a ? a + 2 : 9)
			},
			isArray: function (a) {
				return "[object Array]" === Object.prototype.toString.call(a)
			},
			isObject: function (a) {
				return a === Object(a)
			},
			deserializeValue: function (b) {
				var c;
				try {
					return b ? "true" == b || ("false" == b ? !1 : "null" == b ? null : isNaN(c = Number(b)) ? /^[\[\{]/.test(b) ? a.parseJSON(b) : b : c) : b
				} catch (d) {
					return b
				}
			},
			camelize: function (a) {
				return a.replace(/-+(.)?/g, function (a, b) {
					return b ? b.toUpperCase() : ""
				})
			},
			dasherize: function (a) {
				return a.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase()
			}
		},
		c = {
			namespace: "data-parsley-",
			inputs: "input, textarea, select",
			excluded: "input[type=button], input[type=submit], input[type=reset], input[type=hidden]",
			priorityEnabled: !0,
			uiEnabled: !0,
			validationThreshold: 3,
			focus: "first",
			trigger: !1,
			errorClass: "parsley-error",
			successClass: "parsley-success",
			classHandler: function () {},
			errorsContainer: function () {},
			errorsWrapper: '<ul class="parsley-errors-list"></ul>',
			errorTemplate: "<li></li>"
		},
		d = function () {};
	d.prototype = {
		asyncSupport: !1,
		actualizeOptions: function () {
			return this.options = this.OptionsFactory.get(this), this
		},
		validateThroughValidator: function (a, b, c) {
			return window.ParsleyValidator.validate.apply(window.ParsleyValidator, [a, b, c])
		},
		subscribe: function (b, c) {
			return a.listenTo(this, b.toLowerCase(), c), this
		},
		unsubscribe: function (b) {
			return a.unsubscribeTo(this, b.toLowerCase()), this
		},
		reset: function () {
			if ("ParsleyForm" !== this.__class__) return a.emit("parsley:field:reset", this);
			for (var b = 0; b < this.fields.length; b++) a.emit("parsley:field:reset", this.fields[b]);
			a.emit("parsley:form:reset", this)
		},
		destroy: function () {
			if ("ParsleyForm" !== this.__class__) return this.$element.removeData("Parsley"), this.$element.removeData("ParsleyFieldMultiple"), void a.emit("parsley:field:destroy", this);
			for (var b = 0; b < this.fields.length; b++) this.fields[b].destroy();
			this.$element.removeData("Parsley"), a.emit("parsley:form:destroy", this)
		}
	},
	function (a) {
		var b = function (a) {
			return this.__class__ = "Validator", this.__version__ = "0.5.8", this.options = a || {}, this.bindingKey = this.options.bindingKey || "_validatorjsConstraint", this
		};
		b.prototype = {
			constructor: b,
			validate: function (a, b, c) {
				if ("string" != typeof a && "object" != typeof a) throw new Error("You must validate an object or a string");
				return "string" == typeof a || g(a) ? this._validateString(a, b, c) : this.isBinded(a) ? this._validateBindedObject(a, b) : this._validateObject(a, b, c)
			},
			bind: function (a, b) {
				if ("object" != typeof a) throw new Error("Must bind a Constraint to an object");
				return a[this.bindingKey] = new c(b), this
			},
			unbind: function (a) {
				return "undefined" == typeof a._validatorjsConstraint ? this : (delete a[this.bindingKey], this)
			},
			isBinded: function (a) {
				return "undefined" != typeof a[this.bindingKey]
			},
			getBinded: function (a) {
				return this.isBinded(a) ? a[this.bindingKey] : null
			},
			_validateString: function (a, b, c) {
				var f, h = [];
				g(b) || (b = [b]);
				for (var i = 0; i < b.length; i++) {
					if (!(b[i] instanceof e)) throw new Error("You must give an Assert or an Asserts array to validate a string");
					f = b[i].check(a, c), f instanceof d && h.push(f)
				}
				return h.length ? h : !0
			},
			_validateObject: function (a, b, d) {
				if ("object" != typeof b) throw new Error("You must give a constraint to validate an object");
				return b instanceof c ? b.check(a, d) : new c(b).check(a, d)
			},
			_validateBindedObject: function (a, b) {
				return a[this.bindingKey].check(a, b)
			}
		}, b.errorCode = {
			must_be_a_string: "must_be_a_string",
			must_be_an_array: "must_be_an_array",
			must_be_a_number: "must_be_a_number",
			must_be_a_string_or_array: "must_be_a_string_or_array"
		};
		var c = function (a, b) {
			if (this.__class__ = "Constraint", this.options = b || {}, this.nodes = {}, a) try {
				this._bootstrap(a)
			} catch (c) {
				throw new Error("Should give a valid mapping object to Constraint", c, a)
			}
			return this
		};
		c.prototype = {
			constructor: c,
			check: function (a, b) {
				var c, d = {};
				for (var h in this.options.strict ? this.nodes : a)
					if (this.options.strict ? this.has(h, a) : this.has(h)) c = this._check(h, a[h], b), (g(c) && c.length > 0 || !g(c) && !f(c)) && (d[h] = c);
					else if (this.options.strict) try {
					(new e).HaveProperty(h).validate(a)
				} catch (i) {
					d[h] = i
				}
				return f(d) ? !0 : d
			},
			add: function (a, b) {
				if (b instanceof e || g(b) && b[0] instanceof e) return this.nodes[a] = b, this;
				if ("object" == typeof b && !g(b)) return this.nodes[a] = b instanceof c ? b : new c(b), this;
				throw new Error("Should give an Assert, an Asserts array, a Constraint", b)
			},
			has: function (a, b) {
				return b = "undefined" != typeof b ? b : this.nodes, "undefined" != typeof b[a]
			},
			get: function (a, b) {
				return this.has(a) ? this.nodes[a] : b || null
			},
			remove: function (a) {
				var b = [];
				for (var c in this.nodes) c !== a && (b[c] = this.nodes[c]);
				return this.nodes = b, this
			},
			_bootstrap: function (a) {
				if (a instanceof c) return this.nodes = a.nodes;
				for (var b in a) this.add(b, a[b])
			},
			_check: function (a, b, d) {
				if (this.nodes[a] instanceof e) return this._checkAsserts(b, [this.nodes[a]], d);
				if (g(this.nodes[a])) return this._checkAsserts(b, this.nodes[a], d);
				if (this.nodes[a] instanceof c) return this.nodes[a].check(b, d);
				throw new Error("Invalid node", this.nodes[a])
			},
			_checkAsserts: function (a, b, c) {
				for (var d, e = [], f = 0; f < b.length; f++) d = b[f].check(a, c), "undefined" != typeof d && !0 !== d && e.push(d);
				return e
			}
		};
		var d = function (a, b, c) {
			if (this.__class__ = "Violation", !(a instanceof e)) throw new Error("Should give an assertion implementing the Assert interface");
			this.assert = a, this.value = b, "undefined" != typeof c && (this.violation = c)
		};
		d.prototype = {
			show: function () {
				var a = {
					assert: this.assert.__class__,
					value: this.value
				};
				return this.violation && (a.violation = this.violation), a
			},
			__toString: function () {
				return "undefined" != typeof this.violation && (this.violation = '", ' + this.getViolation().constraint + " expected was " + this.getViolation().expected), this.assert.__class__ + ' assert failed for "' + this.value + this.violation || ""
			},
			getViolation: function () {
				var a, b;
				for (a in this.violation) b = this.violation[a];
				return {
					constraint: a,
					expected: b
				}
			}
		};
		var e = function (a) {
			return this.__class__ = "Assert", this.__parentClass__ = this.__class__, this.groups = [], "undefined" != typeof a && this.addGroup(a), this
		};
		e.prototype = {
			construct: e,
			check: function (a, b) {
				if (!(b && !this.hasGroup(b) || !b && this.hasGroups())) try {
					return this.validate(a, b)
				} catch (c) {
					return c
				}
			},
			hasGroup: function (a) {
				return g(a) ? this.hasOneOf(a) : "Any" === a ? !0 : this.hasGroups() ? -1 !== this.groups.indexOf(a) : "Default" === a
			},
			hasOneOf: function (a) {
				for (var b = 0; b < a.length; b++)
					if (this.hasGroup(a[b])) return !0;
				return !1
			},
			hasGroups: function () {
				return this.groups.length > 0
			},
			addGroup: function (a) {
				return g(a) ? this.addGroups(a) : (this.hasGroup(a) || this.groups.push(a), this)
			},
			removeGroup: function (a) {
				for (var b = [], c = 0; c < this.groups.length; c++) a !== this.groups[c] && b.push(this.groups[c]);
				return this.groups = b, this
			},
			addGroups: function (a) {
				for (var b = 0; b < a.length; b++) this.addGroup(a[b]);
				return this
			},
			HaveProperty: function (a) {
				return this.__class__ = "HaveProperty", this.node = a, this.validate = function (a) {
					if ("undefined" == typeof a[this.node]) throw new d(this, a, {
						value: this.node
					});
					return !0
				}, this
			},
			Blank: function () {
				return this.__class__ = "Blank", this.validate = function (a) {
					if ("string" != typeof a) throw new d(this, a, {
						value: b.errorCode.must_be_a_string
					});
					if ("" !== a.replace(/^\s+/g, "").replace(/\s+$/g, "")) throw new d(this, a);
					return !0
				}, this
			},
			Callback: function (a) {
				if (this.__class__ = "Callback", this.arguments = Array.prototype.slice.call(arguments), 1 === this.arguments.length ? this.arguments = [] : this.arguments.splice(0, 1), "function" != typeof a) throw new Error("Callback must be instanciated with a function");
				return this.fn = a, this.validate = function (a) {
					var b = this.fn.apply(this, [a].concat(this.arguments));
					if (!0 !== b) throw new d(this, a, {
						result: b
					});
					return !0
				}, this
			},
			Choice: function (a) {
				if (this.__class__ = "Choice", !g(a) && "function" != typeof a) throw new Error("Choice must be instanciated with an array or a function");
				return this.list = a, this.validate = function (a) {
					for (var b = "function" == typeof this.list ? this.list() : this.list, c = 0; c < b.length; c++)
						if (a === b[c]) return !0;
					throw new d(this, a, {
						choices: b
					})
				}, this
			},
			Collection: function (a) {
				return this.__class__ = "Collection", this.constraint = "undefined" != typeof a ? new c(a) : !1, this.validate = function (a, c) {
					var e, h = new b,
						i = 0,
						j = {},
						k = this.groups.length ? this.groups : c;
					if (!g(a)) throw new d(this, array, {
						value: b.errorCode.must_be_an_array
					});
					for (var l = 0; l < a.length; l++) e = this.constraint ? h.validate(a[l], this.constraint, k) : h.validate(a[l], k), f(e) || (j[i] = e), i++;
					return f(j) ? !0 : j
				}, this
			},
			Count: function (a) {
				return this.__class__ = "Count", this.count = a, this.validate = function (a) {
					if (!g(a)) throw new d(this, a, {
						value: b.errorCode.must_be_an_array
					});
					var c = "function" == typeof this.count ? this.count(a) : this.count;
					if (isNaN(Number(c))) throw new Error("Count must be a valid interger", c);
					if (c !== a.length) throw new d(this, a, {
						count: c
					});
					return !0
				}, this
			},
			Email: function () {
				return this.__class__ = "Email", this.validate = function (a) {
					var c = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
					if ("string" != typeof a) throw new d(this, a, {
						value: b.errorCode.must_be_a_string
					});
					if (!c.test(a)) throw new d(this, a);
					return !0
				}, this
			},
			Eql: function (a) {
				if (this.__class__ = "Eql", "undefined" == typeof a) throw new Error("Equal must be instanciated with an Array or an Object");
				return this.eql = a, this.validate = function (a) {
					var b = "function" == typeof this.eql ? this.eql(a) : this.eql;
					if (!h.eql(b, a)) throw new d(this, a, {
						eql: b
					});
					return !0
				}, this
			},
			EqualTo: function (a) {
				if (this.__class__ = "EqualTo", "undefined" == typeof a) throw new Error("EqualTo must be instanciated with a value or a function");
				return this.reference = a, this.validate = function (a) {
					var b = "function" == typeof this.reference ? this.reference(a) : this.reference;
					if (b !== a) throw new d(this, a, {
						value: b
					});
					return !0
				}, this
			},
			GreaterThan: function (a) {
				if (this.__class__ = "GreaterThan", "undefined" == typeof a) throw new Error("Should give a threshold value");
				return this.threshold = a, this.validate = function (a) {
					if ("" === a || isNaN(Number(a))) throw new d(this, a, {
						value: b.errorCode.must_be_a_number
					});
					if (this.threshold >= a) throw new d(this, a, {
						threshold: this.threshold
					});
					return !0
				}, this
			},
			GreaterThanOrEqual: function (a) {
				if (this.__class__ = "GreaterThanOrEqual", "undefined" == typeof a) throw new Error("Should give a threshold value");
				return this.threshold = a, this.validate = function (a) {
					if ("" === a || isNaN(Number(a))) throw new d(this, a, {
						value: b.errorCode.must_be_a_number
					});
					if (this.threshold > a) throw new d(this, a, {
						threshold: this.threshold
					});
					return !0
				}, this
			},
			InstanceOf: function (a) {
				if (this.__class__ = "InstanceOf", "undefined" == typeof a) throw new Error("InstanceOf must be instanciated with a value");
				return this.classRef = a, this.validate = function (a) {
					if (!0 != a instanceof this.classRef) throw new d(this, a, {
						classRef: this.classRef
					});
					return !0
				}, this
			},
			IPv4: function () {
				return this.__class__ = "IPv4", this.validate = function (a) {
					var c = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
					if ("string" != typeof a) throw new d(this, a, {
						value: b.errorCode.must_be_a_string
					});
					if (!c.test(a)) throw new d(this, a);
					return !0
				}, this
			},
			Length: function (a) {
				if (this.__class__ = "Length", !a.min && !a.max) throw new Error("Lenth assert must be instanciated with a { min: x, max: y } object");
				return this.min = a.min, this.max = a.max, this.validate = function (a) {
					if ("string" != typeof a && !g(a)) throw new d(this, a, {
						value: b.errorCode.must_be_a_string_or_array
					});
					if ("undefined" != typeof this.min && this.min === this.max && a.length !== this.min) throw new d(this, a, {
						min: this.min,
						max: this.max
					});
					if ("undefined" != typeof this.max && a.length > this.max) throw new d(this, a, {
						max: this.max
					});
					if ("undefined" != typeof this.min && a.length < this.min) throw new d(this, a, {
						min: this.min
					});
					return !0
				}, this
			},
			LessThan: function (a) {
				if (this.__class__ = "LessThan", "undefined" == typeof a) throw new Error("Should give a threshold value");
				return this.threshold = a, this.validate = function (a) {
					if ("" === a || isNaN(Number(a))) throw new d(this, a, {
						value: b.errorCode.must_be_a_number
					});
					if (this.threshold <= a) throw new d(this, a, {
						threshold: this.threshold
					});
					return !0
				}, this
			},
			LessThanOrEqual: function (a) {
				if (this.__class__ = "LessThanOrEqual", "undefined" == typeof a) throw new Error("Should give a threshold value");
				return this.threshold = a, this.validate = function (a) {
					if ("" === a || isNaN(Number(a))) throw new d(this, a, {
						value: b.errorCode.must_be_a_number
					});
					if (this.threshold < a) throw new d(this, a, {
						threshold: this.threshold
					});
					return !0
				}, this
			},
			Mac: function () {
				return this.__class__ = "Mac", this.validate = function (a) {
					var c = /^(?:[0-9A-F]{2}:){5}[0-9A-F]{2}$/i;
					if ("string" != typeof a) throw new d(this, a, {
						value: b.errorCode.must_be_a_string
					});
					if (!c.test(a)) throw new d(this, a);
					return !0
				}, this
			},
			NotNull: function () {
				return this.__class__ = "NotNull", this.validate = function (a) {
					if (null === a || "undefined" == typeof a) throw new d(this, a);
					return !0
				}, this
			},
			NotBlank: function () {
				return this.__class__ = "NotBlank", this.validate = function (a) {
					if ("string" != typeof a) throw new d(this, a, {
						value: b.errorCode.must_be_a_string
					});
					if ("" === a.replace(/^\s+/g, "").replace(/\s+$/g, "")) throw new d(this, a);
					return !0
				}, this
			},
			Null: function () {
				return this.__class__ = "Null", this.validate = function (a) {
					if (null !== a) throw new d(this, a);
					return !0
				}, this
			},
			Range: function (a, b) {
				if (this.__class__ = "Range", "undefined" == typeof a || "undefined" == typeof b) throw new Error("Range assert expects min and max values");
				return this.min = a, this.max = b, this.validate = function (a) {
					try {
						return "string" == typeof a && isNaN(Number(a)) || g(a) ? (new e).Length({
							min: this.min,
							max: this.max
						}).validate(a) : (new e).GreaterThanOrEqual(this.min).validate(a) && (new e).LessThanOrEqual(this.max).validate(a), !0
					} catch (b) {
						throw new d(this, a, b.violation)
					}
					return !0
				}, this
			},
			Regexp: function (a, c) {
				if (this.__class__ = "Regexp", "undefined" == typeof a) throw new Error("You must give a regexp");
				return this.regexp = a, this.flag = c || "", this.validate = function (a) {
					if ("string" != typeof a) throw new d(this, a, {
						value: b.errorCode.must_be_a_string
					});
					if (!new RegExp(this.regexp, this.flag).test(a)) throw new d(this, a, {
						regexp: this.regexp,
						flag: this.flag
					});
					return !0
				}, this
			},
			Required: function () {
				return this.__class__ = "Required", this.validate = function (a) {
					if ("undefined" == typeof a) throw new d(this, a);
					try {
						"string" == typeof a ? (new e).NotNull().validate(a) && (new e).NotBlank().validate(a) : !0 === g(a) && (new e).Length({
							min: 1
						}).validate(a)
					} catch (b) {
						throw new d(this, a)
					}
					return !0
				}, this
			},
			Unique: function (a) {
				return this.__class__ = "Unique", "object" == typeof a && (this.key = a.key), this.validate = function (a) {
					var c, e = [];
					if (!g(a)) throw new d(this, a, {
						value: b.errorCode.must_be_an_array
					});
					for (var f = 0; f < a.length; f++)
						if (c = "object" == typeof a[f] ? a[f][this.key] : a[f], "undefined" != typeof c) {
							if (-1 !== e.indexOf(c)) throw new d(this, a, {
								value: c
							});
							e.push(c)
						}
					return !0
				}, this
			}
		}, a.Assert = e, a.Validator = b, a.Violation = d, a.Constraint = c, Array.prototype.indexOf || (Array.prototype.indexOf = function (a) {
			if (null === this) throw new TypeError;
			var b = Object(this),
				c = b.length >>> 0;
			if (0 === c) return -1;
			var d = 0;
			if (arguments.length > 1 && (d = Number(arguments[1]), d != d ? d = 0 : 0 !== d && 1 / 0 != d && d != -1 / 0 && (d = (d > 0 || -1) * Math.floor(Math.abs(d)))), d >= c) return -1;
			for (var e = d >= 0 ? d : Math.max(c - Math.abs(d), 0); c > e; e++)
				if (e in b && b[e] === a) return e;
			return -1
		});
		var f = function (a) {
				for (var b in a) return !1;
				return !0
			},
			g = function (a) {
				return "[object Array]" === Object.prototype.toString.call(a)
			},
			h = {
				eql: function (a, b) {
					if (a === b) return !0;
					if ("undefined" != typeof Buffer && Buffer.isBuffer(a) && Buffer.isBuffer(b)) {
						if (a.length !== b.length) return !1;
						for (var c = 0; c < a.length; c++)
							if (a[c] !== b[c]) return !1;
						return !0
					}
					return a instanceof Date && b instanceof Date ? a.getTime() === b.getTime() : "object" != typeof a && "object" != typeof b ? a == b : this.objEquiv(a, b)
				},
				isUndefinedOrNull: function (a) {
					return null === a || "undefined" == typeof a
				},
				isArguments: function (a) {
					return "[object Arguments]" == Object.prototype.toString.call(a)
				},
				keys: function (a) {
					if (Object.keys) return Object.keys(a);
					var b = [];
					for (var c in a) Object.prototype.hasOwnProperty.call(a, c) && b.push(c);
					return b
				},
				objEquiv: function (a, b) {
					if (this.isUndefinedOrNull(a) || this.isUndefinedOrNull(b)) return !1;
					if (a.prototype !== b.prototype) return !1;
					if (this.isArguments(a)) return this.isArguments(b) ? eql(pSlice.call(a), pSlice.call(b)) : !1;
					try {
						var c, d, e = this.keys(a),
							f = this.keys(b);
						if (e.length !== f.length) return !1;
						for (e.sort(), f.sort(), d = e.length - 1; d >= 0; d--)
							if (e[d] != f[d]) return !1;
						for (d = e.length - 1; d >= 0; d--)
							if (c = e[d], !this.eql(a[c], b[c])) return !1;
						return !0
					} catch (g) {
						return !1
					}
				}
			};
		"function" == typeof define && define.amd && define("validator", [], function () {
			return a
		})
	}("undefined" == typeof exports ? this["undefined" != typeof validatorjs_ns ? validatorjs_ns : "Validator"] = {} : exports);
	var e = function (a, b) {
		this.__class__ = "ParsleyValidator", this.Validator = Validator, this.locale = "en", this.init(a || {}, b || {})
	};
	e.prototype = {
		init: function (b, c) {
			this.catalog = c;
			for (var d in b) this.addValidator(d, b[d].fn, b[d].priority);
			a.emit("parsley:validator:init")
		},
		setLocale: function (a) {
			if ("undefined" == typeof this.catalog[a]) throw new Error(a + " is not available in the catalog");
			return this.locale = a, this
		},
		addCatalog: function (a, b, c) {
			return "object" == typeof b && (this.catalog[a] = b), !0 === c ? this.setLocale(a) : this
		},
		addMessage: function (a, b, c) {
			return void 0 === typeof this.catalog[a] && (this.catalog[a] = {}), this.catalog[a][b.toLowerCase()] = c, this
		},
		validate: function () {
			return (new this.Validator.Validator).validate.apply(new Validator.Validator, arguments)
		},
		addValidator: function (b, c, d) {
			return this.validators[b.toLowerCase()] = function (b) {
				return a.extend((new Validator.Assert).Callback(c, b), {
					priority: d
				})
			}, this
		},
		updateValidator: function (a, b, c) {
			return addValidator(a, b, c)
		},
		removeValidator: function (a) {
			return delete this.validators[a], this
		},
		getErrorMessage: function (a) {
			var b;
			return b = "type" === a.name ? this.catalog[this.locale][a.name][a.requirements] : this.formatMessage(this.catalog[this.locale][a.name], a.requirements), "" !== b ? b : this.catalog[this.locale].defaultMessage
		},
		formatMessage: function (a, b) {
			if ("object" == typeof b) {
				for (var c in b) a = this.formatMessage(a, b[c]);
				return a
			}
			return "string" == typeof a ? a.replace(new RegExp("%s", "i"), b) : ""
		},
		validators: {
			notblank: function () {
				return a.extend((new Validator.Assert).NotBlank(), {
					priority: 2
				})
			},
			required: function () {
				return a.extend((new Validator.Assert).Required(), {
					priority: 512
				})
			},
			type: function (b) {
				var c;
				switch (b) {
				case "email":
					c = (new Validator.Assert).Email();
					break;
				case "number":
					c = (new Validator.Assert).Regexp("^-?(?:\\d+|\\d{1,3}(?:,\\d{3})+)?(?:\\.\\d+)?$");
					break;
				case "integer":
					c = (new Validator.Assert).Regexp("^-?\\d+$");
					break;
				case "digits":
					c = (new Validator.Assert).Regexp("^\\d+$");
					break;
				case "alphanum":
					c = (new Validator.Assert).Regexp("^\\w+$", "i");
					break;
				case "url":
					c = (new Validator.Assert).Regexp("(https?:\\/\\/)?(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{2,256}\\.[a-z]{2,4}\\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)", "i");
					break;
				default:
					throw new Error("validator type `" + b + "` is not supported")
				}
				return a.extend(c, {
					priority: 256
				})
			},
			pattern: function (b) {
				var c = "";
				return /^\/.*\/(?:[gimy]*)$/.test(b) && (c = b.replace(/.*\/([gimy]*)$/, "$1"), b = b.replace(new RegExp("^/(.*?)/" + c + "$"), "$1")), a.extend((new Validator.Assert).Regexp(b, c), {
					priority: 64
				})
			},
			minlength: function (b) {
				return a.extend((new Validator.Assert).Length({
					min: b
				}), {
					priority: 30,
					requirementsTransformer: function () {
						return "string" != typeof b || isNaN(b) ? b : parseInt(b, 10)
					}
				})
			},
			maxlength: function (b) {
				return a.extend((new Validator.Assert).Length({
					max: b
				}), {
					priority: 30,
					requirementsTransformer: function () {
						return "string" != typeof b || isNaN(b) ? b : parseInt(b, 10)
					}
				})
			},
			length: function (b) {
				return a.extend((new Validator.Assert).Length({
					min: b[0],
					max: b[1]
				}), {
					priority: 32
				})
			},
			mincheck: function (a) {
				return this.minlength(a)
			},
			maxcheck: function (a) {
				return this.maxlength(a)
			},
			check: function (a) {
				return this.length(a)
			},
			min: function (b) {
				return a.extend((new Validator.Assert).GreaterThanOrEqual(b), {
					priority: 30,
					requirementsTransformer: function () {
						return "string" != typeof b || isNaN(b) ? b : parseInt(b, 10)
					}
				})
			},
			max: function (b) {
				return a.extend((new Validator.Assert).LessThanOrEqual(b), {
					priority: 30,
					requirementsTransformer: function () {
						return "string" != typeof b || isNaN(b) ? b : parseInt(b, 10)
					}
				})
			},
			range: function (b) {
				return a.extend((new Validator.Assert).Range(b[0], b[1]), {
					priority: 32,
					requirementsTransformer: function () {
						for (var a = 0; a < b.length; a++) b[a] = "string" != typeof b[a] || isNaN(b[a]) ? b[a] : parseInt(b[a], 10);
						return b
					}
				})
			},
			equalto: function (b) {
				return a.extend((new Validator.Assert).EqualTo(b), {
					priority: 256,
					requirementsTransformer: function () {
						return a(b).length ? a(b).val() : b
					}
				})
			}
		}
	};
	var f = function () {
		this.__class__ = "ParsleyUI"
	};
	f.prototype = {
		listen: function () {
			return a.listen("parsley:form:init", this, this.setupForm), a.listen("parsley:field:init", this, this.setupField), a.listen("parsley:field:validated", this, this.reflow), a.listen("parsley:form:validated", this, this.focus), a.listen("parsley:field:reset", this, this.reset), a.listen("parsley:form:destroy", this, this.destroy), a.listen("parsley:field:destroy", this, this.destroy), this
		},
		reflow: function (a) {
			if ("undefined" != typeof a._ui && !1 !== a._ui.active) {
				var b = this._diff(a.validationResult, a._ui.lastValidationResult);
				a._ui.lastValidationResult = a.validationResult, a._ui.validatedOnce = !0, this.manageStatusClass(a), this.manageErrorsMessages(a, b), this.actualizeTriggers(a), (b.kept.length || b.added.length) && "undefined" == typeof a._ui.failedOnce && this.manageFailingFieldTrigger(a)
			}
		},
		getErrorsMessages: function (a) {
			if (!0 === a.validationResult) return [];
			for (var b = [], c = 0; c < a.validationResult.length; c++) b.push(this._getErrorMessage(a, a.validationResult[c].assert));
			return b
		},
		manageStatusClass: function (a) {
			!0 === a.validationResult ? this._successClass(a) : a.validationResult.length > 0 ? this._errorClass(a) : this._resetClass(a)
		},
		manageErrorsMessages: function (b, c) {
			if ("undefined" == typeof b.options.errorsMessagesDisabled) {
				if ("undefined" != typeof b.options.errorMessage) return c.added.length || c.kept.length ? (0 === b._ui.$errorsWrapper.find(".parsley-custom-error-message").length && b._ui.$errorsWrapper.append(a(b.options.errorTemplate).addClass("parsley-custom-error-message")), b._ui.$errorsWrapper.addClass("filled").find(".parsley-custom-error-message").html(b.options.errorMessage)) : b._ui.$errorsWrapper.removeClass("filled").find(".parsley-custom-error-message").remove();
				for (var d = 0; d < c.removed.length; d++) this.removeError(b, c.removed[d].assert.name, !0);
				for (d = 0; d < c.added.length; d++) this.addError(b, c.added[d].assert.name, void 0, c.added[d].assert, !0);
				for (d = 0; d < c.kept.length; d++) this.updateError(b, c.kept[d].assert.name, void 0, c.kept[d].assert, !0)
			}
		},
		addError: function (b, c, d, e, f) {
			b._ui.$errorsWrapper.addClass("filled").append(a(b.options.errorTemplate).addClass("parsley-" + c).html(d || this._getErrorMessage(b, e))), !0 !== f && this._errorClass(b)
		},
		updateError: function (a, b, c, d, e) {
			a._ui.$errorsWrapper.addClass("filled").find(".parsley-" + b).html(c || this._getErrorMessage(a, d)), !0 !== e && this._errorClass(a)
		},
		removeError: function (a, b, c) {
			a._ui.$errorsWrapper.removeClass("filled").find(".parsley-" + b).remove(), !0 !== c && this.manageStatusClass(a)
		},
		focus: function (a) {
			if (!0 === a.validationResult || "none" === a.options.focus) return a._focusedField = null;
			a._focusedField = null;
			for (var b = 0; b < a.fields.length; b++)
				if (!0 !== a.fields[b].validationResult && a.fields[b].validationResult.length > 0 && "undefined" == typeof a.fields[b].options.noFocus) {
					if ("first" === a.options.focus) return a._focusedField = a.fields[b].$element, a._focusedField.focus();
					a._focusedField = a.fields[b].$element
				}
			return null === a._focusedField ? null : a._focusedField.focus()
		},
		_getErrorMessage: function (a, b) {
			var c = b.name + "Message";
			return "undefined" != typeof a.options[c] ? window.ParsleyValidator.formatMessage(a.options[c], b.requirements) : window.ParsleyValidator.getErrorMessage(b)
		},
		_diff: function (a, b, c) {
			for (var d = [], e = [], f = 0; f < a.length; f++) {
				for (var g = !1, h = 0; h < b.length; h++)
					if (a[f].assert.name === b[h].assert.name) {
						g = !0;
						break
					}
				g ? e.push(a[f]) : d.push(a[f])
			}
			return {
				kept: e,
				added: d,
				removed: c ? [] : this._diff(b, a, !0).added
			}
		},
		setupForm: function (b) {
			b.$element.on("submit.Parsley", !1, a.proxy(b.onSubmitValidate, b)), !1 !== b.options.uiEnabled && b.$element.attr("novalidate", "")
		},
		setupField: function (b) {
			var c = {
				active: !1
			};
			!1 !== b.options.uiEnabled && (c.active = !0, b.$element.attr(b.options.namespace + "id", b.__id__), c.$errorClassHandler = this._manageClassHandler(b), c.errorsWrapperId = "parsley-id-" + ("undefined" != typeof b.options.multiple ? "multiple-" + b.options.multiple : b.__id__), c.$errorsWrapper = a(b.options.errorsWrapper).attr("id", c.errorsWrapperId), c.lastValidationResult = [], c.validatedOnce = !1, c.validationInformationVisible = !1, b._ui = c, this._insertErrorWrapper(b), this.actualizeTriggers(b))
		},
		_manageClassHandler: function (b) {
			if ("string" == typeof b.options.classHandler && a(b.options.classHandler).length) return a(b.options.classHandler);
			var c = b.options.classHandler(b);
			return "undefined" != typeof c && c.length ? c : "undefined" == typeof b.options.multiple || b.$element.is("select") ? b.$element : b.$element.parent()
		},
		_insertErrorWrapper: function (b) {
			var c;
			if ("string" == typeof b.options.errorsContainer) {
				if (a(b.options.errorsContainer + "").length) return a(b.options.errorsContainer).append(b._ui.$errorsWrapper);
				window.console && window.console.warn && window.console.warn("The errors container `" + b.options.errorsContainer + "` does not exist in DOM")
			}
			return "function" == typeof b.options.errorsContainer && (c = b.options.errorsContainer(b)), "undefined" != typeof c && c.length ? c.append(b._ui.$errorsWrapper) : "undefined" == typeof b.options.multiple ? b.$element.after(b._ui.$errorsWrapper) : b.$element.parent().after(b._ui.$errorsWrapper)
		},
		actualizeTriggers: function (b) {
			var c = this;
			if (b.options.multiple ? a("[" + b.options.namespace + 'multiple="' + b.options.multiple + '"]').each(function () {
				a(this).off(".Parsley")
			}) : b.$element.off(".Parsley"), !1 !== b.options.trigger) {
				var d = b.options.trigger.replace(/^\s+/g, "").replace(/\s+$/g, "");
				"" !== d && (b.options.multiple ? a("[" + b.options.namespace + 'multiple="' + b.options.multiple + '"]').each(function () {
					a(this).on(d.split(" ").join(".Parsley ") + ".Parsley", !1, a.proxy("function" == typeof b.eventValidate ? b.eventValidate : c.eventValidate, b))
				}) : b.$element.on(d.split(" ").join(".Parsley ") + ".Parsley", !1, a.proxy("function" == typeof b.eventValidate ? b.eventValidate : this.eventValidate, b)))
			}
		},
		eventValidate: function (a) {
			new RegExp("key").test(a.type) && !this._ui.validationInformationVisible && this.getValue().length <= this.options.validationThreshold || (this._ui.validatedOnce = !0, this.validate())
		},
		manageFailingFieldTrigger: function (b) {
			return b._ui.failedOnce = !0, b.options.multiple && a("[" + b.options.namespace + 'multiple="' + b.options.multiple + '"]').each(function () {
				return new RegExp("change", "i").test(a(this).parsley().options.trigger || "") ? void 0 : a(this).on("change.ParsleyFailedOnce", !1, a.proxy(b.validate, b))
			}), b.$element.is("select") && !new RegExp("change", "i").test(b.options.trigger || "") ? b.$element.on("change.ParsleyFailedOnce", !1, a.proxy(b.validate, b)) : new RegExp("keyup", "i").test(b.options.trigger || "") ? void 0 : b.$element.on("keyup.ParsleyFailedOnce", !1, a.proxy(b.validate, b))
		},
		reset: function (b) {
			b.$element.off(".Parsley"), b.$element.off(".ParsleyFailedOnce"), "undefined" != typeof b._ui && "ParsleyForm" !== b.__class__ && (b._ui.$errorsWrapper.children().each(function () {
				a(this).remove()
			}), this._resetClass(b), b._ui.validatedOnce = !1, b._ui.lastValidationResult = [], b._ui.validationInformationVisible = !1)
		},
		destroy: function (a) {
			this.reset(a), "ParsleyForm" !== a.__class__ && (a._ui.$errorsWrapper.remove(), delete a._ui)
		},
		_successClass: function (a) {
			a._ui.validationInformationVisible = !0, a._ui.$errorClassHandler.removeClass(a.options.errorClass).addClass(a.options.successClass)
		},
		_errorClass: function (a) {
			a._ui.validationInformationVisible = !0, a._ui.$errorClassHandler.removeClass(a.options.successClass).addClass(a.options.errorClass)
		},
		_resetClass: function (a) {
			a._ui.$errorClassHandler.removeClass(a.options.successClass).removeClass(a.options.errorClass)
		}
	};
	var g = function (c, d, e, f) {
		this.__class__ = "OptionsFactory", this.__id__ = b.hash(4), this.formOptions = null, this.fieldOptions = null, this.staticOptions = a.extend(!0, {}, c, d, e, {
			namespace: f
		})
	};
	g.prototype = {
		get: function (a) {
			if ("undefined" == typeof a.__class__) throw new Error("Parsley Instance expected");
			switch (a.__class__) {
			case "Parsley":
				return this.staticOptions;
			case "ParsleyForm":
				return this.getFormOptions(a);
			case "ParsleyField":
			case "ParsleyFieldMultiple":
				return this.getFieldOptions(a);
			default:
				throw new Error("Instance " + a.__class__ + " is not supported")
			}
		},
		getFormOptions: function (c) {
			return this.formOptions = b.attr(c.$element, this.staticOptions.namespace), a.extend({}, this.staticOptions, this.formOptions)
		},
		getFieldOptions: function (c) {
			return this.fieldOptions = b.attr(c.$element, this.staticOptions.namespace), null === this.formOptions && "undefined" != typeof c.parent && (this.formOptions = this.getFormOptions(c.parent)), a.extend({}, this.staticOptions, this.formOptions, this.fieldOptions)
		}
	};
	var h = function (c, d) {
		if (this.__class__ = "ParsleyForm", this.__id__ = b.hash(4), "OptionsFactory" !== b.get(d, "__class__")) throw new Error("You must give an OptionsFactory instance");
		this.OptionsFactory = d, this.$element = a(c), this.validationResult = null, this.options = this.OptionsFactory.get(this)
	};
	h.prototype = {
		onSubmitValidate: function (b) {
			return this.validate(void 0, void 0, b), !1 === this.validationResult && b instanceof a.Event && (b.stopImmediatePropagation(), b.preventDefault()), this
		},
		validate: function (b, c, d) {
			this.submitEvent = d, this.validationResult = !0;
			var e = [];
			this._refreshFields(), a.emit("parsley:form:validate", this);
			for (var f = 0; f < this.fields.length; f++) b && b !== this.fields[f].options.group || (e = this.fields[f].validate(c), !0 !== e && e.length > 0 && this.validationResult && (this.validationResult = !1));
			return a.emit("parsley:form:validated", this), this.validationResult
		},
		isValid: function (a, b) {
			this._refreshFields();
			for (var c = 0; c < this.fields.length; c++)
				if ((!a || a === this.fields[c].options.group) && !1 === this.fields[c].isValid(b)) return !1;
			return !0
		},
		_refreshFields: function () {
			return this.actualizeOptions()._bindFields()
		},
		_bindFields: function () {
			var a = this;
			return this.fields = [], this.fieldsMappedById = {}, this.$element.find(this.options.inputs).each(function () {
				var b = new window.Parsley(this, {}, a);
				"ParsleyField" !== b.__class__ && "ParsleyFieldMultiple" !== b.__class__ || b.$element.is(b.options.excluded) || "undefined" == typeof a.fieldsMappedById[b.__class__ + "-" + b.__id__] && (a.fieldsMappedById[b.__class__ + "-" + b.__id__] = b, a.fields.push(b))
			}), this
		}
	};
	var i = function (c, d, e, f, g) {
			if (!new RegExp("ParsleyField").test(b.get(c, "__class__"))) throw new Error("ParsleyField or ParsleyFieldMultiple instance expected");
			if ("function" != typeof window.ParsleyValidator.validators[d] && "Assert" !== window.ParsleyValidator.validators[d](e).__parentClass__) throw new Error("Valid validator expected");
			var h = function (a, c) {
				return "undefined" != typeof a.options[c + "Priority"] ? a.options[c + "Priority"] : b.get(window.ParsleyValidator.validators[c](e), "priority") || 2
			};
			return f = f || h(c, d), "function" == typeof window.ParsleyValidator.validators[d](e).requirementsTransformer && (e = window.ParsleyValidator.validators[d](e).requirementsTransformer()), a.extend(window.ParsleyValidator.validators[d](e), {
				name: d,
				requirements: e,
				priority: f,
				groups: [f],
				isDomConstraint: g || b.attr(c.$element, c.options.namespace, d)
			})
		},
		j = function (c, d, e) {
			this.__class__ = "ParsleyField", this.__id__ = b.hash(4), this.$element = a(c), "undefined" != typeof e ? (this.parent = e, this.OptionsFactory = this.parent.OptionsFactory, this.options = this.OptionsFactory.get(this)) : (this.OptionsFactory = d, this.options = this.OptionsFactory.get(this)), this.constraints = [], this.constraintsByName = {}, this.validationResult = [], this._bindConstraints()
		};
	j.prototype = {
		validate: function (b) {
			return this.value = this.getValue(), a.emit("parsley:field:validate", this), a.emit("parsley:field:" + (this.isValid(b, this.value) ? "success" : "error"), this), a.emit("parsley:field:validated", this), this.validationResult
		},
		isValid: function (a, b) {
			this.refreshConstraints();
			var c = this._getConstraintsSortedPriorities();
			if (b = b || this.getValue(), 0 === b.length && !this._isRequired() && "undefined" == typeof this.options.validateIfEmpty && !0 !== a) return this.validationResult = [];
			if (!1 === this.options.priorityEnabled) return !0 === (this.validationResult = this.validateThroughValidator(b, this.constraints, "Any"));
			for (var d = 0; d < c.length; d++)
				if (!0 !== (this.validationResult = this.validateThroughValidator(b, this.constraints, c[d]))) return !1;
			return !0
		},
		getValue: function () {
			var a;
			return a = "undefined" != typeof this.options.value ? this.options.value : this.$element.val(), "undefined" == typeof a || null === a ? "" : !0 === this.options.trimValue ? a.replace(/^\s+|\s+$/g, "") : a
		},
		refreshConstraints: function () {
			return this.actualizeOptions()._bindConstraints()
		},
		addConstraint: function (a, b, c, d) {
			if (a = a.toLowerCase(), "function" == typeof window.ParsleyValidator.validators[a]) {
				var e = new i(this, a, b, c, d);
				"undefined" !== this.constraintsByName[e.name] && this.removeConstraint(e.name), this.constraints.push(e), this.constraintsByName[e.name] = e
			}
			return this
		},
		removeConstraint: function (a) {
			for (var b = 0; b < this.constraints.length; b++)
				if (a === this.constraints[b].name) {
					this.constraints.splice(b, 1);
					break
				}
			return this
		},
		updateConstraint: function (a, b, c) {
			return this.removeConstraint(a).addConstraint(a, b, c)
		},
		_bindConstraints: function () {
			for (var a = [], b = 0; b < this.constraints.length; b++)!1 === this.constraints[b].isDomConstraint && a.push(this.constraints[b]);
			this.constraints = a;
			for (var c in this.options) this.addConstraint(c, this.options[c]);
			return this._bindHtml5Constraints()
		},
		_bindHtml5Constraints: function () {
			(this.$element.hasClass("required") || this.$element.attr("required")) && this.addConstraint("required", !0, void 0, !0), "string" == typeof this.$element.attr("pattern") && this.addConstraint("pattern", this.$element.attr("pattern"), void 0, !0), "undefined" != typeof this.$element.attr("min") && "undefined" != typeof this.$element.attr("max") ? this.addConstraint("range", [this.$element.attr("min"), this.$element.attr("max")], void 0, !0) : "undefined" != typeof this.$element.attr("min") ? this.addConstraint("min", this.$element.attr("min"), void 0, !0) : "undefined" != typeof this.$element.attr("max") && this.addConstraint("max", this.$element.attr("max"), void 0, !0);
			var a = this.$element.attr("type");
			return "undefined" == typeof a ? this : "number" === a ? this.addConstraint("type", "integer", void 0, !0) : new RegExp(a, "i").test("email url range") ? this.addConstraint("type", a, void 0, !0) : this
		},
		_isRequired: function () {
			return "undefined" == typeof this.constraintsByName.required ? !1 : !1 !== this.constraintsByName.required.requirements
		},
		_getConstraintsSortedPriorities: function () {
			for (var a = [], b = 0; b < this.constraints.length; b++) - 1 === a.indexOf(this.constraints[b].priority) && a.push(this.constraints[b].priority);
			return a.sort(function (a, b) {
				return b - a
			}), a
		}
	};
	var k = function () {
		this.__class__ = "ParsleyFieldMultiple"
	};
	k.prototype = {
		addElement: function (a) {
			return this.$elements.push(a), this
		},
		refreshConstraints: function () {
			var a;
			if (this.constraints = [], this.$element.is("select")) return this.actualizeOptions()._bindConstraints(), this;
			for (var b = 0; b < this.$elements.length; b++) {
				a = this.$elements[b].data("ParsleyFieldMultiple").refreshConstraints().constraints;
				for (var c = 0; c < a.length; c++) this.addConstraint(a[c].name, a[c].requirements, a[c].priority, a[c].isDomConstraint)
			}
			return this
		},
		getValue: function () {
			if ("undefined" != typeof this.options.value) return this.options.value;
			if (this.$element.is("input[type=radio]")) return a("[" + this.options.namespace + 'multiple="' + this.options.multiple + '"]:checked').val() || "";
			if (this.$element.is("input[type=checkbox]")) {
				var b = [];
				return a("[" + this.options.namespace + 'multiple="' + this.options.multiple + '"]:checked').each(function () {
					b.push(a(this).val())
				}), b.length ? b : []
			}
			return this.$element.is("select") && null === this.$element.val() ? [] : this.$element.val()
		},
		_init: function (a) {
			return this.$elements = [this.$element], this.options.multiple = a, this
		}
	};
	var l = a({}),
		m = {};
	a.listen = function (a) {
		if ("undefined" == typeof m[a] && (m[a] = []), "function" == typeof arguments[1]) return m[a].push({
			fn: arguments[1]
		});
		if ("object" == typeof arguments[1] && "function" == typeof arguments[2]) return m[a].push({
			fn: arguments[2],
			ctxt: arguments[1]
		});
		throw new Error("Wrong parameters")
	}, a.listenTo = function (a, b, c) {
		if ("undefined" == typeof m[b] && (m[b] = []), !(a instanceof j || a instanceof h)) throw new Error("Must give Parsley instance");
		if ("string" != typeof b || "function" != typeof c) throw new Error("Wrong parameters");
		m[b].push({
			instance: a,
			fn: c
		})
	}, a.unsubscribe = function (a, b) {
		if ("undefined" != typeof m[a]) {
			if ("string" != typeof a || "function" != typeof b) throw new Error("Wrong arguments");
			for (var c = 0; c < m[a].length; c++)
				if (m[a][c].fn === b) return m[a].splice(c, 1)
		}
	}, a.unsubscribeTo = function (a, b) {
		if ("undefined" != typeof m[b]) {
			if (!(a instanceof j || a instanceof h)) throw new Error("Must give Parsley instance");
			for (var c = 0; c < m[b].length; c++)
				if ("undefined" != typeof m[b][c].instance && m[b][c].instance.__id__ === a.__id__) return m[b].splice(c, 1)
		}
	}, a.unsubscribeAll = function (a) {
		"undefined" != typeof m[a] && delete m[a]
	}, a.emit = function (a, b) {
		if ("undefined" != typeof m[a])
			for (var c = 0; c < m[a].length; c++)
				if ("undefined" != typeof m[a][c].instance) {
					if (b instanceof j || b instanceof h)
						if (m[a][c].instance.__id__ !== b.__id__) {
							if (m[a][c].instance instanceof h && b instanceof j)
								for (var d = 0; d < m[a][c].instance.fields.length; d++)
									if (m[a][c].instance.fields[d].__id__ === b.__id__) {
										m[a][c].fn.apply(l, Array.prototype.slice.call(arguments, 1));
										continue
									}
						} else m[a][c].fn.apply(l, Array.prototype.slice.call(arguments, 1))
				} else m[a][c].fn.apply("undefined" != typeof m[a][c].ctxt ? m[a][c].ctxt : l, Array.prototype.slice.call(arguments, 1))
	}, a.subscribed = function () {
		return m
	}, window.ParsleyConfig = window.ParsleyConfig || {}, window.ParsleyConfig.i18n = window.ParsleyConfig.i18n || {}, window.ParsleyConfig.i18n.en = a.extend(window.ParsleyConfig.i18n.en || {}, {
		defaultMessage: "This value seems to be invalid.",
		type: {
			email: "This value should be a valid email.",
			url: "This value should be a valid url.",
			number: "This value should be a valid number.",
			integer: "This value should be a valid integer.",
			digits: "This value should be digits.",
			alphanum: "This value should be alphanumeric."
		},
		notblank: "This value should not be blank.",
		required: "This value is required.",
		pattern: "This value seems to be invalid.",
		min: "This value should be greater than or equal to %s.",
		max: "This value should be lower than or equal to %s.",
		range: "This value should be between %s and %s.",
		minlength: "This value is too short. It should have %s characters or more.",
		maxlength: "This value is too long. It should have %s characters or less.",
		length: "This value length is invalid. It should be between %s and %s characters long.",
		mincheck: "You must select at least %s choices.",
		maxcheck: "You must select %s choices or less.",
		check: "You must select between %s and %s choices.",
		equalto: "This value should be the same."
	}), "undefined" != typeof window.ParsleyValidator && window.ParsleyValidator.addCatalog("en", window.ParsleyConfig.i18n.en, !0);
	var n = function (c, d, e) {
		if (this.__class__ = "Parsley", this.__version__ = "2.0.0", this.__id__ = b.hash(4), "undefined" == typeof c) throw new Error("You must give an element");
		if ("undefined" != typeof e && "ParsleyForm" !== e.__class__) throw new Error("Parent instance must be a ParsleyForm instance");
		return this.init(a(c), d, e)
	};
	n.prototype = {
		init: function (a, d, e) {
			if (!a.length) throw new Error("You must bind Parsley on an existing element.");
			if (this.$element = a, this.$element.data("Parsley")) {
				var f = this.$element.data("Parsley");
				return "undefined" != typeof e && (f.parent = e), f
			}
			return this.OptionsFactory = new g(c, b.get(window, "ParsleyConfig") || {}, d, this.getNamespace(d)), this.options = this.OptionsFactory.get(this), this.$element.is("form") || b.attr(this.$element, this.options.namespace, "validate") && !this.$element.is(this.options.inputs) ? this.bind("parsleyForm") : this.$element.is(this.options.inputs) && !this.$element.is(this.options.excluded) ? this.isMultiple() ? this.handleMultiple(e) : this.bind("parsleyField", e) : this
		},
		isMultiple: function () {
			return this.$element.is("input[type=radio], input[type=checkbox]") && "undefined" == typeof this.options.multiple || this.$element.is("select") && "undefined" != typeof this.$element.attr("multiple")
		},
		handleMultiple: function (c) {
			var d, e, f, g = this;
			if (this.options = a.extend(this.options, c ? c.OptionsFactory.get(c) : {}, b.attr(this.$element, this.options.namespace)), this.options.multiple ? e = this.options.multiple : "undefined" != typeof this.$element.attr("name") && this.$element.attr("name").length ? e = d = this.$element.attr("name") : "undefined" != typeof this.$element.attr("id") && this.$element.attr("id").length && (e = this.$element.attr("id")), this.$element.is("select") && "undefined" != typeof this.$element.attr("multiple")) return this.bind("parsleyFieldMultiple", c, e || this.__id__);
			if ("undefined" == typeof e) return window.console && window.console.warn && window.console.warn("To be binded by Parsley, a radio, a checkbox and a multiple select input must have either a name or a multiple option.", this.$element), this;
			if (e = e.replace(/(:|\.|\[|\]|\$)/g, ""), "undefined" != typeof d && a('input[name="' + d + '"]').each(function () {
				a(this).is("input[type=radio], input[type=checkbox]") && a(this).attr(g.options.namespace + "multiple", e)
			}), a("[" + this.options.namespace + "multiple=" + e + "]").length)
				for (var h = 0; h < a("[" + this.options.namespace + "multiple=" + e + "]").length; h++)
					if ("undefined" != typeof a(a("[" + this.options.namespace + "multiple=" + e + "]").get(h)).data("Parsley")) {
						f = a(a("[" + this.options.namespace + "multiple=" + e + "]").get(h)).data("Parsley"), this.$element.data("ParsleyFieldMultiple") || (f.addElement(this.$element), this.$element.attr(this.options.namespace + "id", f.__id__));
						break
					}
			return this.bind("parsleyField", c, e, !0), f || this.bind("parsleyFieldMultiple", c, e)
		},
		getNamespace: function (a) {
			return "undefined" != typeof this.$element.data("parsleyNamespace") ? this.$element.data("parsleyNamespace") : "undefined" != typeof b.get(a, "namespace") ? a.namespace : "undefined" != typeof b.get(window, "ParsleyConfig.namespace") ? window.ParsleyConfig.namespace : c.namespace
		},
		bind: function (c, e, f, g) {
			var i;
			switch (c) {
			case "parsleyForm":
				i = a.extend(new h(this.$element, this.OptionsFactory), new d, window.ParsleyExtend)._bindFields();
				break;
			case "parsleyField":
				i = a.extend(new j(this.$element, this.OptionsFactory, e), new d, window.ParsleyExtend);
				break;
			case "parsleyFieldMultiple":
				i = a.extend(new j(this.$element, this.OptionsFactory, e), new d, new k, window.ParsleyExtend)._init(f);
				break;
			default:
				throw new Error(c + "is not a supported Parsley type")
			}
			return "undefined" != typeof f && b.setAttr(this.$element, this.options.namespace, "multiple", f), "undefined" != typeof g ? (this.$element.data("ParsleyFieldMultiple", i), i) : (new RegExp("ParsleyF", "i").test(i.__class__) && (this.$element.data("Parsley", i), a.emit("parsley:" + ("parsleyForm" === c ? "form" : "field") + ":init", i)), i)
		}
	}, a.fn.parsley = a.fn.psly = function (b) {
		if (this.length > 1) {
			var c = [];
			return this.each(function () {
				c.push(a(this).parsley(b))
			}), c
		}
		return a(this).length ? new n(this, b) : void(window.console && window.console.warn && window.console.warn("You must bind Parsley on an existing element."))
	}, window.ParsleyUI = "function" == typeof b.get(window, "ParsleyConfig.ParsleyUI") ? (new window.ParsleyConfig.ParsleyUI).listen() : (new f).listen(), "undefined" == typeof window.ParsleyExtend && (window.ParsleyExtend = {}), "undefined" == typeof window.ParsleyConfig && (window.ParsleyConfig = {}), window.Parsley = window.psly = n, window.ParsleyUtils = b, window.ParsleyValidator = new e(window.ParsleyConfig.validators, window.ParsleyConfig.i18n), !1 !== b.get(window, "ParsleyConfig.autoBind") && a(document).ready(function () {
		a("[data-parsley-validate]").length && a("[data-parsley-validate]").parsley()
	}), "function" == typeof define && define.amd && define("parsley", function () {
		return window.Parsley
	})
}(window.jQuery);