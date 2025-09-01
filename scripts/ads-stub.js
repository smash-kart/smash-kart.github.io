'use strict';

// Stub module to disable all advertising while preserving the expected public API so the game continues to work.

// Ensure global provider flags are set to the dummy provider defined in constants.js.
if (typeof AdProviderDummy !== 'undefined') {
    window.displayAdProvider = AdProviderDummy;
    window.videoAdProvider = AdProviderDummy;
}

// Ensure a global aiptag object exists to avoid reference errors in any remaining helper functions.
window.aiptag = window.aiptag || {};

// ------------------------------------------------------------
//  No-op function replacements expected elsewhere in the code.
// ------------------------------------------------------------
window.updateAdBlockDetected = function () { /* ads disabled */ };
window.updateLoadingAdBanner = function () { /* ads disabled */ };
window.trySendAdBlockDetectedMessage = function () { /* ads disabled */ }; 

window.isVideoAdPlaying = false;

// Rewarded / non-rewarded interstitial API expected by the Unity build
window.tryInitRewardedInterstitial = function (audioOn) {
    // Immediately inform Unity that a rewarded interstitial is available (or not).
    if (window.unityGame && typeof unityFirebaseGameOjbectName !== 'undefined') {
        setTimeout(() => window.unityGame.SendMessage(unityFirebaseGameOjbectName, "RewardedInterstitialAvailable"), 0);
    }
};

window.tryShowRewardedInterstitial = function (audioOn) {
    // Pretend the ad finished successfully.
    if (window.unityGame && typeof unityFirebaseGameOjbectName !== 'undefined') {
        setTimeout(() => window.unityGame.SendMessage(unityFirebaseGameOjbectName, "InterstitialComplete", 1), 0);
    }
};

window.showNonRewardedInterstitial = function (audioOn, interstitialType, interstitialName) {
    // No ad shown; notify Unity that no fill occurred.
    if (window.unityGame && typeof unityFirebaseGameOjbectName !== 'undefined') {
        setTimeout(() => window.unityGame.SendMessage(unityFirebaseGameOjbectName, "InterstitialNoFill", 0), 0);
    }
};

// Called when loading finishes and the main menu appears.
// The original implementation hid an ad container; here we simply hide the generic loader overlay if it still exists.
window.hideLoadingBanner = function () {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.style.display = 'none';
    }
};

// Additional banner show/hide stubs – these originally handled ad containers.
// They now just call hideLoadingBanner or do nothing, keeping the game flow intact.
const noop = () => {};

window.showMainMenuBanner = noop;
window.hideMainMenuBanner = noop;
window.showWinCeremonyBanner = noop;
window.hideWinCeremonyBanner = noop;
window.showSpectateBanner = noop;
window.hideSpectateBanner = noop;
window.showLongBanner = noop;
window.hideLongBanner = noop;
window.showDummyMainMenuBanner = noop;
window.showLoadingBanner = noop; 