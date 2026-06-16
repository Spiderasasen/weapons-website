import Header from "../componets/Header.jsx"
import "../styles/main.css"
import { useState, useEffect } from "react"

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
                <div className="weapons-grid">
                    {weapons.map(weapon => (
                        <div className="weapon-card" key={weapon.weapon_id}>
                            <h2>{weapon.name}</h2>
                            <p><strong>Type:</strong> {weapon.weapon_type}</p>
                            <p><strong>Subtype:</strong> {weapon.weapon_subtype}</p>
                            <p><strong>Country:</strong> {weapon.country}</p>
                            <p><strong>Service:</strong> {weapon.weapon_service}</p>
                            <p><em>Created: {weapon.year_of_creation}</em></p>
                            <p><em>Years in Service: {weapon.years_of_service}</em></p>
                            <p>{weapon.description}</p>
                            <a href={weapon.source_link}>Source located here</a>
                            <img src={weapon.image_link} alt={"image of " + weapon.name}/>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    )
}
export default Weapons;