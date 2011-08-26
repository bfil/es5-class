var Class = {
	prototype: {
		init: function() {
		},
		_super: function(methodName, args) {
			if (typeof methodName !== "string") {
	            args = methodName;
	            methodName = "init";
	        }			
			return this.parent[methodName].apply(this, args);
		} 
	},
	extend: function(className, include, implement) {
		var object = Object.create(this);
		object.parent = this;
		object.prototype = Object.create(this.prototype);
		
		if(!className) throw new Error("Class name must be specified");
		Object.defineProperty(object, "className", {
			get: function() {
				return className;
			}
		});
		
		Object.defineProperty(object.prototype, "getClass", {
			value: (function(parentClass) {
				return function() {
					return parentClass;
				}
			}(object))
		});
		
		/*
		var isStrictSupported = (function () { "use strict"; return !this; })();
		console.log("Strict Supported: " + isStrictSupported);
		*/
		
		if (include)
			object.include(include);
		if (implement)
			object.implement(implement);
		
		return object;
	},
	create: function() {
		var instance = Object.create(this.prototype);
		instance.parent = this.parent.prototype;
		
		instance.init.apply(instance, arguments);
		return instance;
	},
	include: function(obj) {
		for(var key in obj)
			this.prototype[key] = obj[key];
		
		return this;
	},
	implement: function(obj) {
		for(var key in obj) {
			if(key == "prototype")
				this.include(obj[key]);
			else this[key] = obj[key];
		}
		
		return this;
	}
};

Object.defineProperty(Class, "className", {
	get: function() {
		return "Class";
	}
});

Object.defineProperty(Class.prototype, "getClass", {
	value: function() {
		return Class;
	}
});

Object.defineProperty(Class.prototype, "instanceOf", {
	value: function(object) {
		return object.prototype.isPrototypeOf(this);
	}
});

(function () {
    var root = this; 
    var _ = new Object();
    var isNode = false;
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = Class;
        root.Class = Class;
        isNode = true;
    }
    else root.Class = Class;
})();

