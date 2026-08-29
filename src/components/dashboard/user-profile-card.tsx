import React from "react";

const UserProfileCard: React.FC = () => (
  <div className="bg-white rounded-xl border border-gray-100 p-5 flex items-center gap-4 shadow-sm dark:bg-card dark:border-border">
    <div className="relative">
      <img
        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
        alt="Profile"
        className="w-14 h-14 rounded-full object-cover border-2 border-gray-100 dark:border-border"
      />
      <span className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-pink-500 rounded-full flex items-center justify-center border-2 border-white dark:border-card">
        <span className="text-white text-[10px] font-bold">9</span>
      </span>
    </div>
    <div>
      <h2 className="text-base font-bold text-gray-900 dark:text-foreground">សុខស៊ីណា, បញ្ញា ពុទ្ធិ</h2>
      <p className="text-sm text-gray-500 mt-0.5 dark:text-muted-foreground">និស្សិតបច្ចេកវិទ្យា</p>
    </div>
  </div>
);

export default UserProfileCard;
