import React, {useEffect, useState} from 'react';

import {Avatar} from './avatar';

const AvatarBase64 = (props: any) => {
  const {size, image} = props;
  const [imageBase64, setImageBase64] = useState(image);

  const imageTobase64 = async (imagePath: any, callback: any) => {
    await fetch(imagePath, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      referrerPolicy: 'no-referrer',
    })
      .then((response) => response.blob())
      .then((blob) => {
        callback(URL.createObjectURL(blob));
      });
  };

  useEffect(() => {
    if (image) {
      // eslint-disable-next-line
      imageTobase64(image, async (dataUrl: any) => {
        await setImageBase64(dataUrl);
      });
    } else {
      setImageBase64(image);
    }
  }, []);

  return <Avatar image={imageBase64} size={size} />;
};

export {AvatarBase64};
