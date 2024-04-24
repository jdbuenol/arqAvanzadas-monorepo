import { auth } from "./firebase";

const Services = () => {
  const createUser = async (
    email: string,
    password: string
  ): Promise<{
    success: boolean;
    message: string;
    token: string;
    uid: string;
  }> => {
    try {
      const user = await auth.createUser({
        email,
        password,
      });

      const token = await auth.createCustomToken(user.uid);

      return {
        success: true,
        message: "",
        token,
        uid: user.uid,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        token: "",
        uid: "",
      };
    }
  };

  return {
    createUser,
  };
};

export default Services;
