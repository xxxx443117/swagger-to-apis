
export const isSuccess = (res: Api.Error, showToast = true) => {
  const success = res && res?.code === 0;
  if (!success && showToast) {
    if (res) {
      // toast.error(translateHandle(`http-error-${res.code}`));
    } else {
      // toast.error(translateHandle(`http-error-network`))
    }
  }
  return success;
};
