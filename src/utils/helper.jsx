import { toast } from 'react-toastify';
export function errors(err) {
  if (err.code === 1) {
    toast.error('Please enable location');
  }
  if (err.code === 2) {
    toast.error('Position unavailable');
  }
  if (err.code === 3) {
    toast.error('Timed out');
  }
  if (err.code === 4) {
    toast.error('Permission denied');
  }
}

export var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};
