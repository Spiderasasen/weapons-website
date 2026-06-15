import Header from "../componets/Header.jsx";

function Why() {
    return(
        <div>
            <Header/>

            <main className="why">
                <h1>Why I Created This?</h1>
                <div className="why-text">
                    <p>Well we got 2 options and it really depends on wht you want to think</p>
                    <ol>
                        <li><a>I really like Weapons</a></li>
                        <li><a>I also wanted to create something full stack</a></li>
                    </ol>
                </div>
                <div id="Weapons" className={"Weapons"}></div>
                <div id="full-stack" className={"full-stack"}></div>
            </main>
        </div>
    )
}
export default Why;