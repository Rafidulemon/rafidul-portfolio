"use client";

import React from "react";

const JS_DOM_Blog = () => {
  return (
    <div className="text-gray-800 dark:text-gray-300 max-w-4xl mx-auto p-4 md:p-8 leading-relaxed">
      <h1 className="text-3xl font-bold mb-4">
        JavaScript DOM (Document Object Model) Explained: A Beginner-Friendly Guide
      </h1>

      <p className="mb-4">
        The DOM (Document Object Model) is one of the most important topics in web development.
        If you&apos;re starting your journey with JavaScript and front-end development, understanding
        the DOM is crucial. In this blog, you&apos;ll learn what the DOM is, how it works, and how to
        manipulate HTML elements with JavaScript.
      </p>

      <h2 className="text-xl font-semibold mt-6">📘 What is the DOM?</h2>
      <p className="mb-4">
        The DOM is a programming interface that allows JavaScript to interact with and modify
        HTML or XML documents. When your web page loads, the browser converts the HTML into a
        JavaScript-accessible structure called the DOM.
      </p>
      <p className="mb-4">
        Think of the DOM as a tree-like structure where each HTML element is a &apos;node&apos; that you
        can access and manipulate.
      </p>

      <h3 className="text-lg font-semibold mt-4">Simple Example:</h3>
      <pre className="bg-gray-900 text-white p-4 rounded-md mt-2 text-sm overflow-x-auto">
        {`<!DOCTYPE html>
<html>
  <head>
    <title>My Page</title>
  </head>
  <body>
    <h1>Hello World</h1>
    <p>This is a paragraph.</p>
  </body>
</html>`}
      </pre>
      <p className="mt-2">DOM Tree representation:</p>
      <pre className="bg-gray-800 text-white p-4 rounded-md text-sm overflow-x-auto">
        {`- Document
  └── html
      ├── head
      │   └── title
      └── body
          ├── h1
          └── p`}
      </pre>

      <p className="mt-2">
        Each tag becomes a node that you can access using JavaScript.
      </p>

      <h2 className="text-xl font-semibold mt-6">🔍 Accessing Elements in the DOM</h2>
      <p>You can access and select HTML elements using different DOM methods:</p>

      <h3 className="text-lg font-semibold mt-4">1. getElementById()</h3>
      <p>Selects a single element with the given ID.</p>
      <pre className="bg-gray-900 text-white p-4 rounded-md mt-2 text-sm overflow-x-auto">
        {`<p id="demo">Hello</p>

const para = document.getElementById("demo");`}
      </pre>

      <h3 className="text-lg font-semibold mt-4">2. getElementsByClassName()</h3>
      <p>Returns a collection (array-like) of elements with the same class.</p>
      <pre className="bg-gray-900 text-white p-4 rounded-md mt-2 text-sm overflow-x-auto">
        {`<p class="text">One</p>
<p class="text">Two</p>

const texts = document.getElementsByClassName("text");`}
      </pre>

      <h3 className="text-lg font-semibold mt-4">3. getElementsByTagName()</h3>
      <p>Selects all elements with a specific tag name.</p>
      <pre className="bg-gray-900 text-white p-4 rounded-md mt-2 text-sm overflow-x-auto">
        {`const allDivs = document.getElementsByTagName("div");`}
      </pre>

      <h3 className="text-lg font-semibold mt-4">4. querySelector / querySelectorAll</h3>
      <p>These are modern and powerful selectors (like CSS):</p>
      <pre className="bg-gray-900 text-white p-4 rounded-md mt-2 text-sm overflow-x-auto">
        {`const firstPara = document.querySelector("p");
const allParas = document.querySelectorAll("p");`}
      </pre>

      <h2 className="text-xl font-semibold mt-6">✍️ Changing Content and Styles</h2>

      <h3 className="text-lg font-semibold mt-4">Change Text:</h3>
      <pre className="bg-gray-900 text-white p-4 rounded-md mt-2 text-sm overflow-x-auto">
        {`const title = document.getElementById("demo");
title.textContent = "New Text";`}
      </pre>

      <h3 className="text-lg font-semibold mt-4">Change HTML:</h3>
      <pre className="bg-gray-900 text-white p-4 rounded-md mt-2 text-sm overflow-x-auto">
        {`title.innerHTML = "<strong>Bold Text</strong>";`}
      </pre>

      <h3 className="text-lg font-semibold mt-4">Change CSS Style:</h3>
      <pre className="bg-gray-900 text-white p-4 rounded-md mt-2 text-sm overflow-x-auto">
        {`title.style.color = "red";
title.style.fontSize = "20px";`}
      </pre>

      <h2 className="text-xl font-semibold mt-6">➕ Creating and Adding New Elements</h2>
      <pre className="bg-gray-900 text-white p-4 rounded-md mt-2 text-sm overflow-x-auto">
        {`const newDiv = document.createElement("div");
newDiv.textContent = "I'm new!";
document.body.appendChild(newDiv);`}
      </pre>

      <h2 className="text-xl font-semibold mt-6">❌ Removing Elements</h2>
      <pre className="bg-gray-900 text-white p-4 rounded-md mt-2 text-sm overflow-x-auto">
        {`const para = document.querySelector("p");
para.remove();`}
      </pre>

      <h2 className="text-xl font-semibold mt-6">🧨 Handling Events</h2>
      <p>Events like clicking, typing, hovering can be handled using <code>addEventListener</code>:</p>
      <pre className="bg-gray-900 text-white p-4 rounded-md mt-2 text-sm overflow-x-auto">
        {`<button id="btn">Click Me</button>
<p id="message"></p>

const button = document.getElementById("btn");
const message = document.getElementById("message");

button.addEventListener("click", function () {
  message.textContent = "Button was clicked!";
});`}
      </pre>

      <h2 className="text-xl font-semibold mt-6">🔁 Real-world Practice Projects</h2>
      <ul className="list-disc pl-6 space-y-1 mt-2">
        <li>Counter App (Increase/Decrease number)</li>
        <li>Theme Toggle (Light/Dark mode)</li>
        <li>To-Do List (Add, mark, delete tasks)</li>
        <li>Form Validation (Check user inputs before submit)</li>
        <li>Live Preview (Show text from input in real-time)</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6">🎓 Conclusion</h2>
      <p className="mb-4">
        The DOM is a powerful way to make your web pages interactive and dynamic.
        Start with selecting and modifying elements, and gradually practice with event handling
        and creating elements. With enough practice, manipulating the DOM will feel second nature!
      </p>

      <p className="mt-2 font-semibold text-lg">Happy coding! 🚀</p>
    </div>
  );
};

export default JS_DOM_Blog;
