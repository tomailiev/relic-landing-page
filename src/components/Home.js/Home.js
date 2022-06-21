import Intro from "../Text/Intro";
import Banner from "./Banner";
import SubscribeForm from "./SubscribeForm";
import Title from "./Title";
import bgPic from '../../imgs/10bg_grayscale.jpg';


const Home = () => {
    return (
        <>
            <Title />
            <Banner textComponent={<Intro />} bgUrl={bgPic} height={600} />
            <SubscribeForm />
        </>
    );
};

export default Home;