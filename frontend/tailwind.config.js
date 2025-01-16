/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.jsx"],
  theme: {
    screens: {
      sm: "480px",
      md: "900px",
      lg: "1280px",
      xl: "1440px",
    },
    fontSize: {
      "xxs": ["10px", "14px"],
      "xs": ["12px", "18px"],
      "sm": ["14px", "20px"],
      "md": ["16px", "24px"],
      "lg": ["18px", "28px"],
      "xl": ["20px", "30px"],
      "2xl": ["24px", "30px"],
      "3xl": ["30px", "38px"],
    },
    extend: {
      colors: {
        "error": "#9C0013",
        "error-subtle": "#E5D0CE",
        "success": "#00884F",
        "success-subtle": "#CCE3D5",
        "warning": "#D46600",
        "warning-subtle": "#F2D5B3",
        primaryBlue: "#2962FF",
      },
      textColor: {
        primary: "#000000",
        secondary: "#344054",
        tertiary: "#667085",
        placeholder: "#D0D5DD",
        disabled: "#667085",
      },
      spacing: {
        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "40px",
      },
    },
  },
  plugins: [],
}
