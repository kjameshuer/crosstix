import React from "react";
import './Home.scss'
import background_hero_one from 'images/home-background-one.jpeg';
import { useSelector } from "react-redux";
import MyProjects from "./components/MyProjects";

const Home = () => {

    const { isLoggedIn } = useSelector( state => state.authInfo)

    const heroOneStyles = {
        background: `url(${background_hero_one})`
    }

    const styles = {
        heroOneStyles
    }

    return (
        <div className="Home">
            <div style={styles.heroOneStyles} className="Home__hero_one">               
            </div>
           <MyProjects isLoggedIn={isLoggedIn} />
        </div>
    )
}

export default Home