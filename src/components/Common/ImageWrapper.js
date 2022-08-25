import { useEffect, useState } from "react";
import { getLink } from "../../utils/firebase/firestore-funcs";

const ImageWrapper = ({ placeholderSrc, picUrl, ...props }) => {

    const [imgSrc, setImgSrc] = useState(placeholderSrc);
    /*
    .loading {
  filter: blur(10px);
  clip-path: inset(0);
}
.loaded {
  filter: blur(0px);
  transition: filter 0.5s linear;
}
*/

    useEffect(() => {
        getLink(picUrl)
            .then(val => {
                const img = new Image();
                img.src = val;
                img.onload = () => setImgSrc(val);
            })
            .catch(console.error);
    }, [picUrl]);

    return (
        <img
            {...{ src: imgSrc, ...props }}
            alt={props.alt || ""}
            style={imgSrc === placeholderSrc ? { filter: 'blur(10px)', clipPath: 'inset(0)' } : { filter: 'blur(0px)', transition: 'filter 0.3s linear' }}
        />
    );
};

export default ImageWrapper;