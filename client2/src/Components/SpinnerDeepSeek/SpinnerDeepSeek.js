import React from 'react';

const SpinnerDeepSeek = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#ffffff', // White background
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '4rem', // w-16
          height: '4rem', // h-16
        }}
      >
        {/* Blurred gradient background */}
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(to right, #2dd4bf, #0d9488)', // Teal gradient
            opacity: '0.3', // opacity-30
            filter: 'blur(20px)', // blur-xl
            animation: 'pulse 2s infinite', // animate-pulse
            borderRadius: '9999px', // rounded-full
          }}
        ></div>

        {/* Spinning border */}
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            border: '4px solid transparent', // border-4 border-transparent
            borderTopColor: '#0d9488', // Teal border
            borderRadius: '9999px', // rounded-full
            animation: 'spin 1.5s linear infinite', // animate-spin
          }}
        ></div>
      </div>
    </div>
  );
};

export default SpinnerDeepSeek;