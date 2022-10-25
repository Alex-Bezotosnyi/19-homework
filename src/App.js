import "./style/normalize.css";
import "./style/style.css"
import React from "react";
import Timer from "./scripts/Timer"

function App() {
    return (
        <main>
            <header>
                <h1>Homework #19 - ReactJS. Hooks (Part 2)</h1>
            </header>
            <Timer/>
            <footer className="footer">
                <h3>Homework #19</h3>
            </footer>
        </main>
    );
}

export default App;
