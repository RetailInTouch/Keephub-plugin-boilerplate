class HttpError extends Error {
    
    constructor(response) {
        super(response.message ? response.message : 'Fetch failed');

        this.name = 'HttpError';
        this.status = response.status;
        this.statusText = response.statusText;
        this.data = response.data;
    }
}

export default HttpError;