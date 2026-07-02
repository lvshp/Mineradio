// ============================================================
//  Declarative DOM actions
// ============================================================
var MINERADIO_DOM_ACTIONS = {
  startVisualGuide: function(_value, options) { startVisualGuide(options || {}); },
  openUpdatePanel: function() { openUpdatePanel(); },
  toggleDiyMode: function() { toggleDiyMode(); },
  setSearchMode: function(value) { setSearchMode(value); },
  clickElementById: function(value) {
    var el = value ? document.getElementById(value) : null;
    if (el && typeof el.click === 'function') el.click();
  },
  closeUploadTip: function(value) { closeUploadTip(value !== 'false'); },
  toggleUserCapsuleAutoHide: function(_value, _options, e) { toggleUserCapsuleAutoHide(e); },
  toggleFxFabAutoHide: function(_value, _options, e) { toggleFxFabAutoHide(e); },
  pickCoverColorFromArt: function(_value, _options, e) { pickCoverColorFromArt(e); },
  moveCoverColorLoupe: function(_value, _options, e) { moveCoverColorLoupe(e); },
  hideCoverColorLoupe: function() { hideCoverColorLoupe(); },
  closeColorLab: function() { closeColorLab(); },
  toggleClassById: function(value, options) {
    var el = value ? document.getElementById(value) : null;
    var className = options && options.className ? options.className : 'open';
    if (el) el.classList.toggle(className);
  },
  setLyricColorAuto: function() { setLyricColorAuto(); },
  setLyricHighlightAuto: function() { setLyricHighlightAuto(); },
  handleLyricGlowRowClick: function(_value, _options, e) { handleLyricGlowRowClick(e); },
  toggleLyricGlowLink: function(_value, _options, e) { toggleLyricGlowLink(e); },
  setLyricSourceMode: function(value) { setLyricSourceMode(value); },
  setLyricFont: function(value) { setLyricFont(value); },
  setLyricColorPreset: function(value) { setLyricColorPreset(Number(value) || 0); },
  toggleFx: function(value) { toggleFx(value); },
  clearCustomCoverForCurrent: function() { clearCustomCoverForCurrent(); },
  openHomePlayerConsole: function() { openHomePlayerConsole(); },
  openHomeLibrary: function() { openHomeLibrary(); },
  playHomeSong: function(value) { playHomeSong(Number(value) || 0); },
  playHomeRecent: function() { playHomeRecent(); },
  openHomeInsight: function() { openHomeInsight(); },
  handleHomeTileClick: function(value) { handleHomeTileClick(Number(value) || 0); },
  goHome: function() { goHome(); },
  onUserBtnClick: function() { onUserBtnClick(); },
  openCoverColorPicker: function(value) { openCoverColorPicker(value); },
  closeCoverColorPicker: function() { closeCoverColorPicker(); },
  resetUiAccentColor: function() { resetUiAccentColor(); },
  resetVisualTintColor: function() { resetVisualTintColor(); },
  resetHomeAccentColor: function() { resetHomeAccentColor(); },
  resetHomeIconColor: function() { resetHomeIconColor(); },
  resetVisualIconColor: function() { resetVisualIconColor(); },
  resetCustomBackgroundColor: function() { resetCustomBackgroundColor(); },
  clearCustomBackgroundImage: function() { clearCustomBackgroundImage(); },
  resetShelfAccentColor: function() { resetShelfAccentColor(); },
  resetFx: function() { resetFx(); },
  setPreset: function(value) { setPreset(Number(value) || 0); },
  createUserFxArchive: function() { createUserFxArchive(); },
  importUserFxArchiveFromDialog: function() { importUserFxArchiveFromDialog(); },
  commitUserFxArchiveRename: function(value) { commitUserFxArchiveRename(Number(value) || 0); },
  cancelUserFxArchiveRename: function() { cancelUserFxArchiveRename(); },
  applyUserFxArchive: function(value) { applyUserFxArchive(Number(value) || 0); },
  saveUserFxArchive: function(value) { saveUserFxArchive(Number(value) || 0); },
  renameUserFxArchive: function(value) { renameUserFxArchive(Number(value) || 0); },
  exportUserFxArchive: function(value) { exportUserFxArchive(Number(value) || 0); },
  removeUserFxArchive: function(value) { removeUserFxArchive(Number(value) || 0); },
  handleUserFxArchiveRenameKey: function(value, _options, e) { handleUserFxArchiveRenameKey(e, Number(value) || 0); },
  applyCoverPickerColor: function(value) { applyCoverPickerColor(value); },
  togglePlaylistPanelPinned: function() { togglePlaylistPanelPinned(); },
  shuffleQueue: function() { shuffleQueue(); },
  switchPlaylistTab: function(value) { switchPlaylistTab(value); },
  cyclePlayMode: function() { cyclePlayMode(); },
  clearQueue: function() { clearQueue(); },
  refreshUserPlaylists: function(value) { refreshUserPlaylists(value !== 'false'); },
  showLoginModal: function() { showLoginModal(); },
  hideElementById: function(value, options) {
    var el = value ? document.getElementById(value) : null;
    var className = options && options.className;
    if (!el) return;
    if (className) el.classList.remove(className);
    else el.style.display = 'none';
  },
  openTrackDetailModal: function(value) { openTrackDetailModal(value); },
  closeMiniQueue: function() { closeMiniQueue(); },
  toggleQualityPanel: function(_value, _options, e) { toggleQualityPanel(e); },
  setPlaybackQuality: function(value) { setPlaybackQuality(value); },
  toggleLikeCurrent: function() { toggleLikeCurrent(); },
  openCollectModalForCurrent: function() { openCollectModalForCurrent(); },
  prevTrack: function() { prevTrack(); },
  togglePlay: function() { togglePlay(); },
  nextTrack: function() { nextTrack(); },
  toggleMiniQueue: function(_value, _options, e) { toggleMiniQueue(e); },
  toggleLyricsPanel: function() { toggleLyricsPanel(); },
  toggleVolumePanel: function(_value, _options, e) { toggleVolumePanel(e); },
  toggleControlsAutoHide: function() { toggleControlsAutoHide(); },
  toggleImmersiveMode: function() { toggleImmersiveMode(); },
  toggleFullscreen: function() { toggleFullscreen(); },
  setLoginProvider: function(value) { setLoginProvider(value); },
  loginRefresh: function() {
    var canOpenNeteaseWeb = !!(window.desktopWindow && typeof window.desktopWindow.openNeteaseMusicLogin === 'function');
    if (loginProvider === 'qq') openQQWebLogin();
    else if (canOpenNeteaseWeb) openNeteaseWebLogin();
    else refreshQr();
  },
  openProviderWebLogin: function() { openProviderWebLogin(); },
  submitQQCookieLogin: function() { submitQQCookieLogin(); },
  submitNavidromeConfig: function() { submitNavidromeConfig(); },
  closeLoginModal: function() { closeLoginModal(); },
  skipLoginAndFocusSearch: function() { skipLoginAndFocusSearch(); },
  requestDualLoginMode: function() { requestDualLoginMode(); },
  toggleQQCookiePanel: function() { toggleQQCookiePanel(); },
  refreshQr: function() { refreshQr(); },
  setActiveAccountProvider: function(value) { setActiveAccountProvider(value); },
  enableDualAccountView: function() { enableDualAccountView(); },
  openProviderLogin: function(value) { openProviderLogin(value); },
  closeUserModal: function() { closeUserModal(); },
  logoutActiveAccount: function() { logoutActiveAccount(); },
  closeCoverCropModal: function() { closeCoverCropModal(); },
  commitCoverCrop: function() { commitCoverCrop(); },
  createPlaylistFromCollect: function() { createPlaylistFromCollect(); },
  closeCollectModal: function() { closeCollectModal(); },
  selectLocalBeatMode: function(value) { selectLocalBeatMode(value); },
  closeLocalBeatModal: function() { closeLocalBeatModal(); },
  cancelLocalBeatAnalysis: function() { cancelLocalBeatAnalysis(); },
  startLocalBeatAnalysis: function() { startLocalBeatAnalysis(); },
  deleteCustomLyricForCurrent: function() { deleteCustomLyricForCurrent(); },
  closeCustomLyricModal: function() { closeCustomLyricModal(); },
  saveCustomLyricForCurrent: function() { saveCustomLyricForCurrent(); },
  closeTrackDetailModal: function() { closeTrackDetailModal(); },
  playNavidromeArtistTopSongs: function() { playNavidromeArtistTopSongs(); },
  playNavidromeArtistRandomSongs: function() { playNavidromeArtistRandomSongs(); },
  openNavidromeArtistAlbum: function(value) { openNavidromeArtistAlbum(Number(value) || 0); },
  playNavidromeAlbumNow: function() { playNavidromeAlbumNow(); },
  shuffleNavidromeAlbum: function() { shuffleNavidromeAlbum(); },
  queueNavidromeAlbumNext: function() { queueNavidromeAlbumNext(); },
  appendNavidromeAlbumToQueue: function() { appendNavidromeAlbumToQueue(); },
  collectNavidromeAlbum: function() { collectNavidromeAlbum(); },
  downloadNavidromeAlbum: function() { downloadNavidromeAlbum(); },
  playNavidromeAlbumTrack: function(value) { playNavidromeAlbumTrack(Number(value) || 0); },
  toggleLikeNavidromeAlbumTrack: function(value) { toggleLikeNavidromeAlbumTrack(Number(value) || 0); },
  downloadNavidromeAlbumTrack: function(value) { downloadNavidromeAlbumTrack(Number(value) || 0); },
  queueNavidromeAlbumTrackNext: function(value) { queueNavidromeAlbumTrackNext(Number(value) || 0); },
  openSearchResultArtist: function(value) { openSearchResultArtist(Number(value) || 0); },
  playSearchResult: function(value) { playSearchResult(Number(value) || 0); },
  toggleLikeSearchResult: function(value) { toggleLikeSearchResult(Number(value) || 0); },
  collectSearchResult: function(value) { collectSearchResult(Number(value) || 0); },
  queueSearchResult: function(value) { queueSearchResult(Number(value) || 0); },
  openPodcastPrograms: function(value) { openPodcastPrograms(Number(value) || 0); },
  renderPodcastRadios: function() { renderPodcastRadios(podcastResults); },
  playPodcastProgram: function(value) { playPodcastProgram(Number(value) || 0); },
  queuePodcastProgram: function(value) { queuePodcastProgram(Number(value) || 0); },
  playQueueAt: function(value) { playQueueAt(Number(value) || 0); },
  queueIndexNext: function(value) { queueIndexNext(Number(value) || 0); },
  removeFromQueue: function(value) { removeFromQueue(Number(value) || 0); },
  openQueueArtist: function(value) { openQueueArtist(Number(value) || 0); },
  toggleLikeQueueIndex: function(value) { toggleLikeQueueIndex(Number(value) || 0); },
  collectQueueIndex: function(value) { collectQueueIndex(Number(value) || 0); },
  collectArtistDetailSong: function(value) { collectArtistDetailSong(Number(value) || 0); },
  queueArtistDetailSongNext: function(value) { queueArtistDetailSongNext(Number(value) || 0); },
  playArtistDetailSong: function(value) { playArtistDetailSong(Number(value) || 0); },
  toggleLikeArtistDetailSong: function(value) {
    var i = Number(value) || 0;
    if (playQueue[i]) toggleLikeSong(playQueue[i]);
  },
  addCollectTargetToPlaylist: function(value) { addCollectTargetToPlaylist(value); },
  startUpdatePreviewDownload: function() { startUpdatePreviewDownload(); },
  closeUpdatePanel: function() { closeUpdatePanel(); },
  closeSourceFallbackNotice: function() { closeSourceFallbackNotice(); },
  closeVisualGuide: function(value) { closeVisualGuide(value !== 'false'); },
  nextVisualGuideStep: function() { nextVisualGuideStep(); }
};

function parseDomActionOptions(raw) {
  if (!raw) return null;
  try { return JSON.parse(raw); } catch (e) { return null; }
}

function installDeclarativeDomActions() {
  document.addEventListener('click', function(e) {
    var stopTarget = e.target && e.target.closest ? e.target.closest('[data-stop-propagation="true"]') : null;
    if (stopTarget) e.stopPropagation();
    var target = e.target && e.target.closest ? e.target.closest('[data-action]') : null;
    if (!target || e.defaultPrevented) return;
    var action = target.getAttribute('data-action');
    var handler = MINERADIO_DOM_ACTIONS[action];
    if (typeof handler !== 'function') return;
    e.preventDefault();
    if (target.getAttribute('data-stop-propagation') === 'true') e.stopPropagation();
    handler(target.getAttribute('data-action-value'), parseDomActionOptions(target.getAttribute('data-action-options')), e, target);
  });
  document.addEventListener('mousemove', function(e) {
    var target = e.target && e.target.closest ? e.target.closest('[data-action-mousemove]') : null;
    if (!target) return;
    var handler = MINERADIO_DOM_ACTIONS[target.getAttribute('data-action-mousemove')];
    if (typeof handler === 'function') handler(target.getAttribute('data-action-value'), parseDomActionOptions(target.getAttribute('data-action-options')), e, target);
  });
  document.addEventListener('mouseleave', function(e) {
    var target = e.target && e.target.closest ? e.target.closest('[data-action-mouseleave]') : null;
    if (!target) return;
    var handler = MINERADIO_DOM_ACTIONS[target.getAttribute('data-action-mouseleave')];
    if (typeof handler === 'function') handler(target.getAttribute('data-action-value'), parseDomActionOptions(target.getAttribute('data-action-options')), e, target);
  }, true);
  document.addEventListener('keydown', function(e) {
    var target = e.target && e.target.closest ? e.target.closest('[data-action-keydown]') : null;
    if (!target) return;
    var handler = MINERADIO_DOM_ACTIONS[target.getAttribute('data-action-keydown')];
    if (typeof handler === 'function') handler(target.getAttribute('data-action-value'), parseDomActionOptions(target.getAttribute('data-action-options')), e, target);
  });
}

installDeclarativeDomActions();
