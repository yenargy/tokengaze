export const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3/coins'

export const COINGECKO_API_OPTIONS = {
  method: 'GET',
  headers: {accept: 'application/json', 'x-cg-demo-api-key': process.env.NEXT_PUBLIC_COINGECKO_API_KEY || ''}
};

export const SUGGESTED_TOKENS = [
  {
    id: 'pepe',
    name: 'Pepe',
    platforms: {
      ethereum: "0x6982508145454ce325ddbe47a25d4ec3d2311933"
    },
    symbol: 'pepe',
    image: 'https://assets.coingecko.com/coins/images/29850/large/pepe-token.jpeg'
  },
  {
    id: 'shiba-inu',
    name: 'Shiba Inu',
    platforms: {
      ethereum: "0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce"
    },
    symbol: 'shib',
    image: 'https://assets.coingecko.com/coins/images/11939/large/shiba.png'
  },
  {
    id: 'arbitrum',
    name: 'Arbitrum',
    platforms: {
      ethereum: "0xb50721bcf8d664c30412cfbc6cf7a15145234ad1"
    },
    symbol: 'arb',
    image: 'https://assets.coingecko.com/coins/images/16547/large/photo_2023-03-29_21.47.00.jpeg'
  }
]

