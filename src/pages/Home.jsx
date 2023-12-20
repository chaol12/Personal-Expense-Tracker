import HomeIntro from "../components/HomeIntro";
import HomeGuide from "../components/HomeGuide";
import HomeFooter from "../components/HomeFooter";
// Design implemented using tailwind template: https://tailwindui.com/templates/salient
const Home = () => {


    return (
        <div>
            <HomeIntro/>
            <HomeGuide/>
            <HomeFooter/>
        </div>
    );
}

export default Home;

