import Header from "../componets/Header.jsx";
import "../styles/main.css"
import "../styles/why.css"

function Why() {
    return(
        <div>
            <Header/>

            <main className="why">
                <h1>Why I Created This?</h1>
                <div className="why-text">
                    <p>Well we got 2 options and it really depends on wht you want to think</p>
                    <ol>
                        <li><a href={"#Weapons"}>I really like Weapons</a></li>
                        <li><a href={"#full-stack"}>I also wanted to create something full stack</a></li>
                    </ol>
                </div>
                <div id="Weapons">
                    <h2>I really love Weapons</h2>
                    <p>
                        Ok, if you grew up playing video games like Call of Duty, Battlefield, or any other first-person shooter, you probably have a deep appreciation for the weapons used in these games.
                        All of these games later grew more when I started shooting BB guns in my backyard.
                        The idea fascinated me.
                        How many times can you look at a weapon and say "Yeah this is the Dragonov or the SVD made from Kelnesnokov", because I bet you unless your a big weapon guy like me, maybe never.
                        And not only do I like guns, but knives, swords, and other weapons too.
                        I've started collecting Knives and BB guns and some katana's.
                        The reason why?
                    </p>
                        <ul>
                            <li>Knives are cheap, so I can but a bunch if i want too</li>
                            <li>BB guns are the only "Allowed" guns in my neighborhood. well all guns are allowed, just i can shoot them there or else the police will be called.</li>
                            <li>Katana's are just gorgeous</li>
                            <li>I dont have very nice weapon money</li>
                        </ul>
                    <p>
                        These reason are very valid.
                        Come on, you tell me you have the money to buy a the new FN Arka and have enough to pay your bills?
                        because if so, mind if we be friends?
                        But yeah this is 1 reason why I created this website.
                    </p>
                </div>
                <div id="full-stack">
                    <h2>Full Stack Development</h2>
                    <p>
                        Yeah this might be boring, but if you got time here is what it is.
                        Full Stack Development is basically me creating the website from scratch and also make it advance.
                        But you might be wondering, "Hey but i can do that with basic HTML and call it a day." No you cant.
                        well you can but let me explain.
                        Full stack development is a combination of 3 things:
                    </p>
                        <ul>
                            <li>
                                Frontend Development
                                <span>basically what you are seeing now.</span>
                            </li>
                            <li>
                                Backend Development
                                <span>Everything you cant see, but it is very important.</span>
                            </li>
                            <li>
                                Database Development
                                <span>Where all the data is stored.</span>
                            </li>
                        </ul>
                    <p>
                        Dont worry you dont need to fully understand everything.
                        But just understand that Fullstack Development like the construction of a house
                    </p>
                        <ul>
                            <li>Database is the blueprints</li>
                            <li>backend is all your pipes and electrical elements</li>
                            <li>frontend is the actual house</li>
                        </ul>
                    <p>
                        See, not really as simple just getting HTML done and boom magic, no, there is a lot of work here to make it all work.
                        So yeah. that's one reason why I created this website.
                    </p>
                </div>
            </main>
        </div>
    )
}
export default Why;