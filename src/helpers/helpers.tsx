const setThemeValue = function(variable: string, value: string) {
  document.documentElement.style.setProperty("--" + variable, value);
}

export default setThemeValue;