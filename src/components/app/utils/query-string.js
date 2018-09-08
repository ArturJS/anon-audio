export const queryString = {
    stringify(params) {
        const queryString = Object.entries(params)
            .reduce(
                (acc, [key, value]) => [
                    ...acc,
                    `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
                ],
                []
            )
            .join('&');

        return `?${queryString}`;
    },

    parse(queryString) {
        const decodedParams = queryString
            .replace('?', '')
            .split('&')
            .map(chunk => chunk.split('='))
            .reduce(
                (acc, [key, value]) => ({
                    ...acc,
                    [decodeURIComponent(key)]: decodeURIComponent(value)
                }),
                {}
            );

        return decodedParams;
    }
};
