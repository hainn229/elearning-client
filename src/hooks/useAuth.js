import { useEffect } from "react";
import { useAsync } from "react-hook-async";
import { useDispatch } from "react-redux";
import axios from "axios";

const fetchUser = (jwt) => {
  return axios
    .get("https://api--elearning.herokuapp.com/auth/myAccount", {
      headers: {
        Authorization: "Bearer " + jwt,
      },
    })
    .then((res) => res.data);
};

export const useAuth = () => {
  const dispatch = useDispatch();
  const [apiData, fetchApi] = useAsync({}, fetchUser);

  useEffect(() => {
    const jwt = localStorage.getItem("token");
    fetchApi(jwt).then((user) => {
      dispatch({ type: "LOGIN_DATA", payload: user });
    });
  }, [fetchApi, dispatch]);
  return apiData;
};
