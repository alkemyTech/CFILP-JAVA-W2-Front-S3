export const CustomButton = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick || (() => {})}
      className="px-3 text-sm font-medium border rounded-md cursor-pointer border-neutral-500 text-neutral-500 hover:bg-neutral-200"
    >
      {label}
    </button>
  );
};
