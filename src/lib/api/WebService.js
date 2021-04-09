import HttpError    from './HttpError';

class WebService {

    constructor({url, port}) {

        this.base_url = url;

        if (port) {
            this.base_url += ':' + port;
        }

        this.headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }

        this.onResponseCallback = (response) => {};

    }

    addHeaders(headers) {
        this.headers = {
            ...this.headers,
            ...headers
        };
    }

    addHeader(key, value) {
        this.headers[key] = value;
    }

    removeHeader(key) {
        delete this.headers[key];
    }

    onResponse = (callback) => {
        this.onResponseCallback = callback;
    }

    get = (path, data=null) => {
        return this.call('GET', path, data);
    }

    post(path, data) {
        return this.call('POST', path, data);
    }

    put(path, data) {
        return this.call('PUT', path, data);
    }

    delete(path) {
        return this.call('DELETE', path);
    }

    call(method, path, data = null) {

        return new Promise(async (resolve, reject) => {

            let options = {
                method: method,
                headers: this.headers,
                //mode: 'no-cors'
            };

            let url_params = '';

            if (method === 'POST' || method === 'PUT') {
                options.body = JSON.stringify(data);
            } else if (method === 'GET') {
                if (data != null && Object.keys(data).length > 0) {
                    url_params += '?' + this.objecToParams(data); 
                }
            }

            let url = this.base_url + path + url_params;


            fetch(url, options).then(async (response) => {

                this.onResponseCallback(response);

                return this.handleResponse(response);
            }).then((data) => {
                resolve(data);
            }).catch((error) => {
                console.log('[Plugin] Webservice Error', error);
                reject(error);
            });
        });
    }

    upload = (path, formData, progress) => {

        return new Promise((resolve, reject) => { 

            var xhr = new XMLHttpRequest();
            xhr.open('post', this.base_url + path, true);

            xhr.upload.onprogress = (event) => {
                if (event.lengthComputable) {
                    progress({
                        percentage: (event.loaded / event.total) * 100,
                        loaded: event.loaded,
                        total: event.total
                    });
  
                }
            };

            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(JSON.parse(xhr.responseText));
                    } else {
                        reject({ code: xhr.status, message: xhr.statusText});

                    }
                }
            };

            xhr.onerror = (error) => { reject(error); };
            xhr.onload = (response) => {  };

            xhr.send(formData);
        });
    }

    handleResponse(response) {
        const content_type = response.headers.get('content-type');

        if (content_type !== null) {
            if (content_type.includes('application/json')) {

                return response.json().then((data) => {
                    if (response.ok) {
                        return data;
                    } else {
                        throw new HttpError({
                            message: data.message,
                            status: response.status,
                            statusText: response.statusText,
                            data: data
                        });
                    }
                });

            } else {
                throw new HttpError({
                    message: 'Content-type not supported: ' + content_type,
                    status: response.status,
                    statusText: response.statusText,
                    data: null
                });
            }
        }
    }

    objecToParams = (params) => {
        return Object.entries(params).map(([key, val]) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`).join('&');
    }

}

export default WebService;