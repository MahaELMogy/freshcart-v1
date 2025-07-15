import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Spinners from "../spinners/spinners";

export default function UseToGetData(endPoint) {
  let { data, isLoading, isFetching, error } = useQuery({
    queryKey: [endPoint],
    queryFn: () => {
      return axios.get(`https://ecommerce.routemisr.com/api/v1/${endPoint}`);
    },
    select: (data) => {
      return data?.data?.data;
    },
    // enabled: !!endPoint,
    // staleTime: 5 * 60 * 1000,
    // cacheTime: 10 * 60 * 1000,
    // refetchOnWindowFocus: false,
    // refetchOnMount: true,
    // retry: 1,
    // placeholderData: [], // Provide placeholder data
    // keepPreviousData: false, // Don't keep previous data
  });

  return { data, isLoading, error, isFetching };
}
