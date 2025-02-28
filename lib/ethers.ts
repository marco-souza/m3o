import { ethers } from "ethers";

declare global {
  interface Window {
    ethereum: ethers.Eip1193Provider;
  }
}

export const metamask = {
  getEth() {
    const eth = window.ethereum;
    if (!eth) {
      throw new Error("No ethereum provider found");
    }

    return eth;
  },

  getProvider() {
    const provider = new ethers.BrowserProvider(metamask.getEth());
    return provider;
  },

  async getAccounts() {
    const accounts = await metamask.getProvider().listAccounts();
    return accounts.map((acc) => acc.address);
  },

  isMetaMaskInstalled() {
    return Boolean(window.ethereum);
  },

  async isAuthorized() {
    const accounts = await metamask.getAccounts();
    return accounts.length > 0;
  },

  async requestAccounts() {
    const accounts = await metamask.getEth().request({
      method: "eth_requestAccounts",
    });
    return accounts;
  },
};

