# 🐤 BirdHub

## A tiny React app for bird enthusiasts.

This was my first React project! While I’d probably structure things a bit differently if I started fresh today, building this little project taught me a lot :)

BirdHub uses the eBird API from the Cornell Lab of Ornithology to fetch recent bird sightings near a location chosen by the user. Results are displayed as a list and as markers on an interactive map.

![BirdHub Screenshot](https://github.com/j-grzy/BirdHub/blob/main/Screenshot-sm.png?raw=true)

I built the map with React Leaflet and used geo data from OpenStreetMap. To allow for custom map styles in the future, I implemented the Maplibre GL Leaflet plugin.

The app doesn’t fetch data directly from eBird but instead from my own API, which does a bit of sorting and filtering beforehand. ;) If you want to make your own app, you’ll need to adjust the fetch request to access the eBird API endpoint directly. Note: you’ll need an eBird account to get an API key.

Check out the live version of BirdHub [here] (Coming soon!).

This project is still a work in progress, with a few things to add and improve:

- Make language picker and theme switcher accessible
- Implement leaflet gesture handling plugin
- Improve overall UX design
- Declutter CSS and design a more consistent light and high contrast mode
- Custom map styles for dark and light mode
- ... and a few more tweaks ;)

---

### Thank you for:

- The bird data collected and provided by [eBird](https://www.ebird.org), the online database of bird distribution and abundance of the Cornell Lab of Ornithology
- The beautiful [Phosphor Icons](https://phosphoricons.com) by Helena Zhang and Tobias Fried
- [Bowlby One](https://fonts.google.com/specimen/Bowlby+One?query=bowlby) Font by Vernon Adams
- Map data and tiles by [OpenMapTiles](https://openmaptiles.org) and [OpenStreetMap](https://www.openstreetmap.org/copyright)
- Map styles by [Stadia Maps](https://stadiamaps.com)

---

<div align="center">🐦🐥🐓🐧🐤</div>
