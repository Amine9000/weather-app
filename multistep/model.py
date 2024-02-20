import os
import datetime

import IPython
import IPython.display
import matplotlib as mpl
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import seaborn as sns
import tensorflow as tf
import keras

from multistep.windowGenerator import WindowGenerator
from multistep.utils import compile_and_fit


mpl.rcParams['figure.figsize'] = (8, 6)
mpl.rcParams['axes.grid'] = False

zip_path = tf.keras.utils.get_file(
    origin='https://storage.googleapis.com/tensorflow/tf-keras-datasets/jena_climate_2009_2016.csv.zip',
    fname='jena_climate_2009_2016.csv.zip',
    extract=True)

csv_path, _ = os.path.splitext(zip_path)

df = pd.read_csv(csv_path)
# Slice [start:stop:step], starting from index 5 take every 6th record.
df = df[5::6]

date_time = pd.to_datetime(df.pop('Date Time'), format='%d.%m.%Y %H:%M:%S')

wv = df['wv (m/s)']
bad_wv = wv == -9999.0
wv[bad_wv] = 0.0

max_wv = df['max. wv (m/s)']
bad_max_wv = max_wv == -9999.0
max_wv[bad_max_wv] = 0.0

wv = df.pop('wv (m/s)')
max_wv = df.pop('max. wv (m/s)')

# Convert to radians.
wd_rad = df.pop('wd (deg)')*np.pi / 180

# Calculate the wind x and y components.
df['Wx'] = wv*np.cos(wd_rad)
df['Wy'] = wv*np.sin(wd_rad)

# Calculate the max wind x and y components.
df['max Wx'] = max_wv*np.cos(wd_rad)
df['max Wy'] = max_wv*np.sin(wd_rad)


timestamp_s = date_time.map(pd.Timestamp.timestamp)

day = 24*60*60
year = (365.2425)*day

df['Day sin'] = np.sin(timestamp_s * (2 * np.pi / day))
df['Day cos'] = np.cos(timestamp_s * (2 * np.pi / day))
df['Year sin'] = np.sin(timestamp_s * (2 * np.pi / year))
df['Year cos'] = np.cos(timestamp_s * (2 * np.pi / year))

column_indices = {name: i for i, name in enumerate(df.columns)}

n = len(df)
train_df = df[0:int(n*0.7)]
val_df = df[int(n*0.7):int(n*0.9)]
test_df = df[int(n*0.9):]

num_features = df.shape[1]

train_mean = train_df.mean()
train_std = train_df.std()

train_df = (train_df - train_mean) / train_std
val_df = (val_df - train_mean) / train_std
test_df = (test_df - train_mean) / train_std

OUT_STEPS = 7
multi_window = WindowGenerator(input_width=24,
                               label_width=OUT_STEPS,
                               train_df=train_df,
                               val_df=val_df,
                               test_df=test_df,
                               shift=OUT_STEPS)


def tempModel():
    try:
        multi_lstm_model = keras.models.load_model('multistep/tempModel.keras')
    except:
        multi_lstm_model = tf.keras.Sequential([
            # Shape [batch, time, features] => [batch, lstm_units].
            # Adding more `lstm_units` just overfits more quickly.
            tf.keras.layers.LSTM(32, return_sequences=False),
            # Shape => [batch, out_steps*features].
            tf.keras.layers.Dense(OUT_STEPS*num_features,
                                kernel_initializer=tf.initializers.zeros()),
            # Shape => [batch, out_steps, features].
            tf.keras.layers.Reshape([OUT_STEPS, num_features])
        ])

        history = compile_and_fit(multi_lstm_model, multi_window)

        multi_lstm_model.save("multistep/tempModel.keras")
    
    plot_col_index = multi_window.column_indices['T (degC)']
    if multi_window.label_columns:
      label_col_index = multi_window.label_columns_indices.get('T (degC)', None)
    else:
      label_col_index = plot_col_index

    inputs, labels = multi_window.example
    labels = labels*train_std + train_mean
    predictions = multi_lstm_model(inputs)*train_std + train_mean
    return [labels[1, :, label_col_index].numpy().tolist() ,predictions[1, :, label_col_index].numpy().tolist()]


def presModel():
    try:
        multi_lstm_model = keras.models.load_model('multistep/presModel.keras')
    except:
        multi_lstm_model = tf.keras.Sequential([
            # Shape [batch, time, features] => [batch, lstm_units].
            # Adding more `lstm_units` just overfits more quickly.
            tf.keras.layers.LSTM(32, return_sequences=False),
            # Shape => [batch, out_steps*features].
            tf.keras.layers.Dense(OUT_STEPS*num_features,
                                kernel_initializer=tf.initializers.zeros()),
            # Shape => [batch, out_steps, features].
            tf.keras.layers.Reshape([OUT_STEPS, num_features])
        ])

        history = compile_and_fit(multi_lstm_model, multi_window)

        multi_lstm_model.save("multistep/presModel.keras")
    
    plot_col_index = multi_window.column_indices['p (mbar)']
    if multi_window.label_columns:
      label_col_index = multi_window.label_columns_indices.get('p (mbar)', None)
    else:
      label_col_index = plot_col_index

    inputs, labels = multi_window.example
    labels = labels*train_std + train_mean
    predictions = multi_lstm_model(inputs)*train_std + train_mean
    return [labels[1, :, label_col_index].numpy().tolist() ,predictions[1, :, label_col_index].numpy().tolist()]


def humModel():
    try:
        multi_lstm_model = keras.models.load_model('multistep/humModel.keras')
    except:
        multi_lstm_model = tf.keras.Sequential([
            # Shape [batch, time, features] => [batch, lstm_units].
            # Adding more `lstm_units` just overfits more quickly.
            tf.keras.layers.LSTM(32, return_sequences=False),
            # Shape => [batch, out_steps*features].
            tf.keras.layers.Dense(OUT_STEPS*num_features,
                                kernel_initializer=tf.initializers.zeros()),
            # Shape => [batch, out_steps, features].
            tf.keras.layers.Reshape([OUT_STEPS, num_features])
        ])

        history = compile_and_fit(multi_lstm_model, multi_window)

        multi_lstm_model.save("multistep/humModel.keras")
    
    plot_col_index = multi_window.column_indices['rh (%)']
    if multi_window.label_columns:
      label_col_index = multi_window.label_columns_indices.get('rh (%)', None)
    else:
      label_col_index = plot_col_index

    inputs, labels = multi_window.example
    labels = labels*train_std + train_mean
    predictions = multi_lstm_model(inputs)*train_std + train_mean
    return [labels[1, :, label_col_index].numpy().tolist() ,predictions[1, :, label_col_index].numpy().tolist()]



def windVModel():
    try:
        multi_lstm_model = keras.models.load_model('multistep/windVModel.keras')
    except:
        multi_lstm_model = tf.keras.Sequential([
            # Shape [batch, time, features] => [batch, lstm_units].
            # Adding more `lstm_units` just overfits more quickly.
            tf.keras.layers.LSTM(32, return_sequences=False),
            # Shape => [batch, out_steps*features].
            tf.keras.layers.Dense(OUT_STEPS*num_features,
                                kernel_initializer=tf.initializers.zeros()),
            # Shape => [batch, out_steps, features].
            tf.keras.layers.Reshape([OUT_STEPS, num_features])
        ])

        history = compile_and_fit(multi_lstm_model, multi_window)

        multi_lstm_model.save("multistep/windVModel.keras")
    
    plot_col_index_wx = multi_window.column_indices['Wx']
    plot_col_index_wy = multi_window.column_indices['Wx']
    if multi_window.label_columns:
      label_col_index_wx = multi_window.label_columns_indices.get('Wx', None)
      label_col_index_wy = multi_window.label_columns_indices.get('Wy', None)
    else:
      label_col_index_wx = plot_col_index_wx
      label_col_index_wy = plot_col_index_wy

    inputs, labels = multi_window.example
    labels = labels*train_std + train_mean
    predictions = multi_lstm_model(inputs)*train_std + train_mean
    Wx = labels[1, :, label_col_index_wx]
    Wy = labels[1, :, label_col_index_wy]
    Wv = np.sqrt(Wx**2 + Wy**2)
    windvPred_x = predictions[1, :, label_col_index_wx]
    windvPred_y = predictions[1, :, label_col_index_wy]
    windvPred = np.sqrt(windvPred_x**2 + windvPred_y**2)
    return [Wv.tolist() ,windvPred.tolist()]


def getModel(data_t):
    if data_t == "pressure":
        return presModel()
    elif data_t == "temperature":
        return tempModel()
    elif data_t == "windv":
        return windVModel()
    elif data_t == "humidity":
        return humModel()
