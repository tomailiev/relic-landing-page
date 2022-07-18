import Banner from "./Banner";
// import SubscribeForm from "./SubscribeForm";
import Title from "./Title";
import homeBanner from '../../assets/banners/homeBannerWithNoTitle.webp';
import ContentSection from "../Common/ContentSection";

const Home = () => {
    return (
        <>
            {/* <Title /> */}
            <Banner bgPic={homeBanner} height={'88vh'} children={<Title />} />
            <ContentSection />
            {/* <SubscribeForm /> */}
        </>
    );
};

export default Home;