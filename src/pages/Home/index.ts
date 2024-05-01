import LazyLoader from "@/performance";
import HomeLoading from "./Home.loading";

const HomePage = LazyLoader(() => import("./Home"), HomeLoading);

export default HomePage;
