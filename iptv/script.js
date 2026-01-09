// Create Trusted Types policy to allow HLS.js and dynamic resource loading
if (window.trustedTypes && !window.trustedTypes.defaultPolicy) {
    window.trustedTypes.createPolicy('default', {
        createScriptURL: (url) => url,
        createScript: (script) => script,
        createHTML: (html) => html
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('video');
    const playlistUrlInput = document.getElementById('playlist-url');
    const loadBtn = document.getElementById('load-btn');
    const channelList = document.getElementById('channel-list');
    const playlistsContainer = document.getElementById('playlists-container');
    const toggleListBtn = document.getElementById('toggle-list-btn');
    const drawerBackdrop = document.getElementById('drawer-backdrop');
    const mobileQuery = window.matchMedia('(max-width: 900px)');
    let hls;

    // Predefined playlists
    const predefinedPlaylists = [
        { name: 'English', url: 'https://iptv-org.github.io/iptv/languages/eng.m3u' },
        { name: 'German (Deutsch)', url: 'https://iptv-org.github.io/iptv/languages/deu.m3u' },
        { name: 'French (Français)', url: 'https://iptv-org.github.io/iptv/languages/fra.m3u' },
        { name: 'Spanish (Español)', url: 'https://iptv-org.github.io/iptv/languages/spa.m3u' },
        { name: 'Italian (Italiano)', url: 'https://iptv-org.github.io/iptv/languages/ita.m3u' },
        { name: 'Dutch (Nederlands)', url: 'https://iptv-org.github.io/iptv/languages/nld.m3u' },
        { name: 'Portuguese (Português)', url: 'https://iptv-org.github.io/iptv/languages/por.m3u' },
        { name: 'Turkish (Türkçe)', url: 'https://iptv-org.github.io/iptv/languages/tur.m3u' },
        { name: 'Arabic (العربية)', url: 'https://iptv-org.github.io/iptv/languages/ara.m3u' }
    ];

    // Render predefined playlists
    renderPredefinedPlaylists();

    toggleListBtn?.addEventListener('click', () => setChannelListOpen(true));
    drawerBackdrop?.addEventListener('click', () => setChannelListOpen(false));

    mobileQuery.addEventListener('change', event => {
        if (!event.matches) {
            setChannelListOpen(false);
        }
    });

    loadBtn.addEventListener('click', () => {
        const url = playlistUrlInput.value;
        if (url) {
            loadPlaylist(url);
        }
    });

    // Auto load default if present
    if (playlistUrlInput.value) {
        loadPlaylist(playlistUrlInput.value);
    }

    function renderPredefinedPlaylists() {
        playlistsContainer.replaceChildren();
        predefinedPlaylists.forEach(playlist => {
            const div = document.createElement('div');
            div.className = 'playlist-item';

            const nameEl = document.createElement('strong');
            nameEl.textContent = playlist.name;

            const urlEl = document.createElement('small');
            urlEl.textContent = playlist.url;

            div.appendChild(nameEl);
            div.appendChild(urlEl);
            div.addEventListener('click', () => {
                playlistUrlInput.value = playlist.url;
                loadPlaylist(playlist.url);
            });
            playlistsContainer.appendChild(div);
        });
    }

    function setChannelListOpen(isOpen) {
        channelList.classList.toggle('is-open', isOpen);
        if (drawerBackdrop) {
            drawerBackdrop.classList.toggle('is-visible', isOpen);
        }
        document.body.classList.toggle('no-scroll', isOpen);
    }

    function loadPlaylist(url) {
        channelList.replaceChildren();
        const loading = document.createElement('div');
        loading.className = 'message message-loading';
        loading.textContent = 'Loading...';
        channelList.appendChild(loading);
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(data => {
                const channels = parseM3U(data);
                renderChannels(channels);
            })
            .catch(error => {
                console.error('Error fetching playlist:', error);
                channelList.replaceChildren();
                const errorDiv = document.createElement('div');
                errorDiv.className = 'message message-error';
                errorDiv.textContent = 'Failed to load playlist. Ensure the URL allows CORS or use a proxy.';
                channelList.appendChild(errorDiv);
            });
    }

    function parseM3U(content) {
        const lines = content.split('\n');
        const channels = [];
        let currentChannel = {};

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            if (line.startsWith('#EXTINF:')) {
                // Parse info
                const info = line.substring(8);
                // Extract logo
                const logoMatch = info.match(/tvg-logo="([^"]*)"/);
                const logo = logoMatch ? logoMatch[1] : null;

                // Extract group
                const groupMatch = info.match(/group-title="([^"]*)"/);
                const group = groupMatch ? groupMatch[1] : null;

                // Extract Name (everything after the last comma)
                const namePart = info.substring(info.lastIndexOf(',') + 1).trim();

                currentChannel = {
                    name: namePart,
                    logo: logo,
                    group: group
                };
            } else if (line.startsWith('#')) {
                // Other directives, ignore or handle if needed
                continue;
            } else if (line.length > 0) {
                // URL line
                currentChannel.url = line;
                if (currentChannel.name && currentChannel.url) {
                    channels.push(currentChannel);
                }
                // Reset for next channel
                currentChannel = {};
            }
        }
        return channels;
    }

    function renderChannels(channels) {
        channelList.replaceChildren();
        if (channels.length === 0) {
            const empty = document.createElement('div');
            empty.className = 'message message-empty';
            empty.textContent = 'No channels found or invalid M3U format.';
            channelList.appendChild(empty);
            return;
        }

        channels.forEach((channel, index) => {
            const div = document.createElement('div');
            div.className = 'channel-item';

            let logoEl;
            if (channel.logo) {
                logoEl = document.createElement('img');
                logoEl.src = channel.logo;
                logoEl.className = 'channel-logo';
                logoEl.alt = '';
                logoEl.onerror = () => {
                    logoEl.classList.add('is-hidden');
                };
            } else {
                logoEl = document.createElement('div');
                logoEl.className = 'channel-logo channel-logo-fallback';
                logoEl.textContent = 'TV';
            }

            const meta = document.createElement('div');
            meta.className = 'channel-meta';

            const nameEl = document.createElement('span');
            nameEl.className = 'channel-name';
            nameEl.textContent = channel.name;
            meta.appendChild(nameEl);

            if (channel.group) {
                const groupEl = document.createElement('span');
                groupEl.className = 'channel-group';
                groupEl.textContent = channel.group;
                meta.appendChild(groupEl);
            }

            div.appendChild(logoEl);
            div.appendChild(meta);

            div.addEventListener('click', () => {
                playChannel(channel.url);

                // Update active state
                document.querySelectorAll('.channel-item').forEach(el => el.classList.remove('active'));
                div.classList.add('active');

                if (mobileQuery.matches) {
                    setChannelListOpen(false);
                }
            });

            channelList.appendChild(div);
        });
    }

    function playChannel(source) {
        if (Hls.isSupported()) {
            if (hls) {
                hls.destroy();
            }
            hls = new Hls();
            hls.loadSource(source);
            hls.attachMedia(video);
            hls.on(Hls.Events.MANIFEST_PARSED, function () {
                video.play().catch(e => console.log("Play failed", e));
            });
            hls.on(Hls.Events.ERROR, function (event, data) {
                if (data.fatal) {
                    switch (data.type) {
                        case Hls.ErrorTypes.NETWORK_ERROR:
                            console.log("fatal network error encountered, try to recover");
                            hls.startLoad();
                            break;
                        case Hls.ErrorTypes.MEDIA_ERROR:
                            console.log("fatal media error encountered, try to recover");
                            hls.recoverMediaError();
                            break;
                        default:
                            // cannot recover
                            hls.destroy();
                            break;
                    }
                }
            });
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = source;
            video.addEventListener('loadedmetadata', function () {
                video.play();
            });
        }
    }
});
