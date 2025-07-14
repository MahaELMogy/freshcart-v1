import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Spinners from "../spinners/spinners";

export default function UseToGetData(endPoint) {
  let { data, isLoading, error } = useQuery({
    queryKey: [`endPoint`],
    queryFn: () => {
      return axios.get(`https://ecommerce.routemisr.com/api/v1/${endPoint}`);
    },
    select: (data) => {
      return data.data.data;
    },
  });

  return { data, isLoading, error };
}
