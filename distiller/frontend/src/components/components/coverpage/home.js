import React from "react";
import "./home.css";

function Home() {
    return (
        <div className="HomePage">
            <div className="title">
                <h1>CARE</h1>
            </div>
            <div className="description">
                <h2>Want to vent your problems and meet new people? CARE allows you to let out your emotions annonomously and help you form a support group.</h2>
            </div>

            <div className="about">
                <h1>ABOUT US</h1>
            </div>

            <div className="adis">
                <h2>We are a group of college students with the goal of helping people form a supportive community where they can freely release their emotions.</h2>
            </div>

            <div className="button">
                <a class="Homebtn">Contact</a>
            </div>
        </div>
    )
}
export default Home;