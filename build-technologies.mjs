import fs from "fs"

// an array of _ plus a to z
const ids = [
  "_",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
]

/** @type {{name:string, desc:string, icon: string}[]} */
const technologies = []

await Promise.all(
  ids.map(async (id) => {
    const obj = await fetch(
      `https://fastly.jsdelivr.net/gh/wappalyzer/wappalyzer/src/technologies/${id}.json`
    ).then((res) => res.json())
    for (const name of Object.keys(obj)) {
      const item = obj[name]
      technologies.push({
        name,
        desc: item.description,
        icon: item.icon,
      })
    }
  })
)

fs.mkdirSync("./generated", { recursive: true })
fs.writeFileSync(
  "./generated/technologies.ts",
  `const items: Technology[] = ${JSON.stringify(
    technologies.sort((a, b) => (a.name > b.name ? 1 : -1)),
    null,
    2
  )}; export default items;`
)
