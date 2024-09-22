import React, {useEffect} from "react";
//suggestion: (get key)
//https://api.gbif.org/v1/species/suggest?datasetKey=d7dddbf4-2cf0-4f39-9b2a-bb099caae36c&q=passer%20dom

//search:
//https://api.gbif.org/v1/species/search?datasetKey=d7dddbf4-2cf0-4f39-9b2a-bb099caae36c&q=kingfisher

export default function Species() {
  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch(
          "https://api.gbif.org/v1/species/5231190" //taxonomy
          //"https://api.gbif.org/v1/species/5231190/iucnRedListCategory"
        );
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.log("Error Fetching data ", error);
      }
    }
    getData();
  }, []);
  return <div>Species</div>;
}
