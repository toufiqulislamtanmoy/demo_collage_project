import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

const AuthWrapper = async ({ children, redirect }) => {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/");
  }

  return children;
};

export default AuthWrapper;
