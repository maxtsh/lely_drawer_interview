import { LazyLoader } from "@/Routes";
import HomeLoading from "./Home.loading";

const HomePage = LazyLoader(() => import("./Home"), HomeLoading);

export default HomePage;
