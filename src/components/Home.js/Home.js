import Intro from "../Text/Intro";
import Banner from "./Banner";
import SubscribeForm from "./SubscribeForm";
import Title from "./Title";
import bgPic from '../../imgs/10bg.jpg';


const Home = () => {
    return (
        <>
            <Title />
            <Banner textComponent={<Intro />} bgUrl={bgPic} />
            <SubscribeForm />
        </>
    );
};

export default Home;