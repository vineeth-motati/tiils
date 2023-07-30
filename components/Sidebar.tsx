import TopNavSection from "./TopNavSection";
import BottomNavSection from "./BottomNavSection";

const Sidebar = async () => {
  return (
    <div className="w-16">
      <div className="flex flex-col h-[calc(100vh-48px)] justify-between">
        <TopNavSection />
        <BottomNavSection />
      </div>
    </div>
  );
};

export default Sidebar;
