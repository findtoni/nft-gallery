import { defineStore } from 'pinia';

export const useStore = defineStore('nftGallery', {
  state: () => {
    return {
      wallet: null,
      collection: null,
      nfts: [],
      selectedNetwork: 'ethereum',
      networkOptions: [{ name: 'ethereum' }, { name: 'polygon' }],
      loading: false,
      message: '',
    };
  },
  getters: {
    gallery() {
      //@ts-ignore
      return this.nfts.map(
        (nft: {
          media: { gateway: string }[];
          title: string;
          id: { tokenId: string };
          contract: { address: string };
          description: string;
        }) => {
          return {
            image: nft.media[0].gateway,
            name: nft.title,
            id: nft.id.tokenId,
            address: nft.contract.address,
            description: nft.description,
          };
        },
      );
    },
    network() {
      if (this.selectedNetwork === 'ethereum') {
        return {
          url: import.meta.env.VITE_ETHEREUM_API_URL,
          apiKey: import.meta.env.VITE_ETHEREUM_API_KEY,
        };
      } else {
        return {
          url: import.meta.env.VITE_POLYGON_API_URL,
          apiKey: import.meta.env.VITE_POLYGON_API_KEY,
        };
      }
    },
  },
  actions: {
    setItem(item: string, value: string): void {
      this[item] = value;
    },
    async fetchNFTs(): Promise<void> {
      this.message = '';
      this.loading = true;
      const baseUrl = `${this.network.url}/${this.network.apiKey}/getNFTs`;
      const fetchUrl = `${baseUrl}/?owner=${this.wallet}`;

      let nfts = await fetch(fetchUrl, { method: 'GET' });
      nfts = await nfts.json();
      //@ts-ignore
      this.nfts = nfts?.ownedNfts;
      this.nfts.length === 0
        ? (this.message = `No NFTs found in this wallet on ${this.selectedNetwork}`)
        : (this.message = `Found ${this.nfts.length} NFTs in this wallet...`);
      this.loading = false;
    },
    async fetchNFTsCollection(): Promise<void> {
      this.message = '';
      this.loading = true;
      const baseUrl = `${this.network.url}/${this.network.apiKey}/getNFTsForCollection`;
      const fetchUrl = `${baseUrl}/?contractAddress=${
        this.collection
      }&withMetadata=${'true'}`;

      let nfts = await fetch(fetchUrl, { method: 'GET' });
      nfts = await nfts.json();
      //@ts-ignore
      this.nfts = nfts?.nfts;
      this.nfts.length === 0
        ? (this.message = `No NFTs found in this wallet on ${this.selectedNetwork}`)
        : (this.message = `Found ${this.nfts.length} NFTs in this collection...`);
      this.loading = false;
    },
  },
});
