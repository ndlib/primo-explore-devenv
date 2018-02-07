var module_list = []
// This function is required to be called in all custom modules, otherwise it will not be loaded
function registerModule(name) {
    module_list.push(name)
}
