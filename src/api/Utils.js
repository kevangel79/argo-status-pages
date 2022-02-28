const doGet = (url,headers) => {
  // fetch the data and if succesfull change the component state - which will trigger a re-render
    return fetch(url, { headers: headers })
    .then((res) => res.json())
    .then((result) => { return result })
    .catch(error => console.log(error));
}

const getCurrentDate = () => {
  return new Date().toISOString().substring(0,10);
}

export {doGet, getCurrentDate};