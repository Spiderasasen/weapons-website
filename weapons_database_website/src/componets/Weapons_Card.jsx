function Weapons_Card({weapons}) {
    return(
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
    )
}
export default Weapons_Card;