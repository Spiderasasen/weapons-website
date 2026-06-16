import "../styles/weapons_Card.css"

function Weapons_Card({weapons}) {
    const handleImageLoad = (e) => {
        const img = e.target;
        if (img.naturalHeight > img.naturalWidth) {
            img.classList.add("portrait");
        } else {
            img.classList.add("landscape");
        }
    };

    return(
        <div className="weapons-grid">
            {weapons.map(weapon => (
                <div className={`weapon-card ${weapon.weapon_type.toLowerCase()}`}>
                <h2>{weapon.name}</h2>
                    <p><strong>Type:</strong> {weapon.weapon_type}</p>
                    <p><strong>Subtype:</strong> {weapon.weapon_subtype}</p>
                    <p><strong>Country:</strong> {weapon.country}</p>
                    <p><strong>Service:</strong> {weapon.weapon_service}</p>
                    <p><em>Created: {weapon.year_of_creation}</em></p>
                    <p><em>Years in Service: {weapon.years_of_service}</em></p>
                    <p>{weapon.description}</p>
                    <a id="Weapon_link" href={weapon.source_link}>Source located here</a>
                    <div className="weapon-img-wrapper">
                        <img src={weapon.image_link} alt={"image of " + weapon.name} onLoad={handleImageLoad}/>
                    </div>
                </div>
            ))}
        </div>
    )
}
export default Weapons_Card;