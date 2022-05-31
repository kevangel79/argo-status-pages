const setThemeValue = function(variable, value) {
  document.documentElement.style.setProperty("--" + variable, value);
}

export default setThemeValue;