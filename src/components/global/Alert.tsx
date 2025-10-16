import ErrorIcon from '../../public/alert/error.png'
import CloseIcon from '../../public/alert/close.svg'

type AlertProps = {
    alertMessageText: string;
};

type AlertState = {
    closeAlert: () => void;
};

export default function Alert({ alertMessageText, closeAlert }: AlertProps & AlertState) {
    return (
        <div className="fixed md:text-lg text-sm top-4 left-1/2 transform -translate-x-1/2 bg-amber-200 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center animate-[alert-in_220ms_ease-out] motion-reduce:animate-none">
            <img src={ErrorIcon} alt="Error" className="mr-2 h-5 w-5 md:h-6 md:w-6" />

            <span className="text-neutral-800">{alertMessageText}</span>

            <button
                onClick={closeAlert}
                className="ml-3 inline-flex items-center justify-center h-8 w-8 md:h-9 md:w-9 rounded-full text-neutral-800 hover:text-neutral-950 hover:bg-black/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30 focus-visible:ring-offset-2 focus-visible:ring-offset-amber-200 transition"
                aria-label="Close"
                title="Close"
            >
                <img src={CloseIcon} alt="Close" className="h-4 w-4 md:h-5 md:w-5" />
            </button>
        </div>
    );
}