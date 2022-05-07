import React, {
  FC,
  memo,
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "react";

import { Box, styled } from "@mui/material";
import { sample } from "lodash";

import NoImage from "assets/images/no-image.png";
import {
  FakeImagesEnum,
  RANDOM_IMAGES_ERROR_PRODUCT,
  RANDOM_IMAGES_ERROR_BANNER,
} from "constants/common.constants";

const BasicImage = styled("img")(() => ({
  maxWidth: "100%",
  height: "100%",
  display: "block",
  objectFit: "cover",
}));

interface PreviewImageProps
  extends React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  file?: File | null;
  resizedDimension?: {
    width: number;
    height: number;
  };
  borderRadius?: string | number;
  aspectRatio?: number;
  fakeImages?: FakeImagesEnum;
}

const fakeImagesUrl = {
  [FakeImagesEnum.PRODUCT]: RANDOM_IMAGES_ERROR_PRODUCT,
  [FakeImagesEnum.BANNER]: RANDOM_IMAGES_ERROR_BANNER,
};

const PreviewImage: FC<PreviewImageProps> = ({
  src,
  alt = "alt",
  file,
  resizedDimension,
  borderRadius = 1,
  aspectRatio,
  width,
  fakeImages = FakeImagesEnum.PRODUCT,
  ...props
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>();

  const imageRef = useRef<HTMLImageElement | null>(null);

  const handleRefImage = useCallback(() => {
    if (!imageRef.current) return;

    if (aspectRatio && imageRef.current.width) {
      imageRef.current.style.setProperty(
        "height",
        `${imageRef.current.width / aspectRatio}px`
      );
    }
  }, [aspectRatio]);

  const handleImageOnLoad = useCallback(() => {
    handleRefImage();
  }, [handleRefImage]);

  useEffect(() => {
    const reader = new FileReader();
    if (file && file instanceof File) {
      reader.onloadend = readerEvent => {
        if (!resizedDimension) {
          setPreviewUrl(readerEvent.target?.result?.toString());
        } else {
          const canvas = document.createElement("canvas");
          canvas.width = resizedDimension.width;
          canvas.height = resizedDimension.height;
          const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
          const resizedImage = new Image();

          resizedImage.onload = () => {
            ctx.drawImage(
              resizedImage,
              0,
              0,
              resizedDimension.width,
              resizedDimension.height
            );
            const dataUrl = canvas.toDataURL(file.type);

            setPreviewUrl(dataUrl);
          };
          resizedImage.src = readerEvent.target?.result?.toString() || "";
        }
      };
      reader.readAsDataURL(file);
    } else if (typeof file === "string") {
      if (previewUrl === file) {
        return;
      }

      setPreviewUrl(file);
    } else {
      if (previewUrl === null) return;

      setPreviewUrl(null);
    }
  }, [file, previewUrl, resizedDimension]);

  const imageSrc = useMemo(() => {
    if (!src) return "";
    if (src.match(/^(blob:)?https?:\/\/[\w/:%#$&?()~.=+-]+$/g)) {
      return src;
    }
    return `${process.env.REACT_APP_PATH_UPLOAD + src}`;
  }, [src]);

  return (
    <Box width="100%">
      <BasicImage
        src={previewUrl || imageSrc || NoImage}
        alt={alt}
        {...props}
        sx={{
          borderRadius,
          width: width || "100%",
        }}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null;
          currentTarget.src = sample(fakeImagesUrl[fakeImages]) || "";
        }}
        ref={image => {
          if (!image) {
            return;
          }

          imageRef.current = image;

          image.onload = handleImageOnLoad;

          if (image.complete) {
            handleImageOnLoad();
          }
        }}
        style={{
          height: props.height,
        }}
      />
    </Box>
  );
};

export default memo(PreviewImage);
