# React Counters

By building this simple application, we'll explore the concepts of state, the differences between props and state and how we can change state from within a component using events.

For this exercise, we are going to build a React app from scratch that will serve as an [Abacus](https://en.wikipedia.org/wiki/Abacus) of sorts.

Go ahead and clone [this repo](https://git.generalassemb.ly/WC-SEI-817/react-counters) now. This will be the code we start with.

```bash
$ git clone https://git.generalassemb.ly/WC-SEI-817/react-counters
$ cd react-counters
$ npm install
$ npm start
```

## Start with a Mock

The first step in creating a React app is to start with a [mock](https://facebook.github.io/react/docs/thinking-in-react.html#start-with-a-mock) and some sample data.

### You Do: Identify Components 

Look at this [deployed version of the application](http://react-counter.surge.sh/) and use React Dev Tools to answer the following questions:

- What components is this application built of?
- How do those components relate to one another?

### Components

<details>
  <summary><strong>Open to see component hierarchy</strong></summary>

  <h4>Component Hierarchy</h4>

Given these breakdowns we have a component hierarchy that looks like this:

  - `App`
    - `Header`
    - `CounterList`
      - `Counter`

</details>

### Sample Data

In the final application, we'll be able to use the two buttons in the header to increase and decrease the number of individual counters on the page. However, to start, we're going to feed the number of counters into the application as hard-coded data.

The below Javascript will go in our `index.js` file and will later be passed into our `App` component as props:

```js
const data = {
  counters: 5
}
```

## Building a Static Version of the App

First we will [build a static version](https://facebook.github.io/react/docs/thinking-in-react.html#step-2-build-a-static-version-in-react) of the app passing all of our data by `props`. This makes it much easier to avoid getting bogged down in tricky details of functionality while implementing the visual appearance of the UI.

### You Do: Set Up the `App` Component and `index.js`

Try to get it so that your `App` component displays the number "5" (which will be the number of counters) underneath the `Header` component (provided in the starter code).

<details>
	<summary>Solution</summary>
	
`src/index.js`:

```js
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

const data = {
  counters: 5
};

ReactDOM.render(<App data={data} />, document.getElementById("root"));
```
	
`src/App.js`:

```js
import React, { Component } from "react";
import Header from "./Header";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <h4>{this.props.data.counters}</h4>
      </div>
    );
  }
}

export default App;
```
</details>

### You Do: Set Up the `CounterList` and `Counter` Components

Your `CounterList` component should take the number of counters as a prop (how will you pass this number from `App` to `CounterList`?) and then render that many versions of your `Counter` component. Your `Counter` component will render `"Counter: 0"` inside of an `<h4>` and two buttons (one for incrementing and one for decrementing).

**Tip:** You can render an array of components! It looks something like this:

```js
// This is an example, don't copy-paste this code into your Counters app
class List extends Component {
  render() {
    const list = [<Item />, <Item />, <Item />];

    return <div className="list">{list}</div>;
  }
}
```

<details>
	<summary>Solution</summary>
	
`App.js`:

```js
import React, { Component } from "react";
import Header from "./Header";
import CounterList from "./CounterList";

class App extends Component {
    render() {
      return (
        <div className="App">
          <Header />
          <CounterList counters={this.state.counters} />
        </div>
      );
    }
  }

export default App;
```

`CounterList.js`:

```js
import React, { Component } from "react";
import Counter from "./Counter";

class CounterList extends Component {
  render() {
    const counters = [];
    for (let index = 0; index < this.props.counters; index++) {
      counters.push(<Counter />);
    }
    return <div className="Counter-row">{counters}</div>;
  }
}

export default CounterList;
```

`Counter.js`:

```js
import React, { Component } from "react";

class Counter extends Component {
  render() {
    return (
      <div className="Counter">
        <h4>Counter: 0</h4>
        <button>Decrement</button>
        <button>Increment</button>
      </div>
    );
  }
}

export default Counter;

import React, { Component } from "react";
import Header from "./Header";
import CounterList from "./CounterList";
```

</details>


## Identify the Minimal Representation of UI State 

At the moment all of our data is being passed through our app as props. We know, however, that we will have data that changes as a user interacts with the app. That information needs to live in our application's state. We need to figure out the [minimal amount of state](https://facebook.github.io/react/docs/thinking-in-react.html#step-3-identify-the-minimal-but-complete-representation-of-ui-state) that our app needs and what components need it.

### You Do: What information needs to live in state? 

This may include a value(s) that we have not yet included in our code.

<details>
  <summary>Solution</summary>

For our app to work we need two pieces of data in `state`:
- `numberOfCounters` (the number of counters to render in our `App` component)
- `count` (the count of an individual `Counter` component)

</details>

## Identify Where Your State Should Live 

Central to [deciding where state lives](https://facebook.github.io/react/docs/thinking-in-react.html#step-4-identify-where-your-state-should-live) is the idea of **one way data flow**. The React documentation describes this step as "often the most challenging part for newcomers to understand" since we are learning to distinguish state from props.   

Our task here is to find the proper place for each part of our application's state.

## Working with State 

Lets start with our `Counter` component. Right now, it doesn't have any state and it isn't passed any props. What we want is for the `Counter` component to keep track of the count in state. Then, whenever someone clicks one of the two buttons we'll increase or decrease that number.

### You Do: Update our `Counter` Component

Lets update the `Counter` component so that it is using state to track the count internally, as well as making it possible to click either of the buttons in order to change the `count` number.

<details>
	<summary>Solution</summary>
	
```diff
import React, { Component } from "react";

class Counter extends Component {
+    state = {
+      count: 0
+    };	
+
+  increaseCount = () => {
+    const count = this.state.count + 1;
+
+    this.setState({
+      count: count
+    });
+  }
+
+  decreaseCount = () => {
+    const count = this.state.count - 1;
+
+    this.setState({
+      count: count
+    });
+  }

  render() {
    return (
      <div className="Counter">
        <h4>Counter: {this.state.count}</h4>
-        <button>Decrement</button>
+        <button onClick={this.increaseCount}>Decrement</button>
-        <button>Increment</button>
+        <button onClick={this.decreaseCount}>Increment</button>
      </div>
    );
  }
}

export default Counter;
```
</details>

Now that we've made it so our `Counter` component is tracking its count inside of state, we need to update our application so that the prop determining the number of counters is controlled by state.

This segues nicely into the idea of Container and Presentational Components.

## Container & Presentational Components 

The above workflow has led to the popular component architecture of distinguishing [Container and Presentational Components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0).

**Container components** are components whose job it is to exclusively manage state and and render presentational components, passing them the data they need as props. None of our components are container components yet because none of them exclusively manage state AND render presentational components.

**Presentational components** are components that render themselves based solely on the information that they receive from props. At this point, all of our components are presentational.

This leads to a very nice division where state management and presentation are cleanly separated.

Our `App` component could be a **container component!**

### You Do: Update `App`

We want to update `App` so that it is tracking the number of counters to render in its `state`. To do that, we need to update our component.

Make it so that the `App` component is tracking the number of counters (5) inside state and passing that as a prop to the `CounterList` component.

<details>
	<summary>Solution</summary>
	
```diff
// App.js
import React, { Component } from "react";
import Header from "./Header";
import CounterList from "./CounterList";

class App extends Component {
+  state = {
+    counters: 5
+  }

  render() {
    return (
      <div className="App">
        <Header />
-        <CounterList counters={this.props.data.counters} />
+        <CounterList counters={this.state.counters} />
      </div>
    );
  }
}

export default App;
```
</details>

Our `CounterList` component is now rendering the number of counters in the state of our `App` component, but we don't have a way to update our state!

Just like in your first project, we're going to update the state of our application in response to events. In this particular case, we'll update state (the number of counters to render) when someone clicks one of the two buttons in the header.

There's just one issue: those two buttons are in our `Header` component (a presentational component).

## Add Inverse Data Flow 

We can give presentational components behavior by passing callback functions to them as props. By binding those callback functions to the parent, container component we can use them to update our state. In React, we refer to this as [inverse data flow](https://facebook.github.io/react/docs/thinking-in-react.html#step-5-add-inverse-data-flow). We will need two functions defined in `App` and passed to `Header`.

### You Do: Increase and Decrease the Number of Counters

Define an `increaseCounters()` method and `decreaseCounters()` method on the `App` component (they'll be a lot like the `increaseCount()` and `decreaseCount()` methods of our `Counter` component).

Once your two methods are defined, pass them both to the `Header` component as props. What do you need to do inside of `Header` to make it so that when someone clicks on one of the buttons the number of counters increases or decreases? And, let's be sure to prevent the number of counters from going into negative numbers.

<details>
	<summary>Solution</summary>
	
`App.js`:

```diff
import React, { Component } from "react";
import Header from "./Header";
import CounterList from "./CounterList";

class App extends Component {
  state = {
-    counters: 5
+    counters: 0
  }

+  increaseCounters = () => {
+    const counters = this.state.counters + 1;
+    this.setState({
+    	counters: counters
+    })
+  }

+  decreaseCounters = () => {
+    const counters = this.state.counters - 1;
+    this.setState({
+    	counters: counters
+    })
+  }

  render() {
    return (
      <div className="App">
-        <Header />
+        <Header 
+          increaseCounters={this.increaseCounters} 
+          decreaseCounters={this.decreaseCounters} />
        <CounterList counters={this.state.counters} />
      </div>
    );
  }
}

export default App;
```

`Header.js`:

```diff
import React, { Component } from "react";

class Header extends Component {
  
+  handleIncrement = () => {
+    this.props.increaseCounters()
+  }

+  handleDecrement = () => {
+    this.props.countersCount > 0 ?
+      this.props.decreaseCounters():
+      null
+  }

  render() {
    return (
      <header className="App-header">
        <h1 className="App-title">React Counters</h1>
-	<button>+</button>
+        <button onClick={ this.handleIncrement }>+</button>
-        <button>-</button>
+	<button onClick={ this.handleDecrement }>-</button>
      </header>
    );
  }
}

export default Header;
```
</details>
