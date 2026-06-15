import "../styles/header.css"
import {useNavigate} from "react-router-dom"

function Header() {
    const navigate = useNavigate();
    onclick = (e) => {
        if (e.target.id !== "home") {
            navigate(`/${e.target.id}`)
        }
        else {
            navigate("/")
        }
    }

    return(
        <header>
            <h1>Weapons Database</h1>
            <nav>
                <ul>
                    <li id={"home"}>Home</li>
                    <li id={"weapons"}>Weapons</li>
                    <li id={"add-weapon"}>Add A Weapon</li>
                    <li id={"why"}>Why I Created This?</li>
                </ul>
            </nav>
        </header>
    )
}
export default Header;