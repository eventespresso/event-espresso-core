import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initToaster: VoidFunction = () => {
	toast.configure({
		autoClose: 3000,
		className: 'ee-toaster-notice__container',
		hideProgressBar: true,
	});
};

export default initToaster;
