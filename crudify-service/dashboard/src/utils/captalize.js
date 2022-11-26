const capitalize = (text) => {
  if (!text instanceof String) {
    return text.toString().charAt(0).toUpperCase() + text.slice(1);
  }

  return text.charAt(0).toUpperCase() + text.slice(1);
};

export default capitalize;
