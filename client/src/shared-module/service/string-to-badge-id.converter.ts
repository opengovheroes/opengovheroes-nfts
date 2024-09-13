export const convertNftIdToBadgeId = (nftId: string): number => {
    return Number(BigInt(nftId.replace(/,/g, '').replace(/\./g, '')) % 100n)
}