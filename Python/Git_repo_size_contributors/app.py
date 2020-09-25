import requests
import pandas as pd
import sys
import json
from tqdm import tqdm


def search(username, repo_name, token):
    headers = {'Authorization': 'token %s' % token}
    size_link = f"https://api.github.com/repos/{username}/{repo_name}"

    size_request = requests.get(size_link)
    data_received = json.loads(size_request.content)
    size = data_received["size"]/1024

    data = {}
    data['Size of Repo (MB)'] = size

    page_no = 1
    progress_bar = tqdm(unit=' Page')
    while True:
        contrib_link = size_link + f"/contributors?per_page=100&page={page_no}"
        contrib_request = requests.get(contrib_link, headers=headers)
        contributors = json.loads(contrib_request.content)
        if len(contributors)!=0:
            for contributor in contributors:
                if contributor["type"] == "User":
                    data[contributor["login"]] = contributor["html_url"]
        else:
            break
        progress_bar.update(page_no)
        page_no += 1
    try:
        df = pd.DataFrame(data=data.values(), index=data.keys())
        df.to_csv("Data.csv")
    except:
        print('No contributors found!' + '\n' + f'Size of Repo: {size}')
    progress_bar.close()


if __name__ == "__main__":
    search(sys.argv[1], sys.argv[2], sys.argv[3])