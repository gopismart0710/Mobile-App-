import React from "react";

interface LoginProps {
  onLogin: (user: any) => void;
  lang: string;
  toggleLang: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, lang, toggleLang }) => {
  const handleLogin = () => {
    const mockUser = {
      id: "1",
      name: "Demo User",
      phone: "9999999999"
    };

    onLogin(mockUser);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        fontFamily: "Arial"
      }}
    >
      <h1>Kanaku Login</h1>

      <input
        type="text"
        placeholder="Enter Mobile Number"
        style={{
          padding: "10px",
          marginTop: "20px",
          width: "200px"
        }}
      />

      <button
        onClick={handleLogin}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#1e3a8a",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        Login
      </button>

      <button
        onClick={toggleLang}
        style={{
          marginTop: "10px",
          padding: "6px 12px"
        }}
      >
        {lang === "en" ? "தமிழ்" : "English"}
      </button>
    </div>
  );
};

export default Login;
