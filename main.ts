// ====== TYPESCRIPT NOTES PT 1 ======

// === SOME SYNTAX, INITIALIZING & TYPES

function sendMessage(message) {
    console.log(message)
}

const sayHi = 'hello world'

sendMessage(sayHi)

// Any valid JS is valid TS
// Use typescript compiler to transpile the typescript file into a javascript file so browsers can use it. 
        // Do this in the console by typing: 
            //   tsc filename.ts
        // Then you can run the file using node command (node filename.js)

// In typescript, let/const gets transpiled to var. 

// ===================================================================================================================================

// When initializing a variable, it gets assigned a type. You can set type without initializing. 
    // A variable has type of 'any' by default, but TS will usually want you to set one expliticly.
    // TS will warn you about errors on compile, for ex. if a variable is assigned a value that isn't the correct type. 
    // Make some variables and assign them types & values.
    let a: number;
        // a = 'hi'; would be a type error
    let b: boolean;
        b = true;
    let c: string;
    let d:number[];
        d = [1, 2, 3];
    let e: any;
    let f: any[];
        f = ['hi', 1, true];

// We can assign values using an enumerator.
    // Instead of assigning values individually, like
    const colorRed = 0
    const colorGreen = 1
    const colorBlue = 2
    // We can use enum... The object will have default values 0, 1, 2, and so on, but it's considered good practice to explicitly state them in the object. 
    enum Color { Red = 0, Green = 1, Blue = 2 };
        // And then we access the value using the name. 
    let backgroundColor = Color.Red
        // This is a lot simpler and more concise than writing this out in javascript. 
    

// === TYPE ASSERTIONS ===
    // Using methods that are specific to a data type depend on the data type being clear to TS.
    // For ex, .endsWith is valid on a string, not on an object with type 'any' - so we want to be explicit about the type of the variable. 
        // We can do that by using the variable name with (<string>variableName).method() or (variableName as string).method()

    let letters; 
    letters = 'abc'
    let oneWay = (<string>letters).endsWith('c');
    let alternativeWay = (letters as string).endsWith('c')
    // This doesn't change the way the compiled JS works, it just tells TS what type we're using so we can access intellisense and whatnot.

    // Arrow functions
        // We can use arrow buddies in typescript.

    let doLog = (message) => {
        console.log(message)
    }

// ===================================================================================================================================

// === ANNOTATING PARAMETERS ===
// Just like how we can annotate variables with a type, we can annotate parameters to let them accept a specific type of object. 
    // For ex. a function that expects parameters for x and y co-ordinates: 
        // We can annotate in the function delcaration, OR more simply, use an interface:

    let drawPoint = (point: { x: number, y: number }) => {
        // ...
    }

    drawPoint({
        x: 1,
        y:2
    })

// ===================================================================================================================================

// === INTERFACING ===
    // Using an interface instead of annotating parameters directly: 
    interface Point0 {
        x: number,
        y: number
    }

    let drawPoint2 = (point: Point0) => {
        // ...
    }

    drawPoint2({
        x: 1,
        y:2
    })

// *** Note two things: Interfaces are resusable, so this can be a lot cleaner than annotating parameters inline, but interfaces can't include logic (use a class). And interface names are capitalized!

// ===================================================================================================================

// === CLASSES ===
// But since that's a bit messy - the functions are sitting separate from the interface - we could use classes instead, including the logic inside the class as methods. 

    class Point {
        x: number; /* Note, not comma separated object; semicolons to end each line */
        y: number;

        draw() {
            // ... Functions inside classes are called methods. You can call them with ClassName.methodName()
        }

        getDistance(anotherPoint: Point) {
            // ...
        }
    }

// All of the functions related to those annotations can be scoped inside the class. That means they also have access to the x and y type annotation and doesn't need to be explicitly set in each function.

    // Declaring a variable of this class type.
    let point: Point; /* We're saying: let variable 'point' be of type Point */
        // Accessing the variable point.whatever (with a class of Point) gives us access to the methods and x/y properties from the Point class. 
    point.draw();

    // However, this will find the variable point undefined if run. When giving a variable a custom type, we need to initialize it with a specific syntax. 
        // This does the same thing as above, sets the type of the variable to Point, but initializes it properly. 
    let point2 = new Point();
    // We can assign values to the x and y properties like:
    point2.x = 1
    point2.y = 2
    point2.draw()

// The point variable is an object that is an ~instance~ of the Point class. 

// ==============================================================================================================================
// Every class can have a ~constructor~ - a method (and reserved keyword) that is called when we create an instance of that class. 
    // To create one, inside a class, we'd write:
    class Point2 {
        x: number; /* Note, not comma separated object; semicolons to end each line */
        y: number;
        
        constructor(x: number, y:number) {
            this.x = x;
            this.y = y;
        }

        draw() {
            // ... Functions inside classes are called methods. You can call them with ClassName.methodName()
        }
    }

// =============================================================================================================================
// We can also declare the values of x and y as parameters when we initialize the variable. So instead of above wehere we assign x and y explicitly after initializing point2:

    let point3 = new Point2(3, 15);
    point3.draw();

// ==================================================================================
    // However, if we don't know the initial value of a coordinate, we can leave the values undeclared, and set the parameters to be optional. 
    // So finally we have:

    class Point3 {                  /* initialize the class */
        x: number;                  /* set the type of the x and y parameters */
        y: number;

        constructor(x?: number, y?: number) {            /* Set x and y to be optional by adding '?' before the type assignment */
            this.x = x;
            this.y = y;
        }

        draw() {
            console.log('X: ' + this.x + 'Y: ' + this.y);
        }
    }

    let point4 = new Point3();          /* Now we don't get compilation error when writing this without initial values as parameters */
    point.draw()

// ===================================================================================================================================

// === ACCESS MODIFIERS ===
    // If setting the value of something willy nilly isn't desired, you can change the access to it. 
    // We can apply a keyword to a member of a class to control access to it from the outside. 
    // Access can be:
        // Public - by default, all members of a class are public - no need to state it explicitly, unless... check below. 
        // Private - can't be accessed from outside the class. Cool way to see it is to check the intellisense list - the private buddy won't be there.
        // Protected - not as common

    // To add an access modifier, prefix with the appropriate keyword:

    class Point4 {
        private x: number;
    }

// ===================================================================================================================================

// There's a simpler way to set & initialize the fields in a class using access modifiers. 
    // We'll set x to private. Notice this creates an issue because the value of x cannot be read outside the class (because it's private). So we can work around that by adding a method to the class that returns the value of x, and calling that method outside the class. 
        // The parameter will be greyed out, like a parameter in a JS function that's never used, until we read it with something.
    // Instead of setting the type of x and y explicitly, and using the this.x = x lines in the constructor, we could say:

    class Point5 {

        constructor(private x?: number, public y?: number) {    /* Prefixing with the access modifier will generate the fields & initialize them with the value of the arguments provided */
        }

        draw() {
            console.log('tell me the coordinates, darn it!!!');
        }

        getX() {                /* Use a method returning the value to allow it to be read outside the class */
            return this.x
        }

        setX(value) {                /* We might also want to let the user set a value of x within a certain range */
            if (value < 0) {
                throw new Error('Value cannot be less than zero.')
            }
            this.x = value;
        }

        // You could use properties instead of methods for a cleaner syntax. This does the samet thing as setX()
        set X(value) {
            if (value < 0) {
                throw new Error('Value cannot be less than zero.')
            }
            this.x = value;
        }
    }

    let point6 = new Point5(1, 2);
    let x = point6.getX();      /* call the getX method and set the evaluation to a variable that can be accessed outside the class. */
    point6.setX(10)             /* We can call this method to set x to a new value */
    let x2 = point6.X()         /* Using properties instead of methods to set the variable */
    point6.X(10)
    point.draw();

    // *** Note - if initializing in this way, you need to state that a public field is public!
