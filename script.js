document.addEventListener('DOMContentLoaded', () => {
    const nojs = document.querySelector('noscript');
    if (nojs) nojs.remove();

    const fsname = 'Name: Philipp Seerainer';
    const pgpKey = `-----BEGIN PGP PUBLIC KEY BLOCK-----
mDMEYrzIqxYJKwYBBAHaRw8BAQdA7IsFT4l1unJVRExP6eqTy2rJ4HxIL4Zwba8r
eb2hTfG0KVBoaWxpcHAgU2VlcmFpbmVyIDxwaGlsaXBwQHNlZXJhaW5lci5jb20+
iJMEExYKADsWIQSE+vhVj6RICLFOnLCuID1NlOIobQUCYrzIqwIbIwULCQgHAgIi
AgYVCgkICwIEFgIDAQIeBwIXgAAKCRCuID1NlOIobSzeAP9UebF7rBPa+k/1TjZa
/7mshIQTRfBzRqT8nvvYBHq84QD/RnH5cJDvsXKM0KV0jWOcqmELm1ImBGq8Nbl2
MFn5DQ64OARivMirEgorBgEEAZdVAQUBAQdAX7XQ10VBNLh7MW4m9TrLSTm/wqui
YkJAboaiI/m4nRQDAQgHiHgEGBYKACAWIQSE+vhVj6RICLFOnLCuID1NlOIobQUC
YrzIqwIbDAAKCRCuID1NlOIobe0kAP9BmLHOxHtfFyCJO0d+/jv9rT2gCtqycZct
phva83NCYwEA1XIo3tBp2RL5JKm31GWpSC8HvS2TY42LhqmDm+GJUQc=
=Z83F
-----END PGP PUBLIC KEY BLOCK-----`;
    
    const projects = [
        {
            name: '🖼️ ImageViewer',
            description: 'Image viewer with Rust-based image processing',
            language: 'Java',
            url: 'https://github.com/seerainer/ImageViewer'
        },
        {
            name: '🔐 SecPwdMan',
            description: 'Cross-platform Password Manager',
            language: 'Java',
            url: 'https://github.com/seerainer/SecPwdMan'
        },
        {
            name: '📊 CSVedit',
            description: 'CSV editor',
            language: 'Java',
            url: 'https://github.com/seerainer/CSVedit'
        },
        {
            name: '♟️ ChessGame',
            description: 'Chess with AI Engine',
            language: 'Java',
            url: 'https://github.com/seerainer/ChessGame'
        },
        {
            name: '🪄 HexEdit',
            description: 'Hex Editor',
            language: 'Java',
            url: 'https://github.com/seerainer/HexEdit'
        },
        {
            name: '🎮 TetrisGame',
            description: 'Tetris',
            language: 'Java',
            url: 'https://github.com/seerainer/TetrisGame'
        },
        {
            name: '📝 SWTextedit',
            description: 'A simple text editor',
            language: 'Java',
            url: 'https://github.com/seerainer/SWTextedit'
        },
        {
            name: '🚮 Dupes2Trash',
            description: 'Moves duplicate files to the trash',
            language: 'Java',
            url: 'https://github.com/seerainer/Dupes2Trash'
        },
        {
            name: '🔥 FileShredder',
            description: 'Secure file deletion',
            language: 'Java',
            url: 'https://github.com/seerainer/FileShredder'
        },
        {
            name: '🐍 SnakeGame',
            description: 'Snake',
            language: 'Java',
            url: 'https://github.com/seerainer/SnakeGame'
        },
        {
            name: '👾 AsteroidDodger',
            description: 'AsteroidDodger game',
            language: 'Java',
            url: 'https://github.com/seerainer/AsteroidDodger'
        },
        {
            name: '📊 CSVparser',
            description: 'CSV parser',
            language: 'Java',
            url: 'https://github.com/seerainer/CSVparser'
        },
        {
            name: '🐍 2_Player_Snake',
            description: 'Snake for 2 players',
            language: 'JavaScript',
            url: 'https://github.com/seerainer/2_Player_Snake'
        },
        {
            name: '☕ RsJarLauncher',
            description: 'Cross-platform Java jar-file launcher',
            language: 'Rust',
            url: 'https://github.com/seerainer/RsJarLauncher'
        },
        {
            name: '☕ MinJarLaunch',
            description: 'Java jar-file launcher',
            language: 'C',
            url: 'https://github.com/seerainer/MinJarLaunch'
        }
    ];

    const languageColors = {
        'Java': '#b07219',
        'JavaScript': '#f1e05a',
        'Rust': '#dea584',
        'C': '#555555'
    };

    const langDE = navigator.language.startsWith('de');
    const home = langDE ? 'Ort: Salzburg, Österreich' : 'Location: Salzburg, Austria';
    const contact = langDE ? 'Kontakt: ' : 'Contact: ';
    const theme = langDE ? 'Design wechseln' : 'Toggle theme';
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const darkTheme = 'dark-theme';
    const lightTheme = 'light-theme';
    const themeElement = 'theme-element';
    const mail = window.atob('cGhpbGlwcEBzZWVyYWluZXIuY29t');
    
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
        const link = document.createElement('a');
        link.className = themeElement;
        link.href = project.url;
        link.textContent = project.name;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        title.appendChild(link);
        
        const desc = document.createElement('p');
        desc.textContent = project.description;
        
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
    link.href = window.atob('bWFpbHRvOg==') + mail;

    const textElement = document.querySelector('.contact-info');
    const pgpText = document.querySelector('.pgp-details');
    const themeButton = document.querySelector('.theme-toggle');
    const images = document.querySelectorAll('img');
    const summary = document.createElement('summary');
    summary.className = themeElement;
    summary.innerText = 'PGP';
    const pre = document.createElement('pre');
    pre.className = themeElement;
    pre.innerText = pgpKey;

    [pgpText, tabs, ...images].forEach(el => el.classList.add(themeElement));
    pgpText.classList.add(prefersDarkScheme ? darkTheme : lightTheme);
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
        // Update button emoji based on new theme
        themeButton.innerText = document.body.classList.contains(darkTheme) ? '\uD83D\uDD06' : '\uD83D\uDD05';
    });

    pgpText.append(summary, pre);
    pgpText.addEventListener('click', () => {
        const range = document.createRange();
        range.selectNodeContents(pre);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
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
            textElement.append(link);
        }
        if (index === fsname.length - 1 || index === fsname.length + home.length - 1) {
            textElement.appendChild(document.createElement('br'));
        }
        index++;
        setTimeout(showText, 34);
    }

    document.querySelector('html').lang = langDE ? 'de' : 'en';
    document.body.classList.add(prefersDarkScheme ? darkTheme : lightTheme);
    document.querySelectorAll('.theme-element').forEach(el => {
        el.classList.add(prefersDarkScheme ? darkTheme : lightTheme);
    });

    showText();
});