import { LazyLoader } from "@/routes";
import HomeLoading from "./Home.loading";

const HomePage = LazyLoader(() => import("./Home"), HomeLoading);

export default HomePage;
