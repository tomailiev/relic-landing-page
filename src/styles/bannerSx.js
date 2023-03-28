import banners from "../data/banners";

export default function getBannerSx(height, bannerName) {
    return {
        height: height,
        background: `url(${banners[bannerName]}) no-repeat center center, url(${banners[`${bannerName}_sm`]}) no-repeat center center`,
        backgroundSize: 'cover',
        transition: 'background-image 2s ease-in'
    }
}