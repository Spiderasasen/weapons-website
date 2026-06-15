import Header from "../componets/Header.jsx"
import "../styles/home.css"
import "../styles/main.css"

function Home() {
    return(
        <div>
            <Header/>

            {/*main code*/}
            <main className="home">
                <h1>Welcome to the Weapons Database!</h1>

                <div className="home-text">
                    <p>This is a place where you can find information about various weapons through human history.</p>
                    <p>From ancient times to modern warfare, we have a comprehensive collection of weapons.</p>
                </div>

                <div className="home-questions">
                    <h3>Here are some common asked questions:</h3>
                    <ul>
                        <li>
                            What types of weapons are included in the database?
                            <span>We have all types of weapons here, from ancient swords to modern firearms. We  even have explosives for those that are more curious for weapons that go Boom!</span>
                        </li>
                        <li>
                            What is the purpose of the Database?
                            <span>Well people are always curious on weapons. some are like me, where we want to see how weapons have evolved over time.</span>
                        </li>
                        <li>
                            How can I contribute to the Database?
                            <span>This is easy my friend. Just click Add A Weapon, and you will automatically add any weapon you want.</span>
                        </li>
                        <li>
                            What if I dont see the weapon I want?
                            <span>Dont worry my friend. Just click Add A Weapon, and you will automatically add any weapon you want.</span>
                        </li>
                        <li>
                            Whats the deal with the descriptions?
                            <span>Yeah sometimes adding weapons can be a bit boring. But we try to make it as interesting as possible. But fear not. just because we are having fun with the description does not mean we will be inaccurate.</span>
                        </li>
                    </ul>
                </div>
            </main>
        </div>
    )
}
export default Home;