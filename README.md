# Media Link to HTML

This plugin enhances your media embedding workflow in Obsidian by automatically converting media links into proper HTML elements with controls.

## Features

- Automatically converts media links into playable/viewable elements
- Supports multiple media types:
  - **Videos**: mp4, webm, mov, m4v
  - **Audio**: mp3, wav, ogg, m4a, aac
  - **Images**: jpg, jpeg, png, gif, webp, avif, svg
- Two convenient trigger methods:
  - Double-press `Cmd/Ctrl + Shift + Arrow` (→ or ←)
  - Type the closing bracket `]` of a media link

## How to Use

1. Insert a media link in your note using Obsidian's standard format:
   ```markdown
   ![[your-video.mp4]]
   ```

2. Convert the link to an HTML element using either method:
   - **Method 1**: Double-press `Cmd/Ctrl + Shift + Arrow` (→ or ←)
   - **Method 2**: Type the closing bracket `]` to complete the link

The plugin will automatically convert your media link into the appropriate HTML element:
- Videos will become `<video>` elements with controls
- Audio files will become `<audio>` elements with controls
- Images will become `<img>` elements

## Examples

### Video

![[sample-video.mp4]]
↓ Converts to ↓

<video controls width="600">
  <source src="/sample-video.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

### Audio

![[podcast-episode.mp3]]
↓ Converts to ↓

<audio controls>
  <source src="/podcast-episode.mp3" type="audio/mp3">
  Your browser does not support the audio tag.
</audio>

### Image

![[screenshot.png]]
↓ Converts to ↓

<img src="/screenshot.png" alt="screenshot.png" />

## Installation

1. Open Obsidian Settings
2. Navigate to Community Plugins and disable Safe Mode
3. Click Browse and search for "Obsidian Media Link to HTML"
4. Install the plugin
5. Enable the plugin in your Community Plugins list

## Support

If you encounter any issues or have suggestions for improvements, please visit the [GitHub repository](https://github.com/cypar/obsidian-media-link-to-html) and create an issue.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Credits

Created by Chan Young Park with Cursor AI

---

If you find this plugin helpful, consider:
- Star the repository on GitHub
- Share it with other Obsidian users
- [Buy me a coffee](https://buymeacoffee.com/cypark) ☕️ 
