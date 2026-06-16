import Header from "../componets/Header.jsx"
import "../styles/main.css"
import { useState, useEffect } from "react"
import Weapons_Card from "../componets/Weapons_Card.jsx";

function Weapons() {
    const [weapons, setWeapons] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:8080/weapons")
        .then(res => res.json())
        .then(data => {
            setWeapons(data);
            setLoading(false);
        })
        .catch(err => {
            console.log(err);
            setLoading(false);
        });
    })

    if(loading) return <h1>Loading...</h1>

    return(
        <div>
            <Header/>

            <main>
                <h1>Weapons Database</h1>
                <Weapons_Card weapons={weapons}/>
            </main>
        </div>
    )
}
export default Weapons;