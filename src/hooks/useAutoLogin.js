import { useState, useEffect } from "react";
import { setUser } from "../../store/userSlice";
import { useDispatch } from "react-redux";
import axios from "axios";

function useAutoLogin() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    // IIFE
    (async function autoLoginApiCall() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_INTERNAL_API_PATH}/refresh`,
          {
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          // Set user data
          const user = {
            _id: response.data.user._id,
            firstName: response.data.user.firstName,
            lastName: response.data.user.lastName,
            email: response.data.user.email,
            age: response.data.user.age,
            address: response.data.user.address,
            auth: response.data.auth,
          };
          dispatch(setUser(user));
        }
      } catch (error) {
        console.error("Auto-login failed", error);
      } finally {
        setLoading(false);
      }
    })();
  }, [dispatch]);

  return loading;
}

export default useAutoLogin;
