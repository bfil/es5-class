BF-Class
========

A Class object that enables native prototypal inheritance

* Inheritance made easy
* Uses Object.create ES5 method to enable native prototypal inheritance
* Works with Node.js and in the browsers that supports ES5 Object and Properties.
* Instances and classes gets useful methods and properties for reflections and navigation
* Functions to implement other class methods and include other instance/prototype methods
* Takes advantage of ES5 non-writable properties to disalbe the possibility of messing up the classes


__Contributors__

* [ShadowCloud](https://github.com/ShadowCloud)


Usage
-----


__Creating a new class__

    var Animal = Class.extend(
        'Animal', // Class Name
        { // Instance Methods/Properties
            init: function(name) { // Constructor
                this.name = name;
            },
            getName: function() {
                return this.name;
            }
        },
        { // Class Methods/Properties
            count: 0
        }
    );


__Class inheritance__

    var Bird = Animal.extend(
        'Bird ',
        {
            init: function(name) {
                this._super('init', arguments); // calls parent class constructor
            },
            canFly: true
        },
        {}
    );


__Extending a prototype__

    Bird.include(
        {
            fly: function() {
                if(this.canFly) console.log(this.name + " flies!");
            },
        }
    );


__Extending a class__

    Animal.implement(
        {
            run: function() {
                for(var i=1; i<=10; i++)
                    console.log(this.name + " run for " + i + " miles!");
            },
        }
    );


__Creating an instance__

    var animal = Animal.create("An Animal");
    var bird = Bird.create("A Bird");


__Checking instances__

    animal.instanceOf(Animal); // true
    animal.instanceOf(Bird);   // false
    bird.instanceOf(Animal);   // true
    bird.instanceOf(Bird);     // true
    bird.instanceOf(Class);    // true


__Other useful methods and properties__

    Animal.className;                // Animal
    bird.getClass().className        // Bird
    bird.getClass().parent.className // Animal
    bird.parent.getClass().className // Animal


Running the tests
-----------------

The tests can be run using [nodeunit](https://github.com/caolan/nodeunit)

    npm install nodeunit
    nodeunit test/class-test.js


Feeback
-------

If you experience any problem or found any bug I would be glad to receive a message to verify and address the issue


License
-------

(The MIT License)

Copyright (c) 2011 Bruno Filippone

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.