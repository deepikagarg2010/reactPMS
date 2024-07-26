
import { Bounce, toast } from 'react-toastify';

export const GlobalToast = (messg:any) => {
  toast(messg, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: 0,
    theme: "light",
    transition: Bounce,
    toastId: 'success1',
});
return messg;
}