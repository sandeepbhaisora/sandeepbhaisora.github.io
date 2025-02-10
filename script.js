document.addEventListener("DOMContentLoaded", function () {
    const folderTogglers = document.querySelectorAll('.project-sidebar li:has(> i.fa-folder), .project-sidebar li:has(> i.fa-folder-open)');
    const runButton = document.getElementById('run-button');
    const terminalPopup = document.getElementById('terminal-popup');
    const closeTerminalButton = document.querySelector('.terminal-close-btn');
    const fileContent = document.getElementById('file-content');
    const themeToggleButton = document.getElementById('theme-toggle-button');
    const terminalTextarea = document.getElementById('terminal-textarea-bottom');
    const terminalPrompt = "~/sandeepbhaisora.github.io>>";
    const terminalTextareaPopUp = document.getElementById('terminal-textarea');
    let currentFile = "";
    let currentInput = "";


    const editor = CodeMirror.fromTextArea(fileContent, {
        lineNumbers: true,
        mode: "text/x-java", // Default mode, you can change it dynamically
        theme: "solarized light", // Initial theme
        readOnly: true

    });

    const converter = new showdown.Converter();


    terminalTextarea.value = `${terminalPrompt}\n`;

    terminalTextarea.addEventListener('keydown', function(event) {
        const currentLine = terminalTextarea.value.slice(terminalTextarea.value.lastIndexOf('\n') + 1);
        if (event.key === 'Enter') {
            event.preventDefault();
            terminalTextarea.value += `\n${terminalPrompt}`;
            currentInput = "";
            terminalTextarea.scrollTop = terminalTextarea.scrollHeight;
        } else if (event.key === 'Backspace') {
            if (currentInput.length > 0) {
                currentInput = currentInput.slice(0, -1);
                terminalTextarea.value = terminalTextarea.value.slice(0, -1);
            }
            event.preventDefault();
        } else if (event.key.length === 1) { // Only process printable characters
            currentInput += event.key;
            terminalTextarea.value += event.key;
            event.preventDefault(); // Prevent the default action to avoid double characters
        }
    });

    terminalTextarea.addEventListener('input', function(event) {
        // Prevent manual edits
        const lines = terminalTextarea.value.split('\n');
        const lastLine = lines[lines.length - 1];
        if (!lastLine.startsWith(terminalPrompt)) {
            terminalTextarea.value = lines.slice(0, -1).join('\n') + '\n' + terminalPrompt + currentInput;
        }
    });



    runButton.addEventListener('click', function () {
        if (currentFile) {
            if (currentFile.endsWith('Resume.java')) {
                terminalPopup.style.display = 'flex';
                terminalTextareaPopUp.value = "Downloading...\n";

                let dots = '';
                const animationInterval = setInterval(() => {
                    dots += '.';
                    if (dots.length > 3) dots = '';
                    terminalTextareaPopUp.value = `Downloading${dots}\n`;
                }, 500);

                // Simulate download delay and then download the PDF file
                setTimeout(() => {
                    clearInterval(animationInterval); // Stop the animation
                    terminalTextareaPopUp.value = "Download complete.\n";
                    downloadFile('files/resume.pdf', 'resume.pdf');
                    terminalTextareaPopUp.value = "Download complete.\n";// Change to the actual path of your PDF
                }, 3000); // Simulate a 3-second download delay
            } else {
                // Construct the path to the corresponding .md file
                const outputFilePath = currentFile.replace(/\.[^.]+$/, '.md');

                // Fetch the content of the corresponding .md file
                fetch(outputFilePath)
                    .then(response => response.text())
                    .then(data => {
                        // Parse the markdown content to HTML using showdown library
                        const htmlContent = converter.makeHtml(data);

                        // Create a temporary element to hold the HTML
                        const tempElement = document.createElement('div');
                        tempElement.innerHTML = htmlContent;

                        // Extract the text content from the HTML
                        const plainText = tempElement.textContent || tempElement.innerText || '';

                        // Display the content in the popup terminal
                        terminalPopup.style.display = 'flex';
                        terminalTextareaPopUp.value = "";
                        typeEffect(terminalTextareaPopUp, plainText);
                    })
                    .catch(error => {
                        console.error('Error loading output file:', error);
                        terminalPopup.style.display = 'flex';
                        terminalTextareaPopUp.value = "Error loading output file.\n";
                    });
            }
        } else {
            alert("No file is open. Please open a file before running the application.");
        }
    });

    themeToggleButton.addEventListener('click', function () {
        const isDarkTheme = document.body.classList.toggle('dark-theme');
        document.body.classList.toggle('light-theme');
        const newTheme = isDarkTheme ? 'solarized dark' : 'solarized light';
        editor.setOption('theme', newTheme);

    });

    closeTerminalButton.addEventListener('click', function () {
        terminalPopup.style.display = 'none';
    });

    folderTogglers.forEach(folder => {
        folder.addEventListener('click', function(event) {
            // Prevent the event from bubbling up to parent elements
            event.stopPropagation();
            this.classList.toggle('active');
            const icon = this.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-folder');
                icon.classList.toggle('fa-folder-open');
            }
        });
    });

    const files = document.querySelectorAll('.file');

    files.forEach(file => {
        file.addEventListener('click', function(event) {
            // Prevent the event from bubbling up to parent elements
            event.stopPropagation();
            const filePath = this.getAttribute('data-file');
            if (filePath) {
                openFile(filePath, this.textContent);
            }
        });
    });

    function openFile(filePath, fileName) {
        fetch(filePath)
            .then(response => response.text())
            .then(data => {
                editor.setValue(data);
                editor.setOption("mode", getMode(filePath));
                addFileToTopBar(filePath, fileName);
                setActiveFile(filePath);
                currentFile = filePath; // Set the current file to the opened file

                // Set the active file when a file is opened
            })
            .catch(error => {
                document.getElementById('file-content').textContent = 'Error loading file';
                console.error('Error loading file:', error);
            });
    }

    function getMode(filePath) {
        const extension = filePath.split('.').pop();
        switch (extension) {
            case 'java': return 'text/x-java';
            case 'js': return 'text/javascript';
            case 'xml': return 'application/xml';
            case 'py': return 'text/x-python';
            default: return 'text/plain';
        }
    }

    function addFileToTopBar(filePath, fileName) {
        const openFiles = document.getElementById('open-files');

        // Check if the file is already open
        if (document.querySelector(`li[data-file="${filePath}"]`)) {
            setActiveFile(filePath);  // Set the active file if it's already open
            return;
        }

        const fileItem = document.createElement('li');
        fileItem.setAttribute('data-file', filePath);
        fileItem.innerHTML = `
            <span>${fileName}</span>
            <i class="fas fa-times close-file"></i>
        `;

        openFiles.appendChild(fileItem);

        fileItem.querySelector('.close-file').addEventListener('click', function (event) {
            event.stopPropagation(); // Prevent triggering the fileItem click event
            closeFile(filePath, fileItem);
        });

        fileItem.addEventListener('click', function () {
            openFile(filePath, fileName);
        });
    }

    function typeEffect(element, text, callback) {
        let index = 0;
        let speed = 50;
        // Typing speed in milliseconds
        const speedIncrement = 4; // Increment speed by 2 milliseconds each character


        function type() {
            if (index < text.length) {
                element.value += text.charAt(index);
                index++;
                setTimeout(type, speed);
                speed = Math.max(10, speed - speedIncrement); // Increase speed, with a minimum delay of 10ms
            } else if (callback) {
                callback(); // Call the callback function when typing is done
            }
        }

        type();
    }

    function closeFile(filePath, fileItem) {
        const isActive = fileItem.classList.contains('active');
        fileItem.remove();

        if (isActive) {
            document.getElementById('file-content').textContent = '';
            document.getElementById('file-content').removeAttribute('data-file');
            // Optionally, set another open file as active
            const remainingFiles = document.querySelectorAll('#open-files li');
            if (remainingFiles.length > 0) {
                const newActiveFile = remainingFiles[0];
                const newFilePath = newActiveFile.getAttribute('data-file');
                const newFileName = newActiveFile.querySelector('span').textContent;
                openFile(newFilePath, newFileName);
            }
        }
    }

    function downloadFile(url, filename) {
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    function setActiveFile(filePath) {
        const openFiles = document.querySelectorAll('#open-files li');
        openFiles.forEach(file => {
            if (file.getAttribute('data-file') === filePath) {
                file.classList.add('active');
            } else {
                file.classList.remove('active');
            }
        });
    }

    // Load README.md by default
    openFile('files/README.md', 'README.md');
});