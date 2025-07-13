import { useLayoutEffect } from "react"
import useAxiosPrivate from "../hooks/useAxiosPrivate";


const Me = () => {
  const apiPrivate = useAxiosPrivate();

  useLayoutEffect(() => {
    const getUser = async () => {
      try {
        const response = await apiPrivate.get('/user');
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    getUser();
  }, []);

  return (
    <div>
        Me
    </div>
  )
}

export default Me