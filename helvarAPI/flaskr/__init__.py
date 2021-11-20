from flask import Flask
from flask_restful import Resource, Api, reqparse
import pandas as pd
import ast
import json

import os



app = Flask(__name__)
api = Api(app)





class Data(Resource):
  def post(self):
    parser = reqparse.RequestParser()  # initialize
        
    parser.add_argument('site', required=True)  # add args
    parser.add_argument('timeperiod', required=True)
    parser.add_argument('interval', required=True)
    parser.add_argument('deviceid', required=False)
    
    args = parser.parse_args()  # parse arguments to dictionary
    
    site = args['site'] # site name, as string
    timeperiod = args['timeperiod'] # wanted timeperiod in seconds, as integer
    interval = args['interval'] # With which time interval do you want the data. In seconds, as integer
    deviceid = args['deviceid'] # wanted device. All if not defined, as integer
    
    script_dir = os.getcwd()
  
    file = 'flaskr/data/' + site + '/' + site + '.pkl'
    
    
    df_events = pd.read_pickle(os.path.abspath(os.path.join(script_dir, file)), compression='gzip')
    df_events.loc[:, 'timestamp'] = (pd.to_datetime(df_events['timestamp'], utc=True)
                                 .dt.tz_convert('Europe/Helsinki')
                                 .dt.tz_localize(None))
    
    now = pd.Timestamp.utcnow().tz_convert('Europe/Helsinki').tz_localize(None) - pd.Timedelta(120, 'D') - pd.Timedelta(12, 'H')
    previous = now - pd.Timedelta(timeperiod + 'S')
    
    
    df_events.timestamp = df_events.timestamp.dt.floor(str(interval) + 'S')
    df_events = df_events[(df_events['timestamp'] > previous) & (df_events['timestamp'] < now)]
    df_events.loc[:, 'count'] = 1
    
    if deviceid:
      df_events = df_events[df_events['deviceid'] == int(deviceid)]
    df_events = df_events.groupby(['deviceid', 'timestamp']).sum()

    print(df_events)
    return {'data': df_events.to_json()}, 200  # return data with 200 OK
    # # df_events_5min = df_events_5min.drop(['deviceid'], axis=1)
    # df_events_5min = df_events_5min.reindex(pd.date_range(df_events_5min.index.min(), df_events_5min.index.max(), freq='5min')).fillna(0)

class Devices(Resource):
  def post(self):
    parser = reqparse.RequestParser()  # initialize
        
    parser.add_argument('site', required=True)  # add args
    parser.add_argument('deviceid', required=False)
    
    args = parser.parse_args()  # parse arguments to dictionary
    
    site = args['site'] # site name, as string
    deviceid = args['deviceid'] # wanted device. All if not defined, as integer
    
    script_dir = os.getcwd()
  
    file = 'flaskr/data/' + site + '/' + site + '.json'
    
    
    df_devices = pd.read_json(os.path.abspath(os.path.join(script_dir, file)))
    
    if deviceid:
      df_devices = df_devices[df_devices['deviceid'] == int(deviceid)]
      
    return {'data': list(df_devices.T.to_dict('deviceid').values())}, 200  # return data with 200 OK
    

    
api.add_resource(Data, '/data')
api.add_resource(Devices, '/devices')





if __name__ == '__main__':
    app.run()  # run our Flask app