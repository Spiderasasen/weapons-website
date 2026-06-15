import "../styles/header.css"
import {useNavigate} from "react-router-dom"

function Header() {
    const navigate = useNavigate();
    return(
        <header>
            <h1>Weapons Database</h1>
            <nav>
                <ul>
                    <li id={"home"} onClick={() => navigate("/")}>Home</li>
                    <li id={"weapons"}>Weapons</li>
                    <li id={"add-weapon"}>Add A Weapon</li>
                    <li id={"why"} onClick={() => navigate("/why")}>Why I Created This?</li>
                </ul>
            </nav>
        </header>
    )
}
export default Header;