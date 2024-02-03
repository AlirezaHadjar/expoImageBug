export type APIImage = {
  id: string;
  width: number;
  height: number;
  blur_hash: string;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
    small_s3: string;
  };
};
