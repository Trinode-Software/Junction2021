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
    
    site = args['site'] # site name
    timeperiod = args['timeperiod'] # wanted timeperiod in seconds
    interval = args['interval'] # With which time interval do you want the data. In seconds
    deviceid = args['deviceid'] # wanted device. All if not defined
    
    script_dir = os.getcwd()
    print(script_dir)
    file = 'data/site_1/site_1.pkl'
    
    print('PENIS')
    print(os.path.join(script_dir, file))
    print(os.path.isdir(os.path.join(script_dir, file)))
  
    # df_events = pd.read_pickle(f'./data/{site}/{site}.pkl', compression='gzip')
    df_events = pd.read_pickle(os.path.join(script_dir, file), compression='gzip')
    df_events.loc[:, 'timestamp'] = (pd.to_datetime(df_events['timestamp'], utc=True)
                                 .dt.tz_convert('Europe/Helsinki')
                                 .dt.tz_localize(None))
    
    now = pd.Timestamp.utcnow().tz_convert('Europe/Helsinki').tz_localize(None) - pd.Timedelta(120, 'D') - pd.Timedelta(6, 'H')
    previous = now - pd.Timedelta(timeperiod, 'S')
    
    
    df_events.timestamp = df_events.timestamp.dt.floor(str(interval) + 'S')
    df_events = df_events[(df_events['timestamp'] > previous) & (df_events['timestamp'] < now)]
    df_events.loc[:, 'b'] = 1
    df_events = df_events.groupby(['deviceid', 'timestamp']).sum()

    if deviceid:
      df_events = df_events[df_events['deviceid'] == deviceid]
      
    return {'data': df_events.to_json}, 200  # return data with 200 OK
    # # df_events_5min = df_events_5min.drop(['deviceid'], axis=1)
    # df_events_5min = df_events_5min.reindex(pd.date_range(df_events_5min.index.min(), df_events_5min.index.max(), freq='5min')).fillna(0)
    
    


# class Users(Resources):
#     def get(self):
#         data = pd.read_csv('users.csv')  # read CSV
#         data = data.to_dict()  # convert dataframe to dictionary
#         return {'data': data}, 200  # return data and 200 OK code
    
#     def post(self):
#         parser = reqparse.RequestParser()  # initialize
        
#         parser.add_argument('userId', required=True)  # add args
#         parser.add_argument('name', required=True)
#         parser.add_argument('city', required=True)
        
#         args = parser.parse_args()  # parse arguments to dictionary
        
#         # create new dataframe containing new values
#         new_data = pd.DataFrame({
#             'userId': args['userId'],
#             'name': args['name'],
#             'city': args['city'],
#             'locations': [[]]
#         })
#         # read our CSV
#         data = pd.read_csv('users.csv')
#         # add the newly provided values
#         data = data.append(new_data, ignore_index=True)
#         # save back to CSV
#         data.to_csv('users.csv', index=False)
#         return {'data': data.to_dict()}, 200  # return data with 200 OK
      
      
#     def put(self):
#       parser = reqparse.RequestParser()  # initialize
#       parser.add_argument('userId', required=True)  # add args
#       parser.add_argument('location', required=True)
#       args = parser.parse_args()  # parse arguments to dictionary

#       # read our CSV
#       data = pd.read_csv('users.csv')
      
#       if args['userId'] in list(data['userId']):
#           # evaluate strings of lists to lists
#           data['locations'] = data['locations'].apply(
#               lambda x: ast.literal_eval(x)
#           )
#           # select our user
#           user_data = data[data['userId'] == args['userId']]

#           # update user's locations
#           user_data['locations'] = user_data['locations'].values[0] \
#               .append(args['location'])
          
#           # save back to CSV
#           data.to_csv('users.csv', index=False)
#           # return data and 200 OK
#           return {'data': data.to_dict()}, 200

#       else:
#           # otherwise the userId does not exist
#           return {
#               'message': f"'{args['userId']}' user not found."
#           }, 404




    
api.add_resource(Data, '/data')  # '/users' is our entry point for Users





if __name__ == '__main__':
    app.run()  # run our Flask app