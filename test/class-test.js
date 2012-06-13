var testCase = require('nodeunit').testCase
  , Class = require('../class');

module.exports = testCase({
	
	setUp: function(done) {
		
		Animal = Class.extend(
			'Animal',
			{
				init: function(name) {
					this.name = name;
					this.increment();
				},
				getName: function() {
					return this.name;
				},
				canFly: false,
				increment: function() {
					var parent = this;
					while(parent && parent.getClass && parent.getClass().count != null) {
						parent.getClass().count++;
						parent = parent.parent;
					}
				}
				
			},
			{
				count: 0
			});
		
		Bird = Animal.extend(
			'Bird',
			{
				init: function(name) {
					this._super('init', arguments);
					this.canFly = true;
				}
			},
			{
				count: 0
			});
		
			
		Dog = Class.extend('Dog', { init: function(name) { this.name = name; }}, {});
		Dog.include({ cry: function() { return 'wof!'; } });
		Dog.implement({ isBig: true });
		
		Beagle = Class.extend('Beagle', {}, {});
		Beagle.implement(Dog);
		Beagle.include({
			init: function(name) {
				this.name = name;
			}
		});
		Beagle.isBig = false;
		
		animal = Animal.create('An Animal');
		bird = Bird.create('A Bird');
		dog = Dog.create('A Dog');
		beagle = Beagle.create('A Beagle');
		
		done();
	},
	
	tearDown: function(done) {
		delete Class, Animal, Bird, Dog, Beagle, animal, bird, dog, beagle;
		done();
	},
	
	testClassExtend: function(test) {
		test.expect(3);
		test.throws(function() {
			Class.extend();
		});
		test.ok(Class.extend('SubClass'));
		test.ok(Class.extend('SubClass',{},{}));
		test.done();
	},
	
	testClasses: function(test) {
		test.expect(4);
		test.ok(Animal);
		test.ok(Bird);
		test.ok(Dog);
		test.ok(Beagle);
		test.done();
	},
	
	testInstances: function(test) {
		test.expect(4);
		test.ok(animal);
		test.ok(bird);
		test.ok(dog);
		test.ok(beagle);
		test.done();
	},
	
	testClassProperties: function(test) {
		test.expect(4);
		test.equals(Animal.count, 2);
		test.equals(Bird.count, 1);
		test.equals(Dog.isBig, true);
		test.equals(Beagle.isBig, false);
		test.done();
	},
	
	testInstanceProperties: function(test) {
		test.expect(7);
		test.equals(animal.name, 'An Animal');
		test.equals(bird.name, 'A Bird');
		test.equals(animal.canFly, false);
		test.equals(bird.canFly, true);
		test.equals(bird.parent.canFly, false);
		test.equals(dog.name, 'A Dog');
		test.equals(beagle.name, 'A Beagle');
		test.done();
	},
	
	testInstanceOf: function(test) {
		test.expect(1);
		test.ok(animal.instanceOf);
		
		test.done();
	},
	
	testInheritance: function(test) {
		test.expect(15);
		
		test.ok(animal.instanceOf(Animal));
		test.ok(animal.instanceOf(Class));
		test.ok(!animal.instanceOf(Bird));
		
		test.ok(bird.instanceOf(Bird));
		test.ok(bird.instanceOf(Animal));
		test.ok(bird.instanceOf(Class));
		
		test.ok(dog.instanceOf(Dog));
		test.ok(dog.instanceOf(Class));
		test.ok(!dog.instanceOf(Animal));
		test.ok(!dog.instanceOf(Bird));
		
		test.ok(beagle.instanceOf(Beagle));
		test.ok(beagle.instanceOf(Class));
		test.ok(!beagle.instanceOf(Dog));
		test.ok(!beagle.instanceOf(Animal));
		test.ok(!beagle.instanceOf(Bird));
		
		test.done();
	},
	
	testInheritedMethods: function(test) {
		test.expect(4);
		test.ok(bird.getName);
		test.equals(bird.getName(), 'A Bird');
		test.equals(dog.cry(), 'wof!');
		test.equals(beagle.cry(), 'wof!');
		test.done();
	},
	
	testClassNames: function(test) {
		test.expect(11);
		
		test.equals(Class.className, 'Class');
		test.equals(Animal.className, 'Animal');
		test.equals(Dog.className, 'Dog');
		test.equals(Beagle.className, 'Beagle');
		
		test.equals(animal.getClass().className, 'Animal');
		test.equals(bird.getClass().className, 'Bird');
		test.equals(bird.getClass().parent.className, 'Animal');
		
		test.equals(dog.getClass().className, 'Dog');
		test.equals(dog.getClass().parent.className, 'Class');
		test.equals(beagle.getClass().className, 'Beagle');
		test.equals(beagle.getClass().parent.className, 'Class');
		
		test.done();
	},
	
	testProtectedMethods: function(test) {
		test.expect(3);
		
		/* Strict Mode is still not supported in Node.js
		
		'use strict';
		 
		test.throws(function() {
			bird.getClass().className = 'trying to modify className';
		});
		
		test.throws(function() {
			Bird.prototype.getClass = function() {};
		});
		
		test.throws(function() {
			Class.prototype.instanceOf = function() {};
		});
		
		Overriding a non-writable value would throw an error in Strict Mode
		For now it fails silently, so we're just checking that the value can't be changed
		
		*/
		
		var temp = bird.getClass().className;
		bird.getClass().className = 'trying to modify className';
		test.strictEqual(bird.getClass().className, temp);
		
		temp = Bird.prototype.getClass;
		Bird.prototype.getClass = function() {};
		test.strictEqual(Bird.prototype.getClass, temp);
		
		temp = Class.prototype.instanceOf;
		Class.prototype.instanceOf = function() {};
		test.strictEqual(Class.prototype.instanceOf, temp);
		
		test.done();
	},
	
	testConstructor: function(test) {
		test.expect(2);
		test.notEqual(typeof Bird, 'function');
		test.ok(Bird.create);
		test.done();
	}
})