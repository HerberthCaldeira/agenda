const useDebounce = (fn, delay = 500) => {
  let timeoutId: number;

  return function (...args) {
    console.log(timeoutId);
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};

export default useDebounce;
