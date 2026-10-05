# Facebook Views - Multi-Tab Video Player

🎬 A powerful web application for viewing multiple Facebook videos simultaneously to maximize watch time and engagement.

## 🌐 Live Demo

Visit the live site: `https://YOUR_USERNAME.github.io/facebookviuer/`

## 📱 Screenshots

![Facebook Views Landing Page](https://via.placeholder.com/800x400?text=Facebook+Views+Landing+Page)

A simple yet powerful application for viewing Facebook videos across multiple tabs with advanced controls.

## Featuresbb      

- **Landing Page**: Click the "Facebook Views" title to get started
- **Multi-Tab Configuration**: 
  - Set the number of tabs (1-100)
  - Choose between single video or different videos per tab
  - Easy-to-use interface for video URL management

- **Playback Options**:
  - **Single Video Mode**: One URL opens in all tabs
  - **Different Videos Mode**: Separate URL input for each tab

- **Video Controls**:
  - Autoplay muted for all videos
  - Replay button for each video
  - Pause functionality (limited by Facebook SDK)
  - Replace video link on-the-fly
  - "Replace" indicator when video ends
  - Global "Stop All" button

- **Facebook Integration**:
  - Facebook JavaScript SDK
  - Embedded Video Player plugin
  - Support for various Facebook video URL formats

## 🚀 Quick Start

### Using the Live Site

1. Visit the live demo URL
2. Click on the "Facebook Views" title
3. Configure your desired number of tabs
4. Choose playback mode (single or different videos)
5. Enter Facebook video URL(s)
6. Click "Start Viewing"
7. Click "Open All Videos" to start watching

### Local Development

1. Clone this repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/facebookviuer.git
   cd facebookviuer
   ```

2. Open `index.html` in your web browser:
   ```bash
   # Windows
   start index.html
   
   # Mac
   open index.html
   
   # Linux
   xdg-open index.html
   ```

3. No build process required - it's pure HTML, CSS, and JavaScript!

## Important Update (September 2025)

**All videos on Facebook are now reels.** All videos posted to Facebook are shared as reels, regardless of length or orientation. This application automatically converts all video URLs to the reel format for proper embedding.

## Supported URL Formats

The application supports **ALL** Facebook video/reel URL formats, including:

### Reels (Primary Format)
- `https://www.facebook.com/reel/123456789`
- `https://www.facebook.com/reels/123456789`

### Legacy Video URLs (Auto-Converted to Reels)
- `https://www.facebook.com/username/videos/123456789/`
- `https://www.facebook.com/pagename/videos/123456789/`
- `https://www.facebook.com/video.php?v=123456789`

### Watch URLs (Auto-Converted to Reels)
- `https://www.facebook.com/watch?v=123456789`
- `https://www.facebook.com/watch/live/?v=123456789`

### Short URLs
- `https://fb.watch/abc123def/`
- `https://fb.me/abc123def`

### Share Links
- `https://www.facebook.com/share/v/123456789/`
- `https://www.facebook.com/share/r/123456789/`

### Mobile URLs
- `https://m.facebook.com/username/videos/123456789/`
- Any mobile URL (automatically converted to desktop)

### Direct Video IDs
- Just the video ID: `123456789012345`
- The app will automatically construct a valid URL

### Other Formats
- Permalink URLs: `https://www.facebook.com/permalink.php?story_fbid=123456789`
- Story URLs: `https://www.facebook.com/stories/123456789`
- URLs with query parameters: `?v=123456789`, `?video_id=123456789`, `?fbid=123456789`

**Note:** The application automatically:
- Validates all URLs
- Extracts video IDs from any format
- **Converts legacy video URLs to reel format**
- Normalizes URLs for embedding
- Converts mobile URLs to desktop versions
- Handles URLs with or without `https://` prefix

### Troubleshooting

If videos show "Video unavailable" or don't load:
1. **Check video privacy**: Only public videos can be embedded
2. **Verify the URL**: Make sure it's a valid Facebook video/reel URL
3. **Try opening in new tab**: Use the "Open in New Tab" button to view directly on Facebook
4. **Check permissions**: Some videos may have embedding disabled by the uploader
5. **Use reel URLs**: For best results, use direct reel URLs: `https://www.facebook.com/reel/ID`

## Usage Notes

1. **Autoplay**: All videos are set to autoplay with muted audio to comply with browser autoplay policies
2. **Pause Control**: Due to Facebook embedded player limitations, direct pause control is limited. Users may need to interact with the video player itself
3. **Replace Indicator**: Shows when a video is likely to have ended (after 1 minute) or can be manually triggered
4. **Video Replacement**: Each tab can have its video link replaced without refreshing the entire page

## Controls

### Global Controls
- **Stop All Tabs**: Stops all videos across all tabs

### Per-Tab Controls
- **Replay**: Restart the current video
- **Pause**: Pause the video (limited functionality)
- **Replace Link**: Change the video URL for this specific tab

## Technical Details

- Built with vanilla HTML, CSS, and JavaScript
- Facebook JavaScript SDK v18.0
- Responsive design for mobile and desktop
- No external dependencies except Facebook SDK

## Browser Compatibility

Works best in modern browsers (Chrome, Firefox, Edge, Safari) that support:
- ES6 JavaScript
- CSS Grid
- Facebook embedded video player

## Privacy & Security

- No data is collected or stored
- All video playback is handled directly by Facebook's embedded player
- URLs are processed client-side only

## Limitations

- Facebook embedded player provides limited programmatic control over video playback
- Some video features depend on Facebook's API availability and user permissions
- Autoplay requires muted audio per browser policies

## License

This project is free to use and modify.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/YOUR_USERNAME/facebookviuer/issues).

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.

## ⭐ Show Your Support

Give a ⭐️ if this project helped you!

---

Made with ❤️ for the Facebook community
