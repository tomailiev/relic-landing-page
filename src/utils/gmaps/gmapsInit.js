import { Loader } from '@googlemaps/js-api-loader';

const loader = new Loader({
    apiKey: 'AIzaSyBmL63AhEeq4SB98zof0X-eLGtoserr6f8',
    version: "weekly",
    libraries: ["places"]
});

export default loader;