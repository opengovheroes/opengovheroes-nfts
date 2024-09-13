import {ApiPromise} from "@polkadot/api";
import {KeyringPair} from "@polkadot/keyring/types";
import { logger } from "../logger/logger";

export const transact = async (api: ApiPromise, tx: any, signer: KeyringPair): Promise<boolean> => {
    return new Promise((async (resolve, reject) => {
        try {
            const nonce = (await api.rpc.system.accountNextIndex(signer.address)).toNumber();
            logger.info(`Creating transaction with nonce ${nonce}`)
            const unsubscribe = await tx.signAndSend(signer, { nonce }, ({ status, dispatchError}) => {
                if (dispatchError) {
                    if (dispatchError.isModule) {
                        const decoded = api.registry.findMetaError(dispatchError.asModule);
                        const {docs, name, section} = decoded;
                        logger.info(`${section}.${name}: ${docs.join(' ')}`);
                        unsubscribe()
                        reject(`${section}.${name}: ${docs.join(' ')}`)
                    } else {
                        logger.error(dispatchError.toString());
                        unsubscribe()
                        reject(dispatchError.toString())
                    }
                } else if (status) {
                    logger.info(`Current status is ${status}`);
                    if (status.isInBlock) {
                        logger.info(`Transaction included at blockHash ${status.asInBlock}`);
                    } else if (status.isFinalized) {
                        logger.info(`Transaction finalized at blockHash ${status.asFinalized}`);
                        unsubscribe()
                        resolve(true)
                    } else if (status.isRetracted) {
                        logger.warn(`Transaction retracted. Nonce ${nonce}`);
                        unsubscribe()
                        reject("retracted")
                    } else if (status.isInvalid) {
                        logger.warn(`Transaction invalid. Nonce ${nonce}`);
                        unsubscribe()
                        reject("invalid")
                    }
                }
            });
        } catch (error) {
            logger.error("signAndSend failed", error)
            reject(error)
        }
    }))
}