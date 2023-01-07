export const numberWithCommas = (x: number) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export const getDefaultImage = () => "https://m.media-amazon.com/images/I/6178Kjl1UyL.jpg";
