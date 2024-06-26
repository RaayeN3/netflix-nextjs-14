
import { getServerSession } from "next-auth";
import { authOptions } from "./utils/auth";
import { redirect } from "next/navigation";


const Home = async () => {
  const session = await getServerSession(authOptions)
  if (!session){
    redirect("/login");
  }else{
    redirect("/home")
  }
  
};

export default Home;
