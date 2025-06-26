import simpleRestProvider from 'ra-data-simple-rest';

const apiUrl = process.env.REACT_APP_BASE_API_URL;
console.log('🌐 DataProvider API URL:', apiUrl);
const baseDataProvider = simpleRestProvider(apiUrl);

const dataProvider = {
  ...baseDataProvider,
  
  // Override để thêm Authorization header
  getList: (resource, params) => {
    console.log('📋 DataProvider getList:', resource, params);
    const token = localStorage.getItem('token');
    const url = `${apiUrl}/${resource}`;
    console.log('🔗 Request URL:', url);
    const options = {
      headers: new Headers({
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      }),
    };

    return fetch(url, options)
      .then(response => {
        console.log('📡 getList response status:', response.status);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(json => {
        console.log('📊 getList response data:', json);
        return {
          data: json.data || json,
          total: json.total || json.length,
        };
      });
  },

  getOne: (resource, params) => {
    const token = localStorage.getItem('token');
    const url = `${apiUrl}/${resource}/${params.id}`;
    const options = {
      headers: new Headers({
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      }),
    };

    return fetch(url, options)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(json => ({ data: json.data || json }));
  },

  create: (resource, params) => {
    const token = localStorage.getItem('token');
    const url = `${apiUrl}/${resource}`;
    const options = {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }),
      body: JSON.stringify(params.data),
    };

    return fetch(url, options)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(json => ({ data: json.data || json }));
  },

  update: (resource, params) => {
    const token = localStorage.getItem('token');
    const url = `${apiUrl}/${resource}/${params.id}`;
    const options = {
      method: 'PUT',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }),
      body: JSON.stringify(params.data),
    };

    return fetch(url, options)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(json => ({ data: json.data || json }));
  },

  delete: (resource, params) => {
    const token = localStorage.getItem('token');
    const url = `${apiUrl}/${resource}/${params.id}`;
    const options = {
      method: 'DELETE',
      headers: new Headers({
        'Authorization': `Bearer ${token}`,
      }),
    };

    return fetch(url, options)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(json => ({ data: json.data || json }));
  },
};

export default dataProvider;
