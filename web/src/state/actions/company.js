export const REQUEST_COMPANY = 'REQUEST_COMPANY';
export const RECEIVE_COMPANY = 'RECEIVE_COMPANY';

export function requestCompany() {
  return {
    type: REQUEST_COMPANY,
  };
}

export function receiveCompany(company) {
  return {
    type: RECEIVE_COMPANY,
    lastUpdated: Date.now(),
    id: company.id,
    name: company.name,
    mail: company.mail,
    color: company.color,
  };
}

export function fetchCompany() {
  return function d(dispatch) {
    dispatch(requestCompany());
    return fetch('api/v1/company')
      .then(
        response => response.json(),
        error => console.log('An error occured.', error),
      )
      .then(json =>
        dispatch(receiveCompany(json)));
  };
}
