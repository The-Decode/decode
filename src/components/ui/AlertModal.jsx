import { alertAtom } from "@/atoms/userAtom";
import { useRecoilState } from "recoil";

const AlertModal = () => {
  const [alert, setAlert] = useRecoilState(alertAtom);

  const onCancel = () => {
    setAlert({ isOpen: false });

    if (alert?.back) {
      window.history.back();
    }
  };

  return (
    <div
      // onClick={setAlert}
      className={`fixed inset-0 z-50 flex items-center
      justify-center transition-colors ${
        alert.isOpen ? "visible bg-black/50" : "hidden"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`max-w-[490px] rounded-md
      border bg-black p-6 shadow-lg transition-all ease-linear ${
        alert.isOpen ? "scale-100 opacity-100" : "scale-125 opacity-0"
      }`}
      >
        <div className="flex flex-col gap-4">
          <h4 className="montserrat-subheading text-xl font-bold text-red-600 lg:text-2xl">
            {alert?.title}
          </h4>
          <p
            className="montserrat-subheading border-t border-gray-200 p-1 
          py-2 pl-4 text-left text-[1.1rem] text-gray-300"
          >
            {alert?.description}
          </p>
          <div>
            <div className="flex items-center space-x-4">
              <button
                onClick={onCancel}
                className="rounded-lg 
            bg-black p-2 px-5 text-primary transition-all ease-linear 
            hover:bg-primary hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => setAlert({ isOpen: false })}
                className="rounded-lg 
            bg-primary p-2 px-5 text-black transition-all ease-linear 
            hover:bg-[#ff4545] hover:text-white"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;
