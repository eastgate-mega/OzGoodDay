from pyquery import PyQuery as pq


def get_source_page(url, filename):
    content = pq(url = url)
    with open(filename, 'w') as f:
        f.write(str(content))
        f.close

url = 'https://www.catch.com.au/product/daniel-brighton-microblend-500gsm-winter-queen-bed-quilt-white-410466/?st=15&sid=45%3A399&sp=1&asp=1&aqi=7b5610fb07c34a15bd243a22b5ed3cb7'
filename = 'result.html'

get_source_page(url, filename)
