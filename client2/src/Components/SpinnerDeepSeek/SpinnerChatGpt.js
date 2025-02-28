const SpinnerChatGpt = () => {
    return (
      <div className="flex items-center justify-center w-full h-screen ">
        <div className="relative w-16 h-16">
          <div className="absolute w-full h-full bg-gradient-to-r from-teal-400 to-teal-600 opacity-30 blur-xl animate-pulse rounded-full"></div>
          <div className="absolute w-full h-full border-4 border-transparent border-t-teal-500 rounded-full animate-spin"></div>
        </div>
      </div>
    );
  };
  
  export default SpinnerChatGpt;