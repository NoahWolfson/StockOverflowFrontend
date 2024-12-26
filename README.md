# StockOverflowFrontend
/* Base styles */
.StockResultsBody {
    font-family: Arial, sans-serif;
    background-color: #121212;
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 20px;
    min-height: 100vh;
    box-sizing: border-box;
    margin-top: 15%;
}

/* Logo in frame */
.searchLogoContainerResult {
    margin-top: 40px;
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.SearcherLogoResult {
    max-width: 150px;
    height: auto;
}

/* Centered search container */
.SeacherContainer {
    width: 100%;
    max-width: 900px; /* Matches the width of the results */
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
}

/* Search container */
.SearchContainerResult {
    width: 100%;
    display: flex;
    gap: 0;
    align-items: center;
    justify-content: center;
}

/* Search form */
.SearchFormResult {
    width: 100%; /* Matches the width of the results */
    display: flex;
    flex-direction: row;
}

/* Search bar */
.SearchBarResult {
    flex: 1;
    padding: 12px 15px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-right: none;
    border-radius: 16px 0 0 16px;
    box-sizing: border-box;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
    width: 80%;
}

/* Search bar focus */
.SearchBarResult:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 4px rgba(0, 123, 255, 0.5);
}
.SearchBarContainerResult {
    width: 100%;
    display: flex;

}
/* Search button */
.SearchButtonResults {
    padding: 10px 20px;
    font-size: 16px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 0 16px 16px 0;
    cursor: pointer;
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
    width: 120px; /* Fixed width for consistency */
}

.SearchButtonResults:hover {
    background-color: #0056b3;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
