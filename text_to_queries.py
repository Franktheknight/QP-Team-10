import json
import numpy as np
import requests
from bs4 import BeautifulSoup

#takes text, returns as list of segments (each within specified word limit/query length)
#query length should be half what you'd think; each word gets split to 2 tokens (max 128)
def text_to_queries (text, query_length):
    split_raw = text.split() #split into individual words
    steps = range(0, len(split_raw), query_length) #start, stop, step
    query_raw = (split_raw[i : i+query_length] for i in steps) #generate sub-lists
    queries = [" ".join(i) for i in query_raw] #each sub-list turned to string
    return queries

#curl -d '{"instances": [1.0, 2.0, 5.0]}' \
#-X POST http://localhost:8501/v1/models/half_plus_two:predict
def post_to_model(t, ql):
    headers = {"content-type": "application/json"}
    data = json.dumps({"signature_name": "serving_default", "instances": text_to_queries(t, ql)})
    url = 'http://localhost:8501/v1/models/infer_emotion:predict'
    r = requests.post(url, data = data, headers=headers)
    if(r.status_code == 200):
        output = np.argmax(json.loads(r.text)['predictions'], axis = 1)
        print(output)
    else:
        print(r.status_code)
    r.close()

#not advised to go >64
post_to_model(""" Intentionally or not, it took until around 7 in the morning for the members to reach a decision to call the Minister of Health to select doctors for an initial look. When the doctors finally arrived, they found Stalin unresponsive, his right arm and leg, paralyzed, and his blood pressure at the alarmingly high rate of 190/110. “They had to examine him, but their hands were too shaky. To make it worse, the dentist took out his dentures, and dropped them by accident,” according to Lozgachev’s testimony. They ordered complete quiet, put leeches behind his ears, a cold compress on his head and recommended he not eat.  """,64)

#text = open("./useful_scripts/sampletext.txt").read()
#print(text_to_queries(text, 64))

