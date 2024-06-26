export default function handleSearchPagination(url: string) {
    let queryString = url;
    
    if (queryString.startsWith('?')) {
        queryString = queryString.substring(1);
    }
    
    // Split the query string into an array of key-value pairs
    const paramsArray = queryString.split('&');
    
    // Filter out the 'page=2' parameter
    const filteredParamsArray = paramsArray.filter(param => !param.startsWith('page='));
    
    // Join the filtered parameters back into a string
    const newQueryString = filteredParamsArray.join('&');
    
    // Add the leading '?' back if necessary
    const updatedQueryString = newQueryString ? `?${newQueryString}` : '';

    return updatedQueryString;
}