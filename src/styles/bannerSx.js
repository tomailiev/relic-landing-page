import banners from "../data/banners";

export default function getBannerSx(height, bannerName) {
    return {
        height: height,
        background: `url(${banners[bannerName][`${bannerName}Banner`]}) no-repeat center center, url(${banners[bannerName][`${bannerName}Banner_sm`]}) no-repeat center center`,
        backgroundSize: 'cover',
        transition: 'background-image 2s ease-in'
    }
}