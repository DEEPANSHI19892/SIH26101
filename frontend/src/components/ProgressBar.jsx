

const ProgressBar = ({ value = 0, label, showValue = true }) => {
  return (
    <div className="w-full">
      {(label || showValue) && (
        <div className="flex items-center justify-between mb-2">
          {label && (
            <span className="text-sm font-medium text-slate-700">
              {label}
            </span>
          )}

          {showValue && (
            <span className="text-sm font-semibold text-slate-900">
              {value}%
            </span>
          )}
        </div>
      )}

      <div className="h-2.5 w-full bg-slate-200 overflow-hidden">
        <div
          className="h-full bg-[#1E3A8A] transition-all duration-500"
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;