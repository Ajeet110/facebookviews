// Global variables
let currentMode = 'single';
let tabCount = 10;
let videoPlayers = [];

// DOM Elements
const landingPage = document.getElementById('landingPage');
const multiTabSection = document.getElementById('multiTabSection');
const playerSection = document.getElementById('playerSection');
const mainTitle = document.getElementById('mainTitle');
const tabCountInput = document.getElementById('tabCount');
const playbackModeRadios = document.getElementsByName('playbackMode');
const singleVideoInput = document.getElementById('singleVideoInput');
const multipleVideosInput = document.getElementById('multipleVideosInput');
const videoUrlsContainer = document.getElementById('videoUrlsContainer');
const startBtn = document.getElementById('startBtn');
const backBtn = document.getElementById('backBtn');
const stopAllBtn = document.getElementById('stopAllBtn');
const backToConfigBtn = document.getElementById('backToConfigBtn');
const tabsContainer = document.getElementById('tabsContainer');

// Event Listeners
mainTitle.addEventListener('click', showMultiTabSection);
backBtn.addEventListener('click', showLandingPage);
backToConfigBtn.addEventListener('click', showMultiTabSection);
startBtn.addEventListener('click', startViewing);
stopAllBtn.addEventListener('click', stopAllVideos);

playbackModeRadios.forEach(radio => {
    radio.addEventListener('change', handlePlaybackModeChange);
});

tabCountInput.addEventListener('input', handleTabCountChange);

// Navigation Functions
function showMultiTabSection() {
    landingPage.classList.add('hidden');
    multiTabSection.classList.remove('hidden');
    playerSection.classList.add('hidden');
}

function showLandingPage() {
    landingPage.classList.remove('hidden');
    multiTabSection.classList.add('hidden');
    playerSection.classList.add('hidden');
    videoPlayers = [];
}

function showPlayerSection() {
    landingPage.classList.add('hidden');
    multiTabSection.classList.add('hidden');
    playerSection.classList.remove('hidden');
}

// Handle playback mode change
function handlePlaybackModeChange(e) {
    currentMode = e.target.value;
    
    if (currentMode === 'single') {
        singleVideoInput.classList.remove('hidden');
        multipleVideosInput.classList.add('hidden');
    } else {
        singleVideoInput.classList.add('hidden');
        multipleVideosInput.classList.remove('hidden');
        generateVideoInputs();
    }
}

// Handle tab count change
function handleTabCountChange() {
    const value = parseInt(tabCountInput.value);
    if (value > 0 && value <= 100) {
        tabCount = value;
        if (currentMode === 'different') {
            generateVideoInputs();
        }
    }
}

// Generate multiple video input fields
function generateVideoInputs() {
    videoUrlsContainer.innerHTML = '';
    
    for (let i = 1; i <= tabCount; i++) {
        const inputDiv = document.createElement('div');
        inputDiv.className = 'video-url-input';
        inputDiv.innerHTML = `
            <label>Tab ${i} Video URL:</label>
            <input type="text" id="videoUrl${i}" placeholder="Facebook URL or Video ID">
        `;
        videoUrlsContainer.appendChild(inputDiv);
    }
}

// Extract video ID
function extractVideoId(url) {
    url = url.trim();
    
    const patterns = [
        /facebook\.com\/reel\/(\d+)/i,
        /facebook\.com\/reels\/(\d+)/i,
        /facebook\.com\/share\/v\/([a-zA-Z0-9_-]+)/i,
        /facebook\.com\/share\/r\/([a-zA-Z0-9_-]+)/i,
        /fb\.watch\/([a-zA-Z0-9_-]+)/i,
        /fb\.me\/([a-zA-Z0-9_-]+)/i,
        /facebook\.com\/.*\/videos\/(\d+)/i,
        /facebook\.com\/video\.php\?v=(\d+)/i,
        /facebook\.com\/watch\/?\?v=(\d+)/i,
        /m\.facebook\.com\/.*\/videos\/(\d+)/i,
        /m\.facebook\.com\/reel\/(\d+)/i,
        /[?&]v=(\d+)/i,
        /[?&]video_id=(\d+)/i
    ];
    
    for (let pattern of patterns) {
        const match = url.match(pattern);
        if (match && match[1]) {
            return match[1];
        }
    }
    
    const numberMatch = url.match(/(\d{10,})/);
    if (numberMatch) return numberMatch[1];
    
    if (/^\d{10,}$/.test(url)) return url;
    
    return null;
}

// Normalize Facebook URL
function normalizeVideoUrl(url) {
    if (/^\d{10,}$/.test(url.trim())) {
        return `https://www.facebook.com/reel/${url.trim()}`;
    }
    
    if (!url.match(/^https?:\/\//i)) {
        url = 'https://' + url;
    }
    
    url = url.replace(/m\.facebook\.com/i, 'www.facebook.com');
    
    const videoIdMatch = url.match(/\/videos\/(\d+)/i);
    if (videoIdMatch && videoIdMatch[1]) {
        return `https://www.facebook.com/reel/${videoIdMatch[1]}`;
    }
    
    const watchMatch = url.match(/watch\/?\?v=(\d+)/i);
    if (watchMatch && watchMatch[1]) {
        return `https://www.facebook.com/reel/${watchMatch[1]}`;
    }
    
    return url;
}

// Validate Facebook URL
function isValidFacebookUrl(url) {
    if (!url || typeof url !== 'string') return false;
    
    url = url.trim();
    
    const validDomains = [
        /facebook\.com/i,
        /fb\.watch/i,
        /fb\.me/i,
        /m\.facebook\.com/i
    ];
    
    const hasValidDomain = validDomains.some(pattern => pattern.test(url));
    const isJustId = /^\d{10,}$/.test(url);
    
    return hasValidDomain || isJustId;
}

// Start viewing
function startViewing() {
    const urls = [];
    
    if (currentMode === 'single') {
        const singleUrl = document.getElementById('singleVideoUrl').value.trim();
        if (!singleUrl) {
            alert('Please enter a video URL');
            return;
        }
        
        if (!isValidFacebookUrl(singleUrl)) {
            alert('Please enter a valid Facebook video URL or video ID');
            return;
        }
        
        const normalizedUrl = normalizeVideoUrl(singleUrl);
        
        for (let i = 0; i < tabCount; i++) {
            urls.push(normalizedUrl);
        }
    } else {
        for (let i = 1; i <= tabCount; i++) {
            const input = document.getElementById(`videoUrl${i}`);
            const url = input ? input.value.trim() : '';
            if (!url) {
                alert(`Please enter a URL for Tab ${i}`);
                return;
            }
            
            if (!isValidFacebookUrl(url)) {
                alert(`Please enter a valid Facebook video URL for Tab ${i}`);
                return;
            }
            
            const normalizedUrl = normalizeVideoUrl(url);
            urls.push(normalizedUrl);
        }
    }
    
    createPlayerInterface(urls);
    showPlayerSection();
}

// Create player interface
function createPlayerInterface(urls) {
    videoPlayers = urls.map((url, index) => ({
        id: index + 1,
        url: url,
        videoId: extractVideoId(url),
        opened: false
    }));
    
    // Create control interface
    tabsContainer.innerHTML = `
        <div class="viewer-controls">
            <div class="viewer-header">
                <h3>Multi-Tab Video Viewer</h3>
                <div class="viewer-status">
                    <span class="status-label">Status:</span>
                    <span class="status-value" id="viewerStatus">Ready to open all videos</span>
                </div>
            </div>
            
            <div class="viewer-section">
                <div class="viewer-info">
                    <h4>🎬 Open All Videos at Once</h4>
                    <p>Click the button below to open all ${videoPlayers.length} videos. Each video will automatically play after a 3-second countdown.</p>
                    
                    <div class="watch-time-info">
                        <h5>⏱ To Maximize Watch Time:</h5>
                        <ul>
                            <li>✓ Keep all video tabs active (don't close them)</li>
                            <li>✓ Make sure you're logged into Facebook</li>
                            <li>✓ Enable sound (muted videos may not count)</li>
                            <li>✓ Let videos play completely</li>
                            <li>✓ Avoid skipping or closing tabs early</li>
                        </ul>
                    </div>
                    
                    <div class="viewer-stats">
                        <div class="stat-item">
                            <span class="stat-label">Total Videos:</span>
                            <span class="stat-value" id="totalVideos">${videoPlayers.length}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Tabs Opened:</span>
                            <span class="stat-value" id="tabsOpened">0</span>
                        </div>
                    </div>
                    <div class="viewer-buttons">
                        <button class="btn btn-success btn-large" onclick="openAllVideos()">🚀 Open All ${videoPlayers.length} Videos</button>
                        <button class="btn btn-danger" onclick="closeAllVideos()">❌ Close All Videos</button>
                    </div>
                </div>
            </div>
            
            <div class="video-list">
                <h4>Video List:</h4>
                <div class="video-items" id="videoList"></div>
            </div>
        </div>
    `;
    
    // Populate video list
    updateVideoList();
}

// Update video list display
function updateVideoList() {
    const videoList = document.getElementById('videoList');
    if (!videoList) return;
    
    videoList.innerHTML = '';
    
    videoPlayers.forEach((video, index) => {
        const videoItem = document.createElement('div');
        videoItem.className = 'video-item' + (video.opened ? ' opened' : '');
        videoItem.innerHTML = `
            <span class="video-number">${index + 1}</span>
            <span class="video-url-short">${video.url}</span>
            <span class="video-status">${video.opened ? '✓ Opened' : '⏱ Waiting'}</span>
        `;
        videoList.appendChild(videoItem);
    });
}

// Open all videos at once
function openAllVideos() {
    const confirmMsg = `This will open ${videoPlayers.length} browser tabs at once.\n\n` +
                      `Make sure:\n` +
                      `✓ You are logged into Facebook\n` +
                      `✓ Pop-up blocker is disabled\n` +
                      `✓ Sound is enabled for watch time\n\n` +
                      `Each video will auto-play after 3 seconds.\n\n` +
                      `Continue?`;
    
    if (!confirm(confirmMsg)) {
        return;
    }
    
    updateViewerStatus('Opening all videos...');
    
    let openedCount = 0;
    
    videoPlayers.forEach((video, index) => {
        setTimeout(() => {
            // Open video using player page with auto-redirect
            const playerUrl = `player.html?url=${encodeURIComponent(video.url)}&auto=true`;
            window.open(playerUrl, `facebook_video_${video.id}`, 'width=900,height=700');
            
            video.opened = true;
            openedCount++;
            
            // Update UI
            document.getElementById('tabsOpened').textContent = openedCount;
            updateVideoList();
            
            // Update status when all done
            if (openedCount === videoPlayers.length) {
                updateViewerStatus(`All ${videoPlayers.length} videos opened and playing!`);
            }
        }, index * 500); // 500ms delay between each tab
    });
}

// Close all videos
function closeAllVideos() {
    if (confirm('Note: This will only close the control panel. You need to close the video tabs manually in your browser.\n\nContinue?')) {
        showLandingPage();
    }
}

// Update viewer status
function updateViewerStatus(status) {
    const statusEl = document.getElementById('viewerStatus');
    if (statusEl) {
        statusEl.textContent = status;
    }
}

// Stop all tabs
function stopAllVideos() {
    if (confirm('This will reset the application. You need to close video tabs manually in your browser.\n\nContinue?')) {
        showLandingPage();
    }
}

// Make functions global
window.openAllVideos = openAllVideos;
window.closeAllVideos = closeAllVideos;

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    handlePlaybackModeChange({ target: { value: 'single' } });
});
