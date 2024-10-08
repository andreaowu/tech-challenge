import { fetchAndActivate, getValue } from 'firebase/remote-config';
import { remoteConfig } from './firebase';

export let puzzleCount = 0;

export async function initRemoteConfig() {
    const rc = await remoteConfig();
    if (rc) {
        rc.settings.minimumFetchIntervalMillis = 0;
        rc.defaultConfig = {
            "puzzle_count": 0
        };
        await fetchAndActivate(rc);
        puzzleCount = getValue(rc, "puzzle_count").asNumber();
    }
}
initRemoteConfig();