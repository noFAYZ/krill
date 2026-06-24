import Slide, { SlideProps } from '@mui/material/Slide';
import { SnackbarKey, useSnackbar } from 'notistack';
import * as React from 'react';

import Toast, { TOAST_DEFAULT_DURATION, ToastProps } from '../components/Toast';

// Bridges krill's own Toast component with notistack's snackbar queue, so any component can
// summon a toast without rendering one inline in its own JSX.
const useToast = () => {
  // Tracks the most-recently summoned toast's key, so a component can close its own latest toast
  const toastKey = React.useRef<SnackbarKey | undefined>(undefined);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const slide = (props: SlideProps) => (
    <Slide
      {...props}
      direction='up'
      easing={{ enter: 'cubic-bezier(0.16, 1, 0.3, 1)', exit: 'linear' }}
      timeout={{ enter: 200, exit: 200 }}
    />
  );

  const enqueueToast = React.useCallback(
    (customToastProps: ToastProps) => {
      const { duration = TOAST_DEFAULT_DURATION, actions, persist, onClose } = customToastProps;
      const defaultDuration = actions ? duration + 500 * actions.length : duration;
      toastKey.current = enqueueSnackbar(null, {
        content: (key: SnackbarKey) => (
          <Toast
            {...customToastProps}
            closeToast={() => {
              onClose?.();
              closeSnackbar(key);
            }}
            duration={defaultDuration}
            toastKey={key}
          />
        ),
        autoHideDuration: persist ? undefined : defaultDuration,
        persist,
        anchorOrigin: { vertical: 'bottom', horizontal: 'right' },
        TransitionComponent: slide
      });
      return toastKey.current;
    },
    [closeSnackbar, enqueueSnackbar]
  );

  const closeToast = React.useCallback(
    (providedToastKey?: SnackbarKey) => closeSnackbar(providedToastKey ?? toastKey.current),
    [closeSnackbar]
  );

  return { enqueueToast, closeToast };
};

export default useToast;
