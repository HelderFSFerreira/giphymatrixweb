import { GiphyAPIOut } from '../interfaces';

export class GiphyAPI {

    private static apiURL: string = process.env.APIURL || 'https://api.giphy.com/v1/gifs/search';
    private static apiKey: string = process.env.APIKEY!;
    private static apiRating: string = process.env.APIRATING || 'g';
    /**
     * constructor
     */
    public constructor() {
    }

    async getBest5(word: string): Promise<object> {
        const url = `${GiphyAPI.apiURL}?api_key=${encodeURIComponent(GiphyAPI.apiKey)}&q=${encodeURIComponent(word)}&limit=5&offset=0&rating=${encodeURIComponent(GiphyAPI.apiRating)}&lang=en`;
        const response = await fetch(url);
        const data = await response.json();
        const imgUrl: GiphyAPIOut[] = data.data.map((gitLine:any) => {
            return {
                title: gitLine.title,
                url: gitLine.images.original.url
            }
        });
        return imgUrl;
    }
};