import React, { useState, useEffect } from "react";

// Makes a search query for each input field, combines both results into a usable format 

function useQuery(searchInput, locationInput) {

	// If fields are empty, convert from null to empty string
	if (!searchInput) {
		searchInput = "";
	}
	if (!locationInput) {
		locationInput = "";
	}

	// Make the search query using the given parameters
	const [searchResult, setSearchResult] = useState(null);
	useEffect(() => {
	fetch(`https://mefa-backend.herokuapp.com/search?q=${searchInput}`)
		.then(response => response.json())
		.then(data => setSearchResult(data))
		.catch(error => console.error(error))
	}, [searchInput]);
	
	const [locationResult, setLocationResult] = useState(null);
	useEffect(() => {
	fetch(`https://mefa-backend.herokuapp.com/search?q=${locationInput}`)
		.then(response => response.json())
		.then(data => setLocationResult(data))
		.catch(error => console.error(error))
	}, [locationInput]);

	if (searchResult && locationResult) {
		
		// Compile and return results
		if (searchInput != "" && locationInput != "") { // Both fields are filled
			// Combine results
			const results = {
				"projects": [...searchResult.projects, ...locationResult.projects],
				"properties": [...searchResult.properties, ...locationResult.properties]
			}
			// Remove duplicate projects
			results.projects = results.projects.filter(
				(item, index, self) =>
					index === self.findIndex((i) => i._id === item._id)
			);
			// Remove duplicate properties
			results.properties = results.properties.filter(
				(item, index, self) =>
					index === self.findIndex((i) => i._id === item._id)
			);
			
			return(results);
		}

		if (searchInput === "") { // First field is empty
			return(locationResult);
		}

		else { // Every other case (2nd field empty or both)
			return(searchResult);
		}
		
	}
	else return null;

}
export default useQuery;