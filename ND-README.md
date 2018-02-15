# ND Specific instructions

## Installation

1. Clone repository
2. Follow the instructions in the [README](README.md) With the exception of step 9 and 10.
3. For pre-deployment development we are using the NDUA set of customizations /primo-explore/custom/NDUA

## Running the app

1. gulp run --view NDUA
2. go to localhost:8003/primo-explore/?vid=NDUA

## Comiting changes workflow

1. Branch off of master.
2. Make your changes.
3. Make a PR against UA (the current default branch)
4. When it is approved deploy UA branch to pprd.
5. when it is approved update the Changelog.
6. Make PR against Master.


## UA Deploy Instructions

1. Copy NDU to NDUA if you want to publish to pprd
2. Run gulp create-package
3. Select the package you want to create NDUA or HCC.
4. Install the file in back office as in [README](README.md)
   * Make sure you select the correct view before uploading
   * The owner "All Institutions" is fine
5. Press deploy at the top of page you uploaded the package to.


## Prod Deploy Instructions

1. Tag the repo with the release number
2. Run gulp create-package on the release tag
3. Select the package you want to create NDU or HCC.
4. Install the file in back office as in [README](README.md)
5. Press deploy at the top of page you uploaded the package to.


## Finding pnx data and application directives

See recipe 2
https://github.com/ExLibrisGroup/primo-explore-package/tree/master/VIEW_CODE/js

### Console commands
angular.reloadWithDebugInfo()
angular.element($0).scope().$ctrl

### Show Directives
The text file showDirectives.txt has javascript that will show the directives that you can add components to.
You need to bookmark the javascript.

# Custom JS

## Explenation of JS build
The gulp command used to build the custom files concatonates all JS files in the js directory into `custom.js`.
This is done in alphabetical order (how glob orders files). The NUI is expecting one module (`viewCustom`) used for custom code.
Modules can be defined only one time. To allow us to split our code into multiple JS files we've created the `1a_firstInclude.js` and
`zz_lastInclude.js` files. In `firstInclude` we define the function `registerModule`. This function is required to be called by all
custom modules (which **cannot** be called `viewCustom`). All modules defined by `registerModule` will be included in our `viewCustom`
which is created in `lastInclude`. We rely on the alphabetical order of includes to make sure our `viewCustom` is defined after
all other modules are registered.

## Examples

### Defining a new module
```javascript
let app = angular.module('fooModule', ['angularLoad']);
registerModule('fooModule')
```

### Getting from the pnx record into a component
make sure you add.
bindings: {parentCtrl: '<'},
I don't believe you need to have the controller but I think that protecting against null access is a good idea.

```javascript
app.controller('FullViewAfterController', ['angularLoad', function (angularLoad) {
    var vm = this;
    vm.title = vm.parentCtrl.item.pnx.display.title[0] || '';
}]);

app.component('prmFullViewAfter', {
  bindings: {parentCtrl: '<'},
  controller: 'FullViewAfterController',
  template: `<div>{{$ctrl.title}}</div>`
});
```

### Adding the http object to a controller

```javascript
app.controller('FullViewAfterController', ['angularLoad', '$http', function (angularLoad, http) {
  // http can be used
  http.get("url", { })
    .then(function (response) {

    }).catch(function (response) {

    });
}
```

### Translating
Primo can do some translations for us (eg. from HESB to "Notre Dame, Hesburgh Library")
To do this in a controller:
```javascript
  let vm = this
  let translated = vm.parentCtrl.$translate.instant("valueToTranslate")
```
