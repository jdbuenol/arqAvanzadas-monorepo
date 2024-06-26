import axios from "axios";
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

      const token = await createToken(user.uid);

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

  const verifyToken = async (
    token: string
  ): Promise<{ success: boolean; uid: string; is_admin: boolean }> => {
    const decodedToken = await auth.verifyIdToken(token);

    if (decodedToken) {
      return {
        success: true,
        uid: decodedToken.uid,
        is_admin: decodedToken.admin === true,
      };
    } else {
      return {
        success: false,
        uid: "",
        is_admin: false,
      };
    }
  };

  const setAdminClaim = async (uid: string) => {
    await auth.setCustomUserClaims(uid, { admin: true });
  };

  const createToken = async (uid: string): Promise<string> => {
    const customToken = await auth.createCustomToken(uid);

    const { data } = await axios.post(
      `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyCustomToken?key=${process.env.FIREBASE_API_KEY}`,
      {
        token: customToken,
        returnSecureToken: true,
      }
    );

    return data.idToken;
  };

  return {
    createUser,
    verifyToken,
    setAdminClaim,
    createToken,
  };
};

export default Services;
