# 🐤 BirdHub

## A tiny React app for bird enthusiasts.

This was my first React project! While I’d probably structure things a bit differently if I started fresh today, building this little project taught me a lot :)

BirdHub uses the eBird API from the Cornell Lab of Ornithology to fetch recent bird sightings near a location chosen by the user. Results are displayed as a list and as markers on an interactive map.

![BirdHub Screenshot](https://raw.githubusercontent.com/j-grzy/BirdHub/main/.github/Screenshot-sm.png)

I built the map with React Leaflet and used geo data from OpenStreetMap.

The app doesn’t fetch data directly from eBird but instead from my own API, which does a bit of sorting and filtering beforehand. ;) If you want to make your own app, you’ll need to adjust the fetch request to access the eBird API endpoint directly. Note: you’ll need an eBird account to get an API key.

Check out the live version of BirdHub [here] (Coming soon!).

This project is still a work in progress, with a few things to improve:

- Make it responsive
- Make language picker and theme switcher accessible
- Fix some smaller bugs
- Improve overall UX design
- Declutter CSS
- ... and a few more tweaks ;)

---

<div align="center">🐦🐥🐓🐧🐤</div>
