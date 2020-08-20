const path = require("path")
const fs = require("fs")

const dirInformationPath = path.join(__dirname, "../src/info")
let informationList = []


const getInformation = () => {
    fs.readdir(dirInformationPath, (err, files) => {
        if (err) {
            return console.log("Failed to list contents of directory: " + err)
        }
        let ilist = []
        files.forEach((file, i) => {
            let obj = {}
            let post
            fs.readFile(`${dirInformationPath}/${file}`, "utf8", (err, contents) => {
                const getMetadataIndices = (acc, elem, i) => {
                    if (/^---/.test(elem)) {
                        acc.push(i)
                    }
                    return acc
                }
                const parseMetadata = ({lines, metadataIndices}) => {
                    if (metadataIndices.length > 0) {
                        let metadata = lines.slice(metadataIndices[0] + 1, metadataIndices[1])
                        metadata.forEach(line => {
                            line = line.replace('\r', '')
                            obj[line.split(": ")[0]] = line.split(": ")[1]
                        })
                        return obj
                    }
                }
                const parseContent = ({lines, metadataIndices}) => {
                    if (metadataIndices.length > 0) {
                        lines = lines.slice(metadataIndices[1] + 1, lines.length)
                    }
                    return lines.join("\n")
                }
                const lines = contents.split("\n")
                const metadataIndices = lines.reduce(getMetadataIndices, [])
                const metadata = parseMetadata({lines, metadataIndices})
                const content = parseContent({lines, metadataIndices})
                post = {
                    id: Math.floor(Math.random() * 100000000000),
                    title: metadata.title,
                    subtitle: metadata.subtitle ? metadata.subtitle : null,
                    imageOne: metadata.imageOne ? metadata.imageOne : null,
                    price: metadata.price,
                    url: metadata.url,
                    content: content ? content : "No content given",
                    notaFinal: metadata.notaFinal ? metadata.notaFinal : null,
                    score: metadata.score
                }
                informationList.push(post)
                ilist.push(i)
                if (ilist.length === files.length) {
                    const sortedList = informationList.sort ((a, b) => {
                        return a.id < b.id ? 1 : -1
                    })
                    let data = JSON.stringify(sortedList)
                    fs.writeFileSync("src/mocks/information.json", data)
                }
            })
        })
    })
    return
}



getInformation()
