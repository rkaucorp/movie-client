import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Axios, { AxiosRequestConfig } from "axios";
import { loginObject, movie, userProfileInterface } from "../Interface";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { authenticate, getCookie, isAuth } from "./storage";

export default function useHook() {
  // const { user } = useSelector(state => state);
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const axios = Axios.create({
    baseURL: "http://localhost:4000"
  });

  axios.interceptors.request.use(async (config: AxiosRequestConfig) => {
    const token = getCookie("token");
    config.headers!.Authorization = `authorization ${token}`;
    return config;
  });

  const setUserProfile = (userProfile: userProfileInterface) => {
    dispatch({ type: "SET_USER_PROFILE", payload: userProfile });
  };

  const userLogin = async (payload: loginObject): Promise<void> => {
    try {
      const response = await axios.post(`/users/login`, payload);
      if (response) {
        toast.success("Successfully Login...");
        authenticate(response, () => {
          navigate("/home");
        });
      }
      toast.success("Success");
    } catch (error: any) {
      console.log(error);
      dispatch({
        type: "SET_HTTP_ERROR",
        payload: error?.response?.data?.error
      });
    }
  };
  const userRegistration = async (payload: loginObject): Promise<void> => {
    try {
      await axios.post(`/users`, payload);
      toast.success("Successfully Registered");
    } catch (error: any) {
      dispatch({
        type: "SET_HTTP_ERROR",
        payload: error?.response?.data?.error
      });
    }
  };

  const setMovies = (movies: movie[]) => {
    dispatch({
      type: "SET_MOVIES",
      payload: movies
    });
  };

  const fetchMovieList = async (start: number = 0, limit: number = 5) => {
    try {
      const response = await axios.get(`/movies/${start}/${limit}`);
      setMovies(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const moviePagination = async (start: number = 0, limit: number = 5) => {
    try {
      console.log(start, "start");

      const response = await axios.get(`/movies/${start}/${limit}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const addNewMovie = async (title: string): Promise<boolean> => {
    try {
      const data = { title, userId: isAuth().id };
      await axios.post(`/movies`, data);
      await fetchMovieList();
      return true;
    } catch (error: any) {
      dispatch({
        type: "SET_HTTP_ERROR",
        payload: error?.response?.data?.error
      });
      return false;
    }
  };

  const resetHttpStateMessage = () => {
    dispatch({
      type: "SET_HTTP_ERROR",
      payload: ""
    });
  };
  return {
    setUserProfile,
    userLogin,
    userRegistration,
    resetHttpStateMessage,
    setMovies,
    fetchMovieList,
    addNewMovie,
    moviePagination
  };
}
