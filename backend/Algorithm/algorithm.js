const dfd = require("danfojs-node")

df = new dfd.DataFrame("data/SpotifyData.json")
df.head(5).print()