

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
  className = "",
}) => {
  const styles = {
    primary:
      "bg-[#1E3A8A] text-white border border-[#1E3A8A] hover:bg-[#172F6D]",
    secondary:
      "bg-white text-[#1E3A8A] border border-[#CBD5E1] hover:bg-[#F8FAFC]",
    saffron:
      "bg-[#D97706] text-white border border-[#D97706] hover:bg-[#B45309]",
    danger:
      "bg-white text-[#991B1B] border border-[#FCA5A5] hover:bg-[#FEF2F2]",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex items-center justify-center
        px-5 py-2.5
        text-sm font-semibold
        transition-colors duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        ${styles[variant]}
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;