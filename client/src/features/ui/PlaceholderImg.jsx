import React, { useState, useEffect } from 'react';

const PlaceholderImg = ({ placeholderSrc, src, ...props }) => {
    const [imgSrc, setImgSrc] = useState(placeholderSrc || src);

    useEffect(() => {
        // console.log('src: ', src);
        const img = new Image();
        img.src = src;
        img.onload = () => {
            setImgSrc(src);
        };
        // img.onerror = (event) => {
        //     console.log(event);
        // }
    }, [src]);

    return (
        <img
            {...{ src: imgSrc, ...props }}
            alt={props.alt || ''}
        />
    );
};

export default PlaceholderImg;