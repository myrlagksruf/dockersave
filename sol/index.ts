import semver from 'semver'
import fs from 'node:fs'
import * as tar from 'tar'

let targetPlatform = Bun.argv[2] || 'linux-x64'
if (["win32-x64", "win32-arm64", "linux-x64", "linux-arm64", "darwin-x64", "darwin-arm64"].includes(targetPlatform)) {
    console.log(`Target platform set to ${targetPlatform}`);
} else {
    targetPlatform = 'linux-x64';
}

export const getFile = async (pn:string, en:string, version:string, target?:string) => {
    const targetQuery = target ? `?targetPlatform=${target}` : ''
    const targetName = target ? `@${target}` : ''
    const res = await fetch(`https://marketplace.visualstudio.com/_apis/public/gallery/publishers/${pn}/vsextensions/${en}/${version}/vspackage${targetQuery}`)
    await Bun.write(`./extensions/${pn}.${en}-${version}${targetName}.vsix`, await res.blob())
}

if(import.meta.main){
    const res = await fetch("https://marketplace.visualstudio.com/_apis/public/gallery/extensionquery", {
        "credentials": "include",
        "headers": {
            "User-Agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:129.0) Gecko/20100101 Firefox/129.0",
            "Accept": "application/json;api-version=7.2-preview.1;excludeUrls=true",
            "Accept-Language": "ko-KR,ko;q=0.8,en-US;q=0.5,en;q=0.3",
            "Content-Type": "application/json"
        },
        "referrer": "https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers",
        "body": await Bun.file('./data.json').text(),
        "method": "POST",
        "mode": "cors"
    });
    
    await fs.promises.rm("extensions.tgz", { force:true})
    await fs.promises.rm("extensions", { force:true, recursive:true })
    await fs.promises.mkdir('extensions')
    await fs.promises.copyFile('install.sh', 'extensions/install.sh')
    
    const json = await res.json()
    
    const VS = '1.107.0'
    
    for(const i of json.results[0].extensions){
        const versionData = i.versions.find(v => {
            const first = v.targetPlatform === undefined || v.targetPlatform === targetPlatform
            if(!v.properties) return first
            const engine = v.properties.find(t => t.key === 'Microsoft.VisualStudio.Code.Engine')
            const pre = v.properties.find(t => t.key === 'Microsoft.VisualStudio.Code.PreRelease')
            return first && semver.satisfies(VS, engine.value) && (!pre || pre.value !== 'true')
        })
        // console.log(versionData)
        const target = versionData.targetPlatform
        const version = versionData.version
        await getFile(i.publisher.publisherName, i.extensionName, version, target)
    }
    
    tar.c({
        z:true,   
    }, [
        'extensions'
    ]).pipe(fs.createWriteStream('extensions.tgz'))
}