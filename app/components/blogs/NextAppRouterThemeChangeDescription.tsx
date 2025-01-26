import React from 'react';

const NextAppRouterThemeChangeDescription = () => {
  return (
    <div>
      <p>
        Implementing theme switching in a Next.js app is a common feature that enhances the user experience by allowing 
        users to toggle between light and dark themes. In this guide, we will walk through how to implement a dynamic 
        theme switcher using Next.js App Router while ensuring the theme persists even after the user refreshes the page 
        or revisits the app.
      </p>
      <h3 className="text-xl font-semibold mt-6">Understanding the Basics</h3>
      <p className="mt-2">
        Next.js is a powerful React framework that allows developers to build scalable and optimized web applications. 
        One of the cool features you can implement is theme switching. Theme switching is a design choice that lets 
        users switch between a light and dark mode, which has become a standard in modern web development.
      </p>
      <h3 className="text-xl font-semibold mt-6">Why Theme Persistence Matters</h3>
      <p className="mt-2">
        When building an app with theme switching, it&apos;s important to maintain the theme state between sessions. 
        This ensures a smooth user experience, as users won&apos;t need to select their preferred theme every time they visit 
        the site. Using cookies or local storage, we can store the user&apos;s theme preference, making it persist even after 
        the app is reloaded.
      </p>
      <h3 className="text-xl font-semibold mt-6">Steps to Implement Theme Switching in Next.js</h3>
      <ol className="mt-2 list-decimal pl-6">
        <li className="mt-2">
          Set up a Next.js project and install necessary packages.
        </li>
        <li className="mt-2">
          Create a context or state to manage the theme.
        </li>
        <li className="mt-2">
          Use localStorage to persist the theme preference.
        </li>
        <li className="mt-2">
          Apply the theme dynamically to your app using the App Router.
        </li>
        <li className="mt-2">
          Add a theme toggle button to switch between light and dark themes.
        </li>
        <li className="mt-2">
          Test the functionality to ensure that the theme persists across page reloads.
        </li>
      </ol>
      <h3 className="text-xl font-semibold mt-6">Code Example: Switching Theme in Next.js</h3>
      <p className="mt-2">
        Here&apos;s a simple implementation of a theme switcher in Next.js using React Context and localStorage.
      </p>
      <pre className="bg-gray-800 text-white p-4 rounded mt-4">
        {`
import { useEffect, useState } from "react";

const useTheme = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return [theme, toggleTheme];
};

const ThemeSwitcher = () => {
  const [theme, toggleTheme] = useTheme();

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  return (
    <button onClick={toggleTheme}>
      Switch to {theme === "light" ? "dark" : "light"} mode
    </button>
  );
};

export default ThemeSwitcher;
        `}
      </pre>
      <h3 className="text-xl font-semibold mt-6">Conclusion</h3>
      <p className="mt-2">
        By following these simple steps, you can add a theme switcher to your Next.js app with persistence. This 
        feature improves the user experience by making the app customizable and adaptable to different user preferences. 
        With Next.js, this implementation is simple, yet powerful, and ensures your app is modern and user-friendly.
      </p>
    </div>
  );
};

export default NextAppRouterThemeChangeDescription;
