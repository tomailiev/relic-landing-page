import Banner from "./Banner";
import SubscribeForm from "./SubscribeForm";
import Title from "./Title";
import homeBanner from '../../assets/banners/homeBannerWithNoTitle.jpg';

const Home = () => {
    return (
        <>
            {/* <Title /> */}
            <Banner bgPic={homeBanner} height={'100vh'} children={<Title />} />
            <SubscribeForm />
        </>
    );
};

export default Home;