import {badgedEnvMap } from "../../../client/src/const/badges";
import {badgeTriggerAddresses } from "../../../client/src/const/badge-trigger-addresses";
import {Keyring} from "@polkadot/api";
import {Badge} from "../../../client/src/interfaces/badge.interface";

export class BadgeTriggerService {
    static addressesToBadges: { [key: string]: Badge } = {}

    constructor(private env: string) {
        for (let badge of badgedEnvMap[this.env]) {
            BadgeTriggerService.addressesToBadges[badgeTriggerAddresses[badge.id]] = badge
        }
    }

    getAddresses(): string[] {
        return Object.keys(BadgeTriggerService.addressesToBadges)
    }

    getAddressesWithBadges(): { [key: string]: Badge } {
        return BadgeTriggerService.addressesToBadges
    }

    createTriggerAddresses(seed: string) {
        const keyring = new Keyring({ type: 'sr25519' });
        const result: { [id: number]: string } = {}
        for (let i = 0; i < 100; i++) {
            const derivedKeyPair = keyring.addFromUri(`${seed}//${i}`);
            result[i] =  derivedKeyPair.address
        }
        return result
    }

    getBadge(address: string): Badge {
        return BadgeTriggerService.addressesToBadges[address]
    }

}