import requests
from bs4 import BeautifulSoup


def find_broken_links(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    links = soup.find_all('a')
    broken_links = []

    for link in links:
        href = link.get('href')
        if href:
            try:
                response = requests.get(href)
                if response.status_code >= 400:
                    broken_links.append(href)
            except requests.exceptions.RequestException:
                broken_links.append(href)

    return broken_links
