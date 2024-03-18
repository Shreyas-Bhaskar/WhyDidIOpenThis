# WhyDidIOpenThis

"Why did I open this?" is a Chrome extension designed to help users remember why they opened their tabs. By allowing users to attach notes to their browser tabs, this extension enhances productivity and organization, providing a simple solution to a common problem.

## Features

- **Add Notes to Tabs**: Easily jot down your thoughts or reminders related to the content of your tabs.
- **Automatic Note Deletion**: Notes are automatically deleted when the tab is closed, keeping your workspace clutter-free.
- **Intuitive User Interface**: A simple and clean UI ensures that adding and viewing notes is seamless and efficient.

## Installation

This extension is currently in development and not yet available in the Chrome Web Store. To use it now, you can load it unpacked in developer mode:

1. Clone this repository or download the ZIP file and extract it.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable "Developer mode" at the top right.
4. Click "Load unpacked" and select the extracted folder for this extension.

## Usage

After installation, click on the extension icon in your browser toolbar to open the popup. From there, you can add a note for the current tab. Notes will automatically be saved and can be viewed by reopening the popup on the same tab.

## Development Setup

To set up a development environment for the extension, you'll need:

- A code editor (e.g., Visual Studio Code, Sublime Text, Atom)
- Basic knowledge of HTML, CSS, and JavaScript

Refer to the `manifest.json` for an overview of the extension's structure and permissions.

### Directory Structure

A brief overview of the key directories and files:

why-did-i-open-this/
├── icons/
├── popup/
├── background/
├── content_scripts/ (optional)
├── manifest.json
└── images/ (optional)



## Future Enhancements

- **Sync Notes Across Devices**: Allow users to access their notes across different devices, enhancing the utility of the extension for those who work on multiple computers.
- **Note Management**: Introduce features for managing notes, such as categorization, search functionality, and the option to save notes permanently.
- **Support for Multiple Browsers**: Expand the extension to work on other browsers like Firefox and Edge, reaching a wider audience.
- **UI Customization**: Offer themes or customization options for the popup UI, allowing users to personalize their note-taking experience.
- **Integration with Task Managers**: Allow notes to be exported to or synchronized with popular task management apps, turning tabs into actionable items.

## Contributing

Contributions are welcome! If you have ideas for new features or improvements, please open an issue or submit a pull request.

## License

Distributed under the MIT License. See `LICENSE` for more information.


