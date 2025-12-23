document.addEventListener('DOMContentLoaded', () => {
    const nojs = document.querySelector('noscript');
    if (nojs) nojs.remove();

    const fsname = '\uD83E\uDEAA Name: Philipp Seerainer';
    const fingertext = '\uD83D\uDD11 PGP fingerprint: ';
    const fingerprint = '84FA F855 8FA4 4808 B14E 9CB0 AE20 3D4D 94E2 286D';

    const projects = [
        {
            name: 'ChessGame',
            description: 'Chess with AI engine',
            language: 'Java',
            url: 'https://github.com/seerainer/ChessGame',
            emoji: '\u265F\uFE0F'
        },
        {
            name: 'CSVedit',
            description: 'CSV editor',
            language: 'Java',
            url: 'https://github.com/seerainer/CSVedit',
            emoji: '\uD83D\uDCCA'
        },
        {
            name: 'ImageViewer',
            description: 'Image viewer with Rust-based image processing',
            language: 'Java',
            url: 'https://github.com/seerainer/ImageViewer',
            emoji: '\uD83D\uDDBC\uFE0F'
        },
        {
            name: 'SecPwdMan',
            description: 'Cross-platform password manager',
            language: 'Java',
            url: 'https://github.com/seerainer/SecPwdMan',
            emoji: '\uD83D\uDD10'
        },
        {
            name: 'HexEdit',
            description: 'Hex editor',
            language: 'Java',
            url: 'https://github.com/seerainer/HexEdit',
            emoji: '\uD83E\uDE84'
        },
        {
            name: 'TetrisGame',
            description: 'Tetris',
            language: 'Java',
            url: 'https://github.com/seerainer/TetrisGame',
            emoji: '\uD83E\uDDE9'
        },
        {
            name: 'SWTextedit',
            description: 'A simple text editor',
            language: 'Java',
            url: 'https://github.com/seerainer/SWTextedit',
            emoji: '\uD83D\uDCDD'
        },
        {
            name: 'Dupes2Trash',
            description: 'Moves duplicate files to the trash',
            language: 'Java',
            url: 'https://github.com/seerainer/Dupes2Trash',
            emoji: '\uD83D\uDEAE'
        },
        {
            name: 'FileShredder',
            description: 'Secure file deletion',
            language: 'Java',
            url: 'https://github.com/seerainer/FileShredder',
            emoji: '\uD83D\uDD25'
        },
        {
            name: 'SnakeGame',
            description: 'Snake',
            language: 'Java',
            url: 'https://github.com/seerainer/SnakeGame',
            emoji: '\uD83D\uDC0D'
        },
        {
            name: 'AsteroidDodger',
            description: 'Asteroid dodger game',
            language: 'Java',
            url: 'https://github.com/seerainer/AsteroidDodger',
            emoji: '\uD83D\uDEF8'
        },
        {
            name: 'CSVparser',
            description: 'CSV parser',
            language: 'Java',
            url: 'https://github.com/seerainer/CSVparser',
            emoji: '\uD83D\uDCCA'
        },
        {
            name: '2_Player_Snake',
            description: 'Snake for 2 players',
            language: 'JavaScript',
            url: 'https://github.com/seerainer/2_Player_Snake',
            emoji: '\uD83D\uDC0D'
        },
        {
            name: 'RsJarLauncher',
            description: 'Cross-platform Java jar-file launcher',
            language: 'Rust',
            url: 'https://github.com/seerainer/RsJarLauncher',
            emoji: '\u2615'
        },
        {
            name: 'MinJarLaunch',
            description: 'Java jar-file launcher',
            language: 'C',
            url: 'https://github.com/seerainer/MinJarLaunch',
            emoji: '\u2615'
        }
    ];

    const languageColors = {
        'Java': '#b07219',
        'JavaScript': '#f1e05a',
        'Rust': '#dea584',
        'C': '#555555'
    };

    const langDE = navigator.language.startsWith('de');
    const home = langDE ? '\uD83D\uDDFA\uFE0F Ort: Salzburg, Österreich' : '\uD83D\uDDFA\uFE0F Location: Salzburg, Austria';
    const contact = langDE ? '\uD83D\uDCE7 Kontakt: ' : '\uD83D\uDCE7 Contact: ';
    const theme = langDE ? 'Design wechseln' : 'Toggle theme';
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const darkTheme = 'dark-theme';
    const lightTheme = 'light-theme';
    const themeElement = 'theme-element';
    const mail = 'philipp@seerainer.com';

    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanels = document.querySelectorAll('.tab-panel');
    const tabs = document.querySelector('.tabs');

    tabButtons.forEach(button => {
        button.classList.add(themeElement);
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');

            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));

            button.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });

    // Populate projects
    const projectsGrid = document.querySelector('.projects-grid');
    projects.forEach(project => {
        const card = document.createElement('div');
        card.className = `project-card ${themeElement}`;

        const title = document.createElement('h3');
        let descriptionText = project.description || '';
        let emojiChar = project.emoji || '';
        if (!emojiChar) {
            const match = descriptionText.match(/^\p{Extended_Pictographic}\uFE0F?/u);
            if (match) {
                emojiChar = match[0];
                descriptionText = descriptionText.replace(/^\p{Extended_Pictographic}\uFE0F?\s*/u, '');
            }
        }
        if (!emojiChar) emojiChar = '\uD83D\uDC7E';

        const emoji = document.createElement('span');
        emoji.className = 'project-emoji';
        emoji.textContent = emojiChar;
        const link = document.createElement('a');
        link.className = themeElement;
        link.href = project.url;
        link.textContent = project.name;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        title.appendChild(emoji);
        title.appendChild(link);

        const desc = document.createElement('p');
        desc.textContent = descriptionText;

        const meta = document.createElement('div');
        meta.className = 'project-meta';

        const langDiv = document.createElement('div');
        langDiv.className = 'project-language';

        const langDot = document.createElement('span');
        langDot.className = 'language-dot';
        langDot.style.backgroundColor = languageColors[project.language] || '#ccc';

        const langText = document.createElement('span');
        langText.textContent = project.language;

        langDiv.appendChild(langDot);
        langDiv.appendChild(langText);
        meta.appendChild(langDiv);

        card.appendChild(title);
        card.appendChild(desc);
        card.appendChild(meta);
        projectsGrid.appendChild(card);
    });

    // Contact info setup
    const link = document.createElement('a');
    link.className = themeElement;
    link.classList.add(prefersDarkScheme ? darkTheme : lightTheme);
    link.innerText = mail;
    link.href = 'mailto:' + mail;

    const pgp = document.createElement('a');
    pgp.className = themeElement;
    pgp.classList.add(prefersDarkScheme ? darkTheme : lightTheme);
    pgp.innerText = 'public-key.asc';
    pgp.href = '/public-key.asc';
    pgp.target = '_blank';
    pgp.rel = 'noopener noreferrer';

    const textElement = document.querySelector('.contact-info');
    const themeButton = document.querySelector('.theme-toggle');
    const images = document.querySelectorAll('img');

    [tabs, ...images].forEach(el => el.classList.add(themeElement));
    tabs.classList.add(prefersDarkScheme ? darkTheme : lightTheme);
    themeButton.innerText = prefersDarkScheme ? '\uD83D\uDD06' : '\uD83D\uDD05';
    themeButton.title = theme;

    themeButton.addEventListener('click', () => {
        document.body.classList.toggle(darkTheme);
        document.body.classList.toggle(lightTheme);
        document.querySelectorAll('.theme-element').forEach(el => {
            el.classList.toggle(darkTheme);
            el.classList.toggle(lightTheme);
        });
        themeButton.innerText = document.body.classList.contains(darkTheme) ? '\uD83D\uDD06' : '\uD83D\uDD05';
    });

    const policy = window.trustedTypes ? trustedTypes.createPolicy('default', {
        createHTML: (string) => string
    }) : null;

    let index = 0;
    function showText() {
        if (index < fsname.length) {
            textElement.innerHTML += policy ? policy.createHTML(fsname.charAt(index)) : fsname.charAt(index);
        } else if (index < fsname.length + home.length) {
            textElement.innerHTML += policy ? policy.createHTML(home.charAt(index - fsname.length)) : home.charAt(index - fsname.length);
        } else if (index < fsname.length + home.length + contact.length) {
            textElement.innerHTML += policy ? policy.createHTML(contact.charAt(index - fsname.length - home.length)) : contact.charAt(index - fsname.length - home.length);
        } else if (index === fsname.length + home.length + contact.length) {
            const finger = document.createElement('pre');
            const newContent = document.createTextNode(fingerprint);
            finger.appendChild(newContent);
            finger.className = themeElement;
            finger.classList.add(prefersDarkScheme ? darkTheme : lightTheme);
            textElement.append(link, document.createElement('br'), fingertext, finger, pgp);
            themeButton.disabled = false;
        }
        if (index === fsname.length - 1 || index === fsname.length + home.length - 1) {
            textElement.appendChild(document.createElement('br'));
        }
        index++;
        setTimeout(showText, 10);
    }

    document.body.classList.add(prefersDarkScheme ? darkTheme : lightTheme);
    document.querySelectorAll('.theme-element').forEach(el => {
        el.classList.add(prefersDarkScheme ? darkTheme : lightTheme);
    });

    showText();
});