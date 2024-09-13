import { decodeAddress, encodeAddress } from '@polkadot/util-crypto'

export const convertToGenericFormat = (address: string) => {
    if (isGenericAddress(address)) {
        return address
    }
    if (isPolkadotAddress(address)) {
        return encodeAddress(decodeAddress(address), undefined) 
    }
    return encodeAddress(decodeAddress(address), undefined) // kusama
}

export const convertToSpecificFormat = (address: string, env: string) => {
    if (isSpecificAddress(address) || env === 'westend') {
        return address
    }
    if (env === 'polkadot') {
        return encodeAddress(decodeAddress(address), 0) 
    } else if (env === 'kusama') {
        return encodeAddress(decodeAddress(address), 2) // kusama
    }
    throw "Address type " + env + " not supported"
}

export const isGenericAddress = (address: string) => {
    return address.at(0) === '5'
}

export const isPolkadotAddress = (address: string) => {
    return address.at(0) === '1'
}

export const isSpecificAddress = (address: string) => {
    return !isGenericAddress(address)
}