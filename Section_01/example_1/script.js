// var h1 = React.createElement(Element name, Properties, "Content of element")

var h1 = React.createElement('h1', null, "Hello From React")

//we have created an element by the help of react

//now we want to show this component(made by react) in the frontend, here React DOM will do the job of linking the components with the frontend.
var parent = document.querySelector("#parent") 

// if we want to make this parent div as root:
var root = ReactDOM.createRoot(parent)

root.render(h1)

// we have created an elemnt h1 and 
// then we have made the parent as root
// and then we have rendered the h1 under the root.