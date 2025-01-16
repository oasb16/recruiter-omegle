import requests

# Replace with your Findwork API token
FINDWORK_API_TOKEN = "205ba42c2ec7cc34ffde1702dbd10f53eba24091"
BASE_URL = "https://findwork.dev/api/jobs/"

def fetch_findwork_jobs(query="", location="", sort_by="relevance", limit=10):
    """
    Fetch jobs from Findwork API based on the provided parameters.
    :param query: Search query (e.g., "Python Developer").
    :param location: Job location (optional).
    :param sort_by: Sort order ("relevance", "date").
    :param limit: Number of results to fetch.
    :return: List of job postings.
    """
    headers = {"Authorization": f"Token {FINDWORK_API_TOKEN}"}
    params = {
        "search": query,
        "location": location,
        "sort_by": sort_by,
        "limit": limit,
    }

    try:
        response = requests.get(BASE_URL, headers=headers, params=params)
        response.raise_for_status()
        return response.json().get("results", [])
    except requests.exceptions.RequestException as e:
        print(f"Error fetching Findwork jobs: {e}")
        return []

