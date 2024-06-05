module.exports.config = {
    serviceWorker: {
        escape: 19,
        cacheName: 'LCTTBlogCache'
    },
    register: {
        onsuccess: undefined,
        onerror: () => console.error('Service Worker 注册失败，可能是由于您的浏览器不支持该功能！'),
        builder: (root, framework, pluginConfig) => {
            const { onerror, onsuccess } = pluginConfig.register;
            return `
            <script>
                (() => {
                    const sw = navigator.serviceWorker;
                    const error = ${onerror && onerror.toString()};
                    if (!sw?.register('${new URL(root).pathname}sw.js')
                        ${onsuccess ? `?.then(${onsuccess.toString()})` : ''}
                        ?.catch(error)
                    ) error()
                })()
            </script>`;
        }
    },
    dom: {
        onsuccess: () => {
            caches.match(location.href).then(res => {
                if (res)
                    res.json().then(json => {
                        console.log(`已刷新缓存，更新为${json.global + '.' + json.local}版本最新内容`);
                    });
                else
                    console.info('未找到缓存');
            }).catch(error => console.error("缓存匹配出错", error));
        }
    },
    json: {
        maxHtml: 15,
        charLimit: 1024,
        merge: ['index', 'tags', 'categories'],
        exclude: {
            localhost: [],
            other: []
        }
    },
    external: {
        timeout: 5000,
        concurrencyLimit: 10,
        js: [],
        stable: [],
        replacer: srcUrl => srcUrl,
    }
};

module.exports.cacheRules = {
    simple: {
        clean: true,
        search: false,
        match: (url, $eject) => (url.host.includes('lynx') || url.host.includes('lctt')) && url.pathname.match(/(\.(js|css|xml|json)|\/)$/) && !url.host.includes('api') // 主站缓存
    },
    cdn: {
        clean: true,
        match: url => [
            "cdn.staticfile.org",
            "cdn.staticfile.net",
            // "cdn.bootcdn.net",
            "cdn.jsdmirror.com",
            // "jsd.onmicrosoft.cn",
            // "sdk.51.la",
            // "www.clarity.ms",
            // "s4.zstatic.net",
            "s2.hdslb.com",
            "fonts.googleapis.com",
            "fonts.gstatic.com",
        ].includes(url.host) && url.pathname.match(/\.(js|css|woff2|woff|ttf|json|png|jpg|webp)$/) // CDN 缓存
    }
};

module.exports.getSpareUrls = srcUrl => {
    if (srcUrl.startsWith("https://jsd.cdn.zzko.cn")) {
        return {
            timeout: 3000,
            list: [
                srcUrl,
                `https://cdn.jsdelivr.net${new URL(srcUrl).pathname}`
            ]
        };
    }
};

module.exports.isMemoryQueue = request => {
    // do something...
};

module.exports.ejectValues = (hexo, rules) => ({
    domain: {
        prefix: "const",
        value: new URL(hexo.config.url).host,
    },
});
