import React, { useState, useEffect } from 'react';

const PlaceholderImg = ({ placeholderSrc, src, ...props }) => {
    const [imgSrc, setImgSrc] = useState(placeholderSrc || src);

    useEffect(() => {
        let img = new Image();
        // console.log('src: ', src);
        img.src = src;
        img.onload = () => {
            setImgSrc(src);
        };
        // img.onerror = (event) => {
        //     console.log(event);
        // }
        return () => {
            if ( ! img ) {
                return;
            }
            img.onload = function(){};
            img = null;
        }
    }, [src]);

    return (
        <img
            {...{ src: imgSrc, ...props }}
            alt={props.alt || ''}
        />
    );
};

export default PlaceholderImg;