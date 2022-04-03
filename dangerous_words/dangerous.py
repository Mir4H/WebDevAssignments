from urllib.request import urlopen
from urllib.error import URLError, HTTPError
from urllib.parse import urlparse
import re
from bs4 import BeautifulSoup

def remove_tags(html):
    soup = BeautifulSoup(html, "html.parser")
    for data in soup(['style', 'script']):
        data.decompose()
    return ' '.join(soup.stripped_strings)

def url_validator(x):
    try:
        result = urlparse(x)
        return all([result.scheme, result.netloc])
    except:
        return False

def save_decoded(data):
    path = input('Give a valid path to save the contents?')
    with open(f'{path}', 'w', encoding='utf-8') as f:
        f.write(data)
    print(f'File successfully saved to {path}!')

def save_binary(data):
    print(f"This doesn't appear to be an HTML file with utf-8 encoding.")
    path = input('Give a valid path to save the contents?')
    with open(f'{path}', 'wb') as f:
        f.write(data)
    print(f'File successfully saved to {path}!')

while True:
    web_url = input("Give a valid URL to download:\n")
    if url_validator(web_url) == True:
        try:
            with urlopen(web_url) as f: 
                url_data = f.read()
            data = url_data.decode("utf-8")
            text_data = remove_tags(data)
            words = ["bomb", "kill", "murder", "terror", "terrorist", "terrorists", "terrorism"]
            total = []
            for word in words:
                pattern = re.compile(r"\b" + word + r"\b", re.IGNORECASE)
                total.append(re.findall(pattern, text_data))
            count = 0
            for elem in total:
                count += len(elem)   
            print(f'Total of dangerous words found: {count}')
            try:
                save_decoded(data)
                break
            except FileNotFoundError:
                print(f'Filepath does not exist')
                continue
        except ValueError:
            try:
                save_binary(url_data)
                break
            except FileNotFoundError:
                print(f'File path does not exist')
                continue
        except URLError:
            print(f"Error opening url: {web_url}\nPlease check the url.")
            continue
        except HTTPError:
            print(f"Error opening url: {web_url}\nPlease check the url.")
            continue
    else:
        print("There's something wrong with the url.\nPlease give a valid URL.")
        continue
