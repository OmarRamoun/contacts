import React, {useState, useCallback} from 'react';
import {ImageBackground} from 'react-native';

import type {BoxProps} from './box';
import {Flex} from './flex';
import {Spinner} from './spinner/spinner';

interface MediaPreviewops extends BoxProps {
  src: string;
  alt: string;
  onLoad?: () => void;
  width?: number | string;
  height?: number | string;
  scalingMode?: 'cover' | 'contain';
  grow?: number | 'inherit';
  loading?: boolean;
}

const Image = ({
  src,
  alt,
  width = '100%',
  height = '100%',
  scalingMode,
  onLoad,
  grow = 1,
  loading,
}: MediaPreviewops) => {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState<boolean>(false);

  const handleLoaded = useCallback(() => {
    setLoaded(true);
    if (onLoad) onLoad();
  }, [onLoad]);

  if (error) return null;

  return (
    <Flex flexGrow={grow} width={width} height={height}>
      <ImageBackground
        onLoad={handleLoaded}
        onError={() => setError(true)}
        source={{uri: src}}
        resizeMode={scalingMode || 'cover'}
        style={{width: '100%', height: '100%', opacity: loading ? 0.5 : 1}}
        accessibilityLabel={alt}>
        <Flex flexGrow={1} alignItems="center" justifyContent="center">
          {!loaded || loading ? <Spinner color="blue" size="md" /> : null}
        </Flex>
      </ImageBackground>
    </Flex>
  );
};

export {Image};
