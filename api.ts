import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { APIImage } from "./types";

export const useImage = (page: number) => {
  const query = useQuery({
    queryKey: ["image", page],
    queryFn: async () => {
      console.log("calling API");
      const response = await axios.get<APIImage[]>(
        "https://api.unsplash.com/photos",
        {
          params: {
            client_id: "DwPwhno4QW5S3C5mQCVb66GzOdhMDy5anRKV35kjRBg",
            page,
            per_page: 100,
          },
        }
      );
      return response.data;
    },
  });

  return query;
};
