import { Plugin, Editor, MarkdownView, TFile, Platform } from 'obsidian';

export default class MediaLinkToHtmlPlugin extends Plugin {
  private lastKeyTime: number = 0;
  private lastKeyCombo: string = '';

  onload() {
    this.registerDomEvent(document, 'keydown', (event) => {
      const isCmdOrCtrl = event.metaKey || event.ctrlKey;
      const isShift = event.shiftKey;
      const isArrow = event.key === 'ArrowRight' || event.key === 'ArrowLeft';
      const isCloseBracket = event.key === ']';
      
      // Check if it's either the close bracket OR the cmd+shift+arrow combo
      if (isCloseBracket || (isCmdOrCtrl && isShift && isArrow)) {
        const currentTime = Date.now();
        
        // For arrow keys, check if it's a double press within 500ms
        if (isCloseBracket || 
            (this.lastKeyTime > 0 && // ensure it's not the first press
            currentTime - this.lastKeyTime < 500 && 
            this.lastKeyCombo === event.key)) {
          
          const activeView = this.app.workspace.getActiveViewOfType(MarkdownView);
          if (!activeView) return;

          const editor = activeView.editor;
          const cursor = editor.getCursor();
          const currentLineText = editor.getLine(cursor.line);
          const fullText = isCloseBracket ? currentLineText + ']' : currentLineText;
          
          const mediaLinkRegex = /!\[\[(.+\.(mp4|webm|mov|m4v|jpg|jpeg|png|gif|webp|avif|svg|mp3|wav|ogg|m4a|aac))\]\]$/;
          const match = fullText.match(mediaLinkRegex);
          
          if (match) {
            const fileName = match[1];
            const fileExtension = match[2].toLowerCase();
            const file = this.app.metadataCache.getFirstLinkpathDest(fileName, '');
            
            if (file instanceof TFile) {
              const resourcePath = this.app.vault.getResourcePath(file);
              const pathMatch = resourcePath.match(/app:\/\/.*?(\/.*?\.(mp4|webm|mov|m4v|jpg|jpeg|png|gif|webp|avif|svg|mp3|wav|ogg|m4a|aac))/i);
              const cleanPath = pathMatch ? pathMatch[1] : resourcePath;
              
              const isVideo = /^(mp4|webm|mov|m4v)$/i.test(fileExtension);
              const isAudio = /^(mp3|wav|ogg|m4a|aac)$/i.test(fileExtension);
              
              let mediaHTML = '';
              if (isVideo) {
                const mimeType = `video/${fileExtension === 'mov' || fileExtension === 'm4v' ? 'mp4' : fileExtension}`;
                mediaHTML = `<video controls width="600">
  <source src="${cleanPath}" type="${mimeType}">
  Your browser does not support the video tag.
</video>`;
              } else if (isAudio) {
                const mimeType = `audio/${fileExtension === 'm4a' ? 'mp4' : fileExtension}`;
                mediaHTML = `<audio controls>
  <source src="${cleanPath}" type="${mimeType}">
  Your browser does not support the audio tag.
</audio>`;
              } else {
                mediaHTML = `<img src="${cleanPath}" alt="${fileName}" />`;
              }

              const newPosition = { line: cursor.line + 1, ch: 0 };
              editor.replaceRange(`\n${mediaHTML}\n`, newPosition, newPosition);
            }
          }
        }
        
        // Update the last key info for arrow key combinations
        if (isCmdOrCtrl && isShift && isArrow) {
          this.lastKeyTime = currentTime;
          this.lastKeyCombo = event.key;
        }
      }
    });
  }

  onunload() {}
}